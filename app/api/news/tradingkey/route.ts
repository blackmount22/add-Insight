import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await fetch('https://www.tradingkey.com/kr/analysis/stocks/us-stocks', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const articles: any[] = [];
    const BASE_URL = 'https://www.tradingkey.com';

    // 실제 개별 기사 URL: /kr/analysis/stocks/us-stocks/숫자- 패턴
    $('a[href*="/kr/analysis/stocks/us-stocks/"]').each((idx, el) => {
      if (articles.length >= 5) return false;

      const href = $(el).attr('href') ?? '';
      if (!href || !/\/kr\/analysis\/stocks\/us-stocks\/\d+/.test(href)) return;

      const title =
        $(el).find('h2, h3, [class*="title"], [class*="Title"]').first().text().trim() ||
        $(el).text().trim();

      const url = href.startsWith('http') ? href : `${BASE_URL}${href}`;

      if (title && title.length > 5 && !articles.find((a) => a.url === url)) {
        articles.push({
          id: `tradingkey-${articles.length}`,
          title: title.substring(0, 100),
          source: 'TradingKey',
          date: new Date().toISOString().split('T')[0],
          url
        });
      }
    });

    if (articles.length === 0) {
      throw new Error('No articles found - site may require JS rendering');
    }

    console.log(`Found ${articles.length} TradingKey articles`);
    return NextResponse.json({ success: true, data: articles, count: articles.length });
  } catch (error) {
    console.error('TradingKey scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
