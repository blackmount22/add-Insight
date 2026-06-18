'use client';

import { useEffect } from 'react';

interface KakaoAdProps {
  unitId: string;
  width: number;
  height: number;
}

export function KakaoAd({ unitId, width, height }: KakaoAdProps) {
  useEffect(() => {
    const scriptSrc = '//t1.kakaocdn.net/kas/static/ba.min.js';
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center my-4">
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={unitId}
        data-ad-width={String(width)}
        data-ad-height={String(height)}
      />
    </div>
  );
}
