'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader, ExternalLink } from 'lucide-react';

interface TradingKeyNews {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export function TradingKeySection() {
  const [news, setNews] = useState<TradingKeyNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news/tradingkey');
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          setNews(data.data);
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setNews([
          {
            id: '1',
            title: 'TradingKey - 미국주식 최신 분석',
            source: 'TradingKey',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.tradingkey.com/kr/analysis/stocks/us-stocks'
          },
          {
            id: '2',
            title: '미국 주식 시장 분석',
            source: 'TradingKey',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.tradingkey.com/kr/analysis/stocks/us-stocks'
          },
          {
            id: '3',
            title: '기술주 투자 전략',
            source: 'TradingKey',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.tradingkey.com/kr/analysis/stocks/us-stocks'
          },
          {
            id: '4',
            title: '미국 경제 전망',
            source: 'TradingKey',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.tradingkey.com/kr/analysis/stocks/us-stocks'
          },
          {
            id: '5',
            title: '최신 주식 시장 뉴스',
            source: 'TradingKey',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.tradingkey.com/kr/analysis/stocks/us-stocks'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="📊 미국주식 분석">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin text-green-500 mb-3" size={32} />
          <p className="text-slate-500 text-sm">로딩 중...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {news.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">뉴스를 불러올 수 없습니다.</p>
          ) : (
            news.map((item) => {
              const href = item.url?.trim() || '';
              const isValidUrl = href && (href.startsWith('http://') || href.startsWith('https://'));

              return (
                <a
                  key={item.id}
                  href={isValidUrl ? href : 'javascript:void(0)'}
                  onClick={(e) => {
                    if (!isValidUrl) {
                      e.preventDefault();
                      console.warn('Invalid URL:', item.url);
                      return;
                    }
                    window.open(href, '_blank', 'noopener,noreferrer');
                    e.preventDefault();
                  }}
                  className={`group flex items-start gap-3 p-3 bg-white border border-green-100 rounded-lg transition duration-200 ${
                    isValidUrl
                      ? 'hover:border-green-300 hover:bg-green-50 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 group-hover:text-green-600 line-clamp-2 text-sm leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-md font-medium">
                        {item.source}
                      </span>
                      <span className="text-slate-500">{item.date}</span>
                    </div>
                  </div>
                  <ExternalLink size={16} className="flex-shrink-0 text-slate-400 group-hover:text-green-500 mt-0.5" />
                </a>
              );
            })
          )}
        </div>
      )}
    </Card>
  );
}
