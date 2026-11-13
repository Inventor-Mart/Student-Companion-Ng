import React, { useState, useEffect } from 'react';
import {
  subscribeToOTAPopup,
  isPopupDismissedToday,
  markPopupDismissedToday
} from '../../services/otaService';
import { OTAPopupAnnouncement } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowRight,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
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
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    const unsub = subscribeToOTAPopup((item) => {
      if (item && item.isActive) {
        if (!isPopupDismissedToday(item.id)) {
          setPopup(item);
          setImgError(false);
          setShowDetails(false);
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

  const hasValidImage = Boolean(popup.imageUrl && !imgError);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={popup.title || 'Announcement Flyer'}
    >
      <div className="relative w-[96vw] max-w-5xl h-[92vh] h-[92dvh] bg-[#070D18] border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Floating High-Contrast Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 min-h-[44px] min-w-[44px] rounded-full bg-slate-950/85 hover:bg-slate-900 border border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer backdrop-blur-sm shadow-lg"
          title="Dismiss Announcement"
          aria-label="Close announcement flyer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Near-Fullscreen Uncropped Flyer Stage */}
        <div className="relative flex-1 min-h-0 w-full bg-[#050A14] flex items-center justify-center overflow-hidden p-1.5 sm:p-3">
          {hasValidImage ? (
            <img
              src={popup.imageUrl}
              alt={popup.title || 'Promotional Announcement Flyer'}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain rounded-xl select-none"
            />
          ) : (
            <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[#84E000]">
                <ImageIcon className="w-7 h-7" />
              </div>
              {popup.badge && (
                <span className="text-xs font-bold text-[#84E000] tracking-wide">
                  {popup.badge}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight text-balance">
                {popup.title}
              </h2>
              {popup.subtitle && (
                <p className="text-sm font-semibold text-emerald-300">
                  {popup.subtitle}
                </p>
              )}
              {popup.body && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {popup.body}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Optional Expandable Announcement Details */}
        {showDetails && popup.body && (
          <div className="shrink-0 max-h-40 overflow-y-auto border-t border-slate-800 bg-slate-950/95 px-4 py-3 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {popup.body}
          </div>
        )}

        {/* Compact Bottom CTA Bar */}
        <div className="shrink-0 border-t border-slate-800 bg-[#0A1220]/95 backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-3 flex flex-col gap-2">
          {(popup.title || popup.subtitle || popup.body) && (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white truncate">
                  {popup.badge && (
                    <span className="text-[#84E000] font-semibold shrink-0">
                      {popup.badge}
                    </span>
                  )}
                  {popup.badge && popup.title && (
                    <span className="text-slate-600 shrink-0" aria-hidden="true">·</span>
                  )}
                  <span className="truncate">{popup.title}</span>
                </div>
                {popup.subtitle && (
                  <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
                    {popup.subtitle}
                  </p>
                )}
              </div>

              {popup.body && hasValidImage && (
                <button
                  type="button"
                  onClick={() => setShowDetails(prev => !prev)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{showDetails ? 'Hide Details' : 'Details'}</span>
                  {showDetails ? (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <button
              type="button"
              onClick={handleCTA}
              className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#84E000] to-[#60A5FA] hover:from-[#76c700] hover:to-[#3B82F6] text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#84E000]/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{popup.ctaText || 'Learn More & Proceed'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400 shrink-0">
              <button
                type="button"
                onClick={() => setDontShowToday(!dontShowToday)}
                className="min-h-[40px] px-1 flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer select-none text-[11px] whitespace-nowrap"
              >
                {dontShowToday ? (
                  <CheckSquare className="w-4 h-4 text-[#84E000] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Don&apos;t show today</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="min-h-[40px] px-2 text-slate-400 hover:text-white text-[11px] font-semibold underline cursor-pointer whitespace-nowrap"
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
