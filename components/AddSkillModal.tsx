import React, { useState } from 'react';
import { Skill } from '../types';

interface AddSkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSkill: (skill: Omit<Skill, 'id' | 'xp'>) => void;
}

export const AddSkillModal: React.FC<AddSkillModalProps> = ({ isOpen, onClose, onAddSkill }) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !icon) return;

        onAddSkill({ name, icon });
        setName('');
        setIcon('');
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold font-oxanium text-white mb-6">Add New Skill</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="skill-name" className="block text-sm font-semibold text-slate-300 mb-1">Skill Name</label>
                        <input type="text" id="skill-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Python Programming" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div>
                        <label htmlFor="skill-icon" className="block text-sm font-semibold text-slate-300 mb-1">Icon (Emoji)</label>
                        <input type="text" id="skill-icon" value={icon} onChange={e => setIcon(e.target.value)} placeholder="e.g., ✨" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">Add Skill</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
