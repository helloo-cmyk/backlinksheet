import Link from "next/link";
import Image from "next/image";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";

const WHITE_BRAT_EXAMPLES = [
  { src: "/examples/brat1.png", phrase: "minimal brat", alt: "white brat generator example minimalist text" },
  { src: "/examples/brat2.png", phrase: "stay calm", alt: "brat generator white text example stay calm" },
  { src: "/examples/brat3.png", phrase: "white aesthetic", alt: "white brat generator example white aesthetic" },
  { src: "/examples/brat4.png", phrase: "soft chaos", alt: "brat generator white text example soft chaos" },
  { src: "/examples/brat5.png", phrase: "clean energy", alt: "white brat generator example clean energy" },
  { src: "/examples/brat6.png", phrase: "neutral mood", alt: "brat generator white text example neutral mood" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the white brat generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlimited use, no payment, no hidden limits.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my own background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload any image and layer white brat text on top.",
      },
    },
    {
      "@type": "Question",
      name: "What aspect ratios are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1:1 square, 9:16 vertical, 4:5 portrait, and 16:9 landscape.",
      },
    },
    {
      "@type": "Question",
      name: "Is it mobile-optimized?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full touch controls on iOS and Android. Same features as desktop.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use designs for commercial use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every image you create is yours to use for any purpose, including commercial projects.",
      },
    },
  ],
};

export const metadata = {
  title: {
    absolute: "Brat Generator White — Free Clean Aesthetic Text, No Watermark",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-generator-white/",
  },
  description: "Free brat generator white — create minimalist white brat text & images instantly. No watermark, no signup. Download high-res PNG for Instagram, TikTok & more.",
};

