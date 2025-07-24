import { useState, useEffect, useCallback } from 'react';
import { Attribute, HabitHistory } from '../types';
import { LEVEL_THRESHOLDS } from '../constants';
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

export const useHabitTracker = () => {
  const [xp, setXp] = useLocalStorage('habitQuest-xp', 0);
  const [level, setLevel] = useLocalStorage('habitQuest-level', 1);
  const [lastLevel, setLastLevel] = useLocalStorage('habitQuest-lastLevel', 1);
  const [attributes, setAttributes] = useLocalStorage<Record<Attribute, number>>('habitQuest-attributes', {
    "Aesthetic": 0,
    "Mental Health": 0,
    "Strength": 0,
    "Creative": 0,
    "Focus": 0,
    "Capability": 0,
  });
  const [habitHistory, setHabitHistory] = useLocalStorage<HabitHistory>('habitQuest-habitHistory', {});

  useEffect(() => {
    const newLevel = LEVEL_THRESHOLDS.filter(threshold => xp >= threshold).length;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  }, [xp, level, setLevel]);

  const addHabitCompletion = useCallback((habitId: string, attribute: Attribute, date: Date) => {
    const dateString = getFormattedDate(date);
    setHabitHistory(prev => {
      const newHistory = { ...prev };
      
      const dateHistory = newHistory[dateString] ? { ...newHistory[dateString] } : {};
      dateHistory[habitId] = (dateHistory[habitId] || 0) + 1;
      newHistory[dateString] = dateHistory;
      
      setXp(currentXp => currentXp + 1);
      setAttributes(prevAttrs => ({
        ...prevAttrs,
        [attribute]: prevAttrs[attribute] + 1,
      }));

      return newHistory;
    });
  }, [setHabitHistory, setXp, setAttributes]);

  const removeHabitCompletion = useCallback((habitId: string, attribute: Attribute, date: Date) => {
    const dateString = getFormattedDate(date);
    setHabitHistory(prev => {
      const newHistory = { ...prev };
      if (newHistory[dateString] && newHistory[dateString][habitId] > 0) {
        
        const dateHistory = { ...newHistory[dateString] };
        dateHistory[habitId] -= 1;

        setXp(currentXp => Math.max(0, currentXp - 1));
        setAttributes(prevAttrs => ({
          ...prevAttrs,
          [attribute]: Math.max(0, prevAttrs[attribute] - 1),
        }));

        if (dateHistory[habitId] === 0) {
          delete dateHistory[habitId];
        }

        if (Object.keys(dateHistory).length === 0) {
          delete newHistory[dateString];
        } else {
            newHistory[dateString] = dateHistory;
        }
      }
      return newHistory;
    });
  }, [setHabitHistory, setXp, setAttributes]);

  return {
    xp,
    level,
    lastLevel,
    attributes,
    habitHistory,
    addHabitCompletion,
    removeHabitCompletion,
    setLastLevel,
  };
};