import React from 'react';
import { Attribute } from '../types';

interface StatsDisplayProps {
  attributes: Record<Attribute, number>;
}

const attributeInfo: Record<Attribute, { icon: string; color: string; gradient: string }> = {
  "Aesthetic": { icon: '💎', color: 'text-pink-400', gradient: 'from-pink-500/20 to-slate-900' },
  "Mental Health": { icon: '🌀', color: 'text-sky-400', gradient: 'from-sky-500/20 to-slate-900' },
  "Strength": { icon: '💪', color: 'text-red-500', gradient: 'from-red-500/20 to-slate-900' },
  "Creative": { icon: '🎨', color: 'text-purple-400', gradient: 'from-purple-500/20 to-slate-900' },
  "Focus": { icon: '🎯', color: 'text-amber-400', gradient: 'from-amber-500/20 to-slate-900' },
  "Capability": { icon: '⚙️', color: 'text-green-400', gradient: 'from-green-500/20 to-slate-900' },
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ attributes }) => {
  return (
    <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
      <h2 className="text-xl font-bold font-oxanium text-white mb-4">Attribute Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(attributes).map(([attr, value]) => {
          const info = attributeInfo[attr as Attribute];
          return (
            <div key={attr} className={`text-center bg-slate-900 p-3 rounded-lg border border-slate-700/50 bg-gradient-to-br ${info.gradient}`}>
              <span className="text-3xl">{info.icon}</span>
              <p className={`font-semibold ${info.color} mt-1`}>{attr}</p>
              <p className="font-oxanium text-white text-2xl font-bold">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
