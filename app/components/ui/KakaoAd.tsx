'use client';

interface KakaoAdProps {
  unitId: string;
  width: number;
  height: number;
}

export function KakaoAd({ unitId, width, height }: KakaoAdProps) {
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
