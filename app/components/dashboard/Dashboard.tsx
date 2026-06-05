'use client';

import { ITSection } from '@/components/sections/IT-section';
import { TradingKeySection } from '@/components/sections/TradingKey-section';
import { USStockSection } from '@/components/sections/USStock-section';

export function Dashboard() {
  const currentTime = new Date().toLocaleString('ko-KR', { timeZone: 'America/New_York' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AddInsight
              </span>
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              IT 뉴스, 경제 뉴스, 거래 정보의 실시간 정보
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ITSection />
          <TradingKeySection />
          <USStockSection />
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-sm">
            마지막 업데이트: <span className="font-medium text-slate-700">{currentTime}</span>
          </p>
          <p className="text-slate-400 text-xs">
            정보는 실시간으로 업데이트됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
