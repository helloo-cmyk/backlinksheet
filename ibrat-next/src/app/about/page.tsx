import Link from "next/link";

export const metadata = {
  title: {
    absolute: "About Us | Ibrat Generator",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/about/",
  },
  description:
    "Learn about the story behind Ibrat Generator, why we built the ultimate Brat-style text maker, and our mission to provide free creative tools for fans and creators.",
};

export default function AboutPage() {
  return (
    <main className="hp-root pb-24">
      {/* ── HEADER ── */}
      <section className="hp-hero px-4 pb-12 border-b border-[var(--hp-border)]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="hp-hero-heading mt-6 mb-4 mx-auto !text-4xl sm:!text-5xl lg:!text-6xl">
            About Ibrat Generator
          </h1>
          <p className="intro-text max-w-2xl mx-auto opacity-80">
            The story behind the web&apos;s favorite Brat-style creative tool.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="px-4 pt-12 max-w-[800px] mx-auto">
        <div className="prose-container">
          <h2 className="hp-display-heading mb-6 !text-3xl">Meet the Creator</h2>
          <p className="hp-body-text mb-6">
            Hi, I&apos;m the founder of <strong>Ibrat Generator</strong>. I&apos;m a web developer and digital designer based in the <strong>United States</strong> with a passion for building focused, high-speed creative tools that solve specific problems for the community.
          </p>
          
          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Why I Built This Tool</h2>
          <p className="hp-body-text mb-6">
            The idea for ibratgenerator.com came during the peak of "Brat Summer." I noticed that while everyone wanted to recreate the iconic Charli XCX album aesthetic, most people were struggling with complex design software like Photoshop or paying for mobile apps just to add some text to a green square.
          </p>
          <p className="hp-body-text mb-6">
            I wanted to build a "one-click" solution—a tool that was entirely free, required no signup, and worked perfectly on a mobile browser. I spent a few weeks perfecting the typography rules, the specific stretched-text look, and the color hex codes to ensure that anyone, regardless of their design skill, could create an authentic Brat visual in seconds.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">What We Do</h2>
          <p className="hp-body-text mb-6">
            Ibrat Generator is a dedicated creative suite for fans, content creators, and social media enthusiasts. We provide:
          </p>
          <ul className="hp-body-text mb-6 list-disc pl-6 space-y-3">
            <li><strong>Brat Text Generator:</strong> The fastest way to turn words into aesthetic images.</li>
            <li><strong>Brat PFP Maker:</strong> Specifically sized 1:1 exports for TikTok and Instagram avatars.</li>
            <li><strong>Brat Maker:</strong> A more advanced tool for layering stickers and custom layouts.</li>
          </ul>
          <p className="hp-body-text mb-12">
            Everything on this site is built to be fast and privacy-friendly. We don&apos;t store your images on our servers, and we don&apos;t hide features behind paywalls. Our mission is to keep creative expression accessible to everyone.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Our Location & Operations</h2>
          <p className="hp-body-text mb-12">
            We are a small, independent team operating out of the <strong>United States</strong>. Building tools for a global audience allows us to stay connected with the latest digital trends while maintaining a lean, user-focused approach to development.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Get In Touch</h2>
          <p className="hp-body-text mb-12">
            I love hearing from users! Whether you have a feature suggestion, found a bug, or just want to show off what you created, feel free to reach out. You can email us directly at <strong>ibratgenerator@gmail.com</strong> or use our{" "}
            <Link href="/contact-us" className="hp-link">
              Contact Page
            </Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
