import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Privacy Policy | Ibrat Generator",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ibratgenerator.com/privacy-policy/",
  },
  description:
    "Privacy Policy for Ibrat Generator. Learn how we handle your data, use cookies for Google AdSense and Microsoft Clarity, and comply with GDPR and CCPA regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="hp-root pb-24">
      {/* ── HEADER ── */}
      <section className="hp-hero px-4 pb-12 border-b border-[var(--hp-border)]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="hp-hero-heading mt-6 mb-4 mx-auto !text-4xl sm:!text-5xl lg:!text-6xl">
            Privacy Policy
          </h1>
          <p className="inline-block bg-[var(--hp-surface-warm)] border border-[var(--hp-border)] px-4 py-1.5 rounded-md text-[13px] font-bold text-[var(--hp-ink)] uppercase tracking-widest opacity-80 mb-6 drop-shadow-sm">
            Last updated: May 03, 2026
          </p>
          <p className="intro-text max-w-2xl mx-auto opacity-80">
            At IbratGenerator.com, accessible from https://ibratgenerator.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Ibrat Generator and how we use it.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="px-4 pt-12 max-w-[800px] mx-auto">
        <div className="prose-container">
          <h2 className="hp-display-heading mb-6 !text-3xl">1. General Information</h2>
          <p className="hp-body-text mb-12">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>ibratgenerator@gmail.com</strong>. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Ibrat Generator.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">2. Consent</h2>
          <p className="hp-body-text mb-12">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">3. Information We Collect</h2>
          <p className="hp-body-text mb-4">
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p className="hp-body-text mb-12">
            When you use our tool, we do not require any registration or personal login. However, if you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">4. Log Files</h2>
          <p className="hp-body-text mb-12">
            Ibrat Generator follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">5. Google DoubleClick DART Cookie</h2>
          <p className="hp-body-text mb-6">
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. 
          </p>
          <p className="hp-body-text mb-12">
            However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="hp-link">https://policies.google.com/technologies/ads</a>
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">6. Google AdSense & Third-Party Partners</h2>
          <p className="hp-body-text mb-6">
            <strong>This site uses Google AdSense to display advertisements.</strong> Google AdSense uses the DoubleClick DART cookie to serve ads based on your visit to this and other sites. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Ibrat Generator, which are sent directly to users' browser.
          </p>
          <p className="hp-body-text mb-12">
            Third parties, including Google, use cookies to serve ads based on your prior visits to this website. You may consult this list to find the Privacy Policy for each of the advertising partners of Ibrat Generator.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">7. Microsoft Clarity</h2>
          <p className="hp-body-text mb-12">
            <strong>This site uses Microsoft Clarity for heatmaps and session recording.</strong> Clarity may collect mouse movement, clicks, and scroll data to help us understand how users interact with our tools and improve user experience. Microsoft Clarity captures the data about how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services.
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">8. GDPR Data Protection Rights</h2>
          <p className="hp-body-text mb-4">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="hp-body-text mb-12 list-disc pl-6 space-y-3">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization.</li>
          </ul>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">9. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p className="hp-body-text mb-4">Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul className="hp-body-text mb-12 list-disc pl-6 space-y-3">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">10. Data Controller</h2>
          <p className="hp-body-text mb-12">
            For the purpose of the General Data Protection Regulation (GDPR), the data controller is:<br />
            <strong>Ibrat Generator Team</strong><br />
            Location: <strong>United States</strong><br />
            Email: <strong>ibratgenerator@gmail.com</strong>
          </p>

          <h2 className="hp-display-heading mt-16 mb-6 !text-3xl">11. Contact Us</h2>
          <p className="hp-body-text mb-12">
            If you have any questions about this Privacy Policy, please contact us via email at <strong>ibratgenerator@gmail.com</strong> or visit our{" "}
            <Link href="/contact" className="hp-link">
              Contact Page
            </Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
