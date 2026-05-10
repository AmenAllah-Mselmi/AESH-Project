import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, confidence, lat, lng, drone_id, image_url } = body;

    // 1. Insert alert into Supabase
    const { data, error } = await supabase
      .from('alerts')
      .insert([
        { 
          type, 
          confidence_score: confidence, 
          latitude: lat, 
          longitude: lng, 
          drone_id,
          image_url,
          status: 'pending'
        }
      ])
      .select();

    if (error) throw error;

    // 2. Trigger notifications (Mock)
    console.log(`[Notification] Critical Alert: ${type} detected at ${lat}, ${lng}`);
    
    // In production, you would call Twilio, Resend, or a Webhook here
    // await sendSMS(`ALERT: ${type} detected!`);

    return NextResponse.json({ 
      success: true, 
      message: 'Alert created and authorities notified',
      data 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating alert:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
