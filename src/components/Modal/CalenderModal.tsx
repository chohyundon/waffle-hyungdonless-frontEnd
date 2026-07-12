'use client';

import { createPortal } from 'react-dom';

import styles from '@/components/Modal/styles/CalenderModal.module.css';
import { getSchedulesForDate } from '@/components/Calender/lib/getSchedulesForDate';
import { ScheduleDatePicker } from '@/components/Modal/ScheduleDatePicker';
import useCalenderModal from '@/components/Modal/useCalenderModal';
import { ScheduleType } from '@/components/Calender/type/ScheduleType';

type CalenderModalProps = {
  openModal: boolean;
  selectedDate: Date | null;
  onClose: () => void;
  userSchedules: ScheduleType[];
};

export default function CalenderModal({
  openModal,
  selectedDate,
  onClose,
  userSchedules,
}: CalenderModalProps) {
  const filteredUserSchedules = selectedDate
    ? getSchedulesForDate(selectedDate, userSchedules)
    : [];

  const {
    isVisible,
    formattedDate,
    isEditing,
    fieldIds,
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
    onClose: closeModal,
  } = useCalenderModal({
    openModal,
    selectedDate,
    onClose,
  });

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={closeModal} role='presentation'>
      <div
        className={styles.modal}
        role='dialog'
        aria-modal='true'
        aria-labelledby={fieldIds.modalTitleId}
        aria-describedby={fieldIds.modalDescriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>선택한 날짜</p>
            <h2 id={fieldIds.modalTitleId} className={styles.title}>
              {formattedDate}
            </h2>
          </div>
          <button
            type='button'
            className={styles.closeButton}
            onClick={closeModal}
            aria-label='일정 모달 닫기'
          >
            <span aria-hidden='true'>×</span>
          </button>
        </header>

        <section className={styles.body}>
          <p id={fieldIds.modalDescriptionId} className={styles.description}>
            이 날짜의 일정을 확인하고 새 일정을 추가해 보세요.
          </p>

          {filteredUserSchedules.length > 0 ? (
            <section
              className={styles.scheduleListSection}
              aria-label='이 날짜의 등록된 일정'
            >
              <h3 className={styles.scheduleListTitle}>등록된 일정</h3>
              <ul className={styles.scheduleList}>
                {filteredUserSchedules.map((schedule) => {
                  const isSelected = editingScheduleId === schedule.id;

                  return (
                    <li key={schedule.id}>
                      <button
                        type='button'
                        className={`${styles.scheduleListItem} ${isSelected ? styles.scheduleListItemActive : ''}`}
                        aria-pressed={isSelected}
                        onClick={() => selectScheduleForEdit(schedule)}
                      >
                        <span className={styles.scheduleListItemTitle}>
                          {schedule.title}
                        </span>
                        <span className={styles.scheduleListItemDate}>
                          {schedule.start_date} ~ {schedule.end_date}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>
              {isEditing ? '일정 수정' : '새 일정 추가'}
            </h3>
            {isEditing ? (
              <button
                type='button'
                className={styles.resetEditButton}
                onClick={resetToNewSchedule}
              >
                새 일정 추가로 전환
              </button>
            ) : null}
          </div>

          <form
            id={fieldIds.scheduleFormId}
            className={styles.scheduleForm}
            aria-label={isEditing ? '일정 수정 폼' : '일정 추가 폼'}
            onSubmit={handleSubmit}
          >
            <div className={styles.field}>
              <label
                htmlFor={fieldIds.scheduleTitleId}
                className={styles.label}
              >
                제목
              </label>
              <input
                id={fieldIds.scheduleTitleId}
                name='title'
                type='text'
                className={styles.input}
                placeholder='일정 제목을 입력해 주세요'
                autoComplete='off'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label
                htmlFor={fieldIds.scheduleContentId}
                className={styles.label}
              >
                내용
              </label>
              <textarea
                id={fieldIds.scheduleContentId}
                name='description'
                className={styles.textarea}
                placeholder='일정 내용을 입력해 주세요'
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div
              className={styles.field}
              role='group'
              aria-labelledby={fieldIds.timeLegendId}
            >
              <p id={fieldIds.timeLegendId} className={styles.label}>
                기간
              </p>
              <div className={styles.timeRow}>
                <div className={styles.timeField}>
                  <span className={styles.timeLabel}>시작일</span>
                  <ScheduleDatePicker
                    id={fieldIds.startDateId}
                    name='startDate'
                    label='시작일'
                    value={startDate}
                    onChange={setStartDate}
                    align='start'
                  />
                </div>
                <span className={styles.timeDivider} aria-hidden='true'>
                  ~
                </span>
                <div className={styles.timeField}>
                  <span className={styles.timeLabel}>종료일</span>
                  <ScheduleDatePicker
                    id={fieldIds.endDateId}
                    name='endDate'
                    label='종료일'
                    value={endDate}
                    onChange={setEndDate}
                    minDate={startDate ?? undefined}
                    align='end'
                  />
                </div>
              </div>
            </div>
          </form>
        </section>

        <footer className={styles.footer}>
          <button
            type='button'
            className={styles.secondaryButton}
            onClick={closeModal}
          >
            닫기
          </button>
          <button
            type='submit'
            className={styles.primaryButton}
            form={fieldIds.scheduleFormId}
          >
            {isEditing ? '일정 수정' : '일정 추가'}
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
