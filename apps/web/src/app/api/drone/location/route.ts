import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { drone_id, lat, lng, alt, battery, status } = await request.json();

    const { error } = await supabase
      .from('drones')
      .update({ 
        latitude: lat, 
        longitude: lng, 
        altitude: alt, 
        battery: battery,
        status: status,
        last_seen: new Date().toISOString()
      })
      .eq('id', drone_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
