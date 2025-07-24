import React from 'react';

interface NavigationProps {
    activeView: 'quests' | 'health';
    setActiveView: (view: 'quests' | 'health') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
    const getButtonClass = (view: 'quests' | 'health') => {
        const baseClass = "w-full text-center font-oxanium font-bold py-3 text-lg transition-all duration-300 rounded-t-lg";
        if (activeView === view) {
            return `${baseClass} text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500 border-b-2 border-cyan-400`;
        }
        return `${baseClass} text-slate-400 hover:text-white`;
    };

    return (
        <div className="bg-slate-800/80 rounded-t-xl p-1 border-b border-slate-700 backdrop-blur-sm flex">
            <button
                onClick={() => setActiveView('quests')}
                className={getButtonClass('quests')}
                aria-pressed={activeView === 'quests'}
            >
                🚀 Quest Board
            </button>
            <button
                onClick={() => setActiveView('health')}
                className={getButtonClass('health')}
                aria-pressed={activeView === 'health'}
            >
                💖 Health Hub
            </button>
        </div>
    );
};
