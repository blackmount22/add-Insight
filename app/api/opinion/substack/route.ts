import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [['media:content', 'media']],
  },
});

const RSS_FEED = 'https://www.hankyung.com/feed/economy';

export async function GET() {
  try {
    const result = await parser.parseURL(RSS_FEED);
    const articles: any[] = [];

    result.items?.slice(0, 5).forEach((item, idx) => {
      if (item.title && item.link) {
        articles.push({
          id: `hankyung-${idx}`,
          title: item.title.substring(0, 120),
          source: '한국경제',
          date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          url: item.link
        });
      }
    });

    console.log(`Found ${articles.length} articles from 한국경제:`, articles.map(a => ({ title: a.title.substring(0, 30) })));

    return NextResponse.json({
      success: true,
      data: articles,
      count: articles.length
    });
  } catch (error) {
    console.error('RSS parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
