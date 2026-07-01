import { NextResponse } from 'next/server';
import { fetchAllPublicData } from '@/lib/public-data/fetchAllPublicData';

export async function GET() {
  const data = await fetchAllPublicData();
  return NextResponse.json(data);
}
