import { NextResponse } from 'next/server';
import { fetchYouthCenterPolicies } from '@/lib/public-data/fetchYouthCenterPolicies';

export async function GET() {
  try {
    const data = await fetchYouthCenterPolicies();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch data';
    const status = 500;
    return NextResponse.json({ error: message }, { status });
  }
}
