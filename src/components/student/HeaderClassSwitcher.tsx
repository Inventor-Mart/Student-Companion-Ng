import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NigerianClassLevel } from '../../types';
import { GraduationCap, ChevronDown } from 'lucide-react';

export const HeaderClassSwitcher: React.FC = () => {
  const { student, updateStudentClass } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const classes: { level: NigerianClassLevel; stage: string; desc: string }[] = [
    { level: 'JSS 1', stage: 'Junior', desc: 'First Year Foundation' },
    { level: 'JSS 2', stage: 'Junior', desc: 'Intermediate Scheme' },
    { level: 'JSS 3', stage: 'Junior', desc: 'BECE Examination Prep' },
    { level: 'SS 1', stage: 'Senior', desc: 'Senior Specialization' },
    { level: 'SS 2', stage: 'Senior', desc: 'Advanced Secondary' },
    { level: 'SS 3', stage: 'Senior', desc: 'WAEC / JAMB UTME Prep' }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (lvl: NigerianClassLevel) => {
    updateStudentClass(lvl, lvl.startsWith('JSS') ? 'Junior' : (student.stream === 'Junior' ? 'Science' : (student.stream || 'Science')));
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101C33] hover:bg-[#182947] border border-[#233A5E] hover:border-[#84E000]/60 text-slate-200 transition-all cursor-pointer shadow-sm active:scale-95 text-xs font-semibold"
        title="Switch Secondary School Class"
        aria-expanded={isOpen}
      >
        <GraduationCap className="w-3.5 h-3.5 text-[#84E000]" />
        <span className="font-bold text-white">{student.classLevel || 'JSS 1'}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-[#0B1527] border border-[#233B62] rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
          <div className="px-2 py-1.5 border-b border-slate-800/80 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Select Active Class
            </span>
            <span className="text-[10px] text-[#84E000] font-semibold">All 6 Unlocked</span>
          </div>

          {/* Junior Section */}
          <div className="mb-2">
            <div className="px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Junior Secondary (BECE)
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1">
              {classes.slice(0, 3).map((item) => {
                const isActive = student.classLevel === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => handleSelect(item.level)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-[#84E000] text-slate-950 shadow-md shadow-[#84E000]/30 ring-1 ring-white'
                        : 'bg-[#121F36] hover:bg-[#1A2C4C] text-slate-200 hover:text-white border border-[#213554]'
                    }`}
                  >
                    <span>{item.level}</span>
                    <span className={`text-[8px] font-medium leading-none mt-0.5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                      Junior
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Senior Section */}
          <div>
            <div className="px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Senior Secondary (WAEC / JAMB)
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1">
              {classes.slice(3).map((item) => {
                const isActive = student.classLevel === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => handleSelect(item.level)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-[#84E000] text-slate-950 shadow-md shadow-[#84E000]/30 ring-1 ring-white'
                        : 'bg-[#121F36] hover:bg-[#1A2C4C] text-slate-200 hover:text-white border border-[#213554]'
                    }`}
                  >
                    <span>{item.level}</span>
                    <span className={`text-[8px] font-medium leading-none mt-0.5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                      Senior
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
