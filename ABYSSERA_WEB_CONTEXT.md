# Abyssera Website — Claude Code Context

## Project Overview
Abyssera is a Unity 6.2 mobile healing-adventure game for Android.
Genre: Healing Adventure / Survival-Craft / Action Combat
Developer: Nyxilla (solo dev + small team)
Target: Google Play Store launch

## Tech Stack
- Next.js 15 (App Router, TypeScript, Tailwind CSS)
- Supabase (auth + database)
- Vercel (hosting)

## Supabase Config
URL: https://qdxdsdjodcjvwqjzafro.supabase.co
(Anon key will be in .env.local)

## Database Tables (already created)
- `players` — id (uuid, FK to auth.users), username, created_at, avatar_url
- `player_saves` — player_id, pos_x, pos_y, pos_z, current_scene, harmony_level, resources_json, owned_weapons_json, equipped_weapon, chest_inventories_json, save_timestamp
- `leaderboard` — player_id, username, harmony_level, boss_defeated, updated_at
- `shop_items` — id, name, description, price_gems, icon_url, item_type, is_active

## Website Pages to Build
1. `/` — Landing page (game info, screenshots, download link)
2. `/register` — Player registration (email + password + username)
3. `/login` — Player login
4. `/profile` — Player profile (username, harmony level, inventory, progress)
5. `/leaderboard` — Top players by harmony level
6. `/news` — Game updates and story lore (static for now)
7. `/shop` — Item shop (future, show "coming soon" for now)

## Design Direction
- Dark fantasy aesthetic
- Color palette: deep purple (#1a0a2e), teal (#00d4b1), gold (#ffd700), dark navy (#0d0d1a)
- Font: elegant, slightly mystical (use Google Fonts — Cinzel for headings, Inter for body)
- Mobile-responsive
- Abyssera logo text styled with gold gradient

## Auth Flow
- Register on website → creates Supabase auth user + players row + player_saves row
- Login on website → session stored
- Login in Unity game → same Supabase credentials
- Cross-device: player logs in on any device, cloud save loads automatically

## Game Worlds (for content)
- Yurt — cozy first-person hub, save point, crafting
- Verdant Plains (World 1) — isometric resource gathering
- Fractured Plains (World 2) — third-person combat, boss: The Watcher (Fear Incarnate)

## Wellness Mechanics (for landing page content)
- 4-4-8 breathing exercises integrated into gameplay
- CBT principles
- Mindfulness through crafting and exploration

## Priority Order
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Create `src/lib/supabase.ts` — Supabase client
3. Create `.env.local` with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Build `/register` page first (most critical — players need accounts)
5. Build `/login` page
6. Build `/profile` page
7. Build `/` landing page
8. Build `/leaderboard`
9. Build `/news`

## Important Notes
- Registration happens ONLY on website (not in game)
- Game only has login screen
- After registration, player_saves row must be created automatically
- Harmony level is 0.0 to 1.0 (display as percentage)
- Boss defeated = boolean (defeated The Watcher)
- Keep code clean, TypeScript strict, no any types