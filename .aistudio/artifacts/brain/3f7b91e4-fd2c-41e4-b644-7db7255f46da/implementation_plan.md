# Interactive Board: Direct On-Board Typing & Movable/Editable Sticky Notes

Enable direct in-place typing on the whiteboard just like a native live editor, while preserving stamped notes as interactive stickers that can be dragged to reposition and double-clicked to edit.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following interactions have been confirmed for the text and sticker note experience:
> - **Direct On-Board Typing**: In Text mode, clicking anywhere on the board places an inline, auto-focusing direct text box right where clicked, allowing teachers and students to type lesson notes seamlessly without awkward popups.
> - **Sticker / Note Representation**: Placed notes render as interactive sticker cards with clean typography, subtle accent tags, and translucent dark glass styling that sits naturally atop the Cartesian chalkboard grid.
> - **Movable & Drag-to-Reposition**: Any placed text note or math sticker can be dragged across the board to re-arrange formulas, exercises, and annotations.
> - **Double-Click to Edit**: Double-clicking (or tapping the edit pencil on touch devices) opens the inline text editor prefilled with existing content for immediate updating.
> - **Composite Snapshot Export**: "Save Notes" composites both freehand drawing strokes and all positioned sticker notes into a clean, high-resolution downloadable PNG.

## 1. Overview & Core Concept

- **What It Does**: Upgrades the whiteboard from static bitmap text stamps to an interactive object layer. Text notes and formula stickers remain living, movable cards on the board that can be repositioned and edited at any time during the lesson.
- **Target Persona**: Nigerian tutors explaining complex mathematical proofs or JAMB/WAEC question breakdowns, and students organizing their lecture notes.
- **Key Value**: Eliminates the frustration of having to erase and re-draw text when reorganizing board space during a live class.

## 2. User Experience & Visual Design

- **Inline Direct Typing Box**:
  - When the Text tool is active (`'text'`), a pulsating dashed cursor prompt invites the user to click anywhere.
  - Clicking spawns an inline text input container directly at the pointer coordinates with:
    - Auto-resizing textarea with monospace/sans font sizing (`S`, `M`, `L`, `XL`).
    - Color indicator matching the active chalkboard chalk palette (`#F8FAFC`, Emerald `#10B981`, Sky `#38BDF8`, Amber `#F59E0B`, etc.).
    - Quick action buttons: **Enter / Stamp** (commits the note) or **Esc / Cancel**.
- **Interactive Sticker Note Cards**:
  - Rendered with smooth rounded corners (`rounded-xl`), hairline slate borders (`border-slate-700/80`), and high-contrast readable text.
  - Features an intuitive hover/touch grip indicator (`grip-vertical`) and a quick edit/delete micro-toolbar that appears on hover or active selection.
  - Dragging provides real-time cursor feedback (`cursor-grab` $\to$ `cursor-grabbing`) with sub-pixel pointer tracking.
  - Double-clicking opens the inline editor in-place with the current text selected.
- **Math & Formula Stickers**:
  - Quick math symbols (`∫`, `∑`, `√x`, `π`, `d/dx`, etc.) can also be placed as movable stickers that can be repositioned alongside handwritten derivations.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive DOM Overlay Layer vs. Pure Canvas Stamping**
  - *Chosen Approach*: Render active text stickers as a dedicated, lightweight interactive HTML5 overlay directly positioned over the `<canvas>` viewport, with pointer drag handlers.
  - *Why*: Allows native mobile virtual keyboard accessibility, selection cursor, drag handles, and smooth text rendering without fuzzy canvas font scaling issues on mobile devices.
  - *Alternatives Considered*: Pure canvas hit-testing (cumbersome for mobile touch editing and cursor positioning) or modal dialogs (interrupts visual flow).
- **Decision 2: Seamless Composite PNG Export**
  - *Chosen Approach*: During "Save Notes", the export function draws all canvas strokes, then iterates over active sticker notes, painting their backgrounds and text directly onto the export canvas before generating the download link.
  - *Why*: Ensures downloaded lesson summaries contain all student and tutor notes in their exact positions.

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       CollaborativeWhiteboard.tsx                          │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Main Canvas Viewport (Chalkboard Grid + Pen/Highlighter/Eraser)      │  │
│  └───────────────────────────────────┬──────────────────────────────────┘  │
│                                      │                                     │
│  ┌───────────────────────────────────▼──────────────────────────────────┐  │
│  │ Interactive Sticker & Text Overlay Layer (Pointer Drag + Double-Tap) │  │
│  │ - Movable Note Card: [Drag Grip] Text Content [Edit/Delete]         │  │
│  │ - Direct Inline Composer: Auto-expanding textarea at (x, y)         │  │
│  │ - Math Formula Badges: Draggable mathematical stamps                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Floating Action Bar & Math Symbol Dock                               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Data Model**:
  ```typescript
  export interface BoardStickerNote {
    id: string;
    type: 'text' | 'formula';
    x: number;
    y: number;
    text: string;
    color: string;
    fontSize: number;
    authorRole: 'tutor' | 'student';
    updatedAt: number;
  }
  ```
- **Interactive Handlers**:
  - `handleBoardClick(e)`: Spawns inline composer at `(e.clientX - rect.left, e.clientY - rect.top)` when `'text'` tool is active.
  - `handleStartDragNote(noteId, e)`: Captures pointer and updates note `x` and `y` on pointer move.
  - `handleStartEditNote(noteId)`: Opens inline composer loaded with existing note text.
  - `handleCommitNote(text, noteId?)`: Adds new sticker note or updates existing one.
  - `handleDeleteNote(noteId)`: Removes note from board state.
