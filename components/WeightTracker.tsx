import React, { useState, useEffect } from 'react';
import { WeightEntry } from '../types';
import { getFormattedDate } from '../utils/dateUtils';

interface WeightTrackerProps {
    date: Date;
    weightHistory: WeightEntry[];
    addWeightEntry: (weight: number, date: Date) => void;
}

export const WeightTracker: React.FC<WeightTrackerProps> = ({ date, weightHistory, addWeightEntry }) => {
    const [weightInput, setWeightInput] = useState('');
    
    const dateString = getFormattedDate(date);
    const weightForSelectedDate = weightHistory.find(e => e.date === dateString);

    useEffect(() => {
        setWeightInput(weightForSelectedDate ? weightForSelectedDate.weight.toString() : '');
    }, [date, weightForSelectedDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const weight = parseFloat(weightInput);
        if (weight > 0) {
            addWeightEntry(weight, date);
        }
    };
    
    const displayedHistory = [...weightHistory].reverse().slice(0, 5);

    return (
        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
            <h3 className="font-oxanium text-lg font-bold text-white mb-4">Weight Log</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                             <label htmlFor="weight" className="block text-sm font-semibold text-slate-300 mb-1">
                                Weight (kg) for {date.toLocaleDateString()}
                            </label>
                            <input
                                type="number"
                                id="weight"
                                step="0.1"
                                value={weightInput}
                                onChange={(e) => setWeightInput(e.target.value)}
                                placeholder={weightForSelectedDate ? `Current: ${weightForSelectedDate.weight} kg` : "e.g., 70.5"}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <button type="submit" className="w-full px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                            {weightForSelectedDate ? 'Update Log' : 'Log Weight'}
                        </button>
                    </form>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-300 mb-2">Recent Entries</h4>
                    {displayedHistory.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {displayedHistory.map(entry => (
                                <li key={entry.date} className="flex justify-between bg-slate-800 p-2 rounded-md">
                                    <span className="text-slate-400">{new Date(entry.date).toLocaleDateString()}</span>
                                    <span className="font-bold text-white">{entry.weight} kg</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 text-center py-4">No weight history yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
