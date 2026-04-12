import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#1a0a2e] blur-3xl opacity-80" />
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#00d4b1]/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#ffd700]/3 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="mb-2 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.4em] text-[#6b5a8a] uppercase">
            Nyxilla Presents
          </div>
          <h1 className="font-[family-name:var(--font-cinzel)] text-6xl sm:text-8xl font-black shimmer mb-6 leading-none">
            ABYSSERA
          </h1>
          <p className="text-xl sm:text-2xl text-[#9b87c0] font-[family-name:var(--font-cinzel)] mb-4 italic">
            Heal Through Adventure
          </p>
          <p className="text-[#6b5a8a] max-w-xl mx-auto leading-relaxed mb-10">
            A mobile healing-adventure where mindfulness, crafting, and combat
            intertwine. Breathe, gather, survive — and face The Watcher lurking
            in the Fractured Plains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-[#00d4b1] px-8 py-4 font-[family-name:var(--font-cinzel)] font-semibold text-[#0d0d1a] tracking-wider hover:bg-[#00a88e] transition-all teal-glow"
            >
              Create Account
            </Link>
            <a
              href="#worlds"
              className="rounded-lg border border-[#2a1a4a] px-8 py-4 font-[family-name:var(--font-cinzel)] text-[#9b87c0] tracking-wider hover:border-[#6b5a8a] hover:text-[#e8dff5] transition-all"
            >
              Explore Worlds
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4a3a6a]">
          <span className="text-xs tracking-widest uppercase font-[family-name:var(--font-cinzel)]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#4a3a6a] to-transparent" />
        </div>
      </section>

      {/* Wellness mechanics */}
      <section className="py-24 px-4 border-t border-[#2a1a4a]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold gold-text mb-4">
            A Game That Heals
          </h2>
          <p className="text-[#6b5a8a] max-w-xl mx-auto leading-relaxed">
            Abyssera weaves mental wellness into every mechanic — not as a
            feature, but as the core of the experience.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FeatureCard
            icon="🌬"
            title="4-4-8 Breathing"
            desc="Breathing exercises integrated into gameplay moments — calm your character and yourself simultaneously."
          />
          <FeatureCard
            icon="🔨"
            title="Mindful Crafting"
            desc="Gather resources in the Verdant Plains and craft in your Yurt. Slow, intentional play."
          />
          <FeatureCard
            icon="🧠"
            title="CBT Principles"
            desc="Cognitive-behavioural therapy woven into story events and dialogue choices."
          />
        </div>
      </section>

      {/* Worlds */}
      <section id="worlds" className="py-24 px-4 border-t border-[#2a1a4a]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#e8dff5] mb-4">
            Three Worlds Await
          </h2>
          <p className="text-[#6b5a8a]">Each world demands something different of you.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <WorldCard
            number="HUB"
            name="The Yurt"
            color="teal"
            desc="Your sanctuary. First-person refuge for crafting, saving, and planning your next venture into the unknown."
          />
          <WorldCard
            number="W1"
            name="Verdant Plains"
            color="gold"
            desc="Isometric resource gathering across lush but unsettled lands. Harvest, explore, and build resilience."
          />
          <WorldCard
            number="W2"
            name="Fractured Plains"
            color="purple"
            desc="Third-person combat in shattered terrain. The Watcher — Fear Incarnate — waits at the end."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 border-t border-[#2a1a4a] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold shimmer mb-4">
            Begin Your Journey
          </h2>
          <p className="text-[#6b5a8a] mb-8 leading-relaxed">
            Register now to link your progress across devices. One account —
            your saves follow you everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-[#00d4b1] px-8 py-4 font-[family-name:var(--font-cinzel)] font-semibold text-[#0d0d1a] tracking-wider hover:bg-[#00a88e] transition-all teal-glow"
            >
              Create Account
            </Link>
            <Link
              href="/leaderboard"
              className="rounded-lg border border-[#2a1a4a] px-8 py-4 font-[family-name:var(--font-cinzel)] text-[#9b87c0] tracking-wider hover:border-[#6b5a8a] hover:text-[#e8dff5] transition-all"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-[#2a1a4a] bg-[#120820] p-6 hover:border-[#00d4b1]/40 transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-[family-name:var(--font-cinzel)] text-[#e8dff5] font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#6b5a8a] leading-relaxed">{desc}</p>
    </div>
  );
}

function WorldCard({
  number,
  name,
  color,
  desc,
}: {
  number: string;
  name: string;
  color: "teal" | "gold" | "purple";
  desc: string;
}) {
  const textClass =
    color === "teal"
      ? "text-[#00d4b1]"
      : color === "gold"
      ? "text-[#ffd700]"
      : "text-[#9b87c0]";

  const borderClass =
    color === "teal"
      ? "border-[#00d4b1]/30"
      : color === "gold"
      ? "border-[#ffd700]/30"
      : "border-[#2a1a4a]";

  return (
    <div className={`rounded-xl border bg-[#120820] p-6 hover:bg-[#1e1035] transition-colors ${borderClass}`}>
      <div className={`font-[family-name:var(--font-cinzel)] text-xs tracking-widest mb-1 ${textClass}`}>
        {number}
      </div>
      <h3 className={`font-[family-name:var(--font-cinzel)] text-xl font-bold mb-3 ${textClass}`}>
        {name}
      </h3>
      <p className="text-sm text-[#6b5a8a] leading-relaxed">{desc}</p>
    </div>
  );
}
