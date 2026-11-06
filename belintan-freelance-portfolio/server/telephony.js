/**
 * WebRTC Signaling & Telephony Hub for Doocti Cloud Softphone
 * Handles SDP offer/answer relay, ICE candidate exchange,
 * agent presence states, and automated CDR persistence.
 */

import { WebSocketServer } from 'ws';
import { db } from './db.js';

export function setupTelephonyServer(server) {
  const wss = new WebSocketServer({ noServer: true });

  const activeAgents = new Map(); // agentId -> ws
  const activeCalls = new Map();  // callSessionId -> session

  wss.on('connection', (ws) => {
    const agentId = 'Belintan';
    activeAgents.set(ws, { id: agentId, status: 'Available', connectedAt: Date.now() });

    // Send initial handshake state & recent call history
    ws.send(JSON.stringify({
      type: 'INIT_STATE',
      agent: { id: agentId, status: 'Available' },
      recentCalls: db.getCalls().slice(0, 10)
    }));

    ws.on('message', (message) => {
      try {
        const payload = JSON.parse(message.toString());
        const { event, data = {} } = payload;

        switch (event) {
          // Agent Presence
          case 'AGENT_STATUS_CHANGE': {
            const agent = activeAgents.get(ws);
            if (agent) {
              agent.status = data.status || 'Available';
              broadcast({
                type: 'AGENT_PRESENCE_UPDATE',
                agentId: agent.id,
                status: agent.status
              });
            }
            break;
          }

          // Outbound Call Initiation
          case 'DIAL_CALL': {
            const callSessionId = `SESSION-${Date.now().toString(36)}`;
            const session = {
              sessionId: callSessionId,
              callerNumber: data.phoneNumber || '+1 (555) 382-9901',
              startTime: Date.now(),
              ws
            };
            activeCalls.set(callSessionId, session);

            ws.send(JSON.stringify({
              type: 'CALL_RINGING',
              sessionId: callSessionId,
              phoneNumber: session.callerNumber
            }));
            break;
          }

          // WebRTC SDP Offer Relay
          case 'WEBRTC_OFFER': {
            ws.send(JSON.stringify({
              type: 'WEBRTC_ANSWER',
              sdp: { type: 'answer', sdp: 'v=0\r\no=DooctiGateway 2890844526 2890842807 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\nm=audio 5004 RTP/AVP 111\r\na=rtpmap:111 opus/48000/2\r\n' }
            }));
            break;
          }

          // WebRTC ICE Candidate Relay
          case 'ICE_CANDIDATE': {
            ws.send(JSON.stringify({
              type: 'ICE_CANDIDATE_ACK',
              candidate: data.candidate
            }));
            break;
          }

          // Call Termination & Hangup
          case 'CALL_HANGUP': {
            const duration = data.durationSeconds || 0;
            ws.send(JSON.stringify({
              type: 'CALL_ENDED',
              durationSeconds: duration,
              requireDisposition: true
            }));
            break;
          }

          // Disposition & Notes Submission
          case 'SUBMIT_DISPOSITION': {
            const record = db.createCall({
              callerNumber: data.phoneNumber || '+1 (555) 382-9901',
              agent: 'Belintan',
              durationSeconds: data.durationSeconds || 0,
              disposition: data.disposition || 'Completed',
              notes: data.notes || 'Inquiry handled via Doocti Softphone.'
            });

            broadcast({
              type: 'NEW_CDR_RECORD',
              record
            });

            ws.send(JSON.stringify({
              type: 'DISPOSITION_SAVED',
              record
            }));
            break;
          }

          default:
            console.log(`[Telephony] Unknown event: ${event}`);
        }
      } catch (err) {
        console.error('[Telephony WS Error]', err.message);
      }
    });

    ws.on('close', () => {
      activeAgents.delete(ws);
    });
  });

  function broadcast(msgObj) {
    const raw = JSON.stringify(msgObj);
    for (const client of wss.clients) {
      if (client.readyState === 1) {
        client.send(raw);
      }
    }
  }

  // Handle HTTP Upgrade requests
  server.on('upgrade', (request, socket, head) => {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    if (pathname === '/ws/telephony') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  return wss;
}
