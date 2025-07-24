import React from 'react';
import { Skill, SkillLevelInfo } from '../types';
import { ProgressBar } from './ProgressBar';

interface SkillItemProps {
    skill: Skill;
    onAddXp: (skillId: string, amount: number) => void;
    onDelete: (skillId: string) => void;
    levelInfo: SkillLevelInfo;
}

export const SkillItem: React.FC<SkillItemProps> = ({ skill, onAddXp, onDelete, levelInfo }) => {
    return (
        <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-lg font-bold text-white"><span className="mr-2">{skill.icon}</span>{skill.name}</p>
                    <p className="text-sm text-cyan-400 font-semibold">Level {levelInfo.level}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onAddXp(skill.id, 1)} className="px-3 py-1 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition-colors text-sm">+1 XP</button>
                    <button onClick={() => onAddXp(skill.id, 5)} className="px-3 py-1 bg-sky-600 text-white font-semibold rounded hover:bg-sky-500 transition-colors text-sm">+5 XP</button>
                    <button onClick={() => onDelete(skill.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors text-lg">×</button>
                </div>
            </div>
            <div className="mt-3">
                 <div className="flex justify-between items-baseline text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{levelInfo.xpInLevel} / {levelInfo.xpForNextLevel} XP</span>
                </div>
                <ProgressBar value={levelInfo.xpInLevel} max={levelInfo.xpForNextLevel} />
            </div>
        </div>
    );
};
