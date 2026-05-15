'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader, ExternalLink } from 'lucide-react';

interface AINews {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export function AISection() {
  const [news, setNews] = useState<AINews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData: AINews[] = [
      {
        id: '1',
        title: 'LLM 최신 기술 발전 동향',
        source: 'AI Research',
        date: new Date().toISOString().split('T')[0],
        url: '#'
      },
      {
        id: '2',
        title: '멀티모달 AI 기술의 미래',
        source: 'Tech News',
        date: new Date().toISOString().split('T')[0],
        url: '#'
      },
      {
        id: '3',
        title: 'AI 안전 연구와 정렬 기술',
        source: 'AI Safety',
        date: new Date().toISOString().split('T')[0],
        url: '#'
      }
    ];

    setNews(mockData);
    setLoading(false);
  }, []);

  return (
    <Card title="🤖 AI 정보">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin text-cyan-500 mb-3" size={32} />
          <p className="text-slate-500 text-sm">로딩 중...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 bg-white border border-cyan-100 rounded-lg hover:border-cyan-300 hover:bg-cyan-50 transition duration-200"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 group-hover:text-cyan-600 line-clamp-2 text-sm leading-tight">
                  {item.title}
                </h4>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="inline-block px-2 py-1 bg-cyan-100 text-cyan-700 rounded-md font-medium">
                    {item.source}
                  </span>
                  <span className="text-slate-500">{item.date}</span>
                </div>
              </div>
              <ExternalLink size={16} className="flex-shrink-0 text-slate-400 group-hover:text-cyan-500 mt-0.5" />
            </a>
          ))}
        </div>
      )}
    </Card>
  );
}
