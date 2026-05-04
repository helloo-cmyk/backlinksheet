import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the black brat generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlimited use, no payment, no hidden limits.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my own background image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload any photo and layer brat text on top of it.",
      },
    },
    {
      "@type": "Question",
      name: "What file format is exported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG at your chosen resolution: 1024, 1500, 2048, or 3000 px. No watermark.",
      },
    },
    {
      "@type": "Question",
      name: "Is it mobile-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full touch controls on iOS and Android. Same features as desktop.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use designs commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every image you create is yours to use for any purpose, including commercial projects.",
      },
    },
  ],
};

export const metadata = {
  title: {
    absolute: "Brat Generator Black — Free Dark Aesthetic Text, No Watermark",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-black-generator/",
  },
  description: "Free brat generator black — create bold, high-contrast dark brat text & images instantly. No watermark, no signup. Download sharp PNG for TikTok, Instagram & memes.",
};

export default function BratBlackGeneratorPage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Black Brat Generator</h1>
        <p className="intro-text">
          This free black brat generator creates high contrast brat text and visuals on dark backgrounds. The brat generator black version is built for the dark brat aesthetic: light text on pure black, maximum readability, sharp edges.
        </p>
      </section>

      {/* ── GENERATOR APP ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="full"
            defaultBg="#0a0a0a"
            defaultFg="#ffffff"
            lockBg={true}
            hidePresets={true}
            defaultTab="text"
            defaultPlaceholder="dark brat"
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
            The brat generator black background preset loads dark by default. No signup, no configuration. Type your text, adjust the layout, and get a PNG download in seconds. This is the version for creators who want something sharper and more dramatic than the standard green.
          </p>
        </div>
      </div>

      {/* ── WHAT IS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col max-w-[1200px] mx-auto">
          <div>
            <span className="hp-eyebrow">Overview</span>
            <h2 className="hp-display-heading">What Is the Brat Generator Black</h2>
          </div>
          <div>
            <p className="hp-body-text">
              The brat generator black is a color-specific version tuned for dark brat text layouts. It uses true black (#0A0A0A) and near-black backgrounds with light text on top for maximum contrast. Where other brat tools start with green or pink, this one is built around high contrast brat typography that looks sharp on dark-mode feeds and OLED screens.
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
          <li><Link href="/brat-green-generator/" className="hp-link">Green Brat Generator</Link> — original neon green brat look.</li>
          <li><Link href="/brat-generator-pink/" className="hp-link">Pink Brat Generator</Link> — softer pastel brat aesthetic.</li>
          <li><Link href="/brat-generator-white/" className="hp-link">White Brat Generator</Link> — clean minimalist brat layouts.</li>
          <li><Link href="/brat-text-generator/" className="hp-link">Brat Text Generator</Link> — fast text-only PNG export.</li>
        </ul>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Features of the Brat Generator Black</h2>
        <div className="max-w-3xl mb-8">
          <p className="hp-body-text mt-4">
            Controls built for the dark brat aesthetic specifically.
          </p>
        </div>

        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">⬛</div>
            <h3>Deep Black Presets</h3>
            <p>Default is pure black (#0A0A0A). Near-black tones available through the hex picker for subtler dark backgrounds.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Clean Brat Typography</h3>
            <p>Bold sans-serif text with tight spacing. Light text on dark backgrounds keeps the brat black text sharp and readable.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✏️</div>
            <h3>Full Customization</h3>
            <p>Font size, letter spacing, line height, alignment, and text position. All adjustable in real time.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📝</div>
            <h3>Black Text Generator</h3>
            <p>Create dark brat meme captions, album-style titles, minimalist black brat quotes, and profile name graphics.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🖼️</div>
            <h3>Background Image Upload</h3>
            <p>Upload any photo and layer brat text on black on top as a canvas overlay.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Multiple Aspect Ratios</h3>
            <p>1:1 square, 9:16 vertical, 4:5 portrait, 16:9 landscape. Covers Instagram, TikTok, and YouTube.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✨</div>
            <h3>High-Quality Export</h3>
            <p>PNG at 1024, 1500, 2048, or 3000 px. No watermark, no compression.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📱</div>
            <h3>Mobile-Friendly</h3>
            <p>Touch controls for text positioning and export on iOS and Android browsers.</p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Guide</span>
        <h2 className="hp-display-heading">How to Use the Brat Generator Black</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Enter Your Text</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Type your phrase, caption, or name. The canvas renders it instantly as white text on the black background.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Select Black Style</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">The dark preset loads by default. Use the hex picker to try near-black shades or adjust text color from white to neon green.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Adjust Layout</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Set text size, spacing, and alignment. Pick an aspect ratio for your target platform.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Add a Background</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Keep the solid black or upload your own image. Dark brat text stays legible on most photo backgrounds.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">5</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Download Design</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Click Download PNG and pick your resolution. Instant export, sharp PNG, no signup.</p>
          </div>
        </div>
      </div>

      {/* ── WHY BLACK BACKGROUND WORKS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Why Black Background Works for Brat Typography</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Black creates maximum contrast with light text, which makes letter edges crisper and the overall composition sharper than on colored backgrounds. The dark canvas eliminates visual noise so the typography becomes the only thing on screen. Neon green text on black pops harder than on white because the luminance difference is greater. On dark-mode interfaces like TikTok at night or Instagram dark theme, black background text meme content blends into the UI instead of jarring against it. The result is an editorial, premium feel that lighter brat versions do not replicate.
          </p>
        </div>
      </div>

      {/* ── TIPS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">How to Get Better Results</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Keep text short. One to four words. Black brat designs are strongest when the layout stays minimal and the text has room to breathe.
          </p>
          <p className="hp-body-text mt-4">
            Use white (#FFFFFF) or neon green (#C1FF00) for text color, not gray. Gray on black loses contrast and makes the text feel washed out instead of intentional.
          </p>
          <p className="hp-body-text mt-4">
            Avoid adding stickers or extra elements unless they serve the composition. The strength of minimalist black brat is the empty space around the text.
          </p>
          <p className="hp-body-text mt-4">
            Export at 2048 px or higher. Black designs show compression artifacts more than light ones, so higher resolution matters here. Use full-bleed layouts where the black extends to every edge of the canvas.
          </p>
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Related Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This page handles the dark brat aesthetic. For other workflows:
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
              Try the <Link href="/brat-green-generator/" className="hp-link">green brat generator</Link> for the original neon brat look.
            </li>
          </ul>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion
        title="Frequently Asked Questions"
        intro="Common questions about this black brat generator."
        items={[
          { question: "Is the black brat generator free?", answer: <p>Yes. Unlimited use, no payment, no hidden limits.</p> },
          { question: "Can I use my own background image?", answer: <p>Yes. Upload any photo and layer brat text on top of it.</p> },
          { question: "What file format is exported?", answer: <p>PNG at your chosen resolution: 1024, 1500, 2048, or 3000 px. No watermark.</p> },
          { question: "Is it mobile-friendly?", answer: <p>Yes. Full touch controls on iOS and Android. Same features as desktop.</p> },
          { question: "Can I use designs commercially?", answer: <p>Yes. Every image you create is yours to use for any purpose, including commercial projects.</p> },
        ]}
      />
    </main>
  );
}
