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
  for (const role of ROLES) {
    console.log(`Processing ${role.id}...`);
    
    // Delete if exists
    const { data: users } = await supabase.auth.admin.listUsers();
    const existing = users?.users.find(u => u.email === role.email);
    if (existing) {
      await supabase.auth.admin.deleteUser(existing.id);
      console.log(`Deleted existing ${role.id}`);
    }

    // Create
    const { data, error } = await supabase.auth.admin.createUser({
      email: role.email,
      password: role.pass,
      email_confirm: true,
      user_metadata: {
        full_name: role.name,
        role: role.id,
        is_validated: true
      }
    });

    if (error) {
      console.error(`Error creating ${role.id}:`, error.message);
    } else {
      console.log(`Created ${role.id}`);
    }
  }
}

seed();
