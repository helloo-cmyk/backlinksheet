import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import BlogHero from "@/components/BlogHero";
import CodeBlock from "@/components/CodeBlock";
import ColorValueCard from "@/components/ColorValueCard";
import ColorSwatch from "@/components/ColorSwatch";
import HexCopyBox from "@/components/HexCopyBox";

export const metadata = {
  title: {
    absolute: "Brat Color Code — The Official Brat Green Hex Code (#89CC04)",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/blog/brat-color-code/",
  },
  description:
    "Discover the official brat color code (#89CC04). Get the exact hex, RGB, and HSL values for the iconic Charli XCX Brat green used on the 2024 album cover.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the brat color code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The brat color code is #89CC04. This is the official hex value from Charli XCX's Brat album cover, released June 2024. In RGB it is rgb(137, 204, 4) and in HSL it is hsl(80, 96%, 41%).",
      },
    },
    {
      "@type": "Question",
      name: "What is the RGB value of brat green?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The RGB value of brat green is rgb(137, 204, 4). This translates to 137 red, 204 green, and 4 blue. You can enter this directly into any design software that accepts RGB color input.",
      },
    },
    {
      "@type": "Question",
      name: "Is brat green the same as lime green?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brat green (#89CC04) and standard lime green (#32CD32) are both yellow-green shades but they are different colors. Brat green is more saturated and has a stronger yellow component, which gives it that sharp, high-energy look from the album cover.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the brat color code for free in commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Hex color codes are not copyrightable — you are free to use #89CC04 in any personal or commercial project. Only specific artworks and logos are protected by copyright, not color values themselves.",
      },
    },
    {
      "@type": "Question",
      name: "What font does Charli XCX use with the brat green color?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The brat album cover uses Arial in bold weight, set in lowercase with tight letter spacing. The combination of #89CC04 background and bold Arial text is what creates the complete brat visual identity.",
      },
    },
  ],
};

