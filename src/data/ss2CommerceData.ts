import { CurriculumTopic } from '../types';

export const SS2_COMMERCE_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: WAREHOUSING & STORAGE SYSTEMS
  // ==========================================
  {
    id: 'comm-ss2-term2-week1',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Warehousing: Meaning, Functions & Classification of Warehouses',
    subtopics: [
      'Concept of Warehousing in Commerce and Time Utility Creation',
      'Economic Functions: Storage, Price Stabilization, Security, and Breaking Bulk',
      'Types of Warehouses: Bonded, Private, Public, State/Government, and Cold Storage',
      'Location Factors for Siting Warehouses in Nigeria'
    ],
    readingTimeMinutes: 8,
    summary: 'Master the commercial importance of warehousing, examine how storage creates time utility and stabilizes seasonal agricultural prices, and compare bonded, private, and public warehouses.',
    contentMarkdown: `### 1. What is Warehousing?

**Warehousing** is an essential aid to trade that encompasses all commercial activities involved in the systematic storage, preservation, and protection of goods from the time they are produced or imported until they are demanded by consumers or manufacturers.

By preserving goods until they are needed, warehousing creates **Time Utility**.

### 2. Commercial Functions of Warehousing

| Function | Commercial Impact & Value Addition |
| :--- | :--- |
| **1. Seasonal Equalization** | Balances seasonal agricultural production (e.g. yam, maize, beans) with continuous, year-round urban consumption. |
| **2. Price Stabilization** | Prevents drastic post-harvest price crashes and protects consumers from off-season scarcity and artificial price hikes. |
| **3. Breaking Bulk & Packaging** | Large bulk consignments are unpacked, sorted, graded, labeled, and repackaged into smaller retail units. |
| **4. Risk Bearing & Protection** | Shields valuable commodities from theft, pest infestation, weather damage, and deterioration. |
| **5. Facilitating Financing** | Warehouses issue **Warehouse Warrants** and delivery receipts, which merchants use as collateral to secure bank loans. |

### 3. Classification of Warehouses

1. **Bonded Warehouses:**
   - Dedicated customs-controlled facilities licensed by the government (Nigeria Customs Service).
   - Dutiable imported goods are stored here **under customs bond** before customs duties are paid.
   - The importer can re-export the goods without paying import duties or process goods in-bond before release.
2. **Public Warehouses:**
   - Owned by private commercial logistics operators who lease out storage space to any business or trader for a rental fee.
   - Ideal for small and medium enterprises (SMEs) that cannot afford to build private warehouses.
3. **Private Warehouses:**
   - Exclusively owned and operated by large manufacturing conglomerates or wholesalers (e.g. Dangote Cement depots, Nigerian Breweries distribution hubs).
4. **State / Government Warehouses:**
   - Managed by statutory marketing boards or disaster relief agencies (e.g. Strategic National Grain Reserves, NEMA depots).
5. **Cold Storage Facilities:**
   - Temperature-controlled refrigerated warehouses specialized in storing highly perishable commodities (fresh fish, meat, dairy, pharmaceuticals).`,
    keyTakeaways: [
      'Warehousing creates time utility by bridging the time gap between production and consumption.',
      'Bonded warehouses hold dutiable imported goods under customs supervision until import duties are settled.',
      'Public warehouses lease storage space to third parties, whereas private warehouses serve one company.',
      'Warehouse warrants are negotiable documents of title accepted by commercial banks as collateral.'
    ],
    associatedQuizId: 'comm-ss2-warehousing-quiz'
  },

  // ==========================================
  // WEEK 2: INSURANCE & FUNDAMENTAL PRINCIPLES
  // ==========================================
  {
    id: 'comm-ss2-term2-week2',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Insurance: Meaning, Pooling of Risks & Fundamental Principles',
    subtopics: [
      'Concept of Insurance vs. Assurance and the Pooling of Risks Theory',
      'Insurance Terminology: Insurer, Insured, Premium, Policy, Claim, and Underwriter',
      'The Six Fundamental Principles of Insurance: Insurable Interest, Utmost Good Faith, and Indemnity',
      'Principles of Subrogation, Contribution, and Proximate Cause'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze the mechanism of pooling risks, distinguish insurance from assurance, and master the six legal principles of insurance under Nigerian Insurance Commission (NAICOM) standards.',
    contentMarkdown: `### 1. What is Insurance?

**Insurance** is an aid to trade that provides a financial risk-management mechanism whereby an individual or business (**the insured**) pays a periodic sum (**the premium**) to an insurance company (**the insurer**) in exchange for a contract (**the policy**) guaranteeing financial compensation in the event of a specified contingent loss, damage, or liability.

- **The Pooling of Risks Theory:** Insurance operates on the mathematical law of large numbers. Premiums collected from thousands of policyholders are pooled into a common fund. Since only a small percentage experience catastrophe at any given time, the pool comfortably compensates the unfortunate few.
- **Insurance vs. Assurance:**
  - **Insurance:** Protects against events that *might* happen (contingencies like fire, burglary, motor accidents).
  - **Assurance:** Protects against events that are *bound* to happen inevitably (e.g. death in Life Assurance).

### 2. The Six Fundamental Principles of Insurance

[Diagram: commerce-insurance-principles]

| Principle | Meaning & Legal Application |
| :--- | :--- |
| **1. Insurable Interest** | The insured must stand in a legal relationship to the insured subject matter such that they benefit from its existence and suffer direct financial loss from its destruction. You cannot insure your neighbor's car! |
| **2. Utmost Good Faith (*Uberrimae Fidei*)** | Both insurer and insured must disclose all material facts fully, truthfully, and without concealment on the proposal form. Concealing a medical history or prior accident voids the contract. |
| **3. Principle of Indemnity** | The insured is restored to the exact financial position they enjoyed immediately before the loss occurred. **The insured cannot make a profit from insurance.** (Applies to all property insurance, but not Life Assurance). |
| **4. Principle of Subrogation** | An extension of indemnity. Once the insurer fully compensates the insured for total loss, the insurer steps into the legal shoes of the insured, claiming ownership of the damaged wreckage or right to sue third-party tortfeasors. |
| **5. Principle of Contribution** | If an insured takes policies with multiple insurance firms covering the same risk, they cannot claim full compensation from each. Each insurer contributes only their proportionate, rateable share: $\\text{Contribution} = \\frac{\\text{Sum Insured with Company}}{\\text{Total Sum Insured}} \\times \\text{Actual Loss}$. |
| **6. Proximate Cause** | The direct, active, unbroken cause that triggers the loss. If the proximate cause is an excluded peril in the policy, the insurer is not liable. |`,
    keyTakeaways: [
      'Insurance is based on the pooling of risks by many to compensate the few who suffer losses.',
      'Insurable interest prevents people from taking speculative insurance on assets they do not own.',
      'Under the Principle of Indemnity, the insured cannot profit from their loss.',
      'Subrogation transfers salvage rights and legal recourse to the insurer upon full claim settlement.'
    ],
    associatedQuizId: 'comm-ss2-insurance-principles-quiz'
  },

  // ==========================================
  // WEEK 3: LIFE & NON-LIFE INSURANCE POLICIES
  // ==========================================
  {
    id: 'comm-ss2-term2-week3',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Insurance Policies: Life Assurance & Non-Life Property Covers',
    subtopics: [
      'Life Assurance Contracts: Whole Life Assurance vs. Endowment Assurance',
      'Fire Insurance: Valued Policies, Average Clause, and Assessment of Claims',
      'Marine Insurance: Hull, Cargo, Freight, and Shipowner’s Liability (General vs. Particular Average)',
      'Motor Vehicle Insurance: Third-Party Only (Mandatory in Nigeria) vs. Comprehensive Cover'
    ],
    readingTimeMinutes: 8,
    summary: 'Compare life assurance policies with non-life contracts, examine the Average Clause in fire claims, analyze marine insurance losses, and evaluate mandatory third-party motor insurance.',
    contentMarkdown: `### 1. Life Assurance Policies

Because human life cannot be monetarily valued, life contracts are classified as **Assurance**:
- **Whole Life Assurance:** Premiums are paid throughout life or up to a specified age (e.g. 65). The sum assured is payable **only upon the death of the life assured** to named beneficiaries.
- **Endowment Assurance:** The sum assured is payable **either upon reaching a specific maturity age** (e.g. after 20 years) or **upon death prior to maturity**, whichever occurs first. Combines savings with protection.

### 2. Fire Insurance & The Average Clause

Fire insurance compensates businesses for destruction caused by accidental fire, lightning, or explosion.

- **The Average Clause (Under-Insurance Penalty):** If an asset is insured for less than its true market value, the insured is deemed their own insurer for the difference and must bear a proportionate fraction of any partial loss:

$$\\text{Compensation Payable} = \\frac{\\text{Sum Insured}}{\\text{Actual Market Value}} \\times \\text{Actual Loss}$$

**Worked Example:** Alhaji Bello owns a warehouse valued at ₦10,000,000 but insures it for only ₦6,000,000 (under-insured by 40%). A fire causes ₦2,000,000 in damage. Calculate the compensation paid:
$$\\text{Compensation} = \\frac{6,000,000}{10,000,000} \\times 2,000,000 = 0.6 \\times 2,000,000 = \\mathbf{₦1,200,000}$$
Alhaji Bello must absorb the remaining ₦800,000 loss himself.

### 3. Marine Insurance & Types of Marine Losses

Covers perils of the sea (shipwreck, piracy, collision, jettison).
- **Hull Insurance:** Covers the physical ship structure and machinery.
- **Cargo Insurance:** Covers merchandise and goods carried on board.
- **Freight Insurance:** Protects the shipping company's transport earnings.
- **General Average Loss:** Deliberate sacrifice of part of the cargo/ship (e.g. jettisoning containers to prevent a sinking ship from capsizing) to preserve the safety of all. The loss is shared proportionally by all cargo and ship owners.
- **Particular Average Loss:** Accidental partial damage affecting only one specific cargo owner (not shared).

### 4. Motor Vehicle Insurance in Nigeria

Under the Motor Vehicles (Third Party Insurance) Act:
1. **Third-Party Only:** Minimum legal requirement to drive on Nigerian roads. Covers bodily injury, death, and property damage caused to third parties; does **not** cover damage to the insured's own vehicle.
2. **Comprehensive Insurance:** Full protection covering third-party liability, theft, fire, and collision damage to the owner's own vehicle.`,
    keyTakeaways: [
      'Endowment assurance pays out either at maturity date or upon premature death.',
      'The Average Clause penalizes under-insurance by scaling down claim compensation proportionally.',
      'General Average losses are shared proportionally by all parties whose cargo was saved.',
      'Third-party motor insurance is mandatory by law in Nigeria, but covers only external victims.'
    ],
    associatedQuizId: 'comm-ss2-insurance-policies-quiz'
  },

  // ==========================================
  // WEEK 4: BANKING & FINANCIAL SERVICES
  // ==========================================
  {
    id: 'comm-ss2-term2-week4',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Banking & Financial Institutions: Commercial, Specialized & Digital Banking',
    subtopics: [
      'Types of Bank Accounts: Savings, Current, and Fixed Deposit Accounts',
      'Credit Instruments: Cheques (Open vs. Crossed), Bank Drafts, and Letters of Credit',
      'Specialized Development Banks: Bank of Industry (BOI), Bank of Agriculture (BOA), and NEXIM',
      'Electronic Banking Innovations: NIBSS, Point of Sale (POS), USSD, and Mobile Apps'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate commercial bank account types, examine negotiable credit instruments like cheques and letters of credit, and analyze development banks and Nigerian electronic payment systems.',
    contentMarkdown: `### 1. Types of Bank Accounts in Commercial Banking

| Account Type | Target Customer | Interest Earned | Withdrawal Rules & Features |
| :--- | :--- | :--- | :--- |
| **Savings Account** | Small savers, salary earners, students | Modest interest paid periodically | Passbook or ATM card; restrictions on frequent withdrawals to qualify for interest. |
| **Current Account** | Businessmen, corporations, merchants | Zero interest; attracts Commission on Turnover (COT) / account maintenance fees | Cheque book issued; unlimited daily withdrawals; eligible for bank overdrafts. |
| **Fixed Deposit Account** | Investors with idle surplus funds | High, negotiated interest rate | Funds locked for a fixed tenor (30, 90, 180, 365 days); premature withdrawal forfeits interest. |

### 2. Cheques as Negotiable Credit Instruments

A **Cheque** is an unconditional written order addressed by a customer (drawer) to a bank (drawee) to pay on demand a specified sum of money to a named person or order (payee).

- **Parties to a Cheque:**
  1. **Drawer:** The account holder who writes and signs the cheque.
  2. **Drawee:** The commercial bank holding the funds (e.g. First Bank).
  3. **Payee:** The beneficiary named on the cheque to receive the money.
- **Open Cheque:** Can be cashed over the bank counter immediately by the presenter.
- **Crossed Cheque:** Bears two parallel transverse lines across its face; **cannot be cashed over the counter** and must be paid into a bank current account, protecting against theft.

### 3. Specialized Development Banks in Nigeria

1. **Bank of Industry (BOI):** Provides long-term, low-interest concessionary loans for industrial manufacturing and equipment acquisition.
2. **Bank of Agriculture (BOA):** Finances farming, livestock development, and agricultural value chains.
3. **NEXIM Bank (Nigerian Export-Import Bank):** Finances non-oil export production and foreign trade guarantees.

### 4. Electronic Banking & FinTech Architecture in Nigeria

- **NIBSS (Nigeria Inter-Bank Settlement System):** Provides real-time switching infrastructure enabling instant fund transfers (NIP) between all Nigerian banks.
- **POS (Point of Sale) Terminals:** Enables card payments at retail stores and agency banking cash withdrawals in remote communities.
- **USSD Banking:** Enables offline account transactions via short codes without Internet access.`,
    keyTakeaways: [
      'Current accounts issue cheque books and permit bank overdrafts but pay no interest.',
      'A crossed cheque cannot be cashed over the counter and must be cleared through an account.',
      'Development banks like BOI and BOA provide subsidized long-term capital for industry and farming.',
      'NIBSS provides the inter-bank switching infrastructure powering instant electronic transfers in Nigeria.'
    ],
    associatedQuizId: 'comm-ss2-banking-quiz'
  },

  // ==========================================
  // WEEK 5: THE CAPITAL MARKET & THE NIGERIAN EXCHANGE (NGX)
  // ==========================================
  {
    id: 'comm-ss2-term2-week5',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'The Capital Market: The Nigerian Exchange (NGX), SEC & Securities Trading',
    subtopics: [
      'Structure of the Financial Market: Money Market (Short-term) vs. Capital Market (Long-term)',
      'Primary Market (Initial Public Offerings - IPOs) vs. Secondary Market (Trading on NGX)',
      'Market Operators: Stockbrokers, Jobbers, Issuing Houses, and Central Securities Clearing System (CSCS)',
      'Market Trends and Speculators: Bulls (Optimists), Bears (Pessimists), and Stags'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze the capital market architecture, compare primary and secondary securities markets, examine the regulatory role of the SEC and NGX, and classify stock market speculators.',
    contentMarkdown: `### 1. Money Market vs. Capital Market

The financial system channels savings into productive investments across two distinct tenors:

| Market Category | Tenor of Funds | Key Financial Instruments | Regulatory Agency |
| :--- | :--- | :--- | :--- |
| **Money Market** | Short-term borrowing (under 1 year) | Treasury bills, Commercial papers, Bankers acceptances, Certificates of deposit | Central Bank of Nigeria (CBN) |
| **Capital Market** | Medium-to-long term financing (3 to 30+ years) | Ordinary shares, Preference shares, Corporate debentures, Federal Government (FGN) bonds | Securities and Exchange Commission (SEC) |

### 2. The Nigerian Capital Market Structure

[Diagram: commerce-stock-exchange-ngx]

- **Securities and Exchange Commission (SEC):** The apex government regulatory authority overseeing all capital market participants to protect investors from fraud.
- **Nigerian Exchange Group (NGX):** The registered securities exchange floor where public company stocks and government bonds are traded.
- **Primary Market:** The market for newly issued shares (IPOs, Rights issues); capital flows directly from investors to the issuing company.
- **Secondary Market:** The market for trading existing, quoted shares among investors via licensed stockbrokers; provides liquidity to shareholders.

### 3. Key Capital Market Institutions & Operators

1. **Stockbrokers:** Licensed trading agents who execute buy and sell orders on the exchange floor on behalf of client investors for a commission.
2. **Issuing Houses (Investment Banks):** Underwrite and package new share issues, prepare prospectuses, and guarantee share sales.
3. **CSCS (Central Securities Clearing System):** Electronic depository that clears, settles, and digitally records share ownership within $T + 2$ days, eliminating physical paper share certificates.

### 4. Types of Stock Market Speculators

- **Bulls:** Speculators who anticipate that share prices will **rise**; they purchase stocks now aiming to sell at higher prices later (*Bullish Market = rising prices*).
- **Bears:** Speculators who anticipate that share prices will **fall**; they sell holdings now to repurchase them cheaply later (*Bearish Market = falling prices*).
- **Stags:** Speculators who apply for large volumes of new IPO share issues, hoping the shares will open at a premium on the first day of public trading.`,
    keyTakeaways: [
      'The capital market deals in long-term capital, regulated by the Securities and Exchange Commission (SEC).',
      'The Primary Market issues new shares (IPOs); the Secondary Market trades existing shares on the NGX.',
      'CSCS operates as the electronic share clearing and settlement depository in Nigeria.',
      'Bulls speculate on price increases, Bears anticipate price drops, and Stags target IPO premiums.'
    ],
    associatedQuizId: 'comm-ss2-capital-market-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM CLINIC & WORKED COMMERCIAL CALCULATIONS
  // ==========================================
  {
    id: 'comm-ss2-term2-week6',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Commerce Clinic: Insurance Claims & Capital Market Calculations',
    subtopics: [
      'Review of Warehousing, Principles of Insurance, and Capital Market Structures',
      'Worked Insurance Claims Calculations: Applying the Average Clause and Contribution Formulas',
      'Calculation of Stock Exchange Share Yields, Dividends, and Price-to-Earnings (P/E) Ratios',
      'Solving WAEC Practical Commercial Scenarios and Case Studies'
    ],
    readingTimeMinutes: 8,
    summary: 'Solve practical WAEC calculation problems on insurance indemnity, average clauses, contribution ratios, and stock market dividends and dividend yields.',
    contentMarkdown: `### 1. Insurance Contribution Formula Workshop

**Scenario:** A commercial cold-room valued at ₦12,000,000 is insured against fire with two companies:
- Company A: Sum insured = ₦6,000,000
- Company B: Sum insured = ₦4,000,000
A fire causes an actual damage loss of ₦3,000,000. Calculate how much compensation each insurer must pay.

$$\\text{Total Sum Insured} = 6,000,000 + 4,000,000 = ₦10,000,000$$

$$\\text{Liability of Company A} = \\frac{\\text{Sum Insured A}}{\\text{Total Sum Insured}} \\times \\text{Actual Loss} = \\frac{6,000,000}{10,000,000} \\times 3,000,000 = \\mathbf{₦1,800,000}$$

$$\\text{Liability of Company B} = \\frac{\\text{Sum Insured B}}{\\text{Total Sum Insured}} \\times \\text{Actual Loss} = \\frac{4,000,000}{10,000,000} \\times 3,000,000 = \\mathbf{₦1,200,000}$$

$$\\text{Total Compensation Received} = 1,800,000 + 1,200,000 = ₦3,000,000 \\quad (\\text{Indemnity satisfied})$$

### 2. Stock Exchange Share Calculations

**Scenario:** Musa purchased 5,000 ordinary shares of Dangote Sugar Plc at ₦40 per share. At year-end, the company declared a dividend of ₦2.50 per share.
1. What was Musa's total capital investment?
2. What is the total dividend received?
3. Calculate the Dividend Yield percentage.

**Solutions:**
1. $\\text{Total Investment} = 5,000 \\times ₦40 = \\mathbf{₦200,000}$.
2. $\\text{Total Dividend} = 5,000 \\times ₦2.50 = \\mathbf{₦12,500}$.
3. $\\text{Dividend Yield} = \\frac{\\text{Dividend Per Share}}{\\text{Market Price Per Share}} \\times 100 = \\frac{2.50}{40} \\times 100 = \\mathbf{6.25\\%}$.

### 3. Key Marking Traps in Commercial Calculations

- When applying the Average Clause, always check if the property was under-insured before computing.
- Remember that under indemnity, compensation cannot exceed actual loss or policy limits.`,
    keyTakeaways: [
      'Under the contribution principle, each insurer pays their proportionate share of the verified loss.',
      'Dividend yield measures dividend payout relative to current share market price.',
      'Total compensation from multiple insurance policies can never exceed the actual financial damage.',
      'Carefully verify whether an insurance policy contains an Average Clause before calculating claims.'
    ],
    associatedQuizId: 'comm-ss2-midterm-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: ADVERTISING & SALES PROMOTION
  // ==========================================
  {
    id: 'comm-ss2-term2-week7',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Advertising, Media Selection & Sales Promotion Strategies',
    subtopics: [
      'Definition, Roles, and Economic Importance of Advertising in Commerce',
      'Types of Advertising: Informative, Persuasive, Competitive, and Institutional',
      'Advertising Media Evaluation: Television, Radio, Newspapers, Billboards, and Social Media',
      'Sales Promotion Techniques: Free Samples, Discounts, Loyalty Schemes, and Contests'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate advertising types and media channels, examine sales promotion tools, analyze the economic merits and criticisms of advertising, and understand consumer purchase persuasion.',
    contentMarkdown: `### 1. What is Advertising?

**Advertising** is any paid, non-personal communication of ideas, goods, or services by an identified sponsor through mass communication media to inform, persuade, or influence target consumers.

### 2. Primary Types of Advertising

| Advertising Type | Commercial Objective | Practical Example |
| :--- | :--- | :--- |
| **Informative Advertising** | Informs the public about a new product, new prices, or novel product applications. | An announcement of a new WAEC digital CBT registration portal. |
| **Persuasive Advertising** | Appeals to emotions, status, or self-image to convince consumers to choose a specific brand over rivals. | Soft drink ads associating consumption with happiness, romance, or athletic stamina. |
| **Competitive Advertising** | Emphasizes superior qualities, lower prices, or features to win market share from direct competitors. | Telecom adverts comparing 5G internet speeds and data rollover. |
| **Institutional / Corporate** | Builds long-term goodwill, reputation, and public trust for a company rather than promoting specific goods. | A petroleum firm running ads highlighting scholarships and tree-planting CSR programs. |

### 3. Advertising Media Comparison

- **Radio:** Broadest geographic reach across rural and urban Nigeria; broadcasts in local languages (Yoruba, Hausa, Igbo, Pidgin); affordable.
- **Television:** High sensory impact combining sight, sound, motion, and color; expensive production and airtime costs.
- **Billboards / Outdoor:** High geographic visibility on major highways; message must be concise.
- **Digital / Social Media (Instagram, TikTok, YouTube):** Hyper-targeted audience segmentation by age, interest, and location; real-time engagement analytics.

### 4. Sales Promotion Techniques

Short-term incentives to spark immediate consumer purchases:
- **Free Samples:** Distributing travel-sized sachets to induce product trial.
- **Price Discounts / BOGOF:** "Buy One, Get One Free" to clear stock.
- **Loyalty Programs:** Points or cashback cards rewarding repeat patronage.
- **Competitions & Raffles:** Promos offering cars or cash prizes for buying promotional packs.`,
    keyTakeaways: [
      'Advertising is a paid, non-personal message designed to inform or persuade consumers.',
      'Informative advertising introduces new goods; persuasive advertising appeals to consumer emotions.',
      'Radio offers the broadest geographic reach in Nigeria across diverse languages.',
      'Sales promotions provide short-term purchase incentives through discounts, samples, and contests.'
    ],
    associatedQuizId: 'comm-ss2-advertising-quiz'
  },

  // ==========================================
  // WEEK 8: PUBLIC RELATIONS & CUSTOMER SERVICE
  // ==========================================
  {
    id: 'comm-ss2-term2-week8',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Public Relations (PR), Corporate Image & Customer Relationship Management',
    subtopics: [
      'Definition and Core Objectives of Public Relations in Modern Business',
      'Differences Between Public Relations and Paid Advertising',
      'PR Instruments: Press Releases, Sponsorships, Facility Tours, and Corporate Social Responsibility (CSR)',
      'Customer Care, Feedback Mechanisms, and Managing Corporate Crises'
    ],
    readingTimeMinutes: 7,
    summary: 'Distinguish Public Relations from advertising, examine instruments for building corporate reputation and goodwill, analyze Corporate Social Responsibility, and evaluate crisis management.',
    contentMarkdown: `### 1. What is Public Relations (PR)?

**Public Relations (PR)** is the deliberate, planned, and sustained effort by an organization to establish, build, and maintain mutual understanding, goodwill, and trust between the organization and its various internal and external **publics** (customers, employees, shareholders, government regulators, community neighbors, and the press).

### 2. Advertising vs. Public Relations

| Criterion | Advertising | Public Relations (PR) |
| :--- | :--- | :--- |
| **Payment Model** | Paid media space (guaranteed airtime, pages, or ad slots). | Earned media coverage through press releases, news conferences, and events. |
| **Control of Message**| Complete sponsor control over wording, visuals, and timing. | The media editor determines whether to report the story and how to frame it. |
| **Credibility** | Viewed with consumer skepticism ("sales talk"). | Perceived as objective third-party news endorsement; higher credibility. |
| **Primary Goal** | Direct generation of sales and brand awareness. | Building corporate reputation, trust, and managing institutional goodwill. |

### 3. Instruments of Public Relations

1. **Press Releases & Media Briefings:** Official written statements issued to journalists to announce new investments or refute false rumors.
2. **Corporate Social Responsibility (CSR):** Philanthropic community investments (e.g. drilling boreholes, building school computer laboratories, funding medical outreaches).
3. **Event Sponsorship:** Funding national sports tournaments, cultural arts festivals, and academic spelling bees.
4. **House Journals & Publications:** Internal magazines and newsletters that keep employees informed.

### 4. Crisis Management & Customer Care

When emergencies strike (e.g. oil spills, product contamination, flight cancellations), professional PR mandates:
- Immediate, transparent communication without cover-ups.
- Demonstrating empathy and providing restitution to affected customers.
- Establishing toll-free hotlines and dedicated customer dispute resolution desks.`,
    keyTakeaways: [
      'Public Relations builds long-term institutional goodwill and mutual trust with the public.',
      'Unlike paid advertising, PR relies on earned media coverage and carries higher credibility.',
      'Corporate Social Responsibility demonstrates that a firm cares about community development.',
      'Effective crisis management requires swift, transparent, and empathetic communication.'
    ],
    associatedQuizId: 'comm-ss2-pr-customer-service-quiz'
  },

  // ==========================================
  // WEEK 9: CONSUMER PROTECTION IN NIGERIA
  // ==========================================
  {
    id: 'comm-ss2-term2-week9',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Consumer Protection: Rights, Unfair Trade Practices & Regulatory Agencies',
    subtopics: [
      'The Need for Consumer Protection: Caveat Emptor, Adulteration, False Weights, and Hoarding',
      'The Eight Universal Consumer Rights (UN Guidelines)',
      'Statutory Regulatory Agencies: FCCPC, NAFDAC, SON, and NDLEA',
      'Channels for Consumer Complaints, Redress, and Product Recalls in Nigeria'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate the necessity of consumer protection, analyze the eight universal consumer rights, examine the mandates of the FCCPC, NAFDAC, and SON, and practice redress procedures.',
    contentMarkdown: `### 1. Why Do Consumers Need Protection?

Historically, commercial transactions were governed by the legal doctrine of **Caveat Emptor** (*"Let the buyer beware"*). However, modern market complexities make consumers vulnerable to exploitation by unscrupulous businesses:

- **Product Adulteration:** Mixing substandard, expired, or dangerous chemicals into food, drinks, and cosmetics.
- **Deceptive Packaging & False Weights:** Misrepresenting weight measures or using oversized deceptive boxes.
- **Hoarding & Artificial Scarcity:** Secretly locking up commodities to artificially drive up retail prices.
- **Hazardous Goods:** Substandard electrical cables causing building infernos; counterfeit life-saving medicines.

### 2. The Eight Universal Consumer Rights

Enshrined by the United Nations and adopted by Nigeria:
1. **Right to Safety:** Protection against hazardous products and production processes.
2. **Right to be Informed:** Provision of facts, ingredients, expiration dates, and instructions.
3. **Right to Choose:** Access to a variety of goods at competitive market prices.
4. **Right to be Heard:** Guarantee that consumer interests receive full consideration in government policies.
5. **Right to Redress:** Fair settlement of genuine claims, compensation for misrepresentation or defective goods.
6. **Right to Consumer Education:** Acquisition of knowledge to make informed, confident choices.
7. **Right to Satisfaction of Basic Needs:** Access to essential food, water, shelter, and healthcare.
8. **Right to a Healthy Environment:** Living in an environment that is non-threatening to well-being.

### 3. Statutory Consumer Protection Agencies in Nigeria

| Agency | Full Name & Legal Mandate | Concrete Enforcement Role |
| :--- | :--- | :--- |
| **FCCPC** | Federal Competition and Consumer Protection Commission (FCCPC Act 2018) | Apex consumer agency; eliminates anti-competitive agreements, prosecutes deceptive pricing, orders full product refunds and recalls. |
| **NAFDAC** | National Agency for Food and Drug Administration and Control | Inspects, certifies, registers, and seals counterfeit food, pharmaceutical drugs, medical devices, and packaged water. |
| **SON** | Standards Organisation of Nigeria | Formulates industrial quality benchmarks; awards the MANCAP quality certification mark; confiscates substandard imported electricals and tyres. |`,
    keyTakeaways: [
      'Consumer protection shifts liability away from Caveat Emptor to producer accountability.',
      'The eight consumer rights guarantee safety, information, choice, hearing, and legal redress.',
      'FCCPC is the apex consumer protection agency in Nigeria, prosecuting unfair trade practices.',
      'NAFDAC regulates food and drugs; SON enforces manufacturing quality standards and certifications.'
    ],
    associatedQuizId: 'comm-ss2-consumer-protection-quiz'
  },

  // ==========================================
  // WEEK 10: TRADE ASSOCIATIONS & CHAMBERS OF COMMERCE
  // ==========================================
  {
    id: 'comm-ss2-term2-week10',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Trade Associations, Chambers of Commerce & Employers’ Consultative Bodies',
    subtopics: [
      'Meaning, Membership, and Primary Objectives of Trade Associations',
      'Functions of Trade Associations: Code of Ethics, Price Guidelines, and Member Welfare',
      'Chambers of Commerce: Local, Bilateral, and National Bodies (NACCIMA)',
      'The Manufacturers Association of Nigeria (MAN) and NECA (Nigeria Employers’ Consultative Association)'
    ],
    readingTimeMinutes: 7,
    summary: 'Analyze trade associations, compare them with Chambers of Commerce, examine the functions of NACCIMA and MAN, and evaluate their policy advocacy influence on government.',
    contentMarkdown: `### 1. What are Trade Associations?

A **Trade Association** is a non-profit voluntary association formed by business owners and firms operating within the **same trade, industry, or line of business** (e.g. National Union of Road Transport Workers / NURTW, Association of Master Bakers, Electronic Dealers Association).

- **Core Objectives:**
  - Standardizing pricing and credit policies across the trade.
  - Setting codes of professional conduct and trade ethics for members.
  - Organizing bulk purchasing of raw materials to secure trade discounts.
  - Collective bargaining with government ministries on trade taxes and levies.

### 2. Chambers of Commerce

Unlike trade associations (which represent a single industry), a **Chamber of Commerce** is a voluntary association of businessmen, manufacturers, bankers, importers, and exporters operating across **diverse business sectors within a specific city or geographical territory** (e.g. Lagos Chamber of Commerce and Industry / LCCI).

- **NACCIMA:** The Nigerian Association of Chambers of Commerce, Industry, Mines and Agriculture is the national apex body uniting all local chambers of commerce.

| Key Functions of Chambers of Commerce | Real-World Commercial Impact |
| :--- | :--- |
| **1. Organizing International Trade Fairs** | Hosts the annual Lagos International Trade Fair, Kaduna Trade Fair, and Enugu Trade Fair to showcase innovations. |
| **2. Issuing Certificates of Origin** | Authenticates that manufactured goods originate in Nigeria, facilitating export clearing under AfCFTA. |
| **3. Policy Advocacy & Lobbying** | Submits memoranda to the Federal Government during national budget drafting to lobby for tariff reductions. |
| **4. Bilateral Business Promotion** | Fosters foreign investment partnerships through bodies like the Nigerian-British Chamber of Commerce. |

### 3. Manufacturers Association of Nigeria (MAN)

An influential lobby group representing Nigerian industrial manufacturers:
- Advocates for stable electricity tariffs, import duty waivers on raw materials, and foreign exchange allocation for industrial machinery.`,
    keyTakeaways: [
      'Trade associations unite firms within the same line of business; Chambers of Commerce unite diverse businesses in a city.',
      'NACCIMA is the apex federation of Chambers of Commerce in Nigeria.',
      'Chambers of Commerce organize international trade fairs and issue certificates of origin for exports.',
      'MAN advocates for industrial manufacturers on energy tariffs, foreign exchange, and tax waivers.'
    ],
    associatedQuizId: 'comm-ss2-trade-associations-quiz'
  },

  // ==========================================
  // WEEK 11: MODERN TECHNOLOGY & E-COMMERCE
  // ==========================================
  {
    id: 'comm-ss2-term2-week11',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Electronic Commerce (E-Commerce), Digital Retail & Payment Technologies',
    subtopics: [
      'Definition of Electronic Commerce (E-Commerce) and Electronic Business (E-Business)',
      'E-Commerce Models: Business-to-Consumer (B2C), Business-to-Business (B2B), and Consumer-to-Consumer (C2C)',
      'Advantages and Logistical Bottlenecks of E-Commerce in the Nigerian Marketplace',
      'Electronic Payment Security: Multi-Factor Authentication, OTP, Chargebacks, and Cyber Fraud'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate modern e-commerce models (B2B, B2C, C2C), assess benefits and delivery logistics in Nigeria, and analyze digital payment security protocols.',
    contentMarkdown: `### 1. What is E-Commerce?

**Electronic Commerce (E-Commerce)** refers to the buying, selling, marketing, and servicing of goods and services over electronic telecommunications networks, primarily the Internet.

### 2. Primary E-Commerce Transaction Models

| Model | Transaction Dynamic | Real-World Nigerian Commercial Examples |
| :--- | :--- | :--- |
| **B2C (Business-to-Consumer)** | Online commercial retail stores selling goods directly to individual shoppers. | Jumia Nigeria, Konga, Supermarket online shopping apps. |
| **B2B (Business-to-Business)** | Wholesale platforms where businesses buy inventory, industrial inputs, or raw materials from other firms. | TradeDepot, Alerzo, wholesale petroleum exchange platforms. |
| **C2C (Consumer-to-Consumer)** | Digital peer-to-peer marketplaces where individual citizens sell used items directly to other citizens. | Jiji Nigeria, Facebook Marketplace. |
| **B2G / G2B (Business-to-Government)** | Online procurement portals where companies bid for public government contracts. | Bureau of Public Procurement (BPP) federal bidding portals. |

### 3. Benefits & Logistical Bottlenecks in Nigeria

- **Commercial Benefits:**
  - 24/7 global shopping availability without physical shop rental overheads.
  - Price comparison algorithms and home doorstep delivery.
  - Wide merchandise selection beyond local geographical borders.
- **Nigerian Logistical Challenges:**
  - Inaccurate street addressing systems in informal urban settlements.
  - Distrust of prepaid card transactions leading to high demand for "Payment on Delivery" (POD).
  - High transportation fuel costs and traffic congestion in major commercial hubs like Lagos and Port Harcourt.

### 4. Electronic Payment Security Measures

1. **Two-Factor Authentication (2FA):** Demands a password plus a dynamic One-Time Password (OTP) sent to the customer's phone before debiting accounts.
2. **Tokenization & SSL Encryption:** Replaces real card numbers with encrypted digital tokens during transit.
3. **Cardholder Verification:** Card Verification Value (CVV) checks to confirm physical possession.`,
    keyTakeaways: [
      'E-Commerce encompasses online buying and selling across telecommunication networks.',
      'The three major models are B2C (Jumia), B2B (TradeDepot), and C2C (Jiji).',
      'Doorstep delivery in Nigeria is challenged by incomplete street numbering and reliance on Payment on Delivery.',
      'Two-Factor Authentication and OTP protocols shield online bank accounts from unauthorized transactions.'
    ],
    associatedQuizId: 'comm-ss2-ecommerce-quiz'
  },

  // ==========================================
  // WEEK 12: EXAMINATION MASTERCLASS & REVISION CLINIC
  // ==========================================
  {
    id: 'comm-ss2-term2-week12',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review, WAEC Commerce Examination Masterclass & Essay Technique Clinic',
    subtopics: [
      'Comprehensive Second Term Syllabus Synthesis (Warehousing, Insurance, Banking, Capital Market, E-Commerce)',
      'Step-by-Step Breakdown of WAEC Theory and Calculation Questions',
      'Structuring High-Scoring Commerce Essay Answers: Headings, Bullet Logic, and Real-World Examples',
      'Exam Hall Tactics: Maximizing Scores in WAEC Paper 1 (Objectives) and Paper 2 (Theory)'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate Second Term Commerce competencies, master structured essay answering formulas, review multi-tier calculation problems, and optimize exam hall timing.',
    contentMarkdown: `### 1. Second Term Curriculum Architecture

This term investigated the sophisticated financial, risk management, and technological infrastructure of modern commerce:
1. **Aids to Trade (Weeks 1–4):** Warehousing time utility, Insurance principles and claim indemnity, Commercial and development banking, and credit instruments.
2. **Capital Formation & Exchange (Weeks 5–6):** Securities and Exchange Commission (SEC), Nigerian Exchange (NGX), stockbrokerage, and quantitative insurance/dividend calculations.
3. **Marketing & Public Reputation (Weeks 7–8):** Advertising channels, sales promotions, and corporate public relations.
4. **Institutional Governance & Technology (Weeks 9–11):** Consumer protection (FCCPC, NAFDAC, SON), Chambers of Commerce (NACCIMA), and E-Commerce transaction models.

### 2. Model WAEC Theory Questions & Marking Rubrics

**Question 1: Explain five differences between a Commercial Bank and the Central Bank of Nigeria.**
- *Model Marking Table:*

| Point of Comparison | Commercial Banks | Central Bank of Nigeria (CBN) |
| :--- | :--- | :--- |
| **1. Ownership** | Owned by private shareholders and corporate investors. | 100% owned by the Federal Government of Nigeria. |
| **2. Primary Motive** | Driven by profit maximization. | Driven by national economic stability and public welfare. |
| **3. Customer Base** | Serves ordinary individuals, traders, and private firms. | Serves commercial banks, government ministries, and foreign central banks. |
| **4. Currency Issuance**| Cannot print or issue legal tender currency notes. | Holds the sole statutory monopoly to issue the Naira and Kobo. |
| **5. Lender of Last Resort**| Borrows from the central bank in liquidity crises. | Acts as the ultimate lender of last resort to commercial banks. |

**Question 2: State four functions of the Central Securities Clearing System (CSCS).**
- *Model Answer:*
  1. Operates as the central electronic depository for all listed equities, debentures, and bonds in Nigeria.
  2. Clears and settles stock transactions within the mandatory $T + 2$ trading cycle.
  3. Eliminates risks of stolen, forged, or lost paper share certificates.
  4. Facilitates automated dividend and bonus share distribution to shareholders.

### 3. Golden Guidelines for WAEC Paper 2 Theory Essays

- **Avoid Monolithic Paragraphs:** State your point as a bold, numbered heading, then provide a concise 2-sentence explanatory mechanism followed by a concrete Nigerian example.
- **Budget Time:** In WAEC Commerce Paper 2, spend no more than 20 minutes on each chosen question.`,
    keyTakeaways: [
      'Structure WAEC theory answers using clear bold headings and concrete Nigerian institutional examples.',
      'Commercial banks serve the public for profit, while the Central Bank regulates the economy for the state.',
      'The CSCS electronically settles and records share transactions within T + 2 days.',
      'Allocate time methodically during the exam to complete all required questions.'
    ],
    associatedQuizId: 'comm-ss2-final-exam-quiz'
  }
];
