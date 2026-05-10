-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles Enum
CREATE TYPE user_role AS ENUM (
    'admin', 
    'police', 
    'forest_guard', 
    'NGO', 
    'scientist', 
    'technician', 
    'citizen', 
    'gov_super_admin'
);

-- Users Table (Extending Supabase Auth)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role user_role DEFAULT 'citizen',
    phone TEXT,
    email TEXT,
    is_validated BOOLEAN DEFAULT FALSE, -- Admin must validate certain roles
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, phone, email, is_validated)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    (NEW.raw_user_meta_data->>'role')::user_role,
    NEW.raw_user_meta_data->>'phone',
    NEW.email,
    (NEW.raw_user_meta_data->>'is_validated')::boolean
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Drones Table
CREATE TABLE public.drones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'idle', -- 'idle', 'patrolling', 'alert', 'charging'
    battery FLOAT DEFAULT 100.0,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    altitude FLOAT,
    speed FLOAT,
    last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Forest Zones Table
CREATE TABLE public.forest_zones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    risk_level TEXT DEFAULT 'low', -- 'low', 'medium', 'high', 'critical'
    area_polygon JSONB, -- GeoJSON or similar format
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts Table
CREATE TABLE public.alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL, -- 'fire', 'deforestation', 'human_activity', 'illegal_vehicle', 'chainsaw'
    confidence_score FLOAT,
    image_url TEXT,
    video_url TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status TEXT DEFAULT 'pending', -- 'pending', 'investigating', 'resolved', 'false_alarm'
    drone_id UUID REFERENCES public.drones(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detections Table (Detailed AI logs)
CREATE TABLE public.detections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    drone_id UUID REFERENCES public.drones(id),
    object_detected TEXT NOT NULL,
    confidence FLOAT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forest_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detections ENABLE ROW LEVEL SECURITY;

-- Public read access for authenticated users
CREATE POLICY "Allow read access for all authenticated users" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow read access for all authenticated users" ON public.drones FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow read access for all authenticated users" ON public.forest_zones FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow read access for all authenticated users" ON public.alerts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow read access for all authenticated users" ON public.detections FOR SELECT USING (auth.role() = 'authenticated');

-- Admin/Officer write access (Simplified for now)
CREATE POLICY "Allow insert/update for drones" ON public.drones FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow insert for alerts" ON public.alerts FOR INSERT WITH CHECK (true); -- AI can insert

-- Storage Setup (Supabase Storage)
-- Note: This usually needs to be enabled in the Supabase Dashboard, 
-- but these SQL commands help setup the buckets and policies.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('alerts', 'alerts', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access for Alerts" ON storage.objects FOR SELECT USING (bucket_id = 'alerts');
CREATE POLICY "AI Upload for Alerts" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'alerts');
