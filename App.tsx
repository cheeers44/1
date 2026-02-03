import React, { useState } from 'react';
import WarningBanner from './components/WarningBanner';
import ProfileSection from './components/ProfileSection';
import NpcList from './components/NpcList';
import ChatSimulator from './components/ChatSimulator';
import IntroGlitch from './components/IntroGlitch';
import { HeartHandshake, Siren, LockKeyhole, Smartphone } from 'lucide-react';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-white pb-20 text-slate-900">
      {showIntro && <IntroGlitch onFinish={() => setShowIntro(false)} />}
      
      <WarningBanner />
      
      {/* Hero Section */}
      <header className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-block mb-4 p-3 bg-white rounded-full border border-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <Siren className="w-8 h-8 text-pink-500 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tight">
                LOVE <span className="text-pink-500 italic">SCAM</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                목표는 하나, 이 남자의 <span className="text-pink-500 font-bold line-through decoration-slate-400">돈</span>...아니 마음을 훔치세요.<br/>
                <span className="text-sm text-slate-500">난이도: ★☆☆☆☆</span>
            </p>
            <div className="flex justify-center gap-4 text-sm font-mono text-pink-500">
                <span>#로맨스_스캠</span>
                <span>#호구_잡기</span>
                <span>#갭모에</span>
                <span>#조폭_꼬시기</span>
            </div>
        </div>
      </header>

      <main className="space-y-16">
        {/* Profile */}
        <div id="profile">
            <ProfileSection />
        </div>

        {/* Secret Phone Section */}
        <div id="interaction" className="bg-slate-50 py-16 border-y border-slate-200">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold mb-4 border border-red-200">
                        <LockKeyhole className="w-3 h-3" /> SECURITY BREACH
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center md:justify-start gap-2">
                        <Smartphone className="text-pink-500" />
                        곽용철의 핸드폰 (잠금 해제됨)
                    </h2>
                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                        우리가 해킹에 성공했습니다! <br/>
                        그의 <b>검색 기록</b>과 <b>미전송 문자</b>를 몰래 훔쳐보세요.<br/>
                        무뚝뚝한 표정 뒤에 숨겨진 찌질하고 귀여운 속마음이 보일 겁니다.
                    </p>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 text-sm text-slate-600 inline-block text-left w-full shadow-lg">
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            🔍 관전 포인트
                        </h4>
                        <ul className="space-y-2 text-slate-500">
                            <li>• <b>비밀 검색:</b> 연애를 글로 배우는 아재의 처절한 노력</li>
                            <li>• <b>미전송 문자:</b> 썼다 지웠다 반복한 낯간지러운 멘트들</li>
                            <li>• <b>비밀 메모:</b> 까먹을까 봐 적어둔 귀여운 연애 팁과 일기</li>
                            <li>• <b>입출금 내역:</b> 거친 조폭의 반전 소비 습관</li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-1/2 w-full flex justify-center">
                    <ChatSimulator />
                </div>
            </div>
        </div>

        {/* NPCs */}
        <div id="npcs">
            <NpcList />
        </div>
      </main>

      <footer className="mt-20 py-8 text-center text-slate-500 text-sm border-t border-slate-200 bg-slate-50">
        <p className="flex items-center justify-center gap-2 mb-2">
            <HeartHandshake className="w-4 h-4" />
            Project: Honey Trap
        </p>
        <p>&copy; 2024 Love Scam Project. Scammers welcome.</p>
      </footer>
    </div>
  );
};

export default App;