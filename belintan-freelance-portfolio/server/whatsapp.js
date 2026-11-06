/**
 * WhatsApp Business Cloud API & Webhook Router for Belintan Platform
 * Handles Meta Graph API webhook handshakes, parses inbound customer messages,
 * and formats instant priority notifications for Belintan (+91 86106 62871).
 */

import { db } from './db.js';

const BELINTAN_PHONE = '+91 86106 62871';
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'belintan_secure_webhook_token_2026';

export const whatsapp = {
  // 1. Meta Webhook Verification (GET /api/whatsapp/webhook)
  verifyWebhook(parsedUrl, res) {
    const mode = parsedUrl.searchParams.get('hub.mode');
    const token = parsedUrl.searchParams.get('hub.verify_token');
    const challenge = parsedUrl.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ [WhatsApp Webhook] Handshake verified successfully by Meta.');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(challenge);
      return true;
    } else {
      console.warn('⚠️ [WhatsApp Webhook] Verification token mismatch.');
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Forbidden: Invalid verification token' }));
      return false;
    }
  },

  // 2. Inbound Message Receiver (POST /api/whatsapp/webhook)
  handleInboundMessage(req, res) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');

        // Extract message entries from Meta webhook payload
        const entries = payload.entry || [];
        for (const entry of entries) {
          const changes = entry.changes || [];
          for (const change of changes) {
            const value = change.value || {};
            const messages = value.messages || [];
            
            for (const msg of messages) {
              const fromNumber = msg.from;
              const textBody = msg.text?.body || '[Media/Attachment]';
              const contactName = value.contacts?.[0]?.profile?.name || 'WhatsApp Client';

              console.log(`📱 [WhatsApp Inbound] From: ${contactName} (${fromNumber}) - "${textBody}"`);

              // Automatically record or match to CRM lead
              db.createLead({
                name: contactName,
                contact: `+${fromNumber}`,
                service: 'WhatsApp Inquiry',
                message: textBody,
                status: 'NEW',
                source: 'WHATSAPP_CLOUD_API'
              });
            }
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'EVENT_RECEIVED' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Malformed payload: ' + err.message }));
      }
    });
  },

  // 3. Outbound Notification Dispatcher for New Leads
  async notifyBelintanOfLead(lead) {
    const formattedAlert = `🚨 *NEW CLIENT INQUIRY ON ProfileBelintan.com*
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${lead.name}
📞 *Contact:* ${lead.contact}
📧 *Email:* ${lead.email || 'N/A'}
🏢 *Company:* ${lead.company || 'Direct Client'}
💼 *Service Interested:* ${lead.service || 'Full-Stack Development'}
💬 *Project Details:* ${lead.message}
━━━━━━━━━━━━━━━━━━━━
⚡ *Quick Actions:*
👉 WhatsApp Client: https://wa.me/${lead.contact.replace(/[^0-9]/g, '')}
👉 Open Doocti Softphone: http://localhost:5000/`;

    console.log(`\n======================================================`);
    console.log(`📡 [OUTBOUND WHATSAPP DISPATCH TO BELINTAN (${BELINTAN_PHONE})]`);
    console.log(formattedAlert);
    console.log(`======================================================\n`);

    // If Meta Cloud API credentials are set in environment, make actual POST request
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;

    if (token && phoneId) {
      try {
        await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '918610662871',
            type: 'text',
            text: { body: formattedAlert }
          })
        });
        console.log('✅ [WhatsApp API] Alert delivered to Belintan phone.');
      } catch (e) {
        console.error('[WhatsApp API] Delivery error:', e.message);
      }
    }

    return { success: true, alert: formattedAlert };
  }
};
