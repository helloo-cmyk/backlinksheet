import Link from 'next/link';
import Image from 'next/image';

interface BlogHeroProps {
  category: string;
  title: string;
  subtitle: string;
  readTime?: string;
  author?: string;
  publishDate?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function BlogHero({ 
  category, 
  title, 
  subtitle, 
  readTime = "5 MIN READ", 
  author = "ibratgenerator",
  publishDate = "May 01, 2026",
  imageSrc, 
  imageAlt = "Blog hero graphic" 
}: BlogHeroProps) {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24 border-b border-[var(--hp-border)] relative overflow-hidden bg-gradient-to-b from-[var(--hp-surface-warm)] to-transparent">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="text-left flex flex-col items-start lg:col-span-7 pr-0 lg:pr-8">
          <Link href="/blog" className="inline-flex items-center text-[12px] font-bold text-[var(--hp-ink)] opacity-60 hover:opacity-100 uppercase tracking-widest mb-8 transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO BLOG
          </Link>

          <span className="font-extrabold text-[12px] tracking-widest uppercase mb-6 inline-block text-[var(--hp-ink)] opacity-80">
            {category}
          </span>
          
          <h1 className="hp-hero-heading mt-0 mb-6 !text-4xl sm:!text-5xl lg:!text-6xl text-left bg-clip-text text-transparent bg-gradient-to-br from-[var(--hp-ink)] to-gray-600 block w-full !leading-[1.15]">
            {title}
          </h1>
          
          <p className="intro-text max-w-xl text-left opacity-80 mb-6 border-none bg-transparent p-0 shadow-none text-[18px] sm:text-[20px] leading-relaxed block w-full">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 items-center mt-2 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#8ACE00] flex items-center justify-center text-black font-bold text-[10px] mr-3 shadow-sm">
                IG
              </div>
              <p className="text-[13px] font-bold text-[var(--hp-ink)] opacity-90">
                By {author}
              </p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--hp-ink)] opacity-20"></div>
            <p className="text-[13px] font-medium text-[var(--hp-ink)] opacity-60">
              Published: {publishDate} | Updated: May 03, 2026
            </p>
          </div>
          
          <p className="text-[12px] font-semibold text-[var(--hp-ink)] opacity-50 tracking-widest uppercase">
            {readTime}
          </p>
        </div>

        {/* Right Side: Graphic */}
        <div className="flex justify-center lg:justify-end lg:col-span-5 w-full">
          {imageSrc ? (
            <div className="w-full max-w-[340px] lg:max-w-md overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform hover:scale-[1.02] transition-transform duration-500 bg-[var(--hp-surface-warm)]">
              <Image 
                src={imageSrc} 
                alt={imageAlt} 
                width={500} 
                height={500} 
                className="w-full h-auto object-cover leading-none border-none float-left"
              />
            </div>
          ) : (
            <div className="w-full max-w-[340px] lg:max-w-md rounded-[2.5rem] lg:rounded-[3rem] border border-black/5 bg-[#8ACE00] p-6 lg:p-10 shadow-[0_20px_50px_rgba(138,206,0,0.2)] transform hover:scale-[1.02] transition-transform duration-500">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] lg:rounded-[2rem] border border-black/10 bg-black/5 shadow-inner">
                <span className="text-5xl sm:text-6xl lg:text-[72px] font-medium tracking-tight text-black opacity-95 lowercase" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
                  brat
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
