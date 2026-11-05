import { CurriculumTopic } from '../types';

export const JSS2_REMAINING_SUBJECTS_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // BUSINESS STUDIES (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-bus-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'The Ledger & The Principle of Double Entry Bookkeeping',
    subtopics: ['Concept of the Ledger as the Principal Book of Accounts', 'The Golden Rule of Double Entry (Debit vs Credit)', 'Ledger Account Structure ("T" Account Format)', 'Posting Transactions from Source Documents with Worked Examples'],
    readingTimeMinutes: 10,
    summary: 'Comprehensive analysis of double-entry bookkeeping, the T-account ledger architecture, rules of debits and credits, and posting transactions with real-world Nigerian commercial examples.',
    contentMarkdown: `### 1. What is the Ledger?
In financial accounting and bookkeeping, the **Ledger** is the principal and permanent book of accounts where all business transactions recorded initially in subsidiary daybooks are posted into individual classified accounts (e.g. Cash Account, Sales Account, Purchases Account, Capital Account).

#### The Golden Rule of Double Entry Bookkeeping:
> **For every debit entry, there must be an equal and corresponding credit entry.**
> 
> - **DEBIT (Dr.)** the receiver / account receiving value (increases in assets and expenses; decreases in liabilities and capital).
> - **CREDIT (Cr.)** the giver / account giving value (increases in liabilities, capital, and revenue; decreases in assets).

---

### 2. Anatomy of a "T" Account Ledger:
Every ledger account is structured in the shape of a capital letter **"T"**:
- **Left Side = DEBIT (Dr.)**
- **Right Side = CREDIT (Cr.)**

| Debit Side (Dr.) | Date / Particulars / Folio / Amount (₦) | Credit Side (Cr.) | Date / Particulars / Folio / Amount (₦) |
|---|---|---|---|
| Records: Value entering the account | Inflow of economic benefits | Records: Value leaving the account | Outflow of economic benefits |

---

### 3. Worked Nigerian Case Study:
**Alhaji Musa Enterprise (Kano)** started trading on February 1, 2026, with the following transactions:
1. *Feb 1:* Commenced business with ₦200,000 cash capital.
   - *Debit:* Cash Account (₦200,000 entering business cash vault).
   - *Credit:* Capital Account (₦200,000 value supplied by Alhaji Musa).
2. *Feb 4:* Bought bags of groundnut for resale paying ₦60,000 cash.
   - *Debit:* Purchases Account (₦60,000 goods entering inventory).
   - *Credit:* Cash Account (₦60,000 leaving cash vault).
3. *Feb 8:* Sold groundnuts for ₦95,000 cash.
   - *Debit:* Cash Account (₦95,000 entering).
   - *Credit:* Sales Account (₦95,000 value given out as revenue).

#### Ledger Posting Demonstration:

**CASH ACCOUNT (Dr.)**
| Date | Particulars | Amount (₦) | Date | Particulars | Amount (₦) |
|---|---|---|---|---|---|
| Feb 1 | Capital | 200,000 | Feb 4 | Purchases | 60,000 |
| Feb 8 | Sales | 95,000 | Feb 28 | Balance c/d | 235,000 |
| **Total** | | **295,000** | **Total** | | **295,000** |

**PURCHASES ACCOUNT**
| Date | Particulars | Amount (₦) | Date | Particulars | Amount (₦) |
|---|---|---|---|---|---|
| Feb 4 | Cash | 60,000 | Feb 28 | Balance c/d | 60,000 |

**SALES ACCOUNT**
| Date | Particulars | Amount (₦) | Date | Particulars | Amount (₦) |
|---|---|---|---|---|---|
| Feb 28 | Balance c/d | 95,000 | Feb 8 | Cash | 95,000 |`,
    keyTakeaways: [
      'The ledger is the principal book of accounts where transactions are permanently categorized.',
      'Double entry rule: Debit the receiver (assets/expenses increase), Credit the giver (liabilities/income increase).',
      'The closing balance carried down (c/d) is brought down (b/d) as the opening balance for the next period.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Extraction & Preparation of the Trial Balance',
    subtopics: ['Meaning and Objectives of the Trial Balance', 'Rules for Extracting Ledger Balances (Debit vs Credit Items)', 'Step-by-Step Trial Balance Preparation', 'Types of Accounting Errors Not Disclosed by a Trial Balance'],
    readingTimeMinutes: 10,
    summary: 'Verifying mathematical ledger accuracy using the Trial Balance, identifying balanced debit and credit columns, and analyzing accounting errors.',
    contentMarkdown: `### 1. What is a Trial Balance?
A **Trial Balance** is a financial statement listing the balances extracted from all ledger accounts on a specific date, divided into Debit and Credit columns, to test the arithmetical accuracy of the double entry postings.

#### Primary Objectives:
- To verify that total debits equal total credits ($Dr. = Cr.$).
- To serve as the foundational launching pad for preparing final accounts (Trading, Profit & Loss Account, and Balance Sheet).

---

### 2. Classification of Balances in the Trial Balance:
- **DEBIT Column Items:** All Assets (Plant, Motor Vehicles, Stock, Debtors, Bank, Cash) and all Expenses/Losses (Rent, Salaries, Electricity, Carriage Inwards, Purchases).
- **CREDIT Column Items:** Capital, all Liabilities (Creditors, Bank Overdraft, Loans), and all Incomes/Gains (Sales, Commission Received, Discount Received).

---

### 3. Worked Example: Chukwudi Trading Store (Onitsha)
As of February 28, 2026, the ledger account balances were:
- Capital: ₦150,000
- Purchases: ₦80,000
- Sales: ₦110,000
- Rent & Rates: ₦15,000
- Motor Van (Asset): ₦70,000
- Debtors: ₦25,000
- Creditors: ₦30,000
- Cash at Bank: ₦100,000

#### Chukwudi Trading Store — Trial Balance as at February 28, 2026:
| Account Title | Debit (₦) | Credit (₦) | Explanation |
|---|---|---|---|
| Capital | | 150,000 | Owner's equity liability to the firm |
| Purchases | 80,000 | | Cost of goods bought for resale (Expense) |
| Sales | | 110,000 | Gross turnover revenue (Income) |
| Rent & Rates | 15,000 | | Operational overhead (Expense) |
| Motor Delivery Van | 70,000 | | Fixed productive asset |
| Trade Debtors (Owed to us) | 25,000 | | Current asset |
| Trade Creditors (We owe) | | 30,000 | Current liability |
| Cash at Zenith Bank | 100,000 | | Liquid current asset |
| **TOTAL** | **₦290,000** | **₦290,000** | **Both columns match perfectly!** |

---

### 4. Errors Not Revealed by the Trial Balance:
Even when the Trial Balance balances, serious bookkeeping errors may still exist:
1. **Error of Omission:** A transaction is completely forgotten and not recorded anywhere.
2. **Error of Commission:** Entering the correct amount into the wrong person's account (e.g. debited Ade instead of Adamu).
3. **Error of Principle:** Violating fundamental accounting concepts (e.g. treating purchase of a generator van as an operational repair expense).
4. **Compensating Error:** Two separate errors on opposite sides that coincidentally cancel each other out.`,
    keyTakeaways: [
      'The Trial Balance tests the arithmetical accuracy of ledger double-entry postings.',
      'Assets and expenses always appear on the Debit side; liabilities, capital, and revenues on the Credit side.',
      'Errors of omission, commission, and principle do not affect Trial Balance equality.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'The Petty Cash Book & The Imprest System',
    subtopics: ['Meaning of Petty Cash and Petty Cashier', 'The Imprest System and Cash Float', 'Format of Columnar Analysis Petty Cash Book', 'Preparing Petty Cash Vouchers and Reimbursements'],
    readingTimeMinutes: 9,
    summary: 'Managing minor day-to-day office expenditures using the Imprest System, petty cash vouchers, and columnar analysis books.',
    contentMarkdown: `### 1. What is Petty Cash?
Large Nigerian corporate offices cannot draw bank cheques every time they need to buy postage stamps, broom sticks, envelope packets, or pay ₦500 for dispatch rider fuel. Minor everyday disbursements are called **Petty Cash Expenses**.

#### The Imprest System:
- The chief accountant grants the **Petty Cashier** a fixed round sum of money at the start of a period (e.g., ₦30,000 per month) called the **Cash Float** or **Imprest**.
- As expenditures occur, the petty cashier disburses cash only upon receiving a signed **Petty Cash Voucher (PCV)**.
- At the end of the period, the chief accountant inspects the receipts and reimburses the exact total amount spent, restoring the petty cashier's float back to the original ₦30,000.

---

### 2. Format of the Columnar Analysis Petty Cash Book:

| Receipts (₦) | Date | Particulars | V.No | Total Paid (₦) | Postage & Courier (₦) | Stationery (₦) | Office Tea & Cleaning (₦) | Transport (₦) |
|---|---|---|---|---|---|---|---|---|
| 30,000 | Mar 1 | Cash Float Received | - | - | - | - | - | - |
| | Mar 3 | Postal Stamps | 101 | 2,500 | 2,500 | | | |
| | Mar 5 | Ream of A4 Paper | 102 | 4,500 | | 4,500 | | |
| | Mar 8 | Detergent & Broom | 103 | 3,000 | | | 3,000 | |
| | Mar 12| Taxi to Federal High Court | 104| 5,000 | | | | 5,000 |
| | Mar 15| Sugar and Milk for office | 105| 4,000 | | | 4,000 | |
| **30,000** | | **Totals Spent** | | **19,000** | **2,500** | **4,500** | **7,000** | **5,000** |
| | Mar 31| Balance carried down | | 11,000 | | | | |
| 19,000 | Apr 1 | Reimbursement Received| - | - | *(Float restored to ₦30,000)* | | | |`,
    keyTakeaways: [
      'The petty cash book handles minor everyday office expenses without issuing bank cheques.',
      'Under the imprest system, the exact amount disbursed is reimbursed to restore the original float.',
      'No cash is disbursed without an approved Petty Cash Voucher (PCV).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Commercial Banking Services & Electronic Payment Systems in Nigeria',
    subtopics: ['Functions of Nigerian Commercial Banks (Zenith, Access, First Bank, GTBank)', 'Types of Bank Accounts (Current, Savings, Fixed Deposit)', 'Electronic Banking Channels: ATM, POS, USSD, NIBSS Instant Payment', 'Cheques: Open vs Crossed Cheques and Endorsements'],
    readingTimeMinutes: 9,
    summary: 'The Nigerian financial ecosystem, banking instruments, clearing mechanisms, and mobile fintech digital payments.',
    contentMarkdown: `### 1. Types of Bank Accounts in Nigeria:
- **Savings Account:** Designed for small savers; earns modest interest; withdrawals via ATM or debit cards.
- **Current (Checking) Account:** Designed for businesses and merchants; issues cheque books; allows bank overdrafts; bank charges Account Maintenance Fees (AMF).
- **Fixed Deposit Account:** Money lodged for a specified maturity period (e.g., 90, 180, or 365 days) yielding higher contractual interest; penalty for premature liquidation.

---

### 2. Cheques & Crossing:
A cheque is an unconditional written order addressed by an account holder to their bank directing payment of a stated sum to a named beneficiary.
- **Open Cheque:** Can be presented at the bank counter and encashed immediately across the teller window.
- **Crossed Cheque:** Features two parallel transverse lines across its face (*"& Co."* or *"Account Payee Only"*). **Cannot be cashed over the counter;** must be deposited into the payee's bank account, ensuring complete security against theft.

---

### 3. Electronic Banking Channels in Nigeria:
- **NIBSS Instant Payment (NIP):** Automated interbank payment system enabling real-time money transfers between Nigerian banks.
- **POS Terminals:** Electronic devices utilized by supermarket cashiers and agency banking operators across streets.
- **USSD Code Banking:** Shortcodes (e.g. *737#, *901#) enabling financial transfers without active internet connection.`,
    keyTakeaways: [
      'Current accounts issue chequebooks and permit overdrafts; savings accounts earn interest for individuals.',
      'Crossing a cheque protects against fraud by mandating payment only through a bank account.',
      'NIBSS and USSD enable seamless electronic payments across Nigeria.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Trade Documents: Inquiry to Statement of Account',
    subtopics: ['The Commercial Transaction Cycle', 'Order of Commercial Documents in Home Trade', 'Pro-forma Invoice vs Commercial Invoice', 'Debit Note vs Credit Note and Statement of Account'],
    readingTimeMinutes: 9,
    summary: 'The documentation trail in commercial commerce: letters of inquiry, quotation, pro-forma invoices, delivery notes, and monthly statements.',
    contentMarkdown: `### 1. The Commercial Trade Documentation Flowchart:
A commercial buying transaction follows a strict chronological sequence of written documents:

- **1. Letter of Inquiry:** Sent by the prospective buyer asking about product availability, prices, and delivery terms.
- **2. Quotation / Price List / Catalogue:** Sent by seller stating prices, discount terms, and delivery specifications.
- **3. Purchase Order:** Formal order sent by buyer requesting shipment of specified goods.
- **4. Delivery Note / Waybill:** Accompanies goods in transit; signed by buyer upon inspecting and receiving physical crates.
- **5. Commercial Invoice:** Formal bill detailing goods supplied, prices, trade discounts, and net balance payable.
- **6. Credit Note:** Issued by seller to buyer to **reduce** the invoice bill (e.g., when buyer returns damaged goods). Printed in **red ink**.
- **7. Debit Note:** Issued by seller to **increase** the invoice bill when goods were accidentally undercharged.
- **8. Statement of Account:** Monthly summary of all transactions, invoices, payments, and unpaid balances.`,
    keyTakeaways: [
      'A quotation answers an inquiry; an invoice demands payment for goods delivered.',
      'Credit notes reduce a customer’s bill (printed in red); debit notes correct undercharges.',
      'A waybill proves that goods were physically carried and delivered by the transporter.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Insurance Principles & Risk Management in Nigerian Business',
    subtopics: ['Meaning of Insurance vs Assurance', 'Insurable vs Non-Insurable Risks', 'Fundamental Principles of Insurance (Insurable Interest, Utmost Good Faith, Indemnity)', 'Types of Insurance Policies in Nigeria (Motor, Fire, Marine, Life)'],
    readingTimeMinutes: 9,
    summary: 'Risk pooling mechanisms, contract indemnity, loss mitigation, and mandatory insurance policies in Nigeria.',
    contentMarkdown: `### 1. Insurance vs Assurance
- **Insurance:** Protection against an event that **may or may not** happen (e.g. fire outbreak, motor car accident, theft, marine shipwreck).
- **Assurance:** Protection against an event that is **certain** to happen eventually, though the exact time is unknown (e.g. life assurance / death).

---

### 2. Fundamental Principles of Insurance:
1. **Utmost Good Faith (*Uberrimae Fidei*):** Both parties must disclose all material facts honestly without concealment. Concealing an existing heart ailment voids a health insurance policy.
2. **Insurable Interest:** The insured must suffer direct financial loss if the insured property is damaged. You cannot insure your neighbour's house because you have no financial loss if it burns.
3. **Indemnity:** The insurer restores the insured to the exact financial position enjoyed immediately before the loss occurred. **No one is allowed to profit from insurance.**
4. **Subrogation:** Once the insurance company pays full compensation for a totaled car, the damaged scrap metal belongs to the insurer.
5. **Proximate Cause:** The direct, dominant cause that set the chain of events leading to the damage in motion must be covered by the policy.`,
    keyTakeaways: [
      'Insurance covers risks that may occur; assurance covers inevitable life events.',
      'Indemnity restores the insured to their prior financial state; insurance is never a tool for profit.',
      'Utmost Good Faith requires complete, honest disclosure of all material facts.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Business Communication: Channels, Barriers & Modern Media',
    subtopics: ['Definition and Process of Business Communication', 'Internal vs External Communication Channels', 'Barriers to Effective Business Communication', 'Modern Media: Video Conferencing, Email & Corporate Intranets'],
    readingTimeMinutes: 8,
    summary: 'Information transfer in corporate organizations, downward and upward communication flows, noise barriers, and electronic collaboration.',
    contentMarkdown: `### 1. The Communication Process Model:
Communication is the process of transmitting meaningful information, thoughts, and instructions from a sender to a receiver through an appropriate channel, resulting in feedback.

- **Sender:** Conceives and encodes the message into words, symbols, or graphics.
- **Channel / Medium:** The transmission vehicle (memo, email, circular, telephone, video meeting).
- **Receiver:** Decodes and interprets the message.
- **Feedback:** The receiver's response confirming understanding.
- **Noise / Barrier:** Any interference that distorts message transmission.

---

### 2. Direction of Communication Flows in an Organization:
- **Downward Communication:** From managers down to subordinates (memos, company policies, operational directives).
- **Upward Communication:** From junior employees up to directors (complaints, progress reports, suggestion boxes).
- **Horizontal (Lateral) Communication:** Between peers in different departments (e.g. Sales Manager consulting the Production Manager).`,
    keyTakeaways: [
      'Communication is only complete when the sender receives feedback from the receiver.',
      'Downward communication transmits directives; upward communication transmits employee feedback.',
      'Noise and ambiguous language act as major barriers to business understanding.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Consumer Protection Agencies: FCCPC, NAFDAC, SON & NDLEA',
    subtopics: ['The Need for Consumer Protection in Nigerian Markets', 'Statutory Roles of FCCPC (Competition & Consumer Redress)', 'NAFDAC: Regulating Food, Drugs & Medical Consumables', 'SON: The Standards Organisation of Nigeria & NIS Certification Mark'],
    readingTimeMinutes: 8,
    summary: 'Public regulatory authorities protecting Nigerian buyers against adulterated drugs, fake building materials, and monopoly price gouging.',
    contentMarkdown: `### 1. Why Consumers Need Institutional Protection:
In open markets (Alaba, Idumota, Ariaria), unscrupulous traders sometimes sell fake medications, expired canned foods, undersized electrical cables, and unwholesome sachet water. Government agencies enforce consumer safety and fair competition.

---

### 2. Key Nigerian Regulatory Agencies:

| Agency Name | Founding Act & Scope | Key Consumer Protection Duties |
|---|---|---|
| **FCCPC** (Federal Competition and Consumer Protection Commission) | FCCP Act 2018 | Eliminates price-fixing cartels, investigates customer exploitation, and compels retailers to refund damaged goods. |
| **NAFDAC** (National Agency for Food & Drug Administration & Control) | Decree 15 of 1993 | Inspects and licenses foods, pharmaceuticals, cosmetics, bottled water, and medical devices. Enforces NAFDAC registration numbers. |
| **SON** (Standards Organisation of Nigeria) | SON Act 2015 | Tests manufactured industrial goods (cement, roofing sheets, cables) and awards the **MANCAP** and **NIS** quality certification marks. |
| **NDLEA** (National Drug Law Enforcement Agency) | NDLEA Act | Intercepts illicit narcotics and halts illegal distribution of addictive psychotropic substances. |`,
    keyTakeaways: [
      'FCCPC protects buyers against anti-competitive price monopolies and secures refunds.',
      'NAFDAC guards foods, cosmetics, and drugs; SON certifies industrial manufacturing standards with the NIS mark.',
      'Always check the expiry date and NAFDAC registration number before buying packaged goods.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Market Structures: Perfect Competition vs Monopoly & Oligopoly',
    subtopics: ['Meaning of Market Structure', 'Features of Perfect Competition (Price Takers)', 'Monopoly: Single Seller Dominance in Nigerian Utilities', 'Oligopoly: Rivalry among Few Giants (Nigerian Telecommunications)'],
    readingTimeMinutes: 9,
    summary: 'Microeconomic market frameworks in Nigeria, competitive price determination, monopoly power, and telecommunications oligopolies.',
    contentMarkdown: `### 1. Perfect Competition
A market structure characterized by a large number of buyers and sellers trading homogeneous (identical) goods with no single participant able to influence market price:
- *Features:* Freedom of entry and exit, identical products, perfect information.
- *Nigerian Example:* Yam sellers in Mile 12 Market or Bodija Market where price is determined purely by forces of market demand and supply.

---

### 2. Monopoly vs Oligopoly:
- **Monopoly:** A market dominated by a single supplier with no close substitutes, possessing significant pricing power:
  - *Example:* The Transmission Company of Nigeria (TCN) controlling the national electricity grid, or Nigerian Railway Corporation (NRC).
- **Oligopoly:** Market dominated by a few large corporate firms whose pricing decisions are mutually interdependent:
  - *Example:* The Nigerian GSM telecommunications sector (MTN, Airtel, Globacom, 9mobile). Intense non-price competition occurs through advertisements and promotional bundle giveaways.`,
    keyTakeaways: [
      'Under perfect competition, sellers are price takers with identical goods.',
      'Monopolies have a single seller with high barriers to entry; oligopolies are dominated by a few giants.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-bus-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Office Equipment & Keyboarding Techniques',
    subtopics: ['Modern Office Equipment (Photocopiers, Scanners, Shredders, Franking Machines)', 'Maintenance of Business Machines', 'Touch Keyboarding: Home Row Keys (ASDF - JKL;)', 'Correct Typing Posture and Ergonomic Care'],
    readingTimeMinutes: 8,
    summary: 'Hardware machinery in modern commercial administration, touch typing proficiency on QWERTY keyboards, and office maintenance.',
    contentMarkdown: `### 1. Essential Office Machines:
- **Photocopier:** Produces exact photographic duplicates of documents on paper rapidly.
- **Document Scanner:** Converts paper documents into digital image and PDF files for computer storage.
- **Paper Shredder:** Destroys sensitive, confidential records into illegible strips to prevent corporate espionage.
- **Franking Machine:** Automatically stamps official postage payment marks onto envelopes, replacing manual stamps.

---

### 2. Touch Typing on the QWERTY Keyboard:
Touch typing is typing accurately without looking at the keyboard keys, relying on muscle memory:
- **Home Row Keys:**
  - *Left Hand Fingers:* **A - S - D - F** (Little finger on A, index finger on F).
  - *Right Hand Fingers:* **J - K - L - ;** (Index finger on J, little finger on semi-colon).
  - *Thumbs:* Rest lightly over the **Space Bar**.
- **Tactile Guide Bumps:** Keyboards have small raised tactile ridges on the **F** and **J** keys to help typists place their index fingers accurately without looking down.`,
    keyTakeaways: [
      'Paper shredders safeguard corporate confidentiality by destroying sensitive records.',
      'The Home Row keys are ASDF (left hand) and JKL; (right hand).',
      'The raised ridges on the F and J keys orient fingers for touch typing without looking.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // CIVIC EDUCATION (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-civ-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Pillars of Democracy: Independent Judiciary, Press & Free Elections',
    subtopics: ['Meaning and Origins of Democracy', 'The Three Arms of Democratic Government', 'The Role of an Independent Judiciary', 'Freedom of the Press and Civil Society Organizations'],
    readingTimeMinutes: 9,
    summary: 'The institutional framework supporting democratic governance in Nigeria, the separation of powers doctrine, and rule of law safeguards.',
    contentMarkdown: `### 1. What is Democracy?
Originating from the Greek words *Demos* (people) and *Kratos* (power), democracy is a system of government where supreme political power is vested in the people and exercised directly by them or through elected representatives.

#### The Three Arms of Democratic Government (Separation of Powers):
1. **The Legislature (National Assembly - Senate & House of Representatives):** Enacts statutory laws, screens ministerial appointees, and passes the national budget.
2. **The Executive (President, Governors, Ministers, Civil Service):** Implements, enforces, and administers laws passed by the legislature.
3. **The Judiciary (Supreme Court, Court of Appeal, High Courts):** Interprets the laws, resolves electoral disputes, and protects fundamental rights against abuse.

---

### 2. Core Pillars Safeguarding Nigerian Democracy:
- **Independent Electoral Body (INEC):** Conducts impartial, transparent elections.
- **The Free Press (The Fourth Estate):** Investigative journalists exposing corruption and holding leaders accountable.
- **Rule of Law:** Equal application of laws to all citizens regardless of status.`,
    keyTakeaways: [
      'Democracy is government of the people, by the people, and for the people.',
      'Separation of powers ensures no single arm becomes tyrannical through checks and balances.',
      'An independent judiciary is the ultimate protector of the common citizen.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Elections & The Electoral Process in Nigeria',
    subtopics: ['Meaning and Importance of Elections', 'Features of Free and Fair Elections', 'The Role of INEC (Independent National Electoral Commission)', 'Voter Registration and The Bimodal Voter Accreditation System (BVAS)'],
    readingTimeMinutes: 9,
    summary: 'The mechanics of democratic elections in Nigeria, voting procedures, technological innovations (BVAS, IReV), and combating electoral vices.',
    contentMarkdown: `### 1. What is an Election?
An election is the formal democratic process through which eligible citizens cast secret ballots to select individuals to hold political executive and legislative offices.

#### Features of Free and Fair Elections:
- **Universal Adult Suffrage:** Every citizen aged 18 and above has the legal right to vote without discrimination.
- **Secret Ballot System:** Votes are cast in private booths without intimidation or vote buyers watching.
- **Independent Electoral Commission:** Free from political interference by the ruling party.
- **Equal Access to Media:** All political parties have fair opportunities to campaign.

---

### 2. Technological Innovations in Nigerian Elections:
- **BVAS (Bimodal Voter Accreditation System):** Electronic device that scans both fingerprints and facial biometrics to authenticate voters, preventing ghost voting and multiple registrations.
- **IReV (INEC Result Viewing Portal):** Web platform where polling unit agents upload photographed result sheets (Form EC8A) for public transparency.`,
    keyTakeaways: [
      'In Nigeria, voting age is 18 years under universal adult suffrage.',
      'The secret ballot guarantees voters can vote according to their conscience without fear.',
      'BVAS authenticates voters using facial and fingerprint biometrics to prevent electoral fraud.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Electoral Malpractices: Causes, Consequences & Prevention',
    subtopics: ['Forms of Electoral Malpractice (Ballot Snatching, Vote Buying, Result Falsification)', 'Root Causes of Malpractice in Nigeria', 'Consequences on National Development and Governance', 'Solutions and Penal Provisions under the Electoral Act 2022'],
    readingTimeMinutes: 8,
    summary: 'Critical study of electoral vices undermining democratic legitimacy, vote merchandising, and legal penalties under the Electoral Act.',
    contentMarkdown: `### 1. Forms of Electoral Malpractice:
- **Vote Buying ("See Reason / Stomach Infrastructure"):** Distributing cash, noodles, or cloth to voters at polling stations to influence choices.
- **Ballot Box Snatching & Thuggery:** Armed thugs attacking polling centers to destroy or steal ballot boxes in opponent strongholds.
- **Underage Voting:** Registering children below 18 years to vote illegally.
- **Falsification of Results:** Altering figures on result sheets during collation.

---

### 2. Consequences of Malpractice:
- **Imposition of Incompetent Leaders:** Corrupt politicians who buy votes feel no accountability to construct hospitals or schools.
- **Post-Election Violence:** Civil unrest, destruction of property, and loss of innocent lives.
- **Loss of International Respect:** Sanctions and reduced foreign direct investment in the economy.

---

### 3. Legal Solutions:
The Electoral Act 2022 prescribes heavy jail sentences (up to 3 years) and substantial fines for anyone convicted of vote buying or hijacking electoral materials.`,
    keyTakeaways: [
      'Vote buying and ballot snatching rob citizens of genuine democratic governance.',
      'The Electoral Act 2022 imposes strict prison terms for electoral malpractice offenders.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Human Trafficking: Causes, Effects & The Role of NAPTIP',
    subtopics: ['Definition of Human Trafficking (Modern Slavery)', 'Methods Used by Traffickers (Deception, False Job Offers)', 'Consequences on Victims and National Image', 'The Mandate of NAPTIP in Rehabilitation and Prosecution'],
    readingTimeMinutes: 9,
    summary: 'Combating modern-day human trafficking, child labor exploitation, illegal migrant routes, and NAPTIP legal enforcement.',
    contentMarkdown: `### 1. What is Human Trafficking?
Human trafficking is the recruitment, transportation, transfer, harbouring, or receipt of persons by means of threat, force, deception, or coercion for the purpose of exploitation (forced labour, prostitution, illegal organ harvesting).

#### Deceptive Tactics Used by Traffickers:
- Promising gullible rural parents lucrative domestic housemaid jobs in European or Gulf cities.
- Promising young boys European professional football academy trials.
- Using sacred oath rituals (*juju*) to instill psychological terror and silence victims.

---

### 2. The Role of NAPTIP:
The **National Agency for the Prohibition of Trafficking in Persons (NAPTIP)** was established in 2003:
- Rescues trafficked victims from local and international slavery networks.
- Operates rehabilitation shelters offering medical, psychological, and vocational counseling.
- Investigates and prosecutes trafficking syndicates, securing long prison sentences for offenders.`,
    keyTakeaways: [
      'Human trafficking exploits vulnerable victims through deception, force, and false promises.',
      'NAPTIP is the federal agency dedicated to rescuing victims and prosecuting traffickers.',
      'Report suspicious travel recruitment agents to the nearest NAPTIP or police office.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Courage & National Integrity Icons in Nigeria',
    subtopics: ['Meaning of Moral Courage vs Physical Courage', 'Attributes of Courageous Individuals', 'Nigerian Integrity Icons (Prof. Dora Akunyili, Chief Gani Fawehinmi)', 'How Young Students Can Demonstrate Moral Courage'],
    readingTimeMinutes: 8,
    summary: 'Standing firmly for righteousness against public pressure, moral heroism, and the legacy of celebrated Nigerian patriots.',
    contentMarkdown: `### 1. Moral Courage vs Physical Courage
- **Physical Courage:** The willingness to face bodily danger, pain, or death (e.g. A soldier defending the nation against terrorists).
- **Moral Courage:** The determination to stand up for ethical truth, justice, and honesty despite facing ridicule, threats, loss of popularity, or job loss.

---

### 2. Celebrated Nigerian Integrity Icons:
- **Prof. Dora Akunyili (1954–2014):** As Director-General of NAFDAC, she showed fearless moral courage in confronting powerful drug cartels, surviving assassination attempts, and drastically reducing fake drugs in Nigeria.
- **Chief Gani Fawehinmi (SAN) (1938–2009):** Celebrated as the *"Senior Advocate of the Masses"* (SAM), he suffered multiple detentions under military regimes while defending human rights and free legal aid for the poor.`,
    keyTakeaways: [
      'Moral courage means doing what is right despite fear, intimidation, or peer pressure.',
      'Prof. Dora Akunyili and Gani Fawehinmi exemplify selfless dedication to truth and public integrity.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'The Nigerian Legal System & The Judiciary',
    subtopics: ['Hierarchy of Nigerian Courts (Supreme Court to Magistrate/Customary)', 'Functions of the Judiciary in a Federation', 'The Chief Justice of Nigeria (CJN) and Judicial Independence', 'Access to Justice and Legal Aid'],
    readingTimeMinutes: 8,
    summary: 'The judicial branch of government, appellate hierarchies, constitutional interpretation, and protecting citizen rights.',
    contentMarkdown: `### 1. Hierarchy of Courts in Nigeria:
The judicial hierarchy establishes which courts have higher authority to hear appeals from lower courts:

- **1. Supreme Court of Nigeria:** The highest and final court of the land located in Abuja; presided over by the Chief Justice of Nigeria (CJN). Its decisions are final and binding on all other courts.
- **2. Court of Appeal:** Second highest court; hears appeals arising from the Federal and State High Courts.
- **3. High Courts / Federal High Court / National Industrial Court:** Trial courts with original jurisdiction over major civil, criminal, constitutional, and labor disputes.
- **4. Lower Courts:** Magistrate Courts, Customary Courts, and Sharia Courts adjudicating local disputes.`,
    keyTakeaways: [
      'The Supreme Court is the apex court in Nigeria, presided over by the Chief Justice of Nigeria.',
      'Judicial independence ensures judges make rulings free from executive or political coercion.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Emergency Situations & Disaster Management in Nigeria',
    subtopics: ['Meaning of Emergency Situations (Natural vs Man-Made)', 'Flooding, Building Collapses & Fire Outbreaks', 'The Mandate of NEMA (National Emergency Management Agency)', 'Citizen Roles during Disaster Relief Operations'],
    readingTimeMinutes: 7,
    summary: 'Classifying civil and environmental emergencies, emergency protocols, relief distribution, and civilian crisis cooperation.',
    contentMarkdown: `### 1. Types of Emergencies:
- **Natural Disasters:** Flooding caused by torrential rains or dam water release, coastal sea surges, and drought.
- **Man-Made Disasters:** Structural building collapses caused by substandard cement blocks, pipeline explosions, market fire outbreaks from electrical sparks, and industrial gas leaks.

---

### 2. NEMA’s Operational Protocols:
- **Preparedness & Warning:** Broadcasting weather and flood alerts to vulnerable communities along River Niger and River Benue.
- **Rescue Operations:** Collaborating with military helicopters, boats, and ambulances to evacuate trapped citizens.
- **Relief Material Distribution:** Supplying food, blankets, mattresses, clean water, and medicine to Internally Displaced Persons (IDP) camps.`,
    keyTakeaways: [
      'Disasters can be natural (floods, drought) or man-made (fire, building collapse).',
      'NEMA coordinates rescue operations and delivers humanitarian relief across Nigeria.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Anti-Corruption Agencies: EFCC & ICPC',
    subtopics: ['Meaning and Types of Corruption in Public & Private Sectors', 'Economic & Financial Crimes Commission (EFCC Mandate)', 'Independent Corrupt Practices Commission (ICPC Mandate)', 'Whistleblowing and The War on Cybercrime (Yahoo)'],
    readingTimeMinutes: 8,
    summary: 'The statutory framework against bribery, public fund embezzlement, advance fee fraud, and institutional integrity in Nigeria.',
    contentMarkdown: `### 1. EFCC vs ICPC:
Nigeria established two specialized federal agencies to combat corruption and financial crimes:

- **EFCC (Economic and Financial Crimes Commission):**
  - Established in 2003 under the EFCC Establishment Act.
  - Investigates financial crimes, cybercrime, advance fee fraud (419), money laundering, and illegal oil bunkering.
  - Recovers stolen public assets and prosecutes corrupt bank executives and government contractors.
- **ICPC (Independent Corrupt Practices and Other Related Offences Commission):**
  - Established in 2000 under the Corrupt Practices Act.
  - Focuses on bribery, extortion, contract inflation, and systemic graft within the public civil service.`,
    keyTakeaways: [
      'EFCC investigates financial crimes, money laundering, and online fraud.',
      'ICPC focuses on systemic bribery and corruption within public civil institutions.',
      'Corruption hinders infrastructure, school funding, and national development.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Consumer Redress & Protection in Nigeria',
    subtopics: ['Concept of Consumer Redress', 'Channels for Lodging Complaints Against Defective Products', 'Role of the Consumer Court and FCCPC Tribunals', 'Consumer Responsibilities (Inspecting Receipts, Warranty Cards)'],
    readingTimeMinutes: 7,
    summary: 'Legal avenues for consumer restitution, warranty enforcement, compensation for hazardous items, and proactive buyer vigilance.',
    contentMarkdown: `### 1. What is Consumer Redress?
Consumer redress is the right of a consumer who has suffered financial loss, injury, or dissatisfaction from purchasing a defective product or substandard service to seek fair compensation, replacement, or a complete monetary refund.

#### Steps to Secure Consumer Redress in Nigeria:
1. Retain the original purchase receipt, cash voucher, and warranty documentation.
2. Return to the merchant politely stating the specific defect and requested remedy (repair, replacement, or refund).
3. If the merchant refuses, lodge a formal petition with the **FCCPC** (online at \`fccpc.gov.ng\`) or the relevant state Consumer Protection Agency.`,
    keyTakeaways: [
      'Consumers are legally entitled to refund, replacement, or repair for defective purchases.',
      'Always keep receipts and warranty cards as essential evidence for dispute resolution.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-civ-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Civic Responsibility & Peaceful Coexistence',
    subtopics: ['Meaning of Peaceful Coexistence in a Pluralistic Nation', 'Promoting Inter-Religious Harmony (Christian-Muslim Dialogue)', 'Conflict Resolution Mechanisms (Mediation, Compromise)', 'Youth Participation in Community Development'],
    readingTimeMinutes: 7,
    summary: 'Harmonious coexistence across diverse ethnic and religious communities in Nigeria, conflict resolution, and youth civic engagement.',
    contentMarkdown: `### 1. Peaceful Coexistence
Peaceful coexistence is the ability of diverse ethnic, cultural, and religious communities to live together harmoniously without violence, discrimination, or bigotry.

#### Core Virtues Promoting Harmony:
- **Religious Tolerance:** Respecting the rights of others to worship in mosques, churches, or traditional shrines without insults or provocation.
- **Mediation & Dialogue:** Resolving land or market disputes through community chiefs, elders, and joint consultative committees rather than resorting to riots.
- **Youth Vanguard for Peace:** Rejecting manipulation by selfish politicians who seek to recruit youths as political thugs during elections.`,
    keyTakeaways: [
      'Peaceful coexistence requires active mutual respect and religious tolerance.',
      'Youths must reject political thuggery and champion community peace.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // SOCIAL STUDIES (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-sos-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Marriage Institutions in Nigeria: Forms & Conditions',
    subtopics: ['Meaning and Purpose of Marriage', 'Customary / Traditional Marriage Practices', 'Statutory (Court / Registry) Marriage under the Marriage Act', 'Islamic Marriage (Nikah) & Christian Church Marriage'],
    readingTimeMinutes: 9,
    summary: 'The legal and cultural foundations of matrimony in Nigeria, dowry/bride price, marriage registries, and family stability.',
    contentMarkdown: `### 1. Types of Marriage Recognised in Nigerian Law:
Marriage is the legally and culturally recognized union between a man and a woman as husband and wife.

| Marriage Type | Governing Authority | Key Features & Requirements | Legal Status |
|---|---|---|---|
| **Customary / Traditional** | Native Customs & Traditions | Introduction ceremony, bride price (*Ime Ego*, *Eru Iyawo*), consent of extended families. | Permits Polygyny (a man marrying multiple wives). |
| **Statutory (Court)** | Marriage Act of Nigeria | Conducted in a federal/state Marriage Registry (e.g. Ikoyi Registry). | **Strictly Monogamous:** One man and one woman to the exclusion of all others. |
| **Islamic (Nikah)** | Sharia Islamic Jurisprudence | Walimah, payment of *Mahr* (dowry to bride), consent of *Wali* (guardian), witnesses. | Permits up to four wives under strict conditions of equal justice. |

---

### 2. Purposes of Marriage:
- Companionship and emotional security.
- Biological procreation and legitimate continuation of family lineage.
- Uniting distinct extended families and fostering inter-communal solidarity.`,
    keyTakeaways: [
      'Nigeria recognizes Customary, Statutory (Registry), and Islamic forms of marriage.',
      'Statutory marriage is strictly monogamous; customary and Islamic marriages permit polygyny.',
      'Marriage provides a stable, legitimate environment for procreation and child socialization.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Family Conflicts: Causes, Effects & Peaceful Resolutions',
    subtopics: ['Meaning of Family Conflict', 'Common Causes of Conflict (Financial Stress, Infidelity, Interference)', 'Effects of Dysfunctional Homes on Children', 'Peaceful Resolution Mechanisms (Counselling, Mediation)'],
    readingTimeMinutes: 8,
    summary: 'Dynamics of domestic discord, financial strain, external interference, and therapeutic conflict resolution.',
    contentMarkdown: `### 1. Common Causes of Family Conflicts:
- **Financial Scarcity:** Inability to pay school fees, buy food, or manage rent pressures.
- **External Interference:** In-laws meddling in couple decisions.
- **Lack of Effective Communication:** Harboring secret grudges, insults, and verbal abuse.
- **Unfaithfulness & Domestic Violence:** Breaching marital trust.

---

### 2. Effects of Broken Homes on Growing Children:
- Severe emotional trauma, anxiety, and depression.
- Decline in academic performance and school dropout.
- Increased vulnerability to negative peer pressure, street begging, and juvenile delinquency.

---

### 3. Conflict Resolution Strategies:
- Open, empathetic dialogue without shouting.
- Mediation by respected neutral family elders or professional marriage counselors.
- Mutual forgiveness and equitable financial budgeting.`,
    keyTakeaways: [
      'Financial strain and poor communication are primary catalysts of domestic conflict.',
      'Children from broken homes face heightened emotional and academic challenges.',
      'Early mediation and honest dialogue preserve family unity.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Gender Roles & Gender Equity in Modern Nigeria',
    subtopics: ['Sex vs Gender (Biological vs Social Construct)', 'Traditional Gender Stereotypes in Nigeria', 'The Need for Gender Equity and Girl-Child Education', 'Prominent Nigerian Women Leaders (Ngozi Okonjo-Iweala, Amina Mohammed)'],
    readingTimeMinutes: 8,
    summary: 'Distinguishing biological sex from cultural gender roles, eliminating discrimination, and championing girl-child education in Nigeria.',
    contentMarkdown: `### 1. Sex vs Gender
- **Sex:** The biological and physiological differences between males and females determined by chromosomes and anatomy (e.g. males produce sperm, females give birth).
- **Gender:** The socially and culturally learned behaviors, roles, expectations, and attitudes assigned to men and women by society.

---

### 2. Overcoming Traditional Harmful Stereotypes:
In traditional settings, girls were often denied formal education under the false belief that *"a woman's education ends in the kitchen."*
- **The Modern Reality:** Educating a girl transforms whole communities.
- **Global Examples of Nigerian Excellence:**
  - **Dr. Ngozi Okonjo-Iweala:** Director-General of the World Trade Organization (WTO).
  - **Amina J. Mohammed:** Deputy Secretary-General of the United Nations (UN).`,
    keyTakeaways: [
      'Sex is biological; gender is a cultural and social construct.',
      'Educating girls breaks generational poverty and drives national economic progress.',
      'Women have proven leadership excellence across governance, business, and science.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Cultism: History, Initiation Rites, Dangers & Prevention',
    subtopics: ['Origin of Cultism in Nigerian Universities (The Pyrates Confraternity 1952)', 'How Fraternities Degenerated into Violent Secret Cults', 'Deceptive Initiation Rites and Blood Oaths', 'Legal and Social Consequences of Cultism'],
    readingTimeMinutes: 9,
    summary: 'The historical evolution of campus fraternities into violent cults, the psychology of coercion, and legal sanctions against cultism.',
    contentMarkdown: `### 1. Historical Evolution of Cultism
In 1952, seven university students at the University College, Ibadan (led by **Wole Soyinka**) formed the **Pyrates Confraternity (The Magnificent Seven)** with non-violent objectives: to promote chivalry, combat colonial elitism, and enjoy intellectual camaraderie.
- Over decades, offshoot groups (Black Axe, Eiye, Buccaneers, Vikings) degenerated into violent, armed criminal cults using guns, machetes, and dark spiritual oaths to intimidate students and terrorize campuses.

---

### 2. Dangers and Consequences:
- **Premature Death:** Violent turf wars resulting in murder and bodily maiming.
- **Criminal Prosecution:** Cultism is a serious felony carrying long prison terms (up to 21 years) without option of fine in many Nigerian states.
- **Academic Destruction:** Automatic expulsion from secondary schools and universities.`,
    keyTakeaways: [
      'Early 1952 university fraternities were non-violent; modern cults are criminal syndicates.',
      'Cultism leads to premature death, academic expulsion, and lengthy prison terms.',
      'Never yield to threats; report cultist advances immediately to school authorities.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Drug Trafficking & The National Drug Law Enforcement Agency (NDLEA)',
    subtopics: ['Meaning of Drug Trafficking', 'Common Illicit Drugs (Cannabis, Cocaine, Heroin, Tramadol)', 'Reasons for Drug Trafficking (Greed, Poverty, Ignorance)', 'The Mandate of NDLEA in Airport Interceptions and Border Security'],
    readingTimeMinutes: 9,
    summary: 'International narcotics trade, health and economic wreckage, drug courier risks, and NDLEA interdiction.',
    contentMarkdown: `### 1. What is Drug Trafficking?
Drug trafficking is the unlawful commercial cultivation, manufacture, smuggling, distribution, and sale of illegal narcotic substances across state or national borders.

#### Illicit Substances:
- **Cannabis Sativa (Indian Hemp):** Locally grown illegal hallucinogen.
- **Opioids & Synthetic Drugs:** Unprescribed Tramadol, Codeine cough syrups.
- **Hard Narcotics:** Cocaine (from coca leaves in South America) and Heroin (from opium poppy in Asia).

---

### 2. The Mandate of NDLEA:
Established in 1989, the **National Drug Law Enforcement Agency (NDLEA)**:
- Deploys sniffer dogs and body scanners at international airports (Lagos, Abuja, Kano) and seaports to detect swallowed drug pellets and concealed narcotics.
- Destroys illegal cannabis plantations across forest reserves.
- Operates rehabilitation clinics for addicts and prosecutes drug barons in federal courts.`,
    keyTakeaways: [
      'Drug trafficking is a dangerous international crime punishable by life imprisonment.',
      'The NDLEA intercepts narcotics at airports, seaports, and borders, prosecuting traffickers.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Road Safety Guidelines & Federal Road Safety Corps (FRSC)',
    subtopics: ['Analysis of Nigerian Road Traffic Accidents', 'The Three Main Categories of Road Traffic Signs (Regulatory, Warning, Informative)', 'Seatbelt and Speed Limiter Regulations', 'Emergency Rescue Protocols on Highways'],
    readingTimeMinutes: 8,
    summary: 'Highway engineering codes, categorization of road traffic signs, driver behavior, and FRSC crash prevention enforcement.',
    contentMarkdown: `### 1. Categories of Road Traffic Signs:

| Sign Category | Shape & Border | Color Scheme | Meaning & Examples |
|---|---|---|---|
| **Regulatory Signs (Mandatory / Prohibitory)** | Circular | Red border on white background (or blue circle) | **Must be obeyed!** Speed limit (e.g. 50 km/h), Stop, No Entry, No U-Turn. |
| **Warning Signs (Cautionary)** | Triangular | Red border on yellow/white background | **Alerts driver to hazard ahead!** Sharp bend, narrow bridge, pedestrian crossing, cattle crossing. |
| **Informative / Directional Signs** | Rectangular | Green, blue, or brown background | **Provides directional guidance!** Hospital ahead, fuel station, distance to Abuja/Lagos. |

---

### 2. Major Safety Enforcements:
- Mandatory seatbelt use for both driver and front-seat passengers.
- Installation of speed limiting devices on commercial haulage trucks and buses.
- Absolute ban on using mobile phones while operating a vehicle.`,
    keyTakeaways: [
      'Circular traffic signs are regulatory and compulsory; triangular signs give advance warning of hazards.',
      'Wearing seatbelts reduces fatality rates by over 50% during vehicular collisions.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Science, Technology & Social Change in Nigeria',
    subtopics: ['Meaning of Science and Technology', 'Positive Impacts on Nigerian Society (Communication, Health, Agriculture)', 'Negative Impacts (Cybercrime, Pollution, Cultural Erosion)', 'Balancing Technological Adoption with Moral Integrity'],
    readingTimeMinutes: 8,
    summary: 'Evaluating how technological transformations shape social relationships, commercial enterprise, and cultural identity across Nigeria.',
    contentMarkdown: `### 1. Technological Revolution in Nigeria:
- **Agriculture:** Mechanized tractors, high-yielding hybrid seeds, and drip irrigation have replaced subsistence hoes and cutlasses.
- **Healthcare:** Diagnostic ultrasound scans, MRI machines, and telemedicine connect rural patients with urban specialists.
- **Banking:** Cashless transfers, ATM debit cards, and fintech applications have largely replaced banking hall queues.

---

### 2. The Dark Side of Technological Advance:
- **Cybercrime & Fraud (Yahoo-Yahoo):** Tarnishing the international reputation of Nigerian youths.
- **Social Disconnection:** Excessive screen time causing youth isolation, anxiety, and breakdown of traditional family conversation.
- **Industrial Environmental Pollution:** Flaring of associated natural gas in oil-bearing Niger Delta communities degrading air quality.`,
    keyTakeaways: [
      'Technology accelerates agricultural productivity, communication, and modern medicine.',
      'Youths must harness technological tools productively rather than for destructive cybercrime.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'National Integration & Unity in Diversity',
    subtopics: ['Meaning of National Integration', 'Federal Character Principle and The Nigerian Quota System', 'Institutions Fostering Integration (NYSC, Federal Unity Schools)', 'Overcoming Tribalism, Ethnocentrism & Nepotism'],
    readingTimeMinutes: 8,
    summary: 'Building a unified national identity across over 250 ethnic groups, federal character mechanisms, and patriotic civic solidarity.',
    contentMarkdown: `### 1. What is National Integration?
National integration is the deliberate process of uniting disparate ethnic, cultural, and religious nationalities within a country into a cohesive, harmonious nation with a shared sense of patriotic identity.

#### Federal Institutions Fostering Nigerian Unity:
- **National Youth Service Corps (NYSC):** Established in 1973; deploys university graduates to serve in states far from their geopolitical zones of origin to learn local languages, customs, and cultivate lifelong inter-ethnic friendships.
- **Federal Unity Colleges (110 Unity Schools):** Secondary boarding schools admitting students from every Nigerian state based on national merit and state quota to foster childhood bonding.
- **Federal Character Commission (FCC):** Enforces fair, equitable representation of all 36 states in federal civil service and military recruitments.`,
    keyTakeaways: [
      'National integration welds diverse ethnic groups into a harmonious nation.',
      'The NYSC scheme and Federal Unity Colleges are key institutional bridges for national unity.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Environmental Sanitation & Waste Management Systems',
    subtopics: ['Meaning of Environmental Sanitation', 'Types of Waste (Solid, Liquid, Gaseous)', 'Waste Disposal Methods (Incineration, Sanitary Landfills, Recycling)', 'Role of State Waste Management Agencies (e.g. LAWMA, ASEPA)'],
    readingTimeMinutes: 7,
    summary: 'Public hygiene practices, municipal solid waste management, the 3Rs of recycling, and community disease prevention.',
    contentMarkdown: `### 1. Types of Waste:
- **Solid Waste:** Household garbage, plastic bags (pure water sachets), food remnants, tin cans.
- **Liquid Waste:** Sewage, kitchen washwater, industrial chemical effluents poured into streams.
- **Gaseous Waste:** Smoke from bushfires, generator fumes, motor vehicle exhaust containing carbon monoxide.

---

### 2. The 3Rs Waste Management Hierarchy:
1. **Reduce:** Minimize the quantity of disposable items used daily.
2. **Reuse:** Find secondary uses for glass bottles, plastic containers, and cardboard cartons.
3. **Recycle:** Industrial processing of waste materials (e.g. melting scrap plastic bottles into polyester fibers or new buckets).`,
    keyTakeaways: [
      'Proper waste disposal prevents breeding of disease vectors (mosquitoes, houseflies, rodents).',
      'The 3Rs hierarchy—Reduce, Reuse, Recycle—conserves natural resources and eliminates street clutter.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sos-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Social Values & National Re-Orientation',
    subtopics: ['Erosion of Traditional Nigerian Moral Values', 'The "Get-Rich-Quick" Syndrome among Modern Youths', 'National Orientation Agency (NOA) Campaigns', 'Reclaiming Integrity, Hard Work & Communal Empathy'],
    readingTimeMinutes: 8,
    summary: 'Restoring foundational ethical standards in Nigerian society, combating instant gratification, and civic patriotism.',
    contentMarkdown: `### 1. The Crisis of Modern Values
In recent decades, Nigerian society has suffered a worrisome erosion of noble indigenous values:
- Respect for elders and hard work is being overshadowed by the **"Get-Rich-Quick" syndrome**, where wealth is celebrated regardless of whether it was acquired through armed robbery, embezzlement, or online fraud.
- Communal solidarity (*"I am because we are"*) is being replaced by greedy individual selfishness.

---

### 2. National Re-Orientation:
The **National Orientation Agency (NOA)** leads state campaigns to revive core civic virtues:
- **Dignity of Labour:** Respect for honest, diligent work (farming, teaching, trade, craftsmanship).
- **Patriotism & Civic Pride:** Standing tall for Nigeria and safeguarding public property.
- **Moral Integrity:** Choosing honest poverty over dishonest luxury.`,
    keyTakeaways: [
      'Diligence, honesty, and communal empathy are the foundational pillars of national greatness.',
      'True success is built through consistent hard work, not fraudulent short-cuts.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // CHRISTIAN RELIGIOUS STUDIES (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-crs-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'The Baptism & Temptation of Jesus Christ',
    subtopics: ['The Ministry of John the Baptist in River Jordan', 'The Baptism of Jesus and The Divine Confirmation (Matthew 3)', 'The Three Temptations in the Wilderness (Luke 4)', 'Biblical Strategies for Overcoming Temptation'],
    readingTimeMinutes: 9,
    summary: 'The formal inauguration of Christ’s public ministry, divine confirmation by the Holy Spirit, and overcoming demonic temptation using Scripture.',
    contentMarkdown: `### 1. The Baptism in the River Jordan
When Jesus was about thirty years old, He came to the River Jordan to be baptized by John the Baptist.
- John hesitated: *"I need to be baptized by you, and do you come to me?"*
- Jesus replied: *"Let it be so now; it is proper for us to do this to fulfill all righteousness."*
- As Jesus came up out of the water, the heavens opened and the Holy Spirit descended in bodily form like a dove upon Him. A voice from heaven proclaimed:
  > *"This is my beloved Son, with whom I am well pleased."* (Matthew 3:17)

---

### 2. The Three Temptations in the Wilderness:
Led by the Spirit into the Judean desert, Jesus fasted for forty days and forty nights:
1. **Physical Appetite (Bread):** *"If you are the Son of God, tell this stone to become bread."*
   - *Jesus answered:* *"It is written: Man shall not live on bread alone, but on every word that comes from the mouth of God."*
2. **Presumption & Fame (Temple Pinnacle):** *"Throw yourself down from here, for angels will guard you."*
   - *Jesus answered:* *"It is said: Do not put the Lord your God to the test."*
3. **Power & Wealth (Worship the Devil):** Satan offered all the kingdoms of the world in exchange for worship.
   - *Jesus answered:* *"Away from me, Satan! For it is written: Worship the Lord your God, and serve Him only."*`,
    keyTakeaways: [
      'Jesus was baptized to fulfill all righteousness and inaugurate His public ministry.',
      'Jesus defeated every satanic temptation by quoting relevant Scriptures ("It is written").'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'The Call of the Twelve Apostles & The Cost of Discipleship',
    subtopics: ['Calling the First Four Fishermen (Peter, Andrew, James, John)', 'The Call of Matthew (Levi) the Tax Collector', 'Names and Backgrounds of the Twelve Apostles', 'Demands and Cost of True Discipleship (Luke 9:23)'],
    readingTimeMinutes: 9,
    summary: 'Jesus selecting twelve ordinary men from varied backgrounds to be apostles, and the moral commitment of discipleship.',
    contentMarkdown: `### 1. The Call of the Fishermen & Tax Collector
Walking by the Sea of Galilee, Jesus saw Simon Peter and his brother Andrew casting nets. He said: *"Come, follow me, and I will make you fishers of men."* They left their nets immediately.
- Later, Jesus saw **Matthew (Levi)** sitting at the tax collector’s booth and called him. Despite public contempt for tax collectors, Matthew abandoned his lucrative ledger to follow Christ.

---

### 2. The Twelve Apostles:
1. Simon (called Peter)
2. Andrew (Peter's brother)
3. James son of Zebedee
4. John (James' brother)
5. Philip
6. Bartholomew (Nathanael)
7. Thomas (Didymus)
8. Matthew (the tax collector)
9. James son of Alphaeus
10. Thaddaeus (Judas son of James)
11. Simon the Zealot
12. Judas Iscariot (who later betrayed Him)

---

### 3. The Cost of Discipleship:
*"Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."* (Luke 9:23).`,
    keyTakeaways: [
      'Jesus called ordinary people—fishermen, tax collectors, zealots—to transform the world.',
      'True discipleship requires self-denial, daily commitment, and moral loyalty to God.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'The Sermon on the Mount: The Beatitudes (Matthew 5)',
    subtopics: ['Context of the Sermon on the Mount', 'The Eight Beatitudes and Their Spiritual Meaning', 'Believers as the Salt of the Earth and Light of the World', 'Love for Enemies and Overcoming Revenge'],
    readingTimeMinutes: 9,
    summary: 'The ethical Magna Carta of the Kingdom of God, divine values of meekness and peacemaking, and transformative radical love.',
    contentMarkdown: `### 1. The Eight Beatitudes (Matthew 5:3-10):
1. **Blessed are the poor in spirit:** For theirs is the kingdom of heaven.
2. **Blessed are those who mourn:** For they will be comforted.
3. **Blessed are the meek:** For they will inherit the earth.
4. **Blessed are those who hunger and thirst for righteousness:** For they will be filled.
5. **Blessed are the merciful:** For they will be shown mercy.
6. **Blessed are the pure in heart:** For they will see God.
7. **Blessed are the peacemakers:** For they will be called children of God.
8. **Blessed are those who are persecuted because of righteousness:** For theirs is the kingdom of heaven.

---

### 2. Salt & Light:
- **Salt of the Earth:** Preserving moral purity in a decaying society and bringing spiritual flavor.
- **Light of the World:** Shining brightly through good deeds so that men may glorify our Father in heaven.`,
    keyTakeaways: [
      'The Beatitudes redefine greatness around humility, mercy, purity, and peacemaking.',
      'Christians are the salt and light called to preserve society through righteous conduct.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Parables of the Kingdom: Nature & Purpose of Parables',
    subtopics: ['Definition of a Parable (Earthly Story with Heavenly Meaning)', 'Why Jesus Spoke in Parables (Mark 4:10-12)', 'The Parable of the Sower (Matthew 13:1-23)', 'The Parable of the Wheat and Tares (Matthew 13:24-30)'],
    readingTimeMinutes: 9,
    summary: 'Understanding Jesus’ pedagogical story-telling techniques and the parable of the four soils illustrating the reception of God’s Word.',
    contentMarkdown: `### 1. What is a Parable?
A parable is an earthly story drawn from familiar agricultural or domestic realities to illustrate profound spiritual truths about the Kingdom of God.

---

### 2. The Parable of the Sower & The Four Soils:
A farmer went out to sow seed:
1. **The Path / Wayside:** Seed fell along the hardened path; birds devoured it.
   - *Meaning:* Those who hear the Word of God without understanding; the devil snatches it away immediately.
2. **Rocky Ground:** Seed sprang up quickly, but when the sun scorched it, it withered because it had no deep root.
   - *Meaning:* Those who receive the Word with emotional joy, but fall away as soon as trials and persecution arise.
3. **Thorny Ground:** Thorns grew up and choked the young seedlings.
   - *Meaning:* Those whose spiritual fruitfulness is choked by the worries of this life and the deceitfulness of wealth.
4. **Good Soil:** Yielded a bumper harvest—some a hundred, some sixty, some thirty times what was sown.
   - *Meaning:* Noble, receptive hearts that hear the Word, understand it, and produce abundant righteous fruit.`,
    keyTakeaways: [
      'A parable uses everyday earthly stories to reveal eternal spiritual truths.',
      'The good soil represents believers who receive God’s Word and produce righteous fruit.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Parables of Mercy & Love: The Good Samaritan & Prodigal Son',
    subtopics: ['The Question: "Who is my Neighbour?" (Luke 10)', 'The Parable of the Good Samaritan and Racial Prejudice', 'The Parable of the Lost Son (Prodigal Son) (Luke 15)', 'The Boundless Forgiving Heart of the Heavenly Father'],
    readingTimeMinutes: 10,
    summary: 'Radical compassion crossing ethnic boundaries in the Good Samaritan, and the boundless mercy of the Father in the Prodigal Son.',
    contentMarkdown: `### 1. The Good Samaritan (Luke 10:25-37)
A Jewish traveler was stripped, beaten, and left half-dead along the dangerous Jerusalem-to-Jericho road:
- A **Priest** and a **Levite** passed by on the opposite side of the road, offering no assistance.
- A **Samaritan** (despised as an ethnic and religious enemy by Jews) saw him, had deep compassion, bound his wounds with oil and wine, carried him on his donkey to an inn, and paid for his medical care.
- **Moral:** True love knows no tribal, ethnic, or religious boundary. Your neighbour is anyone in desperate need whose suffering you have the power to relieve.

---

### 2. The Prodigal Son (Luke 15:11-32)
A younger son demanded his inheritance early, traveled to a distant country, and squandered his wealth in reckless living:
- Starving in a pigpen during a famine, he came to his senses: *"I will arise and go back to my father."*
- While he was still a long way off, his father saw him, was filled with compassion, **ran to his son, threw his arms around him, and kissed him**.
- **Moral:** God’s unconditional love and forgiveness are ever ready to welcome back any repentant sinner.`,
    keyTakeaways: [
      'The Good Samaritan teaches that your neighbour is anyone in need, regardless of tribe or creed.',
      'The Parable of the Prodigal Son demonstrates God’s unconditional forgiveness for repentant hearts.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'The Miracles of Jesus: Power over Nature & Physical Diseases',
    subtopics: ['Meaning and Purpose of Miracles', 'Miracles over Nature (Calming the Tempest, Feeding the 5,000)', 'Miracles of Healing (The Ten Lepers, Blind Bartimaeus)', 'Lessons on Faith and Divine Compassion'],
    readingTimeMinutes: 9,
    summary: 'Jesus demonstrating divine authority over elemental storms, biological diseases, and scarcity, fulfilling prophetic scripture.',
    contentMarkdown: `### 1. Miracles over Nature:
- **Calming the Tempest (Mark 4:35-41):** A violent storm struck the Sea of Galilee, filling the boat with water while Jesus slept on a cushion. Terrified disciples woke Him: *"Teacher, don’t you care if we drown?"* He rebuked the wind and commanded the waves: *"Peace! Be still!"* Instantly the wind ceased and there was a great calm.
- **Feeding the Five Thousand (John 6:1-14):** Multiplication of five barley loaves and two small fish supplied by a boy to feed over 5,000 men, with 12 baskets of leftover fragments gathered.

---

### 2. Miracles of Healing:
- **The Ten Lepers (Luke 17:11-19):** All ten were cleansed as they obeyed Jesus’ instruction to show themselves to the priests. Only one—a **Samaritan** foreigner—returned, fell at Jesus' feet, and gave joyful thanks to God!
- **Blind Bartimaeus (Mark 10:46-52):** Refused to be silenced by the crowd at Jericho, crying: *"Jesus, Son of David, have mercy on me!"* His persistent faith restored his sight.`,
    keyTakeaways: [
      'Jesus exercised sovereign power over winds, waves, diseases, and food scarcity.',
      'Faith and gratitude are essential spiritual responses to God’s miraculous acts.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Jesus’ Power over Death: Raising of Lazarus & Jairus’ Daughter',
    subtopics: ['Jesus as the Resurrection and the Life (John 11:25)', 'The Raising of the Widow’s Son at Nain (Luke 7)', 'The Healing of the Bleeding Woman & Jairus’ Daughter (Mark 5)', 'The Raising of Lazarus after Four Days in the Tomb'],
    readingTimeMinutes: 9,
    summary: 'The ultimate victory over physical mortality: raising the widow’s son at Nain, Jairus’ daughter, and Lazarus from the tomb.',
    contentMarkdown: `### 1. Raising the Widow’s Son at Nain
As Jesus approached the town of Nain, a dead man was being carried out—the only son of his widowed mother. Moved with deep compassion, Jesus touched the bier: *"Young man, I say to you, arise!"* The dead youth sat up and began to speak.

---

### 2. Raising Lazarus of Bethany (John 11)
Lazarus had been dead and buried in a cave tomb for **four days**.
- His sister Martha wept: *"Lord, if you had been here, my brother would not have died."*
- Jesus proclaimed: *"I am the resurrection and the life. The one who believes in me will live, even though they die."*
- Jesus wept in empathy, ordered the stone rolled away from the tomb entrance, and called in a loud voice:
  > *"Lazarus, come out!"*
- The dead man walked out bound hand and foot with grave clothes.`,
    keyTakeaways: [
      'Jesus possesses sovereign divine power over physical death.',
      'Jesus wept, revealing His deep human empathy for grieving families.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Jesus & The Marginalized: Zacchaeus & The Samaritan Woman',
    subtopics: ['Societal Outcasts in 1st-Century Palestine', 'Zacchaeus the Chief Tax Collector at Jericho (Luke 19)', 'The Samaritan Woman at Jacob’s Well (John 4)', 'Breaking Cultural and Social Barriers for the Gospel'],
    readingTimeMinutes: 8,
    summary: 'Jesus reaching out to societal outcasts, dining with hated tax collectors, and demolishing ethnic and gender taboos.',
    contentMarkdown: `### 1. Zacchaeus the Chief Tax Collector (Luke 19:1-10)
A short, wealthy chief tax collector in Jericho climbed a **sycamore-fig tree** to see Jesus passing by:
- Looking up, Jesus said: *"Zacchaeus, come down immediately. I must stay at your house today."*
- Transformed by Christ’s acceptance, Zacchaeus vowed: *"Look, Lord! Here and now I give half of my possessions to the poor, and if I have cheated anybody out of anything, I will pay back four times the amount."*
- Jesus announced: *"Today salvation has come to this house... For the Son of Man came to seek and to save the lost."*

---

### 2. The Samaritan Woman at Jacob’s Well (John 4)
Jesus shattered three cultural taboos in one encounter: He (a Jewish man and rabbi) spoke publicly to a Samaritan woman with a troubled moral past, offering her the **Living Water** that springs up into eternal life.`,
    keyTakeaways: [
      'Jesus actively reached out to despised outcasts, offering forgiveness and restoration.',
      'Encountering Christ leads to authentic repentance and practical restitution.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'The Triumphal Entry & Cleansing of the Temple',
    subtopics: ['Palm Sunday: Entering Jerusalem on a Donkey (Zechariah 9:9)', 'The Multitude Crying "Hosanna to the Son of David!"', 'Cleansing the Temple of Merchants and Money Changers', 'Jesus Teaches on Prayer and Sacred Reverence'],
    readingTimeMinutes: 8,
    summary: 'The messianic entry into Jerusalem on Palm Sunday and purifying the temple courts from commercial extortion.',
    contentMarkdown: `### 1. The Triumphal Entry (Matthew 21:1-11)
Entering Jerusalem for the Passover festival, Jesus fulfilled the prophecy of Zechariah 9:9 by riding on a humble donkey colt:
- Crowds spread their cloaks on the road and cut palm branches, waving and shouting:
  > *"Hosanna to the Son of David! Blessed is He who comes in the name of the Lord! Hosanna in the highest heaven!"*

---

### 2. Cleansing the Temple Courts (Matthew 21:12-17)
Entering the Jerusalem temple courts, Jesus found merchants selling cattle, sheep, and doves, and money-changers exploiting visiting pilgrims with exorbitant exchange rates:
- Overturning their tables and driving them out, He declared:
  > *"It is written: My house will be called a house of prayer, but you are making it a den of robbers!"*`,
    keyTakeaways: [
      'The Triumphal Entry fulfilled prophecy, presenting Jesus as the humble Prince of Peace.',
      'Cleansing the temple demonstrates that sacred places of prayer must never be turned into venues for financial extortion.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-crs-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'The Last Supper & The Institution of the Holy Communion',
    subtopics: ['The Passover Meal in the Upper Room (Luke 22)', 'Breaking of Bread and Sharing the Cup (The New Covenant)', 'Jesus Washing the Disciples’ Feet (Servant Leadership)', 'Predictions of Peter’s Denial and Judas’ Betrayal'],
    readingTimeMinutes: 9,
    summary: 'The solemn Passover meal establishing the Holy Eucharist, the ordinance of foot-washing, and servant leadership.',
    contentMarkdown: `### 1. The Institution of the Lord’s Supper
During the Passover feast in the Upper Room in Jerusalem, Jesus took bread, gave thanks, broke it, and gave it to His disciples, saying:
- *"This is my body given for you; do this in remembrance of me."*
- After supper He took the cup, saying:
  - *"This cup is the new covenant in my blood, which is poured out for you."*

---

### 2. Washing the Disciples’ Feet (John 13:1-17)
Before the meal, Jesus wrapped a towel around His waist, poured water into a basin, and washed His disciples’ feet—the task of the lowest domestic household slave.
- He taught them:
  > *"If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet. For I have given you an example, that you also should do just as I have done to you."*`,
    keyTakeaways: [
      'The Lord’s Supper memorializes Christ’s sacrifice for the remission of sins.',
      'Foot-washing teaches that true Christian greatness lies in humble servant leadership.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // LITERATURE-IN-ENGLISH (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-lit-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Dramatic Devices: Dramatic Irony, Soliloquy, Aside & Chorus',
    subtopics: ['The Essence of Theatrical Devices', 'Dramatic Irony: Audience Knowledge vs Character Ignorance', 'Soliloquy vs Monologue vs Aside', 'The Greek & African Chorus Functions'],
    readingTimeMinutes: 8,
    summary: 'Mastering dramatic techniques that heighten theatrical suspense, audience complicity, and psychological interiority on stage.',
    contentMarkdown: `### 1. Dramatic Irony
Dramatic irony occurs when the audience or reader possesses crucial, vital knowledge that a character on stage is completely ignorant of:
- *Example:* In a mystery drama, the audience watches a villain poison a cup of orange juice. When the unsuspecting hero reaches out to drink it smiling, dramatic irony creates intense audience suspense!
- *African Literature Example:* In Ola Rotimi’s *The Gods Are Not to Blame*, the audience knows from the beginning that Odewale has unknowingly killed his biological father and married his mother, while Odewale vigorously curses the murderer.

---

### 2. Speech Conventions in Drama:
- **Soliloquy:** An extended speech delivered by a character standing alone on stage revealing their secret thoughts, moral conflicts, and plans directly to the audience.
- **Aside:** A brief comment whispered by an actor intended for the audience alone; fellow characters present on stage freeze or pretend not to hear it.
- **Chorus:** A group of commentators who sing, chant, dance, and provide background context between dramatic acts.`,
    keyTakeaways: [
      'Dramatic irony exists when the audience knows a crucial secret that characters do not know.',
      'A soliloquy exposes private thoughts while an actor is alone on stage.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'The Tragic Hero & Classical Tragedy Concepts',
    subtopics: ['Aristotelian Concept of Tragedy', 'Characteristics of a Tragic Hero (Nobility, Hubris)', 'Hamartia (Tragic Flaw)', 'Anagnorisis (Recognition) and Catharsis (Purging of Emotions)'],
    readingTimeMinutes: 9,
    summary: 'Aristotle’s Poetics applied to African and classical tragedy, the tragic flaw, sudden reversal of fortune, and emotional purging.',
    contentMarkdown: `### 1. The Anatomy of Classical Tragedy:
Formulated by the ancient Greek philosopher **Aristotle**, tragedy explores the downfall of an essentially noble protagonist.

- **Stage 1 (Noble Hero):** A figure of high societal status, military renown, and virtue.
- **Stage 2 (Hamartia):** A fatal character flaw (such as hubris or obsessive pride).
- **Stage 3 (Peripeteia):** A sudden, shocking reversal of fortune.
- **Stage 4 (Anagnorisis):** Critical moment of self-discovery where the hero realizes their tragic error.
- **Stage 5 (Catharsis):** Emotional release and cleansing of pity and fear experienced by the audience.

#### Nigerian Literature Example:
In Chinua Achebe’s *Things Fall Apart*, **Okonkwo** is a tragic hero:
- *Nobility:* A respected clan leader, wealthy farmer, and champion wrestler of Umuofia.
- *Hamartia:* His morbid, obsessive fear of appearing weak like his father Unoka drives him to extreme rashness, killing Ikemefuna and ultimately committing suicide.`,
    keyTakeaways: [
      'A tragic hero is a noble person whose personal flaw (hamartia) precipitates their downfall.',
      'Catharsis is the purging of pity and terror experienced by the audience at the end of a tragedy.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'African Poetry: Themes of Colonial Exploitation & Negritude',
    subtopics: ['The Negritude Movement (Léopold Sédar Senghor, David Diop)', 'Themes of Cultural Reassertion and African Pride', 'Poem Explication: "Africa" by David Diop', 'Stanza-by-Stanza Analysis and Literary Devices'],
    readingTimeMinutes: 9,
    summary: 'Anti-colonial poetic movements, celebrating black African beauty and heritage, and critical explication of David Diop’s celebrated poem.',
    contentMarkdown: `### 1. The Negritude Movement
Founded in Paris during the 1930s by African and Caribbean intellectuals (**Léopold Sédar Senghor** of Senegal and **Aimé Césaire** of Martinique), Negritude sought to reclaim African cultural pride, celebrating indigenous rhythms, beauty, and philosophy against colonial racial subjugation.

---

### 2. Explication of "Africa" by David Diop:
- *Stanza 1 (Heritage):* *"Africa my Africa / Africa of proud warriors in ancestral savannahs..."* The poet speaks of an ancestral Africa he has never personally seen, but whose vibrant blood courses through his veins.
- *Stanza 2 (Colonial Suffering):* *"The blood of your sweat / The sweat of your work / The work of your slavery..."* Graphic imagery depicting colonial forced labor, whippings, and economic extraction.
- *Stanza 3 (Triumphant Rebirth):* A grave voice responds, pointing to a young, sturdy tree patiently growing amid white faded flowers:
  > *"That is Africa your Africa that grows again / Patiently obstinately / Whose fruit bit by bit acquires / The bitter taste of liberty."*`,
    keyTakeaways: [
      'Negritude affirmed the dignity, beauty, and philosophical richness of African heritage.',
      'David Diop’s poem "Africa" contrasts colonial suffering with the resilient, triumphant rebirth of African freedom.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Figures of Speech III: Metonymy, Synecdoche, Oxymoron & Paradox',
    subtopics: ['Metonymy: Substituting an Associated Attribute', 'Synecdoche: Part for the Whole / Whole for the Part', 'Oxymoron: Two Contradictory Words Side-by-Side', 'Paradox: An Apparent Contradiction Containing Truth'],
    readingTimeMinutes: 8,
    summary: 'Advanced figurative language devices: metonymic associations, synecdochic parts, oxymoronic contrasts, and philosophical paradoxes.',
    contentMarkdown: `### 1. Metonymy vs Synecdoche:
- **Metonymy:** Substituting the name of one thing with something closely associated with it.
  - *Example 1:* *"The **pen** is mightier than the **sword**."* (*"Pen"* stands for the written press/intellect; *"sword"* stands for military force).
  - *Example 2:* *"Aso Rock issued a press release today."* (*"Aso Rock"* represents the Nigerian Presidency).
- **Synecdoche:** Using a part of something to represent the whole, or the whole to represent a part.
  - *Example 1:* *"Nigeria won the African Cup of Nations."* (*"Nigeria"* the whole nation represents the 11 players of the Super Eagles).
  - *Example 2:* *"All **hands** on deck!"* (*"Hands"* represents the whole bodies of the sailors/workers).

---

### 2. Oxymoron vs Paradox:
- **Oxymoron:** Placing two contradictory words directly side by side:
  - *Examples:* *"Deafening silence"*, *"Cruel kindness"*, *"Bittersweet"*, *"Living dead"*.
- **Paradox:** A full sentence or statement that appears self-contradictory on the surface, but reveals a profound truth upon deeper reflection:
  - *Example:* *"The child is the father of the man."* (Childhood experiences shape adult character).`,
    keyTakeaways: [
      'Metonymy uses an associated symbol (Aso Rock = Presidency); synecdoche uses a physical part for the whole (hands = workers).',
      'An oxymoron pairs two contradictory words; a paradox is a seemingly contradictory statement revealing deep truth.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Prose Study: Plot Development & Conflict Types',
    subtopics: ['Internal Conflict (Man vs Self)', 'External Conflict (Man vs Man, Man vs Society, Man vs Nature)', 'Creating Suspense and Narrative Pacing', 'Analyzing Climax and Resolution in a Selected African Novel'],
    readingTimeMinutes: 8,
    summary: 'Analyzing the engine of narrative tension: internal moral battles vs external socio-environmental obstacles.',
    contentMarkdown: `### 1. The Four Types of Literary Conflict:
Conflict is the central struggle between opposing forces that drives narrative plot forward:
1. **Man vs. Self (Internal Conflict):** A character wrestling with internal guilt, moral decisions, or emotional torment (e.g. Okonkwo struggling with his inner grief after participating in Ikemefuna’s execution).
2. **Man vs. Man (Interpersonal Conflict):** Direct rivalry, physical fights, or clash of wills between protagonist and antagonist.
3. **Man vs. Society:** A protagonist resisting unfair societal traditions, corrupt governments, or rigid caste systems (e.g. Osu caste discrimination in Igbo society).
4. **Man vs. Nature:** Human survival against harsh environmental elements (drought, torrential rain, famine).`,
    keyTakeaways: [
      'Conflict is the primary engine that propels narrative plot forward.',
      'Internal conflict occurs within a character’s soul; external conflict pits characters against other people, nature, or society.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Poetic Forms: Sonnets, Odes, Elegies, Ballads & Epics',
    subtopics: ['Classification of Poetic Forms', 'The Sonnet (14 Lines: Petrarchan vs Shakespearean)', 'The Elegy (A Mournful Lament for the Dead)', 'Odes (Praise Poems) and Ballads (Story Songs)'],
    readingTimeMinutes: 8,
    summary: 'Formal structures of verse across world literature: strict 14-line sonnet meters, commemorative elegies, and narrative ballads.',
    contentMarkdown: `### 1. Major Poetic Forms:
- **Sonnet:** A strict 14-line poem written in iambic pentameter with an established rhyme scheme:
  - *Shakespearean (English) Sonnet:* Three quatrains and a concluding rhyming couplet ($ABAB\\text{ }CDCD\\text{ }EFEF\\text{ }GG$).
  - *Petrarchan (Italian) Sonnet:* An octave (8 lines) followed by a sestet (6 lines).
- **Elegy:** A solemn, mournful lyric poem composed to lament the death of a beloved individual or public leader.
- **Ode:** A dignified, elevated poem written in praise of a person, heroic event, or natural object (e.g. *Ode to Autumn*).
- **Ballad:** A narrative folk poem or song with short stanzas narrating legendary, romantic, or dramatic tales.
- **Epic:** A monumental, lengthy narrative poem recounting the grand adventures of national mythical heroes.`,
    keyTakeaways: [
      'A sonnet always consists of exactly 14 lines written in regular meter.',
      'An elegy laments the deceased; an ode praises an honored subject.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'African Drama: The Gods Are Not to Blame by Ola Rotimi',
    subtopics: ['Background and Adaptation of Sophocles’ Oedipus Rex', 'The Curse on Baby Odewale (Kutuje Kingdom)', 'Themes of Destiny, Tribal Pride, and Leadership Responsibility', 'Traditional Yoruba Dramatic Devices (Proverbs, Chants, Drums)'],
    readingTimeMinutes: 9,
    summary: 'Critical study of Ola Rotimi’s masterpiece adapting Greek tragedy into Yoruba cultural worldview, pride, and tribal prejudice.',
    contentMarkdown: `### 1. Synopsis of "The Gods Are Not to Blame"
Set in the Yoruba kingdom of Kutuje, King Adetusa and Queen Ojuola give birth to a son, **Odewale**. The royal diviner (*Baba Fakunle*) prophesies that the child is cursed to murder his father and marry his mother:
- To avert the curse, the baby’s feet are tied with cowries and ordered sacrificed in the forest. However, the servant spares the infant, who is adopted by a farmer in a distant village.
- Grown into adulthood, Odewale gets into a land dispute with an arrogant old man at a three-way junction and kills him in anger (unaware the man is his biological father, King Adetusa).
- Odewale saves Kutuje from the hostile Ikolu invaders, is crowned King of Kutuje, and takes the widowed Queen Ojuola as his wife—unknowingly fulfilling the dreadful prophecy.

---

### 2. Major Themes:
- **Destiny vs Human Choice:** Though the gods decreed the curse, Odewale’s fatal flaw—**uncontrolled volcanic anger and hot temper**—accelerates his own ruin.
- **Tribalism & Ethnic Paranoia:** Odewale is constantly paranoid that the people of Kutuje despise him because he is from an outside tribe.`,
    keyTakeaways: [
      'Ola Rotimi adapts the Greek Oedipus myth to explore human pride, temper, and destiny in Yoruba culture.',
      'Odewale’s tragic downfall is triggered by his explosive hot temper and tribal suspicion.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Proverbs & Idioms in African Literature',
    subtopics: ['Proverbs as the Palm Oil with which Words are Eaten (Chinua Achebe)', 'Cultural Philosophy Encapsulated in Proverbs', 'Decoding Proverbial Meanings in Exam Passages', 'Using Proverbs to Enrich Creative Writing'],
    readingTimeMinutes: 8,
    summary: 'The rhetorical power of indigenous African proverbs, oral philosophy, and proverbial decoding in junior secondary exams.',
    contentMarkdown: `### 1. The Role of Proverbs in African Prose
As celebrated novelist **Chinua Achebe** immortalized in *Things Fall Apart*:
> *"Among the Igbo the art of conversation is regarded very highly, and proverbs are the palm-oil with which words are eaten."*

Proverbs add rhetorical seasoning, historical authority, and intellectual elegance to speech.

---

### 2. Analysis of Celebrated Nigerian Proverbs:
1. *"The lizard that jumped from the high Iroko tree to the ground said he would praise himself if no one else did."*
   - *Meaning:* A person who achieves a difficult feat deserves self-respect and pride, even if detractors withhold praise.
2. *"When a child washes his hands clean, he eats with kings and elders."*
   - *Meaning:* Humility, diligence, and upright character elevate humble individuals to positions of supreme honour.
3. *"Looking at a king’s mouth, one would think he never sucked at his mother's breast."*
   - *Meaning:* Great achievers often look so dignified that observers forget their humble, helpless origins.`,
    keyTakeaways: [
      'Proverbs are the philosophical palm-oil that enriches African literary dialogue.',
      'Proverbs communicate collective communal wisdom succinctly.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'African Poetry: "The Vulture" & Thematic Analysis of Greed',
    subtopics: ['Reading and Explication of Selected Nature Verses', 'The Vulture as a Symbol of Greed and Parasitism', 'Imagery of Scavenging and Decay', 'Connecting Animal Symbols to Corrupt Political Rulers'],
    readingTimeMinutes: 8,
    summary: 'Zoological metaphors in African verse, dissecting the vulture archetype as a symbol of corrupt political opportunists.',
    contentMarkdown: `### 1. The Vulture as a Literary Metaphor
In African poetic tradition, poets frequently employ animal archetypes to satirize corrupt human leaders. The **vulture**—an unhygienic scavenger that never hunts its own prey but waits greedily for others to die—embodies parasitical political corruption.

---

### 2. Critical Analysis of Imagery:
- *Visual Imagery:* Ragged bald neck, sharp curved beak, perched high on withered branches overlooking carnage.
- *Symbolic Parallel:* Just as vultures circle dying animals in the savannah, greedy rulers circle national treasury resources, siphoning public wealth while citizens starve.
- *Theme of Inevitable Justice:* Even the scavenger vulture cannot escape ultimate death and ecological decay.`,
    keyTakeaways: [
      'Animal symbolism in African poetry is frequently employed to satirize corrupt governance.',
      'The vulture represents parasitical exploitation of weaker members of society.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-lit-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Creative Writing Workshop: Crafting Short Stories & Poems',
    subtopics: ['Brainstorming Story Ideas from Daily Nigerian Life', 'Developing Believable Characters and Distinct Voices', 'Structuring Narrative Arc: Hook, Crisis & Denouement', 'Editing, Proofreading & Preparing for Literary Contests'],
    readingTimeMinutes: 8,
    summary: 'Step-by-step creative writing guide for students, character design, vivid sensory descriptions, and structuring short stories.',
    contentMarkdown: `### 1. Step-by-Step Short Story Crafting:
1. **The Hook:** Grab the reader’s attention in the very first sentence with unexpected dialogue, sensory imagery, or action (*"The wooden canoe capsized just as the lightning struck the mangrove swamp..."*).
2. **Developing the Protagonist:** Give your character a clear, burning desire (e.g. wanting to win the state scholarship) and a serious obstacle standing in their way.
3. **Show, Don’t Tell:** Instead of telling the reader *"Emeka was terrified,"* show physical reactions: *"Emeka’s knees trembled violently, his throat dried up like harmattan dust, and cold sweat dripped down his forehead."*
4. **The Climax & Resolution:** Bring the central conflict to a dramatic peak before resolving it cleanly.`,
    keyTakeaways: [
      '"Show, don’t tell" uses physical sensory details to bring writing alive.',
      'A great narrative hook grabs the reader’s imagination in the opening sentence.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // PHYSICAL AND HEALTH EDUCATION (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-phe-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Court Games: Basketball History, Court Dimensions & Rules',
    subtopics: ['Invention of Basketball by Dr. James Naismith (1891)', 'Court Layout and Dimensions (28m × 15m)', 'Fundamental Skills (Chest Pass, Bounce Pass, Layup, Pivot)', 'Violations and Fouls (Traveling, Double Dribble, 24-Second Shot Clock)'],
    readingTimeMinutes: 9,
    summary: 'Basketball mechanics, FIBA court markings, ball handling techniques, violations, and game rules.',
    contentMarkdown: `### 1. Basketball Court Dimensions & Markings
Governed globally by **FIBA** and in Nigeria by **NBBF**.
- **Court Size:** Standard rectangular court measures **$28\\text{ meters long}$ by $15\\text{ meters wide}$**.
- **Ring / Basket Height:** The metal rim is elevated exactly **$3.05\\text{ meters}$ ($10\\text{ feet}$)** above the court floor, attached to a transparent backboard.
- **Teams:** Two teams of 5 players on court, with rolling substitutions.

---

### 2. Fundamental Skills:
- **Chest Pass:** Two-handed pass pushed directly from the chest to teammate's chest without touching the floor.
- **Bounce Pass:** Ball bounced off the floor approximately two-thirds of the distance to the receiver to bypass a defender's arms.
- **Dribbling:** Bouncing the ball continuously against the floor with one hand while moving.
- **Layup Shot:** Driving close to the basket, jumping off one foot, and banking the ball off the backboard into the net.

---

### 3. Common Violations:
- **Traveling:** Taking more than two steps without dribbling the ball.
- **Double Dribble:** Dribbling with both hands simultaneously, or stopping a dribble and dribbling again.`,
    keyTakeaways: [
      'Basketball was invented by Dr. James Naismith in 1891; hoop height is 10 feet (3.05m).',
      'Traveling occurs when a player moves feet without dribbling; double dribbling is restarting a stopped dribble.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Court Games: Handball Court, Skills & Rules of Play',
    subtopics: ['Origin of Handball and Court Dimensions (40m × 20m)', 'The 6-Meter Goal Area (D-Zone)', 'Basic Skills: Catching, Overarm Pass, Jump Shot, Goalkeeping', 'Rules: 3 Steps, 3 Seconds Rule & Passive Play'],
    readingTimeMinutes: 8,
    summary: 'Team handball court architecture, the 6-meter goal crease rule, the 3-step regulation, and jump shots.',
    contentMarkdown: `### 1. Handball Court & Goal Area
- **Court Dimensions:** $40\\text{ meters long}$ by $20\\text{ meters wide}$.
- **Goal Area (The 6-Meter Line / D-Zone):** A semi-circular line $6\\text{ meters}$ from the goalpost. **Only the goalkeeper is allowed inside the 6-meter area.** Attackers may jump from outside the zone to shoot, but must release the ball before landing inside.
- **Match Duration:** Two halves of 30 minutes each (total 60 minutes) contested by teams of 7 players (6 court players + 1 goalkeeper).

---

### 2. Core Handball Rules:
- **The "Rule of Three":** A player may take a maximum of **3 steps** with the ball, and hold the ball for a maximum of **3 seconds** before passing, dribbling, or shooting.
- **Body Contact:** Players may use their torso to obstruct opponents, but pulling, striking, pushing, or tripping results in penalty throws or yellow/red cards.`,
    keyTakeaways: [
      'Only the goalkeeper is permitted inside the 6-meter goal area in handball.',
      'The "Rule of Three" limits holding the ball to 3 seconds and taking 3 steps without dribbling.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Gymnastics: Floor Activities & Vaulting Apparatus',
    subtopics: ['Definition and Branches of Gymnastics', 'Floor Activities (Forward Roll, Backward Roll, Cartwheel, Headstand)', 'Vaulting Box Activities (Squat Vault, Straddle Vault)', 'Safety Measures and Spotters in Gymnastics'],
    readingTimeMinutes: 8,
    summary: 'Gymnastic tumbling, spatial balance, biomechanical execution of rolls and handstands, and vaulting safety spotters.',
    contentMarkdown: `### 1. Floor Gymnastic Tumbling:
- **Forward Roll:** Squatting, tucking the chin firmly against the chest, rolling smoothly over the rounded upper back (never on the head!), and standing up without hands touching the floor.
- **Headstand:** Forming an equilateral tripod with the head and two hands on a padded mat, slowly elevating the torso and legs vertically until body alignment is straight.
- **Cartwheel:** Sideways hand-to-hand, foot-to-foot rotation with arms and legs outstretched like spokes on a revolving wheel.

---

### 2. Vaulting Apparatus & Safety:
- **Vaulting Box:** Padded wooden box over which gymnasts jump after sprinting and bouncing off a spring-loaded springboard.
- **The Spotter:** A trained teacher or partner stationed next to the apparatus to catch or support the gymnast, preventing catastrophic neck or spine injuries during landing.`,
    keyTakeaways: [
      'In a forward roll, the chin must be tucked against the chest to roll on the shoulders, never the skull.',
      'A spotter stands beside apparatus to prevent injuries and guide proper gymnastic landings.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Recreation, Leisure & Indigenous Nigerian Traditional Games',
    subtopics: ['Meaning of Leisure vs Recreation', 'Active vs Passive Recreation', 'Traditional Nigerian Games (Ayo Olopon, Kokowa Wrestling, Abula)', 'Physical and Cognitive Benefits of Board Games'],
    readingTimeMinutes: 8,
    summary: 'Recreational mental health, active vs passive leisure, indigenous strategy games (Ayo Olopon), and traditional sports.',
    contentMarkdown: `### 1. Leisure vs Recreation
- **Leisure:** Free, discretionary time remaining after finishing schoolwork, domestic chores, and sleeping.
- **Recreation:** Purposeful, enjoyable physical or mental activities chosen freely during leisure time to refresh the mind and body (*re-creation*).

---

### 2. Indigenous Nigerian Games:
- **Ayo Olopon (Yoruba Mancala Game):** An ancient mathematical strategy board game played using an intricately carved wooden board with $12$ circular pockets and $48$ hard seeds (*Ayo seeds*). Develops intense cognitive calculation, foresight, and patience.
- **Kokowa (Traditional Hausa Wrestling):** Traditional sand-ring wrestling contest testing physical strength, balance, and agility without striking blows.
- **Abula:** An indigenous Nigerian ball game created by Mallam Elias Yusuf played over a high net using wooden bats.`,
    keyTakeaways: [
      'Recreation revitalizes mind and body during free leisure time.',
      'Ayo Olopon is a celebrated indigenous Nigerian strategy board game that sharpens mathematical calculation.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Postural Defects & Ergonomics of Physical Health',
    subtopics: ['Meaning of Good Posture', 'Causes of Poor Posture (Ill-fitting Shoes, Poor Desks, Malnutrition)', 'Structural Spinal Defects: Kyphosis, Lordosis, Scoliosis', 'Corrective Exercises and Ergonomic Habits'],
    readingTimeMinutes: 8,
    summary: 'Biomechanical posture alignment, spinal column health, early detection of scoliosis and kyphosis, and corrective gym drills.',
    contentMarkdown: `### 1. The Anatomy of Posture:
Posture is the position in which you hold your body upright against gravity while standing, sitting, walking, or lying down. Good posture minimizes strain on spinal ligaments and skeletal joints.

---

### 2. Common Spinal Postural Deformities:
- **Kyphosis (Hunchback / Round Shoulders):** Excessive outward curvature of the thoracic spine in the upper back. Often caused by continuous slouching over computer screens and school desks.
- **Lordosis (Hollow Back / Swayback):** Exaggerated inward curvature of the lumbar spine in the lower back.
- **Scoliosis:** Abnormal sideways lateral "S" or "C" curve of the spine, frequently triggered by carrying heavy schoolbags consistently on only one shoulder.

---

### 3. Corrective Measures:
- Carry backpacks with dual padded straps distributed evenly across both shoulders.
- Practice prone back extensions, swimming, and core plank exercises.`,
    keyTakeaways: [
      'Kyphosis affects the upper back (hunchback); lordosis affects the lower lumbar curve.',
      'Scoliosis is lateral sideways curving of the spine caused by carrying heavy loads unevenly on one shoulder.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Sports Injuries: Fractures, Dislocations & Sprains',
    subtopics: ['Classification of Bone Fractures (Simple, Compound, Greenstick, Comminuted)', 'Joint Dislocations (Shoulder, Finger) and Ligament Sprains', 'Signs and Symptoms of Bone and Joint Trauma', 'Immobilization, Splinting and First Aid Protocol'],
    readingTimeMinutes: 9,
    summary: 'Orthopedic trauma management on the playing field, fracture classification, splint immobilization, and avoiding permanent nerve damage.',
    contentMarkdown: `### 1. Classification of Bone Fractures:
A fracture is a complete or partial break in the continuity of a bone caused by high impact or collision.

| Fracture Type | Nature of Bone Damage | Danger Level | First Aid Rule |
|---|---|---|---|
| **Simple (Closed)** | Bone is broken internally; skin remains intact. | Moderate | Immobilize with splint; transport gently. |
| **Compound (Open)** | Broken sharp bone ends pierce through the skin. | **Extreme (Severe Infection & Bleeding)** | Control bleeding with sterile pads; **do not push bone back!** |
| **Greenstick** | Bone bends and cracks only on one side (common in soft bones of children). | Mild to Moderate | Support with padded sling. |
| **Comminuted** | Bone shatters into three or more small fragments. | High | Complete immobilization; urgent surgery. |

---

### 2. Dislocations & Sprains:
- **Dislocation:** The displacement of two connecting bones from their normal joint socket (e.g. dislocated shoulder). *Never attempt to force the bone back into place!*
- **First Aid Rule:** Immobilize the joint exactly in the position found using splints and bandages, and rush victim to hospital.`,
    keyTakeaways: [
      'Compound fractures break through the skin; never push exposed bone ends back into flesh.',
      'Always immobilize fractures with splints and slings before moving an injured casualty.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Drugs in Sports: Doping, Performance-Enhancing Drugs & WADA',
    subtopics: ['Definition of Doping in Sports', 'Common Banned Substances (Anabolic Steroids, Stimulants, Blood Doping)', 'Severe Health Dangers of Steroid Abuse', 'The World Anti-Doping Agency (WADA) & Testing Procedures'],
    readingTimeMinutes: 8,
    summary: 'The ethics of fair athletic competition, physiological dangers of anabolic steroids, and WADA anti-doping testing protocols.',
    contentMarkdown: `### 1. What is Doping?
Doping is the illegal use of banned performance-enhancing drugs (PEDs) or artificial physiological methods by athletes to gain an unfair competitive advantage in sports.

#### Banned Classes of Substances:
- **Anabolic Steroids:** Synthetic derivatives of testosterone taken to artificially increase muscle bulk and power.
  - *Health Hazards:* Liver cancer, kidney failure, cardiovascular stroke, severe mood swings ("roid rage"), infertility, premature death.
- **Stimulants (e.g. Amphetamines, Ephedrine):** Accelerate heart rate and mask fatigue.
- **Blood Doping / Erythropoietin (EPO):** Artificially boosts red blood cell count to enhance endurance, risking fatal blood clots.

---

### 2. Role of WADA:
The **World Anti-Doping Agency (WADA)** enforces testing of urine and blood samples at Olympic and Commonwealth games. Athletes who test positive face medal forfeiture, public humiliation, and multi-year bans.`,
    keyTakeaways: [
      'Doping destroys fair play in sports and inflicts fatal damage on the heart, liver, and kidneys.',
      'WADA conducts mandatory random drug tests on competitive athletes globally.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Non-Communicable Diseases: Hypertension, Diabetes & Obesity',
    subtopics: ['Difference between Communicable and Non-Communicable Diseases', 'Hypertension (High Blood Pressure): Causes & Salt Intake', 'Type 2 Diabetes Mellitus: Insulin Resistance and Blood Sugar', 'Lifestyle Modification: Aerobic Exercise, Diet & Prevention'],
    readingTimeMinutes: 8,
    summary: 'Epidemiology of chronic lifestyle diseases, cardiovascular hemodynamics, blood glucose management, and daily physical exercise.',
    contentMarkdown: `### 1. Understanding Non-Communicable Diseases (NCDs)
NCDs are chronic medical conditions that **cannot be caught or transmitted from one person to another**. They develop gradually over years due to genetic predisposition combined with unhealthy lifestyle choices.

---

### 2. Major Lifestyle Diseases:
- **Hypertension (The "Silent Killer"):** Chronically elevated blood pressure ($>140/90\\text{ mmHg}$) that strains arterial walls.
  - *Causes:* Excessive dietary salt intake, smoking, lack of exercise, chronic stress.
  - *Complications:* Sudden heart attack, stroke, kidney failure.
- **Type 2 Diabetes:** Inability of body cells to respond properly to the hormone insulin, resulting in dangerous buildup of glucose in the bloodstream.
  - *Symptoms:* Excessive thirst, frequent urination, unexplained weight loss, slow wound healing.
- **Obesity:** Excessive accumulation of body fat causing cardiovascular strain.

---

### 3. Prevention through Exercise:
Engaging in at least **30 minutes of moderate aerobic exercise** (brisk walking, jogging, skipping, football) five days a week burns excess calories, regulates blood pressure, and boosts insulin sensitivity.`,
    keyTakeaways: [
      'Non-communicable diseases cannot be spread from person to person; they stem from genetics and lifestyle.',
      'Regular aerobic exercise and low-salt, balanced nutrition prevent hypertension and Type 2 diabetes.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Environmental Pollution & Community Health',
    subtopics: ['Pollution Types: Air, Water, Land & Noise Pollution', 'Industrial Effluents, Refuse Dumps & Open Defecation Risks', 'Waterborne Epidemics (Typhoid, Dysentery, Cholera)', 'Community Environmental Sanitation Initiatives'],
    readingTimeMinutes: 8,
    summary: 'Ecological determinants of health, industrial air and water contamination, sewage disposal, and community sanitation.',
    contentMarkdown: `### 1. The Four Types of Environmental Pollution:
- **Air Pollution:** Particulate soot and toxic carbon monoxide from aging vehicle exhausts, generator fumes, and burning tires triggering asthma and respiratory infections.
- **Water Pollution:** Dumping raw industrial chemicals and untreated sewage into local rivers and boreholes, killing fish and spreading waterborne epidemics.
- **Land / Soil Pollution:** Indiscriminate dumping of non-biodegradable polythene bags, plastic bottles, and toxic electronic waste.
- **Noise Pollution:** Deafening loudspeakers from event centers and un-muffled generators causing hearing loss and high stress.

---

### 2. Breaking the Disease Cycle:
- Enforce strict handwashing with soap after using toilets and before preparing meals.
- Boil drinking water or treat with water purification tablets.
- Clear roadside gutters to prevent standing water where disease-transmitting mosquitoes breed.`,
    keyTakeaways: [
      'Untreated sewage and contaminated water transmit cholera, typhoid, and dysentery.',
      'Proper sanitary waste disposal and clean water treatment protect community health.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-phe-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Safety Education in Water & Swimming (Aquatics)',
    subtopics: ['Water Safety Rules in Pools, Streams & Ocean Beaches', 'Drowning Prevention & The Reaching Assist Rescue Technique', 'Basic Swimming Strokes (Breaststroke, Freestyle / Front Crawl)', 'First Aid for Drowning Victims (CPR and Water Drainage)'],
    readingTimeMinutes: 8,
    summary: 'Water survival skills, aquatic hazard recognition, non-swimming rescue techniques, and cardiopulmonary resuscitation (CPR).',
    contentMarkdown: `### 1. Water Safety Golden Rules:
- **Never swim alone!** Always swim in designated areas supervised by trained lifeguards.
- Never dive headfirst into unfamiliar rivers, streams, or shallow pool ends (risks permanent neck paralysis).
- Obey ocean beach warning flags (Red flag = dangerous riptides; do not enter the water!).

---

### 2. Rescue Principles for Non-Swimmers ("Reach or Throw, Don’t Go!"):
If you see someone struggling or drowning in deep water, **do not jump into the water unless trained as a professional lifeguard** (a panicking victim can easily drag you under):
1. **REACH:** Lie flat on your stomach at the poolside and extend a long pole, broom stick, or tree branch to the victim.
2. **THROW:** Throw a buoyant lifebuoy, inflated tire tube, or a rope tied to an empty plastic gallon jug.
3. **ROW:** Use a canoe or boat to approach the victim.
4. **GO:** Swimming out to rescue is the absolute last resort for trained professionals only.`,
    keyTakeaways: [
      'Remember the rescue rule: "Reach or Throw, Don’t Go!" to save a drowning person safely.',
      'Never dive into unfamiliar rivers or shallow water to prevent spinal paralysis.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // CULTURAL AND CREATIVE ARTS (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-cca-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Perspective Drawing: One-Point & Two-Point Perspective',
    subtopics: ['What is Linear Perspective in Art?', 'The Horizon Line (Eye Level) and Vanishing Points', 'Constructing One-Point Perspective (Railroad Tracks, Roadway)', 'Constructing Two-Point Perspective (Corner of a Building)'],
    readingTimeMinutes: 9,
    summary: 'Mastering the mathematical optical illusion of 3D depth on a flat 2D surface using horizon lines and vanishing points.',
    contentMarkdown: `### 1. What is Linear Perspective?
Perspective is an optical drawing technique discovered during the Renaissance that allows an artist to represent three-dimensional objects and spatial depth accurately on a two-dimensional flat drawing surface.

#### Core Terminology:
- **Horizon Line (Eye Level):** The imaginary horizontal line where the earth meets the sky from the artist's viewing height.
- **Vanishing Point (VP):** The point located on the horizon line where parallel receding lines appear to converge and disappear in the infinite distance.
- **Orthogonal (Convergence) Lines:** Diagonal guideline rays drawn from the corners of objects converging towards the vanishing point.

---

### 2. One-Point vs Two-Point Perspective:
- **One-Point Perspective (Single VP):** Used when viewing an object straight from the front face (e.g. looking straight down a railway track, long hallway corridor, or straight tarred highway). All horizontal lines remain parallel, while depth lines converge to a single central vanishing point.
- **Two-Point Perspective (Two VPs):** Used when looking at an object from an angle or corner (e.g. looking at the corner corner of a two-storey building). Features two vanishing points located at opposite ends of the horizon line (VP Left and VP Right).`,
    keyTakeaways: [
      'Linear perspective creates the realistic illusion of 3D depth and distance on a flat paper.',
      'One-point perspective has one vanishing point on the horizon; two-point perspective uses two vanishing points.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Figure Drawing & Human Proportions: The 7½ Heads Rule',
    subtopics: ['The Canon of Human Proportions (The 7½ to 8 Heads Rule)', 'Facial Proportions and Feature Placement (Eyes at Midpoint)', 'Foreshortening and Gesture Drawing', 'Shading Techniques to Render Muscular Volume (Cross-hatching, Chiaroscuro)'],
    readingTimeMinutes: 8,
    summary: 'Anatomical life drawing, proportional measuring using head lengths, facial symmetry guidelines, and tonal cross-hatching.',
    contentMarkdown: `### 1. The Classical Canon of Human Proportion:
Artists use the vertical length of the **human head** (from crown of skull to chin) as the standard measuring unit for drawing an adult body:
- **Total Adult Height:** Measures approximately **$7\\frac{1}{2}$ to $8$ head lengths**.
  - *Head 1:* Crown of head to chin.
  - *Head 2:* Chin to nipple line.
  - *Head 3:* Nipple line to navel (belly button).
  - *Head 4:* Navel to groin / pubic region (the exact vertical midpoint of the body!).
  - *Head 5:* Groin to mid-thigh.
  - *Head 6:* Mid-thigh to below knees.
  - *Head 7:* Below knees to lower calf.
  - *Head 7½:* Lower calf to soles of the feet.

---

### 2. Facial Proportion Guidelines:
- The **eyes** are located along the horizontal midline dividing the face in half vertically.
- The space between the two eyes is approximately the width of **one eye**.
- The bottom of the **nose** aligns halfway between the eye line and the chin.
- The **mouth line** lies one-third of the distance from nose base to chin.`,
    keyTakeaways: [
      'The adult human body measures approximately 7½ to 8 head lengths in vertical height.',
      'The eyes sit at the exact vertical midpoint of the adult human head.',
      'The groin represents the geometric midpoint of the entire upright human body.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Textile Repeat Patterns: Full-Drop, Half-Drop & Mirrored Repeats',
    subtopics: ['What is a Motif in Surface Design?', 'Repeat Systems: Block / Full-Drop Repeat', 'Half-Drop Repeat (Stepping Motifs by Half a Unit)', 'Mirror and Counter-Change Patterning in African Fabrics'],
    readingTimeMinutes: 8,
    summary: 'Surface pattern design for fashion and interior fabrics, geometric grid mathematics, and traditional African repeat motifs.',
    contentMarkdown: `### 1. Motifs & Repeat Systems:
A **motif** is the fundamental single decorative unit or visual element (e.g. geometric triangle, stylized leaf, cowrie shell) that is repeated across a fabric surface to create a textile pattern.

#### The Core Repeat Arrangements:
- **Full-Drop (Block) Repeat:** The simplest pattern where motifs are repeated along identical horizontal rows and vertical columns like a checkerboard grid.
- **Half-Drop Repeat:** The motifs in every subsequent vertical column are dropped or shifted downwards by **half the height** of the motif unit. This creates a flowing diagonal rhythm that prevents the eye from seeing harsh vertical stripes (very common in Nigerian wax prints / Ankara).
- **Mirror Repeat:** The motif is flipped horizontally or vertically like a mirror image, creating symmetrical kaleidoscope medallions.`,
    keyTakeaways: [
      'A motif is the individual design unit repeated across a fabric.',
      'Half-drop repeats shift adjacent columns down by half a unit for natural visual rhythm.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Pioneers of Modern Nigerian Contemporary Art',
    subtopics: ['Aina Onabolu: Father of Modern Nigerian Art', 'Ben Enwonwu: African Modernism & The Iconic "Tutu" Painting', 'Bruce Onobrakpeya: Master of Plastocast & Deep Etching', 'The Zaria Rebels and "Natural Synthesis"'],
    readingTimeMinutes: 9,
    summary: 'The historic pioneers of contemporary Nigerian visual arts, Ben Enwonwu’s masterpieces, and the Zaria Art Society’s natural synthesis.',
    contentMarkdown: `### 1. Chief Aina Onabolu (1882–1963)
Celebrated as the **Father of Modern Nigerian Art**:
- Shattered racist colonial beliefs that Africans could not paint realistically in Western classical academic styles.
- Introduced formal art education into Nigerian secondary schools (King’s College, Lagos).

---

### 2. Ben Enwonwu (MBE) (1917–1994)
Nigeria’s most celebrated 20th-century painter and sculptor:
- Created the famous bronze statue of Queen Elizabeth II in 1957.
- Painted the celebrated portrait of the Ife princess **"Tutu"** in 1974, revered internationally as the *"African Mona Lisa"*.
- Sculpted monumental masterpieces like *Sango* standing outside the NEPA headquarters in Lagos.

---

### 3. The Zaria Art Society ("The Zaria Rebels", 1958):
Led by young art students (Bruce Onobrakpeya, Uche Okeke, Demas Nwoko) at the Nigerian College of Arts, Science and Technology, Zaria:
- Rejected blind imitation of Western art, formulating **"Natural Synthesis"**—the creative blending of rich indigenous Nigerian cultural traditions with modern European artistic techniques.`,
    keyTakeaways: [
      'Chief Aina Onabolu pioneered formal academic art education in Nigeria.',
      'Ben Enwonwu created the iconic "Tutu" portrait, known as the African Mona Lisa.',
      'The Zaria Rebels championed "Natural Synthesis", blending indigenous traditions with modern art.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Music Theory: Scales, Intervals & Tonic Sol-fa Notation',
    subtopics: ['The Major Diatonic Scale Formula (Tone-Tone-Semitone-Tone-Tone-Tone-Semitone)', 'Constructing the C Major & G Major Scales', 'Tonic Sol-fa Notation (d - r - m - f - s - l - t - d)', 'Musical Intervals (Seconds, Thirds, Fifths, Octaves)'],
    readingTimeMinutes: 9,
    summary: 'Music composition fundamentals, scale step intervals (tones and semitones), staff construction, and sol-fa singing.',
    contentMarkdown: `### 1. Construction of the Major Scale
A major scale is an orderly sequence of 8 musical notes ascending or descending according to a fixed pattern of whole steps (**Tones**) and half steps (**Semitones**):
$$\\text{Pattern:} \\quad T - T - S - T - T - T - S$$

#### 1. The C Major Scale (No Sharps, No Flats):
- Notes: **C - D - E - F - G - A - B - C'**
- Step intervals:
  - $C \\to D$ : Tone ($T$)
  - $D \\to E$ : Tone ($T$)
  - $E \\to F$ : **Semitone ($S$)**
  - $F \\to G$ : Tone ($T$)
  - $G \\to A$ : Tone ($T$)
  - $A \\to B$ : Tone ($T$)
  - $B \\to C'$ : **Semitone ($S$)**

---

### 2. Tonic Sol-fa Syllables:
Music pitch can be vocalized using Curwen’s sol-fa singing syllables:
$$\\text{do } (d) \\to \\text{re } (r) \\to \\text{mi } (m) \\to \\text{fa } (f) \\to \\text{so } (s) \\to \\text{la } (l) \\to \\text{ti } (t) \\to \\text{do' } (d')$$`,
    keyTakeaways: [
      'The major scale step formula is Tone - Tone - Semitone - Tone - Tone - Tone - Semitone (T-T-S-T-T-T-S).',
      'In the C Major scale, natural semitones occur between E-F and B-C.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Triads & Chords: Harmony & Musical Accompaniment',
    subtopics: ['What is a Chord and a Triad?', 'Building Triads on Scale Degrees (Root, 3rd, 5th)', 'Primary Triads (Tonic - I, Subdominant - IV, Dominant - V)', 'Major vs Minor Triad Qualities'],
    readingTimeMinutes: 8,
    summary: 'Harmonic structures, building triads on scale degrees, primary chord progressions (I, IV, V), and piano keyboard voicings.',
    contentMarkdown: `### 1. What is a Triad?
A triad is a chord consisting of three distinct musical notes played simultaneously, constructed by stacking two thirds on top of a foundational **Root note**:
- **Root:** The bottom note giving the chord its letter name.
- **Third:** Two scale steps above the root.
- **Fifth:** Four scale steps above the root.

---

### 2. The Three Primary Triads (I, IV, V):
In any musical key, three chords provide the foundational harmonic skeleton for songs:
- **Tonic Chord (Chord I):** Built on the 1st degree of the scale. Provides home stability and restful resolution ($C - E - G$ in key of C).
- **Subdominant Chord (Chord IV):** Built on the 4th degree of the scale. Moves away from home ($F - A - C$ in key of C).
- **Dominant Chord (Chord V):** Built on the 5th degree of the scale. Creates strong harmonic tension demanding resolution back to Chord I ($G - B - D$ in key of C).`,
    keyTakeaways: [
      'A triad consists of a root, a third, and a fifth stacked together.',
      'The primary chords in any key are Chord I (Tonic), Chord IV (Subdominant), and Chord V (Dominant).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Theatrical Stagecraft: Stage Lighting, Set Design & Props',
    subtopics: ['Functions of Stage Lighting (Illumination, Mood, Focus)', 'Stage Types (Proscenium Arch, Thrust Stage, Arena / Theatre-in-the-Round)', 'Set Construction and Scenic Painting', 'Props: Hand Props vs Set Dressing Props'],
    readingTimeMinutes: 8,
    summary: 'Technical stage design, theatrical architectures, emotional lighting palettes, and property management in drama productions.',
    contentMarkdown: `### 1. Types of Theatrical Stages:
- **Proscenium Arch Stage:** The traditional theatrical stage where the audience sits directly in front of the stage, viewing the performance through a decorative rectangular architectural frame (*the "fourth wall"*).
- **Thrust Stage:** The stage extends or thrusts outward into the auditorium so the audience surrounds the performers on three sides.
- **Arena Stage (Theatre-in-the-Round):** The performance area is in the center, completely surrounded by the audience on all four sides (resembles traditional African moonlight storytelling circles).

---

### 2. Theatrical Props (Properties):
- **Hand Props:** Any small item held and manipulated by an actor on stage (e.g. letter, walking stick, sword, cup of water).
- **Set Props (Dressings):** Larger items furnishing the stage set (e.g. sofa, king’s throne, carpet, hanging wall clock).`,
    keyTakeaways: [
      'Proscenium arch stages feature a frame viewed from the front; arena stages surround performers on all sides.',
      'Hand props are held by actors; set props furnish the stage environment.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Traditional Nigerian Dance Forms & Choreography',
    subtopics: ['Meaning and Functions of Dance in Indigenous Society', 'Celebrated Nigerian Dance Traditions (Bata, Atilogwu, Koroso)', 'Elements of Choreography (Space, Time, Energy)', 'Body Adornment and Costumes in Dance Performances'],
    readingTimeMinutes: 8,
    summary: 'Rhythmic movement arts across Nigerian ethnic cultures, acrobatic Atilogwu tumbling, Bata stamping, and choreographic design.',
    contentMarkdown: `### 1. Celebrated Nigerian Dance Forms:
- **Atilogwu Dance (Igbo):** A high-energy, acrobatic youth dance characterized by somersaults, human pyramids, rapid footwork, and vibrant raffia costumes accompanied by the *Ogene* gong and *Oja* flute.
- **Bata Dance (Yoruba):** Energetic, rhythmic stamping dance performed to intricate rhythms of the sacred conical Bata drum honoring *Sango* (the god of thunder). Requires rapid shoulder shakes and dynamic torso twists.
- **Koroso Dance (Hausa/Fulani):** Graceful celebratory dance performed by young men with rattle shells strapped around their ankles, emphasizing synchronized foot stomping, horn blowing, and rhythmic agility.

---

### 2. Elements of Choreography:
Choreography is the art of designing and arranging movement sequences for dancers:
- **Space:** The pathways, floor patterns, and vertical levels (low, medium, high) used by dancers.
- **Time:** The tempo, rhythm, and speed of dance movements.
- **Energy / Force:** The muscular quality of movement (fluid and lyrical vs sharp and explosive).`,
    keyTakeaways: [
      'Atilogwu is famous for acrobatic Igbo tumbling; Bata is celebrated for energetic Yoruba percussion movements.',
      'Choreography organizes dance sequences around space, time, and energetic physical force.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Graphic Design: Typography, Lettering & Logo Construction',
    subtopics: ['What is Graphic Design?', 'Typography: Serif vs Sans-Serif Typefaces', 'Anatomy of Letterforms (Ascender, Descender, Baseline)', 'Principles of Memorable Logo Design (Simplicity, Scalability)'],
    readingTimeMinutes: 8,
    summary: 'Visual communication design, typographic font anatomy, corporate brand identity, and constructing scalable logos.',
    contentMarkdown: `### 1. Typography & Typeface Classifications:
Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing.

- **Serif Typefaces:** Fonts possessing small decorative finishing strokes or "feet" at the ends of letter stems (e.g. Times New Roman, Georgia). Ideal for long paragraphs in printed books.
- **Sans-Serif Typefaces:** Clean, modern fonts with **no decorative feet** ("sans" is French for without) (e.g. Arial, Helvetica, Calibri). Excellent for digital phone screens, highway road signs, and posters.

---

### 2. Anatomy of a Typeface:
- **Baseline:** The invisible horizontal line upon which all letterforms sit.
- **Ascender:** The portion of a lowercase letter that extends above the mean line (e.g. the tall stems of **b, d, h, k**).
- **Descender:** The portion of a letter that drops below the baseline (e.g. the tails of **g, j, p, q, y**).`,
    keyTakeaways: [
      'Serif fonts have decorative feet (Times New Roman); sans-serif fonts are clean and footless (Arial).',
      'Ascenders extend above the middle line (b, d); descenders drop below the baseline (p, y).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-cca-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Packaging Design & Marketing of Artworks',
    subtopics: ['Functions of Commercial Packaging (Protection, Attraction, Information)', 'Packaging Materials (Paperboard, Glass, Metal, Biodegradable Plastics)', 'Pricing Strategies for Handcrafted Artworks', 'Art Exhibitions, Galleries & Digital Marketplaces'],
    readingTimeMinutes: 8,
    summary: 'Product packaging industrial design, protecting handcrafted goods in transit, art gallery exhibition curation, and marketing.',
    contentMarkdown: `### 1. The Core Functions of Product Packaging:
1. **Protection:** Preserving the product against breakage, moisture, sunlight, and contamination during transit.
2. **Identification & Information:** Displaying ingredients, nutritional values, bar codes, and NAFDAC registration numbers.
3. **Aesthetic Attraction:** Catching the consumer’s eye on crowded supermarket shelves through striking color harmonies and typography.

---

### 2. Marketing Artworks & Exhibitions:
- **Art Exhibition:** A curated public display of paintings, sculptures, and ceramics inside a dedicated art gallery or museum where collectors and art enthusiasts view and purchase works.
- **Pricing Strategy:** Artists calculate the cost of raw materials (canvas, oil paints, framing), add labor hours invested, and factor in artistic reputation to establish retail prices.`,
    keyTakeaways: [
      'Packaging protects goods, informs consumers, and visually drives retail purchase decisions.',
      'Art exhibitions allow artists to showcase creative works, network with patrons, and generate revenue.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // HISTORY (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-his-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'The Trans-Saharan Trade: Routes, Commodities & Organization',
    subtopics: ['Geographical Scope across the Sahara Desert', 'Major Trade Routes Connecting North Africa and Nigeria (Kano-Ghadames Route)', 'Articles of Trade: Gold, Salt, Leather, Slaves, Kolanuts', 'The Camel as the "Ship of the Desert" and Caravan Organization'],
    readingTimeMinutes: 9,
    summary: 'The monumental medieval trans-Saharan commercial network, camel caravan logistics, Bilma salt mines, and economic exchange.',
    contentMarkdown: `### 1. The Trans-Saharan Commercial Network
The Trans-Saharan Trade was a vast commercial network spanning the harsh Sahara Desert that connected the forest and savannah zones of West Africa with Mediterranean North Africa and the Middle East from antiquity until the 19th century.

| Trade Direction | Origin Region | Goods & Commodities Exchanged |
|---|---|---|
| **Southbound (Inflow to Nigeria)** | Mediterranean North Africa (Tripoli, Cairo, Fez) crossing desert oases | Rock salt slabs (Bilma/Taghaza), silk fabrics, Arabian war horses, copper, weapons, cowries. |
| **Northbound (Outflow to Mediterranean)** | Nigerian Savannah & Sahel (Kano, Katsina, Borno) | Alluvial gold, dyed Kano Moroccan leather, kolanuts, ivory tusks, ostrich feathers, gum arabic. |

---

### 2. Key Commodities of Exchange:
- **From the North (Mediterranean):** Rock salt slabs (from desert mines at Taghaza and Bilma), Arabian horses, metal swords, copper, silk textiles, mirrors, and paper.
- **From the South (Nigeria/West Africa):** Alluvial gold, Morrocan-bound dyed goat leather (from Kano), kolanuts, elephant ivory, and ostrich feathers.

---

### 3. The Camel: The "Ship of the Desert":
Trans-Saharan commerce became feasible only after the introduction of the one-humped dromedary camel (*Camelus dromedarius*). Camels could travel for over 10 days across scorching sand dunes without drinking water, carrying heavy loads in organized caravans (*Azalai*) of up to 5,000 camels led by experienced Tuareg desert guides (*Takshif*).`,
    keyTakeaways: [
      'The Trans-Saharan trade linked West African states with North Africa across the Sahara Desert.',
      'Salt from northern desert mines was exchanged for southern gold, ivory, and Kano leather.',
      'Camels made trans-desert travel possible through their remarkable ability to endure arid journeys.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Effects of the Trans-Saharan Trade on Nigerian States',
    subtopics: ['Introduction and Spread of Islam and Arabic Literacy', 'Growth of Commercial Metropolises (Kano, Katsina, Kukawa)', 'Introduction of Islamic Architecture and State Administration', 'Decline of the Trade with the Rise of Coastal Trans-Atlantic Shipping'],
    readingTimeMinutes: 9,
    summary: 'Cultural, religious, and economic transformations brought by trans-Saharan caravans, the growth of Kano, and the spread of Islam.',
    contentMarkdown: `### 1. Religious & Educational Transformation:
- **Spread of Islam:** Muslim merchants, scholars, and jurists accompanied trading caravans, introducing Islam to the royal courts of Kanem-Borno and Hausaland as early as the 11th century.
- **Arabic Literacy:** Arabic script became the medium of administrative record-keeping, international diplomatic correspondence, and theological scholarship (giving birth to *Ajami*—writing Hausa language using modified Arabic letters).

---

### 2. Urbanization & Economic Prosperity:
- **Kano as an Industrial Hub:** Celebrated for its 14-foot defensive earthen city walls (*Ganuwa*), thousands of textile dye pits at Kofar Mata producing indigo cloth, and master leather tanneries.
- **Rise of Katsina:** Became a premier center of Islamic legal learning and philosophy, attracting scholars from Timbuktu and Cairo.

---

### 3. Decline of the Trade:
From the late 15th century onward, European Portuguese and British ships began trading along the West African Atlantic coast. Ocean shipping was faster and cheaper than crossing the desert on camels, gradually diverting trade southwards to the coast.`,
    keyTakeaways: [
      'The trade introduced Islam, Arabic scholarship, and diplomatic correspondence to Northern Nigeria.',
      'Kano and Katsina grew into major global manufacturing and commercial emporiums.',
      'Coastal European ocean shipping eventually led to the decline of desert camel routes.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'The 1804 Sokoto Jihad: Causes & Leadership of Usman dan Fodio',
    subtopics: ['State of Hausaland in the 18th Century (The Gobir Kingdom)', 'Religious Syncretism and Oppressive Taxation (Jangali & Kharaj)', 'Life and Teachings of Sheikh Usman dan Fodio', 'Outbreak of the 1804 Jihad and The Flight (Hijrah) to Gudu'],
    readingTimeMinutes: 10,
    summary: 'The revolutionary socio-religious movement that established the Sokoto Caliphate, religious syncretism, and the leadership of Shehu Usman dan Fodio.',
    contentMarkdown: `### 1. Conditions in Hausaland before 1804:
In the late 18th century, Hausaland was divided into rival warring kingdoms (Gobir, Kano, Katsina, Zazzau).
- **Religious Syncretism:** Although rulers claimed to be Muslims, they mixed Islamic practices with pagan rituals (*Bori* spirit possession), consulted sorcerers, and neglected Sharia law.
- **Oppressive Taxation:** Hausa kings (*Sarkuna*) imposed heavy illegal un-Islamic taxes on peasants:
  - *Jangali:* Cattle tax crippling nomadic Fulani pastoralists.
  - *Gharama:* Arbitrary market tolls and forced conscription into royal armies.

---

### 2. Sheikh Usman dan Fodio (1754–1817):
A deeply learned Toronkawa Fulani Islamic scholar, preacher, and writer who lived in Degel, Gobir:
- Preached against royal tyranny, bribery, corruption of judges, and denial of women's educational rights.
- Gained immense popular following among oppressed Hausa commoners (*Talakawa*) and nomadic Fulani herders.

---

### 3. The Spark of the Jihad (1804):
Threatened by Dan Fodio’s popularity, the King of Gobir (**Sarki Yunfa**) attempted to assassinate him and revoked royal protections:
- In February 1804, Dan Fodio performed the **Hijrah** (emigration) from Degel to **Gudu** to escape extermination.
- His disciples proclaimed him **Amir al-Mu'minin** (Commander of the Faithful), and the 1804 Jihad commenced.`,
    keyTakeaways: [
      'The 1804 Jihad was sparked by oppressive un-Islamic taxation and corrupt governance in Gobir.',
      'Usman dan Fodio championed social justice, honest governance, and women’s education.',
      'The flight (Hijrah) from Degel to Gudu in February 1804 marked the official launch of the Jihad.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'The Sokoto Caliphate: Administration & Intellectual Legacy',
    subtopics: ['Territorial Expansion of the Caliphate across Nigeria', 'Dual Administrative Division: Sokoto (Muhammad Bello) & Gwandu (Abdullahi)', 'The Emirate System and Flag Bearers', 'Intellectual Writings and Legacy of Nana Asma’u'],
    readingTimeMinutes: 9,
    summary: 'The political and intellectual architecture of the Sokoto Caliphate, the emirate governance system, and Nana Asma’u’s women’s educational movement.',
    contentMarkdown: `### 1. The Emirate Administrative System:
Following victorious military campaigns, the vast Caliphate was partitioned into two administrative zones:
- **Eastern Emirates (governed from Sokoto):** Overseen by Dan Fodio’s brilliant son, **Sultan Muhammad Bello** (Kano, Zaria, Katsina, Bauchi, Adamawa).
- **Western Emirates (governed from Gwandu):** Overseen by Dan Fodio’s scholarly brother, **Abdullahi dan Fodio** (Nupe, Ilorin, Yauri).
- Local provinces were governed by **Emirs** who received symbolic blessed flags directly from the Shehu, pledging loyalty, annual tribute, and strict judicial enforcement of Sharia.

---

### 2. Nana Asma’u (1793–1864) & The Yan Taru Movement:
Dan Fodio’s daughter, **Nana Asma’u**, was a brilliant multilingual poet, scholar, and educational revolutionary:
- Founded the **Yan Taru** ("The Associates") network of female itinerant teachers who traveled between villages educating women and girls in literacy, hygiene, medicine, Quranic jurisprudence, and textile crafts.`,
    keyTakeaways: [
      'The Sokoto Caliphate was the largest unified empire in 19th-century West Africa.',
      'It was divided into two administrative spheres: Sokoto (Muhammad Bello) and Gwandu (Abdullahi).',
      'Nana Asma’u pioneered the revolutionary Yan Taru movement for female literacy and education.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'The Old Oyo Empire: Political Structure & Checks and Balances',
    subtopics: ['Origins of Old Oyo (Oyo-Ile) and Oranmiyan', 'The Alaafin (Divine King) and His Powers', 'The Oyo Mesi (Council of Kingmakers led by the Bashorun)', 'The Ogboni Secret Society and Military Balance of Power'],
    readingTimeMinutes: 10,
    summary: 'Constitutional checks and balances in the Old Oyo Empire, the Alaafin, the Oyo Mesi, and preventing monarchical tyranny.',
    contentMarkdown: `### 1. The Constitutional Genius of Old Oyo
The Old Oyo Empire (*Oyo-Ile*) flourished from the 14th to the 18th century as the supreme imperial power across the Yoruba-speaking southwest. It was renowned for its sophisticated system of **constitutional checks and balances** that successfully prevented royal absolutism:

| Institutional Body | Core Constitutional Role | Check on Other Arms |
|---|---|---|
| **The Alaafin** | Supreme Monarch & Divine Ruler of Oyo-Ile | Executive administration through royal palace *Ilari* envoys. |
| **The Oyo Mesi** | Council of 7 Kingmakers led by the Bashorun | Can reject a tyrannical Alaafin by presenting parrot’s eggs (mandating ritual suicide). |
| **The Ogboni Society** | Sacred Judicial Custodians of the Earth Goddess | Mediates disputes between the Alaafin and the Oyo Mesi, checking the Bashorun’s ambitions. |
| **Are-Ona-Kakanfo** | Supreme Military Generalissimo | Stationed away from the capital; cannot stage domestic coups in Oyo-Ile. |

---

### 2. Institutional Powers:
- **The Alaafin:** The supreme king; governed the empire through royal palace officials (*Ilari*).
- **The Oyo Mesi:** Council of 7 hereditary principal noblemen led by the **Bashorun** (Prime Minister). They elected new Alaafins from the royal house and checked royal tyranny.
  - *The Ultimatum:* If an Alaafin became tyrannical or abused power, the Bashorun presented him with an empty calabash or a dish containing **parrot's eggs**, declaring: *"The gods reject you, the earth rejects you, the people reject you!"* By constitutional mandate, the Alaafin was required to commit ritual suicide (*take poison*).
- **The Are-Ona-Kakanfo:** The supreme generalissimo of the imperial army. If defeated in war, he was forbidden from returning home alive.`,
    keyTakeaways: [
      'Old Oyo operated an extraordinary system of constitutional checks and balances.',
      'The Oyo Mesi led by the Bashorun could compel a tyrannical Alaafin to take poison and abdicate.',
      'The Are-Ona-Kakanfo was the supreme military generalissimo of the Oyo Empire.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'The Collapse of Old Oyo & The 19th-Century Yoruba Civil Wars',
    subtopics: ['Constitutional Conflicts (Alaafin Aole vs Bashorun Gaha / Afonja)', 'The Rebellion of Afonja at Ilorin and The Fulani Alliance', 'The Destruction of Oyo-Ile (1835)', 'The 16-Year Kiriji / Ekparapo War (1877–1893)'],
    readingTimeMinutes: 10,
    summary: 'Internal political fractures, Afonja’s rebellion in Ilorin, the fall of Oyo-Ile, and the devastating Kiriji artillery wars.',
    contentMarkdown: `### 1. Internal Fractures in Old Oyo
The decline began with internal constitutional crises:
- **Bashorun Gaha’s Reign of Terror:** An ambitious Bashorun who usurped royal power and forced five successive Alaafins to commit suicide before being overthrown by Alaafin Abiodun.
- **Afonja’s Rebellion at Ilorin (1817):** The supreme military general (**Are-Ona-Kakanfo Afonja**) based at Ilorin rebelled against Alaafin Aole. To consolidate power, Afonja allied with an itinerant Fulani Muslim cleric, **Mallam Alimi**, and runaway Hausa slaves.
- **The Tragic Betrayal:** Alimi’s followers subsequently assassinated Afonja, incorporated Ilorin into the Sokoto Caliphate as an emirate, and overran Oyo-Ile in 1835.

---

### 2. The Kiriji War (1877–1893):
The collapse of Oyo-Ile triggered decades of brutal warfare among successor Yoruba city-states:
- **Ibadan Imperial Hegemony:** Ibadan rose as a formidable military republic, stationing oppressive resident administrators (*Ajele*) over eastern Yoruba territories.
- **The Ekiti Parapo Alliance:** Led by **Fabunmi of Imesi-Ile** and **Ogedengbe of Ilesha**, Ekiti and Ijesha kingdoms formed a united military alliance against Ibadan.
- Named **"Kiriji War"** after the deafening acoustic roar (*"Ki-ri-ji!"*) of newly imported European breech-loading artillery cannons. Ended only after British colonial mediation in 1893.`,
    keyTakeaways: [
      'Afonja’s rebellion at Ilorin triggered the ultimate collapse of Old Oyo.',
      'The Kiriji War was a 16-year conflict between the Ibadan Empire and the Ekiti Parapo Alliance.',
      'The war was named after the sound of heavy artillery cannons, ending with the 1893 peace treaty.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'The Niger Delta City-States & The Palm Oil Trade',
    subtopics: ['Geographical Environment of the Niger Delta', 'The Canoe House System (Wari)', 'Shift from Slave Trade to "Legitimate Commerce" (Palm Oil)', 'Rise of Merchant Princes: King Jaja of Opobo & Nana Olomu of Itsekiri'],
    readingTimeMinutes: 10,
    summary: 'The commercial canoe house system, transition to industrial palm oil exports, and heroic resistance of King Jaja of Opobo.',
    contentMarkdown: `### 1. The Canoe House System (*Wari*)
In the riverine Niger Delta (Bonny, Nembe, Kalabari, Opobo), society was organized into competitive commercial trading corporations called **Canoe Houses**:
- Each house was commanded by an elected Chief and owned heavily armed war canoes mounted with brass cannons and manned by up to 50 paddlers.
- Highly meritocratic: Even former domestic slaves with demonstrated commercial acumen could rise to become heads of royal canoe houses.

---

### 2. King Jaja of Opobo (1821–1891):
Born an enslaved Igbo boy named Mbanaso in Amaigbo (Imo State), he rose by sheer commercial genius to become head of the Anna Pepple House in Bonny:
- In 1869, he broke away from internal civil conflicts in Bonny, founded the independent commercial sovereign state of **Opobo**, and completely monopolized palm oil supply lines from the hinterland.
- Resisted British attempts to bypass his middlemen monopoly:
  - British Consul **Harry Johnston** deceitfully invited Jaja to a peace meeting aboard a British warship (*HMS Goshawk*) under promise of safe conduct.
  - Once aboard, Johnston broke his word, arrested King Jaja, and exiled him to the West Indian island of Saint Vincent.`,
    keyTakeaways: [
      'The Canoe House system was a competitive riverine commercial corporation based on merit.',
      'King Jaja rose from slavery to found Opobo and dominate the Niger Delta palm oil trade.',
      'British imperialists deceitfully captured and exiled King Jaja to seize direct access to oil markets.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'The Benin Kingdom in the 19th Century & The 1897 Punitive Expedition',
    subtopics: ['Monarchical Power of Oba Ovonramwen Nogbaisi', 'British Commercial Ambitions and Palm Oil Monopolies', 'The Phillips Ambush (January 1897)', 'The British Punitive Expedition, Burning of Benin City & Looting of Bronzes'],
    readingTimeMinutes: 10,
    summary: 'The tragedy of the 1897 British invasion of Benin, the exile of Oba Ovonramwen, and the looting of the sacred Benin Bronzes.',
    contentMarkdown: `### 1. Conflict between Oba Ovonramwen & British Imperialism
In the late 19th century, **Oba Ovonramwen Nogbaisi** ruled the historic Benin Kingdom. British merchants were determined to break the Oba's royal trade monopoly on palm oil, rubber, and ivory:
- In January 1897, British Acting Consul-General **James Phillips** dispatched an armed mission to Benin City during the sacred **Igue festival** (a period when the Oba was forbidden by religious rites from meeting foreigners).
- Despite warnings from the Oba, Phillips advanced. Benin chiefs ambushed the expedition, killing Phillips and most of his men.

---

### 2. The 1897 Punitive Expedition:
In February 1897, Britain launched a ferocious retaliatory force of 1,200 heavily armed troops under Admiral Harry Rawson:
- Captured Benin City, detonated Maxim guns, burned the ancient Oba's palace, and destroyed the monumental earthen walls.
- **The Great Plunder:** British officers looted over **3,000 priceless bronze plaques, carved ivory tusks, and ancestral regalia** from the palace shrines, auctioning them off across London, Berlin, and New York museums.
- Oba Ovonramwen was deposed and exiled to **Calabar**, where he died in 1914.`,
    keyTakeaways: [
      'The 1897 British expedition destroyed Benin City and ended sovereign independence.',
      'British soldiers looted over 3,000 sacred Benin Bronzes and auctioned them across Western museums.',
      'Oba Ovonramwen was unjustly exiled to Calabar, where he died in 1914.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'European Missionary Activities & The Legacy of Bishop Samuel Ajayi Crowther',
    subtopics: ['The Arrival of Christian Missionaries (CMS, Wesleyan, Catholic, Presbyterian)', 'Establishment of Mission Schools and Printing Presses', 'Mary Slessor and the Eradication of Twin Infanticide in Calabar', 'Life, Scholarship and Legacy of Bishop Samuel Ajayi Crowther'],
    readingTimeMinutes: 10,
    summary: 'Christian missionary history in Nigeria, vernacular translation of the Bible, hospital founding, and the pioneering legacy of Bishop Crowther.',
    contentMarkdown: `### 1. Key Missionary Milestones in Nigeria:
- **Church Missionary Society (CMS):** Arrived in Badagry and Abeokuta in the 1840s (Thomas Birch Freeman, Henry Townsend).
- **Mary Slessor (Presbyterian Church):** Lived courageously among the Efik people in Calabar and Okoyong, adopting abandoned infants and successfully abolishing the superstitious practice of **twin infanticide**.
- **Founding of Early Secondary Schools:** CMS Grammar School, Lagos (1859)—Nigeria's first formal secondary school; Baptist Academy (1885); Hope Waddell Training Institution, Calabar (1895).

---

### 2. Bishop Samuel Ajayi Crowther (1809–1891):
Rescued from a Portuguese slave ship by the British Royal Navy as a boy, he was educated in Freetown, Sierra Leone, and England:
- Became the **first African Anglican Bishop** consecrated at Canterbury Cathedral in 1864.
- Pioneered African linguistic scholarship: translated the **Holy Bible and Anglican Book of Common Prayer into Yoruba language**, and produced foundational grammars for Nupe and Igbo languages.`,
    keyTakeaways: [
      'Bishop Samuel Ajayi Crowther was the first African Anglican Bishop and translated the Bible into Yoruba.',
      'Mary Slessor heroically abolished the killing of twins in Calabar.',
      'CMS Grammar School, Lagos (founded 1859) was Nigeria’s first secondary school.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-his-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'History',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'British Colonial Conquest & Resistance Movements across Nigeria',
    subtopics: ['Methods of British Penetration (Gunboat Diplomacy, Treaties, Military Conquest)', 'The Royal Niger Company (George Goldie)', 'The Fall of the Sokoto Caliphate at the Battle of Burmi (1903)', 'Satiru Uprising and Preservation of Historical Consciousness'],
    readingTimeMinutes: 10,
    summary: 'The systematic military annexation of Nigerian territories, Royal Niger Company charters, and the heroic resistance of Sultan Attahiru I at Burmi.',
    contentMarkdown: `### 1. British Imperial Conquest Mechanisms:
- **Deceptive Treaties:** Coercing illiterate chiefs into signing treaties of "friendship and commerce" that were later interpreted as surrendering sovereign political independence.
- **The Royal Niger Company (RNC):** A chartered monopoly corporation chartered by **Sir George Goldie** equipped with private gunboats and a constabulary army to annex riverine territories.
- **Gunboat Diplomacy:** Bombarding recalcitrant native towns with modern Maxim machine guns and heavy artillery.

---

### 2. The Heroic Fall of Sokoto (Battle of Burmi, 1903):
In 1903, British troops commanded by **Lord Frederick Lugard** marched on Kano and Sokoto:
- **Sultan Attahiru I** refused to surrender Islamic sovereignty to foreign non-Muslim rulers, embarking on a massive eastern migration (*Hijrah*):
- In July 1903 at the fortified town of **Burmi** (Gombe State), Sultan Attahiru I made a heroic final stand. Armed with traditional swords and bows against British Maxim guns, the Sultan and hundreds of brave warriors fell in battle defending their homeland.
- Lugard subsequently declared the formal establishment of the **Northern Nigeria Protectorate**.`,
    keyTakeaways: [
      'Britain used deceptive treaties, Royal Niger Company forces, and Maxim guns to conquer Nigeria.',
      'Sultan Attahiru I led heroic resistance against British forces, falling bravely in battle at Burmi in 1903.',
      'Lord Lugard established the Northern and Southern Nigeria Protectorates following military subjugation.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // HOME ECONOMICS (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-hec-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Nutrient Digestion & Biochemical Absorption',
    subtopics: ['The Human Alimentary Canal Anatomy', 'Digestion of Carbohydrates (Mouth to Small Intestine)', 'Digestion of Proteins (Gastric Juice to Amino Acids)', 'Digestion of Fats (Emulsification by Bile to Fatty Acids & Glycerol)'],
    readingTimeMinutes: 9,
    summary: 'Biochemistry of food digestion, digestive enzyme catalysts, alimentary canal organs, and nutrient uptake by intestinal villi.',
    contentMarkdown: `### 1. The Alimentary Canal & Digestive Enzymes
Digestion is the physiological process of breaking down large, complex, insoluble food molecules into small, simple, soluble nutrients that can be absorbed through the intestinal walls into the bloodstream.

| Organ | Secretion / Digestive Juice | Enzymes Present | Biochemical Action on Food |
|---|---|---|---|
| **Mouth** | Saliva (pH: neutral/slightly alkaline) | **Salivary Amylase (Ptyalin)** | Hydrolyzes cooked starch into maltose sugars. |
| **Stomach** | Gastric Juice + Dilute Hydrochloric Acid ($\\text{HCl}$) | **Pepsin** and **Rennin** | $\\text{HCl}$ kills bacteria; Pepsin breaks proteins into peptones; Rennin curdles milk. |
| **Duodenum** | Pancreatic Juice + **Bile** (from liver via gallbladder) | **Amylase, Trypsin, Lipase** | Bile emulsifies large fat globules; Trypsin converts peptones into polypeptides; Lipase converts fats to fatty acids and glycerol. |
| **Ileum (Small Intestine)** | Intestinal Juice (*Succus Entericus*) | **Maltase, Sucrase, Lactase, Peptidase** | Final breakdown: Maltose $\\to$ Glucose; Peptides $\\to$ **Amino Acids**. Absorbed by microscopic **villi**! |

---

### 2. Villi & Nutrient Absorption:
Microscopic finger-like projections called **villi** lining the small intestine expand surface area enormously:
- Glucose, amino acids, vitamins, and minerals are absorbed into **blood capillaries**.
- Fatty acids and glycerol enter the specialized **lacteals** of the lymphatic system.`,
    keyTakeaways: [
      'Ptyalin digests starch in the mouth; pepsin digests protein in the acidic stomach.',
      'Bile emulsifies fats; complete nutrient absorption takes place across the villi of the ileum.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Meal Planning for Special Groups: Adolescents, Pregnant Mothers & Convalescents',
    subtopics: ['Principles of Meal Planning in Nigerian Homes', 'Nutritional Needs of Growing Adolescents', 'Dietary Requirements of Pregnant and Lactating Mothers', 'Special Diets for Convalescents (Recovering Patients) and The Elderly'],
    readingTimeMinutes: 9,
    summary: 'Tailoring nutritional diets to distinct physiological life stages, adolescent growth spurts, maternal fetal support, and convalescent healing.',
    contentMarkdown: `### 1. Factors Influencing Family Meal Planning:
- **Age:** Fast-growing adolescents require immense energy and protein; elderly individuals require easily digestible, low-fat foods.
- **Physical Activity:** Manual laborers (farmers, builders) require dense carbohydrate energy compared to sedentary desk workers.
- **Health Status:** Diabetic individuals need controlled low-glycemic carbohydrates; hypertensive individuals must restrict dietary sodium/salt.

---

### 2. Nutritional Needs of Specific Groups:
- **Adolescents (Teens):** Undergoing rapid pubertal growth spurts:
  - Require abundant **Proteins** (beans, eggs, fish) for muscular growth.
  - Require **Iron** (green vegetables, liver) for blood synthesis (especially adolescent girls experiencing monthly menstrual blood loss).
  - Require **Calcium & Phosphorus** (milk, bone meal) for skeletal bone elongation.
- **Pregnant & Lactating Mothers:**
  - Need supplemental **Folic Acid** to prevent fetal neural tube birth defects (spina bifida).
  - Need abundant dietary **Iron, Calcium, and Water** for breastmilk synthesis.
- **Convalescents (Recovering from Illness like Malaria):**
  - Need light, appetizing, easily digestible meals (warm pepper soup, steamed fish, Moi-Moi, fresh citrus juices high in Vitamin C for tissue repair).`,
    keyTakeaways: [
      'Adolescents need abundant protein, calcium, and iron during pubertal growth spurts.',
      'Pregnant mothers require folic acid, iron, and calcium to nourish the developing fetus.',
      'Convalescents need light, nutrient-dense, easily digestible meals with Vitamin C for tissue repair.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Food Preservation & Storage: Smoking, Salting, Drying & Freezing',
    subtopics: ['Why Food Spoils (Microorganisms, Enzymes, Insects, Oxidation)', 'Traditional Preservation Methods (Sun Drying, Smoking, Salting)', 'Modern Preservation Methods (Refrigeration, Freezing, Canning, Irradiation)', 'Storage Guidelines for Perishable vs Non-Perishable Foods'],
    readingTimeMinutes: 9,
    summary: 'Food microbiology, preventing post-harvest agricultural losses, traditional Nigerian preservation, and modern refrigeration.',
    contentMarkdown: `### 1. Causes of Food Spoilage:
Food spoilage is triggered by active bacterial multiplication, fungal molds, indigenous autolytic enzyme action, insect infestations, and oxidation.

---

### 2. Preservation Methods & Scientific Principles:

| Method | Mode of Action on Microorganisms | Common Nigerian Food Examples |
|---|---|---|
| **Sun Drying** | Dehydrates food, removing moisture required for bacterial growth. | Cassava flakes (*Garri*), dried pepper, crayfish, melon seeds (*Egusi*). |
| **Smoking** | Removes water and deposits antibacterial creosote compounds from wood smoke onto surfaces. | Mangala smoked fish, catfish, bushmeat. |
| **Salting** | High osmotic pressure draws water out of microbial cells, causing dehydration and death. | Dried stockfish (*Okporoko*), salted beef. |
| **Freezing ($<-18^\\circ\\text{C}$)** | Halts microbial reproduction and paralyzes enzyme activity without destroying nutrients. | Fresh chicken, beef, prawns, leafy vegetables. |
| **Canning** | High-heat sterilization ($>100^\\circ\\text{C}$) in hermetically sealed vacuum cans. | Sardines, tomato paste, sweet corn. |`,
    keyTakeaways: [
      'Microorganisms need moisture, warmth, and oxygen to multiply and spoil food.',
      'Drying and salting eliminate moisture through evaporation and high osmotic pressure.',
      'Freezing arrests bacterial replication and preserves fresh foods for extended months.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'The Sewing Machine: Parts, Functions & Maintenance',
    subtopics: ['Types of Sewing Machines (Hand, Treadle, Electric)', 'Major Parts of a Sewing Machine (Needle Bar, Presser Foot, Feed Dog, Bobbin, Balance Wheel)', 'Threading the Upper Needle and Lower Bobbin Case', 'Common Sewing Machine Faults and Solutions'],
    readingTimeMinutes: 9,
    summary: 'Mechanical engineering of the domestic sewing machine, component parts, upper/lower threading, tension regulation, and troubleshooting.',
    contentMarkdown: `### 1. The Essential Parts of a Sewing Machine:
- **Balance Wheel (Hand Wheel):** The circular wheel on the right turned manually towards the operator to raise and lower the needle.
- **Needle Bar:** Holds the sewing needle securely with a screw.
- **Presser Foot:** Metal foot that presses down firmly on the fabric to hold it flat against the throat plate during stitching.
- **Feed Dog:** Serrated toothed metal bars beneath the presser foot that automatically feed the fabric forward with each stitch.
- **Bobbin & Bobbin Case:** Small metal spool holding the lower thread inside the shuttle race beneath the needle plate.
- **Tension Discs:** Regulates the tightness or looseness of the upper thread to ensure balanced, uniform stitches.

---

### 2. Troubleshooting Common Machine Faults:
- **Needle Breaking Frequently:** Needle inserted backwards, bent needle, pulling fabric forcefully by hand instead of letting the feed dog guide it.
- **Upper Thread Snapping:** Upper tension too tight, thread caught in tension discs, needle eye too small for thread thickness.
- **Skipping Stitches:** Blunt needle, needle set too low or too high in the clamp.`,
    keyTakeaways: [
      'The feed dog automatically feeds fabric forward beneath the presser foot.',
      'Balanced stitches require correct tension adjustment between upper thread and lower bobbin thread.',
      'Regular oiling with specialized sewing machine oil prevents mechanical friction and wear.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Garment Construction: Open Seams vs French Seams',
    subtopics: ['Definition and Classification of Seams in Clothing', 'The Plain (Open) Seam: Construction and Edge Finishes', 'The French Seam (Enclosed Seam for Sheer Fabrics)', 'The Run-and-Fell (Flat-Felled) Seam for Heavy Denim'],
    readingTimeMinutes: 9,
    summary: 'Needlecraft garment construction, joining fabric pieces, seam allowances, and mastering self-enclosed French seams.',
    contentMarkdown: `### 1. What is a Seam?
A seam is the permanent line of stitching that joins two or more layers of fabric together in garment construction.

---

### 2. Comparison of Major Seam Types:
1. **Plain (Open) Seam:**
   - The most common basic seam used for everyday woven garments.
   - *Construction:* Place right sides of fabric facing together; stitch $1.5\\text{ cm}$ ($5/8\\text{ inch}$) from the edge along the seam line; press the two seam allowances open flat. Raw edges must be finished (zig-zagged, pinked, or neatened with overcasting) to prevent fraying.
2. **French Seam (Double Enclosed Seam):**
   - A self-enclosing seam with no raw edges visible on either the right or wrong side of the garment!
   - *Best for:* Fine, delicate, transparent, sheer fabrics (chiffon, silk, baby clothes).
   - *Construction:*
     - Step 1: Place fabrics with **wrong sides together**; stitch $0.5\\text{ cm}$ from edge.
     - Step 2: Trim raw seam allowance down to $0.3\\text{ cm}$.
     - Step 3: Fold fabric with **right sides together** encasing the raw edge; press and stitch $0.6\\text{ cm}$ from fold line. Result: Completely hidden, neat seam!
3. **Run-and-Fell (Flat-Felled) Seam:**
   - Incredibly strong, flat, durable seam with two visible stitch lines on the right side (used on denim jeans, school shirts, sportswear).`,
    keyTakeaways: [
      'Plain seams are pressed open with raw edges finished to prevent fraying.',
      'French seams are double-stitched and self-enclosed, ideal for sheer and delicate fabrics.',
      'Flat-felled seams provide heavy-duty strength for jeans and sportswear.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Kitchen Planning & The Ergonomic "Work Triangle"',
    subtopics: ['Principles of Kitchen Layout Planning', 'The Kitchen Work Triangle (Refrigerator, Sink, Cooker)', 'Types of Kitchen Layouts (U-Shape, L-Shape, Corridor / Galley, Single Wall)', 'Kitchen Safety, Sanitation & Ventilation'],
    readingTimeMinutes: 8,
    summary: 'Architectural kitchen design, food hygiene zones, optimizing culinary workflow through the ergonomic work triangle.',
    contentMarkdown: `### 1. The Kitchen Work Triangle
The work triangle is the foundational architectural concept governing efficient kitchen layout design. It connects the three primary food preparation activity centers:
1. **The Food Storage Center (Refrigerator / Pantry):** Where raw ingredients are stored.
2. **The Preparation & Washing Center (Sink):** Where vegetables, fish, and utensils are washed.
3. **The Cooking Center (Stove / Cooker / Oven):** Where meals are prepared and cooked.

> **Ergonomic Rule:** The total perimeter distance of the three sides of the triangle should ideally measure between **$4\\text{ to }7\\text{ meters}$**. Walking paths between them must remain unobstructed to prevent collision accidents.

---

### 2. Common Kitchen Floor Plans:
- **U-Shaped Kitchen:** The most efficient design with appliances arranged along three adjoining walls, eliminating cross-traffic.
- **L-Shaped Kitchen:** Workstations arranged along two perpendicular walls, leaving ample open space for a family dining table.
- **Corridor / Galley Kitchen:** Workstations on two parallel opposite walls (ideal for compact urban apartments).`,
    keyTakeaways: [
      'The kitchen work triangle links the Refrigerator (Storage), Sink (Washing), and Cooker (Cooking).',
      'An efficient work triangle saves thousands of wasted steps and minimizes domestic kitchen accidents.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Fabric Care & Scientific Stain Removal',
    subtopics: ['Chemical Nature of Common Stains', 'Classification of Stains (Protein, Grease, Tannin, Mineral, Dye)', 'Stain Removal Reagents (Bleaches, Solvents, Acids, Alkalies)', 'Step-by-Step Treatment of Blood, Palm Oil, Ink, and Rust Stains'],
    readingTimeMinutes: 8,
    summary: 'Laundry chemistry, chemical solubility, identifying fabric fibers, and scientific treatment protocols for stubborn stains.',
    contentMarkdown: `### 1. Golden Rules of Stain Removal:
- **Treat Stains Immediately:** Fresh stains remove easily; dried stains undergo chemical oxidation and bind permanently to fabric fibers.
- **Identify Fiber Type First:** Never apply harsh chlorine bleach (*hypochlorite*) to wool or silk; it dissolves animal protein fibers!
- **Test Inconspicuous Seams:** Always test stain removal chemicals on an inside hem or seam allowance first.

---

### 2. Scientific Stain Removal Protocols:

| Stain | Chemical Nature | Immediate Treatment Protocol |
|---|---|---|
| **Fresh Blood** | Protein-based | Soak in **COLD salted water** immediately. *Never use hot water (heat coagulates protein, baking it permanently into the fabric fibers).* |
| **Palm Oil / Vegetable Grease** | Lipid / Fat | Scrape off excess; apply warm soapy water or absorb with talcum powder / chalk before washing. |
| **Ballpoint Pen Ink** | Solvent dye | Sponge with **methylated spirit (rubbing alcohol)** or fresh sour lime juice; wash with detergent. |
| **Iron Rust** | Mineral oxide | Treat with mild oxalic acid or a paste of **fresh lemon juice and table salt**; dry in the sun. |`,
    keyTakeaways: [
      'Always use cold water on protein stains (blood, egg) to prevent heat coagulation.',
      'Methylated spirit dissolves ballpoint pen ink stains effectively.',
      'Treat stains when fresh to prevent permanent chemical fiber binding.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Family Resource Management: Time & Energy Budgeting',
    subtopics: ['Concept of Family Resources (Human vs Material)', 'Time Management Principles for Students and Homemakers', 'Energy Management & Work Simplification Techniques', 'Fatigue: Physical vs Psychological Fatigue and Rest Cycles'],
    readingTimeMinutes: 8,
    summary: 'Optimizing family resources, overcoming physical fatigue, organizing daily domestic chores, and study-life balance.',
    contentMarkdown: `### 1. Classification of Family Resources:
- **Human Resources (Intangible):** Skills, intelligence, knowledge, energy, physical stamina, time, and creative talents.
- **Material Resources (Tangible):** Money, land, family house, motor vehicles, furniture, tools, and food supplies.

---

### 2. Energy Management & Work Simplification:
Work simplification is the conscious seeking of the simplest, easiest, and quickest methods of accomplishing domestic tasks effectively:
- Store tools at the exact place where they are used (e.g. dishwashing soap directly beside the kitchen sink).
- Use proper working table heights to avoid continuous painful stooping.
- Combine tasks (e.g. running laundry wash cycles while supervising stew simmering on the stove).

---

### 3. Combating Fatigue:
- **Physical Fatigue:** Bodily exhaustion resulting from prolonged muscular exertion and lactic acid buildup. *Remedy:* Rest, hydration, and sleep.
- **Psychological (Boredom) Fatigue:** Mental tiredness resulting from monotonous, repetitive tasks without intrinsic motivation. *Remedy:* Play uplifting music, alternate tasks, and take scheduled breaks.`,
    keyTakeaways: [
      'Time and energy are vital human resources that must be budgeted purposefully.',
      'Work simplification arranges tools ergonomically to eliminate unnecessary physical strain.',
      'Alternating chores and playing music alleviates psychological boredom fatigue.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Family Budgeting: Needs, Wants & Expenditure Planning',
    subtopics: ['What is a Family Budget?', 'Distinguishing Absolute Needs from Discretionary Wants', 'Step-by-Step Formulation of a Monthly Family Budget', 'Managing Deficits and The Discipline of Emergency Savings'],
    readingTimeMinutes: 8,
    summary: 'Family financial economics, drafting balanced expenditure sheets, living within income means, and avoiding debt traps.',
    contentMarkdown: `### 1. Formulating a Family Budget:
A family budget is a financial spending plan that balances anticipated household income against projected expenditures over a specific period (usually one month).

#### Essential Budget Components:
1. **Total Net Income:** Salaries, commercial profits, farm produce sales, pensions.
2. **Fixed Expenditures (Non-Negotiable Needs):**
   - House rent.
   - School fees and textbook expenses.
   - Essential food items (rice, garri, beans, oil).
   - Utility bills (electricity prepaid units, cooking gas, water).
3. **Variable / Discretionary Expenditures (Wants):**
   - Entertainment, designer clothing, restaurant outings, parties (*Aso-Ebi*).
4. **Emergency Savings Fund (At least $10\\%$):**
   - Set aside in a savings account for sudden medical emergencies or car repairs.

---

### 2. The Golden Rule of Financial Health:
$$\\text{Total Expenditures} \\le \\text{Total Net Income}$$
- If expenses exceed income, the family faces a **budget deficit**, leading to dangerous debt and predatory moneylenders. Discipline requires cutting discretionary wants!`,
    keyTakeaways: [
      'A family budget balances anticipated income with prioritized expenditures.',
      'Always allocate at least 10% of monthly income to an emergency savings reserve.',
      'Prioritize non-negotiable survival needs (food, shelter, school fees) above luxury wants.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-hec-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Consumer Challenges & Rights in Nigerian Retail Markets',
    subtopics: ['Challenges Faced by Nigerian Consumers (Adulteration, Hoarding, Fake Labels)', 'The Eight Universal Consumer Rights (Consumers International)', 'Proactive Buyer Habits in Open Markets (Ariaria, Alaba, Balogun)', 'Seeking Legal Redress for Defective Consumer Goods'],
    readingTimeMinutes: 8,
    summary: 'Navigating open retail markets, inspecting manufacturing dates, avoiding adulterated foods, and asserting legal rights.',
    contentMarkdown: `### 1. Market Malpractices Faced by Consumers:
- **Food Adulteration:** Mixing sand with milled garri, adding red dye to palm oil, or mixing water into fresh milk.
- **Counterfeit Products:** Fake cosmetics containing mercury, substandard unbranded electrical wires.
- **Deceptive Packaging:** Using oversized cardboard boxes with false bottoms to make product contents appear larger.
- **Hoarding:** Artificially withholding goods during festive seasons to create scarcity and inflate prices.

---

### 2. The Smart Nigerian Consumer’s Checklist:
1. Always check the **NAFDAC registration number** on all packaged foods, cosmetics, and medicines.
2. Inspect the **Best Before / Expiry Date**. Never purchase expired items regardless of deep discounts!
3. Check the packaging seal for tampering or swelling (swollen canned food indicates deadly bacterial *Clostridium botulinum* contamination).
4. Demand a legible written cash receipt for all durable household goods.`,
    keyTakeaways: [
      'Consumers have the right to safety, information, choice, and legal redress.',
      'Never purchase swollen cans or expired products; verify NAFDAC registration numbers.',
      'Always demand written purchase receipts as evidence for consumer warranty claims.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  }
];
