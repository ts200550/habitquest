import React, { useEffect } from 'react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, onClose, level }) => {
  useEffect(() => {
    if (isOpen) {
      const audio = new Audio('https://www.myinstants.com/media/sounds/level-up-enhancements.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative text-center p-8 rounded-2xl m-4
                   bg-slate-900 border-2 border-amber-400
                   shadow-2xl shadow-amber-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-500 animate-pulse blur-2xl opacity-30"></div>
        <div className="relative">
          <h2 className="text-5xl font-bold font-oxanium mb-4 animate-bounce">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
              LEVEL UP!
            </span>
          </h2>
          <p className="text-slate-300 text-lg mb-2">You have reached</p>
          <p className="text-7xl font-bold font-oxanium text-white mb-6">Level {level}</p>
          <button
            onClick={onClose}
            className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-colors"
          >
            Continue Quest
          </button>
        </div>
      </div>
    </div>
  );
};
