import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import BlogHero from "@/components/BlogHero";

export const metadata = {
  title: {
    absolute: "How to Make Brat Text – Step-by-Step",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/blog/how-to-make-brat-text/",
  },
  description:
    "Learn how to make brat text step-by-step in under 30 seconds. Discover the best way to create brat text online for TikTok, Instagram, and more.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to download anything?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. You can create brat text directly in your web browser without installing any apps or fonts."
      }
    },
    {
      "@type": "Question",
      "name": "Is it free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, generating and downloading the text graphics is completely free."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use brat text on Instagram and TikTok?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The tool allows you to select the correct aspect ratios specifically for Instagram (1:1 or 4:5) and TikTok (9:16)."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process takes seconds. Type your phrase, pick a color, and hit download immediately."
      }
    }
  ]
};

export default function HowToMakeBratTextPage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BlogHero 
        category="TUTORIAL"
        title="How to Make Brat Text – Step-by-Step"
        subtitle=""
        readTime="3 MIN READ"
        imageSrc="/examples/brat-text-ex-1.png"
      />

      {/* ── ARTICLE BODY ── */}
      <article className="px-4 pt-12 max-w-[720px] mx-auto">
        <div className="prose-container">
          <p className="hp-body-text mb-12 text-[17px] sm:text-[18px]">
            Learning how to make brat text is incredibly straightforward when you use the right tools. With a dedicated brat text generator, the entire process takes under 30 seconds from typing your phrase to saving the final image.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">How to Make Brat Text (Step-by-Step)</h2>
          <ul className="hp-body-text mb-12 list-none pl-0 space-y-6 text-[17px] sm:text-[18px]">
            <li>
              <strong>Type your phrase.</strong> Enter your words directly into the <Link href="/brat-text-generator" className="hp-link">brat text generator</Link>. Keep it short — one to three words work best for this layout.
            </li>
            <li>
              <strong>Choose your color theme.</strong> Neon green is the original standard, but black, white, and pink all work flawlessly. The background will automatically apply high contrast to your text.
            </li>
            <li>
              <strong>Click download.</strong> Hit the export button to save your file. The PNG exports instantly with no watermark and no account required.
            </li>
          </ul>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Best Way to Create Brat Text Online</h2>
          <p className="hp-body-text mb-12 text-[17px] sm:text-[18px]">
            If you want to create brat text online, using an automated generator easily beats trying to do it manually in Photoshop or Canva. A specialized tool has the exact letter spacing, custom blur effect, and authentic background colors preset so you cannot mess it up. You can find the best tool for this exact purpose at the /brat-text-generator page.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Tips for Better Brat Text</h2>
          <ul className="hp-body-text mb-12 list-disc pl-6 space-y-3 text-[17px] sm:text-[18px]">
            <li>Keep text lowercase.</li>
            <li>Use 1-3 words maximum.</li>
            <li>Square format (1:1) for Instagram, vertical (9:16) for TikTok.</li>
            <li>Export at 2048px for sharpness.</li>
            <li>Avoid busy backgrounds — solid color works best.</li>
          </ul>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Common Mistakes</h2>
          <ul className="hp-body-text mb-16 list-disc pl-6 space-y-3 text-[17px] sm:text-[18px]">
            <li>Too many words (loses readability).</li>
            <li>Using wrong aspect ratio for the platform.</li>
            <li>Exporting at low resolution.</li>
            <li>Adding too many elements — brat style is about reduction.</li>
          </ul>

          {/* ── FAQ ── */}
          <FAQAccordion
            title="Frequently Asked Questions"
            intro=""
            items={[
              { 
                question: "Do I need to download anything?", 
                answer: <p>No. You can create brat text directly in your web browser without installing any apps or fonts.</p> 
              },
              { 
                question: "Is it free?", 
                answer: <p>Yes, generating and downloading the text graphics is completely free.</p> 
              },
              {
                question: "Can I use brat text on Instagram and TikTok?",
                answer: <p>Yes. The tool allows you to select the correct aspect ratios specifically for Instagram (1:1 or 4:5) and TikTok (9:16).</p>
              },
              {
                question: "How long does it take?",
                answer: <p>The process takes seconds. Type your phrase, pick a color, and hit download immediately.</p>
              }
            ]}
          />
        </div>
      </article>
    </main>
  );
}
