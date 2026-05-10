import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#0d0d1a] px-4 text-center overflow-hidden">

            {/* Background Logo */}
            <div className="pointer-events-none absolute inset-0">
                <Image
                    src="/bg.png"
                    alt="Background Logo"
                    fill
                    className="object-cover opacity-10"
                />
            </div>

            {/* Glow effect */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00d4b1]/10 blur-3xl rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-6xl font-bold text-[#00d4b1] mb-4">
                    404
                </h1>

                <p className="text-[#9b87c0] mb-6">
                    Хуудас олдсонгүй
                </p>

                <Link
                    href="/"
                    className="inline-block rounded bg-[#00d4b1] px-6 py-3 text-[#0d0d1a] font-semibold hover:bg-[#00a88e]"
                >
                    Нүүр хуудас руу буцах
                </Link>
            </div>
        </div>
    );
}
