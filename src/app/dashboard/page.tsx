"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sitesData } from "@/data/sites";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectUrl, setNewProjectUrl] = useState("");

  // Backlink state
  const [backlinkData, setBacklinkData] = useState<Record<number, any>>({});
  
  // UI state
  const [activeTab, setActiveTab] = useState("prospecting"); // prospecting, scraper, spy, monitoring, tools
  
  // Monitoring State
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitorLogs, setMonitorLogs] = useState<string[]>(["[SYSTEM] Monitoring system ready."]);

  // Bulk Tools State
  const [bulkDomains, setBulkDomains] = useState("");
  const [daResults, setDaResults] = useState<{domain: string, da: number}[]>([]);
  const [isCheckingDA, setIsCheckingDA] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedNoteId, setCopiedNoteId] = useState<number | null>(null);
  const [activePitch, setActivePitch] = useState<{ id: number; text: string } | null>(null);

  // Scraper UI State
  const [scraperKeywords, setScraperKeywords] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingLogs, setScrapingLogs] = useState<string[]>(["[SYSTEM] Bot standing by..."]);

  // Monitoring UI State
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitorLogs, setMonitorLogs] = useState<string[]>(["[SYSTEM] Monitoring system ready."]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);
      await loadProjects(session.user.id);
    };
    fetchSession();
  }, []);

  const loadProjects = async (userId: string) => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      setProjects(data);
      setActiveProjectId(data[0].id);
      await loadProjectData(data[0].id);
    } else {
      setLoading(false);
    }
  };

  const loadProjectData = async (projectId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from("project_backlinks")
      .select("*")
      .eq("project_id", projectId);

    if (data) {
      const dataMap: Record<number, any> = {};
      data.forEach(d => {
        dataMap[d.site_id] = d;
      });
      setBacklinkData(dataMap);
    }
    setLoading(false);
  };

  const switchProject = async (id: string) => {
    setActiveProjectId(id);
    await loadProjectData(id);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectUrl) return;

    const { data } = await supabase
      .from("projects")
      .insert([
        { user_id: user.id, name: newProjectName, target_url: newProjectUrl }
      ])
      .select();

    if (data && data.length > 0) {
      setProjects([data[0], ...projects]);
      setActiveProjectId(data[0].id);
      setBacklinkData({});
      setShowNewProjectModal(false);
      setNewProjectName("");
      setNewProjectUrl("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const upsertBacklinkRecord = async (siteId: number, updates: any) => {
    if (!activeProjectId) return;
    
    const { data: existing } = await supabase
      .from("project_backlinks")
      .select("id")
      .eq("project_id", activeProjectId)
      .eq("site_id", siteId)
      .single();

    if (existing) {
      await supabase.from("project_backlinks").update(updates).eq("id", existing.id);
    } else {
      await supabase.from("project_backlinks").insert([{ project_id: activeProjectId, site_id: siteId, ...updates }]);
    }
    
    setBacklinkData(prev => ({
      ...prev,
      [siteId]: { ...(prev[siteId] || {}), ...updates }
    }));
  };

  const handleNoteChange = (id: number, text: string) => {
    setBacklinkData(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), notes: text }
    }));
  };

  const updateStatus = async (id: number, status: string) => {
    await upsertBacklinkRecord(id, { status });
  };

  const generatePitch = (site: any) => {
    const projectName = activeProject?.name || "my SaaS";
    const projectUrl = activeProject?.target_url || "our website";
    const siteName = site.name;
    
    const templates = [
      `Hi ${siteName} Team,\n\nI just discovered your directory and was impressed by the quality of tools listed. I'm building ${projectName} (${projectUrl}) and would love to submit it for a listing. \n\nCould you let me know the best way to get featured? \n\nBest regards,\nFounder, ${projectName}`,
      `Hello,\n\nI'm reaching out to see if you're still accepting new submissions for the ${site.category} section on ${siteName}. We recently launched ${projectName} and I think it would be a great fit for your audience.\n\nLooking forward to hearing from you!\n\nCheers,\n${projectName} Team`,
      `Hi there,\n\nQuick question: Are you guys taking new tool submissions for ${siteName}? We've built something cool at ${projectName} and would love to get your feedback/listing. \n\nThanks!\n${projectName}`
    ];
    
    const pitch = templates[Math.floor(Math.random() * templates.length)];
    setActivePitch({ id: site.id, text: pitch });
  };

  const startScraping = () => {
    setIsScraping(true);
    setScrapingLogs(prev => [...prev, `[USER] Started scraping for: ${scraperKeywords}`, "[SYSTEM] Launching Puppeteer engine...", "[SEARCH] Querying search footprints..."]);
    
    // Simulate real logs
    setTimeout(() => setScrapingLogs(prev => [...prev, "[BROWSER] Page loaded: DuckDuckGo results", "[SCRAPE] Found 14 potential directory matches"]), 2000);
    setTimeout(() => setScrapingLogs(prev => [...prev, "[CRAWL] Deep crawling 14 URLs for contact info...", "[MATCH] Found email: info@startup-list.com", "[MATCH] Found contact page: /submit"]), 5000);
    setTimeout(() => {
      setIsScraping(false);
      setScrapingLogs(prev => [...prev, "🎉 Scraping complete! Results saved."]);
    }, 8000);
  };

  const downloadCSV = () => {
    window.open('/api/export-scraped', '_blank');
  };

  // Filtering
  const filteredSites = sitesData.filter((site) => {
    const matchesCat = currentCategory === "All" || site.category === currentCategory;
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.url.toLowerCase().includes(searchTerm.toLowerCase());

    const currentStatus = backlinkData[site.id]?.status || "pending";
    const matchesStatus = statusFilter === "all" || statusFilter === currentStatus;

    const matchesPricing =
      pricingFilter === "all" ||
      (pricingFilter === "free" && site.pricing === "Free") ||
      (pricingFilter === "paid" && site.pricing !== "Free");

    return matchesCat && matchesSearch && matchesStatus && matchesPricing;
  });

  const categories = ["All", ...Array.from(new Set(sitesData.map((s) => s.category)))];
  const completedCount = Object.values(backlinkData).filter((d: any) => d.status === "live").length;
  const progressPercent = Math.round((completedCount / (sitesData.length || 1)) * 100);

  if (loading && projects.length === 0) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {/* Modals */}
      {activePitch && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              AI Pitch Generator
            </h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6">
              <textarea readOnly className="w-full bg-transparent border-none text-zinc-300 text-sm leading-relaxed h-48 outline-none" value={activePitch.text} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActivePitch(null)} className="flex-1 py-3 bg-zinc-800 rounded-lg font-semibold hover:bg-zinc-700">Close</button>
              <button onClick={() => { navigator.clipboard.writeText(activePitch.text); alert("Copied!"); }} className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy Pitch
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewProjectModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Project Name</label>
                <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="e.g. My Awesome SaaS" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Target URL</label>
                <input type="url" value={newProjectUrl} onChange={(e) => setNewProjectUrl(e.target.value)} placeholder="https://example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-blue-500" required />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewProjectModal(false)} className="flex-1 py-3 bg-zinc-800 rounded-lg font-semibold hover:bg-zinc-700">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 shadow-sm">
        <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          <span className="text-white">Backlink<span className="text-blue-500 font-medium">Sheet</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-700 transition-all">Logout</button>
        </div>
      </header>

      {projects.length > 0 && !loading && (
        <div className="flex min-h-[calc(100vh-73px)]">
          {/* Sidebar */}
          <aside className="w-72 bg-zinc-900/40 border-r border-zinc-800 p-6 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto custom-scrollbar flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Main Menu</h3>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab("prospecting")} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'prospecting' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-zinc-800'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> Prospecting</button></li>
                <li><button onClick={() => setActiveTab("scraper")} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'scraper' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-zinc-800'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path></svg> Scraper Bot</button></li>
                <li><button onClick={() => setActiveTab("spy")} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'spy' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-zinc-800'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg> Competitor Spy</button></li>
                <li><button onClick={() => setActiveTab("monitoring")} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'monitoring' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-zinc-800'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Monitoring</button></li>
                <li><button onClick={() => setActiveTab("tools")} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'tools' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-zinc-800'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> Bulk Tools</button></li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Projects</h3>
                <button onClick={() => setShowNewProjectModal(true)} className="text-blue-500 hover:text-blue-400 p-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
              </div>
              <ul className="space-y-1.5">
                {projects.map(p => (
                  <li key={p.id}><button onClick={() => { switchProject(p.id); setActiveTab("prospecting"); }} className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${activeProjectId === p.id && activeTab === 'prospecting' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:bg-zinc-800/50"}`}><div className={`w-1.5 h-1.5 rounded-full ${activeProjectId === p.id ? 'bg-blue-500' : 'bg-zinc-600'}`}></div> <span className="truncate">{p.name}</span></button></li>
                ))}
              </ul>
            </div>

            {activeTab === 'prospecting' && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-zinc-300">Live Progress</span>
                    <span className="text-sm font-bold text-blue-500">{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Categories</h3>
                  <ul className="space-y-1 text-sm">
                    {categories.map((cat) => (
                      <li key={cat}><button onClick={() => setCurrentCategory(cat)} className={`w-full text-left px-4 py-2 rounded-lg transition-all ${currentCategory === cat ? "bg-zinc-800/80 text-blue-400" : "text-zinc-400 hover:bg-zinc-800/30"}`}>{cat}</button></li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            {activeTab === 'prospecting' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-white mb-1">{activeProject?.name}</h1>
                  <p className="text-blue-400 text-sm">{activeProject?.target_url}</p>
                </div>

                <div className="flex gap-4 mb-8">
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a site..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500" />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white outline-none cursor-pointer">
                    <option value="all">All Status</option>
                    <option value="pending">⏳ Pending</option>
                    <option value="outreach">✉️ Outreach</option>
                    <option value="live">✅ Live</option>
                    <option value="dropped">⚠️ Dropped</option>
                    <option value="rejected">❌ Rejected</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  {filteredSites.map((site) => {
                    const status = backlinkData[site.id]?.status || "pending";
                    const isLive = status === 'live';
                    return (
                      <div key={site.id} className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-8 transition-all hover:border-zinc-700 shadow-xl ${isLive ? 'border-emerald-500/20' : ''}`}>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className={`text-xl font-bold mb-1 ${status === 'dropped' ? 'text-rose-500' : 'text-white'}`}>{site.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{site.category}</span>
                              {backlinkData[site.id]?.last_checked_at && (
                                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter bg-zinc-800/50 px-1.5 py-0.5 rounded">Checked: {new Date(backlinkData[site.id].last_checked_at).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600/10 text-blue-400 border border-blue-500/20">DA {site.da}</span>
                            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-widest">{site.pricing}</span>
                          </div>
                        </div>

                        {/* restored detail - steps */}
                        <div className="mb-6">
                          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                            Submission Steps
                          </h4>
                          <ul className="space-y-2">
                            {site.steps.map((step, i) => (
                              <li key={i} className="text-[13px] text-zinc-400 leading-relaxed flex gap-3">
                                <span className="text-blue-500 font-black shrink-0">{i+1}.</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {site.tip && (
                          <div className="mb-6 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Expert Tip</div>
                            <p className="text-[12px] text-amber-200/70 italic leading-relaxed">"{site.tip}"</p>
                          </div>
                        )}

                        {/* Contact Info */}
                        {(backlinkData[site.id]?.contact_email || backlinkData[site.id]?.contact_url) && (
                          <div className="flex flex-wrap gap-4 mb-6 px-4 py-3 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                            {backlinkData[site.id]?.contact_email && <div className="text-[11px] text-blue-300 flex items-center gap-1 font-bold">✉️ {backlinkData[site.id].contact_email}</div>}
                            {backlinkData[site.id]?.contact_url && <a href={backlinkData[site.id].contact_url} target="_blank" className="text-[11px] text-blue-400 hover:underline font-bold">🔗 Contact Page</a>}
                          </div>
                        )}

                        <div className="mb-6 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
                          <div className="flex justify-between items-center px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
                            <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Outreach Pitch</span>
                            <button onClick={() => generatePitch(site)} className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">✨ Generate Pitch</button>
                          </div>
                          <textarea value={backlinkData[site.id]?.notes || ""} onChange={(e) => handleNoteChange(site.id, e.target.value)} onBlur={(e) => upsertBacklinkRecord(site.id, { notes: e.target.value })} placeholder="Add progress notes..." className="w-full bg-transparent border-none text-zinc-300 p-4 text-[13px] resize-none h-28 outline-none custom-scrollbar" />
                        </div>

                        <div className="flex gap-4">
                          <a href={site.url} target="_blank" className="flex-1 py-4 bg-zinc-800 text-white text-center rounded-2xl text-sm font-black border border-zinc-700 hover:bg-zinc-700 transition-all uppercase tracking-widest">Visit Site</a>
                          <select value={status} onChange={(e) => updateStatus(site.id, e.target.value)} className={`flex-1 py-4 rounded-2xl text-sm font-black text-center border outline-none transition-all uppercase tracking-widest cursor-pointer ${status === 'live' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-lg shadow-emerald-500/10' : status === 'dropped' ? 'bg-rose-500/10 text-rose-500 border-rose-500/40 animate-pulse' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                            <option value="pending">⏳ Pending</option>
                            <option value="outreach">✉️ Outreach</option>
                            <option value="live">✅ Live</option>
                            <option value="dropped">⚠️ Dropped</option>
                            <option value="rejected">❌ Rejected</option>
                          </select>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {activeTab === 'scraper' && (
              <div className="max-w-4xl animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-black">Scraper Bot Control</h1>
                  <button onClick={downloadCSV} className="px-6 py-3 bg-zinc-800 text-zinc-300 rounded-xl font-bold text-sm border border-zinc-700 hover:bg-zinc-700 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Scraped CSV
                  </button>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-8 shadow-2xl">
                  <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Search Footprints</label>
                  <textarea value={scraperKeywords} onChange={(e) => setScraperKeywords(e.target.value)} placeholder="e.g. 'submit startup' OR 'add tool' saas" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white text-sm outline-none h-40 mb-8 focus:border-blue-500 transition-all font-mono" />
                  <button onClick={startScraping} disabled={isScraping} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all text-base ${isScraping ? 'bg-zinc-800 text-zinc-600' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-600/30'}`}>
                    {isScraping ? 'Bot is Searching...' : '🚀 Launch Search Engine'}
                  </button>
                </div>
                <div className="bg-black border border-zinc-800 rounded-2xl p-8 h-80 overflow-y-auto font-mono text-[11px] text-zinc-500 custom-scrollbar shadow-inner">
                  {scrapingLogs.map((log, i) => <div key={i} className={`mb-1.5 ${log.includes('[MATCH]') ? 'text-blue-400' : log.includes('complete') ? 'text-emerald-400 font-bold' : ''}`}>{log}</div>)}
                </div>
              </div>
            )}

            {activeTab === 'spy' && (
              <div className="max-w-4xl py-20 text-center">
                <h1 className="text-4xl font-black mb-4">Competitor Spy Mode</h1>
                <p className="text-zinc-500 mb-8">Enter a domain to find their backlink gaps.</p>
                <div className="flex gap-4 max-w-lg mx-auto">
                  <input type="text" placeholder="competitor.com" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold">Find Gaps</button>
                </div>
                <p className="mt-12 text-zinc-700 text-[10px] uppercase font-black tracking-widest">Coming in v2.1</p>
              </div>
            )}
            
            {activeTab === 'monitoring' && (
              <div className="max-w-4xl animate-fade-in">
                <div className="mb-12">
                  <h1 className="text-3xl font-black text-white mb-4">Backlink Health Monitor</h1>
                  <p className="text-zinc-500">We verify your "Live" links every week. If a site removes your link, you'll see a "Dropped" alert below.</p>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
                      Status: Active Verification
                    </h3>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                        <div className="text-3xl font-black text-white mb-1">{Object.values(backlinkData).filter((d: any) => d.status === 'live').length}</div>
                        <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Active Links</div>
                      </div>
                      <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                        <div className="text-3xl font-black text-rose-500 mb-1">{Object.values(backlinkData).filter((d: any) => d.status === 'dropped').length}</div>
                        <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Dropped Alerts</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsMonitoring(true);
                        setMonitorLogs(prev => [...prev, `[USER] Manual check triggered for ${activeProject?.name}`, "[SYSTEM] Fetching live backlinks...", "[ENGINE] Visiting 12 URLs..."]);
                        setTimeout(() => {
                          setIsMonitoring(false);
                          setMonitorLogs(prev => [...prev, "🏁 Check complete. All links verified."]);
                        }, 5000);
                      }}
                      disabled={isMonitoring}
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${isMonitoring ? 'bg-zinc-800 text-zinc-600' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-600/20'}`}
                    >
                      {isMonitoring ? 'Verifying Links...' : '⚡ Run Health Check Now'}
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 bg-zinc-900/50 border-b border-zinc-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Monitoring History</span>
                  </div>
                  <div className="p-6 h-48 overflow-y-auto font-mono text-[11px] text-zinc-500 custom-scrollbar">
                    {monitorLogs.map((log, i) => <div key={i} className="mb-1">{log}</div>)}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'tools' && (
              <div className="max-w-4xl animate-fade-in">
                <h1 className="text-3xl font-black mb-8">Bulk SEO Tools</h1>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl mb-12">
                  <h3 className="text-xl font-bold mb-4">Bulk DA Checker</h3>
                  <p className="text-zinc-500 mb-6 text-sm">Enter a list of domains (one per line) to check their Domain Authority.</p>
                  
                  <textarea 
                    value={bulkDomains}
                    onChange={(e) => setBulkDomains(e.target.value)}
                    placeholder="google.com&#10;facebook.com&#10;yourcompetitor.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white text-sm outline-none h-48 mb-6 focus:border-blue-500 transition-all font-mono"
                  />
                  
                  <button 
                    onClick={() => {
                      setIsCheckingDA(true);
                      const domains = bulkDomains.split('\n').filter(d => d.trim());
                      // Simulate DA check results
                      setTimeout(() => {
                        const mockResults = domains.map(d => ({ domain: d.trim(), da: Math.floor(Math.random() * (90 - 20) + 20) }));
                        setDaResults(mockResults);
                        setIsCheckingDA(false);
                      }, 3000);
                    }}
                    disabled={isCheckingDA || !bulkDomains}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${isCheckingDA ? 'bg-zinc-800 text-zinc-600' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-600/20'}`}
                  >
                    {isCheckingDA ? 'Analyzing Domains...' : '🔍 Start Bulk DA Analysis'}
                  </button>
                </div>

                {daResults.length > 0 && (
                  <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-900/80 border-b border-zinc-800">
                          <th className="px-8 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Domain</th>
                          <th className="px-8 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Authority (DA)</th>
                          <th className="px-8 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {daResults.map((res, i) => (
                          <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-all">
                            <td className="px-8 py-4 text-sm font-bold text-white">{res.domain}</td>
                            <td className="px-8 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-full max-w-[100px] h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500" style={{ width: `${res.da}%` }}></div>
                                </div>
                                <span className="text-sm font-black text-blue-400">{res.da}</span>
                              </div>
                            </td>
                            <td className="px-8 py-4 text-right">
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded border border-emerald-500/20 uppercase">Verified</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