export default function BratGeneratorWhitePage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">White Brat Generator</h1>
        <p className="intro-text">
          This free white brat generator creates minimalist brat-style text on clean white backgrounds. The brat generator white version is the neutral option for designs where neon green or black would be too loud.
        </p>
      </section>

      {/* ── GENERATOR APP ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="full"
            defaultBg="#ffffff"
            defaultFg="#0a0a0a"
            lockBg={true}
            hidePresets={true}
            defaultTab="text"
            defaultPlaceholder="minimal brat"
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
            The clean white brat text look works for feeds and designs where bright colors or dark themes would clash with the surrounding content. This version runs entirely in your browser with no signup. Type your text, adjust the layout, and download a PNG in seconds.
          </p>
        </div>
      </div>

      {/* ── WHAT THIS TOOL DOES ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col max-w-[1200px] mx-auto">
          <div>
            <span className="hp-eyebrow">Overview</span>
            <h2 className="hp-display-heading">What This Tool Does</h2>
          </div>
          <div>
            <p className="hp-body-text">
              The brat generator white loads with a pure white background (#FFFFFF) and off-white options available through the hex picker. Bold brat typography sits on the clean background with dark text for readable contrast. Every design exports as a PNG at up to 3000 px with no watermark.
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
          <li><Link href="/brat-black-generator/" className="hp-link">Black Brat Generator</Link> — high-contrast dark brat visuals.</li>
          <li><Link href="/brat-text-generator/" className="hp-link">Brat Text Generator</Link> — fast text-only PNG export.</li>
        </ul>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Main Features of the Brat White Generator</h2>
        <div className="max-w-3xl mb-8">
          <p className="hp-body-text mt-4">
            Controls tuned for the clean brat aesthetic.
          </p>
        </div>

        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🤍</div>
            <h3>Clean White Presets</h3>
            <p>Pure white (#FFFFFF) and off-white options through the hex picker for softer or warmer backgrounds.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Minimal Typography</h3>
            <p>Bold sans-serif text with tight spacing. Dark text on white background for maximum readability.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">✏️</div>
            <h3>Full Customization</h3>
            <p>Font size, letter spacing, line height, alignment, and text position. All adjustable in real time.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">💭</div>
            <h3>White Text Mode</h3>
            <p>Create minimal white brat captions, clean album titles, and brat white text profile graphics.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🖼️</div>
            <h3>Background Uploads</h3>
            <p>Upload any photo and layer brat text on top. White text works well on darker image backgrounds.</p>
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
        <h2 className="hp-display-heading">How to Use the Brat White Generator</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Enter Your Text</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Type your phrase, caption, or name. The canvas renders it instantly on the white background.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Apply White Style</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">The white preset loads by default. Use the hex picker for off-white or cream tones if you want something warmer.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Adjust Layout</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Set text size, spacing, and alignment. Pick an aspect ratio for your target platform.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Add Background</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Keep the solid white or upload your own image. The brat text generator white output stays sharp on photo backgrounds.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">5</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Download Visual</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Click Download PNG and pick your resolution. No watermark, no signup, instant export.</p>
          </div>
        </div>
      </div>

      {/* ── WHY WHITE FEELS CLEAN ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Why White Brat Feels Clean and Minimal</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            White removes color as a variable, which puts all the visual weight on the typography itself. The brat generator white text output reads as neutral and deliberate rather than themed, so it fits into different feed aesthetics without clashing. On platforms like Instagram and Pinterest where curated grids matter, a white brat meme blends with light-themed content instead of disrupting it. The minimalist brat look works because it keeps the design quiet while the text stays bold.
          </p>
        </div>
      </div>

      {/* ── TIPS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">How to Get the Best Result</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Use pure white (#FFFFFF) with dark text (#0A0A0A), not light gray. Gray text on white loses contrast and makes the design look accidental instead of intentional.
          </p>
          <p className="hp-body-text mt-4">
            White designs need more breathing room than dark ones. Give your text generous spacing and avoid filling the canvas. The empty space is part of the clean white aesthetic.
          </p>
          <p className="hp-body-text mt-4">
            Export at 2048 px or higher. White backgrounds show compression artifacts less than dark ones, but higher resolution still keeps text edges sharp on retina screens.
          </p>
          <p className="hp-body-text mt-4">
            If you upload a light photo background, switch to bolder text weight or increase size so the brat white text does not blend into the image.
          </p>
        </div>
      </div>

      {/* ── EXAMPLES GALLERY ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Gallery</span>
        <h2 className="hp-display-heading">White Brat Generator Examples</h2>
        <div className="max-w-4xl">
          <p className="hp-body-text mt-4 mb-8">
            Real outputs from this tool. Each shows the clean, minimal white brat style. Type your own text above to create similar results.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 list-none pl-0">
            {WHITE_BRAT_EXAMPLES.map(({ src, phrase, alt }) => (
              <li key={phrase} className="rounded-xl overflow-hidden bg-[var(--hp-surface)] shadow-sm border border-[var(--hp-border)]">
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <p className="text-[13px] font-medium text-[var(--hp-ink)] capitalize">{phrase}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Related Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This page handles the white brat background look. For other workflows:
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
              Try the <Link href="/brat-black-generator/" className="hp-link">black brat generator</Link> for the opposite: high-contrast dark visuals.
            </li>
          </ul>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion
        title="Frequently Asked Questions"
        intro="Common questions about this white brat generator."
        items={[
          { question: "Is the white brat generator free?", answer: <p>Yes. Unlimited use, no payment, no hidden limits.</p> },
          { question: "Can I use my own background?", answer: <p>Yes. Upload any image and layer brat text on top.</p> },
          { question: "What aspect ratios are available?", answer: <p>1:1 square, 9:16 vertical, 4:5 portrait, and 16:9 landscape.</p> },
          { question: "Is it mobile-optimized?", answer: <p>Yes. Full touch controls on iOS and Android. Same features as desktop.</p> },
          { question: "Can I use designs for commercial use?", answer: <p>Yes. Every image you create is yours to use for any purpose, including commercial projects.</p> },
        ]}
      />
    </main>
  );
}
