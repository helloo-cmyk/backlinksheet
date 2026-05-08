import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return Response.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const searchQuery = encodeURIComponent(query);
    const url = `https://html.duckduckgo.com/html/?q=${searchQuery}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch search results" },
        { status: 502 }
      );
    }

    const html = await res.text();

    // Parse results from DuckDuckGo HTML
    const results: Array<{
      title: string;
      url: string;
      snippet: string;
    }> = [];

    // Match result blocks
    const resultRegex =
      /<a rel="nofollow" class="result__a" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;

    let match;
    while ((match = resultRegex.exec(html)) !== null) {
      let rawUrl = match[1].trim();
      const title = match[2].replace(/<[^>]*>/g, "").trim();
      const snippet = match[3].replace(/<[^>]*>/g, "").trim();

      // Decode DuckDuckGo redirect URLs
      if (rawUrl.includes("uddg=")) {
        const uddgMatch = rawUrl.match(/uddg=([^&]+)/);
        if (uddgMatch) rawUrl = decodeURIComponent(uddgMatch[1]);
      }
      if (rawUrl.startsWith("//")) rawUrl = "https:" + rawUrl;

      // Filter out useless domains
      const blockedDomains = [
        "facebook.com", "twitter.com", "instagram.com", "linkedin.com",
        "youtube.com", "google.com", "bing.com", "yahoo.com",
        "duckduckgo.com", "wikipedia.org", "reddit.com", "quora.com",
        "pinterest.com", "tiktok.com", "amazon.com",
      ];

      // Filter out blog/article content
      const blockedKeywords = [
        "how to", "best of", "top 10", "top 5", "review", "vs ",
        "comparison", "tutorial", "guide to", "what is",
      ];

      const isDomainBlocked = blockedDomains.some((d) =>
        rawUrl.toLowerCase().includes(d)
      );
      const isContentBlocked = blockedKeywords.some(
        (kw) =>
          title.toLowerCase().includes(kw) ||
          snippet.toLowerCase().includes(kw)
      );

      if (
        !isDomainBlocked &&
        !isContentBlocked &&
        rawUrl.startsWith("http") &&
        title.length > 0
      ) {
        results.push({ title, url: rawUrl, snippet });
      }
    }

    // Deduplicate by domain
    const seenDomains = new Set<string>();
    const uniqueResults = results.filter((r) => {
      try {
        const domain = new URL(r.url).hostname;
        if (seenDomains.has(domain)) return false;
        seenDomains.add(domain);
        return true;
      } catch {
        return false;
      }
    });

    return Response.json({
      results: uniqueResults.slice(0, 20),
      total: uniqueResults.length,
      query,
    });
  } catch (error) {
    console.error("Scrape error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
