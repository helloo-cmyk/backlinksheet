import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Contact Us | Ibrat Generator",
  },
  alternates: {
    canonical: "https://ibratgenerator.com/contact/",
  },
  description:
    "We're always happy to hear from you! If you have any questions, concerns, or suggestions regarding IbratGenerator.com, please use the contact details below.",
};

export default function ContactPage() {
  return (
    <main className="hp-root pb-24">
      {/* ── HEADER ── */}
      <section className="hp-hero px-4 pb-12 border-b border-[var(--hp-border)]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="hp-hero-heading mt-6 mb-4 mx-auto !text-4xl sm:!text-5xl lg:!text-6xl">
            Contact Ibrat Generator
          </h1>
          <p className="intro-text max-w-2xl mx-auto opacity-80">
            Have a question, feedback, or a technical issue? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="px-4 pt-12 max-w-[800px] mx-auto">
        <div className="prose-container">
          <p className="hp-body-text mb-6">
            Whether you want to report a bug, suggest a new feature, or simply say hello — you can reach us using the information below. We read every message and do our best to reply within 24-48 hours.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">How to Reach Us</h2>
          <p className="hp-body-text mb-4">
            The best way to get in touch is via email. We prefer direct communication as it allows us to track your requests more efficiently.
          </p>
          
          <div className="bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] rounded-xl p-6 my-8 text-center max-w-sm mx-auto">
            <p className="text-[13px] font-bold tracking-widest uppercase mb-2 opacity-60">Contact Email</p>
            <a href="mailto:ibratgenerator@gmail.com" className="text-[18px] sm:text-[20px] font-semibold text-[var(--hp-primary)] hover:underline">
              ibratgenerator@gmail.com
            </a>
          </div>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Location</h2>
          <p className="hp-body-text mb-12">
            Ibrat Generator is operated and managed from the <strong>United States</strong>. We provide digital tools to a global community of creators and fans.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Feedback and Suggestions</h2>
          <p className="hp-body-text mb-4">
            Your feedback directly influences what we build next. If you have ideas for improving the tool, we want to know.
          </p>
          <ul className="hp-body-text mb-6 list-disc pl-6 space-y-3">
            <li><strong>New features:</strong> suggestions for fonts, export options, or layout tools.</li>
            <li><strong>Bug reports:</strong> reporting technical issues with the canvas or downloads.</li>
            <li><strong>Collaborations:</strong> business inquiries or partnership requests.</li>
          </ul>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">Privacy and Data</h2>
          <p className="hp-body-text mb-12">
            When you contact us, we use your email only to respond to your inquiry. We do not sell your contact details or use them for marketing purposes without your explicit consent. For more details, please read our{" "}
            <Link href="/privacy-policy" className="hp-link">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
