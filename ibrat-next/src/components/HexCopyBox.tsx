"use client";

import { useState } from "react";
import Link from "next/link";

export default function HexCopyBox() {
  const [copied, setCopied] = useState(false);
  const hex = "#89CC04";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 p-8 rounded-[2.5rem] bg-[#121212] border border-zinc-800 mb-10 transition-all hover:border-zinc-700">
      <div className="flex items-center gap-6 grow">
        <div className="w-20 h-20 rounded-3xl bg-[#89CC04] shadow-[0_0_40px_rgba(137,204,4,0.3)] shrink-0 flex items-center justify-center">
           <span className="text-black/20 font-black text-2xl select-none">b</span>
        </div>
        <div className="grow">
          <p className="text-white font-bold text-[20px] mb-1.5 leading-tight">
            Official Hex: <span className="text-[var(--brat-lime)]">{hex}</span>
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-[320px]">
            Use this in Canva, Figma, or our <Link href="/" className="text-[var(--brat-lime)] hover:underline font-bold">free brat generator</Link>.
          </p>
        </div>
      </div>
      
      <button
        onClick={copyToClipboard}
        className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 ${
          copied 
            ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
            : "bg-[var(--brat-lime)] text-black shadow-[0_0_20px_rgba(137,204,4,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(137,204,4,0.4)]"
        }`}
      >
        {copied ? (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>COPIED!</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>COPY HEX</span>
          </>
        )}
      </button>
    </div>
  );
}
