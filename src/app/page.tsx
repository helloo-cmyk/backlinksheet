import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          <span>Backlink<span className="text-blue-500 font-medium">Sheet</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">Login</Link>
          <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Start Prospecting
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: AI Pitch Generator v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.1]">
            Stop Chasing Backlinks.<br />
            <span className="text-blue-500">Start Dominating SERPs.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The world's first automated prospecting engine for SaaS founders. Discover, scrape, and pitch 500+ high-DA directories in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-bold transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
              Get 76+ Free Backlinks Now
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-lg font-bold border border-zinc-800 transition-all">
              Watch Demo
            </a>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <div className="mt-20 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                <div className="ml-4 flex-1 bg-zinc-950 rounded py-1 px-3 text-[10px] text-zinc-600 text-left">https://backlinksheet.vercel.app/dashboard</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                alt="Dashboard Preview" 
                className="w-full opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-8 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Built for Aggressive SEO.</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Everything you need to scale your backlink profile without hiring an expensive agency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Advanced Scraper</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Our bot deep-crawls the web using 50+ unique footprints to find hidden directories and submission portals your competitors miss.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">AI Pitch Generator</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Generate personalized, high-converting outreach messages in one click. No more "Hi, please list me" emails.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Live Monitoring</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">We automatically check if your backlinks are still active. Get notified the second a link is dropped or changed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 px-8 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-1">500+</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Directories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-500 mb-1">12k</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Links Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-1">94%</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-500 mb-1">24/7</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Monitoring</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16">Simple Pricing. Infinite Links.</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">Best Value</div>
             <div className="text-zinc-400 uppercase tracking-widest font-bold text-xs mb-4">Lifetime Access</div>
             <div className="text-6xl font-black text-white mb-6">$49<span className="text-2xl text-zinc-600 font-medium">/once</span></div>
             <ul className="space-y-4 mb-10 text-zinc-400">
               <li className="flex items-center justify-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Full Database Access (500+ Sites)
               </li>
               <li className="flex items-center justify-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Unlimited AI Pitches
               </li>
               <li className="flex items-center justify-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Unlimited Scraper Usage
               </li>
               <li className="flex items-center justify-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Lifetime Support & Updates
               </li>
             </ul>
             <Link href="/dashboard" className="block w-full py-4 bg-white text-black rounded-xl text-lg font-bold hover:bg-zinc-200 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
               Get Started for Free
             </Link>
             <p className="mt-4 text-[10px] text-zinc-600 font-medium uppercase tracking-widest">No credit card required for free trials.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/5 bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <span>Backlink<span className="text-blue-500 font-medium">Sheet</span></span>
          </div>
          <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
            © 2026 BacklinkSheet. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-zinc-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
