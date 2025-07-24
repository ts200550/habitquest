import React, { useMemo } from 'react';
import { HabitHistory, DailyHealthMetric } from '../types';

interface MoodAnalysisProps {
    habitHistory: HabitHistory;
    dailyMetricsHistory: { [date: string]: DailyHealthMetric };
}

export const MoodAnalysis: React.FC<MoodAnalysisProps> = ({ habitHistory, dailyMetricsHistory }) => {
    const analysis = useMemo(() => {
        const dataPoints = Object.keys(dailyMetricsHistory)
            .map(date => ({
                date,
                mood: dailyMetricsHistory[date]?.mood,
                habitsCompleted: Object.values(habitHistory[date] || {}).reduce((sum, count) => sum + count, 0)
            }))
            .filter(point => point.mood !== undefined && point.mood > 0);

        if (dataPoints.length < 3) {
            return {
                insight: "Log your mood and complete quests for a few more days to unlock your burnout analysis.",
                averageHabits: null,
                correlation: null,
            };
        }

        const avgMood = dataPoints.reduce((sum, p) => sum + p.mood!, 0) / dataPoints.length;
        const avgHabits = dataPoints.reduce((sum, p) => sum + p.habitsCompleted, 0) / dataPoints.length;

        const goodDays = dataPoints.filter(p => p.mood! >= 4);
        const badDays = dataPoints.filter(p => p.mood! <= 2);

        if (goodDays.length === 0 || badDays.length === 0) {
            return {
                insight: "Keep logging to see a clearer picture of your productivity sweet spot.",
                averageHabits: avgHabits.toFixed(1),
                correlation: null,
            };
        }

        const avgHabitsOnGoodDays = goodDays.reduce((sum, p) => sum + p.habitsCompleted, 0) / goodDays.length;
        const avgHabitsOnBadDays = badDays.reduce((sum, p) => sum + p.habitsCompleted, 0) / badDays.length;
        
        let insight = `On your best days (mood ≥ 4/5), you complete an average of ${avgHabitsOnGoodDays.toFixed(1)} quests. `;
        if(avgHabitsOnGoodDays > avgHabitsOnBadDays) {
            insight += `This seems to be your sweet spot for feeling good and being productive. Keep aiming for this range!`;
        } else if (avgHabitsOnBadDays > avgHabitsOnGoodDays + 1) {
             insight += `On less positive days (mood ≤ 2/5), you tend to complete ${avgHabitsOnBadDays.toFixed(1)} quests. This might be a sign of pushing too hard, which could lead to burnout.`;
        } else {
             insight += `Your productivity seems consistent across different moods. Great job maintaining a steady pace!`;
        }

        return { insight, averageHabits: avgHabits.toFixed(1) };
    }, [habitHistory, dailyMetricsHistory]);

    return (
        <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
            <h2 className="text-xl font-bold font-oxanium text-white mb-2 p-0 border-none">🧠 Mood & Burnout Analysis</h2>
            <div className="text-center bg-slate-900/50 p-4 rounded-lg">
                <p className="text-slate-300 italic">{analysis.insight}</p>
                {analysis.averageHabits && (
                    <p className="text-sm text-slate-400 mt-2">
                        Overall Daily Quest Average: <span className="font-bold text-white">{analysis.averageHabits}</span>
                    </p>
                )}
            </div>
        </div>
    );
};