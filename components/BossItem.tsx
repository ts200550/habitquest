import React from 'react';
import { Boss, BossType } from '../types';

interface BossItemProps {
    boss: Boss;
    onComplete: (bossId: string) => void;
    onDelete: (bossId: string) => void;
}

const bossTypeIcons: Record<BossType, string> = {
    Weekly: '🗡️',
    Monthly: '👹',
    Yearly: '👑',
};

export const BossItem: React.FC<BossItemProps> = ({ boss, onComplete, onDelete }) => {
    const dueDate = new Date(boss.dueDate);
    const now = new Date();
    const timeLeft = Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    return (
        <div className={`p-4 rounded-lg flex items-start gap-4 transition-all duration-300 ${boss.completed ? 'bg-slate-900/50 opacity-60' : 'bg-slate-900/70 border border-slate-700'}`}>
            <div className="text-3xl mt-1">{bossTypeIcons[boss.type]}</div>
            <div className="flex-grow">
                <p className={`font-bold text-lg ${boss.completed ? 'text-slate-400 line-through' : 'text-white'}`}>{boss.name}</p>
                <p className="text-slate-300 text-sm">{boss.objective}</p>
                <div className="text-xs text-slate-400 mt-2 flex items-center gap-4">
                   <span>Reward: {boss.reward} RP</span>
                   {!boss.completed && <span>Time Left: {timeLeft} days</span>}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
                {!boss.completed && (
                    <button onClick={() => onComplete(boss.id)} className="w-24 px-3 py-1 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition-colors">Complete</button>
                )}
                 <button onClick={() => onDelete(boss.id)} className="w-24 px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition-colors">Delete</button>
            </div>
        </div>
    );
};
