import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=')
  if (key && value) env[key.trim()] = value.join('=').trim()
})

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function seedData() {
  console.log("🛰️ Seeding drones et alertes...")

  // 1. Drones
  const { data: drones, error: dError } = await supabase.from('drones').upsert([
    { name: 'Guardian-Alpha', status: 'patrolling', battery: 88, latitude: 36.8065, longitude: 10.1815, altitude: 150, speed: 45 },
    { name: 'Guardian-Beta', status: 'charging', battery: 12, latitude: 36.8090, longitude: 10.1900, altitude: 0, speed: 0 },
    { name: 'Interceptor-01', status: 'alert', battery: 95, latitude: 36.8000, longitude: 10.1700, altitude: 200, speed: 75 }
  ]).select()

  if (dError) console.error("Erreur drones:", dError.message)
  else console.log("✅ Drones créés.")

  // 2. Alertes
  if (drones) {
    const { error: aError } = await supabase.from('alerts').upsert([
      { type: 'fire', confidence_score: 0.98, status: 'investigating', latitude: 36.8010, longitude: 10.1710, drone_id: drones[2].id },
      { type: 'deforestation', confidence_score: 0.85, status: 'pending', latitude: 36.8050, longitude: 10.1800, drone_id: drones[0].id }
    ])
    if (aError) console.error("Erreur alertes:", aError.message)
    else console.log("✅ Alertes créées.")
  }

  console.log("✨ Données prêtes.")
}

seedData()
