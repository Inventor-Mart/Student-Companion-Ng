# Interactive STEM Formula Library & Visual Slot Editor

A visual, tap-to-customize mathematical and scientific formula library for the Collaborative Whiteboard, allowing tutors and secondary school students (WAEC, NECO, JAMB) to insert and customize professional formulas without typing raw LaTeX code.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during the interactive interview:
> - **Subjects Included**: General Mathematics, Further Maths, Physics, and Chemistry.
> - **Editing Interaction**: Visual template slots with direct inline variable fields (e.g., clicking on numerator $a$ or denominator $b$ in $\frac{a}{b}$ to type custom values).
> - **Whiteboard Placement**: Expandable interactive STEM palette drawer located directly inside the note text editor.

---

## 1. Overview & Core Concept

### What It Does
Provides an expandable interactive STEM formula library inside the whiteboard's text editor. Users can browse categorized secondary school formulas across General Maths, Further Maths, Physics, and Chemistry. Instead of writing raw LaTeX syntax (`\frac{a}{b}`, `\sqrt[n]{x}`, `\int_{a}^{b}`), users click a formula card, which presents an interactive visual template where each placeholder (numerator, denominator, exponent, coefficients, constants) can be tapped and edited via clean inline input slots with immediate live KaTeX preview.

### Target Audience & Persona
- **Secondary School Students (JSS1–SS3, WAEC, NECO, JAMB candidates)**: Students who find drawing formulas with a mouse or typing LaTeX syntax challenging can pick visual templates and customize values with simple keystrokes.
- **STEM Tutors & Teachers**: Educators conducting live online classes who need to write clear algebraic fractions, simultaneous equations, calculus steps, and physical/chemical equations quickly without interruption.

### Key Value Delivered
- **Zero LaTeX Learning Curve**: Anyone can insert complex fractions, quadratic formulas, definite integrals, and gas laws instantly.
- **Direct Slot Editing**: Tapping numerator $a$ or denominator $b$ focuses an inline slot; typing immediately updates the rendered mathematical output.
- **One-Tap Insertion & Stamping**: Insert into the active note text or stamp directly as an embedded board note.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. User clicks "Type" tool and clicks on Whiteboard surface                │
│    └─ Inline Note Editor opens at cursor position                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. User clicks "Interactive STEM Formulas" button in the editor header      │
│    └─ Expands the STEM Formula Drawer with Subject Tabs & Search            │
│       [All] [General Maths] [Further Maths] [Physics] [Chemistry]          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. User selects a template (e.g. "Simple Fraction" or "Quadratic Formula")   │
│    └─ Visual Slot Editor appears with rendered formula & editable slots:    │
│       Numerator: [ 3 ]   Denominator: [ 4 ]                                 │
│       Live KaTeX Preview: 3/4                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. User modifies values (e.g. changes 3 to 7x + 2, 4 to 5)                  │
│    └─ Live KaTeX Preview synchronously updates: (7x + 2) / 5                │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. User clicks "Insert into Note" or "Stamp to Board"                       │
│    └─ Formula is committed to the note and rendered cleanly on the surface │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme
- **Color Discipline (60-30-10)**:
  - **60% Surface**: Dark slate backdrop (`#08101D`, `#0F172A`) matching the classroom whiteboard aesthetic.
  - **30% Structure**: Hairline slate borders (`#1E293B`, `#334155`), clean tab segmented controls, and compact formula cards (`#0B132B`).
  - **10% Accent**: Vibrant Emerald (`#10B981`) for active subject tabs, selection rings, and insertion CTAs; Amber (`#F59E0B`) for slot highlights.
- **Typography & Formatting**:
  - High-clarity KaTeX serif font for rendered mathematical symbols ($x, \pm, \sqrt{\quad}, \int$).
  - Clean `JetBrains Mono` for editable slot inputs with tabular numbers.
  - Clean unboxed subject tags (`General Maths · Algebra · WAEC`). No pill clutter.
- **Adaptive Whiteboard Backgrounds**:
  - Formulas seamlessly inherit contrast settings when switched between Green Chalkboard, Dry-Erase Whiteboard, Blueprint, and Dot Grid themes.

---

## 3. Secondary School STEM Formula Catalog

