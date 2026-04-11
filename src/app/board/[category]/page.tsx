import { redirect } from 'next/navigation';

type Props = { params: Promise<{ category: string }> };

export default async function BoardCategoryIndexPage({ params }: Props) {
  const { category } = await params;
  redirect(`/board/${category}/popular`);
}
