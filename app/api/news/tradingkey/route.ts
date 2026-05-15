import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await fetch(
      'https://www.tradingkey.com/kr/analysis/stocks/us-stocks',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        next: { revalidate: 7200 }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const news: any[] = [];
    const BASE_URL = 'https://www.tradingkey.com';

    $('div.root-b7a371d6').slice(0, 5).each((index, element) => {
      const link = $(element).find('a.body-c405aaad');
      const title = $(element).find('h3.title-fc9d297a').text()?.trim();
      const href = link.attr('href');
      const url = href ? `${BASE_URL}${href}` : null;
      const dateText = $(element).find('span.time-a43278bb').text()?.trim();

      if (title && url && title.length > 5) {
        news.push({
          id: `tradingkey-${index}`,
          title: title.substring(0, 100),
          source: 'TradingKey',
          date: dateText || new Date().toISOString().split('T')[0],
          url: url
        });
      }
    });

    console.log(`Found ${news.length} TradingKey articles:`, news.map(n => ({ title: n.title.substring(0, 30), url: n.url })));

    return NextResponse.json({
      success: true,
      data: news,
      count: news.length
    });
  } catch (error) {
    console.error('TradingKey scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape news', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
