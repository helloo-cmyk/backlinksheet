import Link from "next/link";
import Image from "next/image";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";
import HomeScrollReveal from "@/components/HomeScrollReveal";

const BRAT_TEXT_EXAMPLES = [
  { src: "/examples/brat-text-ex-1.png", phrase: "typography", alt: "brat text generator example — green background with classic lowercase text" },
  { src: "/examples/brat-text-ex-2.png", phrase: "clean text", alt: "brat text generator example — bold typography layout" },
  { src: "/examples/brat-text-ex-3.png", phrase: "bold look", alt: "brat text generator example — minimal brat text style" },
  { src: "/examples/brat-text-ex-4.png", phrase: "pure vibe", alt: "brat text generator example — neon green aesthetic text" },
  { src: "/examples/brat-text-ex-5.png", phrase: "minimalist", alt: "brat text generator example — pink background with black brat text" },
  { src: "/examples/brat-text-ex-6.png", phrase: "no distractions", alt: "brat text generator example — custom color brat text image" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the brat text generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It's 100% free to use. There are no subscriptions or hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit to how much text I can add?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can type as much as you like, though shorter phrases and single words tend to look best in this bold aesthetic.",
      },
    },
    {
      "@type": "Question",
      name: "Does it add a watermark to the text image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All exports are completely clean and watermark-free.",
      },
    },
    {
      "@type": "Question",
      name: "What font does the tool use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It uses a condensed, stretched sans-serif font styled to match the Charli XCX brat album typography — bold, lowercase, and tightly kerned.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated text commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The images you create are yours to use for commercial projects, merchandise, or any other purpose.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work on mobile devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It runs fully in your mobile browser with touch support. Works on iPhone, Android, and tablets — no app required. Open the page and start typing.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make a brat text generator transparent background image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool exports brat text generator PNG files with your chosen background color. For a transparent background, set it to match your target surface, then remove it with any PNG editor after downloading.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Make Brat Text — Step by Step",
  step: [
    {
      "@type": "HowToStep",
      name: "Type your message",
      text: "Enter your text into the generator above. The tool automatically applies the signature brat styling."
    },
    {
      "@type": "HowToStep",
      name: "Adjust typography",
      text: "Use the sliders to tweak font size and spacing until the text sits perfectly on the canvas."
    },
    {
      "@type": "HowToStep",
      name: "Set the colors",
      text: "Keep the default neon green or select custom background and text colors."
    },
    {
      "@type": "HowToStep",
      name: "Download Your Brat Text as PNG",
      text: "Click Download PNG, select your preferred resolution, and save the image straight to your device."
    }
  ]
};

export const metadata = {
  title: {
    absolute: "Brat Text Generator — Free Brat Text Maker & Image Creator [2026]",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-text-generator/",
  },
  description:
    "Free brat text generator inspired by Charli XCX. Type any phrase, customize colors, and download a clean watermark-free PNG. Works on mobile. No signup.",
};