### A. General Mathematics
1. **Simple Fraction**: $\frac{a}{b}$ (Slots: `Numerator a`, `Denominator b`)
2. **Mixed Fraction**: $w\frac{a}{b}$ (Slots: `Whole w`, `Numerator a`, `Denominator b`)
3. **Power / Exponent**: $x^{n}$ (Slots: `Base x`, `Exponent n`)
4. **Square Root**: $\sqrt{x}$ (Slots: `Radicand x`)
5. **$n$-th Root**: $\sqrt[n]{x}$ (Slots: `Index n`, `Radicand x`)
6. **Quadratic Formula**: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ (Slots: `a`, `b`, `c`)
7. **Simultaneous Linear Equations**: $\begin{cases} a_1 x + b_1 y = c_1 \\ a_2 x + b_2 y = c_2 \end{cases}$ (Slots: `a1`, `b1`, `c1`, `a2`, `b2`, `c2`)
8. **Pythagoras Theorem**: $c = \sqrt{a^2 + b^2}$ (Slots: `a`, `b`)
9. **Sine & Cosine Rules**: $\frac{a}{\sin A} = \frac{b}{\sin B}$, $c^2 = a^2 + b^2 - 2ab\cos C$
10. **Circle Area & Circumference**: $A = \pi r^2$, $C = 2\pi r$
11. **Simple Interest**: $I = \frac{P \times R \times T}{100}$ (Slots: `P`, `R`, `T`)

### B. Further Mathematics
1. **First Derivative**: $\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x}$
2. **Definite Integral**: $\int_{a}^{b} f(x)\,dx$ (Slots: `Lower a`, `Upper b`, `Integrand f(x)`, `Var x`)
3. **Indefinite Integral**: $\int f(x)\,dx$ (Slots: `Integrand f(x)`, `Var x`)
4. **2x2 Matrix & Determinant**: $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, $\det(A) = ad - bc$
5. **Arithmetic Progression (AP)**: $T_n = a + (n - 1)d$, $S_n = \frac{n}{2}[2a + (n-1)d]$
6. **Geometric Progression (GP)**: $T_n = ar^{n-1}$, $S_\infty = \frac{a}{1 - r}$
7. **Permutations & Combinations**: $^{n}P_r = \frac{n!}{(n-r)!}$, $^{n}C_r = \frac{n!}{r!(n-r)!}$
8. **Logarithm with Base**: $\log_{b}(x)$ (Slots: `Base b`, `Argument x`)
9. **Complex Number**: $z = a + bi$ or $r(\cos\theta + i\sin\theta)$

### C. Physics
1. **Equations of Motion**: $v = u + at$, $s = ut + \frac{1}{2}at^2$, $v^2 = u^2 + 2as$
2. **Newton's Second Law**: $F = ma$ (Slots: `Mass m`, `Acceleration a`)
3. **Kinetic & Potential Energy**: $E_k = \frac{1}{2}mv^2$, $E_p = mgh$
4. **Ohm's Law & Electrical Power**: $V = IR$, $P = IV = I^2 R = \frac{V^2}{R}$
5. **Resistors in Series & Parallel**: $R_s = R_1 + R_2$, $\frac{1}{R_p} = \frac{1}{R_1} + \frac{1}{R_2}$
6. **Wave Equation**: $v = f\lambda$ (Slots: `Frequency f`, `Wavelength \lambda`)
7. **Snell's Law of Refraction**: $n_1 \sin\theta_1 = n_2 \sin\theta_2$
8. **Thin Lens Formula**: $\frac{1}{f} = \frac{1}{u} + \frac{1}{v}$
9. **Simple Pendulum Period**: $T = 2\pi\sqrt{\frac{L}{g}}$

### D. Chemistry
1. **Ideal Gas Law**: $PV = nRT$ (Slots: `P`, `V`, `n`, `R`, `T`)
2. **Combined Gas Law**: $\frac{P_1 V_1}{T_1} = \frac{P_2 V_2}{T_2}$
3. **Molar Concentration & Moles**: $C = \frac{n}{V}$, $n = \frac{m}{M}$
4. **Dilution Formula**: $C_1 V_1 = C_2 V_2$
5. **pH & Hydrogen Ion**: $\text{pH} = -\log_{10}[H^+]$
6. **Chemical Equilibrium Constant**: $K_c = \frac{[C]^c [D]^d}{[A]^a [B]^b}$
7. **Faraday's Electrolysis Law**: $m = \frac{I \cdot t \cdot M}{z \cdot F}$
8. **Radioactive Decay / Half-Life**: $N(t) = N_0 \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}$

