import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";
import ExampleGallery from "@/components/ExampleGallery";
import HomeScrollReveal from "@/components/HomeScrollReveal";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the brat font download alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no official font file to download for the brat style. This brat font generator recreates the exact look in your browser — correct weight, tight spacing, and the right layout. No installation, no font file hunting required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get the brat font for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use this free brat font generator. Type your text, set your colors, and export a watermark-free PNG at up to 3000px resolution. No signup, no payment, no download needed.",
      },
    },
    {
      "@type": "Question",
      name: "Does this recreate the Charli XCX brat font style?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The generator recreates the bold, minimal typography associated with Charli XCX Brat visuals, including spacing, weight, and alignment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export my typography as PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Export at 1024, 1500, 2048, or 3000 px. No watermark, no compression.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlimited use, no signup, no payment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between brat font and regular Arial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arial is a standard system font with neutral proportions. The brat font style uses heavier weight, tighter letter spacing, and higher contrast layouts. Arial Bold gets close but lacks the deliberate spacing and compositional choices that define brat typography.",
      },
    },
  ],
};

export const metadata = {
  title: {
    absolute: "Brat Font Generator — Free Brat Font Download Alternative [2026]",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/brat-font-generator/",
  },
  description:
    "Free brat font generator — recreate bold Charli XCX brat typography instantly. Adjust spacing, weight & color. No signup, no watermark. Download PNG.",
};

