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
  console.log('🚀 Starting Robust Seeding...');
  
  for (const role of ROLES) {
    console.log(`Processing ${role.id}...`);
    
    // Delete if exists
    const { data: users } = await supabase.auth.admin.listUsers();
    const existing = users?.users.find(u => u.email === role.email);
    if (existing) {
      await supabase.auth.admin.deleteUser(existing.id);
      console.log(`  Deleted existing user.`);
    }

    // 1. Create User in Auth (No metadata to avoid trigger issues)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: role.email,
      password: role.pass,
      email_confirm: true
    });

    if (authError) {
      console.error(`  ❌ Auth Error:`, authError.message);
      continue;
    }

    const userId = authData.user.id;
    console.log(`  ✅ Auth user created: ${userId}`);

    // 2. Manually Update Profile (Bypassing/Updating what the trigger did)
    // The trigger might have already inserted a row with default values.
    // We use upsert to be sure.
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: role.name,
        role: role.id,
        email: role.email,
        is_validated: true
      });

    if (profileError) {
      console.error(`  ❌ Profile Error:`, profileError.message);
    } else {
      console.log(`  ✅ Profile updated successfully.`);
    }
  }
  
  console.log('✨ All done!');
}

seed();
