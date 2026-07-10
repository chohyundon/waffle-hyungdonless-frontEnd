import { useEffect, useState } from 'react';

import { ScheduleType } from '@/components/Calender/type/ScheduleType';
import { updateStore } from '@/store/update';

export const useGetUserSchedulesForDate = (date: Date) => {
  const [userSchedules, setUserSchedules] = useState<ScheduleType[]>([]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/calender');

      if (!response.ok) {
        setUserSchedules([]);
        return;
      }

      const data = await response.json();
      setUserSchedules(data);
    } catch {
      setUserSchedules([]);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [date, fetchSchedules]);

  useEffect(() => {
    return updateStore.subscribe((state, prevState) => {
      if (!state.update || prevState.update) {
        return;
      }

      fetchSchedules();
      updateStore.getState().setUpdate(false);
    });
  }, [fetchSchedules]);

  return userSchedules;
};
