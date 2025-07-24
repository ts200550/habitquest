import React from 'react';
import { HabitItem } from './HabitItem';
import { HABITS } from '../constants';
import { HabitCompletion, Attribute } from '../types';
import { getRelativeDateString, getFormattedDate } from '../utils/dateUtils';

interface HabitTrackerProps {
  date: Date;
  setDate: (date: Date) => void;
  todaysCompletions: HabitCompletion;
  addHabitCompletion: (habitId: string, attribute: Attribute, date: Date) => void;
  removeHabitCompletion: (habitId: string, attribute: Attribute, date: Date) => void;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({ date, setDate, todaysCompletions, addHabitCompletion, removeHabitCompletion }) => {
    
  const handleDateChange = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const isToday = getFormattedDate(date) === getFormattedDate(new Date());
  
  return (
    <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-oxanium text-white m-0 p-0 border-none">
          Daily Quests for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">{getRelativeDateString(date)}</span>
        </h2>
        <div className="flex items-center gap-2">
            <button onClick={() => handleDateChange(-1)} className="px-3 py-1 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors">&lt;</button>
            <button onClick={() => handleDateChange(1)} disabled={isToday} className="px-3 py-1 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
        </div>
      </div>
      <div className="space-y-3">
        {HABITS.map(habit => (
          <HabitItem
            key={habit.id}
            habit={habit}
            count={todaysCompletions[habit.id] || 0}
            onAdd={() => addHabitCompletion(habit.id, habit.attribute, date)}
            onRemove={() => removeHabitCompletion(habit.id, habit.attribute, date)}
          />
        ))}
      </div>
    </div>
  );
};