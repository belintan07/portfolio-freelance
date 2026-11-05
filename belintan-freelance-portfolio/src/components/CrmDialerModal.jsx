import { useState, useEffect } from 'react';

export default function CrmDialerModal({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 382-9901');
  const [callStatus, setCallStatus] = useState('idle'); // 'idle' | 'calling' | 'connected' | 'ended'
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [agentStatus, setAgentStatus] = useState('Available');
  const [activeTab, setActiveTab] = useState('dialer'); // 'dialer' | 'crm' | 'logs'
  const [callNotes, setCallNotes] = useState('Client requested quotation for Enterprise Retainer. Highly interested in AI automation.');
  const [selectedTag, setSelectedTag] = useState('Demo Booked');

  // Call timer simulation
  useEffect(() => {
    if (callStatus !== 'connected') return;

    const interval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  if (!isOpen) return null;

  const handleDigit = (digit) => {
    setPhoneNumber((prev) => prev + digit);
  };

  const handleStartCall = () => {
    setCallTimer(0);
    setCallStatus('calling');
    setAgentStatus('On Call');
    setTimeout(() => {
      setCallStatus('connected');
    }, 1800);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setAgentStatus('Wrap-Up');
    setTimeout(() => {
      setCallTimer(0);
      setCallStatus('idle');
      setAgentStatus('Available');
    }, 1500);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c0d14] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Strip inspired by Doocti Cloud Telephony */}
        <div className="px-5 py-3.5 bg-[#12131b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff7a1a] to-[#ff913d] flex items-center justify-center font-black text-black text-sm shadow-[0_0_12px_rgba(255,122,26,0.5)]">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-sm tracking-tight">Doocti Telephony &amp; CRM</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                  v2.1 LIVE DEMO
                </span>
              </div>
              <p className="text-[10px] text-[#9d978a] font-mono">Full-Stack Cloud Telephony by Belintan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Agent Status Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${agentStatus === 'Available' ? 'bg-[#10b981] animate-pulse' : agentStatus === 'On Call' ? 'bg-[#ff7a1a]' : 'bg-[#eab308]'}`}></span>
              <span className="text-white text-xs">{agentStatus}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#9d978a] hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Left Column: Softphone & Call Controller */}
          <div className="md:col-span-5 p-5 flex flex-col justify-between bg-[#0e0f17]">
            
            {callStatus === 'connected' ? (
              /* Connected In-Call Screen */
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#10b981]/20 to-[#10b981]/40 border-2 border-[#10b981] flex items-center justify-center text-2xl text-white font-bold mb-4 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse">
                  SJ
                </div>
                <h4 className="text-lg font-bold text-white">Sarah Jenkins</h4>
                <p className="text-xs font-mono text-[#9d978a] mt-0.5">{phoneNumber}</p>
                <div className="mt-3 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/30 text-xs font-mono font-bold text-[#10b981]">
                  Connected • {formatTime(callTimer)}
                </div>

                {/* Animated Audio Wave */}
                <div className="flex items-center gap-1.5 h-12 my-6">
                  {[24, 40, 18, 36, 48, 22, 38, 44, 28, 16].map((h, i) => (
                    <span 
                      key={i} 
                      className="w-1.5 rounded-full bg-[#ff7a1a] animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>

                {/* In-Call Action Toggles */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-6">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`py-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      isMuted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{isMuted ? '🔇 Unmute' : '🎙️ Mute'}</span>
                  </button>
                  <button
                    onClick={() => setIsOnHold(!isOnHold)}
                    className={`py-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      isOnHold ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{isOnHold ? '▶️ Resume' : '⏸️ Hold'}</span>
                  </button>
                  <button
                    className="py-2.5 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs font-semibold flex flex-col items-center gap-1"
                    onClick={() => alert('Transfer agent directory initialized')}
                  >
                    <span>↗️ Transfer</span>
                  </button>
                </div>

                {/* End Call Button */}
                <button
                  onClick={handleEndCall}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(220,38,38,0.5)] transition-all"
                >
                  End Call
                </button>
              </div>
            ) : callStatus === 'calling' ? (
              /* Outbound Calling Screen */
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#ff7a1a]/20 border border-[#ff7a1a] flex items-center justify-center text-xl text-[#ff913d] font-bold mb-4 animate-bounce">
                  📞
                </div>
                <h4 className="text-base font-bold text-white">Dialing SIP Gateway...</h4>
                <p className="text-xs font-mono text-[#ff913d] mt-1">{phoneNumber}</p>
                <p className="text-[11px] text-[#9d978a] mt-4 animate-pulse">Routing through WebRTC Trunking Server...</p>
                <button
                  onClick={() => setCallStatus('idle')}
                  className="mt-8 px-6 py-2.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white font-semibold text-xs transition-colors"
                >
                  Cancel Call
                </button>
              </div>
            ) : (
              /* Dialpad Screen */
              <div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#08090d] border border-white/10 text-white font-mono text-center text-base tracking-widest focus:outline-none focus:border-[#ff7a1a]"
                    placeholder="Enter phone or SIP ID..."
                  />
                  {phoneNumber && (
                    <button
                      onClick={() => setPhoneNumber(phoneNumber.slice(0, -1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9d978a] hover:text-white"
                      title="Backspace"
                    >
                      ⌫
                    </button>
                  )}
                </div>

                {/* Dialpad Keys 0-9 */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
                    <button
                      key={d}
                      onClick={() => handleDigit(d)}
                      className="py-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/5 text-white font-bold text-base transition-all flex flex-col items-center justify-center"
                    >
                      <span>{d}</span>
                    </button>
                  ))}
                </div>

                {/* Call Button */}
                <button
                  onClick={handleStartCall}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>📞 Initiate VoIP Call</span>
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#9d978a]">
              <span>WebRTC: Connected</span>
              <span>Codec: Opus 48kHz</span>
            </div>
          </div>

          {/* Right Column: CRM Omnichannel Customer Record */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between bg-[#0a0b10]">
            <div>
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
                <button
                  onClick={() => setActiveTab('dialer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'dialer' ? 'bg-[#ff7a1a] text-black font-bold' : 'text-[#9d978a] hover:text-white'
                  }`}
                >
                  Lead Details
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'crm' ? 'bg-[#ff7a1a] text-black font-bold' : 'text-[#9d978a] hover:text-white'
                  }`}
                >
                  Deal Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'logs' ? 'bg-[#ff7a1a] text-black font-bold' : 'text-[#9d978a] hover:text-white'
                  }`}
                >
                  Call Recordings
                </button>
              </div>

              {/* Lead Details Content */}
              {activeTab === 'dialer' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] block">Inbound Lead</span>
                      <h3 className="text-base font-bold text-white mt-0.5">Sarah Jenkins</h3>
                      <p className="text-xs text-[#9d978a]">VP of Growth at FinTech Corp</p>
                      <p className="text-xs text-[#dcd7ce] font-mono mt-1">sarah.j@fintechcorp.io • +1 (555) 382-9901</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#ff7a1a]/20 text-[#ff913d] border border-[#ff7a1a]/30">
                      Tier 1 Prospect
                    </span>
                  </div>

                  {/* Disposition Quick Tags */}
                  <div>
                    <label className="block text-xs font-mono text-[#b5afa4] mb-2">Disposition Tag</label>
                    <div className="flex flex-wrap gap-2">
                      {['Interested', 'Demo Booked', 'Follow Up', 'Gatekeeper', 'Not Interested'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTag(t)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            selectedTag === t
                              ? 'bg-[#10b981] border-[#10b981] text-black font-bold'
                              : 'bg-white/5 border-white/10 text-[#9d978a] hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Call Notes */}
                  <div>
                    <label className="block text-xs font-mono text-[#b5afa4] mb-1.5">Agent Call Notes (Auto-Syncs with CRM)</label>
                    <textarea
                      rows={3}
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#ff7a1a]"
                    />
                  </div>
                </div>
              )}

              {/* Deal Pipeline Tab */}
              {activeTab === 'crm' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Full-Stack Cloud Retainer</h4>
                      <p className="text-[11px] text-[#9d978a]">Target Close: 15 Nov, 2026</p>
                    </div>
                    <span className="text-sm font-extrabold text-[#10b981] font-mono">₹75,000 / mo</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Custom WebRTC Dialer Integration</h4>
                      <p className="text-[11px] text-[#9d978a]">Milestone 1 Completed</p>
                    </div>
                    <span className="text-sm font-extrabold text-[#38bdf8] font-mono">₹35,000</span>
                  </div>
                </div>
              )}

              {/* Call Recordings Tab */}
              {activeTab === 'logs' && (
                <div className="space-y-2">
                  {[
                    { date: 'Today, 1:15 AM', duration: '03:42', disposition: 'Demo Booked', agent: 'Belintan' },
                    { date: 'Yesterday, 4:20 PM', duration: '01:18', disposition: 'Follow Up', agent: 'Belintan' },
                    { date: '29 Oct, 11:00 AM', duration: '05:04', disposition: 'Requirements Finalized', agent: 'Belintan' },
                  ].map((log, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-medium">{log.date}</span>
                        <span className="text-[10px] text-[#9d978a] block">Duration: {log.duration} • Agent: {log.agent}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-[#dcd7ce]">
                        {log.disposition}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-6">
              <span className="text-[11px] text-[#9d978a]">
                Powered by Node.js, Express, WebSocket &amp; PostgreSQL
              </span>
              <button
                onClick={() => alert('Call disposition and notes synchronized to CRM!')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Save to CRM &rarr;
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}