export default function BratFontGeneratorPage() {
  return (
    <div className="hp-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hp-hero">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Font Generator</h1>
        <p className="hp-hero-sub">
          This brat font generator and brat font maker lets you create brat-style typography with full control over spacing, weight, and color. Use the controls on this page to match the look, then export as PNG.
        </p>
      </section>

      {/* ── GENERATOR ── */}
      <div className="hp-gen-section">
        <div className="hp-gen-card">
          <div className="hp-gen-label">
            <span className="hp-gen-dot" />
            Live Generator
          </div>
          <div className="tool-intro-hint">
            Adjust spacing, weight, and color — the brat font style applies automatically as you type.
          </div>
          <div style={{ minHeight: '520px' }}>
            <BratGeneratorLazy />
          </div>
        </div>
      </div>

      <section className="text-center mb-10 -mt-2">
        <div className="hp-body-text mx-auto pb-4">
          Looking for all features? Try the <Link href="/" className="hp-link">free brat generator</Link> to create memes, images, and more in one place.
        </div>
      </section>

      {/* ── INTRO PARAGRAPH ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <div className="max-w-3xl">
          <p className="hp-body-text">
            The brat font is not a single downloadable file. It is a typographic style defined by bold weight, tight spacing, and minimal decoration. People searching for what font is brat or the Charli XCX brat font are looking for this style, not a specific .ttf file. This page explains the details and gives you a tool to generate it directly.
          </p>
        </div>
      </div>

      {/* ── WHAT IS THE BRAT FONT ── */}
      <div className="hp-page-section hp-page-section-bordered" id="overview">
        <div className="max-w-3xl">
          <p className="hp-body-text">
            The brat font style is a typographic approach, not a single downloadable file. For a full breakdown of what defines it, read our <Link href="/blog/what-is-brat-font" className="hp-link">guide to brat typography</Link>. This tool gives you the controls to recreate it directly.
          </p>
        </div>
      </div>

      {/* ── KEY CHARACTERISTICS ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Traits</span>
        <h2 className="hp-display-heading">Key Characteristics of Brat Typography</h2>
        <p className="hp-body-text mt-4">
          The brat font style is defined by six consistent design principles.
        </p>
        <div className="hp-features-grid mt-6">
          <div className="hp-feature-card">
            <div className="hp-feature-icon" style={{fontSize: "1.4rem"}}>🏋️</div>
            <h3>Bold weight</h3>
            <p>Heavy strokes at 700+ weight. The text feels dense and grounded, not thin or decorative. This is what separates brat typography from standard body text.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon" style={{fontSize: "1.4rem"}}>🔤</div>
            <h3>Clean sans-serif forms</h3>
            <p>No serifs, no swashes, no ornamentation. The letterforms follow geometric sans-serif construction with even stroke widths and open counters.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon" style={{fontSize: "1.4rem"}}>📏</div>
            <h3>Tight letter spacing</h3>
            <p>Characters sit close together with deliberate, compact gaps. Tight letter spacing gives the text a solid, connected appearance that reads as a single visual block.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon" style={{fontSize: "1.4rem"}}>🌗</div>
            <h3>High contrast</h3>
            <p>Dark text on bright backgrounds or light text on deep black. The brat typography aesthetic depends on strong separation between foreground and background.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon" style={{fontSize: "1.4rem"}}>✨</div>
            <h3>Minimal ornamentation</h3>
            <p>The text is the design. No gradients, no shadows, no outlines. Just type on a flat color field.</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon" style={{fontSize: "1.4rem"}}>📐</div>
            <h3>Centered or deliberate layouts</h3>
            <p>Text is placed with intention. Centered alignment is most common, but offset compositions work when the asymmetry is clearly purposeful.</p>
          </div>
        </div>
      </div>

      {/* ── WHAT FONT IS USED ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Typeface Details</span>
        <h2 className="hp-display-heading">Why No Font File Matches the Brat Style</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            The Brat album style does not use a single named commercial font. It draws from a lineage of geometric sans-serif typefaces that prioritize clarity, weight, and minimal decoration. Designers and fans often compare it to Helvetica Neue Bold, Avenir Heavy, or Gotham, all of which share clean geometric forms and strong x-heights. The key is not letter-by-letter matching but the overall impression: heavy weight, tight letter spacing, and a sense of confidence rooted in Swiss design typography.
          </p>
          <p className="hp-body-text mt-4">
            When people search for the brat font name or Charli XCX brat font, they are trying to match this visual. No single .ttf or .otf file will get you there on its own because the style also depends on spacing, alignment, and background choices. That is why this brat font generator exists: it handles all of those variables together. You do not need to hunt for brat font Canva presets or search for the exact file. The look is built into the controls.
          </p>
        </div>
      </div>

      {/* ── WHY BETTER THAN DOWNLOADING ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <h2 className="hp-display-heading">Why This Tool Is Better Than Downloading Fonts</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Searching for brat font download or brat font free download usually leads to generic bold sans-serif files that still need manual kerning, background setup, and export configuration. You install a font, open a design app, fight the default spacing, and then realize the result does not match. This tool skips all of that. The brat font generator gives you the correct weight, spacing, and layout defaults in your browser with a direct PNG export. No installation, no design software, no guessing.
          </p>
        </div>
      </div>

      {/* ── TYPOGRAPHY CONTROLS ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Parameters</span>
        <h2 className="hp-display-heading">Typography Controls on This Page</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--hp-border-dark)] hover:shadow-md">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brat-lime)] text-[var(--hp-ink)] text-[1.1rem] font-bold shadow-sm mb-5">Aa</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Font Size &amp; Weight</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Scale from compact captions to large album-style headings.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--hp-border-dark)] hover:shadow-md">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brat-lime)] text-[var(--hp-ink)] text-[1.2rem] font-bold shadow-sm mb-5">⇿</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Letter Spacing &amp; Alignment</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Tighten or open character gaps and set text position.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--hp-border-dark)] hover:shadow-md">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brat-lime)] text-[var(--hp-ink)] text-[1.2rem] font-bold shadow-sm mb-5">↕</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Line Height</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Control vertical density for single-line or multi-line phrases.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--hp-border-dark)] hover:shadow-md">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brat-lime)] text-[var(--hp-ink)] text-xl shadow-sm mb-5">🎨</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Color System</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Full hex picker for text and background beyond neon green.</p>
          </div>
        </div>
      </div>

      {/* ── EXAMPLES ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <span className="hp-eyebrow">Gallery</span>
        <h2 className="hp-display-heading">Brat Font Generator Examples</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Real outputs from this brat font generator. Each shows a different combination of weight, spacing, and color. Type your own phrase above to create similar results.
          </p>
        </div>
        <div className="hp-examples-wrap mt-8">
          <ExampleGallery type="font" />
        </div>
      </div>

      {/* ── RELATED TOOLS ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <h2 className="hp-display-heading">Related Tools</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            This page focuses on typography. For other brat workflows, these tools handle different parts of the process.
          </p>
          <ul className="hp-body-text space-y-3 mt-6 ml-4 list-disc">
            <li>Use the <Link href="/brat-text-generator/" className="hp-link">brat text generator</Link> for quick text-only designs with fast PNG export.</li>
            <li>Try the <Link href="/brat-maker/" className="hp-link">brat maker</Link> to build full images with stickers and image layers.</li>
            <li>Explore the <Link href="/brat-black-generator/" className="hp-link">black brat generator</Link> for high-contrast dark typography.</li>
            <li>Use the <Link href="/" className="hp-link">brat generator</Link> for the complete editor with all tools in one place.</li>
          </ul>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion
        title="Frequently Asked Questions"
        intro="Common questions about the brat font and this generator."
        items={[
          { question: "What is the brat font download alternative?", answer: <p>There is no official font file to download for the brat style. This brat font generator recreates the exact look in your browser — correct weight, tight spacing, and the right layout. No installation, no font file hunting required.</p> },
          { question: "How do I get the brat font for free?", answer: <p>Use this free brat font generator. Type your text, set your colors, and export a watermark-free PNG at up to 3000px resolution. No signup, no payment, no download needed.</p> },
          { question: "Does this recreate the Charli XCX brat font style?", answer: <p>Yes. The generator recreates the bold, minimal typography associated with Charli XCX Brat visuals, including spacing, weight, and alignment.</p> },
          { question: "Can I export my typography as PNG?", answer: <p>Yes. Export at 1024, 1500, 2048, or 3000 px. No watermark, no compression.</p> },
          { question: "Is this tool free?", answer: <p>Yes. Unlimited use, no signup, no payment.</p> },
          { question: "What is the difference between brat font and regular Arial?", answer: <p>Arial is a standard system font with neutral proportions. The brat font style uses heavier weight, tighter letter spacing, and higher contrast layouts. Arial Bold gets close but lacks the deliberate spacing and compositional choices that define brat typography.</p> },
        ]}
      />

      {/* ── LEARN MORE ── */}
      <div className="hp-page-section hp-page-section-bordered">
        <h2 className="hp-display-heading">Learn More About Brat Typography</h2>
        <p className="hp-body-text mt-4">
          For a full breakdown of the brat font style and how it is used, read our{" "}
          <Link href="/blog/what-is-brat-font" className="hp-link">guide to brat typography</Link>.
        </p>
      </div>

      <HomeScrollReveal />
    </div>
  );
}
