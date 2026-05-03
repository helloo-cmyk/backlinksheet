import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Terms of Service | Ibrat Generator",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/terms/",
  },
  description:
    "Terms of Service for Ibrat Generator. Read our rules for using the Brat-style text and image generator, including image ownership and usage rights.",
};

export default function TermsPage() {
  return (
    <main className="hp-root pb-24">
      {/* ── HEADER ── */}
      <section className="hp-hero px-4 pb-12 border-b border-[var(--hp-border)]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="hp-hero-heading mt-6 mb-4 mx-auto !text-4xl sm:!text-5xl lg:!text-6xl">
            Terms of Service
          </h1>
          <p className="inline-block bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] px-4 py-1.5 rounded-md text-[13px] font-bold text-[var(--hp-ink)] uppercase tracking-widest opacity-80 mb-6 drop-shadow-sm">
            Effective Date: May 03, 2026
          </p>
          <p className="intro-text max-w-2xl mx-auto opacity-80">
            Please read these Terms of Service carefully before using IbratGenerator.com. By accessing our tool, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="px-4 pt-12 max-w-[800px] mx-auto">
        <div className="prose-container">
          <h2 className="hp-display-heading mb-6 !text-3xl">1. Acceptance of Terms</h2>
          <p className="hp-body-text mb-12">
            By using Ibrat Generator ("the Service"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or tools.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">2. Non-Affiliation Disclaimer</h2>
          <p className="hp-body-text mb-12 text-[var(--hp-primary)] font-bold">
            Ibrat Generator is an independent creative tool. This website and its tools are NOT affiliated with, endorsed by, or associated with Charli XCX, Atlantic Records, or any official "Brat" branding or labels. We are a fan-inspired tool for creative expression.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">3. User Content & Ownership</h2>
          <p className="hp-body-text mb-6">
            <strong>Ownership:</strong> Users retain full ownership of all images and text generated using Ibrat Generator. We do not claim any rights to the content you create.
          </p>
          <p className="hp-body-text mb-12">
            <strong>Usage Rights:</strong> Generated images may be used for both personal and commercial purposes. You are free to use your creations on social media, in projects, or for any other legal purpose.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">4. Prohibited Uses</h2>
          <p className="hp-body-text mb-4">You agree not to use the Service to:</p>
          <ul className="hp-body-text mb-12 list-disc pl-6 space-y-3">
            <li>Generate defamatory, harassing, threatening, or illegal content.</li>
            <li>Create content that promotes hate speech or discrimination.</li>
            <li>Impersonate any person or entity in a malicious manner.</li>
            <li>Attempt to disrupt the Service or its servers.</li>
          </ul>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">5. Disclaimer of Warranties</h2>
          <p className="hp-body-text mb-12">
            The tool is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without any warranties of any kind, whether express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">6. Limitation of Liability</h2>
          <p className="hp-body-text mb-12">
            In no event shall Ibrat Generator be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">7. Changes to Terms</h2>
          <p className="hp-body-text mb-12">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Service after changes are posted constitutes your acceptance of the new terms.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">8. Contact Information</h2>
          <p className="hp-body-text mb-12">
            If you have any questions about these Terms, please contact us at <strong>ibratgenerator@gmail.com</strong> or visit our{" "}
            <Link href="/contact" className="hp-link">
              Contact Page
            </Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
