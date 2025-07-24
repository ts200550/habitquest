import React from 'react';
import { BMITracker } from './BMITracker';
import { WeightTracker } from './WeightTracker';
import { DailyHealthMetrics } from './DailyHealthMetrics';
import { WeightEntry, DailyHealthMetric } from '../types';
import { getFormattedDate, getRelativeDateString } from '../utils/dateUtils';

interface HealthDashboardProps {
    date: Date;
    setDate: (date: Date) => void;
    height?: number;
    setHeight: (height: number) => void;
    weightHistory: WeightEntry[];
    addWeightEntry: (weight: number, date: Date) => void;
    metrics: DailyHealthMetric;
    updateDailyMetric: (date: Date, metric: keyof DailyHealthMetric, value: number) => void;
    logMood: (date: Date, mood: number) => void;
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({
    date,
    setDate,
    height,
    setHeight,
    weightHistory,
    addWeightEntry,
    metrics,
    updateDailyMetric,
    logMood
}) => {
    const handleDateChange = (days: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
    };

    const isToday = getFormattedDate(date) === getFormattedDate(new Date());
    const latestWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : undefined;

    return (
        <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-oxanium text-white m-0 p-0 border-none">
                Health Log for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">{getRelativeDateString(date)}</span>
                </h2>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleDateChange(-1)} className="px-3 py-1 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors">&lt;</button>
                    <button onClick={() => handleDateChange(1)} disabled={isToday} className="px-3 py-1 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BMITracker height={height} setHeight={setHeight} latestWeight={latestWeight} />
                <DailyHealthMetrics date={date} metrics={metrics} updateDailyMetric={updateDailyMetric} logMood={logMood} />
            </div>

            <WeightTracker date={date} weightHistory={weightHistory} addWeightEntry={addWeightEntry} />
        </div>
    );
};
