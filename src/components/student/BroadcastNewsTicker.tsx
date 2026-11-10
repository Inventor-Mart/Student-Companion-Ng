import React, { useState, useEffect } from 'react';
import { subscribeToOTABroadcasts } from '../../services/otaService';
import { OTABroadcastItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, Trophy, Zap, AlertCircle, ArrowUpRight } from 'lucide-react';

interface BroadcastNewsTickerProps {
  onNavigateTab?: (tab: string) => void;
}

export const BroadcastNewsTicker: React.FC<BroadcastNewsTickerProps> = ({ onNavigateTab }) => {
  const { setActiveStudentTab } = useApp();
  const [broadcastItems, setBroadcastItems] = useState<OTABroadcastItem[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const unsub = subscribeToOTABroadcasts((items) => {
      const activeOnly = items.filter(i => i.isActive);
      setBroadcastItems(activeOnly);
    });
    return () => unsub();
  }, []);

  if (broadcastItems.length === 0) return null;

  const handleItemClick = (item: OTABroadcastItem) => {
    if (item.actionTab) {
      if (onNavigateTab) {
        onNavigateTab(item.actionTab);
      } else {
        setActiveStudentTab(item.actionTab as any);
      }
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'championship':
        return <span className="text-[#84E000] font-black uppercase text-[10px] tracking-wider flex items-center gap-1"><Trophy className="w-3 h-3 text-[#84E000]" /> TOURNEY</span>;
      case 'academic':
        return <span className="text-sky-400 font-black uppercase text-[10px] tracking-wider flex items-center gap-1"><Zap className="w-3 h-3 text-sky-400" /> SYLLABUS</span>;
      case 'urgent':
        return <span className="text-rose-400 font-black uppercase text-[10px] tracking-wider flex items-center gap-1"><AlertCircle className="w-3 h-3 text-rose-400" /> ALERT</span>;
      case 'spotlight':
        return <span className="text-amber-400 font-black uppercase text-[10px] tracking-wider flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" /> LEADERBOARD</span>;
      default:
        return <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">NOTICE</span>;
    }
  };

  return (
    <div
      className="w-full bg-[#050B14] border-b border-[#1E293B] shadow-inner select-none flex items-stretch h-8.5 shrink-0 overflow-hidden relative z-20 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* TV News Anchor "LIVE" Block */}
      <div className="bg-[#B91C1C] text-white px-2.5 sm:px-3 flex items-center gap-1.5 shrink-0 font-black text-[11px] tracking-widest z-10 shadow-[2px_0_10px_rgba(0,0,0,0.5)]">
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span className="tracking-tighter">LIVE</span>
      </div>

      {/* Marquee Track */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        {/* Subtle Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#050B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#050B14] to-transparent z-10 pointer-events-none" />

        <div
          className={`flex items-center gap-8 whitespace-nowrap will-change-transform ${
            isPaused ? '' : 'animate-broadcast-scroll'
          }`}
          style={{
            animationDuration: `${Math.max(25, broadcastItems.length * 15)}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {/* Double array to create smooth seamless loop */}
          {[...broadcastItems, ...broadcastItems].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => handleItemClick(item)}
              className={`inline-flex items-center gap-2 text-xs text-slate-200 transition-colors py-1 px-1 rounded ${
                item.actionTab ? 'cursor-pointer hover:text-white hover:bg-slate-800/40' : ''
              }`}
            >
              <span className="shrink-0">{getCategoryBadge(item.category)}</span>
              <span className="font-medium text-slate-100">{item.text}</span>
              {item.actionTab && (
                <ArrowUpRight className="w-3 h-3 text-[#84E000] shrink-0 opacity-80 group-hover:opacity-100" />
              )}
              <span className="text-[#84E000]/60 mx-2 text-[10px]">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