export default function BratTextGeneratorPage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Text Generator</h1>
        <p className="intro-text">
          Instantly create brat-style text images with this free brat text generator online. Type any word or phrase, customize your font settings and colors, and download a high-res PNG. No signup. No watermark. Perfect for recreating the iconic Charli XCX brat aesthetic.
        </p>
      </section>

      {/* ── GENERATOR ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="text-only"
            defaultTab="text"
            defaultRatio="1:1"
            defaultPlaceholder="type your text"
            hideSelfieMode={true}
            hidePresets={false}
          />
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">About</span>
        <h2 className="hp-display-heading">What Is the Brat Text Generator?</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This specialized tool recreates the Charli XCX text generator aesthetic — bold, stretched lowercase type against highly saturated solid color backgrounds.
          </p>
          <p className="hp-body-text mt-4">
            It’s perfect for crafting quick text posts, custom stickers, or reaction memes directly in your browser. Use it as a brat words generator — type a single word or full phrase, no account needed.
          </p>
          <p className="hp-body-text mt-4">
            Want more advanced controls? Check out the full <Link href="/" className="hp-link">brat generator</Link> on our homepage.
          </p>
        </div>
      </div>

      {/* ── CAPABILITIES SECTION ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Brat Text Generator Features</h2>
        <div className="max-w-3xl">
          <div className="space-y-4 mt-6">
            <p className="hp-body-text">
              <strong>Live typing preview:</strong> Watch your text render in the brat style as you type. Real-time updates with zero lag.
            </p>
            <p className="hp-body-text">
              <strong>Typography &amp; Spacing Control:</strong> Fine-tune your typography. Adjust font size, letter spacing, line height, and text alignment for the perfect look.
            </p>
            <p className="hp-body-text">
              <strong>Custom color palettes:</strong> Create brat custom text in any color — neon green, pink, black, or any hex code you want.
            </p>
            <p className="hp-body-text">
              <strong>Aspect Ratio Presets:</strong> Export in square, portrait, or landscape formats tailored for different social platforms.
            </p>
            <p className="hp-body-text">
              <strong>Works on any device:</strong> Type and create from your iPhone, Android, or desktop seamlessly.
            </p>
            <p className="hp-body-text">
              <strong>High-res downloads:</strong> Get crisp, clean PNG files up to 3000 px wide without any watermarks or compression.
            </p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Getting started</span>
        <h2 className="hp-display-heading">How to Make Brat Text — Step by Step</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card">
            <span className="hp-step-num">1</span>
            <h3>Type your message</h3>
            <p>Enter your text into the generator above. The tool automatically applies the signature brat styling.</p>
          </div>
          <div className="hp-step-card">
            <span className="hp-step-num">2</span>
            <h3>Adjust typography</h3>
            <p>Use the sliders to tweak font size and spacing until the text sits perfectly on the canvas.</p>
          </div>
          <div className="hp-step-card">
            <span className="hp-step-num">3</span>
            <h3>Set the colors</h3>
            <p>Keep the default neon green or select custom background and text colors.</p>
          </div>
          <div className="hp-step-card">
            <span className="hp-step-num">4</span>
            <h3>Download Your Brat Text as PNG</h3>
            <p>Click Download PNG, select your preferred resolution, and save the image straight to your device.</p>
          </div>
        </div>
      </div>

      {/* ── USE CASES SECTION ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Use cases</span>
        <h2 className="hp-display-heading">Who Uses This Brat Text Maker?</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            <strong>Social media graphics.</strong> Quickly generate text-based posts for Instagram, X, or TikTok using a highly recognizable and trendy aesthetic.
          </p>
          <p className="hp-body-text mt-4">
            <strong>Digital stickers.</strong> Create bold text overlays that you can use in group chats, Discord servers, or video edits.
          </p>
          <p className="hp-body-text mt-4">
            <strong>Custom merch designs.</strong> The high-resolution PNG export makes it easy to print your favorite brat text phrases on shirts, mugs, or posters.
          </p>
          <p className="hp-body-text mt-4">
            <strong>Reaction content and captions.</strong> Create brat text memes for Discord and group chats, or use it as a brat caption generator for Instagram and X posts. Bold, minimal, impossible to ignore.
          </p>
          <p className="hp-body-text mt-4">
            <strong>Designers and editors.</strong> Create brat text edits for mood boards, client mockups, or social campaigns. Export at 3000 px for print-ready quality.
          </p>
        </div>
      </div>

      {/* ── COMPARISON SECTION ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Comparison</span>
        <h2 className="hp-display-heading">Why Use This Brat Text Maker Instead of Canva?</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            While standard design apps require you to set up a canvas, find the right font, and align everything manually, this brat text creator automatically formats your brat style text — no manual setup required.
          </p>
          <p className="hp-body-text mt-4">
            You only need to type. The tool automatically formats your brat generator text to match the iconic stretched, lowercase style. It's the fastest way to turn text into an aesthetic image.
          </p>
          <p className="hp-body-text mt-4">
            If you want to dive deeper into font families or add layers, you can explore the <Link href="/brat-font-generator/" className="hp-link">brat font generator</Link> or the <Link href="/brat-maker/" className="hp-link">brat maker</Link>.
          </p>
        </div>
      </div>

      {/* ── MORE TOOLS SECTION ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">More tools</span>
        <h2 className="hp-display-heading">Explore All Brat Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Each tool targets a specific workflow. Pick the one that fits what you need.
          </p>
          <ul className="hp-body-text space-y-3 mt-6 ml-4 list-disc">
            <li><Link href="/" className="hp-link">Brat Generator</Link></li>
          </ul>
        </div>
      </div>

      {/* ── VARIANTS SECTION ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Variants</span>
        <h2 className="hp-display-heading">Color Styles (Green, Pink, Black &amp; More)</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4 mb-6">
            Switch between signature brat palettes for posts, profiles, or campaigns.
          </p>
          <div className="space-y-4">
            <p className="hp-body-text">
              <strong><Link href="/brat-green-generator/" className="hp-link">Green Brat Tool</Link>:</strong> Classic neon green from brat summer.
            </p>
            <p className="hp-body-text">
              <strong><Link href="/brat-generator-pink/" className="hp-link">Pink Brat Creator</Link>:</strong> Softer, warmer brat aesthetic tone.
            </p>
            <p className="hp-body-text">
              <strong><Link href="/brat-black-generator/" className="hp-link">Black Generator Tool</Link>:</strong> High contrast dark style.
            </p>
            <p className="hp-body-text">
              <strong><Link href="/brat-generator-white/" className="hp-link">White Brat Look</Link>:</strong> Clean minimalist approach.
            </p>
          </div>
        </div>
      </div>

      {/* ── IMAGE EXAMPLES GALLERY ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Gallery</span>
        <h2 className="hp-display-heading">Text Image Examples</h2>
        <div className="max-w-[1200px] mx-auto">
          <p className="hp-body-text mt-4 mb-8 max-w-3xl">
            See how others are styling their words. Use these text layouts as inspiration for your next post.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {BRAT_TEXT_EXAMPLES.map(({ src, phrase, alt }) => (
              <div key={phrase} className="rounded-xl overflow-hidden bg-[var(--hp-surface)] shadow-sm border border-[var(--hp-border)]">
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full h-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <FAQAccordion
        title="Frequently Asked Questions"
        intro="Quick answers about this text tool."
        items={[
          { question: "Is the brat text generator free?", answer: <p>Yes. It's 100% free to use. There are no subscriptions or hidden fees.</p> },
          { question: "Is there a limit to how much text I can add?", answer: <p>You can type as much as you like, though shorter phrases and single words tend to look best in this bold aesthetic.</p> },
          { question: "Does it add a watermark to the text image?", answer: <p>No. All exports are completely clean and watermark-free.</p> },
          { question: "What font does the tool use?", answer: <p>It uses a condensed, stretched sans-serif font styled to match the Charli XCX brat album typography — bold, lowercase, and tightly kerned.</p> },
          { question: "Can I use the generated text commercially?", answer: <p>Yes. The images you create are yours to use for commercial projects, merchandise, or any other purpose.</p> },
          { question: "Does it work on mobile devices?", answer: <p>Yes. It runs fully in your mobile browser with touch support. Works on iPhone, Android, and tablets — no app required. Open the page and start typing.</p> },
          { question: "Can I make a brat text generator transparent background image?", answer: <p>The tool exports brat text generator PNG files with your chosen background color. For a transparent background, set it to match your target surface, then remove it with any PNG editor after downloading.</p> },
        ]}
      />

      <HomeScrollReveal />
    </main>
  );
}
