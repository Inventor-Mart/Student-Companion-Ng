import React, { useState, useEffect } from 'react';
import {
  subscribeToOTAPopup,
  isPopupDismissedToday,
  markPopupDismissedToday
} from '../../services/otaService';
import { OTAPopupAnnouncement } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, ArrowRight, CheckSquare, Square } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PopupAnnouncementModalProps {
  onNavigateTab?: (tab: string) => void;
}

export const PopupAnnouncementModal: React.FC<PopupAnnouncementModalProps> = ({ onNavigateTab }) => {
  const { setActiveStudentTab } = useApp();
  const [popup, setPopup] = useState<OTAPopupAnnouncement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dontShowToday, setDontShowToday] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    const unsub = subscribeToOTAPopup((item) => {
      if (item && item.isActive) {
        if (!isPopupDismissedToday(item.id)) {
          setPopup(item);
          setIsOpen(true);
        }
      } else {
        setIsOpen(false);
      }
    });

    return () => unsub();
  }, []);

  if (!isOpen || !popup) return null;

  const handleClose = () => {
    if (dontShowToday) {
      markPopupDismissedToday(popup.id);
    }
    setIsOpen(false);
  };

  const handleCTA = () => {
    if (dontShowToday) {
      markPopupDismissedToday(popup.id);
    }
    setIsOpen(false);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    if (popup.ctaTargetTab) {
      if (onNavigateTab) {
        onNavigateTab(popup.ctaTargetTab);
      } else {
        setActiveStudentTab(popup.ctaTargetTab as any);
      }
    }
  };

  // Safe image fallback if flyer fails to load
  const flyerImage = !imgError && popup.imageUrl ? popup.imageUrl : 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0A1220] border border-[#1E2D4A] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer backdrop-blur-sm"
          title="Dismiss Announcement"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Visual Flyer Banner Image */}
        <div className="relative w-full h-44 sm:h-52 bg-slate-900 shrink-0 overflow-hidden">
          <img
            src={flyerImage}
            alt={popup.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-transparent to-black/30" />

          {/* Badge */}
          {popup.badge && (
            <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F1E36]/90 border border-[#84E000]/50 text-[#84E000] text-xs font-bold backdrop-blur-sm shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{popup.badge}</span>
            </div>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto flex flex-col gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
              {popup.title}
            </h2>
            {popup.subtitle && (
              <p className="text-xs sm:text-sm font-semibold text-[#84E000] mt-0.5">
                {popup.subtitle}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {popup.body}
          </p>

          {/* Action Button */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleCTA}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#84E000] to-[#60A5FA] hover:from-[#76c700] hover:to-[#3B82F6] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#84E000]/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{popup.ctaText || 'Learn More & Proceed'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Don't show again today checkbox */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => setDontShowToday(!dontShowToday)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer select-none text-[11px]"
              >
                {dontShowToday ? (
                  <CheckSquare className="w-3.5 h-3.5 text-[#84E000]" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>Don&apos;t show again today</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="text-slate-500 hover:text-slate-300 text-[11px] underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
