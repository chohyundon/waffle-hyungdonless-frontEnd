import { BoardHome } from '@/components/Board/BoardHome';

type Props = {
  params: Promise<{ category: string }>;
};

export default async function BoardCategoryPage({ params }: Props) {
  const { category } = await params;
  return <BoardHome category={category} />;
}
