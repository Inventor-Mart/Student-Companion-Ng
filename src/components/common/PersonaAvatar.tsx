import React, { useState, useEffect } from 'react';
import {
  getNameAvatarGradient,
  getPersonInitials,
  resolveValidAvatarSrc
} from '../../utils/avatar';

interface PersonaAvatarProps {
  name?: string | null;
  src?: string | null;
  alt?: string;
  className?: string;
  textClassName?: string;
  fallbackInitials?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export const PersonaAvatar: React.FC<PersonaAvatarProps> = ({
  name,
  src,
  alt,
  className = 'w-10 h-10 rounded-full',
  textClassName = 'text-xs',
  fallbackInitials = 'SC',
  referrerPolicy = 'no-referrer'
}) => {
  const validSrc = resolveValidAvatarSrc(src);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [validSrc]);

  if (validSrc && !imgFailed) {
    return (
      <img
        src={validSrc}
        alt={alt || name || 'User avatar'}
        referrerPolicy={referrerPolicy}
        onError={() => setImgFailed(true)}
        className={`object-cover bg-slate-900 shrink-0 ${className}`}
      />
    );
  }

  const initials = getPersonInitials(name, fallbackInitials);
  const gradientClass = getNameAvatarGradient(name);

  return (
    <div
      role="img"
      aria-label={alt || name || 'User initials'}
      className={`${gradientClass} ${className} flex items-center justify-center text-white font-black uppercase tracking-wider select-none shadow-inner shrink-0`}
    >
      <span className={textClassName}>{initials}</span>
    </div>
  );
};
