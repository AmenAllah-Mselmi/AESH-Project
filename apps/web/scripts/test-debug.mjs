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

async function test() {
  const email = 'test_debug@forest.gov';
  const { data: users } = await supabase.auth.admin.listUsers();
  const existing = users?.users.find(u => u.email === email);
  if (existing) await supabase.auth.admin.deleteUser(existing.id);

  console.log('Testing creation with NO metadata...');
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: 'password123',
    email_confirm: true
  });

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Success!');
  }
}

test();
