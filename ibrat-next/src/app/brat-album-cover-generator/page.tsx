import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the brat album cover generator free?",
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
      name: "Can I upload my own background image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload any photo, texture, or artwork and layer brat text on top.",
      },
    },
    {
      "@type": "Question",
      name: "Are downloads watermark-free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every export is clean with no watermark or branding.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my cover for commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every image you create is yours to use for any purpose, including commercial releases.",
      },
    },
    {
      "@type": "Question",
      name: "What resolution are exports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG at 1024, 1500, 2048, or 3000 px. No compression loss.",
      },
    },
  ],
};

export const metadata = {
  title: {
    absolute: "Brat Album Cover Generator – Free Brat Cover Art Maker",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-album-cover-generator/",
  },
  description: "Free brat album cover generator — create brat-style album art, playlist covers & music visuals instantly. No signup, no watermark. Download high-res PNG.",
};

export default function BratAlbumCoverGeneratorPage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Album Cover Generator</h1>
        <p className="intro-text">
          This free brat album cover generator creates album-style artwork using brat typography, color themes, and layout controls. A full album cover generator with no design software needed.
        </p>
      </section>

      {/* ── GENERATOR APP ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="album"
            defaultTab="style"
            defaultRatio="1:1"
            defaultResolution="3000"
            defaultPlaceholder="album title"
            hideSelfieMode={false}
            hidePresets={false}
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
            The brat album cover maker handles mock album releases, Spotify playlist covers, fan art, and social media visuals that need the album-artwork look. This brat cover generator runs in your browser with no signup. Type your title, pick your palette, upload a background if you want one, and download a finished cover in seconds.
          </p>
        </div>
      </div>

      {/* ── WHAT IS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col max-w-[1200px] mx-auto">
          <div>
            <span className="hp-eyebrow">Overview</span>
            <h2 className="hp-display-heading">What Is a Brat Album Cover Generator</h2>
          </div>
          <div>
            <p className="hp-body-text">
              This brat album cover generator combines bold brat typography, flat color backgrounds, and optional photo uploads into square or landscape cover layouts. The brat cover art output renders in real time as you type and adjust settings. Everything from text placement to color to aspect ratio is controllable, so you get a finished design without switching between tools. Exports are PNG at up to 3000 px with no watermark.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHO USES IT ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Audience</span>
        <h2 className="hp-display-heading">Who Uses the Generator</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Musicians use it for mock releases and concept album visuals when they need artwork fast and do not want to open Photoshop. Playlist makers on Spotify and Apple Music use it for custom playlist cover art that matches the brat album art style. Fan artists create brat artwork generator output for edits and tributes. Content creators grab it for album-aesthetic social posts where the visual needs to feel like a real release, not a meme.
          </p>
        </div>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Main Features</h2>
        <div className="max-w-3xl mb-8">
          <p className="hp-body-text mt-4">
            Controls built for album cover layouts specifically.
          </p>
        </div>

        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">💿</div>
            <h3>Album-Style Presets</h3>
            <p>Square 1:1 canvas is the default for album covers. Also supports 4:5 and 16:9 for banners and thumbnails.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Brat-Inspired Typography</h3>
            <p>Bold sans-serif text with adjustable size, weight, spacing, and alignment for album titles and artist names.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🖼️</div>
            <h3>Custom Backgrounds</h3>
            <p>Upload photos, textures, or abstract art. The text renders as a canvas overlay, not a flat paste.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🎨</div>
            <h3>Color Themes</h3>
            <p>Neon green, black, white, and pink presets. Full hex picker for any custom color.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">💾</div>
            <h3>High-Res Export</h3>
            <p>PNG at 1024, 1500, 2048, or 3000 px. No watermark, no compression. Ready for Spotify or print.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Multiple Ratios</h3>
            <p>1:1 for album covers, 4:5 for feed posts, 9:16 for stories, 16:9 for YouTube banners.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">⚡</div>
            <h3>Real-Time Editing</h3>
            <p>Every change renders instantly on the canvas. No loading, no preview delay.</p>
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
        <h2 className="hp-display-heading">How to Use the Brat Album Cover Generator</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Choose Your Canvas</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Select 1:1 square for standard album covers. Use 16:9 for banners or 4:5 for feed-style artwork.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Add Your Album Text</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Type your album title, artist name, or concept text. Short phrases and single words work best for the brat cover maker look.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Upload a Background</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Add a photo or keep a solid color. Both approaches work for the brat album generator style.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Customize Typography</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Adjust font size, weight, letter spacing, and alignment until the composition feels balanced.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">5</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Apply Color Styling</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Pick a brat color preset or enter a custom hex code for text and background.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">6</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Download Cover</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Click Download PNG and pick your resolution. No watermark, no account required, high-quality PNG.</p>
          </div>
        </div>
      </div>

      {/* ── CHARLI XCX STYLE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Create Charli XCX Style Covers</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            The Charli XCX album cover visual language is specific: neon green background, bold minimal typography, high contrast, and almost no decorative elements. This tool recreates that formula with the correct color defaults, font weight, and spacing so you do not need to guess. Set the background to #C1FF00, use dark text, keep the phrase short, and the output matches the brat album art style. The same approach works in black, white, or pink if you want a variation.
          </p>
        </div>
      </div>

      {/* ── HOW DESIGNS WORK ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">How Brat Cover Designs Work</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Brat album cover designs follow a tight set of principles. The layout centers on a single focal point, usually the title, placed in large heavy sans-serif type. Backgrounds are flat color blocks rather than busy images because the color itself carries meaning: neon green signals the core brat identity, black adds drama, white reads as minimal. This approach borrows from Swiss design and modernist poster traditions where hierarchy and contrast matter more than decoration. The brat album cover format works because it treats color as an identity signal and typography as the only visual element that needs to exist.
          </p>
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Related Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This page is built for album cover layouts. For other brat workflows:
          </p>
          <ul className="hp-body-text list-disc space-y-3 mt-4 ml-5">
            <li>
              Use the <Link href="/" className="hp-link">brat generator</Link> for the full editor with all colors and tools.
            </li>
            <li>
              Try the <Link href="/brat-text-generator/" className="hp-link">brat text generator</Link> for quick text-only exports.
            </li>
            <li>
              Use the <Link href="/brat-maker/" className="hp-link">brat maker</Link> for stickers, image layers, and meme layouts.
            </li>
            <li>
              Try the <Link href="/brat-font-generator/" className="hp-link">brat font generator</Link> to study brat typography controls in detail.
            </li>
          </ul>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion
        title="Frequently Asked Questions"
        intro="Common questions about this brat album cover generator."
        items={[
          { question: "Is the brat album cover generator free?", answer: <p>Yes. Unlimited use, no payment, no hidden limits.</p> },
          { question: "Do I need to sign up?", answer: <p>No. The tool works instantly in your browser. No account, no email.</p> },
          { question: "Can I upload my own background image?", answer: <p>Yes. Upload any photo, texture, or artwork and layer brat text on top.</p> },
          { question: "Are downloads watermark-free?", answer: <p>Yes. Every export is clean with no watermark or branding.</p> },
          { question: "Can I use my cover for commercial projects?", answer: <p>Yes. Every image you create is yours to use for any purpose, including commercial releases.</p> },
          { question: "What resolution are exports?", answer: <p>PNG at 1024, 1500, 2048, or 3000 px. No compression loss.</p> },
        ]}
      />
    </main>
  );
}
