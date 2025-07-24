import React from 'react';
import { ProgressBar } from './ProgressBar';
import { LEVEL_THRESHOLDS, ATTRIBUTE_TITLES } from '../constants';

interface ProfileCardProps {
  level: number;
  xp: number;
  restPoints: number;
}

const getTitle = (level: number) => {
    let currentTitle = ATTRIBUTE_TITLES[0];
    for (const lvl in ATTRIBUTE_TITLES) {
        if (level >= parseInt(lvl)) {
            currentTitle = ATTRIBUTE_TITLES[lvl as any];
        }
    }
    return currentTitle;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ level, xp, restPoints }) => {
  const currentLevelXp = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevelXp = LEVEL_THRESHOLDS[level] || (LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length-1] + 10);
  const xpInLevel = xp - currentLevelXp;
  const xpForNextLevel = nextLevelXp - currentLevelXp;
  const title = getTitle(level);

  return (
    <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm
                    hover:border-cyan-400 transition-colors duration-300
                    shadow-cyan-500/10 hover:shadow-cyan-500/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-oxanium text-white">Character Sheet</h2>
        <div className="text-sm font-semibold bg-slate-700 text-cyan-300 px-3 py-1 rounded-full">
          {title}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-1">
            <span className="font-semibold text-slate-300">Level</span>
            <span className="font-bold text-2xl font-oxanium text-white">{level}</span>
        </div>
        <div className="flex justify-between items-baseline text-sm">
            <span className="font-semibold text-slate-400">XP</span>
            <span className="font-semibold font-oxanium text-slate-300">{xpInLevel} / {xpForNextLevel}</span>
        </div>
        <ProgressBar value={xpInLevel} max={xpForNextLevel} />
      </div>
       <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg">
        <span className="font-semibold text-slate-300">Rest Points 🛡️</span>
        <span className="font-bold text-lg font-oxanium text-white bg-gradient-to-r from-purple-400 to-indigo-500 px-3 py-1 rounded-full shadow-lg">{restPoints}</span>
      </div>
    </div>
  );
};
