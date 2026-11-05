import { useState } from 'react';

export default function PullCord() {
  const [pulled, setPulled] = useState(false);
  const [cosmicMode, setCosmicMode] = useState(false);

  const handlePull = () => {
    setPulled(true);
    setCosmicMode((prev) => !prev);
    
    // Toggle class on documentElement for subtle global lighting shift
    if (document.documentElement.classList.contains('cosmic-pulse')) {
      document.documentElement.classList.remove('cosmic-pulse');
    } else {
      document.documentElement.classList.add('cosmic-pulse');
    }

    setTimeout(() => {
      setPulled(false);
    }, 450);
  };

  return (
    <div className="fixed top-0 right-6 sm:right-12 z-50 flex flex-col items-center group cursor-pointer select-none">
      {/* The Cord Line */}
      <div 
        className="w-[1.5px] bg-gradient-to-b from-white/30 via-[#ff7a1a]/50 to-[#ff7a1a] transition-all duration-300"
        style={{
          height: pulled ? '85px' : '55px',
          boxShadow: '0 0 8px rgba(255, 122, 26, 0.4)',
        }}
      />

      {/* The Pull Bead / Bell */}
      <button
        onClick={handlePull}
        aria-label="Toggle Cosmic Ambiance (Pull Cord)"
        className={`w-3.5 h-6 rounded-full border border-[#ff7a1a]/60 flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(255,122,26,0.5)] ${
          pulled 
            ? 'bg-[#10b981] scale-125 border-[#10b981]' 
            : 'bg-gradient-to-b from-[#ff913d] to-[#ff7a1a] hover:scale-110'
        }`}
        title="Pull cord to shift cosmic aura"
      >
        <span className="w-1 h-1 rounded-full bg-black/60"></span>
      </button>

      {/* Floating Tooltip */}
      <span className="absolute top-16 right-0 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-[10px] font-mono text-[#ff913d] px-2 py-0.5 rounded border border-white/10 pointer-events-none whitespace-nowrap">
        {cosmicMode ? 'Cosmic: Nebula' : 'Pull Cord: Ambiance'}
      </span>
    </div>
  );
}