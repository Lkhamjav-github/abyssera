"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                if (authError.message.toLowerCase().includes("invalid")) {
                    setError("Имэйл эсвэл нууц үг буруу байна. Дахин оролдоно уу.");
                } else if (authError.message.toLowerCase().includes("confirm")) {
                    setError("Нэвтрэхийн өмнө имэйлээ баталгаажуулна уу.");
                } else {
                    setError(authError.message);
                }
                return;
            }

            router.push("/profile");
        });
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
                        Харанхуй руу буцах
                    </h1>
                    <p className="text-sm text-[#6b5a8a]">
                        Аяллаа үргэлжлүүлэхийн тулд нэвтэрнэ үү
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-xl border border-[#2a1a4a] bg-[#120820] p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Таны нууц үг"
                                className="w-full rounded-lg border border-[#2a1a4a] bg-[#1a0a2e] px-4 py-3 text-[#e8dff5] placeholder-[#4a3a6a] outline-none transition-all focus:border-[#00d4b1] focus:ring-1 focus:ring-[#00d4b1]/30"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mt-2 rounded-lg bg-[#00d4b1] py-3 font-semibold text-[#0d0d1a] transition-all hover:bg-[#00a88e] disabled:opacity-50 disabled:cursor-not-allowed teal-glow"
                        >
                            {isPending ? "Харанхуй руу нэвтэрч байна…" : "Нэвтрэх"}
                        </button>
                    </form>

                    <div className="mt-6 border-t border-[#2a1a4a] pt-6 text-center text-sm text-[#6b5a8a]">
                        Шинэ адал явдалтан уу?{" "}
                        <Link href="/register" className="text-[#00d4b1] hover:text-[#00a88e] transition-colors">
                            Бүртгэл үүсгэх
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-[#4a3a6a] italic leading-relaxed">
                    “Чиний ахиц дэвшил хаана ч дагалдана — нэг удаа нэвтэр, бүх ертөнцөө авч яв.”
                </p>
            </div>
        </div>
    );
}
