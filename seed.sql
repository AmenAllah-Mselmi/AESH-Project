-- Seed Drones
INSERT INTO public.drones (name, model, status, battery, latitude, longitude)
VALUES 
('Sentinel-01', 'DJI Matrice 300 RTK', 'active', 85, 36.8456, 10.3214),
('Patrol-X2', 'Autel Dragonfish', 'active', 62, 36.8521, 10.3156),
('Observer-03', 'Parrot Anafi USA', 'charging', 12, 36.8400, 10.3300),
('Guard-04', 'DJI Mavic 3 Enterprise', 'active', 94, 36.8600, 10.3100),
('Sky-Scan-05', 'WingtraOne GEN II', 'maintenance', 0, 36.8350, 10.3250);

-- Seed Alerts (Initial Incidents)
INSERT INTO public.alerts (type, latitude, longitude, confidence_score, status, image_url)
VALUES 
('Incendie', 36.8475, 10.3214, 0.98, 'pending', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013'),
('Coupe Illégale', 36.8521, 10.3156, 0.85, 'investigating', 'https://images.unsplash.com/photo-1542601039-24127027378d?q=80&w=2013'),
('Véhicule Suspect', 36.8400, 10.3300, 0.72, 'pending', 'https://images.unsplash.com/photo-1506143925201-0252c51780b0?q=80&w=2013'),
('Activité Humaine', 36.8600, 10.3100, 0.65, 'resolved', 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2013');

-- Seed Detections (Detailed AI logs)
INSERT INTO public.detections (object_detected, confidence, latitude, longitude)
VALUES 
('Feu de brousse', 0.99, 36.8475, 10.3214),
('Tronçonneuse détectée', 0.88, 36.8521, 10.3156),
('Camion plateau', 0.75, 36.8400, 10.3300),
('Groupe de personnes', 0.68, 36.8600, 10.3100);

-- Seed Messages (Welcome Messages)
-- Note: Requires profile IDs, so we use a subquery to target the first available admin if exists
DO $$
DECLARE
    admin_id UUID;
    citizen_id UUID;
BEGIN
    SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
    SELECT id INTO citizen_id FROM public.profiles WHERE role = 'citizen' LIMIT 1;

    IF admin_id IS NOT NULL AND citizen_id IS NOT NULL THEN
        INSERT INTO public.messages (sender_id, receiver_id, content)
        VALUES 
        (admin_id, citizen_id, 'Bienvenue dans le réseau de surveillance Forest Guardian. Votre vigilance est notre force.'),
        (citizen_id, admin_id, 'Merci, je viens de signaler une activité suspecte près de Jebel Ressas.');
    END IF;
END $$;
