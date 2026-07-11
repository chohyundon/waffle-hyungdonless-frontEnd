import { toScheduleDateValue } from '@/components/Calender/lib/scheduleDate';
import { ScheduleType } from '@/components/Calender/type/ScheduleType';

export const isDateInScheduleRange = (date: Date, schedule: ScheduleType) => {
  const dateValue = toScheduleDateValue(date);

  return dateValue >= schedule.start_date && dateValue <= schedule.end_date;
};

export const getSchedulesForDate = (date: Date, schedules: ScheduleType[]) => {
  return schedules.filter((schedule) => isDateInScheduleRange(date, schedule));
};
