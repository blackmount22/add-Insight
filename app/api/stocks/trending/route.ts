import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`,
      {
        next: { revalidate: 17280 }
      }
    );

    const data = await response.json();
    const stocks: any[] = [];

    if (data.most_actively_traded) {
      const mostActive = data.most_actively_traded.slice(0, 5);

      mostActive.forEach((item: any) => {
        const price = parseFloat(item.price || '0');
        const change = parseFloat(item.change || '0');
        const changePercent = parseFloat(item['change percent']?.replace('%', '') || '0');

        if (price > 0) {
          stocks.push({
            symbol: item.ticker || 'N/A',
            name: item.ticker || 'N/A',
            price: price,
            change: change,
            changePercent: changePercent,
            volume: 'N/A'
          });
        }
      });
    }

    console.log(`Found ${stocks.length} trending stocks:`, stocks.map(s => `${s.symbol} $${s.price}`));

    return NextResponse.json({
      success: true,
      data: stocks,
      count: stocks.length
    });
  } catch (error) {
    console.error('Trending stocks fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending stocks', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
