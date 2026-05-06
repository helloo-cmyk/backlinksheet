"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const BLOG_POSTS = [
  {
    title: "What Is a Brat Generator? Simple Explanation",
    slug: "what-is-brat-generator",
    description: "A simple explanation of the music-inspired text aesthetic, how the cultural trend started, and how you can create your own bold graphics.",
    category: "CULTURE",
    image: "/blog-images/generator-hero-v2.png",
    date: "May 01, 2026",
    readTime: "4 MIN READ"
  },
  {
    title: "Brat Summer Meaning — What It Is and Where It Came From",
    slug: "brat-summer-meaning",
    description: "Explore the origins of the viral trend that redefined pop culture. Learn what Charli XCX meant by 'brat' and why the aesthetic is still everywhere.",
    category: "CULTURE",
    image: "/blog-images/meaning-hero.png",
    date: "May 06, 2026",
    readTime: "5 MIN READ"
  },
  {
    title: "Brat Color Code — The Official Brat Green Hex Code (#89CC04)",
    slug: "brat-color-code",
    description: "The definitive guide to the official Charli XCX Brat green. Get the hex, RGB, HSL, and CMYK values for the 2024 aesthetic.",
    category: "DESIGN",
    image: "/blog-images/color-code-hero-v2.png",
    date: "May 05, 2026",
    readTime: "8 MIN READ"
  },
  {
    title: "How to Make a Brat PFP — Profile Picture Guide",
    slug: "how-to-make-brat-pfp",
    description: "Want the perfect brat summer profile picture? Learn how to generate custom neon green icons for Instagram, TikTok, and Twitter.",
    category: "TUTORIAL",
    image: "/blog-images/pfp-hero-v2.png",
    date: "May 04, 2026",
    readTime: "7 MIN READ"
  },
  {
    title: "Brat Aesthetic Guide — What It Is and How to Use It in 2026",
    slug: "brat-aesthetic-guide",
    description: "The ultimate guide to the bold, minimal, and viral visual trend that redefined digital culture. Learn the rules of the aesthetic and how to create your own.",
    category: "AESTHETICS",
    image: "/blog-images/aesthetic-hero-v2.png",
    date: "May 04, 2026",
    readTime: "8 MIN READ"
  },
  {
    title: "Brat Text Generator vs Brat Font Generator — What Is the Difference?",
    slug: "brat-text-vs-font",
    description: "Should you use a text generator or download a font file? Learn the technical differences, benefits, and how to create the perfect Brat aesthetic graphics.",
    category: "GUIDES",
    image: "/blog-images/text-vs-font-hero.png",
    date: "May 03, 2026",
    readTime: "6 MIN READ"
  },
  {
    title: "Best Brat Captions for Instagram & TikTok",
    slug: "brat-captions-for-instagram",
    description: "Looking for the perfect words? Here are the best, most unhinged, and aesthetic Brat captions to use for your next post.",
    category: "IDEAS & INSPO",
    image: "/blog-images/captions-hero.png",
    date: "May 02, 2026",
    readTime: "7 MIN READ"
  },
  {
    title: "How to Make Brat Text (Step-by-Step)",
    slug: "how-to-make-brat-text",
    description: "A quick, step-by-step guide on how to generate custom Brat meme text for your social media without needing Photoshop.",
    category: "TUTORIAL",
    image: "/blog-images/how-to-hero.png",
    date: "May 01, 2026",
    readTime: "4 MIN READ"
  },
  {
    title: "Brat Font Aesthetic Explained",
    slug: "what-is-brat-font",
    description: "Learn about the specific typography, blur effects, and messy aesthetics that make up the iconic Brat album cover font look.",
    category: "TYPOGRAPHY",
    image: "/blog-images/font-hero-v2.png",
    date: "May 01, 2026",
    readTime: "6 MIN READ"
  }
];

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = BLOG_POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="hp-page-section px-4 pt-0">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Search Bar */}
        <div className="mb-10 relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-11 pr-4 py-4 bg-white border border-[var(--hp-border)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--hp-accent)] focus:border-transparent shadow-sm text-[var(--hp-ink)] text-lg placeholder-gray-400 transition-shadow"
            placeholder="Search articles, guides, and trends..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(6); // Reset pagination on new search
            }}
          />
        </div>

        {/* Articles Grid */}
        {displayedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {displayedPosts.map((post) => (
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
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
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
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-[var(--hp-ink)] mb-2">No articles found</h3>
            <p className="text-gray-500">We couldn't find any articles matching "{searchQuery}"</p>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-[var(--hp-accent)] text-black text-[14px] font-extrabold tracking-[0.2em] uppercase rounded-full hover:bg-[#9ae605] transition-all focus:outline-none focus:ring-4 focus:ring-[var(--hp-accent)] focus:ring-opacity-50 shadow-[0_10px_20px_rgba(138,206,0,0.3)] hover:shadow-[0_15px_30px_rgba(138,206,0,0.4)] hover:-translate-y-1 transform duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Load More Articles
                <svg className="ml-3 w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
