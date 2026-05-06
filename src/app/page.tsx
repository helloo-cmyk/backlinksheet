"use client";

import { useState, useEffect } from "react";
import { sitesData } from "@/data/sites";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectUrl, setNewProjectUrl] = useState("");

  // Backlink state
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [siteNotes, setSiteNotes] = useState<Record<number, string>>({});

  // UI state
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedNoteId, setCopiedNoteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/login");
        return;
      }
      setUser(user);
      await loadProjects(user.id);
    };
    fetchSession();
  }, []);

  const loadProjects = async (userId: string) => {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from("project_backlinks")
      .select("*")
      .eq("project_id", projectId);

    if (data) {
      const completed = data.filter(d => d.status === "completed").map(d => d.site_id);
      const notes: Record<number, string> = {};
      data.forEach(d => {
        if (d.notes) notes[d.site_id] = d.notes;
      });
      setCompletedIds(completed);
      setSiteNotes(notes);
    }
    setLoading(false);
  };

  const switchProject = async (projectId: string) => {
    setActiveProjectId(projectId);
    await loadProjectData(projectId);
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectUrl) return;

    const { data, error } = await supabase
      .from("projects")
      .insert([
        { user_id: user.id, name: newProjectName, target_url: newProjectUrl }
      ])
      .select();

    if (data && data.length > 0) {
      setProjects([data[0], ...projects]);
      setActiveProjectId(data[0].id);
      setCompletedIds([]);
      setSiteNotes({});
      setShowNewProjectModal(false);
      setNewProjectName("");
      setNewProjectUrl("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // --- Upsert Logic for Backlinks ---
  const upsertBacklinkRecord = async (siteId: number, updates: any) => {
    if (!activeProjectId) return;
    
    // Check if record exists
    const { data: existing } = await supabase
      .from("project_backlinks")
      .select("id")
      .eq("project_id", activeProjectId)
      .eq("site_id", siteId)
      .single();

    if (existing) {
      await supabase
        .from("project_backlinks")
        .update(updates)
        .eq("id", existing.id);
    } else {
      await supabase
        .from("project_backlinks")
        .insert([{ project_id: activeProjectId, site_id: siteId, ...updates }]);
    }
  };

  const handleNoteChange = async (id: number, text: string) => {
    const newNotes = { ...siteNotes, [id]: text };
    setSiteNotes(newNotes);
    await upsertBacklinkRecord(id, { notes: text });
  };

  const toggleComplete = async (id: number) => {
    let newCompleted;
    let newStatus = "pending";
    if (completedIds.includes(id)) {
      newCompleted = completedIds.filter((cid) => cid !== id);
    } else {
      newCompleted = [...completedIds, id];
      newStatus = "completed";
    }
    setCompletedIds(newCompleted);
    await upsertBacklinkRecord(id, { status: newStatus });
  };

  const insertDate = (id: number) => {
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const currentNote = siteNotes[id] || "";
    const newNote = currentNote + (currentNote ? "\n" : "") + `[${dateStr}] `;
    handleNoteChange(id, newNote);
  };

  const copyNotes = (id: number) => {
    const note = siteNotes[id] || "";
    navigator.clipboard.writeText(note);
    setCopiedNoteId(id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  // --- Filtering ---
  const filteredSites = sitesData.filter((site) => {
    const matchesCat = currentCategory === "All" || site.category === currentCategory;
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.tip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase())) ||
      site.da.toString().includes(searchTerm);

    const isCompleted = completedIds.includes(site.id);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && isCompleted) ||
      (statusFilter === "pending" && !isCompleted);

    const matchesPricing =
      pricingFilter === "all" ||
      (pricingFilter === "free" && site.pricing === "Free") ||
      (pricingFilter === "paid" && site.pricing !== "Free");

    return matchesCat && matchesSearch && matchesStatus && matchesPricing;
  });

  const categories = ["All", ...Array.from(new Set(sitesData.map((s) => s.category)))];
  
  const totalSites = sitesData.length;
  const freeSites = sitesData.filter(s => s.pricing === "Free" || !s.pricing).length;
  const completedCount = completedIds.length;
  const progressPercent = totalSites > 0 ? Math.round((completedCount / totalSites) * 100) : 0;

  if (loading && projects.length === 0) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  // Active Project Details
  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {showNewProjectModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white">Create New Project</h2>
            <form onSubmit={createProject} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Project Name</label>
                <input required type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g. Acme SaaS" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Target URL</label>
                <input required type="url" value={newProjectUrl} onChange={e => setNewProjectUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="https://acme.com" />
              </div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowNewProjectModal(false)} className="flex-1 py-3 bg-zinc-800 rounded-lg font-semibold hover:bg-zinc-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 shadow-sm">
        <div className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          <span className="text-white">Backlink<span className="text-blue-500 font-medium">Dash</span></span>
        </div>

        {projects.length === 0 && (
          <button onClick={() => setShowNewProjectModal(true)} className="mx-8 bg-blue-600 text-white border border-blue-500 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-500 transition-all">+ Create First Project</button>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-6 py-1.5 gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold leading-tight text-white">{totalSites}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Total</span>
            </div>
            <div className="w-px h-5 bg-zinc-700"></div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold leading-tight text-white">{freeSites}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Free</span>
            </div>
            <div className="w-px h-5 bg-zinc-700"></div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold leading-tight text-blue-500">{completedCount}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Done</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-700 hover:text-white transition-all" title="Logout">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </header>

      {projects.length > 0 && !loading && (
        <div className="flex min-h-[calc(100vh-73px)]">
          {/* Sidebar */}
          <aside className="w-72 bg-zinc-900/40 border-r border-zinc-800 p-6 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto custom-scrollbar flex flex-col gap-8">
            
            {/* PROJECTS SECTION */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Your Projects</h3>
                <button onClick={() => setShowNewProjectModal(true)} className="text-blue-500 hover:text-blue-400 p-1" title="New Project">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <ul className="space-y-1.5">
                {projects.map(p => (
                  <li key={p.id}>
                    <button
                      onClick={() => switchProject(p.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 group
                        ${activeProjectId === p.id ? "bg-blue-600 text-white font-medium shadow-[0_4px_10px_rgba(37,99,235,0.2)]" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${activeProjectId === p.id ? 'bg-white' : 'bg-zinc-600'}`}></div>
                      <span className="truncate">{p.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* PROGRESS SECTION */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-zinc-300">Project Progress</span>
                <span className="text-sm font-bold text-blue-500">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* CATEGORIES SECTION */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Categories</h3>
              <ul className="space-y-1.5">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setCurrentCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group
                        ${currentCategory === cat ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"}`}
                    >
                      {cat}
                      {currentCategory === cat && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="9 18 15 12 9 6"></polyline></svg>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* PRO TIP SECTION */}
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mt-auto">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                SEO Pro Tip
              </div>
              <p className="text-xs text-blue-200/70 leading-relaxed">
                Google penalizes duplicate footprints. Keep notes of the exact description you used for each backlink so you can spin it slightly next time!
              </p>
            </div>

          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.05),transparent_50%)]">
            
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{activeProject?.name}</h1>
                <a href={activeProject?.target_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1.5">
                  {activeProject?.target_url}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a site, DA, or link type..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <select
                value={pricingFilter}
                onChange={(e) => setPricingFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Pricing</option>
                <option value="free">100% Free</option>
                <option value="paid">Paid / Freemium</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl">
              {filteredSites.map((site) => {
                const isDone = completedIds.includes(site.id);
                const noteText = siteNotes[site.id] || "";
                return (
                  <div key={site.id} className={`flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-600 ${isDone ? 'opacity-60 border-green-500/20' : ''}`}>
                    
                    <div className="flex justify-between items-start mb-5 pb-5 border-b border-zinc-800">
                      <div>
                        <h3 className={`text-lg font-bold tracking-tight mb-1 ${isDone ? 'text-green-500 line-through decoration-green-500/50' : 'text-zinc-100'}`}>{site.name}</h3>
                        <p className="text-xs text-zinc-500">{site.category}</p>
                      </div>
                      <div className="flex flex-col gap-1.5 items-end">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">DA {site.da}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${site.type === 'Dofollow' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{site.type}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${site.pricing === 'Free' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>{site.pricing || 'Free'}</span>
                      </div>
                    </div>

                    <ul className="text-sm text-zinc-300 space-y-2.5 mb-6 flex-1 list-disc pl-4 marker:text-zinc-600">
                      {site.steps.map((step, idx) => (
                        <li key={idx} className="leading-snug">{step}</li>
                      ))}
                    </ul>

                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3.5 mb-6">
                      <p className="text-xs text-zinc-300 leading-relaxed"><strong className="text-yellow-500">TIP:</strong> {site.tip}</p>
                    </div>

                    <div className="mb-6 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                      <div className="flex justify-between items-center px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Private Notes</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => insertDate(site.id)} className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded transition-colors" title="Insert Date">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          </button>
                          <button onClick={() => copyNotes(site.id)} className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded transition-colors" title="Copy Notes">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          </button>
                          <span className={`text-[10px] font-bold ml-1 transition-opacity ${copiedNoteId === site.id ? 'text-blue-400 opacity-100' : 'text-emerald-500 opacity-0'}`}>{copiedNoteId === site.id ? 'Copied!' : 'Saved!'}</span>
                        </div>
                      </div>
                      <textarea
                        value={noteText}
                        onChange={(e) => handleNoteChange(site.id, e.target.value)}
                        onBlur={(e) => upsertBacklinkRecord(site.id, { notes: e.target.value })}
                        placeholder="Add private notes (login info, status)..."
                        className="w-full bg-transparent border-none text-zinc-200 p-3 text-sm resize-y min-h-[70px] outline-none placeholder:text-zinc-600 custom-scrollbar"
                      />
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 rounded-lg bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors border border-zinc-700">
                        Visit Site
                      </a>
                      <button onClick={() => toggleComplete(site.id)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${isDone ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5'}`}>
                        {isDone ? 'Undo' : 'Mark Done'}
                      </button>
                    </div>

                  </div>
                )
              })}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
