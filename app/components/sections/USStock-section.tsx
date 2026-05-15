'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader, TrendingUp, TrendingDown, Flame } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export function USStockSection() {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [trending, setTrending] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketStatus, setMarketStatus] = useState('상태 확인 중...');

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch('/api/stocks/watchlist');
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setWatchlist(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch watchlist:', err);
      }
    };

    const fetchTrending = async () => {
      try {
        const response = await fetch('/api/stocks/trending');
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setTrending(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch trending:', err);
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchWatchlist(), fetchTrending()]);
      setLoading(false);
    };

    fetchAll();

    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();

    if (day === 0 || day === 6) {
      setMarketStatus('장 마감 (주말)');
    } else if (hours >= 9 && hours < 16) {
      setMarketStatus('장 중 (EST: 오전 9:30 - 오후 4:00)');
    } else {
      setMarketStatus('장 마감');
    }

    const watchlistInterval = setInterval(fetchWatchlist, 17280000);
    const trendingInterval = setInterval(fetchTrending, 17280000);

    return () => {
      clearInterval(watchlistInterval);
      clearInterval(trendingInterval);
    };
  }, []);

  const StockRow = ({ stock, index }: { stock: Stock; index?: number }) => (
    <div className="flex items-center justify-between p-3 bg-white border border-green-100 rounded-lg hover:border-green-300 hover:bg-green-50 transition duration-200">
      <div className="flex-1">
        <div className="font-semibold text-slate-800 text-sm">
          {index !== undefined && <span className="text-amber-600 mr-2">#{index}</span>}
          {stock.symbol}
        </div>
        <div className="text-xs text-slate-600 line-clamp-1">{stock.name}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-slate-800 text-sm">${stock.price.toFixed(2)}</div>
        <div
          className={`flex items-center justify-end gap-1 text-xs font-medium ${
            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
        </div>
      </div>
    </div>
  );

  return (
    <Card title="📈 미국 주식">
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
        <span className="text-slate-700 font-medium">상태: </span>
        <span className="text-amber-600 font-semibold">{marketStatus}</span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin text-green-500 mb-3" size={32} />
          <p className="text-slate-500 text-sm">실시간 데이터 로딩 중...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Watchlist Section */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 px-1">
              관심 종목
            </div>
            <div className="space-y-2">
              {watchlist.length > 0 ? (
                watchlist.map((stock) => <StockRow key={stock.symbol} stock={stock} />)
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">데이터를 불러올 수 없습니다.</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200" />

          {/* Trending Section */}
          <div>
            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 px-1 flex items-center gap-1">
              <Flame size={14} /> NASDAQ 핫 종목
            </div>
            <div className="space-y-2">
              {trending.length > 0 ? (
                trending.map((stock, idx) => <StockRow key={stock.symbol} stock={stock} index={idx + 1} />)
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">데이터를 불러올 수 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
