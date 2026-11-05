import React from 'react';

/**
 * Robust mathematical symbols and LaTeX sanitizer for Nigerian secondary school curriculum notes.
 * Converts LaTeX constructs and symbols into clean, readable Unicode characters.
 */
export const sanitizeMathSymbols = (raw: string): string => {
  if (!raw) return '';

  return raw
    // Strip environment markers
    .replace(/\\begin\{cases\}/gi, '')
    .replace(/\\end\{cases\}/gi, '')
    .replace(/\\begin\{aligned\}/gi, '')
    .replace(/\\end\{aligned\}/gi, '')
    // Delimiters & brackets
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\left\\\{/g, '{')
    .replace(/\\right\\\}/g, '}')
    .replace(/\\left\|/g, '|')
    .replace(/\\right\|/g, '|')
    // LaTeX Spacing
    .replace(/\\qquad/g, '    ')
    .replace(/\\quad/g, '  ')
    .replace(/\\,/g, ' ')
    .replace(/\\;/g, ' ')
    .replace(/\\:/g, ' ')
    .replace(/\\!/g, '')
    // Formatting wrappers
    .replace(/\\text\{\s*R\s*\}/gi, ' R ')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1')
    .replace(/\\mathit\{([^}]+)\}/g, '$1')
    .replace(/\\textbf\{([^}]+)\}/g, '$1')
    .replace(/\\textit\{([^}]+)\}/g, '$1')
    // Relational Operators (CRITICAL: longer tokens MUST precede shorter ones)
    .replace(/\\leq/g, '≤')
    .replace(/\\le(?![a-zA-Z])/g, '≤')
    .replace(/\\geq/g, '≥')
    .replace(/\\ge(?![a-zA-Z])/g, '≥')
    .replace(/\\neq/g, '≠')
    .replace(/\\ne(?![a-zA-Z])/g, '≠')
    .replace(/\\approx/g, '≈')
    .replace(/\\equiv/g, '≡')
    .replace(/\\sim/g, '~')
    // Logic & Implication
    .replace(/\\implies/g, '⇒')
    .replace(/\\iff/g, '⇔')
    .replace(/\\to(?![a-zA-Z])/g, '→')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\leftarrow/g, '←')
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\Leftarrow/g, '⇐')
    .replace(/\\Leftrightarrow/g, '⇔')
    .replace(/\\land/g, '∧')
    .replace(/\\lor/g, '∨')
    .replace(/\\neg/g, '¬')
    .replace(/\\sim(?![a-zA-Z])/g, '~')
    .replace(/\\forall/g, '∀')
    .replace(/\\exists/g, '∃')
    // Set Theory
    .replace(/\\in(?![a-zA-Z])/g, '∈')
    .replace(/\\notin/g, '∉')
    .replace(/\\subset(?![a-zA-Z])/g, '⊂')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\cap/g, '∩')
    .replace(/\\cup/g, '∪')
    .replace(/\\emptyset/g, '∅')
    .replace(/\\infty/g, '∞')
    .replace(/\\sum/g, '∑')
    // Arithmetic
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\cdot/g, '·')
    .replace(/\\bullet/g, '•')
    // Greek letters
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\pi/g, 'π')
    .replace(/\^\{\\circ\}|\\circ/g, '°')
    .replace(/\\degree/g, '°')
    // Functions
    .replace(/\\sin(?![a-zA-Z])/g, 'sin')
    .replace(/\\cos(?![a-zA-Z])/g, 'cos')
    .replace(/\\tan(?![a-zA-Z])/g, 'tan')
    .replace(/\\log(?![a-zA-Z])/g, 'log')
    .replace(/\\ln(?![a-zA-Z])/g, 'ln')
    .replace(/\\lim(?![a-zA-Z])/g, 'lim')
    .replace(/\\angle/g, '∠')
    // Radicals & Roots
    .replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '$1√($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\sqrt(?![a-zA-Z])/g, '√')
    // Fractions (single & multi-digit)
    .replace(/\\(?:d|t)?frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    // Clean alignment artifacts
    .replace(/&=(?!=)/g, '= ')
    .replace(/&<(?!=)/g, '< ')
    .replace(/&>(?!=)/g, '> ')
    .replace(/&/g, ' ');
};

