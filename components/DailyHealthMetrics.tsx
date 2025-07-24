import React from 'react';
import { DailyHealthMetric } from '../types';

interface DailyHealthMetricsProps {
    date: Date;
    metrics: DailyHealthMetric;
    updateDailyMetric: (date: Date, metric: keyof DailyHealthMetric, value: number) => void;
    logMood: (date: Date, mood: number) => void;
}

const moodOptions = [
    { value: 1, icon: '😩', label: 'Awful' },
    { value: 2, icon: '😕', label: 'Not Great' },
    { value: 3, icon: '😐', label: 'Okay' },
    { value: 4, icon: '🙂', label: 'Good' },
    { value: 5, icon: '🚀', label: 'Fantastic' },
];

export const DailyHealthMetrics: React.FC<DailyHealthMetricsProps> = ({ date, metrics, updateDailyMetric, logMood }) => {
    return (
        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
            <h3 className="font-oxanium text-lg font-bold text-white mb-4">🧪 Daily Vitals</h3>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="water" className="block text-sm font-semibold text-slate-300 mb-1">💧 Water (glasses)</label>
                        <input
                            type="number"
                            id="water"
                            min="0"
                            value={metrics.water || ''}
                            onChange={(e) => updateDailyMetric(date, 'water', parseInt(e.target.value))}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="sleep" className="block text-sm font-semibold text-slate-300 mb-1">🌙 Sleep (hours)</label>
                        <input
                            type="number"
                            id="sleep"
                            min="0"
                            step="0.5"
                            value={metrics.sleep || ''}
                            onChange={(e) => updateDailyMetric(date, 'sleep', parseFloat(e.target.value))}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Today's Mood</label>
                    <div className="flex justify-around bg-slate-800 p-2 rounded-lg">
                        {moodOptions.map(option => (
                            <button
                                key={option.value}
                                onClick={() => logMood(date, option.value)}
                                title={option.label}
                                className={`p-2 rounded-full text-2xl transition-all duration-200 ${
                                    metrics.mood === option.value ? 'bg-cyan-500/30 ring-2 ring-cyan-400 scale-110' : 'hover:bg-slate-700'
                                }`}
                                aria-pressed={metrics.mood === option.value}
                            >
                                {option.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
