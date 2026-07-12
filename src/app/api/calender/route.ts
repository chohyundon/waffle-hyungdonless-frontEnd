import { NextResponse } from 'next/server';

import { getAuthContext } from '@/lib/userInfo/getCurrentUser';

export async function POST(request: Request) {
  try {
    const { supabase, user } = await getAuthContext();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { schedule } = await request.json();
    const { data, error } = await supabase.from('calender_schedules').insert({
      title: schedule.title,
      description: schedule.description,
      start_date: schedule.startDate,
      end_date: schedule.endDate,
      user_id: user.id,
    });
    if (error) {
      throw new Error('Failed to add schedule');
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to add schedule' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { supabase, user } = await getAuthContext();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { scheduleId, schedule } = await request.json();

    if (!scheduleId) {
      return NextResponse.json(
        { error: 'scheduleId가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('calender_schedules')
      .update({
        title: schedule.title,
        description: schedule.description,
        start_date: schedule.startDate,
        end_date: schedule.endDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', scheduleId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update schedule');
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { supabase, user } = await getAuthContext();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('calender_schedules')
      .select('*')
      .eq('user_id', user.id);
    if (error) {
      throw new Error('Failed to get schedules');
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to get schedules' },
      { status: 500 }
    );
  }
}
