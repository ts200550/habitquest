import React, { useState, useMemo } from 'react';

interface BMITrackerProps {
    height?: number;
    setHeight: (height: number) => void;
    latestWeight?: number;
}

export const BMITracker: React.FC<BMITrackerProps> = ({ height, setHeight, latestWeight }) => {
    const [heightInput, setHeightInput] = useState(height ? height.toString() : '');

    const handleSetHeight = () => {
        const h = parseFloat(heightInput);
        if (h > 0) {
            setHeight(h);
        }
    };

    const { bmi, category, color } = useMemo(() => {
        if (height && latestWeight) {
            const heightInMeters = height / 100;
            const bmiValue = parseFloat((latestWeight / (heightInMeters * heightInMeters)).toFixed(1));
            
            if (bmiValue < 18.5) return { bmi: bmiValue, category: 'Underweight', color: 'text-sky-400' };
            if (bmiValue < 25) return { bmi: bmiValue, category: 'Normal weight', color: 'text-green-400' };
            if (bmiValue < 30) return { bmi: bmiValue, category: 'Overweight', color: 'text-yellow-400' };
            return { bmi: bmiValue, category: 'Obesity', color: 'text-red-500' };
        }
        return { bmi: null, category: 'N/A', color: 'text-slate-400' };
    }, [height, latestWeight]);

    return (
        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700 h-full flex flex-col justify-between">
            <div>
                <h3 className="font-oxanium text-lg font-bold text-white mb-3">🧬 BMI Calculator</h3>
                <div className="flex items-baseline justify-center text-center gap-4 p-4 bg-slate-800 rounded-lg">
                    {bmi ? (
                        <>
                           <div>
                                <p className="text-4xl font-bold font-oxanium text-white">{bmi}</p>
                                <p className="text-sm text-slate-400">BMI</p>
                            </div>
                            <div>
                                <p className={`text-2xl font-semibold font-oxanium ${color}`}>{category}</p>
                                <p className="text-sm text-slate-400">Category</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-slate-400">Enter height and log weight to calculate BMI.</p>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="height" className="block text-sm font-semibold text-slate-300 mb-1">Height (cm)</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        id="height"
                        value={heightInput}
                        onChange={(e) => setHeightInput(e.target.value)}
                        placeholder="e.g., 175"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button onClick={handleSetHeight} className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">Set</button>
                </div>
            </div>
        </div>
    );
};
