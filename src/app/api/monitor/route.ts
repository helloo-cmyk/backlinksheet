import { NextResponse } from 'next/server';
import { verifyBacklinkRealtime } from '@/lib/seo-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { siteUrl, targetUrl } = await request.json();
    const result = await verifyBacklinkRealtime(siteUrl, targetUrl);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
