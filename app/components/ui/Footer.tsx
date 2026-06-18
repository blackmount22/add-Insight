export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Site Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-white text-lg">AddInsight</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              IT 뉴스, AI 연구 동향, 미국 주식 시장 정보를 실시간으로 수집하여 한 곳에서 제공하는 정보 대시보드입니다.
            </p>
          </div>

          {/* Service Info */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">제공 정보</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                IT·개발 최신 뉴스 (Bloter 등)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                국내외 경제 지표 및 거래 정보
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                미국 주식 시장 실시간 데이터
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                AI 연구 동향 및 기술 정보
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">개발자</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/blackmount22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                  <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                    blackmount22
                  </p>
                  <p className="text-slate-500 text-xs">github.com/blackmount22</p>
                </div>
              </a>
              <p className="text-slate-500 text-xs leading-relaxed">
                오픈소스 기반으로 개발된 정보 집계 서비스입니다. 데이터는 공개 API 및 RSS를 통해 수집됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-xs">
            © {currentYear} AddInsight. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            본 사이트의 정보는 참고용이며 투자 판단의 책임은 이용자에게 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
