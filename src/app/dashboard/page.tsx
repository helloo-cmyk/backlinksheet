"use client";

import { useState, useEffect } from "react";
import { sitesData } from "@/data/sites";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import BacklinkDashboard from "../components/BacklinkDashboard";
import ScraperBot from "../components/ScraperBot";
import BulkTools from "../components/BulkTools";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"backlinks" | "scraper" | "bulk">("backlinks");

  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectUrl, setNewProjectUrl] = useState("");

  // Backlink state
  const [backlinkData, setBacklinkData] = useState<Record<number, any>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedNoteId, setCopiedNoteId] = useState<number | null>(null);
  const [activePitch, setActivePitch] = useState<{ id: number; text: string } | null>(null);

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

  const switchProject = async (projectId: string) => {
    setActiveProjectId(projectId);
    await loadProjectData(projectId);
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectUrl) return;

    const { data } = await supabase
      .from("projects")
      .insert([{ user_id: user.id, name: newProjectName, target_url: newProjectUrl }])
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

  const upsertBacklinkRecord = async (siteId: number, updates: any) => {
    if (!activeProjectId) return;
    
    const { data: existing } = await supabase
      .from("project_backlinks")
      .select("id")
      .eq("project_id", activeProjectId)
      .eq("site_id", siteId)
      .single();

    if (existing) {
      await supabase.from("project_backlinks").update({ ...updates, last_checked_at: new Date().toISOString() }).eq("id", existing.id);
    } else {
      await supabase.from("project_backlinks").insert([{ project_id: activeProjectId, site_id: siteId, ...updates, last_checked_at: new Date().toISOString() }]);
    }
  };

  const handleNoteChange = async (id: number, text: string) => {
    setBacklinkData({ ...backlinkData, [id]: { ...(backlinkData[id] || {}), notes: text } });
  };

  const updateStatus = async (id: number, status: string) => {
    const now = new Date().toISOString();
    setBacklinkData({ ...backlinkData, [id]: { ...(backlinkData[id] || {}), status, last_checked_at: now } });
    await upsertBacklinkRecord(id, { status, last_checked_at: now });
  };

  const insertDate = (id: number) => {
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const currentNote = backlinkData[id]?.notes || "";
    const newNote = currentNote + (currentNote ? "\n" : "") + `[${dateStr}] `;
    handleNoteChange(id, newNote);
    upsertBacklinkRecord(id, { notes: newNote });
  };

  const copyNotes = (id: number) => {
    const note = backlinkData[id]?.notes || "";
    navigator.clipboard.writeText(note);
    setCopiedNoteId(id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  const generatePitch = (site: any) => {
    const activeProject = projects.find(p => p.id === activeProjectId);
    const projectName = activeProject?.name || "my SaaS";
    const projectUrl = activeProject?.target_url || "our website";
    const templates = [
      `Hi ${site.name} Team,\n\nI just discovered your directory and was impressed by the quality of tools listed. I'm building ${projectName} (${projectUrl}) and would love to submit it for a listing. \n\nCould you let me know the best way to get featured? \n\nBest regards,\nFounder, ${projectName}`,
      `Hello,\n\nI'm reaching out to see if you're still accepting new submissions for the ${site.category} section on ${site.name}. We recently launched ${projectName} and I think it would be a great fit for your audience.\n\nLooking forward to hearing from you!\n\nCheers,\n${projectName} Team`
    ];
    const pitch = templates[Math.floor(Math.random() * templates.length)];
    setActivePitch({ id: site.id, text: pitch });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const categories = ["All", ...Array.from(new Set(sitesData.map((s) => s.category)))];
  
  const backlinkValues = Object.values(backlinkData);
  const submittedCount = backlinkValues.filter((d: any) => d.status === "submitted").length;
  const liveCount = backlinkValues.filter((d: any) => d.status === "live").length;
  
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
  const todayCount = backlinkValues.filter((d: any) => 
    d.last_checked_at && d.last_checked_at.startsWith(today) && (d.status === "submitted" || d.status === "live")
  ).length;

  const progressPercent = sitesData.length > 0 ? Math.round(((submittedCount + liveCount) / sitesData.length) * 100) : 0;
  
  // Find last activity
  const sortedByTime = [...backlinkValues].sort((a, b) => 
    new Date(b.last_checked_at || 0).getTime() - new Date(a.last_checked_at || 0).getTime()
  );
  const lastActiveSiteId = sortedByTime[0]?.site_id;
  const lastActiveSite = sitesData.find(s => s.id === lastActiveSiteId);

  // Find next pending
  const nextPendingSite = sitesData.find(s => 
    (currentCategory === "All" || s.category === currentCategory) && 
    (!backlinkData[s.id] || backlinkData[s.id].status === "pending")
  );

  const activeProject = projects.find(p => p.id === activeProjectId);

  if (loading && projects.length === 0) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col">
      {/* Modals */}
      {activePitch && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">AI Pitch Generator</h2>
            <textarea readOnly className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6 text-zinc-300 text-sm h-48 outline-none" value={activePitch.text} />
            <div className="flex gap-3">
              <button onClick={() => setActivePitch(null)} className="flex-1 py-3 bg-zinc-800 rounded-lg font-semibold hover:bg-zinc-700">Close</button>
              <button onClick={() => { navigator.clipboard.writeText(activePitch.text); alert("Copied!"); }} className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold">Copy Pitch</button>
            </div>
          </div>
        </div>
      )}

      {showNewProjectModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6 text-white">Create New Project</h2>
            <form onSubmit={createProject} className="space-y-4">
              <input required type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none" placeholder="Project Name" />
              <input required type="url" value={newProjectUrl} onChange={e => setNewProjectUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none" placeholder="https://acme.com" />
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowNewProjectModal(false)} className="flex-1 py-3 bg-zinc-800 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 shadow-sm">
        <div className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          <span className="text-white">Backlink<span className="text-blue-500 font-medium">Dash</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-6 py-2 gap-6 shadow-inner">
            <div className="flex flex-col items-center">
              <span className="text-xl font-extrabold text-white">{sitesData.length}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Library</span>
            </div>
            <div className="w-px h-6 bg-zinc-800"></div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-extrabold text-indigo-400">{submittedCount}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Submitted</span>
            </div>
            <div className="w-px h-6 bg-zinc-800"></div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-extrabold text-emerald-500">{liveCount}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Live</span>
            </div>
            <div className="w-px h-6 bg-zinc-800"></div>
            <div className="flex flex-col items-center group relative">
              <span className="text-xl font-extrabold text-orange-400 animate-pulse">{todayCount}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Today</span>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white" title="Logout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-zinc-900/40 border-r border-zinc-800 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8 shrink-0">
          <div>
            <div className="flex justify-between items-center mb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <span>Your Projects</span>
              <button onClick={() => setShowNewProjectModal(true)} className="text-blue-500 hover:text-blue-400">+</button>
            </div>
            <ul className="space-y-1.5">
              {projects.map(p => (
                <li key={p.id}>
                  <button onClick={() => switchProject(p.id)} className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${activeProjectId === p.id ? "bg-blue-600 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800"}`}>
                    <div className={`w-2 h-2 rounded-full ${activeProjectId === p.id ? 'bg-white' : 'bg-zinc-600'}`}></div>
                    <span className="truncate">{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <nav className="space-y-1.5">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Features</div>
            <button onClick={() => setActiveTab("backlinks")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'backlinks' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              Backlinks
            </button>
            <button onClick={() => setActiveTab("scraper")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'scraper' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Scraper Bot
            </button>
            <button onClick={() => setActiveTab("bulk")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'bulk' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Bulk Tools
            </button>
          </nav>

          {activeTab === "backlinks" && (
            <div className="flex flex-col gap-6">
              {lastActiveSite && (
                <div className="bg-zinc-800/30 border border-zinc-800 rounded-xl p-4">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Last Activity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-white truncate">{lastActiveSite.name}</span>
                  </div>
                </div>
              )}

              {nextPendingSite && (
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">Next to Submit</span>
                  <p className="text-sm font-semibold text-white mb-3 truncate">{nextPendingSite.name}</p>
                  <button 
                    onClick={() => {
                      setSearchTerm(nextPendingSite.name);
                      setCurrentCategory(nextPendingSite.category);
                    }}
                    className="w-full py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Jump to Site
                  </button>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Categories</h3>
                <ul className="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button onClick={() => setCurrentCategory(cat)} className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${currentCategory === cat ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800/50"}`}>
                        <span className="truncate">{cat}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-300">Progress</span>
              <span className="text-sm font-bold text-blue-500">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === "backlinks" && (
            <BacklinkDashboard 
              activeProject={activeProject}
              backlinkData={backlinkData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              pricingFilter={pricingFilter}
              setPricingFilter={setPricingFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              currentCategory={currentCategory}
              onUpdateStatus={updateStatus}
              onHandleNoteChange={handleNoteChange}
              onUpsertRecord={upsertBacklinkRecord}
              onInsertDate={insertDate}
              onCopyNotes={copyNotes}
              onGeneratePitch={generatePitch}
              copiedNoteId={copiedNoteId}
            />
          )}
          {activeTab === "scraper" && <ScraperBot />}
          {activeTab === "bulk" && (
            <BulkTools 
              projectId={activeProjectId} 
              backlinkData={backlinkData} 
              onBulkUpdate={async (ids, updates) => {
                for (const id of ids) {
                  await updateStatus(id, updates.status);
                }
              }} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
