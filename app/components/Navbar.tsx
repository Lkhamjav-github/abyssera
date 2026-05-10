"use client";

import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/");
    }

    const navLinks = [
        { href: "/", label: "Нүүр" },
        { href: "/leaderboard", label: "Тэргүүлэгчид" },
        { href: "/news", label: "Мэдээ" },
        { href: "/shop", label: "Дэлгүүр" },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-[#2a1a4a] bg-[#0d0d1a]/90 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="shimmer font-[family-name:var(--font-cinzel)] text-2xl font-black tracking-widest">
                        ABYSSERA
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-[family-name:var(--font-cinzel)] text-sm tracking-wider transition-colors ${pathname === link.href
                                    ? "text-[#00d4b1]"
                                    : "text-[#9b87c0] hover:text-[#e8dff5]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <Link
                                href="/profile"
                                className="font-[family-name:var(--font-cinzel)] text-sm tracking-wider text-[#00d4b1] hover:text-[#00a88e] transition-colors"
                            >
                                Профайл
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="rounded border border-[#2a1a4a] px-4 py-1.5 text-sm text-[#9b87c0] hover:border-[#6b5a8a] hover:text-[#e8dff5] transition-all"
                            >
                                Гарах
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="font-[family-name:var(--font-cinzel)] text-sm tracking-wider text-[#9b87c0] hover:text-[#e8dff5] transition-colors"
                            >
                                Нэвтрэх
                            </Link>
                            <Link
                                href="/register"
                                className="rounded bg-[#00d4b1] px-4 py-1.5 text-sm font-semibold text-[#0d0d1a] hover:bg-[#00a88e] transition-colors"
                            >
                                Бүртгүүлэх
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-[#9b87c0] hover:text-[#e8dff5]"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Цэс нээх/хаах"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-[#2a1a4a] bg-[#0d0d1a] px-4 py-4 flex flex-col gap-4">

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-[family-name:var(--font-cinzel)] text-sm tracking-wider text-[#9b87c0] hover:text-[#e8dff5]"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="border-t border-[#2a1a4a] pt-4 flex flex-col gap-3">
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#00d4b1] text-sm"
                                >
                                    Профайл
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-left text-sm text-[#9b87c0]"
                                >
                                    Гарах
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-[#9b87c0]">
                                    Нэвтрэх
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded bg-[#00d4b1] px-4 py-2 text-sm font-semibold text-[#0d0d1a] text-center"
                                >
                                    Бүртгүүлэх
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
