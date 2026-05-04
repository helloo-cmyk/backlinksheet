"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const BratGenerator = dynamic(
  () => import("@/components/BratGenerator"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[400px] items-center justify-center text-slate-500">
        <p>Loading generator...</p>
      </div>
    ),
  }
);

type BratGeneratorMode = 'full' | 'text-only' | 'font-only' | 'album' | 'name' | 'color-variant';

interface BratGeneratorLazyProps {
  defaultBg?: string;
  defaultFg?: string;
  mode?: BratGeneratorMode;
  defaultTab?: 'text' | 'style' | 'stickers';
  defaultRatio?: '1:1' | '4:5' | '9:16' | '16:9';
  defaultResolution?: '1024' | '1500' | '2048' | '3000';
  defaultPlaceholder?: string;
  lockBg?: boolean;
  lockFg?: boolean;
  hideSelfieMode?: boolean;
  hideAspectRatio?: boolean;
  hidePresets?: boolean;
  showRandomButton?: boolean;
}

export default function BratGeneratorLazy(props: BratGeneratorLazyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-6xl scroll-mt-24">
      <BratGenerator 
        key={`${props.defaultBg}-${props.defaultFg}-${props.mode}-${props.defaultTab}`} 
        {...props}
      />
    </div>
  );
}
