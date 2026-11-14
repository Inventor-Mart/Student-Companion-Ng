import React, { useMemo } from 'react';
import katex from 'katex';

interface RichMathMarkdownProps {
  content: string;
  className?: string;
}

type BlockNode =
  | { type: 'heading'; level: 1 | 2 | 3 | 4; text: string }
  | { type: 'hr' }
  | { type: 'math'; latex: string }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: Array<{ num: string; text: string }> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'paragraph'; text: string };

function renderKatexHtml(latex: string, displayMode: boolean): string {
  const cleaned = latex.trim();
  if (!cleaned) return '';
  try {
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      strict: false,
      output: 'html'
    });
  } catch {
    return cleaned
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

function isLikelyInlineMath(inner: string): boolean {
  const trimmed = inner.trim();
  if (!trimmed) return false;
  // Always treat explicit LaTeX backslash commands as math
  if (trimmed.includes('\\')) return true;
  // Avoid matching two currency amounts separated by prose words like "$10 and $20"
  if (/^\d[\d,.]*\s+[a-zA-Z]{2,}/.test(trimmed)) return false;
  if (/^\s|\s$/.test(inner)) return false;
  return true;
}

/**
 * Splits any embedded $$...$$ or \[...\] blocks onto standalone lines so block parsing
 * handles equations cleanly even when preceded or followed by text on the same line.
 */
function normalizeMathBlocks(raw: string): string {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      out.push(line);
      continue;
    }
    if (inCode) {
      out.push(line);
      continue;
    }

    // Isolate single-line $$...$$ or \[...\] onto their own lines if surrounded by prose
    const expanded = line
      .replace(/\$\$(.+?)\$\$/g, (_, expr) => `\n$$\n${expr}\n$$\n`)
      .replace(/\\\[(.+?)\\\]/g, (_, expr) => `\n$$\n${expr}\n$$\n`);

    if (expanded !== line) {
      for (const sub of expanded.split('\n')) {
        out.push(sub);
      }
    } else {
      out.push(line);
    }
  }

  return out.join('\n');
}

function parseBlocks(raw: string): BlockNode[] {
  const normalized = normalizeMathBlocks(raw);
  const lines = normalized.split('\n');
  const blocks: BlockNode[] = [];

  let paragraphBuf: string[] = [];
  let ulBuf: string[] = [];
  let olBuf: Array<{ num: string; text: string }> = [];
  let quoteBuf: string[] = [];
  let tableBuf: string[] = [];

  let inCode = false;
  let codeLang = '';
  let codeBuf: string[] = [];

  let inDisplayMath = false;
  let mathClosingTag: '$$' | '\\]' = '$$';
  let mathBuf: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuf.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraphBuf.join(' ').trim() });
      paragraphBuf = [];
    }
  };

  const flushUl = () => {
    if (ulBuf.length > 0) {
      blocks.push({ type: 'ul', items: [...ulBuf] });
      ulBuf = [];
    }
  };

  const flushOl = () => {
    if (olBuf.length > 0) {
      blocks.push({ type: 'ol', items: [...olBuf] });
      olBuf = [];
    }
  };

  const flushQuote = () => {
    if (quoteBuf.length > 0) {
      blocks.push({ type: 'blockquote', lines: [...quoteBuf] });
      quoteBuf = [];
    }
  };

  const flushTable = () => {
    if (tableBuf.length > 0) {
      const parsedRows = tableBuf
        .filter((r) => !/^\s*\|?[\s:\-|]+\|?\s*$/.test(r))
        .map((r) =>
          r
            .trim()
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((cell) => cell.trim())
        );
      if (parsedRows.length > 0) {
        const [headers, ...rows] = parsedRows;
        blocks.push({ type: 'table', headers, rows });
      }
      tableBuf = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushUl();
    flushOl();
    flushQuote();
    flushTable();
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (inCode) {
      if (trimmed.startsWith('```')) {
        blocks.push({ type: 'code', lang: codeLang, code: codeBuf.join('\n') });
        inCode = false;
        codeLang = '';
        codeBuf = [];
      } else {
        codeBuf.push(rawLine);
      }
      continue;
    }

    if (inDisplayMath) {
      if (trimmed === mathClosingTag || trimmed.endsWith(mathClosingTag)) {
        const beforeClose = trimmed === mathClosingTag ? '' : trimmed.slice(0, -mathClosingTag.length);
        if (beforeClose) mathBuf.push(beforeClose);
        blocks.push({ type: 'math', latex: mathBuf.join('\n').trim() });
        inDisplayMath = false;
        mathBuf = [];
      } else {
        mathBuf.push(rawLine);
      }
      continue;
    }

    // Fenced code block start
    if (trimmed.startsWith('```')) {
      flushAll();
      inCode = true;
      codeLang = trimmed.slice(3).trim();
      continue;
    }

    // Multi-line display math start: $$ or \[
    if (trimmed === '$$' || trimmed === '\\[') {
      flushAll();
      inDisplayMath = true;
      mathClosingTag = trimmed === '$$' ? '$$' : '\\]';
      mathBuf = [];
      continue;
    }
    if (trimmed.startsWith('$$') && !trimmed.endsWith('$$')) {
      flushAll();
      inDisplayMath = true;
      mathClosingTag = '$$';
      mathBuf = [trimmed.slice(2)];
      continue;
    }
    if (trimmed.startsWith('\\[') && !trimmed.endsWith('\\]')) {
      flushAll();
      inDisplayMath = true;
      mathClosingTag = '\\]';
      mathBuf = [trimmed.slice(2)];
      continue;
    }

    if (!trimmed) {
      flushAll();
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushAll();
      blocks.push({ type: 'hr' });
      continue;
    }

    // Headings (# .. ####)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushAll();
      const level = Math.min(4, headingMatch[1].length) as 1 | 2 | 3 | 4;
      blocks.push({ type: 'heading', level, text: headingMatch[2].trim() });
      continue;
    }

    // Markdown table line
    if (trimmed.startsWith('|') && trimmed.includes('|', 1)) {
      flushParagraph();
      flushUl();
      flushOl();
      flushQuote();
      tableBuf.push(trimmed);
      continue;
    } else if (tableBuf.length > 0) {
      flushTable();
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushUl();
      flushOl();
      quoteBuf.push(trimmed.replace(/^>\s?/, ''));
      continue;
    } else if (quoteBuf.length > 0) {
      flushQuote();
    }

    // Unordered list (*, -, •) — avoid matching bold **line** as bullet
    const ulMatch = trimmed.match(/^(?:[*•\-])\s+(.*)$/);
    if (ulMatch && !trimmed.startsWith('**')) {
      flushParagraph();
      flushOl();
      ulBuf.push(ulMatch[1]);
      continue;
    } else if (ulBuf.length > 0) {
      flushUl();
    }

    // Ordered list (1., 2., 3.)
    const olMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      flushUl();
      olBuf.push({ num: olMatch[1], text: olMatch[2] });
      continue;
    } else if (olBuf.length > 0) {
      flushOl();
    }

    paragraphBuf.push(trimmed);
  }

  if (inCode && codeBuf.length > 0) {
    blocks.push({ type: 'code', lang: codeLang, code: codeBuf.join('\n') });
  }
  if (inDisplayMath && mathBuf.length > 0) {
    blocks.push({ type: 'math', latex: mathBuf.join('\n').trim() });
  }
  flushAll();

  return blocks;
}

