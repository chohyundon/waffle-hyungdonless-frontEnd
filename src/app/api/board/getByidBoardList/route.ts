import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id가 필요합니다.' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch board by id' },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
