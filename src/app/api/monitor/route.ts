import { NextResponse } from 'next/server';
import { verifyBacklink } from '../../../../scraper-bot/monitor';

export async function POST(request: Request) {
  try {
    const { siteUrl, targetUrl, backlinkId } = await request.json();
    
    if (!siteUrl || !targetUrl) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Call the professional monitor engine
    const result = await verifyBacklink(siteUrl, targetUrl);

    // If backlinkId is provided, update DB (Optional here as the engine can do it, but better via API)
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
