import { RemainCenter } from '@/components/remainCenter';

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  return <RemainCenter category={category} />;
}
