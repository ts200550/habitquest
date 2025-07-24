import React from 'react';
import { Boss } from '../types';
import { BossItem } from './BossItem';

interface BossFightsProps {
    bosses: Boss[];
    onComplete: (bossId: string) => void;
    onDelete: (bossId: string) => void;
    onNew: () => void;
}

export const BossFights: React.FC<BossFightsProps> = ({ bosses, onComplete, onDelete, onNew }) => {
    const activeBosses = bosses.filter(b => !b.completed);
    const completedBosses = bosses.filter(b => b.completed);

    return (
        <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-oxanium text-white m-0 p-0 border-none">⚔️ Boss Battles</h2>
                <button onClick={onNew} className="font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">New Quest</button>
            </div>
            {bosses.length === 0 ? (
                 <p className="text-slate-400 text-center py-4">No active quests. Create a new boss battle to challenge yourself!</p>
            ) : (
                <div className="space-y-4">
                    {activeBosses.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-300 mb-2">Active</h3>
                            <div className="space-y-3">
                                {activeBosses.map(boss => (
                                    <BossItem key={boss.id} boss={boss} onComplete={onComplete} onDelete={onDelete} />
                                ))}
                            </div>
                        </div>
                    )}
                    {completedBosses.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-400 mb-2">Completed</h3>
                            <div className="space-y-3">
                                {completedBosses.map(boss => (
                                    <BossItem key={boss.id} boss={boss} onComplete={onComplete} onDelete={onDelete} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
