import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Charger les variables d'environnement depuis .env.local
const envPath = path.resolve(__dirname, '../.env.local')
if (!fs.existsSync(envPath)) {
  console.error("Erreur : Fichier .env.local introuvable dans apps/web/")
  process.exit(1)
}

const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=')
  if (key && value) env[key.trim()] = value.join('=').trim()
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Erreur : NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local")
  process.exit(1)
}

// Utilisation de la clé de service pour bypasser les restrictions
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const users = [
  { full_name: 'Admin System', email: 'admin@forest.gov', password: 'admin123', role: 'admin', is_validated: true },
  { full_name: 'Commandant Police', email: 'police@agency.gov', password: 'police123', role: 'police', is_validated: true },
  { full_name: 'Garde Chef', email: 'guard@forest.gov', password: 'guard123', role: 'forest_guard', is_validated: true },
  { full_name: 'Tech Expert', email: 'tech@drones.com', password: 'tech123', role: 'technician', is_validated: true },
  { full_name: 'Eco Scientist', email: 'science@nature.edu', password: 'science123', role: 'scientist', is_validated: true },
  { full_name: 'Green NGO', email: 'ngo@saveforest.org', password: 'ngo123', role: 'NGO', is_validated: true },
  { full_name: 'Citoyen Lambda', email: 'citizen@test.com', password: 'citizen123', role: 'citizen', is_validated: true },
]

async function seed() {
  console.log("🚀 Début du seeding des utilisateurs (Mode Admin)...\n")
  
  for (const user of users) {
    process.stdout.write(`Vérification/Création de ${user.email}... `)
    
    // 1. Créer l'utilisateur via l'API Admin (évite la confirmation d'email)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true, // Confirme automatiquement
      user_metadata: {
        full_name: user.full_name,
        role: user.role,
        is_validated: user.is_validated
      }
    })

    if (authError) {
      if (authError.message.includes("already registered")) {
        console.log(`🟡 Déjà existant.`)
        
        // Optionnel: Mettre à jour le profil si nécessaire
        const { data: existingUser } = await supabase.from('profiles').select('id').eq('email', user.email).single()
        if (existingUser) {
            await supabase.from('profiles').update({ 
                role: user.role, 
                full_name: user.full_name,
                is_validated: user.is_validated 
            }).eq('id', existingUser.id)
        }
      } else {
        console.log(`❌ Erreur Auth: ${authError.message}`)
      }
    } else {
      console.log(`✅ Créé avec succès !`)
    }
  }

  console.log("\n✨ Seeding terminé. Vous pouvez maintenant vous connecter.")
}

seed()
