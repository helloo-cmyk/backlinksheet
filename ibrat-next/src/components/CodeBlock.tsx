"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighting for CSS/JS
  const highlightCode = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Comments
      if (line.trim().startsWith("/*") || line.trim().startsWith("//")) {
        return <div key={i} className="text-zinc-500 italic">{line}</div>;
      }
      
      // CSS Properties / JS Keys
      const parts = line.split(":");
      if (parts.length > 1) {
        return (
          <div key={i}>
            <span className="text-blue-400">{parts[0]}</span>:
            <span className="text-[var(--brat-lime)]">{parts[1]}</span>
          </div>
        );
      }
      
      return <div key={i}>{line}</div>;
    });
  };

  return (
    <div className="group relative my-10 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0a0a0a] transition-all hover:border-[var(--brat-lime)]/30 hover:shadow-[0_0_40px_-15px_rgba(137,204,4,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 bg-[#121212] px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/30" />
            <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
            <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/30" />
          </div>
          {title && (
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-400">
              {title}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2.5 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-[12px] font-bold text-zinc-300 transition-all hover:bg-[var(--brat-lime)] hover:text-black hover:border-[var(--brat-lime)] active:scale-95"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>COPY CODE</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="relative overflow-x-auto p-8 font-mono text-[15px] leading-relaxed">
        <pre className="text-zinc-300">
          <code>{highlightCode(code)}</code>
        </pre>
        
        {/* Subtle Brat Glow in background */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[var(--brat-lime)]/5 blur-[100px]" />
      </div>
    </div>
  );
}
