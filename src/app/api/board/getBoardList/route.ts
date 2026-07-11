import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const supabase = await createClient();

    let query = supabase.from('boards').select('*');

    if (category) {
      query = query.eq('board_type', category);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error('Failed to fetch board list');
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch board list' },
      { status: 500 }
    );
  }
}
