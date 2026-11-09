import React, { useState, useEffect } from 'react';
import {
  Video,
  HardDrive,
  Youtube,
  Download,
  ExternalLink,
  Check,
  AlertCircle,
  X,
  Loader2,
  Lock,
  Globe,
  EyeOff
} from 'lucide-react';
import {
  uploadLessonToGoogleDrive,
  uploadLessonToYouTube,
  downloadLocalRecordingBlob,
  DriveUploadResult,
  YouTubeUploadResult,
  RecordingMetadata
} from '../../services/lessonRecordingService';
import {
  getMediaAccessToken,
  getMediaEmail,
  signInWithGoogleMediaScopes
} from '../../lib/firebase';

interface SessionRecordingModalProps {
  videoBlob: Blob;
  metadata: RecordingMetadata;
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (driveResult: DriveUploadResult | null, ytResult: YouTubeUploadResult | null) => void;
}

export const SessionRecordingModal: React.FC<SessionRecordingModalProps> = ({
  videoBlob,
  metadata,
  isOpen,
  onClose,
  onUploadComplete
}) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Upload States
  const [isUploadingDrive, setIsUploadingDrive] = useState<boolean>(false);
  const [driveProgress, setDriveProgress] = useState<number>(0);
  const [driveResult, setDriveResult] = useState<DriveUploadResult | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);

  const [isUploadingYouTube, setIsUploadingYouTube] = useState<boolean>(false);
  const [youTubeProgress, setYouTubeProgress] = useState<number>(0);
  const [youTubeResult, setYouTubeResult] = useState<YouTubeUploadResult | null>(null);
  const [youTubeError, setYouTubeError] = useState<string | null>(null);
  const [privacyStatus, setPrivacyStatus] = useState<'unlisted' | 'private' | 'public'>('unlisted');

  // Target Account
  const targetEmail = 'studentcompanion.ng@gmail.com';
  const currentToken = getMediaAccessToken();
  const currentEmail = getMediaEmail();

  // Create temporary blob URL for video preview
  useEffect(() => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoBlob]);

  if (!isOpen) return null;

  // Sign in to Google with Media Scopes
  const handleGoogleConnect = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      await signInWithGoogleMediaScopes();
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to authenticate with Google Drive & YouTube');
    } finally {
      setIsSigningIn(false);
    }
  };

  // Start upload to Google Drive
  const handleUploadDrive = async () => {
    const token = getMediaAccessToken();
    if (!token) {
      setDriveError('Please connect your Google account first');
      return;
    }

    setIsUploadingDrive(true);
    setDriveError(null);
    try {
      const result = await uploadLessonToGoogleDrive(token, videoBlob, metadata, setDriveProgress);
      setDriveResult(result);
      onUploadComplete?.(result, youTubeResult);
    } catch (err: any) {
      setDriveError(err?.message || 'Failed to upload video to Google Drive');
    } finally {
      setIsUploadingDrive(false);
    }
  };

  // Start upload to YouTube Channel
  const handleUploadYouTube = async () => {
    const token = getMediaAccessToken();
    if (!token) {
      setYouTubeError('Please connect your Google account first');
      return;
    }

    setIsUploadingYouTube(true);
    setYouTubeError(null);
    try {
      const result = await uploadLessonToYouTube(token, videoBlob, metadata, privacyStatus, setYouTubeProgress);
      setYouTubeResult(result);
      onUploadComplete?.(driveResult, result);
    } catch (err: any) {
      setYouTubeError(err?.message || 'Failed to upload video to YouTube channel');
    } finally {
      setIsUploadingYouTube(false);
    }
  };

  // Upload to both automatically
  const handleUploadAll = async () => {
    const token = getMediaAccessToken();
    if (!token) {
      handleGoogleConnect();
      return;
    }

    handleUploadDrive();
    handleUploadYouTube();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-red-950/70 border border-red-800/60 text-red-400">
              <Video className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Live Lesson Recording Ready
              </h3>
              <p className="text-[11px] text-slate-400">
                {metadata.topic} · {metadata.subject || 'STEM'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Target Account Notice */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 font-medium">Cloud Target:</span>
              <strong className="text-emerald-300 font-mono text-[11px]">{targetEmail}</strong>
            </div>

            {currentToken ? (
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                <Check className="w-3 h-3 text-emerald-400" /> Connected as {currentEmail || targetEmail}
              </span>
            ) : (
              <button
                type="button"
                disabled={isSigningIn}
                onClick={handleGoogleConnect}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                {isSigningIn ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                <span>Connect Google Account</span>
              </button>
            )}
          </div>

          {authError && (
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Video Preview Player */}
          {videoUrl && (
            <div className="rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <video
                src={videoUrl}
                controls
                className="w-full max-h-56 object-contain"
                preload="metadata"
              />
            </div>
          )}

          {/* Cloud Upload Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* CARD 1: GOOGLE DRIVE */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <HardDrive className="w-4 h-4 text-sky-400" />
                    <span>Google Drive</span>
                  </div>
                  {driveResult && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Saved
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  Folder: <code className="text-slate-300">Student Companion - Live Lessons</code>
                </p>
              </div>

              {isUploadingDrive && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Uploading...</span>
                    <span>{driveProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 transition-all duration-300 rounded-full"
                      style={{ width: `${driveProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {driveError && (
                <p className="text-[10px] text-red-400 leading-tight">{driveError}</p>
              )}

              {driveResult ? (
                <a
                  href={driveResult.webViewLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-2 px-3 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-800 text-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled={isUploadingDrive}
                  onClick={handleUploadDrive}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isUploadingDrive ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <HardDrive className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{isUploadingDrive ? 'Sending to Drive...' : 'Save to Google Drive'}</span>
                </button>
              )}
            </div>

            {/* CARD 2: YOUTUBE CHANNEL */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube Channel</span>
                  </div>
                  {youTubeResult && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Published
                    </span>
                  )}
                </div>

                {/* Privacy Status Picker */}
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="text-[10px] text-slate-400">Privacy:</span>
                  {(['unlisted', 'private', 'public'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      disabled={Boolean(youTubeResult) || isUploadingYouTube}
                      onClick={() => setPrivacyStatus(p)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer ${
                        privacyStatus === p
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p === 'unlisted' ? 'Unlisted' : p === 'private' ? 'Private' : 'Public'}
                    </button>
                  ))}
                </div>
              </div>

              {isUploadingYouTube && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Uploading...</span>
                    <span>{youTubeProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-300 rounded-full"
                      style={{ width: `${youTubeProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {youTubeError && (
                <p className="text-[10px] text-red-400 leading-tight">{youTubeError}</p>
              )}

              {youTubeResult ? (
                <a
                  href={youTubeResult.watchUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-2 px-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled={isUploadingYouTube}
                  onClick={handleUploadYouTube}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isUploadingYouTube ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Youtube className="w-3.5 h-3.5 text-red-500" />}
                  <span>{isUploadingYouTube ? 'Uploading to Channel...' : 'Publish to YouTube'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Dual Action Button */}
          {!driveResult && !youTubeResult && (
            <button
              type="button"
              onClick={handleUploadAll}
              disabled={isUploadingDrive || isUploadingYouTube}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Upload to Both Google Drive & YouTube</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-t border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => downloadLocalRecordingBlob(videoBlob, metadata.topic)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            title="Always save a copy directly to your computer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download Local MP4 Backup</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