interface InlineToken {
  type: 'math' | 'code';
  value: string;
}

function renderInlineContent(text: string, keyPrefix: string): React.ReactNode {
  if (!text) return null;

  // Step 1: Isolate inline code (`...`) and inline LaTeX (\(...\) and $...$)
  // so LaTeX symbols like * or _ inside math do not conflict with Markdown emphasis.
  const tokens: InlineToken[] = [];
  let masked = text.replace(/`([^`]+)`/g, (_, codeText) => {
    const idx = tokens.length;
    tokens.push({ type: 'code', value: codeText });
    return `\uE000T${idx}\uE001`;
  });

  masked = masked.replace(/\\\((.+?)\\\)/g, (_, latex) => {
    const idx = tokens.length;
    tokens.push({ type: 'math', value: latex });
    return `\uE000T${idx}\uE001`;
  });

  masked = masked.replace(/\$([^\n$]+?)\$/g, (fullMatch, inner) => {
    if (!isLikelyInlineMath(inner)) return fullMatch;
    const idx = tokens.length;
    tokens.push({ type: 'math', value: inner });
    return `\uE000T${idx}\uE001`;
  });

  // Step 2: Recursively parse **bold** and *italic* and restore math/code tokens
  const renderTokensInText = (segment: string, segKey: string): React.ReactNode[] => {
    const parts = segment.split(/(\uE000T\d+\uE001)/g);
    return parts.map((part, i) => {
      const tokenMatch = part.match(/^\uE000T(\d+)\uE001$/);
      if (!tokenMatch) {
        return <React.Fragment key={`${segKey}-txt-${i}`}>{part}</React.Fragment>;
      }
      const token = tokens[Number(tokenMatch[1])];
      if (!token) return null;
      if (token.type === 'code') {
        return (
          <code
            key={`${segKey}-code-${i}`}
            className="px-1.5 py-0.5 rounded-md bg-[#0B1426] border border-slate-700/80 text-[#84CC16] font-mono text-[11px]"
          >
            {token.value}
          </code>
        );
      }
      return (
        <span
          key={`${segKey}-math-${i}`}
          className="inline-block align-middle mx-0.5 text-white [&_.katex]:text-[1.05em]"
          dangerouslySetInnerHTML={{ __html: renderKatexHtml(token.value, false) }}
        />
      );
    });
  };

  const renderFormattedSegment = (seg: string, segKey: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    // Match **bold** or *italic* (without crossing unmatched tokens cleanly)
    const regex = /(\*\*(?:(?!\*\*).)+?\*\*|\*[^*\n]+?\*)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    let count = 0;

    while ((match = regex.exec(seg)) !== null) {
      if (match.index > lastIdx) {
        nodes.push(...renderTokensInText(seg.slice(lastIdx, match.index), `${segKey}-p-${count}`));
      }
      const tokenStr = match[0];
      if (tokenStr.startsWith('**') && tokenStr.endsWith('**')) {
        const inner = tokenStr.slice(2, -2);
        nodes.push(
          <strong key={`${segKey}-b-${count}`} className="font-extrabold text-white">
            {renderFormattedSegment(inner, `${segKey}-bi-${count}`)}
          </strong>
        );
      } else if (tokenStr.startsWith('*') && tokenStr.endsWith('*')) {
        const inner = tokenStr.slice(1, -1);
        nodes.push(
          <em key={`${segKey}-em-${count}`} className="italic text-slate-100">
            {renderFormattedSegment(inner, `${segKey}-ei-${count}`)}
          </em>
        );
      }
      lastIdx = regex.lastIndex;
      count++;
    }

    if (lastIdx < seg.length) {
      nodes.push(...renderTokensInText(seg.slice(lastIdx), `${segKey}-tail`));
    }
    return nodes;
  };

  return renderFormattedSegment(masked, keyPrefix);
}

export const RichMathMarkdown: React.FC<RichMathMarkdownProps> = ({ content, className = '' }) => {
  const blocks = useMemo(() => parseBlocks(content || ''), [content]);

  return (
    <div className={`space-y-3 text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans ${className}`}>
      {blocks.map((block, idx) => {
        const key = `rmd-${idx}`;

        if (block.type === 'hr') {
          return <hr key={key} className="border-slate-700/80 my-3" />;
        }

        if (block.type === 'math') {
          return (
            <div
              key={key}
              className="my-2 px-3.5 py-3 rounded-2xl bg-[#0B1426] border border-[#84CC16]/30 overflow-x-auto text-center text-white shadow-inner [&_.katex-display]:my-0 [&_.katex]:text-[1.1em]"
              dangerouslySetInnerHTML={{ __html: renderKatexHtml(block.latex, true) }}
            />
          );
        }

        if (block.type === 'code') {
          return (
            <pre
              key={key}
              className="p-3 rounded-2xl bg-[#091120] border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto"
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === 'heading') {
          const headingStyles =
            block.level === 1
              ? 'text-base font-black text-white pt-1'
              : block.level === 2
                ? 'text-sm font-black text-[#84CC16] pt-1'
                : block.level === 3
                  ? 'text-[13px] font-extrabold text-[#84CC16] pt-1'
                  : 'text-xs sm:text-[13px] font-extrabold text-orange-300 pt-0.5';

          return (
            <div key={key} className={headingStyles}>
              {renderInlineContent(block.text, key)}
            </div>
          );
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={key}
              className="border-l-3 border-[#FF5B00] bg-[#0B1426]/70 pl-3 pr-2.5 py-2 rounded-r-xl text-slate-200 space-y-1"
            >
              {block.lines.map((line, lIdx) => (
                <p key={`${key}-q-${lIdx}`}>{renderInlineContent(line, `${key}-q-${lIdx}`)}</p>
              ))}
            </blockquote>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={key} className="space-y-1.5 pl-1">
              {block.items.map((item, itemIdx) => (
                <li key={`${key}-ul-${itemIdx}`} className="flex items-start gap-2">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#84CC16] shrink-0" />
                  <span className="flex-1 min-w-0">{renderInlineContent(item, `${key}-ul-${itemIdx}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={key} className="space-y-2 pl-0.5">
              {block.items.map((item, itemIdx) => (
                <li key={`${key}-ol-${itemIdx}`} className="flex items-start gap-2">
                  <span className="font-mono font-black text-[#FF5B00] shrink-0 min-w-[1.25rem]">
                    {item.num}.
                  </span>
                  <span className="flex-1 min-w-0">{renderInlineContent(item.text, `${key}-ol-${itemIdx}`)}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={key} className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-[#0B1426]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#18284A] border-b border-slate-700">
                    {block.headers.map((h, hIdx) => (
                      <th key={`${key}-th-${hIdx}`} className="px-3 py-2 font-extrabold text-[#84CC16]">
                        {renderInlineContent(h, `${key}-th-${hIdx}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {block.rows.map((row, rIdx) => (
                    <tr key={`${key}-tr-${rIdx}`} className="hover:bg-[#14203D]/60">
                      {row.map((cell, cIdx) => (
                        <td key={`${key}-td-${rIdx}-${cIdx}`} className="px-3 py-2 text-slate-200">
                          {renderInlineContent(cell, `${key}-td-${rIdx}-${cIdx}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <p key={key} className="leading-relaxed">
            {renderInlineContent(block.text, key)}
          </p>
        );
      })}
    </div>
  );
};
