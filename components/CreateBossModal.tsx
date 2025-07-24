import React, { useState } from 'react';
import { Boss, BossType } from '../types';

interface CreateBossModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddBoss: (boss: Omit<Boss, 'id' | 'completed'>) => void;
}

export const CreateBossModal: React.FC<CreateBossModalProps> = ({ isOpen, onClose, onAddBoss }) => {
    const [name, setName] = useState('');
    const [objective, setObjective] = useState('');
    const [type, setType] = useState<BossType>('Weekly');
    const [dueDate, setDueDate] = useState('');
    const [reward, setReward] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !objective || !dueDate) return;

        onAddBoss({ name, objective, type, dueDate, reward });
        setName('');
        setObjective('');
        setType('Weekly');
        setDueDate('');
        setReward(1);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold font-oxanium text-white mb-6">Create New Quest</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-1">Quest Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                     <div>
                        <label htmlFor="objective" className="block text-sm font-semibold text-slate-300 mb-1">Objective</label>
                        <textarea id="objective" value={objective} onChange={e => setObjective(e.target.value)} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div>
                            <label htmlFor="type" className="block text-sm font-semibold text-slate-300 mb-1">Type</label>
                            <select id="type" value={type} onChange={e => setType(e.target.value as BossType)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-300 mb-1">Due Date</label>
                            <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                        </div>
                        <div>
                            <label htmlFor="reward" className="block text-sm font-semibold text-slate-300 mb-1">Reward (RP)</label>
                            <input type="number" id="reward" min="1" value={reward} onChange={e => setReward(parseInt(e.target.value))} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">Create Quest</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
