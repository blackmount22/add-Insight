'use client';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AddInsight
            </span>
            <p className="text-xs text-slate-400 leading-none mt-0.5">IT · AI · Market</p>
          </div>
        </div>

        {/* Nav Tags */}
        <nav className="hidden md:flex items-center gap-2">
          {[
            { label: 'IT 뉴스', color: 'bg-blue-100 text-blue-700' },
            { label: '경제 지표', color: 'bg-emerald-100 text-emerald-700' },
            { label: '미국 주식', color: 'bg-violet-100 text-violet-700' },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`text-xs font-medium px-3 py-1 rounded-full ${color}`}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Description */}
        <p className="hidden lg:block text-slate-500 text-sm max-w-xs text-right">
          IT·AI·미국 시장 정보를 한눈에 모아보는 실시간 대시보드
        </p>
      </div>
    </header>
  );
}
