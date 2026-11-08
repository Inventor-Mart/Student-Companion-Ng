import katex from 'katex';

export interface MathShortcutButton {
  label: string;
  template: string;
  description: string;
}

export const MATH_SHORTCUTS: MathShortcutButton[] = [
  { label: '√x', template: '\\sqrt{x}', description: 'Square Root: \\sqrt{x}' },
  { label: 'x²', template: '^2', description: 'Squared: ^2' },
  { label: 'xⁿ', template: '^{n}', description: 'Power: ^{n}' },
  { label: 'a/b', template: '\\frac{a}{b}', description: 'Fraction: \\frac{a}{b}' },
  { label: '±', template: '\\pm', description: 'Plus or Minus: \\pm' },
  { label: '×', template: '\\times', description: 'Multiplication: \\times' },
  { label: '÷', template: '\\div', description: 'Division: \\div' },
  { label: 'π', template: '\\pi', description: 'Pi: \\pi' },
  { label: 'θ', template: '\\theta', description: 'Angle Theta: \\theta' },
  { label: '∑', template: '\\sum_{i=1}^{n}', description: 'Summation: \\sum' },
  { label: '∫', template: '\\int', description: 'Integral: \\int' },
  { label: 'Δ', template: '\\Delta', description: 'Delta: \\Delta' },
  { label: '∞', template: '\\infty', description: 'Infinity: \\infty' },
  { label: '≠', template: '\\neq', description: 'Not Equal: \\neq' },
  { label: '≤', template: '\\le', description: 'Less Than or Equal: \\le' },
  { label: '≥', template: '\\ge', description: 'Greater Than or Equal: \\ge' }
];

/**
 * Normalizes user-friendly shortcuts into standard LaTeX notation.
 * e.g.:
 * - `sqrt(x)` -> `\sqrt{x}`
 * - `+-` -> `\pm`
 * - `times` -> `\times`
 * - `div` -> `\div`
 * - `inf` -> `\infty`
 */
export function normalizeMathShortcuts(text: string): string {
  if (!text) return '';

  let normalized = text;

  // Replace sqrt(...) with \sqrt{...}
  normalized = normalized.replace(/\bsqrt\(([^)]+)\)/g, '\\sqrt{$1}');

  // Replace +- with \pm
  normalized = normalized.replace(/\+-/g, '\\pm');

  // Replace natural operator words in formula contexts
  normalized = normalized.replace(/\bplusminus\b/gi, '\\pm');
  normalized = normalized.replace(/\btimes\b/gi, '\\times');
  normalized = normalized.replace(/\bdivided\s+by\b/gi, '\\div');
  normalized = normalized.replace(/\bdiv\b/gi, '\\div');
  normalized = normalized.replace(/\binfinity\b/gi, '\\infty');
  normalized = normalized.replace(/\bpi\b/gi, '\\pi');
  normalized = normalized.replace(/\btheta\b/gi, '\\theta');
  normalized = normalized.replace(/\balpha\b/gi, '\\alpha');
  normalized = normalized.replace(/\bbeta\b/gi, '\\beta');
  normalized = normalized.replace(/\bdelta\b/gi, '\\Delta');

  return normalized;
}

/**
 * Checks if a string contains mathematical or LaTeX notation
 */
export function hasMathNotation(text: string): boolean {
  if (!text) return false;
  // Contains dollar delimiters, backslash commands, or powers/subscripts
  return (
    text.includes('$') ||
    text.includes('\\') ||
    /[a-zA-Z0-9]\^[a-zA-Z0-9{]/.test(text) ||
    /[a-zA-Z0-9]_[a-zA-Z0-9{]/.test(text) ||
    /(\bsqrt|\bfrac|\bpi|\btheta|\bint|\bsum)\b/i.test(text)
  );
}

/**
 * Renders a mathematical LaTeX expression to HTML using KaTeX.
 */
export function renderLatex(latex: string, displayMode: boolean = false): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode,
      output: 'html'
    });
  } catch (err) {
    return escapeHtml(latex);
  }
}

/**
 * Escapes HTML characters for safe rendering
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renders mixed text and LaTeX.
 * Supports:
 * - Text with explicit `$math$` or `$$display math$$`
 * - Plain LaTeX strings without delimiters (e.g. `\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`)
 * - Multi-line notes with mixed bullet points and formulas
 */
export function renderFormattedMathText(text: string): string {
  if (!text) return '';

  const normalized = normalizeMathShortcuts(text);

  // If text contains $ delimiters, parse segments
  if (normalized.includes('$')) {
    const parts = normalized.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g);
    return parts
      .map(part => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const content = part.slice(2, -2).trim();
          return `<div class="my-1 overflow-x-auto">${renderLatex(content, true)}</div>`;
        }
        if (part.startsWith('$') && part.endsWith('$')) {
          const content = part.slice(1, -1).trim();
          return renderLatex(content, false);
        }
        return escapeHtml(part).replace(/\n/g, '<br />');
      })
      .join('');
  }

  // If text starts with a backslash or contains a pure formula (no natural paragraphs), render with KaTeX
  const trimmed = normalized.trim();
  const isPureFormula =
    trimmed.startsWith('\\') ||
    /^[a-zA-Z0-9\s=\+\-\*\/\^\_\(\)\{\}\\]+$/.test(trimmed) && hasMathNotation(trimmed);

  if (isPureFormula && !trimmed.includes('\n')) {
    return `<span class="inline-block">${renderLatex(trimmed, false)}</span>`;
  }

  // Handle line by line for lesson notes with mixed text & formulas
  const lines = normalized.split('\n');
  return lines
    .map(line => {
      const lineTrim = line.trim();
      if (!lineTrim) return '';

      // Check if line is a bullet item with formula e.g. "• Formula: x = (-b \pm \sqrt{b^2 - 4ac})/2a"
      if (lineTrim.startsWith('•') || lineTrim.startsWith('-') || lineTrim.startsWith('*')) {
        const bulletMatch = lineTrim.match(/^([•\-\*]\s*)(.*)$/);
        if (bulletMatch) {
          const prefix = bulletMatch[1];
          const rest = bulletMatch[2];
          if (hasMathNotation(rest)) {
            // Find colon or equals separator
            const colonIdx = rest.indexOf(':');
            if (colonIdx !== -1) {
              const label = rest.slice(0, colonIdx + 1);
              const formula = rest.slice(colonIdx + 1).trim();
              return `${escapeHtml(prefix)}${escapeHtml(label)} ${renderLatex(formula, false)}`;
            }
          }
        }
      }

      // If line is pure formula (e.g. starts with \ or has math operators)
      if (lineTrim.startsWith('\\') || (/^[a-zA-Z0-9\s=\+\-\*\/\^\_\(\)\{\}\\]+$/.test(lineTrim) && hasMathNotation(lineTrim))) {
        return `<div class="my-0.5 overflow-x-auto">${renderLatex(lineTrim, false)}</div>`;
      }

      return escapeHtml(line);
    })
    .join('<br />');
}
