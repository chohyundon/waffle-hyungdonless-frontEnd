const CALENDAR_LOCALE = 'ko-KR';

export const formatSelectedDate = (date: Date) =>
  new Intl.DateTimeFormat(CALENDAR_LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
