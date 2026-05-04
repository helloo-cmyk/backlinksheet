import Link from "next/link";
import BratGeneratorLazy from "@/components/BratGeneratorLazy";
import FAQAccordion from "@/components/FAQAccordion";
import HomeScrollReveal from "@/components/HomeScrollReveal";
import ExampleGallery from "@/components/ExampleGallery";

export const metadata = {
  title: {
    absolute: "Brat Maker – Create Brat Images & Memes Instantly",
  },
  description: "Try our free brat maker to create brat images and memes instantly. Customize text and colors. No signup required.",
  alternates: {
    canonical: "https://ibratgenerator.com/brat-maker/",
  },
};

export default function BratMakerPage() {
  return (
    <main className="hp-root pb-24">

      {/* ── HERO ── */}
      <section className="hp-hero px-4">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Maker</h1>
        <p className="intro-text">
          The definitive free brat image maker for instantly generating custom graphics and text overlays directly in your browser with no signup required.
        </p>
      </section>

      {/* ── GENERATOR ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-2 mb-16">
        <div style={{ minHeight: '520px', position: 'relative', width: '100%' }}>
          <BratGeneratorLazy
            mode="full"
            defaultTab="style"
            defaultRatio="9:16"
            defaultPlaceholder="caption here"
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

      {/* ── OVERVIEW ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col max-w-[1200px] mx-auto">
          <div>
            <span className="hp-eyebrow">Overview</span>
            <h2 className="hp-display-heading">What is a Brat Meme?</h2>
          </div>
          <div>
            <p className="hp-body-text">
              A brat meme relies on extreme minimalism, pairing bold, slightly stretched lowercase typography against a highly saturated background for immediate visual impact. The format exploded during brat summer but quickly evolved into a permanent fixture of internet culture for reaction images and shitposting. This stripped-down aesthetic works because the strong color contrast and aggressive font styling make any phrase, regardless of context, feel like a statement.
            </p>
          </div>
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
            <li><Link href="/brat-font-generator" className="hp-link">Brat Font Generator</Link>: Ideal for adjusting typography, spacing, and font styling.</li>
          </ul>
        </div>
      </div>

      {/* ── BRAT CREATOR ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">The Ultimate Brat Creator</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Use this brat creator as your central tool for formatting bold text and generating custom visuals in seconds. The built-in brat meme generator handles any phrase length while maintaining the signature stretched typography and layout. Every design exports as a crisp PNG download, giving you images, memes, and profile pictures all in one place.
          </p>
        </div>
      </div>

      {/* ── AUDIENCE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <div className="hp-two-col flex flex-col md:flex-row items-start gap-12 max-w-[1200px] mx-auto">
          <div className="flex-1">
             <span className="hp-eyebrow">Audience</span>
             <h2 className="hp-display-heading">Who the Brat Maker Is For</h2>
          </div>
          <div className="flex-1">
             <p className="hp-body-text mt-4 md:mt-0">
               Meme creators use this tool to quickly mock up reaction images without opening complex editing software. People looking for a fast brat profile picture can generate exactly what they need in seconds. Content creators making social posts rely on a reliable brat meme maker for consistent, highly legible text graphics that grab attention in a feed. Anyone who wants to make a brat graphic fast will find the interface built exactly for their workflow.
             </p>
          </div>
        </div>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Capabilities</span>
        <h2 className="hp-display-heading">Core Features of the Brat Maker</h2>
        
        <div className="hp-features-grid mt-8">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🔤</div>
            <h3>Bold Text on Images</h3>
            <p>Type any phrase and the engine automatically formats it with the correct stretched, bold lowercase styling.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🖼️</div>
            <h3>Brat Image Maker</h3>
            <p>Upload your own background photo and apply the signature text overlay directly on top of it.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">👤</div>
            <h3>Profile Picture Maker</h3>
            <p>Use the built-in brat pfp maker tools to generate graphics perfectly sized and centered for social media avatars.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">😂</div>
            <h3>Brat Meme Creator</h3>
            <p>Assemble complete reaction images using standard layouts or custom positioning.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📐</div>
            <h3>Multiple Ratios</h3>
            <p>Export your design in 16:9, 4:5, 9:16, or 1:1 aspect ratios to fit any platform requirement.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">🎨</div>
            <h3>Custom Themes</h3>
            <p>Move beyond the standard green and input any exact hex color code for your background and text.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">💾</div>
            <h3>High-Quality Export</h3>
            <p>Save your final design as a high-resolution PNG with no watermark and zero compression artifacts.</p>
          </div>

          <div className="hp-feature-card">
            <div className="hp-feature-icon">📱</div>
            <h3>Mobile-Optimized</h3>
            <p>Drag, resize, and edit everything smoothly on your phone with touch-responsive controls.</p>
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Getting started</span>
        <h2 className="hp-display-heading">How to Create Brat Images</h2>
        <div className="hp-steps-grid mt-6">
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">1</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Add Your Text</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Type your phrase into the editor and watch the text automatically scale and style itself in real time.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">2</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Customize the Style</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Adjust the text spacing, blur effects, and swap the background to any custom hex color or uploaded image.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">3</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Images and Layout</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Select your preferred aspect ratio and drag the text block to position it exactly where you want it.</p>
          </div>
          <div className="hp-step-card bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] transition-all duration-200">
            <span className="hp-step-num">4</span>
            <h3 className="text-[14px] sm:text-[15px] font-semibold mb-2">Download Instantly</h3>
            <p className="hp-body-text text-[13px] leading-relaxed opacity-90">Hit the export button to save your file immediately with no signup, no watermark, and no delay.</p>
          </div>
        </div>
      </div>

      <div className="hp-page-section hp-page-section-bordered px-4">
        <h2 className="hp-display-heading">Why This Brat Maker Is Better</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            Most online generators force a watermark onto your image or limit your exports to low-resolution files that look terrible when reposted. Others lock you into a single green background color, completely ignoring the need for custom hex codes or photo uploads. This tool fixes those issues by offering uncompressed PNG exports, full color customization, and an interface that actually works smoothly on mobile devices without glitching.
          </p>
        </div>
      </div>

      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Gallery</span>
        <h2 className="hp-display-heading">Brat Maker Examples</h2>
        <div className="max-w-[1200px] mx-auto">
          <p className="hp-body-text mt-4 max-w-3xl">
            With the brat maker you can create brat-style memes, profile graphics, captions, and aesthetic text posts. Generate bold one-word statements, album-inspired text layouts, sarcastic meme captions, or clean profile pictures: all in the minimal Brat aesthetic.
          </p>
          <div className="hp-examples-wrap mt-8">
            <ExampleGallery type="maker" />
          </div>
        </div>
      </div>

      {/* ── BRAT MEME EXAMPLES ── */}
      <div className="hp-page-section hp-page-section-bordered px-4">
        <span className="hp-eyebrow">Memes</span>
        <h2 className="hp-display-heading">Brat Meme Examples</h2>
        <div className="max-w-3xl">
          <p className="hp-body-text mt-4">
            People use this format to turn completely mundane thoughts into aggressive, highly stylized statements. You&apos;ll see users typing simple one-word complaints, sharing highly specific song lyrics, or generating heavily sarcastic captions for their group chats. A popular brat meme involves taking a screenshot of a text message and recreating it with the bold text and neon background for dramatic effect. The original charli xcx meme spawned countless variations, and this brat aesthetic maker lets you replicate that exact look. Users building a specific brat summer meme or those who just need a fast image text overlay find the brat meme format highly adaptable as a versatile meme maker online.
          </p>
        </div>
      </div>

      <FAQAccordion
        title="Frequently Asked Questions"
        intro=""
        items={[
          { question: "Is the brat maker free?", answer: <p>Yes, the tool is completely free to use with no hidden fees or premium features locked behind a paywall.</p> },
          { question: "Do I need an account?", answer: <p>No, you can generate and download as many images as you want without creating an account or providing an email address.</p> },
          { question: "What file format is exported?", answer: <p>All images are exported as high-resolution PNG files to ensure maximum quality and crisp text.</p> },
          { question: "Can I upload my own photo?", answer: <p>Yes, you can upload any custom image to use as your background instead of a solid color.</p> },
          { question: "Is it mobile-optimized?", answer: <p>The entire interface is built to work reliably on mobile, allowing you to drag, scale, and edit with touch controls.</p> },
          { question: "Can I use my creations commercially?", answer: <p>Yes, you own whatever you create and can use the generated images for commercial projects, social media, or merchandise.</p> },
        ]}
      />

      <HomeScrollReveal />
    </main>
  );
}
