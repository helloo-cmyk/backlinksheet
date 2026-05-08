"use client";
import { useState } from "react";
import { sitesData } from "@/data/sites";

interface BulkToolsProps {
  projectId: string | null;
  backlinkData: Record<number, any>;
  onBulkUpdate: (siteIds: number[], updates: any) => Promise<void>;
}

interface CheckResult {
  url: string;
  siteId: number;
  status: "alive" | "dead" | "redirect" | "error";
  httpCode: number | null;
  errorMessage: string | null;
}

export default function BulkTools({ projectId, backlinkData, onBulkUpdate }: BulkToolsProps) {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [progress, setProgress] = useState(0);

  const exportToCSV = () => {
    if (!projectId) return;

    const headers = ["Site Name", "URL", "DA", "Category", "Status", "Notes"];
    const rows = sitesData.map(site => {
      const data = backlinkData[site.id] || {};
      return [
        site.name,
        site.url,
        site.da,
        site.category,
        data.status || "pending",
        (data.notes || "").replace(/\n/g, " ")
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `backlink-dash-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const runMonitoring = async () => {
    if (!projectId || checking) return;
    setChecking(true);
    setResults([]);
    setProgress(0);

    const urlsToCheck = sitesData.map(s => ({ url: s.url, siteId: s.id }));
    const batchSize = 25;
    const allResults: CheckResult[] = [];

    for (let i = 0; i < urlsToCheck.length; i += batchSize) {
      const batch = urlsToCheck.slice(i, i + batchSize);
      try {
        const res = await fetch("/api/check-urls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: batch }),
        });
        const data = await res.json();
        if (data.results) {
          allResults.push(...data.results);
          setResults([...allResults]);
        }
      } catch (err) {
        console.error("Batch check failed", err);
      }
      setProgress(Math.round(((i + batch.length) / urlsToCheck.length) * 100));
    }
    setChecking(false);
  };

  const deadSites = results.filter(r => r.status === "dead" || r.status === "error");

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">⚡ Bulk Tools & Monitoring</h1>
        <p className="text-zinc-400 text-sm">Manage your project at scale. Export data, check site health, and view analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* CSV Export */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 text-green-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Export to CSV</h3>
          <p className="text-zinc-500 text-sm mb-6">Download all your backlink data, status, and notes into a single CSV file for reporting.</p>
          <button onClick={exportToCSV} className="w-full py-2.5 bg-zinc-800 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors">Download CSV</button>
        </div>

        {/* Monitoring */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Health Monitor</h3>
          <p className="text-zinc-500 text-sm mb-6">Scan all directory URLs to find dead links, expired domains, or server errors.</p>
          <button 
            onClick={runMonitoring} 
            disabled={checking}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {checking ? `Checking (${progress}%)` : "Run Health Scan"}
          </button>
        </div>

        {/* Bulk Actions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 text-purple-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Bulk Status</h3>
          <p className="text-zinc-500 text-sm mb-6">Quickly mark entire categories as processed or outreach started.</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-zinc-800 text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-700 hover:text-white transition-all">Category Apply</button>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Scan Results</h3>
            <span className="text-xs text-zinc-500">{results.length} URLs checked</span>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-zinc-900 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-bold text-zinc-400">URL</th>
                    <th className="px-6 py-4 font-bold text-zinc-400 text-center">Status</th>
                    <th className="px-6 py-4 font-bold text-zinc-400">Error/Info</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {results.map((res, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-zinc-300 truncate max-w-xs">{res.url}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${res.status === 'alive' ? 'bg-emerald-500/10 text-emerald-400' : 
                            res.status === 'dead' ? 'bg-red-500/10 text-red-400' :
                            'bg-amber-500/10 text-amber-400'}`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-xs">{res.errorMessage || (res.httpCode ? `HTTP ${res.httpCode}` : "-")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {deadSites.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 flex items-center justify-between">
              <p className="text-sm text-red-400">Found <strong>{deadSites.length}</strong> potentially broken or dead sites. Recommend marking them as rejected.</p>
              <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-500 transition-colors">Reject All Dead</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
