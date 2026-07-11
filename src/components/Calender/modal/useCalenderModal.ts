import { useEffect, useId, useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';

import { formatSelectedDate } from '@/components/Calender/lib/formatSelectedDate';
import { getScheduleInput } from '@/components/Calender/lib/getScheduleInput';
import { parseScheduleDate } from '@/components/Calender/lib/scheduleDate';
import { ScheduleType } from '@/components/Calender/type/ScheduleType';
import { updateStore } from '@/store/update';

type UseCalenderModalParams = {
  openModal: boolean;
  selectedDate: Date | null;
  onClose: () => void;
};

const resetFormForNew = (
  selectedDate: Date,
  setters: {
    setEditingScheduleId: (id: string | null) => void;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
  }
) => {
  setters.setEditingScheduleId(null);
  setters.setTitle('');
  setters.setDescription('');
  setters.setStartDate(selectedDate);
  setters.setEndDate(selectedDate);
};

export default function useCalenderModal({
  openModal,
  selectedDate,
  onClose,
}: UseCalenderModalParams) {
  const modalTitleId = useId();
  const modalDescriptionId = useId();
  const scheduleTitleId = useId();
  const scheduleContentId = useId();
  const startDateId = useId();
  const endDateId = useId();
  const timeLegendId = useId();
  const scheduleFormId = useId();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(
    null
  );

  const isVisible = openModal && selectedDate !== null;
  const formattedDate = selectedDate ? formatSelectedDate(selectedDate) : '';
  const isEditing = editingScheduleId !== null;

  useEffect(() => {
    if (!openModal || !selectedDate) {
      return;
    }

    resetFormForNew(selectedDate, {
      setEditingScheduleId,
      setTitle,
      setDescription,
      setStartDate,
      setEndDate,
    });
  }, [openModal, selectedDate]);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    if (endDate < startDate) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (!openModal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openModal, onClose]);

  const selectScheduleForEdit = (schedule: ScheduleType) => {
    setEditingScheduleId(schedule.id);
    setTitle(schedule.title);
    setDescription(schedule.description);
    setStartDate(parseScheduleDate(schedule.start_date));
    setEndDate(parseScheduleDate(schedule.end_date));
  };

  const resetToNewSchedule = () => {
    if (!selectedDate) {
      return;
    }

    resetFormForNew(selectedDate, {
      setEditingScheduleId,
      setTitle,
      setDescription,
      setStartDate,
      setEndDate,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const scheduleInput = getScheduleInput(new FormData(event.currentTarget));

    try {
      const response = await fetch('/api/calender', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isEditing
            ? { scheduleId: editingScheduleId, schedule: scheduleInput }
            : { schedule: scheduleInput }
        ),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(
          data?.error ??
            (isEditing
              ? '일정 수정에 실패했습니다.'
              : '일정 등록에 실패했습니다.')
        );
        return;
      }

      toast.success(
        isEditing ? '일정이 수정되었습니다.' : '일정이 등록되었습니다.'
      );
      updateStore.getState().setUpdate(true);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        isEditing ? '일정 수정에 실패했습니다.' : '일정 등록에 실패했습니다.'
      );
    }
  };

  return {
    isVisible,
    formattedDate,
    isEditing,
    fieldIds: {
      modalTitleId,
      modalDescriptionId,
      scheduleTitleId,
      scheduleContentId,
      startDateId,
      endDateId,
      timeLegendId,
      scheduleFormId,
    },
    title,
    description,
    setTitle,
    setDescription,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    editingScheduleId,
    selectScheduleForEdit,
    resetToNewSchedule,
    handleSubmit,
    onClose,
  };
}
