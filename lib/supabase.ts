import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Player = {
  id: string
  username: string
  created_at: string
  avatar_url: string | null
}

export type PlayerSave = {
  player_id: string
  pos_x: number
  pos_y: number
  pos_z: number
  current_scene: string
  harmony_level: number
  resources_json: Record<string, unknown>
  owned_weapons_json: string[]
  equipped_weapon: string | null
  chest_inventories_json: Record<string, unknown>
  save_timestamp: string
}

export type LeaderboardEntry = {
  player_id: string
  username: string
  harmony_level: number
  boss_defeated: boolean
  updated_at: string
}