/**
 * Clean up code blocks and ASCII charts containing LaTeX fragments or dollar signs.
 */
export const sanitizeCodeMath = (code: string): string => {
  if (!code) return '';
  return sanitizeMathSymbols(code)
    .replace(/\$([^$]+)\$/g, '$1') // strip surrounding dollar signs
    .replace(/\\\$/g, '')
    .replace(/\$/g, ''); // strip any remaining lone dollar signs
};

/**
 * Quick plain text math sanitizer for labels, subtopics, and pills where ReactNodes cannot be used.
 */
export const cleanMathText = (raw: string): string => {
  if (!raw) return '';
  return sanitizeMathSymbols(raw)
    .replace(/\$\$([^$]+)\$\$/g, '$1')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\$/g, '') // strip any lone dollar signs
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^0/g, '⁰')
    .replace(/\^1/g, '¹')
    .replace(/\^4/g, '⁴')
    .replace(/\b_2\b/g, '₂')
    .replace(/\b_10\b/g, '₁₀')
    .replace(/_{10}/g, '₁₀')
    .replace(/_{2}/g, '₂')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Render inline text with recursive support for bold, italics, math formulas, superscripts, and subscripts.
 */
export const renderFormattedSpan = (text: string, keyPrefix: string): React.ReactNode[] => {
  if (!text) return [];

  const sanitized = sanitizeMathSymbols(text);

  // Regex tokens: **bold**, *italics*, $$displayMath$$, $inlineMath$, or subscript/superscript expressions
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\$\$[^\$]+\$\$|\$[^\$]+\$|[a-zA-Z0-9)\]]+(?:_\{[0-9a-zA-Z+-]+\}|_[0-9a-zA-Z+-]+|\^\{[0-9a-zA-Z+-]+\}|\^[0-9a-zA-Z+-]+))/g;
  const parts = sanitized.split(regex);

  return parts.map((part, i) => {
    const k = `${keyPrefix}-${i}`;
    if (!part) return null;

    // Bold text (**...**) - recursively parsed
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={k} className="font-bold text-white">
          {renderFormattedSpan(inner, `${k}-b`)}
        </strong>
      );
    }

    // Italic text (*...*) - recursively parsed
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={k} className="italic text-slate-200">
          {renderFormattedSpan(inner, `${k}-i`)}
        </em>
      );
    }

    // Display math enclosed in $$...$$
    if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
      const inner = part.slice(2, -2).trim();
      return (
        <span key={k} className="inline-block px-1 font-mono text-emerald-300 font-semibold tracking-wide">
          {renderFormattedSpan(inner, `${k}-dm`)}
        </span>
      );
    }

    // Inline math enclosed in $...$
    if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
      const inner = part.slice(1, -1).trim();
      return (
        <span key={k} className="font-mono text-emerald-300 font-medium px-0.5">
          {renderFormattedSpan(inner, `${k}-m`)}
        </span>
      );
    }

    // Subscripts: e.g. 25_{10}, 11001_2, or x_1
    const subMatch = part.match(/^([a-zA-Z0-9)\]]+)_(\{([0-9a-zA-Z+-]+)\}|([0-9a-zA-Z+-]+))$/);
    if (subMatch) {
      const base = subMatch[1];
      const sub = subMatch[3] || subMatch[4];
      return (
        <span key={k} className="inline-flex items-baseline font-mono font-semibold text-amber-300">
          <span>{base}</span>
          <sub className="text-[10px] text-amber-400 font-bold ml-0.5">{sub}</sub>
        </span>
      );
    }

    // Superscripts: e.g. x^2, x^{2}, r^3
    const supMatch = part.match(/^([a-zA-Z0-9)\]]+)\^(\{([0-9a-zA-Z+-]+)\}|([0-9a-zA-Z+-]+))$/);
    if (supMatch) {
      const base = supMatch[1];
      const sup = supMatch[3] || supMatch[4];
      return (
        <span key={k} className="inline-flex items-baseline font-mono font-semibold text-emerald-300">
          <span>{base}</span>
          <sup className="text-[10px] text-emerald-400 font-bold ml-0.5">{sup}</sup>
        </span>
      );
    }

    return <span key={k}>{part}</span>;
  });
};
