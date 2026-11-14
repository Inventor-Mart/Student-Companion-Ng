import React from 'react';
import {
  Menu,
  WifiOff,
  Award,
  Gamepad2,
  FileCheck2,
  Users
} from 'lucide-react';

interface LandingPageProps {
  onOpenKnowMore: () => void;
  onGetStarted: () => void;
  onSignIn?: () => void;
  onDiscoverTutors: () => void;
  onSelectFeature?: (feature: 'games' | 'cbt' | 'tutors') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenKnowMore,
  onGetStarted,
  onSignIn,
  onDiscoverTutors,
  onSelectFeature
}) => {
  return (
    <div className="w-full min-h-screen bg-[#101C34] text-white flex flex-col items-center justify-between font-sans selection:bg-[#FF5B00] selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow positioned below hero to prevent seams */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#FF5B00]/8 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container - Responsive Mobile/Tablet Width */}
      <div className="w-full max-w-[450px] sm:max-w-[490px] min-h-screen flex flex-col justify-between px-5 sm:px-6 pt-3 sm:pt-4 pb-6 mx-auto relative z-10">
        
        {/* --- Top Bar: Logo & Hamburger Menu --- */}
        <header className="w-full flex items-center justify-between mb-1 sm:mb-2">
          {/* Logo with Cap and Wordmark */}
          <div className="flex items-center gap-2.5">
            {/* Custom SVG Graduation Cap Icon matching design */}
            <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                {/* Cap Base Ring in Lime Green */}
                <path
                  d="M10 21C10 24 14.5 26.5 20 26.5C25.5 26.5 30 24 30 21"
                  stroke="#84E000"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Cap Top Rhombus in Electric Orange */}
                <polygon
                  points="20,8 35,16 20,24 5,16"
                  fill="#FF5B00"
                />
                {/* Tassel in Orange with Green Dot */}
                <path
                  d="M31 18V24"
                  stroke="#FF5B00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="31" cy="24.5" r="1.5" fill="#84E000" />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[16px] sm:text-[17px] font-extrabold text-white tracking-tight">Student</span>
                <span className="text-[16px] sm:text-[17px] font-extrabold text-[#84E000] tracking-tight">Companion</span>
              </div>
              <span className="text-xs font-medium text-slate-400 tracking-wide mt-0.5">
                Powered by WoW Tech
              </span>
            </div>
          </div>

          {/* Hamburger Menu Icon (Navigates to "Know More" Page) */}
          <button
            onClick={onOpenKnowMore}
            className="w-10 h-10 rounded-xl bg-[#162746] hover:bg-[#1E335A] active:scale-95 border border-[#233C68] flex items-center justify-center text-white transition-all shadow-md group cursor-pointer"
            title="Know More - Platform Overview"
            aria-label="Open Know More menu"
          >
            <Menu className="w-5 h-5 text-slate-200 group-hover:text-[#84E000] transition-colors" />
          </button>
        </header>

        {/* --- Hero Artwork Section (Full Width, Scaled, Seamless Integration) --- */}
        <div className="w-full flex items-center justify-center -mx-5 sm:-mx-6 my-0 relative overflow-visible">
          <img
            src="/assets/aistudio/hero_illustration_d825bf85.jpeg"
            alt="Student Companion Nigerian Learner with tablet"
            className="w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] max-w-none h-auto object-contain select-none pointer-events-none scale-105"
            loading="eager"
          />
        </div>

        {/* --- Headline & Subtitle --- */}
        <div className="w-full flex flex-col mt-2">
          {/* Main Title with Dual Accent Colors */}
          <div className="flex items-center justify-between">
            <h1 className="text-[34px] sm:text-[38px] font-black leading-[1.08] tracking-tight text-white">
              Learn, <span className="text-[#FF5B00]">Play</span>
              <br />
              & <span className="text-[#FF5B00]">Master</span>
            </h1>

            {/* Decorative Rings / Dots matching concept art */}
            <div className="flex items-center gap-1.5 self-center pb-2 pr-2">
              <div className="w-4 h-4 rounded-full border-2 border-[#FF5B00]" />
              <div className="w-2 h-2 rounded-full bg-[#84E000]" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-[13px] sm:text-[14px] text-[#8E9CAE] font-normal mt-2.5 leading-snug">
            The ultimate study companion for Nigerian students (JSS1 – SS3)
          </p>

          {/* Metadata Badges / Chips */}
          <div className="flex items-center gap-2 mt-3.5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121E33] border border-[#1E304F] text-[11px] font-medium text-slate-300">
              <WifiOff className="w-3.5 h-3.5 text-[#FF5B00]" />
              <span>Offline</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121E33] border border-[#1E304F] text-[11px] font-medium text-slate-300">
              <Award className="w-3.5 h-3.5 text-[#FF5B00]" />
              <span>Badge Shapes</span>
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="w-full flex flex-col gap-3 mt-5">
          {/* Primary Button: Solid Electric Orange */}
          <button
            onClick={onGetStarted}
            className="w-full py-3.5 px-6 rounded-full bg-[#FF5B00] hover:bg-[#e05000] active:scale-[0.98] text-white font-extrabold text-base tracking-wide shadow-lg shadow-[#FF5B00]/30 transition-all cursor-pointer text-center"
          >
            Get Started
          </button>

          {/* Secondary Button: Lime Green Border */}
          <button
            onClick={onDiscoverTutors}
            className="w-full py-3 px-6 rounded-full bg-[#101C34] hover:bg-[#84E000]/10 active:scale-[0.98] border-2 border-[#84E000] text-[#84E000] font-extrabold text-base tracking-wide transition-all cursor-pointer text-center"
          >
            Discover Tutors
          </button>

          {onSignIn && (
            <div className="w-full flex items-center justify-center pt-1">
              <button
                type="button"
                onClick={onSignIn}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer py-1.5 px-3"
              >
                Already have an account? <span className="text-[#84E000] font-bold hover:underline">Sign In</span>
              </button>
            </div>
          )}
        </div>

        {/* --- Bottom Feature Cards (3 Columns) --- */}
        <div className="w-full grid grid-cols-3 gap-2.5 mt-5">
          {/* Card 1: Gamified Learning (Lime Green Border) */}
          <button
            onClick={() => onSelectFeature?.('games')}
            className="flex flex-col justify-between p-2.5 rounded-2xl bg-[#0C172B] border-2 border-[#84E000] text-left hover:bg-[#84E000]/5 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center text-[#84E000] mb-2">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">
                Gamified
              </span>
              <span className="text-[11px] font-bold text-white block leading-tight">
                Learning
              </span>
            </div>
          </button>

          {/* Card 2: Exam Prep (Blue Border) */}
          <button
            onClick={() => onSelectFeature?.('cbt')}
            className="flex flex-col justify-between p-2.5 rounded-2xl bg-[#0C172B] border border-[#2563EB] text-left hover:bg-[#2563EB]/5 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center text-[#60A5FA] mb-2">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">
                Exam Prep
              </span>
              <span className="text-[8px] font-medium text-slate-400 block tracking-tight mt-0.5">
                WAEC, JAMB, NECO
              </span>
            </div>
          </button>

          {/* Card 3: Tutoring Marketplace (Orange Border) */}
          <button
            onClick={() => onSelectFeature?.('tutors')}
            className="flex flex-col justify-between p-2.5 rounded-2xl bg-[#0C172B] border border-[#FF5B00] text-left hover:bg-[#FF5B00]/5 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center text-[#FF5B00] mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">
                Tutoring
              </span>
              <span className="text-[11px] font-bold text-white block leading-tight">
                Marketplace
              </span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
