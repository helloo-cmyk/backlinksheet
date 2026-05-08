"use client";

import { sitesData } from "@/data/sites";

interface BacklinkDashboardProps {
  activeProject: any;
  backlinkData: Record<number, any>;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  pricingFilter: string;
  setPricingFilter: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentCategory: string;
  onUpdateStatus: (id: number, status: string) => Promise<void>;
  onHandleNoteChange: (id: number, text: string) => Promise<void>;
  onUpsertRecord: (id: number, updates: any) => Promise<void>;
  onInsertDate: (id: number) => void;
  onCopyNotes: (id: number) => void;
  onGeneratePitch: (site: any) => void;
  copiedNoteId: number | null;
}

export default function BacklinkDashboard({
  activeProject,
  backlinkData,
  searchTerm,
  setSearchTerm,
  pricingFilter,
  setPricingFilter,
  statusFilter,
  setStatusFilter,
  currentCategory,
  onUpdateStatus,
  onHandleNoteChange,
  onUpsertRecord,
  onInsertDate,
  onCopyNotes,
  onGeneratePitch,
  copiedNoteId
}: BacklinkDashboardProps) {
  
  const filteredSites = sitesData.filter((site) => {
    const matchesCat = currentCategory === "All" || site.category === currentCategory;
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (site.tip || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (site.steps || []).some(step => step.toLowerCase().includes(searchTerm.toLowerCase())) ||
      site.da.toString().includes(searchTerm);

    const currentStatus = backlinkData[site.id]?.status || "pending";
    const matchesStatus =
      statusFilter === "all" || statusFilter === currentStatus;

    const matchesPricing =
      pricingFilter === "all" ||
      (pricingFilter === "free" && site.pricing === "Free") ||
      (pricingFilter === "paid" && site.pricing !== "Free");

    return matchesCat && matchesSearch && matchesStatus && matchesPricing;
  });

  return (
    <main className="flex-1 p-8 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.05),transparent_50%)] overflow-y-auto">
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
          <option value="pending">⏳ Pending</option>
          <option value="outreach">✉️ Outreach</option>
          <option value="live">✅ Live</option>
          <option value="rejected">❌ Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl">
        {filteredSites.map((site) => {
          const projectSiteData = backlinkData[site.id] || {};
          const currentStatus = projectSiteData.status || "pending";
          const isDone = currentStatus === "live";
          const noteText = projectSiteData.notes || "";

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
                {(site.steps || []).map((step, idx) => (
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
                    <button onClick={() => onGeneratePitch(site)} className="mr-auto px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded border border-blue-500/20 hover:bg-blue-500/20 transition-all flex items-center gap-1">
                      AI Pitch
                    </button>
                    <button onClick={() => onInsertDate(site.id)} className="p-1 text-zinc-500 hover:text-white" title="Insert Date">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </button>
                    <button onClick={() => onCopyNotes(site.id)} className="p-1 text-zinc-500 hover:text-white" title="Copy Notes">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <span className={`text-[10px] font-bold ml-1 transition-opacity ${copiedNoteId === site.id ? 'text-blue-400 opacity-100' : 'opacity-0'}`}>Copied!</span>
                  </div>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => onHandleNoteChange(site.id, e.target.value)}
                  onBlur={(e) => onUpsertRecord(site.id, { notes: e.target.value })}
                  placeholder="Add private notes..."
                  className="w-full bg-transparent border-none text-zinc-200 p-3 text-sm resize-y min-h-[70px] outline-none placeholder:text-zinc-600 custom-scrollbar"
                />
              </div>

              <div className="flex gap-3 mt-auto">
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 rounded-lg bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors border border-zinc-700">
                  Visit Site
                </a>
                <div className="flex-1 relative">
                  <select 
                    value={currentStatus}
                    onChange={(e) => onUpdateStatus(site.id, e.target.value)}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold text-center appearance-none cursor-pointer transition-all outline-none border
                      ${currentStatus === 'live' ? 'bg-emerald-600 text-white border-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 
                        currentStatus === 'outreach' ? 'bg-blue-600 text-white border-blue-500 shadow-[0_4px_12px_rgba(37,99,235,0.3)]' :
                        currentStatus === 'rejected' ? 'bg-rose-600 text-white border-rose-500' :
                        'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white hover:bg-zinc-700'
                      }`}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="outreach">✉️ Outreach</option>
                    <option value="live">✅ Live</option>
                    <option value="rejected">❌ Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
