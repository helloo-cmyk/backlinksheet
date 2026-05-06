import Link from "next/link";
import HomeScrollReveal from "@/components/HomeScrollReveal";
import BlogList from "@/components/BlogList";

export const metadata = {
  title: {
    absolute: "Brat Generator Blog — Trends, Aesthetics & How-Tos",
  },
  description: "Read the latest articles about the Brat aesthetic, Charli XCX trends, and how to create the best brat text memes online.",
  alternates: {
    canonical: "https://ibratgenerator.com/blog/",
  },
};

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

      {/* ── ARTICLES GRID & SEARCH ── */}
      <BlogList />

      <HomeScrollReveal />
    </main>
  );
}
