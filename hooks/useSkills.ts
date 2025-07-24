import { useState } from 'react';
import { Skill, SkillLevelInfo } from '../types';

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

const SKILL_XP_PER_LEVEL = 10;

export const useSkills = () => {
    const [skills, setSkills] = useLocalStorage<Skill[]>('habitQuest-skills', []);

    const addSkill = (skill: Omit<Skill, 'id' | 'xp'>) => {
        const newSkill: Skill = {
            ...skill,
            id: new Date().toISOString(),
            xp: 0,
        };
        setSkills([...skills, newSkill]);
    };

    const addSkillXp = (skillId: string, amount: number) => {
        setSkills(skills.map(s => 
            s.id === skillId ? { ...s, xp: s.xp + amount } : s
        ));
    };
    
    const deleteSkill = (skillId: string) => {
        setSkills(skills.filter(s => s.id !== skillId));
    };
    
    const getSkillLevelInfo = (xp: number): SkillLevelInfo => {
        const level = Math.floor(xp / SKILL_XP_PER_LEVEL) + 1;
        const xpForCurrentLevel = (level - 1) * SKILL_XP_PER_LEVEL;
        const xpInLevel = xp - xpForCurrentLevel;
        return {
            level,
            xpInLevel,
            xpForNextLevel: SKILL_XP_PER_LEVEL
        };
    };

    return {
        skills,
        addSkill,
        addSkillXp,
        deleteSkill,
        getSkillLevelInfo,
    };
};