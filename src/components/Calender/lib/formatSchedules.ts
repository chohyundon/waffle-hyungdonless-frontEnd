import { ScheduleType } from '@/components/Calender/type/ScheduleType';

export const formatSchedules = (schedules: ScheduleType[]) => {
  const date = schedules.map((schedule) => {
    return {
      start_date: new Date(schedule.start_date).toISOString().split('T')[0],
      end_date: new Date(schedule.end_date).toISOString().split('T')[0],
    };
  });
  return date;
};
