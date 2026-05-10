import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const ROLES = [
  { id: 'admin', email: 'admin@forest.gov', pass: 'admin123', name: 'Administrateur Système' },
  { id: 'police', email: 'police@agency.gov', pass: 'police123', name: 'Commandant Police' },
  { id: 'forest_guard', email: 'guard@forest.gov', pass: 'guard123', name: 'Garde Forestier 01' },
  { id: 'NGO', email: 'ngo@nature.org', pass: 'ngo123', name: 'Directeur ONG' },
  { id: 'scientist', email: 'science@lab.org', pass: 'science123', name: 'Dr. Forestier' },
  { id: 'technician', email: 'tech@drones.com', pass: 'tech123', name: 'Technicien Drone' },
  { id: 'citizen', email: 'citizen@tunisie.tn', pass: 'citizen123', name: 'Citoyen Vigilant' },
  { id: 'gov_super_admin', email: 'gov@ministere.gov', pass: 'gov123', name: 'Ministre Environnement' },
];

async function seed() {
  console.log('🚀 Starting Seeding Process...');

  for (const role of ROLES) {
    console.log(`\nCreating ${role.id}...`);

    // Create User in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: role.email,
      password: role.pass,
      email_confirm: true,
      user_metadata: {
        full_name: role.name,
        role: role.id,
        is_validated: true
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`✅ ${role.id} already exists in Auth.`);
        
        // Try to update profile just in case
        const { data: userData } = await supabase.from('profiles').select('id').eq('email', role.email).single();
        if (userData) {
           await supabase.from('profiles').update({ role: role.id, is_validated: true }).eq('id', userData.id);
        }
      } else {
        console.error(`❌ Error creating ${role.id}:`, authError.message);
      }
    } else {
      console.log(`✅ ${role.id} created successfully.`);
    }
  }

  console.log('\n✨ Seeding completed!');
}

seed();
