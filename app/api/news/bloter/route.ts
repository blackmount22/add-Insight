import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await fetch(
      'https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        next: { revalidate: 21600 }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const news: any[] = [];
    const BASE_URL = 'https://www.bloter.net';

    $('#section-list ul.type2 > li').slice(0, 5).each((index, element) => {
      const titleEl = $(element).find('h2.titles a');
      const title = titleEl.text()?.trim();
      const href = titleEl.attr('href');
      const url = href ? `${BASE_URL}${href}` : null;
      const dateText = $(element).find('span.byline em').last().text()?.trim();

      if (title && url && title.length > 5) {
        news.push({
          id: `bloter-${index}`,
          title: title.substring(0, 100),
          source: 'Bloter',
          date: dateText ? dateText.split(' ')[0] : new Date().toISOString().split('T')[0],
          url: url
        });
      }
    });

    console.log(`Found ${news.length} Bloter articles:`, news.map(n => ({ title: n.title.substring(0, 30), url: n.url })));

    return NextResponse.json({
      success: true,
      data: news,
      count: news.length
    });
  } catch (error) {
    console.error('Bloter scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape news', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
