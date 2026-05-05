import Link from "next/link";
import Image from "next/image";

const toolLinks = [
  { href: "/brat-maker/", label: "brat maker" },
  { href: "/brat-text-generator/", label: "brat text generator" },
  { href: "/brat-name-generator", label: "Brat Name Generator" },
  { href: "/brat-font-generator/", label: "Brat Font Generator" },

  { href: "/brat-album-cover-generator/", label: "Brat Album Cover Generator" },
  { href: "/brat-green-generator/", label: "Brat Green Generator" },
];

const styleLinks = [
  { href: "/brat-generator-pink/", label: "Pink Brat Generator" },
];

const supportLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-soft bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Ibrat Generator logo" width={32} height={32} style={{ height: "32px", width: "auto" }} />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/70">
              Create brat-style text, images, and profile pictures for free. No signup required.
            </p>
            <div className="mt-6">
              <a href="https://startupfa.me/s/ibrat?utm_source=ibratgenerator.com" target="_blank" rel="noopener noreferrer">
                <img src="https://startupfa.me/badges/featured-badge-small.webp" alt="Brat Generator - Featured on Startup Fame" width="224" height="36" className="opacity-80 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Tools column */}
          <div>
            <h3 className="!text-xs !font-semibold uppercase tracking-[0.12em] text-foreground/65">Tools</h3>
            <ul className="mt-3 space-y-2.5">
              {toolLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-foreground/72 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-2 decoration-[#CCFF00]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Styles column */}
          <div>
            <h3 className="!text-xs !font-semibold uppercase tracking-[0.12em] text-foreground/65">Styles</h3>
            <ul className="mt-3 space-y-2.5">
              {styleLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-foreground/72 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-2 decoration-[#CCFF00]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal column */}
          <div>
            <h3 className="!text-xs !font-semibold uppercase tracking-[0.12em] text-foreground/65">Support & Legal</h3>
            <ul className="mt-3 space-y-2.5">
              {supportLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-foreground/72 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-2 decoration-[#CCFF00]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-center border-t border-border-soft pt-6 sm:flex-row">
          <p className="text-xs text-foreground/65 sm:text-sm text-center">
            © {currentYear} Ibrat Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
