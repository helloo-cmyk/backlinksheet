import { NextResponse } from 'next/server';
import { getRealMetrics } from '../../../../scraper-bot/da-checker';

export async function POST(request: Request) {
  try {
    const { domains } = await request.json();
    
    if (!domains || !Array.isArray(domains)) {
      return NextResponse.json({ error: 'Invalid domains list' }, { status: 400 });
    }

    const results = [];
    for (const domain of domains) {
      // For each domain, use our real-time scraper
      const metrics = await getRealMetrics(domain.trim());
      if (metrics) {
        results.push({ domain: domain.trim(), da: metrics.da, ss: metrics.spam_score });
      } else {
        // Fallback or skip
        results.push({ domain: domain.trim(), da: 0, ss: 0, error: 'Could not fetch' });
      }
    }

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
