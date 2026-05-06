"use client";

import { useState } from "react";

interface ColorValueCardProps {
  label: string;
  value: string;
}

export default function ColorValueCard({ label, value }: ColorValueCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={copyToClipboard}
      className="group flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-zinc-50/30 cursor-pointer transition-all hover:border-[var(--brat-lime)] hover:bg-white hover:shadow-xl hover:shadow-[var(--brat-lime)]/5 active:scale-[0.98]"
    >
      <div className="flex flex-col">
        <span className="font-bold text-zinc-400 uppercase text-[9px] tracking-[0.2em] mb-1 leading-none">
          {label}
        </span>
        <span className="font-mono font-bold text-zinc-900 text-[16px] leading-none">
          {value}
        </span>
      </div>
      
      <div className="flex items-center">
        {copied ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 animate-in zoom-in duration-300">
            <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Copied</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 group-hover:bg-[var(--brat-lime)] group-hover:border-[var(--brat-lime)] transition-all">
            <span className="text-[9px] font-bold text-zinc-500 group-hover:text-black uppercase tracking-wider hidden sm:block">Copy</span>
            <svg 
              className="h-3.5 w-3.5 text-zinc-400 group-hover:text-black transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
