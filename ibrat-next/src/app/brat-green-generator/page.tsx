import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the green brat generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlimited use, no payment, no hidden limits.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to sign up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The tool works instantly in your browser. No account, no email.",
      },
    },
    {
      "@type": "Question",
      name: "What file format do designs export as?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG at your chosen resolution: 1024, 1500, 2048, or 3000 px. No watermark.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add my own photo background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload any image and layer neon green brat text on top.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use it on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full touch support on iOS and Android. Same controls as desktop.",
      },
    },
  ],
};

export const metadata = {
  title: {
    absolute: "Brat Green Generator – Free Neon Green Brat Text & Images",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-green-generator/",
  },
  description: "Free brat green generator — create neon green brat text and images instantly. The original brat color. No signup, no watermark. Download PNG.",
};

export default function BratGreenGeneratorPage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Green Generator</h1>
        <p className="intro-text">
          This free brat green generator creates neon green brat text and graphics using the original brat color palette. Use the typography controls below to adjust weight, spacing, and layout, then export as PNG.
        </p>
      </section>

      {/* ── GENERATOR APP ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="full"
            defaultBg="#c1ff00"
            defaultFg="#0a0a0a"
            lockBg={true}
            hidePresets={true}
            defaultTab="text"
            defaultPlaceholder="green brat"
          />
        </div>
      </div>

      {/* ── INTERNAL LINK ── */}
      <section className="-mt-4 mb-10 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-base" style={{color: "var(--hp-ink-soft)"}}>
          Looking for all features? Try the <Link href="/" className="hp-link font-semibold">free brat generator</Link> to create memes, images, and more in one place.
        </div>
      </section>

      {/* ── INTRO PARAGRAPH ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="max-w-3xl">
          <p className="hp-body-text">
            Neon green is the original brat color. This green brat generator is tuned specifically for that acid green background with dark text on top. The brat generator green preset loads by default so you can start typing immediately with no signup and get a PNG download in seconds.
          </p>
        </div>
      </div>

      {/* ── WHAT IS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col max-w-[1200px] mx-auto">
          <div>
            <span className="hp-eyebrow">Overview</span>
            <h2 className="hp-display-heading">What Is the Brat Green Generator</h2>
          </div>
          <div>
            <p className="hp-body-text">
              A color-specific version of the brat generator built around the neon green brat text look. Unlike a generic color picker tool, this one loads with the correct acid green shade (#C1FF00), matched typography weight, and contrast ratios that reproduce the brat aesthetic green accurately. The default settings are calibrated so that what you see on screen matches what fans and creators recognize as the green brat aesthetic on social platforms.
            </p>
          </div>
        </div>
      </div>

      {/* ── EXPLORE STYLES ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Explore More Color Styles</h2>
        <p className="hp-body-text mt-4">
          Same brat style, different palettes.
        </p>
        <ul className="hp-body-text space-y-3 mt-6 ml-4 list-disc">
          <li><Link href="/brat-generator-pink/" className="hp-link">Pink Brat Generator</Link> — softer, warmer brat aesthetic tone.</li>
          <li><Link href="/brat-black-generator/" className="hp-link">Black Brat Generator</Link> — high-contrast dark brat visuals.</li>
          <li><Link href="/brat-generator-white/" className="hp-link">White Brat Generator</Link> — clean minimalist brat layouts.</li>
          <li><Link href="/brat-text-generator/" className="hp-link">Brat Text Generator</Link> — fast text-only PNG export.</li>
        </ul>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Features of the Brat Green Generator</h2>
        <div className="max-w-3xl mb-8">
          <p className="hp-body-text mt-4">
            Controls built for the neon green brat look specifically.
          </p>
        </div>

        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🟩</div>
            <h3>Authentic Neon Green</h3>
            <p>Default background is #C1FF00, the lime green brat text shade. Adjustable if you want a slightly different neon tone.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Clean Minimal Typography</h3>
            <p>Bold sans-serif text with tight spacing and centered alignment. The brat font green defaults match the recognized style.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✏️</div>
            <h3>Full Customization</h3>
            <p>Font size, letter spacing, line height, alignment, and text position. Adjust everything or use the defaults.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🖼️</div>
            <h3>Green Text Overlay</h3>
            <p>Upload any photo and place neon green brat text on top. The text renders as a canvas layer, not a flat paste.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Multiple Aspect Ratios</h3>
            <p>1:1 square, 9:16 vertical, 4:5 portrait, 16:9 landscape. Covers Instagram, TikTok, and YouTube.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✨</div>
            <h3>High-Quality Export</h3>
            <p>PNG at 1024, 1500, 2048, or 3000 px. No watermark, no compression loss.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📱</div>
            <h3>Mobile-Optimized</h3>
            <p>Touch controls for text positioning, sticker placement, and export. Works on iOS and Android browsers.</p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Guide</span>
        <h2 className="hp-display-heading">How to Use the Brat Green Generator</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Enter Your Text</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Type your phrase, caption, or name. The canvas renders it instantly in neon green brat style.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Apply Neon Green</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">The acid green background loads by default. Adjust the shade with the hex picker if you want a warmer or cooler green.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Adjust Layout</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Set text size, spacing, and alignment. Pick an aspect ratio for your target platform.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Add Background</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Keep the solid neon green or upload your own image. Green brat text stays sharp on photo backgrounds.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">5</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Download Design</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Click Download PNG and pick your resolution. Instant export, no signup required.</p>
          </div>
        </div>
      </div>

      {/* ── WHY NEON GREEN ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Why Neon Green Became the Brat Aesthetic</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            The Charli XCX green aesthetic started with album artwork and tour visuals, then spread across TikTok and Instagram during brat summer. The color works because it is impossible to scroll past. On social media feeds filled with warm filters and muted tones, an acid green background with dark bold text stops the thumb immediately. That contrast is the entire point. Green brat meme content became instantly recognizable as a result, and the neon green text generator use case grew from there. The shade functions as a visual badge: one glance and you know what it references.
          </p>
        </div>
      </div>

      {/* ── HOW TO MAKE IT AUTHENTIC ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">How to Make It Look Authentic</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Keep text lowercase. Most brat green text uses 1 to 3 words, not full sentences. Short phrases read better on the acid green background because there is less visual competition.
          </p>
          <p className="hp-body-text mt-4">
            Use 1:1 square for Instagram posts and profile pictures. Use 9:16 vertical for TikTok and stories. Export at 2048 px or higher so the image stays sharp after platform compression.
          </p>
          <p className="hp-body-text mt-4">
            Avoid adding too many elements. The brat summer green look works because it is minimal. Text on a flat color field. That is the whole design.
          </p>
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Related Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This page handles the neon green brat look. For other workflows:
          </p>
          <ul className="hp-body-text list-disc space-y-3 mt-4 ml-5">
            <li>
              Use the <Link href="/" className="hp-link">brat generator</Link> for the full editor with all colors and tools.
            </li>
            <li>
              Try the <Link href="/brat-text-generator/" className="hp-link">brat text generator</Link> for quick text-only exports.
            </li>
            <li>
              Use the <Link href="/brat-maker/" className="hp-link">brat maker</Link> for stickers, image layers, and complex layouts.
            </li>
            <li>
              Try the <Link href="/brat-font-generator/" className="hp-link">brat font generator</Link> to study brat typography in detail.
            </li>
          </ul>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion
        title="Frequently Asked Questions"
        intro="Common questions about this green brat generator."
        items={[
          { question: "Is the green brat generator free?", answer: <p>Yes. Unlimited use, no payment, no hidden limits.</p> },
          { question: "Do I need to sign up?", answer: <p>No. The tool works instantly in your browser. No account, no email.</p> },
          { question: "What file format do designs export as?", answer: <p>PNG at your chosen resolution: 1024, 1500, 2048, or 3000 px. No watermark.</p> },
          { question: "Can I add my own photo background?", answer: <p>Yes. Upload any image and layer neon green brat text on top.</p> },
          { question: "Can I use it on mobile?", answer: <p>Yes. Full touch support on iOS and Android. Same controls as desktop.</p> },
        ]}
      />
    </main>
  );
}
