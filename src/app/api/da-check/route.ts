import { NextResponse } from 'next/server';
import { getRealDA } from '@/lib/seo-engine';

export async function POST(request: Request) {
  try {
    const { domains } = await request.json();
    const results = [];
    for (const domain of domains) {
      const metrics = await getRealDA(domain.trim());
      results.push({ domain: domain.trim(), da: metrics?.da || 0, ss: metrics?.ss || 0 });
    }
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
