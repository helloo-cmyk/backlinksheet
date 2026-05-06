import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import BlogHero from "@/components/BlogHero";
import CaptionGrid from "@/components/CaptionGrid";

export const metadata = {
  title: {
    absolute: "Brat Captions for Instagram (50+ Real Examples You Can Copy)",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/blog/brat-captions-for-instagram/",
  },
  description:
    "Get 50+ brat captions for Instagram you can copy, plus practical tips to write your own short, bold, and natural captions.",
};

export default function BratCaptionsForInstagramPage() {
  return (
    <main className="hp-root pb-24">
      <BlogHero 
        category="IDEAS & INSPO"
        title="Brat Captions for Instagram (50+ Real Examples You Can Copy)"
        subtitle=""
        readTime="5 MIN READ"
        imageSrc="/blog-images/captions-hero.png"
      />

      {/* ── ARTICLE BODY ── */}
      <article className="px-4 pt-12 max-w-[720px] mx-auto">
        <div className="prose-container">
          <p className="hp-body-text mb-12 text-[17px] sm:text-[18px]">
            This guide provides over 50 ready-to-use brat captions for instagram that you can use directly on your next post. Beyond just giving you a brat captions copy paste list, you will also find practical tips for writing your own original phrases. Use these brat caption ideas to quickly find the right words without overthinking your post.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Simple Brat Captions</h2>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Use these short brat captions for mirror pics, outfit dumps, and low-effort story posts.
          </p>
          <CaptionGrid
            captions={[
              "so what", 
              "stay mad", 
              "idc", 
              "not impressed", 
              "cool enough", 
              "say less", 
              "no thanks", 
              "try again", 
              "already bored", 
              "keep watching", 
              "still unbothered", 
              "too real", 
              "next question", 
              "no comment", 
              "move along"
            ]}
          />

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Bold Brat Captions</h2>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            Switch to these brat instagram captions when you want your post to feel confident, blunt, or slightly confrontational.
          </p>
          <CaptionGrid
            captions={[
              "not your type", 
              "you wish", 
              "watch me", 
              "i said no", 
              "deal with it", 
              "not sorry", 
              "stay pressed", 
              "i meant that", 
              "main character", 
              "not for everyone", 
              "know your place", 
              "too busy winning", 
              "out of reach", 
              "you had a chance", 
              "i do me"
            ]}
          />
          <p className="hp-body-text mt-6 mb-12 text-[17px] sm:text-[18px]">
            Do not stack an aggressive brat meme caption on top of an aggressive photo unless that intense tone is intentional.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Soft Brat Captions</h2>
          <p className="hp-body-text mb-6 text-[17px] sm:text-[18px]">
            These brat aesthetic captions keep the minimal style but use a softer tone that works perfectly for minimal feeds.
          </p>
          <CaptionGrid
            captions={[
              "just vibes", 
              "low energy", 
              "nothing serious", 
              "it is what it is", 
              "soft chaos", 
              "quiet today", 
              "slow morning", 
              "no pressure", 
              "doing my best", 
              "half awake", 
              "gentle mood", 
              "taking my time"
            ]}
          />

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">How to Write Your Own Brat Caption</h2>
          <p className="hp-body-text mb-12 text-[17px] sm:text-[18px]">
            To write original brat captions or charli xcx captions, start with your actual reaction to the photo, cut it down to three words max, and drop any unnecessary explaining. Make sure the text is entirely lowercase so it matches the brat summer captions style. For example, instead of writing "I am feeling so exhausted today and just want to sleep," you cut it down to simply "completely exhausted". This method turns long thoughts into sharp brat quote captions, and can even be used to format your favorite brat lyric captions or brat song captions instantly.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Turn Captions Into Visuals</h2>
          <p className="hp-body-text mb-12 text-[17px] sm:text-[18px]">
            Instead of just writing text under a photo, you can type your caption directly into the <Link href="/brat-text-generator" className="hp-link">brat text generator</Link> to create an image. Export it as a PNG and post it as a standalone image or carousel opener. This is the fastest way to get authentic brat text for instagram without manually editing photos. For full meme layouts, you can also use the <Link href="/brat-maker" className="hp-link">brat maker</Link>.
          </p>

          {/* ── FAQ ── */}
          <FAQAccordion
            title="Frequently Asked Questions"
            intro=""
            items={[
              { 
                question: "What makes a good brat caption?", 
                answer: <p>A good caption is short, usually under three words, and sounds like something you would actually say in real life.</p> 
              },
              { 
                question: "Should brat captions be lowercase?", 
                answer: <p>Yes, keeping the text lowercase is a core part of the aesthetic because it feels casual and unfiltered.</p> 
              },
              {
                question: "Can I use these captions for TikTok too?",
                answer: <p>Yes, these short phrases work perfectly as text overlays on TikTok videos or inside the caption box.</p>
              },
              {
                question: "How do I make a brat text visual for my caption?",
                answer: <p>You can use a free brat generator to type your caption, select a background color, and download it as an image instantly.</p>
              }
            ]}
          />
        </div>
      </article>
    </main>
  );
}
