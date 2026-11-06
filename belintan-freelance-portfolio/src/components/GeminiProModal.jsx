import { useState, useRef, useEffect } from 'react';

const PRESET_PILLS = [
  { id: 'estimate', label: '📋 Fast Quote Breakdown', model: 'gemini-2.5-pro', prompt: 'Estimate a high-converting web app with WebSockets, WhatsApp automation, and dynamic pricing.' },
  { id: 'reel_script', label: '🎬 9:16 Viral Reel Script', model: 'gemini-2.5-flash', prompt: 'Create a 30-second high-energy Instagram Reel script showcasing modern freelance web development.' },
  { id: 'retouch', label: '🎨 Album Retouching Brief', model: 'gemini-2.5-pro', prompt: 'Draft a commercial color grading and skin texture retouching brief for a luxury wedding album.' },
  { id: 'mcp_server', label: '⚡ FastMCP Tool Architecture', model: 'gemini-2.5-pro', prompt: 'Architect a Model Context Protocol (MCP) server exposing CRM lead intake and quote calculation tools.' },
];

function getFormattedTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function GeminiProModal({ isOpen, onClose }) {
  const [selectedMode, setSelectedMode] = useState('estimate');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro');
  const [prompt, setPrompt] = useState(PRESET_PILLS[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [tokensStreamed, setTokensStreamed] = useState(0);

  const abortControllerRef = useRef(null);
  const responseEndRef = useRef(null);

  useEffect(() => {
    if (responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedText]);

  if (!isOpen) return null;

  const handleSelectPill = (pill) => {
    setSelectedMode(pill.id);
    setSelectedModel(pill.model);
    setPrompt(pill.prompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedText('');
    setTokensStreamed(0);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          mode: selectedMode
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const block of lines) {
          const linesInBlock = block.split('\n');
          let eventType = 'message';
          let dataText = '';

          for (const line of linesInBlock) {
            if (line.startsWith('event: ')) {
              eventType = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
              dataText = line.slice(6);
            }
          }

          if (dataText) {
            try {
              const dataObj = JSON.parse(dataText);
              if (eventType === 'token' && dataObj.text) {
                setGeneratedText((prev) => prev + dataObj.text);
                setTokensStreamed((prev) => prev + 1);
              } else if (eventType === 'error') {
                setGeneratedText((prev) => prev + `\n\n[Error: ${dataObj.message}]`);
              }
            } catch {
              // Ignore non-json keepalive
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setGeneratedText((prev) => prev + `\n\n⚠️ Error during generation: ${err.message}`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    const textToSend = `Hi Belintan, I generated this project scope on your website:\n\n${generatedText.slice(0, 800)}\n\nCan we discuss starting this?`;
    const url = `https://wa.me/918610662871?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c0d14] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-5 py-4 bg-[#12131b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center font-black text-white text-sm shadow-[0_0_14px_rgba(59,130,246,0.6)]">
              ✦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-sm tracking-tight">Gemini AI Studio</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/30">
                  STREAMING API
                </span>
              </div>
              <p className="text-[10px] text-[#9d978a] font-mono">Real-time LLM Scoping Engine by Belintan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Model Selector */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#3b82f6]"
            >
              <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
            </select>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#9d978a] hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Preset Mode Pills */}
        <div className="px-5 py-3 bg-[#0e0f17] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {PRESET_PILLS.map((pill) => (
            <button
              key={pill.id}
              onClick={() => handleSelectPill(pill)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedMode === pill.id
                  ? 'bg-gradient-to-r from-[#ff7a1a] to-[#ff913d] text-black font-extrabold border-transparent shadow-[0_2px_12px_rgba(255,122,26,0.4)]'
                  : 'bg-white/5 text-[#9d978a] border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Prompt Input Box */}
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your app, video project, or AI workflow..."
              className="w-full px-4 py-3 rounded-2xl bg-[#090a10] border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#3b82f6] resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-mono text-[#78716c]">
                Mode: <span className="text-white">{selectedMode}</span> • Model: <span className="text-[#60a5fa]">{selectedModel}</span>
              </span>

              <div className="flex items-center gap-2">
                {isGenerating ? (
                  <button
                    onClick={handleStop}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>⏹ Stop Streaming</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white font-extrabold text-xs shadow-[0_4px_16px_rgba(59,130,246,0.4)] transition-all flex items-center gap-1.5"
                  >
                    <span>Generate Specification</span>
                    <span>&rarr;</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stream Output Display */}
          {(generatedText || isGenerating) && (
            <div className="p-4 rounded-2xl bg-[#08090f] border border-white/10 relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-[#10b981] animate-ping' : 'bg-[#10b981]'}`} />
                  <span className="text-xs font-mono text-white font-bold">
                    {isGenerating ? 'Streaming Real-Time Tokens...' : 'Generation Complete'}
                  </span>
                  {tokensStreamed > 0 && (
                    <span className="text-[10px] font-mono text-[#9d978a]">
                      ({tokensStreamed} chunks)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-[#dcd7ce] transition-colors"
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                  <button
                    onClick={handleSendToWhatsApp}
                    className="px-2.5 py-1 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[11px] font-mono text-[#25D366] font-bold transition-colors"
                  >
                    📱 Send Scope to WhatsApp
                  </button>
                </div>
              </div>

              <div className="font-mono text-xs leading-relaxed text-[#e6e2dd] whitespace-pre-wrap max-h-72 overflow-y-auto pr-2">
                {generatedText}
                {isGenerating && <span className="inline-block w-2 h-4 bg-[#60a5fa] animate-pulse ml-0.5" />}
                <div ref={responseEndRef} />
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#0a0b10] border-t border-white/10 flex items-center justify-between text-[11px] text-[#9d978a]">
          <span className="font-mono">ProfileBelintan.com • Sub-second AI Execution</span>
          <span className="text-[10px] text-[#78716c]">Generated at {getFormattedTime()}</span>
        </div>

      </div>
    </div>
  );
}
