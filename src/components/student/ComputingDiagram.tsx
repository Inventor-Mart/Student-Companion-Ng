import React from 'react';
import { Table, Database, HardDrive, GitBranch, Info } from 'lucide-react';

export type ComputingDiagramType =
  | 'spreadsheet-grid-anatomy'
  | 'relational-database-schema'
  | 'storage-backup-hierarchy'
  | 'data-flow-charts'
  | 'erd-data-modeling'
  | 'database-normalization-pipeline';

interface ComputingDiagramProps {
  type: ComputingDiagramType;
}

export const ComputingDiagram: React.FC<ComputingDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. SPREADSHEET GRID ANATOMY & CELL COORDINATES
    // ----------------------------------------------------
    case 'spreadsheet-grid-anatomy':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Table className="w-4 h-4 text-emerald-400" />
              <span>Spreadsheet Grid Anatomy: Columns, Rows & Formula Bar</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Data Processing · Cell Addressing ($C$4)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Application Top Bar / Ribbon Placeholder */}
              <rect x="30" y="20" width="560" height="28" rx="4" fill="#064e3b" stroke="#059669" strokeWidth="1" />
              <text x="45" y="38" fill="#ffffff" className="text-[11px] font-bold">File  Home  Insert  Page Layout  Formulas  Data  Review  View</text>

              {/* Name Box (Active Cell C4) & Formula Bar Row */}
              <rect x="30" y="55" width="80" height="26" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="70" y="72" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-mono font-bold">C4</text>
              <text x="30" y="93" fill="#94a3b8" className="text-[8px]">Name Box</text>

              {/* Formula Bar with fx symbol */}
              <rect x="120" y="55" width="30" height="26" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="135" y="72" fill="#facc15" textAnchor="middle" className="text-[11px] font-serif font-bold italic">fx</text>

              <rect x="155" y="55" width="435" height="26" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              <text x="170" y="72" fill="#34d399" className="text-[11px] font-mono font-bold">=SUM(C1:C3) * $A$1</text>
              <text x="450" y="93" fill="#10b981" className="text-[8px] font-bold">Formula Bar (Calculates live)</text>

              {/* Column Headers (A, B, C, D, E) */}
              <g transform="translate(30, 105)">
                {/* Top-Left Corner Box */}
                <rect x="0" y="0" width="35" height="24" fill="#334155" stroke="#475569" strokeWidth="1" />

                {/* Col A */}
                <rect x="35" y="0" width="100" height="24" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="85" y="16" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">A</text>

                {/* Col B */}
                <rect x="135" y="0" width="105" height="24" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="187" y="16" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">B</text>

                {/* Col C (Highlighted Active Column) */}
                <rect x="240" y="0" width="115" height="24" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
                <text x="297" y="16" fill="#34d399" textAnchor="middle" className="text-[11px] font-bold">C (Active)</text>

                {/* Col D */}
                <rect x="355" y="0" width="105" height="24" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="407" y="16" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">D</text>

                {/* Col E */}
                <rect x="460" y="0" width="100" height="24" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="510" y="16" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">E</text>
              </g>

              {/* Data Grid Rows (1 to 5) */}
              {/* Row 1 */}
              <g transform="translate(30, 129)">
                <rect x="0" y="0" width="35" height="26" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="17" y="17" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">1</text>
                <rect x="35" y="0" width="100" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="45" y="17" fill="#cbd5e1" className="text-[10px]">Tax Rate ($A$1)</text>
                <rect x="135" y="0" width="105" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="145" y="17" fill="#facc15" className="text-[10px] font-mono">0.075</text>
                <rect x="240" y="0" width="115" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="250" y="17" fill="#cbd5e1" className="text-[10px] font-mono">25,000</text>
                <rect x="355" y="0" width="105" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="365" y="17" fill="#cbd5e1" className="text-[10px]">Lagos Central</text>
                <rect x="460" y="0" width="100" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="470" y="17" fill="#4ade80" className="text-[10px]">Approved</text>
              </g>

              {/* Row 2 */}
              <g transform="translate(30, 155)">
                <rect x="0" y="0" width="35" height="26" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="17" y="17" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">2</text>
                <rect x="35" y="0" width="100" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="45" y="17" fill="#cbd5e1" className="text-[10px]">Textbook Pack</text>
                <rect x="135" y="0" width="105" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="145" y="17" fill="#cbd5e1" className="text-[10px]">12 Units</text>
                <rect x="240" y="0" width="115" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="250" y="17" fill="#cbd5e1" className="text-[10px] font-mono">18,500</text>
                <rect x="355" y="0" width="105" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="365" y="17" fill="#cbd5e1" className="text-[10px]">Ibadan Depot</text>
                <rect x="460" y="0" width="100" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="470" y="17" fill="#4ade80" className="text-[10px]">Approved</text>
              </g>

              {/* Row 3 */}
              <g transform="translate(30, 181)">
                <rect x="0" y="0" width="35" height="26" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x="17" y="17" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">3</text>
                <rect x="35" y="0" width="100" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="45" y="17" fill="#cbd5e1" className="text-[10px]">Science Kits</text>
                <rect x="135" y="0" width="105" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="145" y="17" fill="#cbd5e1" className="text-[10px]">8 Units</text>
                <rect x="240" y="0" width="115" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="250" y="17" fill="#cbd5e1" className="text-[10px] font-mono">32,000</text>
                <rect x="355" y="0" width="105" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="365" y="17" fill="#cbd5e1" className="text-[10px]">Abuja School</text>
                <rect x="460" y="0" width="100" height="26" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="470" y="17" fill="#facc15" className="text-[10px]">Pending</text>
              </g>

              {/* Row 4 (ACTIVE ROW WITH HIGHLIGHTED CELL C4) */}
              <g transform="translate(30, 207)">
                {/* Active Row Number 4 */}
                <rect x="0" y="0" width="35" height="28" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
                <text x="17" y="18" fill="#34d399" textAnchor="middle" className="text-[11px] font-bold">4</text>

                <rect x="35" y="0" width="100" height="28" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="45" y="18" fill="#f8fafc" className="text-[10px] font-bold">Total Tax Due</text>
                <rect x="135" y="0" width="105" height="28" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="145" y="18" fill="#94a3b8" className="text-[10px]">Summary</text>

                {/* THE ACTIVE CELL C4 (Heavy Green Border with Handle) */}
                <rect x="240" y="0" width="115" height="28" fill="#022c22" stroke="#10b981" strokeWidth="2.5" />
                <text x="250" y="18" fill="#34d399" className="text-[11px] font-mono font-bold">₦ 5,662.50</text>
                {/* Bottom-right auto-fill handle */}
                <rect x="351" y="24" width="5" height="5" fill="#10b981" />

                <rect x="355" y="0" width="105" height="28" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <rect x="460" y="0" width="100" height="28" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              </g>

              {/* Explanatory Annotations */}
              <path d="M 230 220 L 170 270" stroke="#10b981" strokeWidth="1.5" fill="none" />
              <text x="160" y="285" fill="#34d399" textAnchor="end" className="text-[10px] font-bold">Active Cell Pointer (Cell C4)</text>
              <text x="160" y="297" fill="#94a3b8" textAnchor="end" className="text-[8px]">Intersection of Column C & Row 4</text>

              <path d="M 360 70 Q 420 40 460 70" stroke="#facc15" strokeWidth="1.5" fill="none" />
              <text x="460" y="300" fill="#facc15" className="text-[10px] font-bold">Absolute Reference ($A$1):</text>
              <text x="460" y="312" fill="#cbd5e1" className="text-[9px]">Dollar signs freeze the cell address when copied.</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Crucial Spreadsheet Rule:</strong> Every formula must begin with an equal sign ($=$). A <em>relative reference</em> ($C1$) automatically adjusts when dragged down; an <em>absolute reference</em> ($\$A\$1$) locks both column and row coordinates.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. RELATIONAL DATABASE SCHEMA & ENTITY RELATIONSHIPS
    // ----------------------------------------------------
    case 'relational-database-schema':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Database className="w-4 h-4 text-sky-400" />
              <span>Relational Database Management System (RDBMS) Schema</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Primary Key (PK) & Foreign Key (FK) 1:N Link
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* TABLE 1: STUDENTS (Parent Table) */}
              <g transform="translate(40, 40)">
                {/* Table Header */}
                <rect x="0" y="0" width="220" height="30" rx="4" fill="#0369a1" />
                <text x="110" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">STUDENTS TABLE (Parent)</text>

                {/* Table Body Fields */}
                <rect x="0" y="30" width="220" height="170" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />

                {/* Field 1: StudentID (PK) */}
                <rect x="5" y="35" width="210" height="28" fill="#1e293b" />
                <text x="15" y="53" fill="#facc15" className="text-[10px] font-bold font-mono">🔑 StudentID [PK]</text>
                <text x="160" y="53" fill="#94a3b8" className="text-[9px]">INTEGER</text>

                {/* Field 2: FullName */}
                <text x="15" y="85" fill="#f8fafc" className="text-[10px]">FirstName</text>
                <text x="160" y="85" fill="#94a3b8" className="text-[9px]">VARCHAR(50)</text>

                <text x="15" y="115" fill="#f8fafc" className="text-[10px]">LastName</text>
                <text x="160" y="115" fill="#94a3b8" className="text-[9px]">VARCHAR(50)</text>

                <text x="15" y="145" fill="#f8fafc" className="text-[10px]">ClassLevel</text>
                <text x="160" y="145" fill="#94a3b8" className="text-[9px]">VARCHAR(10)</text>

                <text x="15" y="175" fill="#f8fafc" className="text-[10px]">DateOfBirth</text>
                <text x="160" y="175" fill="#94a3b8" className="text-[9px]">DATE</text>
              </g>

              {/* TABLE 2: EXAM_RESULTS (Child Table) */}
              <g transform="translate(360, 40)">
                {/* Table Header */}
                <rect x="0" y="0" width="220" height="30" rx="4" fill="#047857" />
                <text x="110" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">EXAM_RESULTS (Child)</text>

                {/* Table Body Fields */}
                <rect x="0" y="30" width="220" height="170" fill="#0f172a" stroke="#059669" strokeWidth="1.5" />

                {/* Field 1: ResultID (PK) */}
                <rect x="5" y="35" width="210" height="28" fill="#1e293b" />
                <text x="15" y="53" fill="#facc15" className="text-[10px] font-bold font-mono">🔑 ResultID [PK]</text>
                <text x="160" y="53" fill="#94a3b8" className="text-[9px]">INTEGER</text>

                {/* Field 2: StudentID (FK) */}
                <rect x="5" y="68" width="210" height="28" fill="#14532d" stroke="#22c55e" strokeWidth="1" />
                <text x="15" y="86" fill="#4ade80" className="text-[10px] font-bold font-mono">🔗 StudentID [FK]</text>
                <text x="160" y="86" fill="#a7f3d0" className="text-[9px]">INTEGER</text>

                {/* Field 3: SubjectName */}
                <text x="15" y="120" fill="#f8fafc" className="text-[10px]">SubjectName</text>
                <text x="160" y="120" fill="#94a3b8" className="text-[9px]">VARCHAR(40)</text>

                {/* Field 4: Score */}
                <text x="15" y="150" fill="#f8fafc" className="text-[10px]">ExamScore</text>
                <text x="160" y="150" fill="#94a3b8" className="text-[9px]">DECIMAL(5,2)</text>

                {/* Field 5: Grade */}
                <text x="15" y="180" fill="#f8fafc" className="text-[10px]">GradeLetter</text>
                <text x="160" y="180" fill="#94a3b8" className="text-[9px]">CHAR(2)</text>
              </g>

              {/* One-to-Many (1:N) Relationship Connector Line */}
              <path d="M 260 88 C 300 88 320 120 365 120" stroke="#facc15" strokeWidth="2.5" fill="none" />
              {/* Crow's foot connector on child side */}
              <line x1="355" y1="112" x2="365" y2="120" stroke="#facc15" strokeWidth="2.5" />
              <line x1="355" y1="128" x2="365" y2="120" stroke="#facc15" strokeWidth="2.5" />
              <circle cx="260" cy="88" r="4" fill="#facc15" />

              <text x="310" y="85" fill="#facc15" textAnchor="middle" className="text-[12px] font-bold font-mono">1 : N</text>
              <text x="310" y="98" fill="#94a3b8" textAnchor="middle" className="text-[8px]">(One student has many exam records)</text>

              {/* Explanatory Footer Card */}
              <rect x="40" y="255" width="540" height="65" rx="8" fill="#0b1329" stroke="#1e293b" strokeWidth="1.5" />
              <text x="60" y="278" fill="#38bdf8" className="text-[10px] font-bold">Relational Integrity Definitions:</text>
              <text x="60" y="293" fill="#cbd5e1" className="text-[9px]">• <strong>Primary Key (PK):</strong> Unique identifier for each row in a table; cannot be null or duplicate.</text>
              <text x="60" y="306" fill="#cbd5e1" className="text-[9px]">• <strong>Foreign Key (FK):</strong> A field in a child table referring back to the Primary Key of the parent table, enforcing referential integrity.</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Referential Integrity Rule:</strong> A Foreign Key value in the child table (<em>EXAM_RESULTS</em>) cannot exist unless that exact matching Primary Key value already exists in the parent table (<em>STUDENTS</em>).
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. STORAGE BACKUP HIERARCHY PYRAMID
    // ----------------------------------------------------
    case 'storage-backup-hierarchy':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <HardDrive className="w-4 h-4 text-purple-400" />
              <span>Storage & Backup Hierarchy: Speed, Volatility & Persistence</span>
            </div>
            <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60 font-medium">
              Data Care · 3-2-1 Backup Rule
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Central Pyramid Tiers */}
              {/* Tier 1: Top (CPU Cache & RAM) */}
              <polygon points="310,30 250,105 370,105" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
              <text x="310" y="75" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">PRIMARY</text>
              <text x="310" y="88" fill="#fecdd3" textAnchor="middle" className="text-[9px]">RAM & Cache</text>

              {/* Tier 2: Middle (Internal SSD & HDD) */}
              <polygon points="250,105 180,195 440,195 370,105" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
              <text x="310" y="145" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">SECONDARY STORAGE</text>
              <text x="310" y="160" fill="#bae6fd" textAnchor="middle" className="text-[9px]">Solid State Drives (SSD) & Hard Disk Drives (HDD)</text>

              {/* Tier 3: Bottom (Tertiary & Cloud Backup) */}
              <polygon points="180,195 100,285 520,285 440,195" fill="#065f46" stroke="#10b981" strokeWidth="2" />
              <text x="310" y="235" fill="#ffffff" textAnchor="middle" className="text-[12px] font-bold">TERTIARY / CLOUD DISASTER BACKUP</text>
              <text x="310" y="252" fill="#a7f3d0" textAnchor="middle" className="text-[10px]">External Hard Drives, Network NAS & Cloud Servers (Google Drive, AWS S3)</text>

              {/* Left Arrow: Speed & Cost Increase Upward */}
              <line x1="70" y1="280" x2="70" y2="40" stroke="#f43f5e" strokeWidth="2.5" />
              <polygon points="70,35 65,47 75,47" fill="#f43f5e" />
              <text x="60" y="160" fill="#fb7185" textAnchor="middle" className="text-[9px] font-bold" transform="rotate(-90 60 160)">
                Speed & Cost per GB INCREASES ↑
              </text>

              {/* Right Arrow: Capacity & Persistence Increase Downward */}
              <line x1="550" y1="40" x2="550" y2="280" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="550,285 545,273 555,273" fill="#10b981" />
              <text x="565" y="160" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold" transform="rotate(90 565 160)">
                Capacity & Persistence INCREASE ↓
              </text>

              {/* Footer 3-2-1 Backup Strategy Note */}
              <text x="310" y="315" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold">
                The Universal 3-2-1 Rule: 3 Total Copies · 2 Different Media Types · 1 Offsite Cloud Copy
              </text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>Volatility Principle:</strong> Primary memory (RAM) is <em>volatile</em>—all unsaved work vanishes instantly upon power outage. Secondary and cloud backups are <em>non-volatile</em>, retaining data permanently for disaster recovery.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. ISO DATA PROCESSING FLOWCHART SYMBOLS
    // ----------------------------------------------------
    case 'data-flow-charts':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Standard ISO Flowchart Symbols & Algorithmic Control Logic</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Algorithm Design · Decision & Process Blocks
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Flowchart Sample: Exam Pass/Fail Grading Logic */}
              {/* Block 1: Start (Terminal Oval) */}
              <g transform="translate(160, 20)">
                <rect x="0" y="0" width="130" height="32" rx="16" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
                <text x="65" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">START</text>
              </g>

              {/* Flowline 1 */}
              <line x1="225" y1="52" x2="225" y2="75" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="225,75 221,67 229,67" fill="#94a3b8" />

              {/* Block 2: Input Score (Parallelogram) */}
              <g transform="translate(150, 75)">
                <polygon points="15,0 150,0 135,35 0,35" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                <text x="75" y="22" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">INPUT ExamScore</text>
              </g>

              {/* Flowline 2 */}
              <line x1="225" y1="110" x2="225" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="225,135 221,127 229,127" fill="#94a3b8" />

              {/* Block 3: Decision Diamond (Score >= 50?) */}
              <g transform="translate(165, 135)">
                <polygon points="60,0 120,35 60,70 0,35" fill="#ca8a04" stroke="#facc15" strokeWidth="2" />
                <text x="60" y="38" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">Score ≥ 50?</text>
              </g>

              {/* Flowline Yes (Right Branch) */}
              <line x1="285" y1="170" x2="360" y2="170" stroke="#10b981" strokeWidth="2" />
              <polygon points="360,170 352,166 352,174" fill="#10b981" />
              <text x="320" y="162" fill="#34d399" className="text-[10px] font-bold">YES</text>

              {/* Block 4: Output Pass */}
              <g transform="translate(360, 150)">
                <polygon points="15,0 140,0 125,40 0,40" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                <text x="70" y="25" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">PRINT "PASS"</text>
              </g>

              {/* Flowline No (Down Branch) */}
              <line x1="225" y1="205" x2="225" y2="235" stroke="#f43f5e" strokeWidth="2" />
              <polygon points="225,235 221,227 229,227" fill="#f43f5e" />
              <text x="235" y="222" fill="#fb7185" className="text-[10px] font-bold">NO</text>

              {/* Block 5: Output Fail */}
              <g transform="translate(155, 235)">
                <polygon points="15,0 140,0 125,40 0,40" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
                <text x="70" y="25" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">PRINT "RE-TAKE"</text>
              </g>

              {/* Convergence to STOP */}
              <path d="M 430 190 L 430 305 L 290 305" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <line x1="225" y1="275" x2="225" y2="295" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Block 6: Stop (Terminal Oval) */}
              <g transform="translate(160, 295)">
                <rect x="0" y="0" width="130" height="28" rx="14" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
                <text x="65" y="18" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">STOP</text>
              </g>

              {/* Right Reference Key Guide */}
              <g transform="translate(480, 40)">
                <text x="0" y="0" fill="#38bdf8" className="text-[11px] font-bold">ISO Symbol Guide:</text>
                <text x="0" y="20" fill="#cbd5e1" className="text-[9px]">⬭ Oval: Start / Stop</text>
                <text x="0" y="38" fill="#cbd5e1" className="text-[9px]">▱ Parallelogram: Input / Output</text>
                <text x="0" y="56" fill="#cbd5e1" className="text-[9px]">▭ Rectangle: Process Calculation</text>
                <text x="0" y="74" fill="#cbd5e1" className="text-[9px]">◇ Diamond: Conditional Decision</text>
                <text x="0" y="92" fill="#cbd5e1" className="text-[9px]">→ Arrow: Program Flow Direction</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Flowchart Convention:</strong> Parallelograms represent user Input/Output (`INPUT ExamScore`); diamonds represent conditional Decision tests (`Score ≥ 50?`) with mutually exclusive exit paths.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 5. ENTITY RELATIONSHIP DIAGRAM (ERD & CARDINALITY)
    // ----------------------------------------------------
    case 'erd-data-modeling':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Entity-Relationship Diagram (ERD): Entities, Attributes &amp; Cardinality (1:N)</span>
            </div>
            <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60 font-medium">
              Data Processing · Crow&apos;s Foot Notation
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 680 300" className="w-full max-w-2xl mx-auto min-w-[540px] text-xs font-sans">
              <defs>
                <linearGradient id="erdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Entity 1: STUDENT */}
              <g transform="translate(30, 40)">
                <rect x="0" y="0" width="170" height="210" rx="8" fill="url(#erdGrad)" stroke="#6366f1" strokeWidth="2" />
                <rect x="0" y="0" width="170" height="36" rx="8" fill="#4338ca" />
                <rect x="0" y="28" width="170" height="8" fill="#4338ca" />
                <text x="85" y="24" fill="#ffffff" textAnchor="middle" className="text-[12px] font-bold tracking-wider">STUDENT</text>

                {/* Attributes */}
                {/* PK */}
                <rect x="8" y="46" width="154" height="24" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                <text x="14" y="62" fill="#a5b4fc" className="text-[10px] font-mono font-bold">PK  StudentID</text>
                <text x="125" y="62" fill="#fbbf24" className="text-[9px] font-mono font-bold">INT</text>

                {/* Non-key attributes */}
                <text x="14" y="95" fill="#e2e8f0" className="text-[10px] font-mono">   FirstName</text>
                <text x="125" y="95" fill="#94a3b8" className="text-[9px] font-mono">VARCHAR</text>

                <text x="14" y="125" fill="#e2e8f0" className="text-[10px] font-mono">   LastName</text>
                <text x="125" y="125" fill="#94a3b8" className="text-[9px] font-mono">VARCHAR</text>

                <text x="14" y="155" fill="#e2e8f0" className="text-[10px] font-mono">   ClassLevel</text>
                <text x="125" y="155" fill="#94a3b8" className="text-[9px] font-mono">VARCHAR</text>

                <text x="14" y="185" fill="#e2e8f0" className="text-[10px] font-mono">   DateOfBirth</text>
                <text x="125" y="185" fill="#94a3b8" className="text-[9px] font-mono">DATE</text>
              </g>

              {/* Relationship Diamond: ENROLLS IN */}
              <g transform="translate(260, 110)">
                <polygon points="65,0 130,35 65,70 0,35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="65" y="38" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">ENROLLS</text>
                <text x="65" y="50" fill="#94a3b8" textAnchor="middle" className="text-[8px]">M : N</text>
              </g>

              {/* Connector lines with Crow's Foot & 1 marks */}
              <line x1="200" y1="145" x2="260" y2="145" stroke="#818cf8" strokeWidth="2" />
              {/* One marker on Student side */}
              <line x1="215" y1="137" x2="215" y2="153" stroke="#818cf8" strokeWidth="2" />
              <line x1="222" y1="137" x2="222" y2="153" stroke="#818cf8" strokeWidth="2" />
              <text x="210" y="130" fill="#a5b4fc" className="text-[9px] font-bold">1</text>

              <line x1="390" y1="145" x2="470" y2="145" stroke="#34d399" strokeWidth="2" />
              {/* Many marker (crow's foot) on Course side */}
              <line x1="450" y1="145" x2="470" y2="135" stroke="#34d399" strokeWidth="2" />
              <line x1="450" y1="145" x2="470" y2="155" stroke="#34d399" strokeWidth="2" />
              <circle cx="445" cy="145" r="4" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
              <text x="450" y="130" fill="#34d399" className="text-[9px] font-bold">N (Many)</text>

              {/* Entity 2: COURSE */}
              <g transform="translate(470, 40)">
                <rect x="0" y="0" width="170" height="210" rx="8" fill="url(#erdGrad)" stroke="#10b981" strokeWidth="2" />
                <rect x="0" y="0" width="170" height="36" rx="8" fill="#065f46" />
                <rect x="0" y="28" width="170" height="8" fill="#065f46" />
                <text x="85" y="24" fill="#ffffff" textAnchor="middle" className="text-[12px] font-bold tracking-wider">COURSE</text>

                {/* Attributes */}
                {/* PK */}
                <rect x="8" y="46" width="154" height="24" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
                <text x="14" y="62" fill="#6ee7b7" className="text-[10px] font-mono font-bold">PK  CourseCode</text>
                <text x="125" y="62" fill="#fbbf24" className="text-[9px] font-mono font-bold">CHAR(6)</text>

                <text x="14" y="95" fill="#e2e8f0" className="text-[10px] font-mono">   CourseTitle</text>
                <text x="125" y="95" fill="#94a3b8" className="text-[9px] font-mono">VARCHAR</text>

                <text x="14" y="125" fill="#e2e8f0" className="text-[10px] font-mono">   CreditUnits</text>
                <text x="125" y="125" fill="#94a3b8" className="text-[9px] font-mono">INT</text>

                {/* FK */}
                <rect x="8" y="140" width="154" height="24" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                <text x="14" y="156" fill="#cbd5e1" className="text-[10px] font-mono font-bold">FK  DeptID</text>
                <text x="125" y="156" fill="#94a3b8" className="text-[9px] font-mono">INT</text>

                <text x="14" y="185" fill="#e2e8f0" className="text-[10px] font-mono">   Semester</text>
                <text x="125" y="185" fill="#94a3b8" className="text-[9px] font-mono">INT</text>
              </g>

              {/* Legend bar at bottom */}
              <g transform="translate(140, 275)">
                <text x="0" y="0" fill="#94a3b8" className="text-[9px] font-bold">Legend:</text>
                <rect x="50" y="-9" width="18" height="11" rx="2" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                <text x="75" y="0" fill="#cbd5e1" className="text-[9px]">PK = Primary Key</text>
                <rect x="180" y="-9" width="18" height="11" rx="2" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <text x="205" y="0" fill="#cbd5e1" className="text-[9px]">FK = Foreign Key</text>
                <line x1="300" y1="-4" x2="330" y2="-4" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="336" y="0" fill="#cbd5e1" className="text-[9px]">Relationship Cardinality</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>ERD Cardinality Rule:</strong> In relational modeling, an entity is a distinct real-world object (Student, Course). A Primary Key (PK) uniquely identifies each record. When linking entities, the PK of the parent table migrates to become a Foreign Key (FK) in the related table.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 6. DATABASE NORMALIZATION PIPELINE (UNF -> 1NF -> 2NF -> 3NF)
    // ----------------------------------------------------
    case 'database-normalization-pipeline':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Database Normalization Pipeline: UNF → 1NF → 2NF → 3NF</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Data Processing · WAEC Database Mastery
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 700 240" className="w-full max-w-2xl mx-auto min-w-[560px] text-xs font-sans">
              {/* Step 1: UNF */}
              <g transform="translate(15, 30)">
                <rect x="0" y="0" width="145" height="150" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect x="0" y="0" width="145" height="30" rx="8" fill="#9f1239" />
                <rect x="0" y="22" width="145" height="8" fill="#9f1239" />
                <text x="72" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">UNF (Unnormalized)</text>
                <text x="12" y="52" fill="#fca5a5" className="text-[9px] font-semibold">Problems:</text>
                <text x="12" y="70" fill="#cbd5e1" className="text-[8.5px]">• Repeating groups</text>
                <text x="12" y="88" fill="#cbd5e1" className="text-[8.5px]">• Multi-valued fields</text>
                <text x="12" y="106" fill="#cbd5e1" className="text-[8.5px]">• Insert/Delete anomalies</text>
                <text x="12" y="124" fill="#cbd5e1" className="text-[8.5px]">• Severe redundancy</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(165, 90)">
                <line x1="0" y1="15" x2="25" y2="15" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="25,15 17,11 17,19" fill="#f43f5e" />
                <text x="12" y="5" fill="#f43f5e" textAnchor="middle" className="text-[8px] font-bold">Flatten</text>
              </g>

              {/* Step 2: 1NF */}
              <g transform="translate(195, 30)">
                <rect x="0" y="0" width="145" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect x="0" y="0" width="145" height="30" rx="8" fill="#b45309" />
                <rect x="0" y="22" width="145" height="8" fill="#b45309" />
                <text x="72" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">1st Normal Form (1NF)</text>
                <text x="12" y="52" fill="#fde68a" className="text-[9px] font-semibold">Conditions Met:</text>
                <text x="12" y="70" fill="#cbd5e1" className="text-[8.5px]">✓ Atomic values only</text>
                <text x="12" y="88" fill="#cbd5e1" className="text-[8.5px]">✓ Unique row identifier (PK)</text>
                <text x="12" y="106" fill="#cbd5e1" className="text-[8.5px]">✓ No repeating groups</text>
                <text x="12" y="130" fill="#f87171" className="text-[8px] font-bold">Remaining: Partial Dep.</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(345, 90)">
                <line x1="0" y1="15" x2="25" y2="15" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="25,15 17,11 17,19" fill="#f59e0b" />
                <text x="12" y="5" fill="#f59e0b" textAnchor="middle" className="text-[8px] font-bold">Split PK</text>
              </g>

              {/* Step 3: 2NF */}
              <g transform="translate(375, 30)">
                <rect x="0" y="0" width="145" height="150" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <rect x="0" y="0" width="145" height="30" rx="8" fill="#1d4ed8" />
                <rect x="0" y="22" width="145" height="8" fill="#1d4ed8" />
                <text x="72" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">2nd Normal Form (2NF)</text>
                <text x="12" y="52" fill="#bfdbfe" className="text-[9px] font-semibold">Conditions Met:</text>
                <text x="12" y="70" fill="#cbd5e1" className="text-[8.5px]">✓ In 1NF</text>
                <text x="12" y="88" fill="#cbd5e1" className="text-[8.5px]">✓ NO Partial dependency</text>
                <text x="12" y="106" fill="#cbd5e1" className="text-[8.5px]">✓ All non-keys depend</text>
                <text x="18" y="118" fill="#cbd5e1" className="text-[8.5px]">  on entire Primary Key</text>
                <text x="12" y="136" fill="#f87171" className="text-[8px] font-bold">Remaining: Transitive</text>
              </g>

              {/* Arrow 3 */}
              <g transform="translate(525, 90)">
                <line x1="0" y1="15" x2="25" y2="15" stroke="#3b82f6" strokeWidth="2" />
                <polygon points="25,15 17,11 17,19" fill="#3b82f6" />
                <text x="12" y="5" fill="#3b82f6" textAnchor="middle" className="text-[8px] font-bold">Split Non-PK</text>
              </g>

              {/* Step 4: 3NF */}
              <g transform="translate(555, 30)">
                <rect x="0" y="0" width="135" height="150" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect x="0" y="0" width="135" height="30" rx="8" fill="#047857" />
                <rect x="0" y="22" width="135" height="8" fill="#047857" />
                <text x="67" y="20" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">3rd Normal Form (3NF)</text>
                <text x="10" y="52" fill="#a7f3d0" className="text-[9px] font-semibold">Conditions Met:</text>
                <text x="10" y="70" fill="#cbd5e1" className="text-[8.5px]">✓ In 2NF</text>
                <text x="10" y="88" fill="#cbd5e1" className="text-[8.5px]">✓ NO Transitive dependency</text>
                <text x="10" y="106" fill="#cbd5e1" className="text-[8.5px]">✓ Non-keys depend ONLY</text>
                <text x="16" y="118" fill="#cbd5e1" className="text-[8.5px]">  on the Primary Key</text>
                <text x="10" y="136" fill="#34d399" className="text-[8.5px] font-bold">★ Zero Redundancy!</text>
              </g>

              {/* Bottom Rule Mnemonic */}
              <g transform="translate(100, 210)">
                <rect x="0" y="0" width="500" height="24" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="250" y="16" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">
                  The Key Rule: Every non-key attribute must depend on the key (1NF), the whole key (2NF), and nothing but the key (3NF).
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Normalisation Summary:</strong> 1NF ensures atomic columns; 2NF removes partial functional dependencies (where an attribute depends on only part of a composite primary key); 3NF eliminates transitive dependencies (where a non-key attribute depends on another non-key attribute).
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
