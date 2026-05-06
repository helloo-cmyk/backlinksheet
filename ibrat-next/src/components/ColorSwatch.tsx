"use client";

import { useState } from "react";

interface ColorSwatchProps {
  name: string;
  hex: string;
}

export default function ColorSwatch({ name, hex }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={copyToClipboard}
      className="group cursor-pointer relative"
    >
      <div 
        className={`aspect-square rounded-2xl mb-3 shadow-md border border-zinc-100 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl relative overflow-hidden`}
        style={{ backgroundColor: hex }}
      >
        {/* Hover Hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-all">
          <div className="bg-black/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 backdrop-blur-sm border border-white/10">
            CLICK TO COPY
          </div>
        </div>

        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center gap-1">
              <svg className="h-5 w-5 text-[var(--brat-lime)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white font-black text-[11px] uppercase tracking-tighter">Copied!</span>
            </div>
          </div>
        )}
      </div>
      <p className="text-[14px] font-bold text-zinc-900 mb-0.5">{name}</p>
      <p className="text-[12px] font-mono text-zinc-500">{hex}</p>
    </div>
  );
}
