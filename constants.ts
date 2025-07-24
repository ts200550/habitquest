import { Habit } from './types';

export const HABITS: Habit[] = [
  { id: 'skincare', name: 'Skincare', attribute: 'Aesthetic', icon: '💎' },
  { id: 'meditate', name: 'Meditate', attribute: 'Mental Health', icon: '🌀' },
  { id: 'exercise', name: 'Exercise', attribute: 'Strength', icon: '💪' },
  { id: 'create', name: 'Draw/Create', attribute: 'Creative', icon: '🎨' },
  { id: 'study', name: 'Study', attribute: 'Focus', icon: '🎯' },
  { id: 'skill_build', name: 'Skill Build', attribute: 'Capability', icon: '⚙️' },
];

export const LEVEL_THRESHOLDS = [0, 10, 25, 50, 80, 120, 170, 230, 300, 380, 470, 570, 680, 800, 930, 1070, 1220, 1380, 1550, 1730, 1920, 2120, 2330, 2550, 2780, 3020, 3270, 3530, 3800, 4080];

export const ATTRIBUTE_TITLES: { [key: number]: string } = {
  0: 'Novice Adventurer',
  10: 'Apprentice Quester',
  25: 'Seasoned Traveler',
  50: 'Habit Conqueror',
  100: 'Master of Will',
  200: 'Legendary Hero',
};
