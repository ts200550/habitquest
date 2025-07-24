import React from 'react';
import { Habit } from '../types';

interface HabitItemProps {
  habit: Habit;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const HabitItem: React.FC<HabitItemProps> = ({ habit, count, onAdd, onRemove }) => {
  const isCompleted = count > 0;
  const baseStyle = "flex items-center justify-between p-3 rounded-lg transition-all duration-300";
  const completedStyle = "bg-gradient-to-r from-green-500/20 to-slate-900 border-green-500/60 shadow-lg shadow-green-500/10";
  const incompleteStyle = "bg-slate-900/70 border-slate-700 hover:bg-slate-800/90";
  
  return (
    <div className={`${baseStyle} ${isCompleted ? completedStyle : incompleteStyle}`}>
      <div className="flex items-center">
        <span className="text-2xl mr-4">{habit.icon}</span>
        <div>
          <p className={`font-semibold ${isCompleted ? 'text-white' : 'text-slate-300'}`}>{habit.name}</p>
          <p className="text-xs text-slate-400">{habit.attribute}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRemove}
          aria-label={`Remove one ${habit.name} completion`}
          disabled={count === 0}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300
                      bg-slate-700 text-slate-400 
                      ${count > 0 ? 'hover:bg-red-600 hover:text-white' : 'opacity-50 cursor-not-allowed'}
                    `}
        >
          -
        </button>
        <span className="font-oxanium text-xl font-bold w-8 text-center text-white">{count}</span>
        <button
          onClick={onAdd}
          aria-label={`Add one ${habit.name} completion`}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300
                      bg-slate-700 text-slate-400 hover:bg-green-600 hover:text-white
                    `}
        >
          +
        </button>
      </div>
    </div>
  );
};