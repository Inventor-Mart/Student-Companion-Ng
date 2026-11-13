import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Lock } from 'lucide-react';

export const HeaderClassSwitcher: React.FC = () => {
  const { student } = useApp();

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101C33] border border-[#233A5E] text-slate-200 text-xs font-semibold shadow-sm"
      title="Enrolled class level"
    >
      <GraduationCap className="w-3.5 h-3.5 text-[#84E000]" />
      <span className="font-bold text-white">{student.classLevel || 'JSS 1'}</span>
      <Lock className="w-2.5 h-2.5 text-[#84E000]/80" />
    </div>
  );
};