---

## 4. Technical Architecture & Component Structure

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CollaborativeWhiteboard.tsx                           │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Active Inline Note Editor                         │  │
│  │                                                                       │  │
│  │  [Quick Shortcuts Ribbon: √x, x², a/b, ±, π, ∫, ∑]                   │  │
│  │  [Toggle: "Interactive STEM Formula Library" (General, Further, etc.)│  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │        InteractiveStemFormulaDrawer.tsx                         │  │  │
│  │  │                                                                 │  │  │
│  │  │  [Subject Filter Tabs: All | Maths | Further | Physics | Chem]  │  │  │
│  │  │  [Search Bar: "Search 35+ formulas..."]                         │  │  │
│  │  │                                                                 │  │  │
│  │  │  ┌───────────────────────┐  ┌────────────────────────────────┐  │  │  │
│  │  │  │ Formula Cards Grid    │  │ Active Slot Editor View        │  │  │  │
│  │  │  │ • Fraction: a/b       │  │ • Interactive slots: [a] / [b] │  │  │  │
│  │  │  │ • Quadratic: x=...    │  │ • Live KaTeX Formula Preview   │  │  │  │
│  │  │  │ • Integral: ∫ f(x)    │  │ • "Insert into Note Text"      │  │  │  │
│  │  │  │ • Ohm's Law: V = IR   │  │ • "Stamp Directly to Board"    │  │  │  │
│  │  │  └───────────────────────┘  └────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                       │  │
│  │  <textarea> User Note Text </textarea>                                │  │
│  │  <KaTeX Live Preview of Full Note />                                  │  │
│  │  [Font Size: S M L XL] [Cancel] [Stamp Note]                          │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Embedded Surface Notes (Rendered via KaTeX, Movable & Editable)       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Structures & State Model

```typescript
export type StemSubject = 'math' | 'further_math' | 'physics' | 'chemistry';

export interface StemFormulaSlot {
  key: string;
  label: string;
  defaultVal: string;
  placeholder?: string;
}

export interface StemFormulaTemplate {
  id: string;
  name: string;
  subject: StemSubject;
  category: string;
  description: string;
  // Template string with slot placeholders e.g. "\\frac{${num}}{${den}}"
  templatePattern: string;
  slots: StemFormulaSlot[];
  // Display formula for the catalog card
  previewLatex: string;
}
```

### Interactive Slot Replacement Strategy
- When a user selects a template, local slot state is initialized with `defaultVal`.
- As any slot input is edited, a helper function interpolates the `templatePattern`:
  `renderedLatex = templatePattern.replace(/\$\{(\w+)\}/g, (_, key) => slotValues[key] || '');`
- The live preview displays `renderLatex(renderedLatex, true)`.
- Clicking "Insert into Note Text" appends `$renderedLatex$` into the note editor at the cursor position or end of text.
- Clicking "Stamp to Board" commits the note directly to the chalkboard at an offset coordinate.

---

## 5. Verification & Testing Plan

1. **Unit & Syntax Verification**:
   - Run `compile_applet` and `lint_applet` together to verify 0 TypeScript/ESLint errors with full type safety.
2. **Functional Formula Verification**:
   - Verify all 35+ formulas render without KaTeX parse errors.
   - Verify slot input updates immediately alter the preview without lag.
   - Test inserting fractions with complex polynomials: numerator `x^2 + 5x + 6` and denominator `x - 2`.
   - Test switching between General Maths, Further Maths, Physics, and Chemistry tabs.
   - Test text search filtering across names, symbols, and topics.
3. **Whiteboard Integration**:
   - Verify stamped formulas render cleanly on the canvas without card backgrounds.
   - Test background switching (Green Chalkboard, Whiteboard, Blueprint) with high-contrast text adaptation.
   - Verify PNG snapshot export captures customized STEM formulas cleanly.
