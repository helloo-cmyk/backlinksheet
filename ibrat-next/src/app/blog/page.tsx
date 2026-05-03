import Link from "next/link";
import Image from "next/image";
import HomeScrollReveal from "@/components/HomeScrollReveal";

export const metadata = {
  title: {
    absolute: "Brat Generator Blog — Trends, Aesthetics & How-Tos",
  },
  description: "Read the latest articles about the Brat aesthetic, Charli XCX trends, and how to create the best brat text memes online.",
  alternates: {
    canonical: "https://ibratgenerator.com/blog/",
  },
};

const BLOG_POSTS = [
  {
    title: "What Is Brat Text? Aesthetic Explained",
    slug: "what-is-brat-text",
    description: "Learn about the iconic Brat text aesthetic, its origins, and why it became a viral sensation. Discover how to create your own bold graphics.",
    category: "AESTHETICS",
    image: "/examples/brat-text-ex-1.png",
    date: "May 01, 2026",
    readTime: "5 MIN READ"
  },
  {
    title: "What Is a Brat Generator? Simple Explanation",
    slug: "what-is-brat-generator",
    description: "A simple explanation of the music-inspired text aesthetic, how the cultural trend started, and how you can create your own bold typographic graphics.",
    category: "CULTURE",
    image: "/examples/brat-maker-ex-4.png",
    date: "May 01, 2026",
    readTime: "4 MIN READ"
  },
  {
    title: "Brat Font Aesthetic Explained",
    slug: "what-is-brat-font",
    description: "Learn about the specific typography, blur effects, and messy aesthetics that make up the iconic Brat album cover font look.",
    category: "TYPOGRAPHY",
    image: "/examples/brat-font-ex-3.png",
    date: "May 01, 2026",
    readTime: "6 MIN READ"
  },
  {
    title: "How to Make Brat Text (Step-by-Step)",
    slug: "how-to-make-brat-text",
    description: "A quick, step-by-step guide on how to generate custom Brat meme text for your social media without needing Photoshop.",
    category: "TUTORIAL",
    image: "/examples/brat-text-ex-1.png",
    date: "May 01, 2026",
    readTime: "4 MIN READ"
  },
  {
    title: "Best Brat Captions for Instagram & TikTok",
    slug: "brat-captions-for-instagram",
    description: "Looking for the perfect words? Here are the best, most unhinged, and aesthetic Brat captions to use for your next post.",
    category: "IDEAS & INSPO",
    image: "/examples/brat-demo-5.png",
    date: "May 02, 2026",
    readTime: "7 MIN READ"
  }
];

export default function BlogIndexPage() {
  return (
    <main className="hp-root pb-24">
      
      {/* ── HERO ── */}
      <section className="hp-hero px-4 pb-0 mb-10">
        <h1 className="hp-hero-heading mt-6 mb-3 mx-auto">Brat Aesthetic Blog</h1>
        <p className="intro-text">
          Explore the culture, design tips, and guides behind the viral Brat aesthetic. Learn how to create perfect memes, find caption inspiration, and understand the typography trend.
        </p>
      </section>

      {/* ── ARTICLES GRID ── */}
      <div className="hp-page-section px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {BLOG_POSTS.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className="group flex flex-col bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] hover:border-[var(--hp-border-dark)] rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white/50"
              >
                {/* Card Image */}
                <div className="w-full aspect-[16/9] relative border-b border-[var(--hp-border)] overflow-hidden bg-[var(--hp-surface)]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1.5 bg-[var(--hp-accent)]/95 backdrop-blur-sm text-black text-[11px] font-extrabold uppercase tracking-widest rounded-md shadow-sm border border-black/5">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-[11px] font-bold text-[var(--hp-ink)] tracking-widest uppercase opacity-60 mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-[22px] sm:text-[24px] font-serif font-medium text-[var(--hp-ink)] leading-[1.25] mb-4 group-hover:text-[var(--hp-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="hp-body-text text-[15px] sm:text-[16px] opacity-80 leading-relaxed mb-8 flex-grow">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center text-[13px] font-bold text-[var(--hp-ink)] tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity mt-auto pt-4 border-t border-[var(--hp-border)]">
                    Read article 
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <HomeScrollReveal />
    </main>
  );
}
