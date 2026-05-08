"use client";
import { useState } from "react";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export default function ScraperBot() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.results || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const presetQueries = [
    'submit your startup directory',
    'submit tool "free" site listing',
    'inurl:submit "SaaS" directory',
    '"add your site" startup tools',
    'submit AI tool directory free',
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">🔍 Scraper Bot</h1>
        <p className="text-zinc-400 text-sm">Find real submission portals — not blogs. Enter a search query to discover directories where you can list your tool.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. submit your startup directory "free"'
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Searching...</>
          ) : (
            <>Search</>
          )}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-xs text-zinc-500 py-1">Quick searches:</span>
        {presetQueries.map((q) => (
          <button
            key={q}
            onClick={() => { setQuery(q); }}
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">❌ {error}</p>
        </div>
      )}

      {searched && !loading && results.length === 0 && !error && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-500">No submission portals found. Try a different query.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Found {results.length} potential submission sites</p>
          {results.map((r, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all group">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">{r.title}</h3>
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-400 text-xs hover:text-blue-300 truncate block mb-2">{r.url}</a>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{r.snippet}</p>
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 bg-zinc-800 text-white text-xs font-semibold rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  Visit →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!searched && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🕷️</div>
          <h3 className="text-white font-semibold mb-2">Ready to hunt for backlink sites</h3>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">Enter a search query above or pick a quick search to find directories, submission portals, and listing sites where you can submit your tool.</p>
        </div>
      )}
    </div>
  );
}
