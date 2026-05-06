import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Assuming the scraper bot stores the file in the sibling directory
    const filePath = path.join(process.cwd(), 'scraper-bot', 'master_results.csv');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found. Run a scan first.' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="master_results.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read results file.' }, { status: 500 });
  }
}
