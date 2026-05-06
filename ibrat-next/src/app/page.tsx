import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import ExampleGallery from "@/components/ExampleGallery";
import FAQAccordion from "@/components/FAQAccordion";
import HomeScrollReveal from "@/components/HomeScrollReveal";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this brat generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This free brat generator has no limits, no hidden fees, and no signup. Create and download as many images as you want at up to 3000 px.",
      },
    },
    {
      "@type": "Question",
      name: "Does it add a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every PNG you export is completely clean. No watermark, no branding, no fine print.",
      },
    },
    {
      "@type": "Question",
      name: "What file format does it export?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG. You pick the resolution (1024, 1500, 2048, or 3000 px). No compression, no quality loss.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The editor runs in your mobile browser with full touch support. Works on iPhone, Android, iPad, and tablets.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use it as a profile picture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Set the aspect ratio to 1:1, type your text, pick a color, and download. Works as a pfp on TikTok, Instagram, Discord, X, and WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the images commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every image you create belongs to you. Use it for merch, social media, videos, print, or any commercial project.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Brat Generator — Step by Step",
  step: [
    { "@type": "HowToStep", name: "Type your text", text: "Open the tool and type any word or phrase. The canvas updates live as you type." },
    { "@type": "HowToStep", name: "Pick your colors", text: "Use the hex color pickers to set your background and text color. Try the classic brat green or go custom." },
    { "@type": "HowToStep", name: "Adjust the layout", text: "Change the font size, letter spacing, and aspect ratio. Add stickers or emojis if you want." },
    { "@type": "HowToStep", name: "Download your image", text: "Tap Download PNG and choose your resolution. The file saves instantly — no signup, no watermark." },
  ],
};



export const metadata = {
  title: {
    absolute: "Brat Generator — Free Brat Image & Text Maker [2026]"
  },
  description:
    "Recreate the Charli XCX album aesthetic with this free brat generator. Design custom text images and pfps for TikTok. Download your clean PNG.",
  alternates: {
    canonical: "https://ibratgenerator.com/",
  },
};

