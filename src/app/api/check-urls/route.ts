import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface UrlCheckResult {
  url: string;
  siteId: number;
  status: "alive" | "dead" | "redirect" | "error";
  httpCode: number | null;
  redirectUrl: string | null;
  errorMessage: string | null;
  responseTime: number;
}

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return Response.json(
        { error: "urls array is required" },
        { status: 400 }
      );
    }

    // Limit to 25 URLs per batch to avoid timeout
    const batch = urls.slice(0, 25);

    const results: UrlCheckResult[] = await Promise.all(
      batch.map(async (item: { url: string; siteId: number }) => {
        const startTime = Date.now();
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);

          const res = await fetch(item.url, {
            method: "HEAD",
            redirect: "manual",
            signal: controller.signal,
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          });

          clearTimeout(timeout);
          const responseTime = Date.now() - startTime;

          // Check for redirects
          if (res.status >= 300 && res.status < 400) {
            const redirectUrl = res.headers.get("location");
            return {
              url: item.url,
              siteId: item.siteId,
              status: "redirect" as const,
              httpCode: res.status,
              redirectUrl,
              errorMessage: null,
              responseTime,
            };
          }

          // Check for dead pages
          if (res.status >= 400) {
            return {
              url: item.url,
              siteId: item.siteId,
              status: "dead" as const,
              httpCode: res.status,
              redirectUrl: null,
              errorMessage: `HTTP ${res.status}`,
              responseTime,
            };
          }

          return {
            url: item.url,
            siteId: item.siteId,
            status: "alive" as const,
            httpCode: res.status,
            redirectUrl: null,
            errorMessage: null,
            responseTime,
          };
        } catch (err: unknown) {
          const responseTime = Date.now() - startTime;
          const message =
            err instanceof Error ? err.message : "Unknown error";

          return {
            url: item.url,
            siteId: item.siteId,
            status: "error" as const,
            httpCode: null,
            redirectUrl: null,
            errorMessage: message.includes("abort")
              ? "Timeout (8s)"
              : message.includes("ENOTFOUND") ||
                  message.includes("getaddrinfo")
                ? "Domain expired / DNS failed"
                : message,
            responseTime,
          };
        }
      })
    );

    const alive = results.filter((r) => r.status === "alive").length;
    const dead = results.filter((r) => r.status === "dead").length;
    const redirects = results.filter((r) => r.status === "redirect").length;
    const errors = results.filter((r) => r.status === "error").length;

    return Response.json({
      results,
      summary: { alive, dead, redirects, errors, total: results.length },
    });
  } catch (error) {
    console.error("URL check error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