export default function BratColorCodePage() {
  return (
    <main className="hp-root pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogHero 
        category="DESIGN"
        title="Brat Color Code — The Official Brat Green Hex Code (#89CC04)"
        subtitle="The definitive guide to the official Charli XCX Brat green. Get the hex, RGB, HSL, and CMYK values for the 2024 aesthetic."
        readTime="8 MIN READ"
        author="ibratgenerator"
        publishDate="May 05, 2026"
        imageSrc="/blog-images/color-code-hero-v2.png"
        imageAlt="official brat color code #89CC04 visual example"
      />

      {/* ── ARTICLE BODY ── */}
      <article className="px-4 pt-12 max-w-[720px] mx-auto">
        <div className="prose-container">
          
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            The brat color code is #89CC04 — a bold, saturated yellow-green used on Charli XCX's Brat album cover. This specific shade has become a global cultural phenomenon, defining the visual style of an entire generation (read about the full <Link href="/blog/brat-summer-meaning" className="hp-link">brat summer meaning</Link> here). This post contains the exact hex, RGB, and HSL values plus how to use them anywhere.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="hp-display-heading !text-3xl mb-6">What Is the Brat Color Code?</h2>
              <p className="hp-body-text mb-6">
                This is the official #89CC04 green. It is a precise balance of yellow and green that creates the iconic high-energy look of the Brat album artwork.
              </p>
              <div className="space-y-3">
                <ColorValueCard label="Hex" value="#89CC04" />
                <ColorValueCard label="RGB" value="137, 204, 4" />
                <ColorValueCard label="HSL" value="80, 96%, 41%" />
                <ColorValueCard label="CMYK" value="33, 0, 98, 20" />
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-[#89CC04]/20 border-4 border-white">
              <div className="absolute inset-0 bg-[#89CC04]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-black font-bold text-8xl opacity-10 select-none">brat</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-black font-bold text-sm text-center">OFFICIAL BRAT GREEN</p>
              </div>
            </div>
          </div>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            This is the color Charli XCX used on the June 2024 Brat album cover. It became the defining visual of "brat summer" and spread across TikTok, Instagram, and fashion. It is the core of the entire movement.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            To use this exact color right now, open the <Link href="/brat-green-generator/" className="hp-link">brat green generator</Link>. This tool ensures you never have to guess which green is the right one. While some people use fan-created variations like #C1FF00 or #8ACE00, the official color remains the most authentic choice for any serious project.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">What Does Brat Green Look Like?</h2>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Brat green is a saturated yellow-green that sits in a unique spot on the color wheel. It is significantly brighter than a traditional olive but much darker and more grounded than a neon lime. 
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            The color provides exceptionally high contrast against black or white text, making it perfect for typography-heavy designs. It reads as "loud" and intentional, with nothing subtle about its presence in a layout.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            On screen, it appears almost fluorescent, especially on high-quality OLED displays. It is closer to a classic chartreuse than it is to a pure lime green. This specific intensity is why it works so well for the aesthetic.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            This is exactly why the color works for the brat aesthetic — it is impossible to ignore. It demands your attention the moment it appears on your social media feed or on a billboard.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Why Did This Color Get So Popular?</h2>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Charli XCX released Brat on June 7, 2024. The album cover was just the word "brat" in lowercase Arial on this green background. There was no decoration, no photography, and no fancy graphics — just pure color and type.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            That extreme minimalism made the color itself the entire identity. Fans started recreating it immediately, replacing the word "brat" with their own names and phrases. It became a template for self-expression.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            This "raw" and "messy" look was a direct reaction to the overly polished and filtered aesthetic of the 2010s. It felt honest, DIY, and accessible. You didn't need to be a designer to make something that looked cool and trendy.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Within weeks, the format spread across every social platform. By mid-2024, "brat summer" was one of the most searched cultural terms online. The color became a visual shorthand that everyone recognized instantly.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            The trend even reached the highest levels of politics. The Kamala Harris presidential campaign adopted the aesthetic when Charli XCX posted "kamala IS brat." This took the color into mainstream news coverage and cemented its legacy.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            The simplicity of the design meant it could be adapted for anything. From luxury fashion brands to small independent creators, everyone used this green to tap into the cultural zeitgeist of the moment.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Other Brat Colors — The Full Palette</h2>
          <p className="hp-body-text mb-10 text-[17px] sm:text-[18px]">
            While #89CC04 is THE brat color, the complete aesthetic also uses companion colors to create a full design system. Use these hex codes to keep your designs authentic.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <ColorSwatch name="Brat Green" hex="#89CC04" />
            <ColorSwatch name="Brat Pink" hex="#FF90E8" />
            <ColorSwatch name="Brat Black" hex="#0A0A0A" />
            <ColorSwatch name="Brat White" hex="#FFFFFF" />
          </div>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            These four shades work together to create the "raw" look that defined 2024. All four are available as one-click presets in our <Link href="/" className="hp-link">free brat generator</Link>, allowing you to switch between themes instantly.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            The "Brat Pink" is often used for more feminine or "coquette" versions of the trend, while the black and white versions are perfect for those who want a more muted or high-fashion look.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Using the full palette allows for more variety while keeping the core vibe consistent. Whether you are making a poster or a profile picture, these values ensure your project looks authentic to the original vision.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            The goal of this palette is to maintain high contrast. No matter which combination you choose, the text should always be easy to read and stand out clearly against the background.
          </p>
          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">How to Use #89CC04 in Your Projects</h2>
          <HexCopyBox />
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            For developers, here are the three main formats you will need to implement the brat aesthetic in your code. These ensure the color renders correctly across different browsers and devices:
          </p>

          <CodeBlock 
            title="Standard CSS"
            code={`/* Hex */
background-color: #89CC04;

/* RGB */
background-color: rgb(137, 204, 4);

/* HSL */
background-color: hsl(80, 96%, 41%);`}
          />

          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            If you are using Tailwind CSS, you can extend your theme to include the custom green shade for easier use across your components. This is the best way to maintain consistency in your project:
          </p>

          <CodeBlock 
            title="tailwind.config.js"
            code={`module.exports = {
  theme: {
    extend: {
      colors: {
        'brat-green': '#89CC04',
      }
    }
  }
}`}
          />

          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            After updating your config, you can simply use the className="bg-brat-green" in your HTML code. This makes it incredibly easy to apply the color to buttons, cards, or backgrounds.
          </p>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Or skip the manual setup — the <Link href="/brat-album-cover-generator/" className="hp-link">brat album cover generator</Link> uses this exact color by default. It is the easiest way to join the trend without needing any technical skills.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Frequently Asked Questions</h2>
          <FAQAccordion
            title=""
            intro=""
            items={[
              { 
                question: "What is the brat color code?", 
                answer: <p>The brat color code is #89CC04. This is the official hex value from Charli XCX's Brat album cover, released June 2024. In RGB it is rgb(137, 204, 4) and in HSL it is hsl(80, 96%, 41%).</p> 
              },
              { 
                question: "What is the RGB value of brat green?", 
                answer: <p>The RGB value of brat green is rgb(137, 204, 4). This translates to 137 red, 204 green, and 4 blue. You can enter this directly into any design software that accepts RGB color input.</p> 
              },
              {
                question: "Is brat green the same as lime green?",
                answer: <p>Brat green (#89CC04) and standard lime green (#32CD32) are both yellow-green shades but they are different colors. Brat green is more saturated and has a stronger yellow component, which gives it that sharp, high-energy look from the album cover.</p>
              },
              {
                question: "Can I use the brat color code for free in commercial projects?",
                answer: <p>Yes. Hex color codes are not copyrightable — you are free to use #89CC04 in any personal or commercial project. Only specific artworks and logos are protected by copyright, not color values themselves.</p>
              },
              {
                question: "What font does Charli XCX use with the brat green color?",
                answer: <p>The brat album cover uses Arial in bold weight, set in lowercase with tight letter spacing. The combination of #89CC04 background and bold Arial text is what creates the complete brat visual identity.</p>
              }
            ]}
          />

          <p className="hp-body-text mt-16 text-[14px] text-zinc-500 italic">
            Written by the ibratgenerator.com team | Updated: May 2026
          </p>

        </div>
      </article>

    </main>
  );
}
