import React from 'react';
import { Skill, SkillLevelInfo } from '../types';
import { SkillItem } from './SkillItem';

interface SkillsInventoryProps {
    skills: Skill[];
    onAddXp: (skillId: string, amount: number) => void;
    onDelete: (skillId: string) => void;
    onNew: () => void;
    getSkillLevelInfo: (xp: number) => SkillLevelInfo;
}

export const SkillsInventory: React.FC<SkillsInventoryProps> = ({ skills, onAddXp, onDelete, onNew, getSkillLevelInfo }) => {
    return (
        <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-oxanium text-white m-0 p-0 border-none">📖 Skills & Learning</h2>
                <button onClick={onNew} className="font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">New Skill</button>
            </div>
             {skills.length === 0 ? (
                 <p className="text-slate-400 text-center py-4">No skills being tracked. Add a new skill to start your learning journey!</p>
            ) : (
                <div className="space-y-3">
                    {skills.map(skill => (
                        <SkillItem 
                            key={skill.id} 
                            skill={skill} 
                            onAddXp={onAddXp} 
                            onDelete={onDelete}
                            levelInfo={getSkillLevelInfo(skill.xp)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
