"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Player, PlayerSave } from "@/lib/supabase";

type ProfileData = {
  player: Player;
  save: PlayerSave | null;
};

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        router.replace("/login");
        return;
      }

      const userId = userData.user.id;

      const [playerRes, saveRes] = await Promise.all([
        supabase.from("players").select("*").eq("id", userId).single(),
        supabase.from("player_saves").select("*").eq("player_id", userId).maybeSingle(),
      ]);

      if (playerRes.error) {
        setError("Failed to load profile data.");
        setLoading(false);
        return;
      }

      setData({
        player: playerRes.data as Player,
        save: saveRes.data as PlayerSave | null,
      });
      setLoading(false);
    }

    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 font-[family-name:var(--font-cinzel)] text-[#00d4b1] text-lg animate-pulse">
            Loading your realm…
          </div>
          <div className="w-48 h-1 bg-[#1e1035] rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-[#00d4b1] rounded-full animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error ?? "Something went wrong."}</p>
          <Link href="/" className="text-[#00d4b1] hover:text-[#00a88e]">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const { player, save } = data;
  const harmonyPct = save ? Math.round(save.harmony_level * 100) : 0;
  const bossDefeated = false; // will come from leaderboard table if needed
  const joinDate = new Date(player.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sceneLabels: Record<string, string> = {
    Yurt: "The Yurt — Home",
    VerdantPlains: "Verdant Plains (World 1)",
    FracturedPlains: "Fractured Plains (World 2)",
  };

  const currentScene = save
    ? (sceneLabels[save.current_scene] ?? save.current_scene)
    : "Unknown";

  const ownedWeapons: string[] = save
    ? (Array.isArray(save.owned_weapons_json) ? save.owned_weapons_json : [])
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#ffd700]/40 bg-[#1a0a2e] text-3xl mb-4">
          ✦
        </div>
        <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold gold-text mb-1">
          {player.username}
        </h1>
        <p className="text-sm text-[#6b5a8a]">Adventurer since {joinDate}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
        <StatCard
          label="Harmony Level"
          value={`${harmonyPct}%`}
          accent="teal"
        />
        <StatCard
          label="Current World"
          value={save?.current_scene ?? "—"}
          accent="gold"
        />
        <StatCard
          label="The Watcher"
          value={bossDefeated ? "Defeated" : "Awaits"}
          accent={bossDefeated ? "teal" : "muted"}
        />
        <StatCard
          label="Weapons"
          value={String(ownedWeapons.length)}
          accent="gold"
        />
      </div>

      {/* Harmony bar */}
      <div className="mb-6 rounded-xl border border-[#2a1a4a] bg-[#120820] p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-widest text-[#9b87c0] uppercase">
            Harmony Resonance
          </h2>
          <span className="text-[#00d4b1] font-bold text-lg">{harmonyPct}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#1a0a2e] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00d4b1] to-[#00a88e] transition-all duration-700"
            style={{ width: `${harmonyPct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[#4a3a6a]">
          {harmonyPct < 25
            ? "The Abyss stirs. Your journey has only begun."
            : harmonyPct < 50
            ? "Harmony grows. The worlds respond to your presence."
            : harmonyPct < 75
            ? "The resonance strengthens. The Watcher takes notice."
            : harmonyPct < 100
            ? "Near full harmony. The Abyss trembles."
            : "Perfect harmony achieved. You are one with the Abyss."}
        </p>
      </div>

      {/* Save details */}
      {save && (
        <div className="mb-6 rounded-xl border border-[#2a1a4a] bg-[#120820] p-6">
          <h2 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-widest text-[#9b87c0] uppercase mb-4">
            Current Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <DetailRow label="Location" value={currentScene} />
            <DetailRow
              label="Position"
              value={`X: ${save.pos_x.toFixed(1)}  Y: ${save.pos_y.toFixed(1)}  Z: ${save.pos_z.toFixed(1)}`}
            />
            <DetailRow
              label="Equipped Weapon"
              value={save.equipped_weapon ?? "None"}
            />
            <DetailRow
              label="Last Saved"
              value={new Date(save.save_timestamp).toLocaleString()}
            />
          </div>
        </div>
      )}

      {/* Weapons */}
      {ownedWeapons.length > 0 && (
        <div className="mb-6 rounded-xl border border-[#2a1a4a] bg-[#120820] p-6">
          <h2 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-widest text-[#9b87c0] uppercase mb-4">
            Arsenal
          </h2>
          <div className="flex flex-wrap gap-2">
            {ownedWeapons.map((weapon) => (
              <span
                key={weapon}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  weapon === save?.equipped_weapon
                    ? "border-[#ffd700]/50 bg-[#ffd700]/10 text-[#ffd700]"
                    : "border-[#2a1a4a] text-[#9b87c0]"
                }`}
              >
                {weapon === save?.equipped_weapon ? "⚔ " : ""}{weapon}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/leaderboard"
          className="flex-1 rounded-lg border border-[#2a1a4a] px-4 py-3 text-center text-sm text-[#9b87c0] hover:border-[#00d4b1] hover:text-[#00d4b1] transition-all"
        >
          View Leaderboard
        </Link>
        <button
          onClick={handleLogout}
          className="flex-1 rounded-lg border border-[#2a1a4a] px-4 py-3 text-sm text-[#9b87c0] hover:border-red-800 hover:text-red-400 transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "teal" | "gold" | "muted";
}) {
  const accentClass =
    accent === "teal"
      ? "text-[#00d4b1]"
      : accent === "gold"
      ? "text-[#ffd700]"
      : "text-[#6b5a8a]";

  return (
    <div className="rounded-xl border border-[#2a1a4a] bg-[#120820] p-4 text-center">
      <div className={`font-[family-name:var(--font-cinzel)] text-xl font-bold mb-1 ${accentClass}`}>
        {value}
      </div>
      <div className="text-xs text-[#6b5a8a] leading-tight">{label}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-[#6b5a8a] uppercase tracking-wider">{label}</span>
      <p className="text-[#e8dff5] mt-0.5">{value}</p>
    </div>
  );
}
