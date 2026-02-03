import React from 'react';

const WarningBanner: React.FC = () => {
  const items = [
    "⚠ OPERATION: HEART HEIST ⚠",
    "타겟: 42세 곽용철 (특이사항: 금사빠, 보이스피싱 취약)",
    "⚠ OPERATION: HEART HEIST ⚠",
    "주의: 너무 귀여워서 역으로 당할 수 있음",
    "⚠ OPERATION: HEART HEIST ⚠",
    "작전 개시: 아저씨 꼬시기"
  ];

  return (
    <div className="bg-pink-500 text-white overflow-hidden py-1 border-y-2 border-black sticky top-0 z-50 flex select-none">
      <div className="animate-marquee whitespace-nowrap flex gap-8 font-bold tracking-wider min-w-full shrink-0 items-center px-4">
        {items.map((text, i) => <span key={i}>{text}</span>)}
      </div>
      <div className="animate-marquee whitespace-nowrap flex gap-8 font-bold tracking-wider min-w-full shrink-0 items-center px-4" aria-hidden="true">
        {items.map((text, i) => <span key={`dup-${i}`}>{text}</span>)}
      </div>
    </div>
  );
};

export default WarningBanner;