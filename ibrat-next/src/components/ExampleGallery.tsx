import Image from "next/image";

const HOME_EXAMPLES = [
  { src: "/examples/brat-demo-1.png", alt: "brat generator example — green text saying brat summer vibes" },
  { src: "/examples/brat-demo-2.png", alt: "brat generator example — minimal brat meme saying stay toxic" },
  { src: "/examples/brat-demo-3.png", alt: "brat generator example — bold text saying main character energy" },
  { src: "/examples/brat-demo-4.png", alt: "brat generator example — neon green text reading chaotic good" },
  { src: "/examples/brat-demo-5.png", alt: "brat generator example — pink brat style image saying delulu mode activated" },
  { src: "/examples/brat-demo-6.png", alt: "brat generator example — square text design reading hot girl walk" },
];

const MAKER_EXAMPLES = [
  { src: "/examples/brat-maker-ex-1.png", alt: "brat creator profile picture layout with centered text" },
  { src: "/examples/brat-maker-ex-2.png", alt: "brat meme layout with bold lowercase caption" },
  { src: "/examples/brat-maker-ex-3.png", alt: "social post mockup in brat style with text overlay" },
  { src: "/examples/brat-maker-ex-4.png", alt: "custom brat-style post design with minimal text" },
  { src: "/examples/brat-maker-ex-5.png", alt: "meme-style brat text card reading unbothered" },
  { src: "/examples/brat-maker-ex-6.png", alt: "high-contrast brat design with custom hex colors" },
];

const FONT_EXAMPLES = [
  { src: "/examples/brat-font-ex-1.png", alt: "brat font style preview with wide spacing" },
  { src: "/examples/brat-font-ex-2.png", alt: "tight letter spacing example in brat style text" },
  { src: "/examples/brat-font-ex-3.png", alt: "heavy sans-serif brat text sample" },
  { src: "/examples/brat-font-ex-4.png", alt: "minimal typography layout with centered brat text" },
  { src: "/examples/brat-font-ex-5.png", alt: "custom brat font settings preview" },
  { src: "/examples/brat-font-ex-6.png", alt: "high-contrast typographic brat text design" },
];

export default function ExampleGallery({ type = "home" }: { type?: "home" | "maker" | "font" }) {
  const images = type === "maker" ? MAKER_EXAMPLES : type === "font" ? FONT_EXAMPLES : HOME_EXAMPLES;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {images.map(({ src, alt }, i) => (
        <div
          key={i}
          className="hp-example-card relative aspect-square w-full"
        >
          <Image
            src={src}
            alt={alt}
            width={400}
            height={400}
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="lazy"
            className="object-cover w-full h-full"
            style={{ borderRadius: 'inherit' }}
          />
        </div>
      ))}
    </div>
  );
}
