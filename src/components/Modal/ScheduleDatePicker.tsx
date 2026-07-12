'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Calendar from 'react-calendar';
import { FiCalendar } from 'react-icons/fi';

import {
  formatScheduleDateShort,
  toScheduleDateValue,
} from '@/components/Calender/lib/scheduleDate';
import styles from '@/components/Modal/styles/ScheduleDatePicker.module.css';

const CALENDAR_LOCALE = 'ko-KR';
const POPOVER_WIDTH = 320;
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

type ScheduleDatePickerProps = {
  id: string;
  name: string;
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  placeholder?: string;
  align?: 'start' | 'end';
};

export const ScheduleDatePicker = ({
  id,
  name,
  label,
  value,
  onChange,
  minDate,
  placeholder = '날짜 선택',
  align = 'start',
}: ScheduleDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState(
    () => value ?? new Date()
  );
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({});
  const popoverId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setActiveStartDate(value);
    }
  }, [value]);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      let left = align === 'end' ? rect.right - POPOVER_WIDTH : rect.left;

      left = Math.max(8, Math.min(left, window.innerWidth - POPOVER_WIDTH - 8));

      setPopoverStyle({
        position: 'fixed',
        top: rect.bottom + 8,
        left,
        width: POPOVER_WIDTH,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [align, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen]);

  const displayValue = value ? formatScheduleDateShort(value) : placeholder;
  const hiddenValue = value ? toScheduleDateValue(value) : '';
  const calendarStyle = {
    '--first-day-column': String(activeStartDate.getDay() + 1),
  } as CSSProperties;

  return (
    <div className={styles.container}>
      <input type='hidden' id={id} name={name} value={hiddenValue} />
      <button
        ref={triggerRef}
        type='button'
        className={`${styles.trigger} ${value ? '' : styles.triggerPlaceholder}`}
        aria-label={`${label} 선택`}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.triggerText}>{displayValue}</span>
        <FiCalendar className={styles.triggerIcon} aria-hidden='true' />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          id={popoverId}
          className={styles.popover}
          style={popoverStyle}
          role='dialog'
          aria-label={`${label} 달력`}
        >
          <div className={styles.calendarWrap} style={calendarStyle}>
            <Calendar
              value={value}
              activeStartDate={activeStartDate}
              onActiveStartDateChange={({
                activeStartDate: nextActiveStartDate,
              }) => {
                if (nextActiveStartDate) {
                  setActiveStartDate(nextActiveStartDate);
                }
              }}
              onChange={(nextValue) => {
                if (nextValue instanceof Date) {
                  onChange(nextValue);
                  setIsOpen(false);
                }
              }}
              className={styles.calendar}
              locale={CALENDAR_LOCALE}
              calendarType='gregory'
              showNeighboringMonth={false}
              showFixedNumberOfWeeks
              minDate={minDate}
              prevLabel='‹'
              nextLabel='›'
              prev2Label={null}
              next2Label={null}
              prevAriaLabel='이전 달'
              nextAriaLabel='다음 달'
              navigationAriaLabel={`${label} 달력 내비게이션`}
              {...calendarFormatters}
            />
          </div>
        </div>
      )}
    </div>
  );
};