export default function Home() {
  return (
    <div className="hp-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />


      {/* ── HERO ── */}
      <section className="hp-hero">
        <h1 className="hp-hero-heading">Brat Generator</h1>
        <p className="hp-hero-sub">
          Create brat-style images, memes, and profile pictures with this free brat image generator online. Type your text, pick colors, add stickers, and download a high-res PNG. No signup. No watermark. Inspired by the Charli XCX brat aesthetic.
        </p>
      </section>

      {/* ── GENERATOR ── */}
      <div id="generator" className="hp-gen-section">
        <div className="hp-gen-card">
          <div className="hp-gen-label">
            <span className="hp-gen-dot" />
            Live Generator
          </div>
          <div style={{ minHeight: '520px' }}>
            <BratGeneratorLazy
              mode="full"
              defaultTab="text"
              defaultRatio="1:1"
              defaultPlaceholder="brat"
              hideSelfieMode={false}
              hidePresets={false}
              showRandomButton={false}
            />
          </div>
        </div>
      </div>

      {/* ── WHAT IS THE BRAT TREND ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <div className="hp-two-col">
          <div>
            <span className="hp-eyebrow">Trends</span>
            <h2 className="hp-display-heading">What Is the Brat Trend?</h2>
          </div>
          <div>
            <p className="hp-body-text">
              A brat image generator turns any word or phrase into bold, minimal text on a solid-color background. The style comes from{" "}
              <a href="https://en.wikipedia.org/wiki/Brat_(album)" target="_blank" rel="nofollow noopener" className="hp-link">Charli XCX&apos;s brat album</a>
              {" "}— stretched lowercase type, saturated neon colors, and zero clutter.
            </p>
            <p className="hp-body-text mt-4">
              People use it to make memes, profile pictures, stickers, and social posts. Curious about the deeper cultural impact? Read our full guide on the <Link href="/blog/brat-summer-meaning" className="hp-link">brat summer meaning</Link>. It runs entirely in your browser with no app to install.
            </p>
            <p className="hp-body-text mt-4">
              To learn more about the culture and rules behind this viral look, read our complete <Link href="/blog/brat-aesthetic-guide/" className="hp-link">brat aesthetic guide</Link>.
            </p>
            <p className="hp-body-text mt-4">
              For sticker and layered image edits, try the{" "}
              <Link href="/brat-maker/" className="hp-link">brat maker</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHAT FONT IS THE BRAT ALBUM ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <div className="hp-two-col">
          <div>
            <span className="hp-eyebrow">Typography</span>
            <h2 className="hp-display-heading">What Font Is the Brat Album?</h2>
          </div>
          <div>
            <p className="hp-body-text">
              The brat album cover uses a bold, lowercase sans-serif font. While there is no official downloadable file, it is typically recreated using Arial Bold or Helvetica Neue Bold with extremely tight letter spacing.
            </p>
            <p className="hp-body-text mt-4">
              For the full color palette with hex codes, see our <Link href="/blog/brat-color-code/" className="hp-link">brat color code guide →</Link>
            </p>
            <p className="hp-body-text mt-4">
              To study the typography rules in detail, check out the <Link href="/blog/what-is-brat-font/" className="hp-link">brat font guide</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Brat Image Generator Features</h2>
        <div className="hp-features-grid">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">⚡</div>
            <h3>Live preview</h3>
            <p>Every keystroke updates the canvas instantly. No lag, no refresh button.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🎨</div>
            <h3>Full color control</h3>
            <p>Pick any hex color for text and background. Go classic neon green or make it your own.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Aspect ratio presets</h3>
            <p>1:1 for pfps, 4:5 for Instagram, 9:16 for stories, 16:9 for banners.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">😎</div>
            <h3>Stickers and emojis</h3>
            <p>Drop emojis onto the canvas. Drag, resize, and rotate them freely.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Typography controls</h3>
            <p>Adjust font size, weight, letter spacing, and text alignment.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">📱</div>
            <h3>Works on mobile</h3>
            <p>Full touch support on iPhone, Android, and tablets. No app needed.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔓</div>
            <h3>No signup required</h3>
            <p>Open the page and start creating. No email, no password, no paywall.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">💾</div>
            <h3>High-res PNG export</h3>
            <p>Download up to 3000 px. No watermark, no compression.</p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Getting started</span>
        <h2 className="hp-display-heading">How to Use the Brat Creator — Step by Step</h2>
        <div className="hp-steps-grid">
          <div className="hp-step-card">
            <span className="hp-step-num">1</span>
            <h3>Type your text</h3>
            <p>Open the tool above and type any word or phrase. The canvas renders it live in the brat style.</p>
          </div>
          <div className="hp-step-card">
            <span className="hp-step-num">2</span>
            <h3>Pick your colors</h3>
            <p>Use the color pickers to set your background and text. Try neon green for the classic look, or enter any hex code.</p>
          </div>
          <div className="hp-step-card">
            <span className="hp-step-num">3</span>
            <h3>Adjust the layout</h3>
            <p>Change font size, letter spacing, and aspect ratio. Drop stickers or emojis if you want extra detail.</p>
          </div>
          <div className="hp-step-card">
            <span className="hp-step-num">4</span>
            <h3>Download your image</h3>
            <p>Tap Download PNG and pick a resolution. The file saves to your device instantly — no account needed.</p>
          </div>
        </div>
        <p className="hp-body-text mt-8 max-w-3xl">
          Use it as a brat word generator — type any single word and download in seconds. The{" "}
          <Link href="/brat-name-generator/" className="hp-link">brat name generator</Link> lets you add names directly onto custom backgrounds.
        </p>
      </div>

      {/* ── WHO IS THIS FOR ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Use cases</span>
        <h2 className="hp-display-heading">Who Is This For?</h2>
        <div className="hp-two-col">
          <div>
            <p className="hp-body-text">
              <strong>Social media users.</strong> Make brat-style profile pictures, story covers, and posts for TikTok, Instagram, X, and Discord. This brat pfp maker gives you a 1:1 export sized perfectly for avatars.
            </p>
            <p className="hp-body-text mt-4">
              <strong>Meme creators.</strong> Turn any phrase into a bold brat photo with one click. The brat simulator feel — type, see it, save it — makes reaction images fast.
            </p>
            <p className="hp-body-text mt-4">
              <strong>Charli XCX fans.</strong> Recreate the album cover look or remix it with your own words. Share your brat generator sticker edits on group chats and WhatsApp.
            </p>
          </div>
          <div>
            <p className="hp-body-text">
              <strong>Content creators.</strong> Use it as a brat photo maker — build thumbnails, overlays, and text graphics for YouTube, Reels, and TikTok without opening heavyweight design software.
            </p>
            <p className="hp-body-text mt-4">
              <strong>Designers and marketers.</strong> Quickly mock up brat-inspired visuals for campaigns, merch ideas, or client pitches. Export brat generator png files at print-ready resolution. Use the{" "}
              <Link href="/brat-album-cover-generator/" className="hp-link">brat album cover generator</Link> for full album art layouts.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHY USE INSTEAD OF CANVA ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Comparison</span>
        <h2 className="hp-display-heading">Why Use a Brat Creator Instead of Canva or Photoshop?</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text">
            Canva and Photoshop are general-purpose tools. You open a blank canvas, search for fonts, resize layers, and scroll through menus before you get one output. That makes sense for a brand deck. It does not make sense for a brat meme.
          </p>
          <p className="hp-body-text mt-4">
            This brat creator does one thing well. Type text, pick a color, download. Every control on the page exists for brat-style design. Nothing else gets in the way. Adding brat-style text on photo takes seconds here — no workflow, no extra tools.
          </p>
          <p className="hp-body-text mt-4">
            No subscription. No project files. No 14-day trial. Open the page, make your image, and move on. For dedicated typography work, the{" "}
            <Link href="/brat-font-generator/" className="hp-link">brat font generator</Link> gives you deeper font controls.
          </p>
        </div>
      </div>

      {/* ── MORE TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">More tools</span>
        <h2 className="hp-display-heading">Explore All Brat Tools</h2>
        <p className="hp-body-text">
          Each tool targets a specific workflow. Pick the one that fits what you need.
        </p>
        <div className="hp-tools-grid">
          <Link href="/brat-text-generator/" className="hp-tool-link">
            Brat Text Generator <span className="hp-tool-arrow">→</span>
          </Link>

          <Link href="/brat-name-generator/" className="hp-tool-link">
            Brat Name Generator <span className="hp-tool-arrow">→</span>
          </Link>
          <Link href="/brat-album-cover-generator/" className="hp-tool-link">
            Brat Album Cover Generator <span className="hp-tool-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* ── COLOR STYLES ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Variants</span>
        <h2 className="hp-display-heading">Color Styles (Green, Pink, Black & More)</h2>
        <p className="hp-body-text">
          Switch between signature brat palettes for posts, profiles, or campaigns.
        </p>
        <div className="hp-colors-grid">
          <Link href="/brat-green-generator/" className="hp-color-card">
            <div className="hp-color-swatch" style={{ background: "#CCFF00" }}>
              <span style={{ color: "rgba(0,0,0,0.45)" }}>brat</span>
            </div>
            <div className="hp-color-label">
              <h3>Green Brat Tool</h3>
              <p>Classic neon green from brat summer.</p>
            </div>
          </Link>
          <Link href="/brat-generator-pink/" className="hp-color-card">
            <div className="hp-color-swatch" style={{ background: "#ff69b4" }}>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>brat</span>
            </div>
            <div className="hp-color-label">
              <h3>Pink Brat Creator</h3>
              <p>Softer, warmer brat aesthetic tone.</p>
            </div>
          </Link>
          <Link href="/brat-black-generator/" className="hp-color-card">
            <div className="hp-color-swatch" style={{ background: "#111111" }}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>brat</span>
            </div>
            <div className="hp-color-label">
              <h3>Black Generator Tool</h3>
              <p>High contrast dark style.</p>
            </div>
          </Link>
          <Link href="/brat-generator-white/" className="hp-color-card">
            <div className="hp-color-swatch" style={{ background: "#ffffff", borderBottom: "1px solid #e2e2da" }}>
              <span style={{ color: "rgba(0,0,0,0.45)" }}>brat</span>
            </div>
            <div className="hp-color-label">
              <h3>White Brat Look</h3>
              <p>Clean minimalist approach.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ── EXAMPLES ── */}
      <div className="hp-page-section hp-page-section-bordered" id="examples">
        <span className="hp-eyebrow">Gallery</span>
        <h2 className="hp-display-heading">Real Examples From This Tool</h2>
        <p className="hp-body-text">
          Browse real outputs for layout, text, and color ideas. Use these as inspiration before exporting your own design.
        </p>
        <div className="hp-examples-wrap">
          <ExampleGallery />
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="hp-faq-wrap">
        <FAQAccordion
          title="Frequently Asked Questions"
          intro="Quick answers about this tool."
          items={[
            {
              question: "Is this brat generator free?",
              answer: (
                <p>
                  Yes. This free brat generator has no limits, no hidden fees, and no signup. Create and download as many images as you want at up to 3000 px resolution.
                </p>
              ),
            },
            {
              question: "Does it add a watermark?",
              answer: (
                <p>
                  No. Every PNG you export is completely clean. No watermark, no branding, no fine print.
                </p>
              ),
            },
            {
              question: "What file format does it export?",
              answer: (
                <p>
                  PNG. You pick the resolution — 1024, 1500, 2048, or 3000 px. No compression, no quality loss.
                </p>
              ),
            },
            {
              question: "Does it work on mobile?",
              answer: (
                <p>
                  Yes. The editor runs in your mobile browser with full touch support. Works on iPhone, Android, iPad, and tablets. No app install needed.
                </p>
              ),
            },
            {
              question: "Can I use it as a profile picture (pfp)?",
              answer: (
                <p>
                  Yes. Set the aspect ratio to 1:1, type your text, choose a color, and download. This brat generator online works as a pfp maker for TikTok, Instagram, Discord, X, and WhatsApp.
                </p>
              ),
            },
            {
              question: "Can I use the images commercially?",
              answer: (
                <p>
                  Yes. Every image you create belongs to you. Use it for merch, social media, videos, print, or any commercial project. No attribution required.
                </p>
              ),
            },
          ]}
        />
      </div>

      {/* Scroll reveal script */}
      <HomeScrollReveal />
    </div>
  );
}
