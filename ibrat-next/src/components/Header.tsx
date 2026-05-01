"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/brat-maker/", label: "Brat Maker" },
  { href: "/brat-text-generator/", label: "Brat Text Generator" },
  { href: "/brat-font-generator/", label: "Brat Font Generator" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const normalizePath = (path: string) =>
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#ffffff", borderBottom: "1px solid #E8E6E0" }}
    >
      <div className="mx-auto flex max-w-6xl justify-between items-center px-4 sm:px-6 py-4 sm:py-5">
        <Link href="/" className="flex items-center flex-shrink-0 gap-2" style={{ textDecoration: "none" }}>
          <Image src="/logo.png" alt="Ibrat Generator — Free Brat Generator" width={40} height={40} priority style={{ height: "40px", width: "auto" }} />
        </Link>

        {/* Desktop nav: inline on md and above */}
        <nav className="hidden md:flex items-center" aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8 sm:gap-y-4">
            {navLinks.map(({ href, label }) => {
              const isActive = normalizePath(pathname) === normalizePath(href);
              return (
                <li key={href} style={{ listStyle: "none" }}>
                  <Link
                    href={href}
                    style={{
                      display: "flex",
                      minHeight: "44px",
                      alignItems: "center",
                      padding: "12px 0",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#1a1a1a" : "#3d3d3a",
                      borderBottom: isActive ? "2px solid #CCFF00" : "2px solid transparent",
                      transition: "all 0.15s",
                      textDecoration: "none"
                    }}
                    className="hover:opacity-70"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-foreground hover:opacity-70 transition-opacity"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
          isMenuOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
        style={{ borderTop: isMenuOpen ? "1px solid rgba(0,0,0,0.06)" : "none" }}
      >
        <ul className="flex flex-col px-4 sm:px-6 pb-4 pt-2 gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = normalizePath(pathname) === normalizePath(href);
            return (
              <li key={href} style={{ listStyle: "none" }}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "16px 0",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#1a1a1a" : "#3d3d3a",
                    borderBottom: isActive ? "2px solid #CCFF00" : "2px solid transparent",
                    transition: "all 0.15s",
                    textDecoration: "none"
                  }}
                  className="hover:opacity-70"
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
