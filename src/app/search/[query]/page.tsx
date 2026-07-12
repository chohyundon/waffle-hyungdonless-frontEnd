import { SearchResults } from '@/components/Search/SearchResults';
import { searchBoards } from '@/lib/board/searchBoards';

type SearchPageProps = {
  params: Promise<{ query: string }>;
};

export default async function SearchPage({ params }: SearchPageProps) {
  const { query: rawQuery } = await params;
  const query = decodeURIComponent(rawQuery);
  const boards = await searchBoards(query);

  return <SearchResults query={query} boards={boards} />;
}
