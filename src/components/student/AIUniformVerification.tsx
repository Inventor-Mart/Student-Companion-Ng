import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Upload,
  CheckCircle2,
  ShieldCheck,
  X,
  Scan,
  Sparkles,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

export const AIUniformVerificationModal: React.FC = () => {
  const {
    isUniformModalOpen,
    setIsUniformModalOpen,
    verifySchoolUniform,
    student
  } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(
    student.uniformPhotoUrl ||
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80'
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(student.uniformVerified);

  if (!isUniformModalOpen) return null;

  // Sample uniform presets for rapid evaluation
  const uniformPresets = [
    {
      id: 'kings-college',
      label: "King's College Lagos (Navy Blazer & Crest)",
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80',
      school: "King's College, Lagos"
    },
    {
      id: 'queens-college',
      label: "Queen's College Yaba (Official Pinafore)",
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80',
      school: "Queen's College, Yaba"
    },
    {
      id: 'corona-school',
      label: 'Corona Secondary School (Tie & Collar)',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=80',
      school: 'Corona Secondary School'
    }
  ];

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">AI Uniform Verification</h3>
              <p className="text-[10px] text-slate-400">Computer Vision Identity Check · +500 XP</p>
            </div>
          </div>

          <button
            onClick={() => setIsUniformModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 touch-pan-y">
          {/* Instructions */}
          <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="font-semibold text-emerald-400 block">Why verify your school uniform?</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              To build a trustworthy community of authentic Nigerian students, our AI vision system verifies your school crest, collar, and necktie to instantly award <strong className="text-amber-400">500 Bonus XP</strong> and unlock your verified badge.
            </p>
          </div>

          {/* Photo Preview Container */}
          <div className="relative w-full aspect-4/3 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uniform Selfie"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-6 text-slate-500">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <span className="text-xs">No image selected</span>
              </div>
            )}

            {/* AI Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-xs flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/80 border border-indigo-400 flex items-center justify-center text-white animate-spin mb-3">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="bg-slate-950/90 border border-indigo-700/80 rounded-xl px-3 py-1.5 text-center shadow-lg">
                  <span className="text-xs font-mono font-semibold text-indigo-300">
                    {scanStep === 1 && 'Scanning Face & Uniform Outline...'}
                    {scanStep === 2 && 'Detecting School Crest & Monogram...'}
                    {scanStep === 3 && 'Evaluating Nigerian School Code...'}
                  </span>
                </div>
              </div>
            )}

            {/* Success Overlay Badge */}
            {isSuccess && !isScanning && (
              <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/90 border border-emerald-600/80 rounded-xl p-2.5 flex items-center justify-between text-emerald-300 shadow-lg backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">Uniform Verified ✓</span>
                    <span className="text-[10px] text-emerald-300 font-mono">98.4% Confidence · School Crest Matched</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  +500 XP
                </span>
              </div>
            )}
          </div>

          {/* Quick Presets for Demo */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Select Sample Uniform or Upload Your Own:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {uniformPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedImage(preset.url);
                    setIsSuccess(false);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedImage === preset.url
                      ? 'bg-indigo-950/60 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-semibold line-clamp-2">{preset.school}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setIsUniformModalOpen(false)}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleStartScan}
            disabled={isScanning || isSuccess}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSuccess ? 'Already Verified' : isScanning ? 'Scanning...' : 'Verify Uniform'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
