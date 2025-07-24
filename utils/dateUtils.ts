export const getFormattedDate = (date: Date): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

export const getRelativeDateString = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const todayString = getFormattedDate(today);
    const yesterdayString = getFormattedDate(yesterday);
    const dateString = getFormattedDate(date);

    if (dateString === todayString) return "Today";
    if (dateString === yesterdayString) return "Yesterday";
    
    return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
