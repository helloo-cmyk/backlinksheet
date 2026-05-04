import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the pink brat generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlimited use, no payment, no hidden limits.",
      },
    },
    {
      "@type": "Question",
      name: "Can I choose custom pink shades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The default is #FF90E8 but you can enter any hex code or use the color picker for custom pinks.",
      },
    },
    {
      "@type": "Question",
      name: "What canvas sizes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1:1 square, 9:16 vertical, 4:5 portrait, and 16:9 landscape.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upload my own background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload any image and layer pink brat text on top.",
      },
    },
    {
      "@type": "Question",
      name: "Is it optimized for mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full touch controls on iOS and Android. Same features as desktop.",
      },
    },
  ],
};

export const metadata = {
  title: {
    absolute: "Pink Brat Generator – Free Pink Brat Text & Images",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-generator-pink/",
  },
  description: "Free pink brat generator — create pink brat text and images with pastel or bright pink backgrounds. No signup, no watermark. Download PNG instantly.",
};

export default function BratGeneratorPinkPage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Pink Brat Generator</h1>
        <p className="intro-text">
          This free pink brat generator creates brat-style text and images using pink backgrounds instead of the classic neon green. The brat generator pink preset loads by default so you can start creating brat text generator pink visuals immediately.
        </p>
      </section>

      {/* ── GENERATOR APP ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="full"
            defaultBg="#ff90e8"
            defaultFg="#0a0a0a"
            lockBg={true}
            hidePresets={true}
            defaultTab="text"
            defaultPlaceholder="pink brat"
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
            The brat text generator pink version is built for creators who prefer a softer, warmer palette over the standard neon green. It runs entirely browser-based with no signup, and every design exports as a PNG download in seconds. If you want the full editor with all color options, the <Link href="/" className="hp-link">brat generator</Link> has everything in one place.
          </p>
        </div>
      </div>

      {/* ── WHAT IS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col max-w-[1200px] mx-auto">
          <div>
            <span className="hp-eyebrow">Overview</span>
            <h2 className="hp-display-heading">What Is the Brat Generator Pink</h2>
          </div>
          <div>
            <p className="hp-body-text">
              The brat generator pink is a color-specific version of the brat generator built around pink brat text and pastel brat layouts. Unlike a generic color filter, it loads with a curated pink shade (#FF90E8) that balances readability with the aesthetic pink brat look. You can also enter any hex code for custom pinks, from soft pastels to hot pink.
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
          <li><Link href="/brat-black-generator/" className="hp-link">Black Brat Generator</Link> — high-contrast dark brat visuals.</li>
          <li><Link href="/brat-generator-white/" className="hp-link">White Brat Generator</Link> — clean minimalist brat layouts.</li>
          <li><Link href="/brat-text-generator/" className="hp-link">Brat Text Generator</Link> — fast text-only PNG export.</li>
        </ul>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Features of the Brat Generator Pink</h2>
        <div className="max-w-3xl mb-8">
          <p className="hp-body-text mt-4">
            Controls tuned for the pink brat aesthetic specifically.
          </p>
        </div>

        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🩷</div>
            <h3>Pink Preset System</h3>
            <p>Default background is #FF90E8. Hex picker available for any custom pink from soft pastel to hot pink.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Authentic Typography</h3>
            <p>Bold sans-serif text with tight spacing and centered alignment. Brat style, pink palette.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✏️</div>
            <h3>Full Customization</h3>
            <p>Font size, letter spacing, line height, alignment, and text position. All adjustable in real time.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">💕</div>
            <h3>Pink Text Mode</h3>
            <p>Optimized for brat text pink output: captions, lyric graphics, aesthetic quotes, and pink meme text generator use.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🖼️</div>
            <h3>Custom Uploads</h3>
            <p>Upload any photo and layer pink brat text on top as a canvas overlay.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Canvas Sizes</h3>
            <p>1:1 square, 9:16 vertical, 4:5 portrait, 16:9 landscape. Covers Instagram, TikTok, and YouTube.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✨</div>
            <h3>High-Quality Export</h3>
            <p>PNG at 1024, 1500, 2048, or 3000 px. No watermark, no compression.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📱</div>
            <h3>Mobile-Optimized</h3>
            <p>Touch controls for text positioning and export on iOS and Android browsers.</p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Guide</span>
        <h2 className="hp-display-heading">How to Use the Pink Brat Generator</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Enter Text</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Type your phrase, caption, or name. The canvas renders it instantly on the pink background.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Select Pink Style</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">The brat generator pink background loads by default. Use the hex picker to adjust the shade if you want something warmer or cooler.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Adjust Layout</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Set text size, spacing, and alignment. Pick an aspect ratio for your target platform.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Add Background</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Keep the solid pink or upload your own image. Brat pink text stays sharp on photo backgrounds.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">5</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Download Design</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Click Download PNG and pick your resolution. No watermark, no limits, instant export.</p>
          </div>
        </div>
      </div>

      {/* ── WHY PINK EDITS BECAME POPULAR ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Why Pink Brat Edits Became Popular</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            The classic neon green felt too aggressive for certain types of content. Lyric posts, mood captions, and personal branding visuals needed something softer, and the pastel pink aesthetic filled that gap. The pink brat meme format grew on TikTok and Instagram alongside the broader Gen Z pastel trend, where warm tones outperform high-contrast neon in engagement. Pink also pairs better with light and neutral feed themes, which is why aesthetic pink brat content became its own category separate from the green original.
          </p>
        </div>
      </div>

      {/* ── STYLE TIPS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">How to Make Pink Brat Look Better</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Use pastel pink, not hot pink. Softer shades keep text readable and match the soft brat style that performs on feeds. Pair with white text for a lighter mood or dark text (#0a0a0a) for stronger contrast.
          </p>
          <p className="hp-body-text mt-4">
            Keep text centered and short. One to three words. That is the format that looks intentional rather than cluttered.
          </p>
          <p className="hp-body-text mt-4">
            Use 4:5 portrait for Instagram feed posts to take more screen space. Use 9:16 for TikTok and stories. Export at 2048 px or higher so the image stays sharp after platform compression.
          </p>
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Related Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This page handles the pastel brat look. For other workflows:
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
        intro="Common questions about this pink brat generator."
        items={[
          { question: "Is the pink brat generator free?", answer: <p>Yes. Unlimited use, no payment, no hidden limits.</p> },
          { question: "Can I choose custom pink shades?", answer: <p>Yes. The default is #FF90E8 but you can enter any hex code or use the color picker.</p> },
          { question: "What canvas sizes are available?", answer: <p>1:1 square, 9:16 vertical, 4:5 portrait, and 16:9 landscape.</p> },
          { question: "Can I upload my own background?", answer: <p>Yes. Upload any image and layer pink brat text on top.</p> },
          { question: "Is it optimized for mobile?", answer: <p>Yes. Full touch controls on iOS and Android. Same features as desktop.</p> },
        ]}
      />
    </main>
  );
}
