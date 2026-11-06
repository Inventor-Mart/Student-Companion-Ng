import React, { useState } from 'react';

export type CRSDiagramType =
  | 'crs-creation-and-sovereignty-timeline'
  | 'crs-covenant-history-and-promises-map'
  | 'crs-exodus-tabernacle-and-route-diagram'
  | 'crs-ten-commandments-tablets';

interface CRSDiagramProps {
  type: CRSDiagramType;
  caption?: string;
}

export const CRSDiagram: React.FC<CRSDiagramProps> = ({ type, caption }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tablets' | 'tabernacle'>('all');

  // 1. Creation and Sovereignty
  if (type === 'crs-creation-and-sovereignty-timeline') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-amber-400">
              The Architecture of Creation: Divine Order, Separation &amp; Fulfillment
            </h4>
            <p className="text-xs text-slate-400">
              Genesis 1 framework: Days 1–3 (Forming the Cosmic Realms) and Days 4–6 (Filling with Inhabitants)
            </p>
          </div>
          <span className="rounded bg-amber-950/80 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800">
            Genesis 1:1 – 2:3
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Column 1: Days 1 to 3 (Forming) */}
            <g transform="translate(30, 20)">
              <rect width="230" height="230" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="115" y="22" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">DAYS 1–3: FORMING (Separation)</text>

              {/* Day 1 */}
              <rect x="15" y="38" width="200" height="52" rx="3" fill="#1e293b" />
              <text x="25" y="54" fill="#fde68a" fontSize="9" fontWeight="bold">DAY 1: Light &amp; Darkness</text>
              <text x="25" y="68" fill="#cbd5e1" fontSize="8">• God said &quot;Let there be light&quot; (Day / Night)</text>
              <text x="25" y="80" fill="#94a3b8" fontSize="7">Realm of Time established</text>

              {/* Day 2 */}
              <rect x="15" y="98" width="200" height="52" rx="3" fill="#1e293b" />
              <text x="25" y="114" fill="#7dd3fc" fontSize="9" fontWeight="bold">DAY 2: Firmament / Sky</text>
              <text x="25" y="128" fill="#cbd5e1" fontSize="8">• Divided waters above from waters below</text>
              <text x="25" y="140" fill="#94a3b8" fontSize="7">Atmosphere &amp; Oceans separated</text>

              {/* Day 3 */}
              <rect x="15" y="158" width="200" height="54" rx="3" fill="#1e293b" />
              <text x="25" y="174" fill="#86efac" fontSize="9" fontWeight="bold">DAY 3: Dry Land &amp; Vegetation</text>
              <text x="25" y="188" fill="#cbd5e1" fontSize="8">• Earth gathered; plants &amp; fruit trees created</text>
              <text x="25" y="200" fill="#94a3b8" fontSize="7">Terrestrial habitat prepared</text>
            </g>

            {/* Column 2: Days 4 to 6 (Filling) */}
            <g transform="translate(280, 20)">
              <rect width="230" height="230" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              <text x="115" y="22" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">DAYS 4–6: FILLING (Inhabitants)</text>

              {/* Day 4 */}
              <rect x="15" y="38" width="200" height="52" rx="3" fill="#1e293b" />
              <text x="25" y="54" fill="#fde68a" fontSize="9" fontWeight="bold">DAY 4: Sun, Moon &amp; Stars</text>
              <text x="25" y="68" fill="#cbd5e1" fontSize="8">• Rule the day and night; signs and seasons</text>
              <text x="25" y="80" fill="#94a3b8" fontSize="7">Fills Day 1 realm of Light</text>

              {/* Day 5 */}
              <rect x="15" y="98" width="200" height="52" rx="3" fill="#1e293b" />
              <text x="25" y="114" fill="#7dd3fc" fontSize="9" fontWeight="bold">DAY 5: Birds of Air &amp; Fish of Sea</text>
              <text x="25" y="128" fill="#cbd5e1" fontSize="8">• Swarms in waters; birds flying across sky</text>
              <text x="25" y="140" fill="#94a3b8" fontSize="7">Fills Day 2 realm of Sea &amp; Sky</text>

              {/* Day 6 */}
              <rect x="15" y="158" width="200" height="54" rx="3" fill="#1e293b" />
              <text x="25" y="174" fill="#86efac" fontSize="9" fontWeight="bold">DAY 6: Animals &amp; Mankind (Imago Dei)</text>
              <text x="25" y="188" fill="#cbd5e1" fontSize="8">• Man created in God&apos;s own image to rule</text>
              <text x="25" y="200" fill="#94a3b8" fontSize="7">Fills Day 3 realm of Dry Land</text>
            </g>

            {/* Bottom Day 7 Sabbath Rest Banner */}
            <g transform="translate(30, 260)">
              <rect width="480" height="38" rx="5" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="240" y="18" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">DAY 7: THE SABBATH REST (Genesis 2:1–3)</text>
              <text x="240" y="30" fill="#e0e7ff" fontSize="8" textAnchor="middle">God completed His creation, rested from all His work, and sanctified the Seventh Day.</text>
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

  // 2. The Biblical Covenants
  if (type === 'crs-covenant-history-and-promises-map') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              The Major Biblical Covenants: Redemptive History &amp; Divine Signs
            </h4>
            <p className="text-xs text-slate-400">
              Evolution of divine covenants from Noah and Abraham to Sinai and the New Covenant
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            Covenant Theology
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* 1. Noahic Covenant */}
            <g transform="translate(25, 20)">
              <rect width="235" height="110" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="15" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">1. NOAHIC COVENANT (Gen 9)</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#7dd3fc">Promise</tspan>: God will never again destroy the</text>
              <text x="25" y="48" fill="#cbd5e1" fontSize="8">earth by universal floodwaters</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#7dd3fc">Parties</tspan>: God, Noah, and all living creatures</text>
              <text x="15" y="80" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#7dd3fc">Covenant Sign</tspan>: The <tspan fill="#fef08a" fontWeight="bold">Rainbow in the clouds</tspan></text>
              <text x="15" y="96" fill="#94a3b8" fontSize="7">Unconditional preservation of the natural order</text>
            </g>

            {/* 2. Abrahamic Covenant */}
            <g transform="translate(280, 20)">
              <rect width="235" height="110" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="15" y="20" fill="#fbbf24" fontSize="10" fontWeight="bold">2. ABRAHAMIC COVENANT (Gen 12 &amp; 17)</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Promises</tspan>: Great nation (seed like stars),</text>
              <text x="25" y="48" fill="#cbd5e1" fontSize="8">Promised Land (Canaan), Universal Blessing</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Condition</tspan>: Faith, obedience, walking blameless</text>
              <text x="15" y="80" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Covenant Sign</tspan>: <tspan fill="#fef08a" fontWeight="bold">Circumcision (Brit Milah)</tspan></text>
              <text x="15" y="96" fill="#94a3b8" fontSize="7">Every male child circumcised at 8 days old</text>
            </g>

            {/* 3. Mosaic (Sinai) Covenant */}
            <g transform="translate(25, 145)">
              <rect width="235" height="110" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="15" y="20" fill="#f87171" fontSize="10" fontWeight="bold">3. MOSAIC / SINAITIC (Exodus 19–24)</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fca5a5">Promise</tspan>: Israel becomes God&apos;s special treasure,</text>
              <text x="25" y="48" fill="#cbd5e1" fontSize="8">a kingdom of priests and a holy nation</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fca5a5">Condition</tspan>: Strict obedience to the Decalogue</text>
              <text x="15" y="80" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fca5a5">Covenant Sign</tspan>: <tspan fill="#fef08a" fontWeight="bold">The Sabbath &amp; Two Tablets</tspan></text>
              <text x="15" y="96" fill="#94a3b8" fontSize="7">Ratified by sacrificial blood sprinkled on people</text>
            </g>

            {/* 4. The New Covenant */}
            <g transform="translate(280, 145)">
              <rect width="235" height="110" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="20" fill="#34d399" fontSize="10" fontWeight="bold">4. THE NEW COVENANT (Jer 31 &amp; Luke 22)</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#86efac">Promise</tspan>: Law written upon human hearts;</text>
              <text x="25" y="48" fill="#cbd5e1" fontSize="8">total forgiveness of sins; universal knowledge</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#86efac">Mediator</tspan>: Jesus Christ (Hebrews 9:15)</text>
              <text x="15" y="80" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#86efac">Covenant Sign</tspan>: <tspan fill="#fef08a" fontWeight="bold">The Lord&apos;s Supper (Cup of Blood)</tspan></text>
              <text x="15" y="96" fill="#94a3b8" fontSize="7">Eternal spiritual regeneration by Grace</text>
            </g>

            {/* Bottom Summary Banner */}
            <g transform="translate(25, 265)">
              <rect width="490" height="35" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="16" fill="#38bdf8" fontSize="9" fontWeight="bold">COVENANT (BERITH) DEFINITION:</text>
              <text x="12" y="28" fill="#cbd5e1" fontSize="8">A sacred, solemn bilateral bond initiated by God, binding two parties with promises, mutual conditions, and visible signs.</text>
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

  // 3. Anatomy of the Tabernacle in the Wilderness
  if (type === 'crs-exodus-tabernacle-and-route-diagram') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-rose-400">
              The Wilderness Tabernacle: Sanctuary of God&apos;s Dwelling Among Israel
            </h4>
            <p className="text-xs text-slate-400">
              Exodus 25–40 architecture: Outer Court, The Holy Place, and The Holy of Holies
            </p>
          </div>
          <span className="rounded bg-rose-950/80 px-2.5 py-1 text-xs font-semibold text-rose-300 border border-rose-800">
            Exodus Sanctuary Plan
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Outer Court Enclosure (Fence of fine linen) */}
            <rect x="30" y="30" width="480" height="230" rx="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
            <text x="40" y="48" fill="#94a3b8" fontSize="9" fontWeight="bold">OUTER COURT (Open to Israeli worshippers)</text>

            {/* Bronze Altar of Burnt Offering */}
            <g transform="translate(60, 95)">
              <rect width="80" height="80" rx="4" fill="#78350f" stroke="#b45309" strokeWidth="2" />
              <text x="40" y="35" fill="#fef3c7" fontSize="8" fontWeight="bold" textAnchor="middle">BRONZE ALTAR</text>
              <text x="40" y="48" fill="#fed7aa" fontSize="7" textAnchor="middle">Of Burnt Offering</text>
              <text x="40" y="60" fill="#fdba74" fontSize="7" textAnchor="middle">(Sacrificial Atonement)</text>
            </g>

            {/* Bronze Basin / Laver */}
            <g transform="translate(160, 110)">
              <circle cx="25" cy="25" r="25" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
              <text x="25" y="24" fill="#f0f9ff" fontSize="8" fontWeight="bold" textAnchor="middle">BRONZE</text>
              <text x="25" y="34" fill="#e0f2fe" fontSize="7" textAnchor="middle">LAVER</text>
              <text x="25" y="62" fill="#7dd3fc" fontSize="7" textAnchor="middle">(Priestly Cleansing)</text>
            </g>

            {/* The Tabernacle Tent Structure */}
            <rect x="230" y="60" width="260" height="170" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="2.5" />
            <text x="360" y="80" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">THE TENT OF MEETING (Sanctuary)</text>

            {/* 1. Holy Place (Priests daily service) */}
            <rect x="245" y="90" width="145" height="125" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="317" y="108" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">1. THE HOLY PLACE</text>

            {/* Table of Showbread (North) */}
            <rect x="255" y="118" width="55" height="22" rx="2" fill="#854d0e" />
            <text x="282" y="132" fill="#fef08a" fontSize="6" fontWeight="bold" textAnchor="middle">Table of Showbread</text>

            {/* Golden Lampstand / Menorah (South) */}
            <rect x="255" y="178" width="55" height="22" rx="2" fill="#854d0e" />
            <text x="282" y="192" fill="#fef08a" fontSize="6" fontWeight="bold" textAnchor="middle">Golden Menorah</text>

            {/* Altar of Incense (Before Veil) */}
            <rect x="335" y="145" width="45" height="30" rx="2" fill="#ca8a04" />
            <text x="357" y="160" fill="#fef9c3" fontSize="6" fontWeight="bold" textAnchor="middle">Altar of</text>
            <text x="357" y="169" fill="#fef9c3" fontSize="6" fontWeight="bold" textAnchor="middle">Incense</text>

            {/* The Thick Veil (Separating Holy Place from Holy of Holies) */}
            <line x1="395" y1="90" x2="395" y2="215" stroke="#ec4899" strokeWidth="4" />
            <text x="395" y="228" fill="#f472b6" fontSize="7" fontWeight="bold" textAnchor="middle">The Veil</text>

            {/* 2. Holy of Holies (Kodesh Hakodashim) */}
            <rect x="405" y="90" width="75" height="125" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="442" y="108" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">HOLY OF</text>
            <text x="442" y="118" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">HOLIES</text>

            {/* Ark of the Covenant */}
            <rect x="415" y="135" width="55" height="40" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
            <text x="442" y="152" fill="#451a03" fontSize="7" fontWeight="bold" textAnchor="middle">ARK OF THE</text>
            <text x="442" y="162" fill="#451a03" fontSize="7" fontWeight="bold" textAnchor="middle">COVENANT</text>
            <text x="442" y="185" fill="#fef08a" fontSize="6" textAnchor="middle">Mercy Seat &amp; Cherubim</text>
            <text x="442" y="202" fill="#fca5a5" fontSize="6" textAnchor="middle">(High Priest 1x/year)</text>

            {/* Bottom Summary Banner */}
            <g transform="translate(30, 268)">
              <rect width="480" height="35" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="16" fill="#fde68a" fontSize="9" fontWeight="bold">HEBREWS TYPOLOGY NOTE:</text>
              <text x="12" y="28" fill="#cbd5e1" fontSize="8">The veil was torn from top to bottom at Jesus&apos; crucifixion (Matt 27:51), granting all believers direct access to the throne of God.</text>
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

  // 4. The Two Tablets of the Ten Commandments
  if (type === 'crs-ten-commandments-tablets') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              The Decalogue (Ten Commandments): Duties Toward God and Fellow Human Beings
            </h4>
            <p className="text-xs text-slate-400">
              Exodus 20 moral law engraved on two stone tablets at Mount Sinai
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
            Exodus 20:1–17
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Tablet 1: Duties Toward God (Commands 1 to 4) */}
            <g transform="translate(30, 20)">
              <path
                d="M 15 40 Q 115 10 215 40 L 215 235 L 15 235 Z"
                fill="#1e293b"
                stroke="#10b981"
                strokeWidth="2"
              />
              <text x="115" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">TABLET I: DUTY TO GOD</text>
              <text x="115" y="55" fill="#a7f3d0" fontSize="8" textAnchor="middle">(Commandments 1–4)</text>

              <g transform="translate(25, 65)">
                <text x="0" y="14" fill="#fef08a" fontSize="8" fontWeight="bold">I. No other gods before Me</text>
                <text x="0" y="26" fill="#cbd5e1" fontSize="7">• Monotheism; exclusive allegiance</text>

                <text x="0" y="46" fill="#fef08a" fontSize="8" fontWeight="bold">II. No graven images or idols</text>
                <text x="0" y="58" fill="#cbd5e1" fontSize="7">• Prohibition of idolatry and false icons</text>

                <text x="0" y="78" fill="#fef08a" fontSize="8" fontWeight="bold">III. Do not take God&apos;s name in vain</text>
                <text x="0" y="90" fill="#cbd5e1" fontSize="7">• Reverence in speech, vows, and worship</text>

                <text x="0" y="110" fill="#fef08a" fontSize="8" fontWeight="bold">IV. Remember the Sabbath Day</text>
                <text x="0" y="122" fill="#cbd5e1" fontSize="7">• Keep it holy; six days labor, seventh rest</text>
              </g>

              <rect x="25" y="200" width="180" height="24" rx="3" fill="#065f46" />
              <text x="115" y="215" fill="#d1fae5" fontSize="8" fontWeight="bold" textAnchor="middle">Great Commandment: Love God</text>
            </g>

            {/* Tablet 2: Duties Toward Fellow Men (Commands 5 to 10) */}
            <g transform="translate(280, 20)">
              <path
                d="M 15 40 Q 115 10 215 40 L 215 235 L 15 235 Z"
                fill="#1e293b"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <text x="115" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">TABLET II: DUTY TO MAN</text>
              <text x="115" y="55" fill="#bae6fd" fontSize="8" textAnchor="middle">(Commandments 5–10)</text>

              <g transform="translate(25, 65)">
                <text x="0" y="12" fill="#7dd3fc" fontSize="8" fontWeight="bold">V. Honor your father and mother</text>
                <text x="0" y="23" fill="#cbd5e1" fontSize="7">• First command with a promise of long life</text>

                <text x="0" y="38" fill="#7dd3fc" fontSize="8" fontWeight="bold">VI. You shall not murder</text>
                <text x="0" y="49" fill="#cbd5e1" fontSize="7">• Sanctity of human life</text>

                <text x="0" y="64" fill="#7dd3fc" fontSize="8" fontWeight="bold">VII. You shall not commit adultery</text>
                <text x="0" y="75" fill="#cbd5e1" fontSize="7">• Sanctity and purity of marriage</text>

                <text x="0" y="90" fill="#7dd3fc" fontSize="8" fontWeight="bold">VIII. You shall not steal</text>
                <text x="0" y="101" fill="#cbd5e1" fontSize="7">• Respect for personal property</text>

                <text x="0" y="116" fill="#7dd3fc" fontSize="8" fontWeight="bold">IX. No false witness / lying</text>
                <text x="0" y="127" fill="#cbd5e1" fontSize="7">• Truth and justice in social witness</text>

                <text x="0" y="142" fill="#7dd3fc" fontSize="8" fontWeight="bold">X. You shall not covet</text>
                <text x="0" y="153" fill="#cbd5e1" fontSize="7">• Internal contentment; control of lust</text>
              </g>

              <rect x="25" y="200" width="180" height="24" rx="3" fill="#0369a1" />
              <text x="115" y="215" fill="#e0f2fe" fontSize="8" fontWeight="bold" textAnchor="middle">Second Commandment: Love Neighbor</text>
            </g>

            {/* Bottom Summary Banner */}
            <g transform="translate(30, 265)">
              <rect width="480" height="38" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="16" fill="#34d399" fontSize="9" fontWeight="bold">JESUS&apos; SUMMARY OF THE LAW (Matthew 22:37–40):</text>
              <text x="12" y="28" fill="#cbd5e1" fontSize="8">&quot;Love the Lord your God with all your heart... and love your neighbor as yourself. On these two depend all the Law and Prophets.&quot;</text>
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
