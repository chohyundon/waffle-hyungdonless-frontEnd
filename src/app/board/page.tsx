import { redirect } from 'next/navigation';

import { defaultBoardPath } from '@/components/MainCenter/homeButton';

export default function BoardIndexPage() {
  redirect(`${defaultBoardPath}/popular`);
}
