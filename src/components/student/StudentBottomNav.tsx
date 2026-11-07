import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, BookOpen, Award, Trophy, Users, Gamepad2, Atom, Sparkles, MessageSquare } from 'lucide-react';

export const StudentBottomNav: React.FC = () => {
  const { activeStudentTab, setActiveStudentTab } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: LayoutDashboard
    },
    {
      id: 'community',
      label: 'Forum',
      icon: MessageSquare,
      isLive: true
    },
    {
      id: 'ai-coach',
      label: 'AI Coach',
      icon: Sparkles
    },
    {
      id: 'syllabus',
      label: 'Syllabus',
      icon: BookOpen
    },
    {
      id: 'cbt',
      label: 'CBT Drills',
      icon: Award
    },
    {
      id: 'tutors',
      label: 'Tutors',
      icon: Users
    },
    {
      id: 'formulas',
      label: 'Formulas',
      icon: Atom
    },
    {
      id: 'competitions',
      label: 'Contest',
      icon: Trophy
    },
    {
      id: 'games',
      label: 'Games',
      icon: Gamepad2
    }
  ] as const;

  return (
    <nav className="w-full bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-1 py-1.5 flex items-center justify-around shrink-0 z-30 select-none">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeStudentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveStudentTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[38px] min-h-[42px] px-0.5 rounded-xl transition-all duration-150 cursor-pointer ${
              isActive
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1 rounded-lg relative transition-colors ${
                isActive ? 'bg-emerald-950/70 border border-emerald-800/50 text-emerald-400' : 'bg-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {'isLive' in item && item.isLive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse ring-2 ring-slate-950" />
              )}
            </div>
            <span className="text-[9px] tracking-tight mt-0.5 leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
