import React, { useState } from 'react';

export type CivicDiagramType =
  | 'civic-citizenship-rights-duties'
  | 'civic-three-arms-of-government'
  | 'civic-electoral-process-cycle'
  | 'civic-citizenship-acquisition'
  | 'civic-inec-bvas-voting-flow';

interface CivicDiagramProps {
  type: CivicDiagramType;
  caption?: string;
}

export const CivicDiagram: React.FC<CivicDiagramProps> = ({ type, caption }) => {
  const [selectedArm, setSelectedArm] = useState<'all' | 'exec' | 'leg' | 'jud'>('all');

  // 1. Three Arms of Government: Separation of Powers
  if (type === 'civic-three-arms-of-government') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              The Three Arms of Government: Separation of Powers & Checks and Balances
            </h4>
            <p className="text-xs text-slate-400">
              The 1999 Constitution of the Federal Republic of Nigeria (Sections 4, 5, and 6)
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'all', label: 'All Interlocks' },
              { id: 'leg', label: 'Legislature (Laws)' },
              { id: 'exec', label: 'Executive (Execution)' },
              { id: 'jud', label: 'Judiciary (Interpretation)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedArm(tab.id as 'all' | 'exec' | 'leg' | 'jud')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedArm === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 320" className="w-full max-w-xl select-none">
            <defs>
              <marker id="civicArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Top Node: LEGISLATURE (Section 4) */}
            <g transform="translate(195, 20)" opacity={selectedArm === 'exec' || selectedArm === 'jud' ? 0.35 : 1}>
              <rect width="150" height="75" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
              <text x="75" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">LEGISLATURE</text>
              <text x="75" y="40" fill="#cbd5e1" fontSize="10" textAnchor="middle">National Assembly</text>
              <text x="75" y="54" fill="#94a3b8" fontSize="9" textAnchor="middle">Senate &amp; House of Reps</text>
              <rect x="25" y="58" width="100" height="12" rx="3" fill="#1e3a8a" />
              <text x="75" y="67" fill="#bfdbfe" fontSize="8" fontWeight="bold" textAnchor="middle">MAKES LAWS (Sec. 4)</text>
            </g>

            {/* Bottom Left Node: EXECUTIVE (Section 5) */}
            <g transform="translate(40, 160)" opacity={selectedArm === 'leg' || selectedArm === 'jud' ? 0.35 : 1}>
              <rect width="150" height="75" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
              <text x="75" y="24" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">EXECUTIVE</text>
              <text x="75" y="40" fill="#cbd5e1" fontSize="10" textAnchor="middle">President &amp; Governors</text>
              <text x="75" y="54" fill="#94a3b8" fontSize="9" textAnchor="middle">Ministers &amp; Civil Service</text>
              <rect x="20" y="58" width="110" height="12" rx="3" fill="#065f46" />
              <text x="75" y="67" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">EXECUTES LAWS (Sec. 5)</text>
            </g>

            {/* Bottom Right Node: JUDICIARY (Section 6) */}
            <g transform="translate(350, 160)" opacity={selectedArm === 'leg' || selectedArm === 'exec' ? 0.35 : 1}>
              <rect width="150" height="75" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="2.5" />
              <text x="75" y="24" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">JUDICIARY</text>
              <text x="75" y="40" fill="#cbd5e1" fontSize="10" textAnchor="middle">Supreme Court &amp; Courts</text>
              <text x="75" y="54" fill="#94a3b8" fontSize="9" textAnchor="middle">Chief Justice &amp; Judges</text>
              <rect x="15" y="58" width="120" height="12" rx="3" fill="#831843" />
              <text x="75" y="67" fill="#fbcfe8" fontSize="8" fontWeight="bold" textAnchor="middle">INTERPRETS LAWS (Sec. 6)</text>
            </g>

            {/* Checks and Balances Connecting Lines */}
            {/* Top to Bottom-Left: Leg <-> Exec */}
            <line x1="220" y1="95" x2="140" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#civicArrow)" />
            <text x="140" y="125" fill="#fbbf24" fontSize="8" fontWeight="bold">Veto Override / Budget</text>

            {/* Top to Bottom-Right: Leg <-> Jud */}
            <line x1="320" y1="95" x2="400" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#civicArrow)" />
            <text x="375" y="125" fill="#fbbf24" fontSize="8" fontWeight="bold">Confirmation / Judicial Review</text>

            {/* Bottom-Left to Bottom-Right: Exec <-> Jud */}
            <line x1="190" y1="200" x2="350" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#civicArrow)" />
            <text x="270" y="195" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Appointment &amp; Pardon vs. Court Orders</text>

            {/* Bottom Explanation Banner */}
            <g transform="translate(30, 255)">
              <rect width="480" height="50" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="15" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">BARON DE MONTESQUIEU'S DOCTRINE:</text>
              <text x="15" y="34" fill="#cbd5e1" fontSize="9">To prevent tyranny and protect human freedom, no single arm of government must hold unchecked power.</text>
              <text x="15" y="45" fill="#94a3b8" fontSize="8">Each arm checks the other two, preserving the Rule of Law and Constitutional Supremacy in Nigeria.</text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 2. Citizenship: Rights vs. Duties
  if (type === 'civic-citizenship-rights-duties') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              Constitutional Balance: Fundamental Rights vs. Civic Duties
            </h4>
            <p className="text-xs text-slate-400">
              Chapter IV (Fundamental Rights) and Section 24 (Duties of Citizens) of the 1999 Constitution
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            Reciprocal Social Contract
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 300" className="w-full max-w-xl select-none">
            {/* Scale Pillar & Base */}
            <rect x="264" y="80" width="12" height="140" rx="3" fill="#64748b" />
            <polygon points="270,55 250,80 290,80" fill="#94a3b8" />
            <rect x="220" y="220" width="100" height="16" rx="4" fill="#334155" />

            {/* Crossbeam */}
            <line x1="100" y1="65" x2="440" y2="65" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="270" cy="65" r="6" fill="#f59e0b" />

            {/* Left Pan: FUNDAMENTAL RIGHTS (Chapter IV) */}
            <line x1="100" y1="65" x2="60" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="100" y1="65" x2="140" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="40" y="120" width="130" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="105" y="138" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">CITIZEN RIGHTS</text>
            <text x="105" y="152" fill="#a7f3d0" fontSize="8" textAnchor="middle">Right to Life (Sec. 33)</text>
            <text x="105" y="165" fill="#a7f3d0" fontSize="8" textAnchor="middle">Right to Dignity (Sec. 34)</text>
            <text x="105" y="178" fill="#a7f3d0" fontSize="8" textAnchor="middle">Personal Liberty (Sec. 35)</text>
            <text x="105" y="191" fill="#a7f3d0" fontSize="8" textAnchor="middle">Fair Hearing (Sec. 36)</text>
            <text x="105" y="204" fill="#a7f3d0" fontSize="8" textAnchor="middle">Freedom of Expression</text>

            {/* Right Pan: CIVIC DUTIES (Section 24) */}
            <line x1="440" y1="65" x2="400" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="440" y1="65" x2="480" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="370" y="120" width="130" height="90" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="435" y="138" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">CIVIC DUTIES</text>
            <text x="435" y="152" fill="#bfdbfe" fontSize="8" textAnchor="middle">Obedience to Law (Sec. 24a)</text>
            <text x="435" y="165" fill="#bfdbfe" fontSize="8" textAnchor="middle">Prompt Tax Payment (Sec. 24f)</text>
            <text x="435" y="178" fill="#bfdbfe" fontSize="8" textAnchor="middle">Voting in Elections</text>
            <text x="435" y="191" fill="#bfdbfe" fontSize="8" textAnchor="middle">Protect Public Property</text>
            <text x="435" y="204" fill="#bfdbfe" fontSize="8" textAnchor="middle">Defense of the Nation</text>

            {/* Central Reciprocal Relationship Card */}
            <g transform="translate(40, 248)">
              <rect width="460" height="42" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="230" y="18" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">
                THE CITIZENSHIP SOCIAL CONTRACT:
              </text>
              <text x="230" y="32" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                Where rights end, duties begin. Enjoyment of constitutional rights demands faithful discharge of civic duties.
              </text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 3. Electoral Process Cycle
  if (type === 'civic-electoral-process-cycle') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-purple-400">
              The Democratic Electoral Cycle & Independent Electoral Commission (INEC)
            </h4>
            <p className="text-xs text-slate-400">
              Sequential stages of free, fair, and credible democratic elections in Nigeria
            </p>
          </div>
          <span className="rounded bg-purple-950/80 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800">
            Electoral Act 2022 / BVAS
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 290" className="w-full max-w-xl select-none">
            <defs>
              <marker id="cycleArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
              </marker>
            </defs>

            {/* Circular or Step Cycle: 5 Steps */}
            {/* Step 1: Voter Registration (CVR & PVC) */}
            <g transform="translate(20, 40)">
              <rect width="135" height="75" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="67" y="22" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">1. REGISTRATION</text>
              <text x="67" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">Continuous Voter Reg.</text>
              <text x="67" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Biometric Enrollment</text>
              <text x="67" y="62" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Issuance of PVC</text>
            </g>

            {/* Step 2: Nomination & Campaigns */}
            <g transform="translate(200, 40)">
              <rect width="140" height="75" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="70" y="22" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. CAMPAIGNS</text>
              <text x="70" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">Party Primaries &amp; Form</text>
              <text x="70" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Public Rallies &amp; Media</text>
              <text x="70" y="62" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">Civic Voter Education</text>
            </g>

            {/* Step 3: Election Day & BVAS Accreditation */}
            <g transform="translate(380, 40)">
              <rect width="140" height="75" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="70" y="22" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">3. ACCREDITATION</text>
              <text x="70" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">BVAS Fingerprint/Face</text>
              <text x="70" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Secret Ballot Voting</text>
              <text x="70" y="62" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">Thumbprint &amp; Box</text>
            </g>

            {/* Step 4: Sorting & Collation */}
            <g transform="translate(290, 150)">
              <rect width="140" height="75" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
              <text x="70" y="22" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">4. COLLATION</text>
              <text x="70" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">Open Counting at Unit</text>
              <text x="70" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Form EC8A Upload (IReV)</text>
              <text x="70" y="62" fill="#fbcfe8" fontSize="8" fontWeight="bold" textAnchor="middle">Ward / LGA / State</text>
            </g>

            {/* Step 5: Declaration & Petitions */}
            <g transform="translate(100, 150)">
              <rect width="140" height="75" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="70" y="22" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">5. DECLARATION</text>
              <text x="70" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">Return of Winner</text>
              <text x="70" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Certificate of Return</text>
              <text x="70" y="62" fill="#e9d5ff" fontSize="8" fontWeight="bold" textAnchor="middle">Tribunal Adjudication</text>
            </g>

            {/* Flow Connecting Lines */}
            <line x1="155" y1="77" x2="195" y2="77" stroke="#a855f7" strokeWidth="2" markerEnd="url(#cycleArrow)" />
            <line x1="340" y1="77" x2="375" y2="77" stroke="#a855f7" strokeWidth="2" markerEnd="url(#cycleArrow)" />
            <path d="M 450 115 Q 450 150 435 175" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#cycleArrow)" />
            <line x1="290" y1="187" x2="245" y2="187" stroke="#a855f7" strokeWidth="2" markerEnd="url(#cycleArrow)" />

            {/* Bottom Insight */}
            <g transform="translate(50, 245)">
              <rect width="440" height="30" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="15" y="19" fill="#34d399" fontSize="9" fontWeight="bold">CORNERSTONE OF DEMOCRACY:</text>
              <text x="180" y="19" fill="#cbd5e1" fontSize="9">Transparent elections cure political apathy and confer constitutional legitimacy.</text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 4. Constitutional Acquisition of Nigerian Citizenship (Sections 25, 26, 27)
  if (type === 'civic-citizenship-acquisition') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Modes of Acquiring Nigerian Citizenship (1999 Constitution)
            </h4>
            <p className="text-xs text-slate-400">
              Constitutional criteria, qualifications, and restrictions under Sections 25, 26, and 27
            </p>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
            1999 CFRN Chapter III
          </span>
        </div>

        <div className="w-full overflow-x-auto py-3">
          <svg viewBox="0 0 680 260" className="w-full max-w-2xl mx-auto min-w-[560px] text-xs font-sans">
            {/* Mode 1: By Birth (Section 25) */}
            <g transform="translate(15, 20)">
              <rect width="200" height="210" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <rect width="200" height="32" rx="8" fill="#065f46" />
              <rect y="24" width="200" height="8" fill="#065f46" />
              <text x="100" y="21" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">1. BY BIRTH (Sec. 25)</text>

              <text x="14" y="52" fill="#6ee7b7" className="text-[9.5px] font-bold">Primary Legal Basis:</text>
              <text x="14" y="70" fill="#cbd5e1" className="text-[8.5px]">• Born in Nigeria before 1/10/1960</text>
              <text x="20" y="82" fill="#94a3b8" className="text-[8px]">  with parent/grandparent indigenous</text>
              <text x="14" y="100" fill="#cbd5e1" className="text-[8.5px]">• Born in Nigeria after 1/10/1960</text>
              <text x="20" y="112" fill="#94a3b8" className="text-[8px]">  with at least one parent citizen</text>
              <text x="14" y="130" fill="#cbd5e1" className="text-[8.5px]">• Born outside Nigeria to parents</text>
              <text x="20" y="142" fill="#94a3b8" className="text-[8px]">  who are citizens by birth</text>

              <rect x="12" y="165" width="176" height="30" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
              <text x="100" y="184" fill="#34d399" textAnchor="middle" className="text-[8.5px] font-bold">★ Cannot be deprived of citizenship</text>
            </g>

            {/* Mode 2: By Registration (Section 26) */}
            <g transform="translate(240, 20)">
              <rect width="200" height="210" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect width="200" height="32" rx="8" fill="#0369a1" />
              <rect y="24" width="200" height="8" fill="#0369a1" />
              <text x="100" y="21" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">2. REGISTRATION (Sec. 26)</text>

              <text x="14" y="52" fill="#7dd3fc" className="text-[9.5px] font-bold">Eligibility Categories:</text>
              <text x="14" y="70" fill="#cbd5e1" className="text-[8.5px]">• A foreign woman married to</text>
              <text x="20" y="82" fill="#94a3b8" className="text-[8px]">  a Nigerian male citizen</text>
              <text x="14" y="100" fill="#cbd5e1" className="text-[8.5px]">• Person of full age born abroad</text>
              <text x="20" y="112" fill="#94a3b8" className="text-[8px]">  whose grandparents are citizens</text>
              <text x="14" y="130" fill="#cbd5e1" className="text-[8.5px]">• Satisfies President of good</text>
              <text x="20" y="142" fill="#94a3b8" className="text-[8px]">  character &amp; oath of allegiance</text>

              <rect x="12" y="165" width="176" height="30" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
              <text x="100" y="184" fill="#7dd3fc" textAnchor="middle" className="text-[8.5px] font-bold">Can be deprived if disloyal / jailed</text>
            </g>

            {/* Mode 3: By Naturalization (Section 27) */}
            <g transform="translate(465, 20)">
              <rect width="200" height="210" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <rect width="200" height="32" rx="8" fill="#b45309" />
              <rect y="24" width="200" height="8" fill="#b45309" />
              <text x="100" y="21" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">3. NATURALIZATION (Sec. 27)</text>

              <text x="14" y="52" fill="#fde68a" className="text-[9.5px] font-bold">Strict Criteria:</text>
              <text x="14" y="70" fill="#cbd5e1" className="text-[8.5px]">• 15 years continuous residence</text>
              <text x="20" y="82" fill="#94a3b8" className="text-[8px]">  in Nigeria prior to application</text>
              <text x="14" y="100" fill="#cbd5e1" className="text-[8.5px]">• Good character &amp; community</text>
              <text x="20" y="112" fill="#94a3b8" className="text-[8px]">  governor&apos;s testimonial</text>
              <text x="14" y="130" fill="#cbd5e1" className="text-[8.5px]">• Renounce previous nationality</text>
              <text x="20" y="142" fill="#94a3b8" className="text-[8px]">  and take Oath of Allegiance</text>

              <rect x="12" y="165" width="176" height="30" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
              <text x="100" y="184" fill="#fde68a" textAnchor="middle" className="text-[8.5px] font-bold">Presidential Certificate of Nat.</text>
            </g>

            {/* Bottom Note */}
            <g transform="translate(100, 240)">
              <text x="240" y="12" fill="#94a3b8" textAnchor="middle" className="text-[9.5px] font-medium">
                Dual Citizenship: A Nigerian by birth may hold foreign citizenship without losing Nigerian status (Section 28).
              </text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 5. Modern Nigerian Electoral Workflow: BVAS & IReV Transmission
  if (type === 'civic-inec-bvas-voting-flow') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Modern Nigerian Electoral Pipeline: Accreditation (BVAS) to IReV
            </h4>
            <p className="text-xs text-slate-400">
              The Electoral Act 2022 integrity workflow at the Polling Unit (PU)
            </p>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
            INEC · Electoral Act 2022
          </span>
        </div>

        <div className="w-full overflow-x-auto py-3">
          <svg viewBox="0 0 680 230" className="w-full max-w-2xl mx-auto min-w-[560px] text-xs font-sans">
            {/* Step 1: PVC Verification */}
            <g transform="translate(15, 30)">
              <rect width="115" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <rect width="115" height="24" rx="6" fill="#0284c7" />
              <rect y="18" width="115" height="6" fill="#0284c7" />
              <text x="57" y="16" fill="#ffffff" textAnchor="middle" className="text-[9.5px] font-bold">1. PVC PRESENT</text>
              <text x="10" y="42" fill="#cbd5e1" className="text-[8px]">• Permanent Voter Card</text>
              <text x="10" y="58" fill="#cbd5e1" className="text-[8px]">• Confirms PU match</text>
              <text x="10" y="74" fill="#cbd5e1" className="text-[8px]">• Queue at registered</text>
              <text x="14" y="86" fill="#94a3b8" className="text-[7.5px]">polling unit location</text>
            </g>

            {/* Arrow 1 */}
            <line x1="130" y1="90" x2="148" y2="90" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="148,90 142,86 142,94" fill="#94a3b8" />

            {/* Step 2: BVAS Biometrics */}
            <g transform="translate(150, 30)">
              <rect width="115" height="120" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <rect width="115" height="24" rx="6" fill="#059669" />
              <rect y="18" width="115" height="6" fill="#059669" />
              <text x="57" y="16" fill="#ffffff" textAnchor="middle" className="text-[9.5px] font-bold">2. BVAS ACCREDIT</text>
              <text x="10" y="42" fill="#cbd5e1" className="text-[8px]">• Bimodal Verification</text>
              <text x="10" y="58" fill="#cbd5e1" className="text-[8px]">• Fingerprint scan</text>
              <text x="10" y="74" fill="#cbd5e1" className="text-[8px]">• Facial recognition</text>
              <text x="10" y="90" fill="#34d399" className="text-[8px] font-bold">★ Stops ghost voting</text>
            </g>

            {/* Arrow 2 */}
            <line x1="265" y1="90" x2="283" y2="90" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="283,90 277,86 277,94" fill="#94a3b8" />

            {/* Step 3: Secret Ballot */}
            <g transform="translate(285, 30)">
              <rect width="115" height="120" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <rect width="115" height="24" rx="6" fill="#d97706" />
              <rect y="18" width="115" height="6" fill="#d97706" />
              <text x="57" y="16" fill="#ffffff" textAnchor="middle" className="text-[9.5px] font-bold">3. SECRET BALLOT</text>
              <text x="10" y="42" fill="#cbd5e1" className="text-[8px]">• Marked ballot paper</text>
              <text x="10" y="58" fill="#cbd5e1" className="text-[8px]">• Thumbprint in booth</text>
              <text x="10" y="74" fill="#cbd5e1" className="text-[8px]">• Drop in clear box</text>
              <text x="10" y="90" fill="#fbbf24" className="text-[8px] font-bold">★ Absolute secrecy</text>
            </g>

            {/* Arrow 3 */}
            <line x1="400" y1="90" x2="418" y2="90" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="418,90 412,86 412,94" fill="#94a3b8" />

            {/* Step 4: PU Count & EC8A */}
            <g transform="translate(420, 30)">
              <rect width="115" height="120" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <rect width="115" height="24" rx="6" fill="#7e22ce" />
              <rect y="18" width="115" height="6" fill="#7e22ce" />
              <text x="57" y="16" fill="#ffffff" textAnchor="middle" className="text-[9.5px] font-bold">4. COUNT &amp; EC8A</text>
              <text x="10" y="42" fill="#cbd5e1" className="text-[8px]">• Open count in public</text>
              <text x="10" y="58" fill="#cbd5e1" className="text-[8px]">• Party agents countersign</text>
              <text x="10" y="74" fill="#cbd5e1" className="text-[8px]">• Results announced</text>
              <text x="10" y="90" fill="#cbd5e1" className="text-[8px]">• Form EC8A filled</text>
            </g>

            {/* Arrow 4 */}
            <line x1="535" y1="90" x2="553" y2="90" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="553,90 547,86 547,94" fill="#94a3b8" />

            {/* Step 5: IReV Upload */}
            <g transform="translate(555, 30)">
              <rect width="115" height="120" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <rect width="115" height="24" rx="6" fill="#047857" />
              <rect y="18" width="115" height="6" fill="#047857" />
              <text x="57" y="16" fill="#ffffff" textAnchor="middle" className="text-[9.5px] font-bold">5. IReV UPLOAD</text>
              <text x="10" y="42" fill="#cbd5e1" className="text-[8px]">• Snapshot of EC8A</text>
              <text x="10" y="58" fill="#cbd5e1" className="text-[8px]">• Transmitted via BVAS</text>
              <text x="10" y="74" fill="#cbd5e1" className="text-[8px]">• Public cloud viewing</text>
              <text x="10" y="90" fill="#34d399" className="text-[8px] font-bold">★ Real-time audit</text>
            </g>

            {/* Bottom summary bar */}
            <g transform="translate(50, 180)">
              <rect width="580" height="30" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="290" y="19" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-semibold">
                Section 47 of Electoral Act 2022: Accreditation with the Bimodal Voter Accreditation System (BVAS) is mandatory by law.
              </text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return null;
};
