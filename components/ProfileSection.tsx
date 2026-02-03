import React from 'react';
import { YONG_CHEOL } from '../constants';
import { Shield, Heart, Search, XCircle } from 'lucide-react';

const ProfileSection: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 relative">
        {/* Decorative Tape */}
        <div className="absolute top-4 right-[-30px] rotate-45 bg-red-600 text-white text-xs font-bold px-12 py-1 shadow-md z-10 border border-white/20">
          TARGET ACQUIRED
        </div>

        <div className="md:flex">
          {/* Image Side */}
          <div className="md:w-1/3 relative h-80 md:h-auto">
             <img 
                src="https://i.postimg.cc/R0nChKz6/gwag-yong.jpg" 
                alt="Kwack Yong-cheol" 
                className="w-full h-full object-cover filter brightness-90 contrast-110 object-top"
             />
          </div>

          {/* Info Side */}
          <div className="md:w-2/3 p-6 md:p-8 space-y-6">
            
            {/* Header (Replaces Stats) */}
            <div className="border-b border-slate-100 pb-4">
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{YONG_CHEOL.name}</h2>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-900 text-white text-xs font-bold rounded uppercase tracking-wider">Role</span>
                    <p className="text-pink-600 font-bold text-lg">{YONG_CHEOL.role}</p>
                </div>
            </div>

            {/* Appearance */}
            <div>
                <h3 className="text-slate-400 font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
                    <Search className="w-3 h-3" /> 식별 정보 (외형)
                </h3>
                <ul className="text-slate-700 text-sm list-disc pl-5 space-y-1">
                    {YONG_CHEOL.appearance.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

             {/* Personality */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-blue-600 font-bold flex items-center gap-2 mb-2 text-sm">
                        <Shield className="w-4 h-4" /> 방어 기제 (겉모습)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {YONG_CHEOL.personality.outer.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-xs rounded border border-slate-200 text-slate-600">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-pink-600 font-bold flex items-center gap-2 mb-2 text-sm">
                        <Heart className="w-4 h-4" /> 공략 포인트 (속마음)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {YONG_CHEOL.personality.inner.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-pink-50 text-xs rounded border border-pink-200 text-pink-600">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
             </div>

             {/* Likes/Dislikes */}
             <div className="pt-4 border-t border-slate-200">
                 <div className="flex justify-between items-start text-sm">
                    <div className="w-1/2 pr-2">
                        <span className="block text-green-600 font-bold mb-1">LIKES (미끼)</span>
                        <p className="text-slate-600 leading-relaxed">
                            {YONG_CHEOL.likes.join(", ")}
                        </p>
                    </div>
                    <div className="w-1/2 pl-2 border-l border-slate-200">
                        <span className="block text-red-500 font-bold mb-1 flex items-center gap-1">
                             <XCircle className="w-3 h-3"/> DISLIKES (주의)
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                            {YONG_CHEOL.dislikes.join(", ")}
                        </p>
                    </div>
                 </div>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;