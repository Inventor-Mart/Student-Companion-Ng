import React, { useState, useRef } from 'react';
import { compressImageFile, formatBytes, CompressionResult } from '../../utils/imageCompressor';
import {
  Upload,
  Image as ImageIcon,
  Link,
  CheckCircle2,
  Trash2,
  Camera,
  Layers,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface DeviceImageUploaderProps {
  currentImageUrl: string;
  onImageChange: (url: string) => void;
  presets?: { label: string; url: string }[];
}

export const DeviceImageUploader: React.FC<DeviceImageUploaderProps> = ({
  currentImageUrl,
  onImageChange,
  presets = []
}) => {
  const [mode, setMode] = useState<'device' | 'presets' | 'url'>('device');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionStats, setCompressionStats] = useState<CompressionResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setUploadError(null);
    setIsCompressing(true);

    try {
      const result = await compressImageFile(file, 1200, 1200, 0.82);
      setCompressionStats(result);
      onImageChange(result.dataUrl);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to process image file');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-[11px]">
        <button
          type="button"
          onClick={() => setMode('device')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded font-bold transition-all cursor-pointer ${
            mode === 'device'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Device Upload</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('presets')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded font-bold transition-all cursor-pointer ${
            mode === 'presets'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Presets</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded font-bold transition-all cursor-pointer ${
            mode === 'url'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>Web URL</span>
        </button>
      </div>

      {/* MODE 1: DEVICE LOCAL UPLOAD */}
      {mode === 'device' && (
        <div className="flex flex-col gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
              isDragging
                ? 'border-[#84E000] bg-emerald-950/30 scale-[1.01]'
                : 'border-slate-700 bg-slate-950/60 hover:border-slate-500 hover:bg-slate-950'
            }`}
          >
            {isCompressing ? (
              <div className="flex flex-col items-center gap-2 text-slate-300 py-3">
                <Loader2 className="w-6 h-6 text-[#84E000] animate-spin" />
                <span className="text-xs font-semibold">Auto-compressing image on device...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[#84E000] shadow">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white">
                    Tap to Choose Photo or Snap Camera
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Drag and drop file here · Automatic client compression to ~100KB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Compression Feedback Badge */}
          {compressionStats && (
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between text-[11px] text-emerald-200">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000]" />
                <span>Optimized & Ready for Cloud Sync</span>
              </span>
              <span className="font-mono text-[10px]">
                {formatBytes(compressionStats.originalSizeBytes)} → {formatBytes(compressionStats.compressedSizeBytes)} ({compressionStats.reductionPercentage}% saved)
              </span>
            </div>
          )}

          {uploadError && (
            <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: PRESET BANNERS */}
      {mode === 'presets' && (
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCompressionStats(null);
                onImageChange(preset.url);
              }}
              className={`p-2 rounded-lg text-left text-[11px] border transition-colors cursor-pointer flex flex-col gap-1.5 ${
                currentImageUrl === preset.url
                  ? 'bg-[#14233C] border-[#84E000] text-[#84E000]'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="w-full h-16 rounded overflow-hidden bg-slate-900">
                <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold line-clamp-1">{preset.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* MODE 3: DIRECT WEB URL */}
      {mode === 'url' && (
        <div className="flex flex-col gap-1.5">
          <input
            type="url"
            value={currentImageUrl.startsWith('data:') ? '' : currentImageUrl}
            onChange={(e) => {
              setCompressionStats(null);
              onImageChange(e.target.value);
            }}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 font-mono text-[11px]"
          />
          <span className="text-[10px] text-slate-400">
            Paste any direct HTTPS image address (e.g. Unsplash, CDN, or Cloudinary).
          </span>
        </div>
      )}

      {/* Live Selected Image Preview */}
      {currentImageUrl && (
        <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex flex-col">
          <div className="px-2.5 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-200">
              Active Flyer Asset (Uncropped)
            </span>
            <button
              type="button"
              onClick={() => {
                onImageChange('');
                setCompressionStats(null);
              }}
              className="px-2 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
              title="Clear Image"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove</span>
            </button>
          </div>
          <div className="w-full h-56 p-1.5 bg-[#050A14] flex items-center justify-center">
            <img
              src={currentImageUrl}
              alt="Current Flyer Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};
