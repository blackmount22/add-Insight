'use client';

import { ITSection } from '@/components/sections/IT-section';
import { TradingKeySection } from '@/components/sections/TradingKey-section';
import { USStockSection } from '@/components/sections/USStock-section';
import { KakaoAd } from '@/components/ui/KakaoAd';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export function Dashboard() {
  const currentTime = new Date().toLocaleString('ko-KR', { timeZone: 'America/New_York' });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Header />

      <main className="flex-1 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                실시간 정보 대시보드
              </span>
            </h1>
            <p className="text-slate-500 text-base">
              IT 뉴스 · 경제 지표 · 미국 주식 시장을 한눈에
            </p>
            <p className="text-slate-400 text-sm mt-1">
              마지막 업데이트: <span className="font-medium text-slate-600">{currentTime}</span> (ET)
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <ITSection />
            <TradingKeySection />
            <USStockSection />
          </div>

          {/* Kakao Ad */}
          <KakaoAd unitId="DAN-LruCBlsEi3vh4GMN" width={300} height={250} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
