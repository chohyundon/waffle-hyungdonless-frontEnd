import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('boards').select('*');
    if (error) {
      throw new Error('Failed to fetch board list');
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch board list' },
      { status: 500 }
    );
  }
}
