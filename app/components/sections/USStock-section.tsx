'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader, ExternalLink } from 'lucide-react';

interface Opinion {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export function USStockSection() {
  const [opinion, setOpinion] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpinion = async () => {
      try {
        const response = await fetch('/api/opinion/substack');
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          setOpinion(data.data);
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error('Failed to fetch opinion:', err);
        setOpinion([
          {
            id: '1',
            title: 'Substack - 유명 작가들의 최신 기사',
            source: 'Substack',
            date: new Date().toISOString().split('T')[0],
            url: 'https://substack.com'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOpinion();
    const interval = setInterval(fetchOpinion, 12 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="📈 경제 뉴스">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin text-indigo-500 mb-3" size={32} />
          <p className="text-slate-500 text-sm">로딩 중...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {opinion.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">오피니언을 불러올 수 없습니다.</p>
          ) : (
            opinion.map((item) => {
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
                  className={`group flex items-start gap-3 p-3 bg-white border border-indigo-100 rounded-lg transition duration-200 ${
                    isValidUrl
                      ? 'hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 line-clamp-2 text-sm leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium">
                        {item.source}
                      </span>
                      <span className="text-slate-500">{item.date}</span>
                    </div>
                  </div>
                  <ExternalLink size={16} className="flex-shrink-0 text-slate-400 group-hover:text-indigo-500 mt-0.5" />
                </a>
              );
            })
          )}
        </div>
      )}
    </Card>
  );
}
