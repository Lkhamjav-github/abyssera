"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (username.trim().length < 3) {
            setError("Хэрэглэгчийн нэр хамгийн багадаа 3 тэмдэгт байх ёстой.");
            return;
        }
        if (password.length < 8) {
            setError("Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.");
            return;
        }

        startTransition(async () => {
            const { data: existing } = await supabase
                .from("players")
                .select("id")
                .eq("username", username.trim())
                .maybeSingle();

            if (existing) {
                setError("Энэ хэрэглэгчийн нэр аль хэдийн ашиглагдсан байна.");
                return;
            }

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) {
                setError(authError.message);
                return;
            }

            const userId = authData.user?.id;
            if (!userId) {
                setError("Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.");
                return;
            }

            const { error: playerError } = await supabase.from("players").insert({
                id: userId,
                username: username.trim(),
                avatar_url: null,
            });

            if (playerError) {
                setError("Хэрэглэгч үүссэн боловч профайл үүсгэхэд алдаа гарлаа: " + playerError.message);
                return;
            }

            const { error: saveError } = await supabase.from("player_saves").insert({
                player_id: userId,
                pos_x: 0,
                pos_y: 0,
                pos_z: 0,
                current_scene: "Yurt",
                harmony_level: 0,
                resources_json: {},
                owned_weapons_json: [],
                equipped_weapon: null,
                chest_inventories_json: {},
                save_timestamp: new Date().toISOString(),
            });

            if (saveError) {
                setError("Профайл үүссэн боловч хадгалалтын өгөгдөл алдаа гарлаа: " + saveError.message);
                return;
            }

            if (authData.session) {
                router.push("/profile");
            } else {
                setSuccess(true);
            }
        });
    }

    if (success) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-xl border border-[#2a1a4a] bg-[#120820] p-10 text-center shadow-2xl">
                    <div className="mb-6 text-5xl">✦</div>
                    <h1 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#ffd700] mb-4">
                        Тавтай морил, {username}
                    </h1>
                    <p className="text-[#9b87c0] mb-6 leading-relaxed">
                        Таны бүртгэл үүссэн байна. Имэйлээ шалгаж баталгаажуулсны дараа
                        нэвтэрч өөрийн аяллаа эхлүүлнэ үү.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block rounded bg-[#00d4b1] px-6 py-3 font-semibold text-[#0d0d1a] hover:bg-[#00a88e] transition-colors"
                    >
                        Нэвтрэх хуудас руу очих
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-3 font-[family-name:var(--font-cinzel)] text-4xl font-black shimmer">
                        ABYSSERA
                    </div>
                    <h1 className="font-[family-name:var(--font-cinzel)] text-xl text-[#e8dff5] mb-2">
                        Аяллаа эхлүүл
                    </h1>
                    <p className="text-sm text-[#6b5a8a]">
                        Харанхуйн ертөнцөд орох бүртгэлээ үүсгэнэ үү
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-xl border border-[#2a1a4a] bg-[#120820] p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="flex flex-col gap-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-1.5 text-sm font-medium text-[#9b87c0] font-[family-name:var(--font-cinzel)] tracking-wider"
                            >
                                Хэрэглэгчийн нэр
                            </label>
                            <input
                                id="username"
                                type="text"
                                required
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Таны адал явдалт нэр"
                                className="w-full rounded-lg border border-[#2a1a4a] bg-[#1a0a2e] px-4 py-3 text-[#e8dff5] placeholder-[#4a3a6a] outline-none transition-all focus:border-[#00d4b1] focus:ring-1 focus:ring-[#00d4b1]/30"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-1.5 text-sm font-medium text-[#9b87c0] font-[family-name:var(--font-cinzel)] tracking-wider"
                            >
                                Имэйл
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full rounded-lg border border-[#2a1a4a] bg-[#1a0a2e] px-4 py-3 text-[#e8dff5] placeholder-[#4a3a6a] outline-none transition-all focus:border-[#00d4b1] focus:ring-1 focus:ring-[#00d4b1]/30"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-1.5 text-sm font-medium text-[#9b87c0] font-[family-name:var(--font-cinzel)] tracking-wider"
                            >
                                Нууц үг
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Хамгийн багадаа 8 тэмдэгт"
                                className="w-full rounded-lg border border-[#2a1a4a] bg-[#1a0a2e] px-4 py-3 text-[#e8dff5] placeholder-[#4a3a6a] outline-none transition-all focus:border-[#00d4b1] focus:ring-1 focus:ring-[#00d4b1]/30"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mt-2 rounded-lg bg-[#00d4b1] py-3 font-semibold text-[#0d0d1a] transition-all hover:bg-[#00a88e] disabled:opacity-50 disabled:cursor-not-allowed teal-glow"
                        >
                            {isPending ? "Бүртгэл үүсгэж байна…" : "Аялалд орох"}
                        </button>
                    </form>

                    <div className="mt-6 border-t border-[#2a1a4a] pt-6 text-center text-sm text-[#6b5a8a]">
                        Аль хэдийн бүртгэлтэй юу?{" "}
                        <Link href="/login" className="text-[#00d4b1] hover:text-[#00a88e] transition-colors">
                            Нэвтрэх
                        </Link>
                    </div>
                </div>

                {/* Lore blurb */}
                <p className="mt-8 text-center text-xs text-[#4a3a6a] italic leading-relaxed">
                    “Харанхуй өөрийгөө санаж байдаг. Чиний хийсэн сонголт бүр ертөнцийг өөрчилнө.”
                </p>
            </div>
        </div>
    );
}
