import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const envPath = 'c:/Users/ASUS/Desktop/AESH/forest-guardian-drone/apps/web/.env.local'
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=')
  if (key && value) env[key.trim()] = value.join('=').trim()
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function check() {
    const { data: profiles, error } = await supabase.from('profiles').select('*')
    if (error) {
        console.error("Error fetching profiles:", error)
    } else {
        console.log("Profiles found:", profiles.length)
        profiles.forEach(p => console.log(`- ${p.email} (${p.role})`))
    }
}

check()
