export type Attribute = "Aesthetic" | "Mental Health" | "Strength" | "Creative" | "Focus" | "Capability";

export interface Habit {
  id: string;
  name: string;
  attribute: Attribute;
  icon: string;
}

export interface HabitCompletion {
  [habitId: string]: number;
}

export interface HabitHistory {
  [date: string]: HabitCompletion;
}

export type BossType = 'Weekly' | 'Monthly' | 'Yearly';

export interface Boss {
    id: string;
    name: string;
    type: BossType;
    objective: string;
    dueDate: string;
    reward: number;
    completed: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  xp: number;
}

export interface SkillLevelInfo {
  level: number;
  xpInLevel: number;
  xpForNextLevel: number;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface DailyHealthMetric {
  water?: number;
  sleep?: number;
  mood?: number;
}

export interface HealthData {
    height?: number;
    weightHistory: WeightEntry[];
    dailyMetricsHistory: { [date: string]: DailyHealthMetric };
}

export type BookStatus = "Reading" | "Completed" | "Wishlist";

export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
    notes?: string;
    pageCount?: number;
    currentPage?: number;
    quotes?: string[];
}
