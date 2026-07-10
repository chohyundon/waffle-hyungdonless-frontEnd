import type { CalenderScheduleInput } from '@/types/CalenderScheduleType';

export const getScheduleInput = (
  formData: FormData
): CalenderScheduleInput => ({
  title: String(formData.get('title') ?? '').trim(),
  description: String(formData.get('description') ?? '').trim(),
  startDate: String(formData.get('startDate') ?? ''),
  endDate: String(formData.get('endDate') ?? ''),
});
