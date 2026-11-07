import React from 'react';

/**
 * Robust cross-platform font stack guaranteed to render the Nigerian Naira glyph (₦ / U+20A6)
 * without displaying missing glyph tofu boxes (▯) on Android, Windows, Mac, or iOS devices.
 */
export const NAIRA_FONT_FAMILY = 'system-ui, -apple-system, Roboto, "Segoe UI", Arial, sans-serif';

/**
 * Universal whole-number Naira currency string formatter.
 * Formats numbers into comma-separated whole Naira amounts (e.g. 15000 -> "₦15,000").
 */
export const formatNaira = (amount: number | null | undefined): string => {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? Math.round(amount) : 0;
  return `₦${safeAmount.toLocaleString('en-NG')}`;
};

/**
 * Font-isolated Naira symbol component.
 * Forces the symbol to use a font family that is universally guaranteed to contain glyph U+20A6,
 * even when placed inside a monospace (font-mono) parent element.
 */
export const NairaSign: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {}
}) => {
  return (
    <span
      className={`inline-block select-none font-sans font-medium ${className}`}
      style={{ fontFamily: NAIRA_FONT_FAMILY, ...style }}
      aria-hidden="true"
    >
      ₦
    </span>
  );
};

/**
 * Reusable component for rendering formatted whole Naira amounts.
 * Combines the safe NairaSign glyph with comma-separated numbers.
 */
export const NairaText: React.FC<{
  amount: number | null | undefined;
  className?: string;
  signClassName?: string;
  prefix?: string;
}> = ({ amount, className = '', signClassName = '', prefix = '' }) => {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? Math.round(amount) : 0;
  return (
    <span className={className}>
      {prefix}
      <NairaSign className={signClassName} />
      {safeAmount.toLocaleString('en-NG')}
    </span>
  );
};
