import React, { useEffect, useState } from 'react';

interface IntroGlitchProps {
  onFinish: () => void;
}

const IntroGlitch: React.FC<IntroGlitchProps> = ({ onFinish }) => {
  const [text, setText] = useState('INITIALIZING...');
  
  useEffect(() => {
    const sequence = [
      { t: 'CONNECTING...', d: 0 },
      { t: 'BYPASSING FIREWALL...', d: 800 },
      { t: 'DECRYPTING DATA...', d: 1600 },
      { t: 'ACCESS GRANTED', d: 2400 },
    ];

    sequence.forEach(({ t, d }) => {
      setTimeout(() => setText(t), d);
    });

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3200);

    return () => clearTimeout(finishTimer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-mono">
      {/* Noise Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none animate-noise bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover"></div>
      
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>

      {/* Glitch Content */}
      <div className="relative z-20 text-center">
        <div className="relative inline-block">
          <h1 
            className="text-4xl md:text-6xl font-black text-pink-500 tracking-tighter animate-glitch"
            data-text={text}
          >
            {text}
          </h1>
          <p className="mt-4 text-green-500 text-sm md:text-base animate-pulse">
            TARGET: KWACK YONG-CHEOL
          </p>
        </div>
        
        {/* Loading Bar */}
        <div className="mt-8 w-64 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden border border-slate-700">
            <div className="h-full bg-pink-500 animate-progress origin-left"></div>
        </div>
      </div>

      <style>{`
        @keyframes noise {
          0%, 100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
        }
        
        @keyframes glitch {
          2%, 64% { transform: translate(2px,0) skew(0deg); }
          4%, 60% { transform: translate(-2px,0) skew(0deg); }
          62% { transform: translate(0,0) skew(5deg); }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .animate-noise {
          animation: noise 0.5s steps(10) infinite; 
        }

        .animate-glitch {
          animation: glitch 1s linear infinite;
        }

        .animate-progress {
          animation: progress 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Glitch effect using before/after pseudo-elements */
        .animate-glitch::before,
        .animate-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }

        .animate-glitch::before {
          left: 2px;
          text-shadow: -1px 0 #00ffea;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }

        .animate-glitch::after {
          left: -2px;
          text-shadow: -1px 0 #ff00ff;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(14px, 9999px, 127px, 0); }
          20% { clip: rect(84px, 9999px, 24px, 0); }
          40% { clip: rect(35px, 9999px, 89px, 0); }
          60% { clip: rect(6px, 9999px, 67px, 0); }
          80% { clip: rect(54px, 9999px, 12px, 0); }
          100% { clip: rect(102px, 9999px, 114px, 0); }
        }

        @keyframes glitch-anim-2 {
          0% { clip: rect(65px, 9999px, 110px, 0); }
          20% { clip: rect(12px, 9999px, 5px, 0); }
          40% { clip: rect(98px, 9999px, 15px, 0); }
          60% { clip: rect(32px, 9999px, 86px, 0); }
          80% { clip: rect(44px, 9999px, 62px, 0); }
          100% { clip: rect(23px, 9999px, 145px, 0); }
        }
      `}</style>
    </div>
  );
};

export default IntroGlitch;