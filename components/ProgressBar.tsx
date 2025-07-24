import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
