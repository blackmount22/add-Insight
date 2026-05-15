'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader, ExternalLink } from 'lucide-react';

interface ITNews {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export function ITSection() {
  const [news, setNews] = useState<ITNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news/bloter');
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
            title: '블로터 - IT과학 최신 뉴스를 확인하세요',
            source: 'Bloter',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm'
          },
          {
            id: '2',
            title: '기술 및 과학 분야 최신 소식',
            source: 'Bloter',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm'
          },
          {
            id: '3',
            title: '혁신과 기술 트렌드 분석',
            source: 'Bloter',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm'
          },
          {
            id: '4',
            title: '스타트업 및 IT 기업 뉴스',
            source: 'Bloter',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm'
          },
          {
            id: '5',
            title: '과학 기술 발전 소식',
            source: 'Bloter',
            date: new Date().toISOString().split('T')[0],
            url: 'https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="💻 IT 뉴스">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin text-blue-500 mb-3" size={32} />
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
                  className={`group flex items-start gap-3 p-3 bg-white border border-blue-100 rounded-lg transition duration-200 ${
                    isValidUrl
                      ? 'hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 line-clamp-2 text-sm leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
                        {item.source}
                      </span>
                      <span className="text-slate-500">{item.date}</span>
                    </div>
                  </div>
                  <ExternalLink size={16} className="flex-shrink-0 text-slate-400 group-hover:text-blue-500 mt-0.5" />
                </a>
              );
            })
          )}
        </div>
      )}
    </Card>
  );
}
