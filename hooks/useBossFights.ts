import { useState, useEffect } from 'react';
import { Boss } from '../types';

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


export const useBossFights = () => {
    const [bosses, setBosses] = useLocalStorage<Boss[]>('habitQuest-bosses', []);
    const [restPoints, setRestPoints] = useLocalStorage<number>('habitQuest-restPoints', 0);

    const addBoss = (boss: Omit<Boss, 'id' | 'completed'>) => {
        const newBoss: Boss = {
            ...boss,
            id: new Date().toISOString(),
            completed: false,
        };
        setBosses([...bosses, newBoss]);
    };

    const completeBoss = (bossId: string) => {
        const boss = bosses.find(b => b.id === bossId);
        if (boss && !boss.completed) {
            setRestPoints(prev => prev + boss.reward);
            setBosses(bosses.map(b => b.id === bossId ? { ...b, completed: true } : b));
        }
    };

    const deleteBoss = (bossId: string) => {
        setBosses(bosses.filter(b => b.id !== bossId));
    };

    return {
        bosses,
        restPoints,
        addBoss,
        completeBoss,
        deleteBoss,
    };
};