import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const symbols = ['NVDA', 'SNDK', 'GOOGL', 'TSLA'];
    const stocks: any[] = [];

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      try {
        if (i > 0) {
          await delay(200);
        }

        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
          {
            next: { revalidate: 17280 }
          }
        );

        const data = await response.json();

        if (data['Global Quote']) {
          const quote = data['Global Quote'];
          const price = parseFloat(quote['05. price'] || '0');
          const change = parseFloat(quote['09. change'] || '0');
          const changePercent = parseFloat(quote['10. change percent']?.replace('%', '') || '0');
          const volume = quote['06. volume'];

          if (price > 0) {
            stocks.push({
              symbol: quote['01. symbol'] || symbol,
              name: quote['01. symbol'] || symbol,
              price: price,
              change: change,
              changePercent: changePercent,
              volume: volume ? `${(parseInt(volume) / 1000000).toFixed(1)}M` : 'N/A'
            });
          }
        }
      } catch (err) {
        console.error(`Error fetching ${symbol}:`, err);
      }
    }

    console.log(`[${new Date().toISOString()}] Fetched ${stocks.length} watchlist stocks`);

    return NextResponse.json({
      success: true,
      data: stocks,
      count: stocks.length
    });
  } catch (error) {
    console.error('Watchlist fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
