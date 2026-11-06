import React, { useState } from 'react';

export type CommerceDiagramType =
  | 'commerce-channels-of-distribution'
  | 'commerce-trade-documents-flow'
  | 'commerce-balance-of-trade-payments'
  | 'commerce-stock-exchange-ngx'
  | 'commerce-insurance-principles';

interface CommerceDiagramProps {
  type: CommerceDiagramType;
  caption?: string;
}

export const CommerceDiagram: React.FC<CommerceDiagramProps> = ({ type, caption }) => {
  const [selectedChannel, setSelectedChannel] = useState<'traditional' | 'modern' | 'direct'>('traditional');

  // 1. Channels of Distribution
  if (type === 'commerce-channels-of-distribution') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Commercial Channels of Distribution
            </h4>
            <p className="text-xs text-slate-400">
              Physical and financial flow of commodities from primary producer to final consumer
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'traditional', label: 'Traditional (4-Tier)' },
              { id: 'modern', label: 'Modern Retailer (3-Tier)' },
              { id: 'direct', label: 'Direct / D2C (2-Tier)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedChannel(tab.id as 'traditional' | 'modern' | 'direct')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedChannel === tab.id
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
          <svg viewBox="0 0 540 300" className="w-full max-w-xl select-none">
            <defs>
              <marker id="commArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
              </marker>
              <marker id="moneyArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Stage 1: Manufacturer / Producer */}
            <g transform="translate(20, 50)">
              <rect width="105" height="110" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="52" y="30" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">PRODUCER</text>
              <text x="52" y="48" fill="#cbd5e1" fontSize="10" textAnchor="middle">Manufacturer</text>
              <text x="52" y="64" fill="#94a3b8" fontSize="9" textAnchor="middle">Bulk Output</text>
              <text x="52" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Warehousing</text>
              <rect x="15" y="88" width="75" height="14" rx="3" fill="#1e3a8a" />
              <text x="52" y="99" fill="#bfdbfe" fontSize="8" fontWeight="bold" textAnchor="middle">Creates Goods</text>
            </g>

            {/* Stage 2: Wholesaler */}
            <g transform="translate(155, 50)" opacity={selectedChannel === 'direct' || selectedChannel === 'modern' ? 0.25 : 1}>
              <rect width="105" height="110" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="52" y="30" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">WHOLESALER</text>
              <text x="52" y="48" fill="#cbd5e1" fontSize="10" textAnchor="middle">Middleman</text>
              <text x="52" y="64" fill="#94a3b8" fontSize="9" textAnchor="middle">Buys in Bulk</text>
              <text x="52" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Breaks Bulk</text>
              <rect x="15" y="88" width="75" height="14" rx="3" fill="#065f46" />
              <text x="52" y="99" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">Finances Trade</text>
            </g>

            {/* Stage 3: Retailer */}
            <g transform="translate(290, 50)" opacity={selectedChannel === 'direct' ? 0.25 : 1}>
              <rect width="105" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="52" y="30" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">RETAILER</text>
              <text x="52" y="48" fill="#cbd5e1" fontSize="10" textAnchor="middle">Shop / Market</text>
              <text x="52" y="64" fill="#94a3b8" fontSize="9" textAnchor="middle">Sells in Units</text>
              <text x="52" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Personal Touch</text>
              <rect x="15" y="88" width="75" height="14" rx="3" fill="#78350f" />
              <text x="52" y="99" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">Direct Contact</text>
            </g>

            {/* Stage 4: Consumer */}
            <g transform="translate(420, 50)">
              <rect width="105" height="110" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
              <text x="52" y="30" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">CONSUMER</text>
              <text x="52" y="48" fill="#cbd5e1" fontSize="10" textAnchor="middle">End User</text>
              <text x="52" y="64" fill="#94a3b8" fontSize="9" textAnchor="middle">Uses Utility</text>
              <text x="52" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Creates Demand</text>
              <rect x="15" y="88" width="75" height="14" rx="3" fill="#831843" />
              <text x="52" y="99" fill="#fbcfe8" fontSize="8" fontWeight="bold" textAnchor="middle">Final Recipient</text>
            </g>

            {/* Forward Flow: Goods & Services */}
            {selectedChannel === 'traditional' && (
              <>
                <line x1="125" y1="95" x2="153" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#commArrow)" />
                <line x1="260" y1="95" x2="288" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#commArrow)" />
                <line x1="395" y1="95" x2="418" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#commArrow)" />
              </>
            )}

            {selectedChannel === 'modern' && (
              <>
                <path d="M 125 75 Q 205 30 290 75" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#commArrow)" />
                <text x="205" y="38" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Bypasses Wholesaler</text>
                <line x1="395" y1="95" x2="418" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#commArrow)" />
              </>
            )}

            {selectedChannel === 'direct' && (
              <>
                <path d="M 125 65 Q 270 15 418 65" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#commArrow)" />
                <text x="270" y="24" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Direct-To-Consumer (Online / E-Commerce)</text>
              </>
            )}

            {/* Reverse Flow: Money & Feedback Information */}
            <path d="M 420 185 L 125 185" fill="none" stroke="#f59e0b" strokeWidth="1.75" strokeDasharray="5,4" markerEnd="url(#moneyArrow)" />
            <text x="270" y="200" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
              Flow of Payments (Naira) & Market Feedback Information (Upstream)
            </text>

            {/* Descriptive Legend Card */}
            <g transform="translate(20, 220)">
              <rect width="500" height="65" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="15" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold">CHANNEL CHARACTERISTICS:</text>
              {selectedChannel === 'traditional' && (
                <>
                  <text x="15" y="40" fill="#cbd5e1" fontSize="10">Traditional 4-Tier: Best for low-cost, mass-market groceries (salt, soap, matches) with dispersed rural buyers.</text>
                  <text x="15" y="55" fill="#94a3b8" fontSize="9">Wholesaler finances manufacturer with cash deposits and provides storage warehouses.</text>
                </>
              )}
              {selectedChannel === 'modern' && (
                <>
                  <text x="15" y="40" fill="#cbd5e1" fontSize="10">Modern 3-Tier: Large supermarket chains (Shoprite, SPAR) buy direct from factories in bulk, bypassing wholesalers.</text>
                  <text x="15" y="55" fill="#94a3b8" fontSize="9">Lowers retail markups and speeds up stock turnover in urban shopping malls.</text>
                </>
              )}
              {selectedChannel === 'direct' && (
                <>
                  <text x="15" y="40" fill="#cbd5e1" fontSize="10">Direct 2-Tier (D2C): Industrial machinery, bespoke custom furniture, baked bread, and online direct sales.</text>
                  <text x="15" y="55" fill="#94a3b8" fontSize="9">Eliminates middleman profit markups; manufacturer assumes all distribution risks.</text>
                </>
              )}
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

  // 2. Trade Documents Flow
  if (type === 'commerce-trade-documents-flow') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              Commercial Trade Documents Flow & Transaction Lifecycle
            </h4>
            <p className="text-xs text-slate-400">
              Chronological sequence of documentary evidence in domestic and wholesale trade
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            Audit Trail & Legal Evidence
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 300" className="w-full max-w-xl select-none">
            <defs>
              <marker id="docArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Buyer Column (Left) vs Seller Column (Right) */}
            {/* Headers */}
            <rect x="40" y="20" width="180" height="26" rx="5" fill="#1e3a8a" />
            <text x="130" y="37" fill="#bfdbfe" fontSize="11" fontWeight="bold" textAnchor="middle">BUYER (Purchaser)</text>

            <rect x="320" y="20" width="180" height="26" rx="5" fill="#065f46" />
            <text x="410" y="37" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">SELLER (Supplier)</text>

            {/* Step 1: Letter of Inquiry (Buyer -> Seller) */}
            <g transform="translate(40, 60)">
              <rect width="180" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
              <text x="12" y="19" fill="#f1f5f9" fontSize="10">1. Letter of Inquiry</text>
            </g>
            <line x1="225" y1="75" x2="315" y2="75" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#docArrow)" />

            {/* Step 2: Quotation / Price List / Catalog (Seller -> Buyer) */}
            <g transform="translate(320, 95)">
              <rect width="180" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="12" y="19" fill="#f1f5f9" fontSize="10">2. Quotation / Price List</text>
            </g>
            <line x1="315" y1="110" x2="225" y2="110" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#docArrow)" />

            {/* Step 3: Purchase Order (Buyer -> Seller) */}
            <g transform="translate(40, 130)">
              <rect width="180" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
              <text x="12" y="19" fill="#f1f5f9" fontSize="10">3. Purchase Order (LPO)</text>
            </g>
            <line x1="225" y1="145" x2="315" y2="145" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#docArrow)" />

            {/* Step 4: Invoice & Delivery Note (Seller -> Buyer) */}
            <g transform="translate(320, 165)">
              <rect width="180" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="12" y="19" fill="#f1f5f9" fontSize="10">4. Invoice &amp; Delivery Note</text>
            </g>
            <line x1="315" y1="180" x2="225" y2="180" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#docArrow)" />

            {/* Adjustments: Debit & Credit Notes */}
            <g transform="translate(40, 205)">
              <rect width="180" height="32" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
              <text x="12" y="15" fill="#fbbf24" fontSize="9" fontWeight="bold">Debit Note (Buyer):</text>
              <text x="12" y="27" fill="#cbd5e1" fontSize="8">Informs undercharge / return</text>
            </g>
            <g transform="translate(320, 205)">
              <rect width="180" height="32" rx="4" fill="#1e293b" stroke="#ec4899" strokeWidth="1" />
              <text x="12" y="15" fill="#f472b6" fontSize="9" fontWeight="bold">Credit Note (Seller):</text>
              <text x="12" y="27" fill="#cbd5e1" fontSize="8">Reduces invoice amount owed</text>
            </g>

            {/* Step 5: Statement of Account & Receipt (Final Settlement) */}
            <g transform="translate(100, 250)">
              <rect width="340" height="36" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="170" y="18" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                FINAL PAYMENT: Statement of Account &amp; Official Receipt
              </text>
              <text x="170" y="30" fill="#94a3b8" fontSize="9" textAnchor="middle">
                Receipt proves total debt liquidation; releases seller from further claims.
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

  // 3. Balance of Trade vs. Balance of Payments
  if (type === 'commerce-balance-of-trade-payments') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-purple-400">
              International Trade: Balance of Trade (BOT) vs. Balance of Payments (BOP)
            </h4>
            <p className="text-xs text-slate-400">
              Visible merchandise balances vs. comprehensive international monetary accounts
            </p>
          </div>
          <span className="rounded bg-purple-950/80 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800">
            Visible vs. Invisible Trade
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 300" className="w-full max-w-xl select-none">
            {/* Balance Scale Central Pillar */}
            <rect x="264" y="90" width="12" height="130" rx="3" fill="#64748b" />
            <polygon points="270,60 250,90 290,90" fill="#94a3b8" />
            <rect x="230" y="220" width="80" height="15" rx="4" fill="#334155" />

            {/* Fulcrum and Crossbar */}
            <line x1="120" y1="75" x2="420" y2="75" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="270" cy="75" r="6" fill="#f59e0b" />

            {/* Left Pan: EXPORTS (Credit / Inflows) */}
            <line x1="120" y1="75" x2="80" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="120" y1="75" x2="160" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="60" y="135" width="120" height="70" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="120" y="155" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">TOTAL EXPORTS</text>
            <text x="120" y="172" fill="#a7f3d0" fontSize="9" textAnchor="middle">Visible Goods (Crude Oil, Cocoa)</text>
            <text x="120" y="186" fill="#a7f3d0" fontSize="9" textAnchor="middle">Invisible Services (Aviation, Shipping)</text>
            <text x="120" y="198" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">+ INFLOW (Receipts)</text>

            {/* Right Pan: IMPORTS (Debit / Outflows) */}
            <line x1="420" y1="75" x2="380" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="420" y1="75" x2="460" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="360" y="135" width="120" height="70" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x="420" y="155" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">TOTAL IMPORTS</text>
            <text x="420" y="172" fill="#fca5a5" fontSize="9" textAnchor="middle">Visible Goods (Cars, Machinery)</text>
            <text x="420" y="186" fill="#fca5a5" fontSize="9" textAnchor="middle">Invisible Services (Foreign Tuition)</text>
            <text x="420" y="198" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">- OUTFLOW (Payments)</text>

            {/* Comparison Cards at Bottom */}
            <g transform="translate(30, 245)">
              <rect width="230" height="45" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="18" fill="#38bdf8" fontSize="10" fontWeight="bold">BALANCE OF TRADE (BOT):</text>
              <text x="12" y="34" fill="#cbd5e1" fontSize="9">Visible Exports - Visible Imports</text>
            </g>

            <g transform="translate(280, 245)">
              <rect width="230" height="45" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="18" fill="#f59e0b" fontSize="10" fontWeight="bold">BALANCE OF PAYMENTS (BOP):</text>
              <text x="12" y="34" fill="#cbd5e1" fontSize="9">Total Inflows - Total Outflows (All Accounts)</text>
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

  // 4. Nigerian Capital Market & Stock Exchange (NGX)
  if (type === 'commerce-stock-exchange-ngx') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              The Nigerian Capital Market Architecture &amp; The Nigerian Exchange (NGX)
            </h4>
            <p className="text-xs text-slate-400">
              Regulatory oversight (SEC), Primary vs. Secondary Market, and Stockbroker Intermediation
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
            Capital Market · SEC &amp; NGX
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 620 270" className="w-full max-w-2xl select-none text-xs font-sans">
            {/* Top Level: SEC (Apex Regulator) */}
            <g transform="translate(190, 15)">
              <rect width="240" height="42" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="120" y="20" fill="#a5b4fc" textAnchor="middle" className="text-[11px] font-bold">SECURITIES &amp; EXCHANGE COMMISSION (SEC)</text>
              <text x="120" y="34" fill="#cbd5e1" textAnchor="middle" className="text-[8.5px]">Apex Capital Market Regulatory Authority of Nigeria</text>
            </g>

            {/* Connecting lines from SEC down */}
            <line x1="310" y1="57" x2="310" y2="80" stroke="#818cf8" strokeWidth="2" />

            {/* Middle Level: The Nigerian Exchange Group (NGX) */}
            <g transform="translate(170, 80)">
              <rect width="280" height="42" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="140" y="20" fill="#34d399" textAnchor="middle" className="text-[11px] font-bold">NIGERIAN EXCHANGE GROUP (NGX)</text>
              <text x="140" y="34" fill="#e2e8f0" textAnchor="middle" className="text-[8.5px]">Regulated trading floor for equities, bonds &amp; derivatives</text>
            </g>

            {/* Split from NGX into Primary and Secondary Markets */}
            <path d="M 230 122 L 230 145 L 140 145 L 140 160" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <path d="M 390 122 L 390 145 L 480 145 L 480 160" stroke="#94a3b8" strokeWidth="1.5" fill="none" />

            {/* Sub-Market 1: Primary Market (IPO) */}
            <g transform="translate(30, 160)">
              <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <rect width="220" height="24" rx="6" fill="#0284c7" />
              <rect y="18" width="220" height="6" fill="#0284c7" />
              <text x="110" y="16" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">1. PRIMARY MARKET (NEW ISSUES)</text>
              <text x="12" y="38" fill="#cbd5e1" className="text-[8.5px]">• Initial Public Offerings (IPOs)</text>
              <text x="12" y="54" fill="#cbd5e1" className="text-[8.5px]">• Capital directly raised by companies</text>
              <text x="12" y="70" fill="#cbd5e1" className="text-[8.5px]">• Rights issues and debenture floats</text>
              <text x="12" y="86" fill="#38bdf8" className="text-[8px] font-bold">Transaction: Issuer ➔ Investor</text>
            </g>

            {/* Sub-Market 2: Secondary Market (Stock Exchange) */}
            <g transform="translate(370, 160)">
              <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <rect width="220" height="24" rx="6" fill="#d97706" />
              <rect y="18" width="220" height="6" fill="#d97706" />
              <text x="110" y="16" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">2. SECONDARY MARKET (TRADING)</text>
              <text x="12" y="38" fill="#cbd5e1" className="text-[8.5px]">• Resale of existing shares &amp; securities</text>
              <text x="12" y="54" fill="#cbd5e1" className="text-[8.5px]">• Stockbrokers execute via CSCS portal</text>
              <text x="12" y="70" fill="#cbd5e1" className="text-[8.5px]">• Bulls (expect rise) vs Bears (expect fall)</text>
              <text x="12" y="86" fill="#fbbf24" className="text-[8px] font-bold">Transaction: Investor ➔ Investor</text>
            </g>

            {/* Bull vs Bear market tags */}
            <g transform="translate(260, 175)">
              <rect width="100" height="28" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <text x="50" y="18" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold">▲ BULL (Optimism)</text>
            </g>
            <g transform="translate(260, 215)">
              <rect width="100" height="28" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1" />
              <text x="50" y="18" fill="#fb7185" textAnchor="middle" className="text-[9px] font-bold">▼ BEAR (Pessimism)</text>
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

  // 5. The Six Fundamental Principles of Insurance
  if (type === 'commerce-insurance-principles') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              The Six Fundamental Principles of Insurance
            </h4>
            <p className="text-xs text-slate-400">
              Legal foundation governing insurable risk, claims compensation, and underwriting in Nigeria
            </p>
          </div>
          <span className="rounded bg-indigo-950/80 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-800">
            NAICOM Regulatory Standards
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 640 240" className="w-full max-w-2xl select-none text-xs font-sans">
            {/* Box 1: Insurable Interest */}
            <g transform="translate(15, 20)">
              <rect width="195" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="10" y="22" fill="#38bdf8" className="text-[10px] font-bold">1. INSURABLE INTEREST</text>
              <text x="10" y="40" fill="#cbd5e1" className="text-[8.5px]">The insured must suffer a recognized</text>
              <text x="10" y="54" fill="#cbd5e1" className="text-[8.5px]">direct financial loss if the insured property</text>
              <text x="10" y="68" fill="#cbd5e1" className="text-[8.5px]">is damaged. (Prevents gambling/arson).</text>
            </g>

            {/* Box 2: Utmost Good Faith */}
            <g transform="translate(222, 20)">
              <rect width="195" height="95" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="10" y="22" fill="#34d399" className="text-[10px] font-bold">2. UTMOST GOOD FAITH</text>
              <text x="10" y="40" fill="#cbd5e1" className="text-[8.5px]">Uberrimae Fidei: Both parties must</text>
              <text x="10" y="54" fill="#cbd5e1" className="text-[8.5px]">disclose all material facts honestly</text>
              <text x="10" y="68" fill="#cbd5e1" className="text-[8.5px]">without concealment or fraud.</text>
            </g>

            {/* Box 3: Principle of Indemnity */}
            <g transform="translate(430, 20)">
              <rect width="195" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="10" y="22" fill="#fbbf24" className="text-[10px] font-bold">3. INDEMNITY</text>
              <text x="10" y="40" fill="#cbd5e1" className="text-[8.5px]">Restores the insured to the exact</text>
              <text x="10" y="54" fill="#cbd5e1" className="text-[8.5px]">financial position before loss occurred.</text>
              <text x="10" y="68" fill="#f87171" className="text-[8px] font-bold">★ Cannot profit from insurance!</text>
            </g>

            {/* Box 4: Subrogation */}
            <g transform="translate(15, 125)">
              <rect width="195" height="95" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <text x="10" y="22" fill="#c084fc" className="text-[10px] font-bold">4. SUBROGATION</text>
              <text x="10" y="40" fill="#cbd5e1" className="text-[8.5px]">Once an insurer pays a total loss claim,</text>
              <text x="10" y="54" fill="#cbd5e1" className="text-[8.5px]">all rights to the damaged scrap belong</text>
              <text x="10" y="68" fill="#cbd5e1" className="text-[8.5px]">exclusively to the insurance company.</text>
            </g>

            {/* Box 5: Contribution */}
            <g transform="translate(222, 125)">
              <rect width="195" height="95" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
              <text x="10" y="22" fill="#f472b6" className="text-[10px] font-bold">5. CONTRIBUTION</text>
              <text x="10" y="40" fill="#cbd5e1" className="text-[8.5px]">If property is insured with multiple firms,</text>
              <text x="10" y="54" fill="#cbd5e1" className="text-[8.5px]">each insurer pays only their proportionate</text>
              <text x="10" y="68" fill="#cbd5e1" className="text-[8.5px]">rateable share of the validated loss.</text>
            </g>

            {/* Box 6: Proximate Cause */}
            <g transform="translate(430, 125)">
              <rect width="195" height="95" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="10" y="22" fill="#818cf8" className="text-[10px] font-bold">6. PROXIMATE CAUSE</text>
              <text x="10" y="40" fill="#cbd5e1" className="text-[8.5px]">The direct, active, unbroken cause that</text>
              <text x="10" y="54" fill="#cbd5e1" className="text-[8.5px]">sets in motion an uninterrupted chain of</text>
              <text x="10" y="68" fill="#cbd5e1" className="text-[8.5px]">events leading to the insured peril.</text>
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
