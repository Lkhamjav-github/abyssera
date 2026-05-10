import Navbar from "@/app/components/Navbar";
import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
    variable: "--font-cinzel",
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Abyssera — Адал явдлаар дамжуулан эдгэр",
    description:
        "Unity дээр суурилсан гар утасны эдгэрэлтийн адал явдалт тоглоом. Харанхуйн ертөнцөөр аялж, нөөц цуглуулж, боссуудыг ялж, дотоод эв зохицлыг сэргээнэ.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="mn"
            className={`${cinzel.variable} ${inter.variable} h-full`}
        >
            <body className="min-h-full flex flex-col mystic-bg text-[#e8dff5]">
                <Navbar />
                <main className="flex-1">{children}</main>
                <footer className="border-t border-[#2a1a4a] py-6 text-center text-sm text-[#6b5a8a]">
                    <p>
                        © 2026 Nyxilla · Abyssera ·{" "}
                        <span className="text-[#00d4b1]">Адал явдлаар дамжуулан эдгэр</span>
                    </p>
                </footer>
            </body>
        </html>
    );
}
