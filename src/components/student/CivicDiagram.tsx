import React, { useState } from 'react';

export type CivicDiagramType =
  | 'civic-citizenship-rights-duties'
  | 'civic-three-arms-of-government'
  | 'civic-electoral-process-cycle';

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

  return null;
};
