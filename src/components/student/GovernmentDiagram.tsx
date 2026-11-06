import React, { useState } from 'react';

export type GovernmentDiagramType =
  | 'government-federal-vs-unitary-tiers'
  | 'government-presidential-vs-parliamentary'
  | 'government-public-opinion-pressure-flow'
  | 'government-nigeria-constitutional-evolution'
  | 'government-local-government-structure';

interface GovernmentDiagramProps {
  type: GovernmentDiagramType;
  caption?: string;
}

export const GovernmentDiagram: React.FC<GovernmentDiagramProps> = ({ type, caption }) => {
  const [selectedSystem, setSelectedSystem] = useState<'presidential' | 'parliamentary'>('presidential');

  // 1. Federal vs. Unitary Systems
  if (type === 'government-federal-vs-unitary-tiers') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Constitutional Division of Powers: Federal vs. Unitary Systems
            </h4>
            <p className="text-xs text-slate-400">
              Exclusive, Concurrent, and Residual legislative powers in the Nigerian Federation
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
            3-Tier Federation: Federal, State &amp; Local
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Federal Government Pyramid / Hierarchy */}
            {/* Tier 1: Federal Central Government */}
            <g transform="translate(140, 20)">
              <rect width="260" height="65" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="130" y="22" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">FEDERAL GOVERNMENT</text>
              <text x="130" y="38" fill="#cbd5e1" fontSize="10" textAnchor="middle">EXCLUSIVE LEGISLATIVE LIST</text>
              <text x="130" y="52" fill="#94a3b8" fontSize="8" textAnchor="middle">Defense, Foreign Affairs, Currency, Aviation, Customs, Police</text>
            </g>

            {/* Connecting lines to State Level */}
            <line x1="210" y1="85" x2="130" y2="120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="330" y1="85" x2="410" y2="120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Middle Shared Zone: CONCURRENT LEGISLATIVE LIST */}
            <g transform="translate(170, 105)">
              <rect width="200" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="100" y="20" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">CONCURRENT LIST</text>
              <text x="100" y="34" fill="#fde68a" fontSize="8" textAnchor="middle">Shared: Higher Education, Health, Agriculture, Roads</text>
              <text x="100" y="44" fill="#cbd5e1" fontSize="7" textAnchor="middle">Doctrine of Covering the Field (Federal prevails)</text>
            </g>

            {/* Tier 2: 36 State Governments */}
            <g transform="translate(30, 165)">
              <rect width="210" height="60" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="105" y="22" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">36 STATE GOVERNMENTS</text>
              <text x="105" y="38" fill="#a7f3d0" fontSize="9" textAnchor="middle">RESIDUAL LEGISLATIVE LIST</text>
              <text x="105" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Traditional Chieftaincy, State Markets, Local Laws</text>
            </g>

            {/* Tier 3: 774 Local Government Areas */}
            <g transform="translate(300, 165)">
              <rect width="210" height="60" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
              <text x="105" y="22" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">774 LOCAL GOVERNMENTS</text>
              <text x="105" y="38" fill="#fbcfe8" fontSize="9" textAnchor="middle">FOURTH SCHEDULE POWERS</text>
              <text x="105" y="50" fill="#94a3b8" fontSize="8" textAnchor="middle">Motor Parks, Cemeteries, Naming of Streets, Waste</text>
            </g>

            {/* Bottom Comparison Note */}
            <g transform="translate(30, 245)">
              <rect width="480" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="15" y="19" fill="#38bdf8" fontSize="10" fontWeight="bold">FEDERAL VS. UNITARY CONTRAST:</text>
              <text x="15" y="33" fill="#cbd5e1" fontSize="9">Federal: Power is constitutionally divided between central and regional tiers; neither can dissolve the other.</text>
              <text x="15" y="45" fill="#94a3b8" fontSize="8">Unitary (e.g. UK, Ghana): All constitutional power is centralized in one national government; local bodies are mere delegates.</text>
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

  // 2. Presidential vs. Parliamentary Systems
  if (type === 'government-presidential-vs-parliamentary') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              Presidential vs. Parliamentary (Cabinet) Systems of Government
            </h4>
            <p className="text-xs text-slate-400">
              Separation of Powers (USA/Nigeria) vs. Fusion of Powers (UK/Nigeria First Republic)
            </p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSelectedSystem('presidential')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedSystem === 'presidential'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Presidential System
            </button>
            <button
              onClick={() => setSelectedSystem('parliamentary')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedSystem === 'parliamentary'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Parliamentary System
            </button>
          </div>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {selectedSystem === 'presidential' && (
              <g>
                {/* Electorate */}
                <rect x="180" y="15" width="180" height="35" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                <text x="270" y="37" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">THE CITIZEN ELECTORATE</text>

                {/* Direct Vote Arrows to both Legislature and Executive */}
                <line x1="220" y1="50" x2="130" y2="100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                <text x="145" y="70" fill="#38bdf8" fontSize="8" fontWeight="bold">Direct Election</text>

                <line x1="320" y1="50" x2="410" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
                <text x="365" y="70" fill="#34d399" fontSize="8" fontWeight="bold">Direct Election</text>

                {/* Left Branch: LEGISLATURE */}
                <g transform="translate(30, 100)">
                  <rect width="200" height="110" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="100" y="25" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">LEGISLATURE (Congress/NASS)</text>
                  <text x="100" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">Directly elected by people</text>
                  <text x="100" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Fixed 4-year tenure</text>
                  <text x="100" y="75" fill="#94a3b8" fontSize="8" textAnchor="middle">Cannot sit in Executive Cabinet</text>
                  <rect x="20" y="85" width="160" height="15" rx="3" fill="#1e3a8a" />
                  <text x="100" y="96" fill="#bfdbfe" fontSize="8" fontWeight="bold" textAnchor="middle">SEPARATION OF POWERS</text>
                </g>

                {/* Right Branch: EXECUTIVE */}
                <g transform="translate(310, 100)">
                  <rect width="200" height="110" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="100" y="25" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">PRESIDENT &amp; CABINET</text>
                  <text x="100" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">Both Head of State &amp; Govt</text>
                  <text x="100" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Individual Ministerial Responsibility</text>
                  <text x="100" y="75" fill="#94a3b8" fontSize="8" textAnchor="middle">Fixed term (impeachable only)</text>
                  <rect x="20" y="85" width="160" height="15" rx="3" fill="#065f46" />
                  <text x="100" y="96" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">CHECKS &amp; BALANCES</text>
                </g>

                {/* Bottom Panel */}
                <g transform="translate(30, 230)">
                  <rect width="480" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <text x="15" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">KEY FEATURES OF PRESIDENTIAL SYSTEM (Nigeria 1999 Constitution):</text>
                  <text x="15" y="35" fill="#cbd5e1" fontSize="9">1. The President combines ceremonial Head of State and executive Head of Government roles.</text>
                  <text x="15" y="48" fill="#94a3b8" fontSize="8">2. Strict separation of personnel: Ministers cannot be legislators simultaneously.</text>
                </g>
              </g>
            )}

            {selectedSystem === 'parliamentary' && (
              <g>
                {/* Electorate */}
                <rect x="180" y="15" width="180" height="35" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                <text x="270" y="37" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">THE CITIZEN ELECTORATE</text>

                {/* Elects ONLY Parliament */}
                <line x1="270" y1="50" x2="270" y2="90" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="280" y="75" fill="#fbbf24" fontSize="9" fontWeight="bold">Elects Members of Parliament Only</text>

                {/* Parliament Box */}
                <g transform="translate(70, 90)">
                  <rect width="400" height="120" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <text x="200" y="25" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">PARLIAMENT / LEGISLATURE</text>
                  
                  {/* Embedded Cabinet (Fusion of Powers) */}
                  <g transform="translate(40, 35)">
                    <rect width="320" height="70" rx="6" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
                    <text x="160" y="20" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">CABINET / PRIME MINISTER &amp; MINISTERS</text>
                    <text x="160" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">Prime Minister is Head of Government (drawn from majority party in parliament)</text>
                    <text x="160" y="48" fill="#cbd5e1" fontSize="8" textAnchor="middle">Head of State is separate (Ceremonial Monarch or Non-Executive President)</text>
                    <text x="160" y="60" fill="#fbcfe8" fontSize="8" fontWeight="bold" textAnchor="middle">COLLECTIVE RESPONSIBILITY (Falls together on Vote of No Confidence)</text>
                  </g>
                </g>

                {/* Bottom Panel */}
                <g transform="translate(30, 230)">
                  <rect width="480" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <text x="15" y="20" fill="#fbbf24" fontSize="10" fontWeight="bold">KEY FEATURES OF PARLIAMENTARY SYSTEM (Nigeria 1960–1966 &amp; UK):</text>
                  <text x="15" y="35" fill="#cbd5e1" fontSize="9">1. Dual Executive: Ceremonial Head of State (Queen/President) vs. Head of Government (Prime Minister).</text>
                  <text x="15" y="48" fill="#94a3b8" fontSize="8">2. Fusion of powers: All cabinet ministers MUST be elected members of parliament.</text>
                </g>
              </g>
            )}
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

  // 3. Public Opinion & Pressure Groups Flow
  if (type === 'government-public-opinion-pressure-flow') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-purple-400">
              Democratic Policy Cycle: Public Opinion, Pressure Groups &amp; Government
            </h4>
            <p className="text-xs text-slate-400">
              Transmission of citizen demands through the Mass Media and Trade Unions into state legislation
            </p>
          </div>
          <span className="rounded bg-purple-950/80 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800">
            Pluralist Democracy
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 290" className="w-full max-w-xl select-none">
            <defs>
              <marker id="govArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
              </marker>
            </defs>

            {/* Step 1: Citizens & Public Opinion */}
            <g transform="translate(20, 30)">
              <rect width="140" height="85" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="24" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">CITIZEN OPINION</text>
              <text x="70" y="42" fill="#cbd5e1" fontSize="9" textAnchor="middle">Public Grievances</text>
              <text x="70" y="56" fill="#94a3b8" fontSize="8" textAnchor="middle">Needs &amp; Desires</text>
              <text x="70" y="70" fill="#bfdbfe" fontSize="8" fontWeight="bold" textAnchor="middle">Letters &amp; Polls</text>
            </g>

            {/* Step 2: Intermediaries (Pressure Groups & Free Press) */}
            <g transform="translate(200, 30)">
              <rect width="140" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="70" y="24" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">PRESSURE GROUPS</text>
              <text x="70" y="42" fill="#cbd5e1" fontSize="9" textAnchor="middle">NLC, ASUU, NBA, NMA</text>
              <text x="70" y="56" fill="#94a3b8" fontSize="8" textAnchor="middle">The Fourth Estate (Media)</text>
              <text x="70" y="70" fill="#e9d5ff" fontSize="8" fontWeight="bold" textAnchor="middle">LOBBYING &amp; STRIKES</text>
            </g>

            {/* Step 3: Government Policy Makers */}
            <g transform="translate(380, 30)">
              <rect width="140" height="85" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="70" y="24" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">THE STATE (Govt)</text>
              <text x="70" y="42" fill="#cbd5e1" fontSize="9" textAnchor="middle">National Assembly</text>
              <text x="70" y="56" fill="#94a3b8" fontSize="8" textAnchor="middle">Federal Executive</text>
              <text x="70" y="70" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">ENACTS POLICIES</text>
            </g>

            {/* Connecting arrows forward */}
            <line x1="160" y1="72" x2="195" y2="72" stroke="#a855f7" strokeWidth="2" markerEnd="url(#govArrow)" />
            <line x1="340" y1="72" x2="375" y2="72" stroke="#a855f7" strokeWidth="2" markerEnd="url(#govArrow)" />

            {/* Feedback loop backward */}
            <path d="M 450 115 Q 450 170 270 170 Q 90 170 90 120" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,4" markerEnd="url(#govArrow)" />
            <text x="270" y="165" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
              Policy Implementation &amp; Public Feedback Loop (Impact on Citizens)
            </text>

            {/* Bottom Insight Card */}
            <g transform="translate(30, 210)">
              <rect width="480" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="15" y="20" fill="#a7f3d0" fontSize="10" fontWeight="bold">POLITICAL PARTIES VS. PRESSURE GROUPS:</text>
              <text x="15" y="34" fill="#cbd5e1" fontSize="9">Political Parties seek to win elections, capture state power, and form the government.</text>
              <text x="15" y="47" fill="#94a3b8" fontSize="8">Pressure Groups NEVER seek to govern; they influence government policies strictly in the interest of their members.</text>
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

  // 4. Constitutional Evolution Timeline of Nigeria (Colonial to 1999)
  if (type === 'government-nigeria-constitutional-evolution') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Constitutional Development of Nigeria (Colonial to 1999)
            </h4>
            <p className="text-xs text-slate-400">
              Evolution of fundamental laws, regionalism, federation, and democratic governance in Nigeria
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
            Constitutional History · WAEC Core
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 640 280" className="w-full max-w-2xl select-none text-xs font-sans">
            {/* Timeline Horizontal Line */}
            <line x1="30" y1="130" x2="610" y2="130" stroke="#475569" strokeWidth="2.5" />

            {/* 1. Clifford (1922) */}
            <g transform="translate(30, 25)">
              <rect width="130" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="65" y="18" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">CLIFFORD (1922)</text>
              <text x="10" y="36" fill="#cbd5e1" className="text-[8px]">• Elective Principle</text>
              <text x="10" y="50" fill="#cbd5e1" className="text-[8px]">• 4 elected Africans</text>
              <text x="10" y="64" fill="#cbd5e1" className="text-[8px]">• Birthed NNDP (Macaulay)</text>
              <text x="10" y="78" fill="#94a3b8" className="text-[7.5px]">• Isolated Northern region</text>
              {/* Connector to timeline */}
              <line x1="65" y1="90" x2="65" y2="105" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="65" cy="105" r="5" fill="#38bdf8" />
            </g>

            {/* 2. Richards (1946) */}
            <g transform="translate(180, 145)">
              <circle cx="65" cy="-15" r="5" fill="#10b981" />
              <line x1="65" y1="-15" x2="65" y2="0" stroke="#10b981" strokeWidth="2" />
              <rect width="130" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="65" y="18" fill="#34d399" textAnchor="middle" className="text-[10px] font-bold">RICHARDS (1946)</text>
              <text x="10" y="36" fill="#cbd5e1" className="text-[8px]">• Birthed Regionalism</text>
              <text x="10" y="50" fill="#cbd5e1" className="text-[8px]">• North, West &amp; East</text>
              <text x="10" y="64" fill="#cbd5e1" className="text-[8px]">• Linked North to council</text>
              <text x="10" y="78" fill="#f87171" className="text-[7.5px]">• Zero native consultation</text>
            </g>

            {/* 3. Lyttelton (1954) */}
            <g transform="translate(330, 25)">
              <rect width="130" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="65" y="18" fill="#fbbf24" textAnchor="middle" className="text-[10px] font-bold">LYTTELTON (1954)</text>
              <text x="10" y="36" fill="#cbd5e1" className="text-[8px]">• First True Federalism</text>
              <text x="10" y="50" fill="#cbd5e1" className="text-[8px]">• Premier offices created</text>
              <text x="10" y="64" fill="#cbd5e1" className="text-[8px]">• Exclusive &amp; Concurrent</text>
              <text x="10" y="78" fill="#cbd5e1" className="text-[7.5px]">• Civil service regionalized</text>
              {/* Connector to timeline */}
              <line x1="65" y1="90" x2="65" y2="105" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="65" cy="105" r="5" fill="#f59e0b" />
            </g>

            {/* 4. 1960 / 1963 / 1999 */}
            <g transform="translate(480, 145)">
              <circle cx="65" cy="-15" r="5" fill="#a855f7" />
              <line x1="65" y1="-15" x2="65" y2="0" stroke="#a855f7" strokeWidth="2" />
              <rect width="135" height="90" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <text x="67" y="18" fill="#c084fc" textAnchor="middle" className="text-[10px] font-bold">1963 &amp; 1999 CFRN</text>
              <text x="10" y="36" fill="#cbd5e1" className="text-[8px]">• 1963: First Republic</text>
              <text x="10" y="50" fill="#cbd5e1" className="text-[8px]">• Severed British Queen</text>
              <text x="10" y="64" fill="#cbd5e1" className="text-[8px]">• 1999: Fourth Republic</text>
              <text x="10" y="78" fill="#38bdf8" className="text-[7.5px]">• US Presidential System</text>
            </g>

            {/* Bottom summary guide */}
            <g transform="translate(100, 250)">
              <text x="220" y="12" fill="#94a3b8" textAnchor="middle" className="text-[9px] font-medium">
                Milestones: Clifford (Elections) ➔ Richards (Regions) ➔ Macpherson (Consultation) ➔ Lyttelton (Federalism) ➔ 1999 (Presidentialism).
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

  // 5. Local Government Administrative Structure (1976 Reforms)
  if (type === 'government-local-government-structure') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Local Government Structure: 1976 Unified Reforms &amp; 774 LGAs
            </h4>
            <p className="text-xs text-slate-400">
              Third tier of government: Executive Chairman, Supervisory Councilors, Legislative Council, and Career Departments
            </p>
          </div>
          <span className="rounded bg-indigo-950/80 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-800">
            Section 7, 1999 CFRN
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 620 270" className="w-full max-w-2xl select-none text-xs font-sans">
            {/* Top Level: Executive Chairman */}
            <g transform="translate(180, 15)">
              <rect width="260" height="42" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="130" y="20" fill="#34d399" textAnchor="middle" className="text-[11px] font-bold">EXECUTIVE CHAIRMAN</text>
              <text x="130" y="34" fill="#cbd5e1" textAnchor="middle" className="text-[8.5px]">Political Chief Executive &amp; Accounting Officer</text>
            </g>

            {/* Downward line */}
            <line x1="310" y1="57" x2="310" y2="80" stroke="#10b981" strokeWidth="2" />

            {/* Level 2: Vice Chairman & Supervisory Councilors */}
            <g transform="translate(140, 80)">
              <rect width="340" height="40" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="170" y="19" fill="#a5b4fc" textAnchor="middle" className="text-[10px] font-bold">VICE CHAIRMAN &amp; SUPERVISORY COUNCILORS</text>
              <text x="170" y="32" fill="#cbd5e1" textAnchor="middle" className="text-[8px]">Cabinet heads of Health, Works, Agriculture, Education</text>
            </g>

            {/* Left branch: Legislative Council */}
            <line x1="200" y1="120" x2="110" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
            <g transform="translate(20, 145)">
              <rect width="180" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="90" y="20" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">LEGISLATIVE COUNCIL</text>
              <text x="10" y="36" fill="#cbd5e1" className="text-[8px]">• Ward Councilors</text>
              <text x="10" y="48" fill="#cbd5e1" className="text-[8px]">• Passes local bye-laws</text>
            </g>

            {/* Right branch: Career Bureaucracy */}
            <line x1="420" y1="120" x2="510" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
            <g transform="translate(420, 145)">
              <rect width="180" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="90" y="20" fill="#fbbf24" textAnchor="middle" className="text-[10px] font-bold">CAREER BUREAUCRACY</text>
              <text x="10" y="36" fill="#cbd5e1" className="text-[8px]">• Secretary to Local Govt</text>
              <text x="10" y="48" fill="#cbd5e1" className="text-[8px]">• Heads of Service Depts</text>
            </g>

            {/* Bottom 5 Core Departments Bar */}
            <g transform="translate(30, 220)">
              <rect width="560" height="34" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="280" y="21" fill="#34d399" textAnchor="middle" className="text-[9px] font-semibold">
                Core Departments: 1. Administration &amp; General Duties | 2. Finance &amp; Supplies | 3. Works &amp; Housing | 4. Primary Health Care | 5. Agriculture &amp; Social Development
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
