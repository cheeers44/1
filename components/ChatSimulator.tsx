import React, { useState, useRef } from 'react';
import { Search, MessageCircle, StickyNote, CreditCard, Battery, Signal, Wifi, ChevronLeft, Lock } from 'lucide-react';
import { STATIC_PHONE_DATA } from '../constants';
import { AppType } from '../types';

const ChatSimulator: React.FC = () => {
  const [currentApp, setCurrentApp] = useState<AppType | null>(null);
  const [content, setContent] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to get all static items shuffled
  const getAllContent = (app: AppType) => {
    const items = STATIC_PHONE_DATA[app] || [];
    // Return ALL items shuffled
    return [...items].sort(() => 0.5 - Math.random());
  };

  const openApp = (app: AppType) => {
    setCurrentApp(app);
    setContent(getAllContent(app)); // Load everything instantly
  };

  const closeApp = () => {
    setCurrentApp(null);
    setContent([]);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center py-4">
      {/* Phone Bezel */}
      <div className="relative w-[340px] h-[680px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-700/50">
        
        {/* Notch & Status Bar */}
        <div className="absolute top-0 inset-x-0 h-8 bg-black z-30 flex justify-between items-center px-6 text-[11px] text-white font-medium select-none">
            <span>{getCurrentTime()}</span>
            <div className="flex gap-1.5">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-3.5 h-3.5" />
            </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-xl z-30"></div>

        {/* Screen Content */}
        <div className="w-full h-full bg-slate-950 relative text-white font-sans">
            
            {/* Wallpaper */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://i.postimg.cc/vH68zCB6/baegyeong.jpg" 
                    className="w-full h-full object-cover opacity-60" 
                    alt="Wallpaper" 
                    referrerPolicy="no-referrer"
                />
            </div>

            {/* Home Screen */}
            {!currentApp && (
                <div className="relative z-10 h-full flex flex-col pt-20 pb-10 px-6 animate-fade-in">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 text-slate-300 text-sm mb-2 opacity-80">
                             <Lock className="w-3 h-3" /> Unlocked
                        </div>
                        <h2 className="text-5xl font-thin tracking-tighter text-white drop-shadow-md">11월 19일</h2>
                        <p className="text-pink-400 text-sm mt-2 font-medium">♥ D+1 짝사랑 중</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-12 mt-auto mb-16">
                        <AppIcon 
                            icon={<Search className="w-8 h-8 text-white" />} 
                            label="비밀 검색" 
                            color="bg-green-600" 
                            onClick={() => openApp('search')} 
                        />
                        <AppIcon 
                            icon={<MessageCircle className="w-8 h-8 text-white" />} 
                            label="미전송 문자" 
                            color="bg-yellow-500" 
                            onClick={() => openApp('message')} 
                        />
                        <AppIcon 
                            icon={<StickyNote className="w-8 h-8 text-white" />} 
                            label="메모장" 
                            color="bg-amber-500" 
                            onClick={() => openApp('memo')} 
                        />
                        <AppIcon 
                            icon={<CreditCard className="w-8 h-8 text-white" />} 
                            label="입출금 내역" 
                            color="bg-blue-600" 
                            onClick={() => openApp('bank')} 
                        />
                    </div>
                </div>
            )}

            {/* In-App View */}
            {currentApp && (
                <div className="relative z-20 h-full bg-[#f2f4f6] text-slate-900 flex flex-col animate-slide-up">
                    {/* App Header */}
                    <div className="pt-12 pb-3 px-4 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center shadow-sm sticky top-0 z-30">
                        <button onClick={closeApp} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ChevronLeft className="w-6 h-6 text-slate-700" />
                        </button>
                        <h3 className="font-bold text-lg ml-1 capitalize text-slate-800">
                            {currentApp === 'search' ? 'N 검색' : 
                             currentApp === 'message' ? 'KTalk (나에게)' : 
                             currentApp === 'memo' ? '비밀 메모' : 'Toss Bank'}
                        </h3>
                    </div>

                    {/* App Content */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto overscroll-contain bg-[#f2f4f6]"
                    >
                        <div className="p-4 pb-20 space-y-3 min-h-max">
                            {content.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className={`
                                        transform transition-all duration-300 animate-fade-in-up
                                        ${currentApp === 'memo' ? 'bg-[#fff9c4] rotate-[0.5deg]' : 'bg-white'}
                                        ${currentApp === 'message' ? 'rounded-tl-none ml-2' : ''}
                                        p-4 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md
                                    `}
                                    style={{ animationDelay: `${idx * 30}ms` }}
                                >
                                    <div className="flex items-start gap-3">
                                        {currentApp === 'search' && <Search className="w-4 h-4 text-green-500 shrink-0 mt-1" />}
                                        {currentApp === 'message' && <MessageCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-1" />}
                                        {currentApp === 'memo' && <StickyNote className="w-4 h-4 text-amber-500 shrink-0 mt-1" />}
                                        {currentApp === 'bank' && <CreditCard className="w-4 h-4 text-blue-500 shrink-0 mt-1" />}
                                        
                                        <div className="flex-1">
                                            <p className={`text-[15px] leading-relaxed ${currentApp === 'memo' ? 'font-handwriting text-slate-800' : 'text-slate-700'}`}>
                                                {(() => {
                                                    // Handle Bank specific '|' separator
                                                    if (currentApp === 'bank') {
                                                        const parts = item.split('|');
                                                        if (parts.length > 1) {
                                                            return (
                                                                <>
                                                                    {parts[0]}
                                                                    <br />
                                                                    <span className="text-xs text-slate-500 italic block mt-1">
                                                                        "{parts[1]}"
                                                                    </span>
                                                                </>
                                                            );
                                                        }
                                                        return item;
                                                    }

                                                    // Handle general parenthesis comments for Search, Message, Memo
                                                    // Looks for " (" at the end of the string
                                                    const lastParenIndex = item.lastIndexOf(' (');
                                                    if (lastParenIndex !== -1 && item.endsWith(')')) {
                                                        const mainText = item.substring(0, lastParenIndex);
                                                        const subText = item.substring(lastParenIndex + 1);
                                                        
                                                        // Adjust color for Memo app readability
                                                        const subTextColor = currentApp === 'memo' ? 'text-slate-500' : 'text-slate-400';

                                                        return (
                                                            <>
                                                                {mainText}
                                                                <br />
                                                                <span className={`text-xs ${subTextColor} italic block mt-1`}>{subText}</span>
                                                            </>
                                                        );
                                                    }

                                                    return item;
                                                })()}
                                            </p>
                                            {currentApp === 'search' && (
                                                <span className="text-[10px] text-slate-400 mt-1 block">
                                                    11.19. {Math.floor(Math.random() * 12) + 10}:{Math.floor(Math.random() * 59).toString().padStart(2, '0')}
                                                </span>
                                            )}
                                            {currentApp === 'bank' && (
                                                <span className="text-[10px] text-slate-400 mt-1 block text-right">
                                                    잔액: {Math.floor(Math.random() * 5000000).toLocaleString()}원
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {content.length > 0 && (
                            <div className="text-center py-6 text-slate-400 text-xs">
                                <p>마지막 기록입니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/20 rounded-full z-40 backdrop-blur-md"></div>
        </div>
      </div>
    </div>
  );
};

const AppIcon: React.FC<{ icon: React.ReactNode, label: string, color: string, onClick: () => void }> = ({ icon, label, color, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center gap-3 group w-full">
        <div className={`${color} w-[72px] h-[72px] rounded-[1.2rem] flex items-center justify-center shadow-lg group-active:scale-90 transition-all duration-200 ring-offset-2 ring-offset-slate-900 group-focus:ring-2 ring-white/50`}>
            {icon}
        </div>
        <span className="text-white text-[13px] font-medium tracking-wide drop-shadow-md opacity-90 group-hover:opacity-100">{label}</span>
    </button>
);

export default ChatSimulator;