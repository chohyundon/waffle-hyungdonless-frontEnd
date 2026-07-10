'use client';

import { useState, type CSSProperties } from 'react';
import Calendar from 'react-calendar';

import styles from '@/components/Calender/style/Calender.module.css';
import CalenderModal from '@/components/Calender/modal/CalenderModal';
import { getSchedulesForDate } from '@/components/Calender/lib/getSchedulesForDate';
import { useGetUserSchedulesForDate } from '@/components/Calender/lib/useGetUserSchedulesForDate';
import { ScheduleType } from '@/components/Calender/type/ScheduleType';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CALENDAR_LOCALE = 'ko-KR';
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const calendarFormatters = {
  formatMonthYear: (_locale: string | undefined, date: Date) =>
    new Intl.DateTimeFormat(CALENDAR_LOCALE, {
      year: 'numeric',
      month: 'long',
    }).format(date),
  formatShortWeekday: (_locale: string | undefined, date: Date) =>
    WEEKDAYS[date.getDay()],
  formatDay: (_locale: string | undefined, date: Date) =>
    String(date.getDate()),
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getSelectedDate = (value: Value): Date | null => {
  if (value instanceof Date) {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  return null;
};

const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
  if (view !== 'month') {
    return null;
  }

  if (date.getDay() === 0) {
    return styles.sundayTile;
  }

  if (date.getDay() === 6) {
    return styles.saturdayTile;
  }

  return null;
};

const getTileContent =
  (schedules: ScheduleType[]) =>
  ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') {
      return null;
    }

    const daySchedules = getSchedulesForDate(date, schedules);

    if (!daySchedules.length) {
      return null;
    }

    return (
      <ul className={styles.tileScheduleList}>
        {daySchedules.map((schedule) => (
          <li key={schedule.id} className={styles.tileScheduleTitle}>
            {schedule.title}
          </li>
        ))}
      </ul>
    );
  };

export const CalenderScreen = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);

  const selectedDate = getSelectedDate(value);

  const isTodaySelected =
    selectedDate !== null && isSameDay(selectedDate, new Date());

  const calendarStyle = {
    '--first-day-column': String(activeStartDate.getDay() + 1),
  } as CSSProperties;

  const userSchedules = useGetUserSchedulesForDate(value as Date);

  return (
    <article className={styles.calenderScreen}>
      <CalenderModal
        userSchedules={userSchedules}
        openModal={openModal}
        selectedDate={selectedDate}
        onClose={() => setOpenModal(false)}
      />
      <div className={styles.calenderCard}>
        <header className={styles.calenderHeader}>
          <p className={styles.calenderEyebrow}>사부작 캘린더</p>
          <h1 className={styles.calenderTitle}>나의 일정</h1>
          <p className={styles.calenderDescription}>
            날짜를 선택해 일정을 확인하고 관리해 보세요.
          </p>
        </header>

        <div
          className={`${styles.calendarWrap} ${!isTodaySelected ? styles.hideTodayHighlight : ''}`}
          style={calendarStyle}
        >
          <Calendar
            value={value}
            onChange={onChange}
            className={styles.calendar}
            locale={CALENDAR_LOCALE}
            calendarType='gregory'
            showNeighboringMonth={false}
            onActiveStartDateChange={({
              activeStartDate: nextActiveStartDate,
            }) => {
              if (nextActiveStartDate) {
                setActiveStartDate(nextActiveStartDate);
              }
            }}
            onClickDay={() => {
              setOpenModal(true);
            }}
            prevLabel='‹'
            nextLabel='›'
            prev2Label={null}
            next2Label={null}
            prevAriaLabel='이전 달'
            nextAriaLabel='다음 달'
            tileClassName={getTileClassName}
            tileContent={getTileContent(userSchedules)}
            navigationAriaLabel='달력 내비게이션'
            {...calendarFormatters}
          />
        </div>
      </div>
    </article>
  );
};
