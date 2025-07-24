import React, { useState, useEffect, useMemo } from "react";
import { useHabitTracker } from "./hooks/useHabitTracker";
import { useBossFights } from "./hooks/useBossFights";
import { useSkills } from "./hooks/useSkills";
import { useHealthTracker } from "./hooks/useHealthTracker";
import { useReadingLog } from "./hooks/useReadingLog";
import { getFormattedDate, getRelativeDateString } from "./utils/dateUtils";

import { ProfileCard } from "./components/ProfileCard";
import { StatsDisplay } from "./components/StatsDisplay";
import { HabitTracker } from "./components/HabitTracker";
import { LevelUpModal } from "./components/LevelUpModal";
import { BossFights } from "./components/BossFights";
import { CreateBossModal } from "./components/CreateBossModal";
import { SkillsInventory } from "./components/SkillsInventory";
import { AddSkillModal } from "./components/AddSkillModal";
import { Navigation } from "./components/Navigation";
import { HealthDashboard } from "./components/HealthDashboard";
import { ReadingLog } from "./components/ReadingLog";
import { AddBookModal } from "./components/AddBookModal";
import { MoodAnalysis } from "./components/MoodAnalysis";
import { WordsOfMotivation } from "./components/WordsOfMotivation";

export const App = () => {
  const {
    level,
    xp,
    attributes,
    habitHistory,
    addHabitCompletion,
    removeHabitCompletion,
    lastLevel,
    setLastLevel,
  } = useHabitTracker();
  const { bosses, restPoints, addBoss, completeBoss, deleteBoss } = useBossFights();
  const { skills, addSkill, addSkillXp, deleteSkill, getSkillLevelInfo } = useSkills();
  const { height, setHeight, weightHistory, addWeightEntry, dailyMetricsHistory, updateDailyMetric, logMood, getMetricsForDate } = useHealthTracker();
  const { books, addBook, updateBook, deleteBook } = useReadingLog();

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isCreateBossModalOpen, setIsCreateBossModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  
  const [activeView, setActiveView] = useState<'quests' | 'health'>('quests');
  
  const [questsDate, setQuestsDate] = useState(new Date());
  const questsDateString = useMemo(() => getFormattedDate(questsDate), [questsDate]);
  
  const [healthDate, setHealthDate] = useState(new Date());

  useEffect(() => {
    if (level > lastLevel) {
      setIsLevelUpModalOpen(true);
      setLastLevel(level);
    }
  }, [level, lastLevel, setLastLevel]);

  const todaysCompletions = useMemo(() => habitHistory[questsDateString] || {}, [habitHistory, questsDateString]);
  
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-oxanium text-white">
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">Habit</span>Quest 🎮
          </h1>
          <p className="text-slate-400 mt-2">Your Life, Gamified</p>
        </header>

        <Navigation activeView={activeView} setActiveView={setActiveView} />

        {activeView === 'quests' ? (
          <div id="quest-board" className="mt-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-8">
                <ProfileCard level={level} xp={xp} restPoints={restPoints} />
                <StatsDisplay attributes={attributes} />
              </div>
              <div className="lg:col-span-2">
                 <HabitTracker 
                    date={questsDate}
                    setDate={setQuestsDate}
                    todaysCompletions={todaysCompletions}
                    addHabitCompletion={addHabitCompletion}
                    removeHabitCompletion={removeHabitCompletion}
                 />
              </div>
            </div>
             <MoodAnalysis habitHistory={habitHistory} dailyMetricsHistory={dailyMetricsHistory} />
             <WordsOfMotivation books={books} />
             <BossFights bosses={bosses} onComplete={completeBoss} onDelete={deleteBoss} onNew={() => setIsCreateBossModalOpen(true)} />
             <SkillsInventory skills={skills} onAddXp={addSkillXp} onDelete={deleteSkill} onNew={() => setIsAddSkillModalOpen(true)} getSkillLevelInfo={getSkillLevelInfo} />
             <ReadingLog books={books} onUpdate={updateBook} onDelete={deleteBook} onNew={() => setIsAddBookModalOpen(true)} />
          </div>
        ) : (
          <div id="health-hub" className="mt-6">
            <HealthDashboard
              date={healthDate}
              setDate={setHealthDate}
              height={height}
              setHeight={setHeight}
              weightHistory={weightHistory}
              addWeightEntry={addWeightEntry}
              metrics={getMetricsForDate(getFormattedDate(healthDate))}
              updateDailyMetric={updateDailyMetric}
              logMood={logMood}
            />
          </div>
        )}

      </div>

      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={() => setIsLevelUpModalOpen(false)}
        level={level}
      />
      <CreateBossModal 
        isOpen={isCreateBossModalOpen}
        onClose={() => setIsCreateBossModalOpen(false)}
        onAddBoss={addBoss}
      />
      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAddSkill={addSkill}
      />
      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        onAddBook={addBook}
      />
    </div>
  );
};
