import React from 'react';
import { NPCS } from '../constants';

const NpcList: React.FC = () => {
  return (
    <section className="py-12 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center border-b-2 border-pink-500 inline-block pb-2 px-8">
        주변 인물
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NPCS.map((npc, idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-slate-200 group flex flex-col">
            <div className="h-80 overflow-hidden relative shrink-0">
                <img 
                    src={npc.imagePlaceholder} 
                    alt={npc.name} 
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${npc.name === '뽀삐' ? 'object-top' : 'object-center'}`}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex flex-col gap-2 mb-3">
                    <h3 className="font-bold text-lg text-slate-900">{npc.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {npc.relation.startsWith('#') ? (
                             npc.relation.split('#').filter(t => t.trim() !== '').map((tag, i) => (
                                <span key={i} className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded border border-pink-200">
                                    #{tag.trim()}
                                </span>
                             ))
                        ) : (
                            <span className="text-xs font-mono bg-pink-500 px-2 py-0.5 rounded text-white self-start">{npc.relation}</span>
                        )}
                    </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-auto">
                    {npc.description}
                </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NpcList;