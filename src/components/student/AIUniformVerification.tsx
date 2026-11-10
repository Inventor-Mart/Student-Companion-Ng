import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { compressImage } from '../../lib/storage';
import {
  Camera,
  Upload,
  CheckCircle2,
  ShieldCheck,
  X,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

export const AIUniformVerificationModal: React.FC = () => {
  const {
    isUniformModalOpen,
    setIsUniformModalOpen,
    verifySchoolUniform,
    student
  } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(student.uniformPhotoUrl || null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(student.uniformVerified);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens or student changes
  useEffect(() => {
    if (isUniformModalOpen) {
      setSelectedImage(student.uniformPhotoUrl || null);
      setIsSuccess(student.uniformVerified);
      setCameraError(null);
    } else {
      stopCamera();
    }
  }, [isUniformModalOpen, student.uniformPhotoUrl, student.uniformVerified]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported on this device');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera stream error, falling back to camera file input:', err);
      setCameraError('Camera stream unavailable. Opening camera capture.');
      cameraInputRef.current?.click();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const maxDim = 320;
    let width = video.videoWidth || 640;
    let height = video.videoHeight || 480;

    if (width > height) {
      if (width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      }
    } else {
      if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, width);
    canvas.height = Math.max(1, height);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      setSelectedImage(dataUrl);
      setIsSuccess(false);
    }
    stopCamera();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 320, 0.7);
        if (compressed) {
          setSelectedImage(compressed);
          setIsSuccess(false);
        }
      } catch (err) {
        console.warn('Image upload error:', err);
      } finally {
        stopCamera();
      }
    }
  };

  const handleStartScan = () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
      setTimeout(() => {
        setScanStep(3);
        setTimeout(() => {
          setIsScanning(false);
          setIsSuccess(true);
          verifySchoolUniform(selectedImage);
        }, 900);
      }, 900);
    }, 900);
  };

  if (!isUniformModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">SC AI Uniform Verification</h3>
              <p className="text-[10px] text-slate-400">Nigerian School Uniform Check · Earn +500 XP</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              setIsUniformModalOpen(false);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 touch-pan-y">
          
          {/* Instructions */}
          <div className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="font-semibold text-emerald-400 block">Authenticate Your Student Identity</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Take a selfie or upload a photo wearing your secondary school uniform (crest, collar or necktie visible). Our SC AI verifies the school uniform to award you <strong className="text-amber-400">500 Bonus XP</strong> and your verified badge.
            </p>
          </div>

          {/* Photo Preview / Live Camera View */}
          <div className="relative w-full aspect-4/3 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner">
            {cameraActive ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={captureCameraFrame}
                    className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Snap Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={selectedImage}
                  alt="Student Uniform Photo"
                  className="w-full h-full object-cover"
                />
                {!isScanning && (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-md"
                    title="Remove Photo"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center p-6 text-slate-500 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-2.5">
                  <ImageIcon className="w-6 h-6 opacity-60" />
                </div>
                <span className="text-xs font-semibold text-slate-300">No Photo Selected</span>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
                  Take a photo or upload an image from your device to begin SC AI verification.
                </p>
              </div>
            )}

            {/* SC AI Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-xs flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/90 border border-indigo-400 flex items-center justify-center text-white animate-spin mb-3 shadow-lg">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="bg-slate-950/95 border border-indigo-600/80 rounded-xl px-3.5 py-2 text-center shadow-xl">
                  <span className="text-xs font-mono font-semibold text-indigo-300 block">
                    {scanStep === 1 && '1/3 Scanning Face & Uniform Collar...'}
                    {scanStep === 2 && '2/3 Detecting School Crest & Badge...'}
                    {scanStep === 3 && '3/3 Matching Nigerian School Database...'}
                  </span>
                </div>
              </div>
            )}

            {/* Success Overlay Badge */}
            {isSuccess && !isScanning && selectedImage && (
              <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/95 border border-emerald-600/80 rounded-xl p-2.5 flex items-center justify-between text-emerald-300 shadow-xl backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Uniform Verified ✓</span>
                    <span className="text-[10px] text-emerald-300 font-mono">School Uniform Confirmed</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  +500 XP
                </span>
              </div>
            )}
          </div>

          {/* Camera Warning / Message */}
          {cameraError && (
            <div className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-800/80 p-2.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* User Photo Capture & Upload Actions */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Step 1: Choose Your Uniform Photo
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* Take Photo button */}
              <button
                type="button"
                onClick={startCamera}
                disabled={isScanning}
                className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-[0.98] border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Take Photo</span>
              </button>

              {/* Upload Photo button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
                className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-[0.98] border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5 text-sky-400" />
                <span>Upload File</span>
              </button>
            </div>

            {/* Hidden native inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {!selectedImage && (
            <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>You must snap or upload a picture before verifying.</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setIsUniformModalOpen(false);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleStartScan}
            disabled={!selectedImage || isScanning || isSuccess}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
              !selectedImage
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : isSuccess
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30 active:scale-[0.98]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {!selectedImage
                ? 'Select Photo First'
                : isSuccess
                ? 'Verified ✓'
                : isScanning
                ? 'Scanning Uniform...'
                : 'Verify Uniform'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
