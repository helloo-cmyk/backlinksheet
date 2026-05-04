import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: {
    absolute: "Free Brat Name Generator – Create Unique Brat Names Instantly",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-name-generator/",
  },
  description: "Use our free brat name generator to create unique brat names and text instantly. Generate your brat identity with no signup required.",
};

export default function BratNameGeneratorPage() {
  return (
    <main className="hp-root pb-24">
      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Name Generator</h1>
        <p className="intro-text">
          A free brat name generator that creates bold, aesthetic brat names instantly with no signup required.
        </p>
      </section>

      {/* ── GENERATOR APP ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="name"
            defaultTab="text"
            defaultRatio="1:1"
            defaultPlaceholder="your name"
            hideSelfieMode={true}
            hideAspectRatio={true}
            showRandomButton={true}
          />
        </div>
      </div>

      {/* ── INTERNAL LINK ── */}
      <section className="-mt-4 mb-10 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-base" style={{color: "var(--hp-ink-soft)"}}>
          Looking for all features? Try the <Link href="/" className="hp-link font-semibold">free brat generator</Link> to create memes, images, and more in one place.
        </div>
      </section>

      {/* ── WHAT THIS TOOL DOES ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Overview</span>
        <h2 className="hp-display-heading">What This Tool Does</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This brat username generator produces short, bold brat aesthetic names on demand. Each generation follows the patterns that define a strong brat identity: lowercase, blunt, slightly abstract. Use it for fresh brat name ideas across albums, playlists, profiles, and creative projects — unlimited times, no account needed.
          </p>
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Related Brat Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            If you want to explore more ways to create brat-style designs, these tools can help depending on what you&apos;re trying to make.
          </p>
          <ul className="hp-body-text space-y-3 mt-6 ml-4 list-disc">
            <li><Link href="/brat-text-generator/" className="hp-link">Brat Text Generator</Link>: Best for quick text-only designs and fast PNG downloads.</li>
            <li><Link href="/brat-maker" className="hp-link">Brat Maker</Link>: Use this if you want to create images, memes, or layered designs.</li>
            <li><Link href="/brat-font-generator" className="hp-link">Brat Font Generator</Link>: Ideal for adjusting typography, spacing, and font styling.</li>
          </ul>
        </div>
      </div>

      {/* ── WHO THIS TOOL IS FOR ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col flex flex-col md:flex-row items-start gap-12">
          <div className="flex-1">
             <span className="hp-eyebrow">Audience</span>
             <h2 className="hp-display-heading">Who This Tool Is For</h2>
          </div>
          <div className="flex-1">
             <p className="hp-body-text mt-4 md:mt-0">
               Musicians naming EPs or playlists use this brat name maker to find something that fits without hours of brainstorming. Social media users looking for a brat-aesthetic username can generate options and pick one in under a minute. Fan accounts building a specific visual identity and creators naming side projects or edit series both get usable results from the same generator.
             </p>
          </div>
        </div>
      </div>

      {/* ── WHAT MAKES A BRAT NAME ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Traits</span>
        <h2 className="hp-display-heading">What Makes a Brat Name</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            A brat name style is short, usually one or two words, almost always lowercase, and slightly abstract or blunt. There is no punctuation, no over-explanation. Names like &quot;denial&quot;, &quot;mean girl&quot;, &quot;so julia&quot;, and &quot;360&quot; capture the format: they feel confident without needing context. The brat inspired names this generator produces follow those same rules.
          </p>
        </div>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Features</span>
        <h2 className="hp-display-heading">Main Features of the Generator</h2>
        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">⚡</div>
            <h3>Instant Generation</h3>
            <p>Click once and get a batch of brat name ideas in under a second.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">💿</div>
            <h3>Album-Ready Names</h3>
            <p>Results work as brat album name generator output for EPs, singles, and playlists.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📱</div>
            <h3>Profile and Username Ideas</h3>
            <p>Generate brat username options sized right for Instagram, TikTok, and Discord.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✨</div>
            <h3>Charli XCX Inspired</h3>
            <p>Naming patterns follow the charli xcx brat names aesthetic directly.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔓</div>
            <h3>Unlimited Free Use</h3>
            <p>This brat name generator free tool has no limits, no paywalls, no caps.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Clean Simple Interface</h3>
            <p>One button, instant results, zero clutter.</p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Guide</span>
        <h2 className="hp-display-heading">How to Use the Brat Name Generator</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Open the Tool</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Load this page. No signup or download needed.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Generate Names</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Hit the generate button to get a fresh batch of brat name ideas instantly.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Pick Your Favorite</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Scan the results and grab the one that fits your project.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Use or Regenerate</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Use it directly or click again for more options. Takes seconds.</p>
          </div>
        </div>
      </div>

      {/* ── HOW PEOPLE USE BRAT NAMES ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">How People Use Brat Names</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Brat names show up everywhere once you start looking. People pull them for Instagram usernames when they want something short and memorable. Spotify brat playlist name choices come directly from this brat name ideas generator. Musicians upload EPs to SoundCloud with generated titles that match the aesthetic. Discord display names get swapped out weekly using fresh output from the brat name creator. Fan edit accounts use them as series titles or watermark aliases for their video compilations.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion
        title="Frequently Asked Questions"
        intro=""
        items={[
          { question: "Is the brat name generator free?", answer: <p>Yes, completely free with no hidden charges or premium tiers.</p> },
          { question: "Do I need to sign up?", answer: <p>No. You can generate names immediately without creating any account.</p> },
          { question: "Can I use generated names commercially?", answer: <p>Yes. You own whatever you generate and can use it for any purpose including commercial projects.</p> },
          { question: "Are the names unique?", answer: <p>The generator creates a wide variety of combinations. Uniqueness depends on how and where you use them, but the output avoids common generic patterns.</p> },
          { question: "Can I generate names specifically for album titles?", answer: <p>Yes. Many results are structured to work directly as album, EP, or playlist titles.</p> },
          { question: "Is this officially connected to Charli XCX?", answer: <p>No. This is a fan-made tool inspired by the Brat aesthetic. It has no official connection to Charli XCX or her team.</p> },
        ]}
      />
    </main>
  );
}
