import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ROLES = [
  { id: 'admin', email: 'administrator@forest.gov', pass: 'admin123', name: 'Administrateur Système' },
  { id: 'police', email: 'commandant@agency.gov', pass: 'police123', name: 'Commandant Police' },
  { id: 'forest_guard', email: 'ranger@forest.gov', pass: 'guard123', name: 'Garde Forestier 01' },
  { id: 'technician', email: 'maintenance@drones.com', pass: 'tech123', name: 'Technicien Drone' },
];

async function seed() {
  console.log('🚀 Starting Role Fix...');
  for (const role of ROLES) {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: role.email,
      password: role.pass,
      email_confirm: true,
      user_metadata: { full_name: role.name, role: role.id, is_validated: true }
    });
    if (authError) console.error(`  ❌ ${role.id}:`, authError.message);
    else console.log(`  ✅ ${role.id} created.`);
  }
}
seed();
