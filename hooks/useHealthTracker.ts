import { useState, useCallback } from 'react';
import { HealthData, WeightEntry, DailyHealthMetric } from '../types';
import { getFormattedDate } from '../utils/dateUtils';

const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T | ((prevState: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useHealthTracker = () => {
    const [healthData, setHealthData] = useLocalStorage<HealthData>('habitQuest-healthData', {
        height: undefined,
        weightHistory: [],
        dailyMetricsHistory: {},
    });

    const { height, weightHistory, dailyMetricsHistory } = healthData;

    const setHeight = useCallback((newHeight: number) => {
        setHealthData(prev => ({ ...prev, height: newHeight }));
    }, [setHealthData]);

    const addWeightEntry = useCallback((weight: number, date: Date) => {
        const dateString = getFormattedDate(date);
        const newEntry: WeightEntry = { date: dateString, weight };
        
        setHealthData(prev => {
            const existingEntryIndex = prev.weightHistory.findIndex(e => e.date === dateString);
            let newHistory = [...prev.weightHistory];

            if (existingEntryIndex !== -1) {
                newHistory[existingEntryIndex] = newEntry;
            } else {
                newHistory.push(newEntry);
                newHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            }
            return { ...prev, weightHistory: newHistory };
        });
    }, [setHealthData]);

    const updateDailyMetric = useCallback((date: Date, metric: keyof DailyHealthMetric, value: number) => {
        const dateString = getFormattedDate(date);
        setHealthData(prev => {
            const newMetricsHistory = { ...prev.dailyMetricsHistory };
            if (!newMetricsHistory[dateString]) {
                newMetricsHistory[dateString] = {};
            }
            newMetricsHistory[dateString][metric] = value;
            return { ...prev, dailyMetricsHistory: newMetricsHistory };
        });
    }, [setHealthData]);
    
    const logMood = useCallback((date: Date, mood: number) => {
        updateDailyMetric(date, 'mood', mood);
    }, [updateDailyMetric]);

    const getMetricsForDate = useCallback((dateString: string): DailyHealthMetric => {
        return dailyMetricsHistory[dateString] || {};
    }, [dailyMetricsHistory]);

    return {
        height,
        setHeight,
        weightHistory,
        addWeightEntry,
        dailyMetricsHistory,
        updateDailyMetric,
        logMood,
        getMetricsForDate,
    };
};