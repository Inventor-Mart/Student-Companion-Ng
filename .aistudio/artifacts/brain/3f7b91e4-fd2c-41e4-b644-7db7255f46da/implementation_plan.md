# KaTeX Mathematical LaTeX Engine for Whiteboard Text Editor

Integrate KaTeX into the whiteboard's direct text editor, allowing educators and students to type intuitive LaTeX shortcuts (such as `\sqrt{x}`, `x^2`, `\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, and `\theta`) and have them instantly render as professional mathematical symbols directly on the board.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following mathematical capabilities will be added to the text mode:
> - **KaTeX Rendering Engine**: Install `katex` and `@types/katex` to parse LaTeX expressions into crisp mathematical typography with fraction bars, radical surds, and superscripts.
> - **Dual Input Support (Smart Shortcuts + Pure LaTeX)**: Users can type standard LaTeX (`\sqrt{x}`, `\frac{a}{b}`, `\int`, `\sum`) or common shorthand (`x^2`, `x_1`, `\pm`, `\pi`, `\theta`), and the engine automatically parses math segments into KaTeX.
> - **Live Real-Time Math Preview**: While typing in the inline editor, a live preview strip immediately shows the formatted formula in real time before stamping it onto the board.
> - **Quick-Insert Math Symbol Ribbon**: A row of one-tap buttons (`\sqrt{}`, `^2`, `\frac{}{}`, `\pi`, `\pm`, `\int`, `\sum`, `\infty`) right above the textarea for fast formula insertion on mobile or desktop.
> - **Surface-Embedded Math Notes**: Math notes remain embedded directly on the chalkboard or dry-erase whiteboard surface with full drag-to-reposition and double-click-to-edit support.

## 1. Overview & Core Concept

- **What It Does**: Upgrades the whiteboard text composer with a LaTeX math rendering pipeline. Tutors and students who find handwriting or stylus drawing slow or difficult can type mathematical formulas effortlessly using standard keywords or tap-to-insert buttons.
- **Target Persona**: Nigerian mathematics, physics, and chemistry educators teaching JAMB, WAEC, and university STEM syllabus topics.
- **Key Value**: Delivers textbook-quality mathematical notation with zero stylus lag or handwriting legibility issues.

## 2. User Experience & Visual Design

- **Inline Composer with Math Quick-Bar**:
  - Above the text input, a horizontal scrollable ribbon displays one-tap math symbols:
    - `√x` (`\sqrt{}`)
    - `x²` (`^2`)
    - `a/b` (`\frac{}{}`)
    - `±` (`\pm`)
    - `π` (`\pi`)
    - `θ` (`\theta`)
    - `∑` (`\sum`)
    - `∫` (`\int`)
    - `Δ` (`\Delta`)
    - `∞` (`\infty`)
  - Clicking any symbol inserts the shortcut directly at the cursor position.
- **Real-Time Rendered Preview Strip**:
  - As the user types, a live KaTeX preview bar right below the textarea displays the rendered mathematical expression in real time.
  - If a LaTeX syntax error is made, it falls back gracefully without crashing or throwing errors (`throwOnError: false`).
- **Embedded Surface Rendering on Board**:
  - Once stamped, the note renders KaTeX HTML directly onto the chalkboard surface with high contrast.
  - On Dark Slate, Green Chalkboard, or Blueprint backgrounds: formulas render in chalk white or chosen accent colors.
  - On Dry-Erase Whiteboard: formulas automatically render in high-contrast midnight ink (`#0F172A`).
  - Retains move grip and double-click editing.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: KaTeX vs. MathJax vs. Custom Regex**
  - *Chosen Approach*: KaTeX (`katex`).
  - *Why*: KaTeX is over $100\times$ faster than MathJax, lightweight, synchronous (no async layout jumps), and parses fractions, roots, and matrices with zero render lag on low-end mobile devices.
  - *Alternatives Considered*: Custom regex replacements (fragile for nested fractions or complex roots) or MathJax (too heavy for mobile devices).
- **Decision 2: Automatic Math Parsing vs. Dollar Sign Delimiters**
  - *Chosen Approach*: Support both natural detection (any text containing `\`, `^`, `_`, or math operators) as well as standard LaTeX dollar delimiters (`$...$`).
  - *Why*: Gives maximum flexibility: tutors can type `\sqrt{b^2 - 4ac}` directly without having to wrap everything in `$...$`, while mixed lecture notes (`Let x = 2, then x^2 = 4`) format naturally.

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    Inline Math Text Composer (Text Mode)                   │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Quick Math Ribbon: [√x] [x²] [a/b] [±] [π] [θ] [∑] [∫] [Δ] [∞]      │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ Textarea: "\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"                       │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ Live KaTeX Preview:  -b ± √(b² - 4ac)                                │  │
│  │                      ─────────────────                               │  │
│  │                             2a                                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                        │
│                        [Stamp Note to Board]                               │
│                                   ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Board Surface Embedded Note (KaTeX Rendered HTML)                    │  │
│  │ - Zero card background box                                           │  │
│  │ - Drag to move / Double-click to edit                                 │  │
│  │ - Adaptive contrast on Whiteboard / Green Chalk                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Dependencies**:
  - `katex` and `@types/katex`
  - KaTeX stylesheet (`import 'katex/dist/katex.min.css'`)
- **Key Helper Utility**:
  - `renderMathText(text: string, color?: string)`: Detects LaTeX tokens, parses math chunks using `katex.renderToString()`, and returns safe sanitized HTML.
- **Composite PNG Export Integration**:
  - During "Save Notes", mathematical notes render using clean typographic symbols and layout on the export canvas.
