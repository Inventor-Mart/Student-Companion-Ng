import React, { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { PersonaAvatar } from './PersonaAvatar';
import { compressAvatarImage } from '../../lib/storage';

interface EditablePersonaAvatarProps {
  name?: string | null;
  src?: string | null;
  alt?: string;
  fallbackInitials?: string;
  className?: string;
  textClassName?: string;
  buttonClassName?: string;
  onAvatarUpdated: (dataUrl: string) => Promise<void> | void;
  onError?: (message: string) => void;
  title?: string;
  showCameraBadge?: boolean;
  disabled?: boolean;
}

export const EditablePersonaAvatar: React.FC<EditablePersonaAvatarProps> = ({
  name,
  src,
  alt,
  fallbackInitials,
  className = 'w-12 h-12 rounded-2xl',
  textClassName = 'text-sm',
  buttonClassName = '',
  onAvatarUpdated,
  onError,
  title = 'Click to change profile picture',
  showCameraBadge = true,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input value so selecting the same image again still triggers onChange
    e.target.value = '';
    if (!file) return;

    setIsUploading(true);
    try {
      const compressed = await compressAvatarImage(file);
      await onAvatarUpdated(compressed);
    } catch (err: any) {
      const msg =
        err?.message || 'Unable to process this image. Please pick a JPG, PNG, or WebP photo.';
      onError?.(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative inline-flex shrink-0">
      <button
        type="button"
        disabled={disabled || isUploading}
        onClick={() => fileInputRef.current?.click()}
        title={title}
        aria-label={title}
        className={`relative group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101C34] transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-wait ${buttonClassName}`}
      >
        <PersonaAvatar
          name={name}
          src={src}
          alt={alt}
          fallbackInitials={fallbackInitials}
          className={className}
          textClassName={textClassName}
        />

        <span
          className={`absolute inset-0 bg-slate-950/65 flex items-center justify-center text-white transition-opacity duration-150 ${
            isUploading
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          } ${className.includes('rounded-full') ? 'rounded-full' : 'rounded-2xl'}`}
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 text-[#84CC16] animate-spin" />
          ) : (
            <Camera className="w-4 h-4 text-[#84CC16]" />
          )}
        </span>

        {showCameraBadge && !isUploading && (
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0D1527] border border-[#84CC16]/70 text-[#84CC16] flex items-center justify-center shadow-md pointer-events-none"
          >
            <Camera className="w-3 h-3" />
          </span>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
