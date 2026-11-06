import { CurriculumTopic } from '../types';

export const SS1_DATA_PROCESSING_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: DATA CARE & DATA SECURITY
  // ==========================================
  {
    id: 'dp-ss1-term2-week1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Data Care, Data Security & Threat Protection',
    subtopics: [
      'Definition of Data Care & Information Security',
      'Threats to Computer Data (Physical, Environmental & Digital)',
      'Data Protection Countermeasures: Passwords, Firewalls & Cryptography',
      'Clean Power Systems: Surge Protectors & Uninterruptible Power Supply (UPS)'
    ],
    readingTimeMinutes: 7,
    summary: 'Analyze data protection principles, identify digital and physical threat vectors, and implement defensive security protocols including encryption and clean power.',
    contentMarkdown: `### 1. What is Data Care and Data Security?

- **Data Care**: The disciplined practice of properly handling, storing, maintaining, and backing up data files to prevent accidental loss, degradation, or corruption.
- **Data Security**: The technological and administrative protective measures designed to defend digital data from unauthorized access, malicious modification, theft, or catastrophic destruction.

---

### 2. Threats to Computer Data vs. Protective Measures

| Threat Classification | Specific Threat Vectors | Harm / Consequence | Recommended Protective Countermeasure |
| :--- | :--- | :--- | :--- |
| **Physical Threats** | Hardware theft, fire outbreak, liquid spills, vandalism | Permanent loss of storage drives and local data assets | Physical locks, biometric server access, smoke detectors, CCTV monitoring. |
| **Environmental Threats** | Atmospheric dust, high humidity, extreme room heat | Short-circuits, read/write disk head crashes, overheating | Air-conditioned server rooms, dust covers, regular vacuum blower servicing. |
| **Electrical Threats** | High voltage surges, brownouts, sudden power failure | Burning of delicate SSD/HDD controller chips; write-cycle corruption | **Uninterruptible Power Supply (UPS)** and dedicated voltage stabilizers. |
| **Digital / Cyber Threats** | Viruses, worms, trojans, ransomware, phishing, hackers | Unauthorized copying of sensitive records, encryption for ransom | **Antivirus software**, enterprise **firewalls**, strong password policies, and data **encryption**. |

---

### 3. Core Data Security Protocols

1. **Access Control & Strong Password Policies**:
   - Minimum 8–12 characters combining uppercase, lowercase, numbers, and symbols (\`P@ssw0rd#2026\`).
   - Multi-Factor Authentication (MFA) requiring biometric or SMS token confirmation.
2. **Cryptographic Encryption**:
   - Transforming human-readable plaintext into unreadable ciphertext using mathematical keys (AES-256). Even if storage media is stolen, unauthorized parties cannot decipher the data.
3. **Uninterruptible Power Supply (UPS)**:
   - Contains rechargeable internal battery packs that provide instantaneous backup electricity when national grid power fails, allowing system operators to safely save open documents and shut down cleanly.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which of the following devices protects computers from sudden shut-down during power outages and supplies temporary emergency electricity?
  - A) Inverter step-down transformer
  - B) Uninterruptible Power Supply (UPS) (*Correct*)
  - C) External hard disk
  - D) Network router
- **Question 2**: The process of converting readable plaintext into unreadable ciphertext to prevent unauthorized access is termed:
  - A) Data compilation
  - B) Data encryption (*Correct*)
  - C) Disk defragmentation
  - D) Data sorting`,
    keyTakeaways: [
      'Data security protects electronic data against unauthorized access, theft, and accidental corruption.',
      'A UPS provides emergency battery power during blackouts, preventing operating system file corruption.',
      'Encryption scrambles data into ciphertext readable only by authorized cryptographic key holders.'
    ],
    associatedQuizId: 'waec-dp-ss1-q1'
  },

  // ==========================================
  // WEEK 2: COMPUTER VIRUSES & ANTI-MALWARE
  // ==========================================
  {
    id: 'dp-ss1-term2-week2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Computer Viruses, Malware Taxonomy & Antivirus Utilities',
    subtopics: [
      'Definition of Computer Virus & Malicious Software (Malware)',
      'Malware Taxonomy: Worms, Trojans, Ransomware & Spyware',
      'Sources & Transmission Vectors of Virus Infections',
      'Antivirus Installation, Heuristic Scanning & Security Habits'
    ],
    readingTimeMinutes: 7,
    summary: 'Classify malicious software programs, evaluate how infections propagate across flash drives and networks, and deploy proactive antivirus utilities.',
    contentMarkdown: `### 1. What is a Computer Virus?

A **computer virus** is a self-replicating, human-authored malicious program designed to attach itself to legitimate programs, alter the operation of a computer, damage files, corrupt operating system registries, or consume system memory without the user's informed consent.

---

### 2. Malware Classification Taxonomy

**Malware (Malicious Software)** is the broad umbrella term for all harmful digital code:

| Malware Class | Mode of Operation & Propagation | Defining Signature Characteristic |
| :--- | :--- | :--- |
| **Virus** | Attaches to executable files (\`.exe\`, \`.com\`, \`.bat\`); **requires human action** (clicking or running the host file) to replicate. | Corrupts documents, deletes boot sectors, slows processing. |
| **Worm** | **Self-propagating program** that replicates automatically across computer networks **without human intervention**. | Consumes network bandwidth; floods servers; clogs memory. |
| **Trojan Horse** | Disguises itself as an attractive, harmless software application (e.g. a free game or media player). | Opens hidden "backdoors" for remote cybercriminals to steal passwords and financial data. |
| **Ransomware** | Illegally encrypts the victim's hard drive files and displays a ransom demand screen. | Demands cryptocurrency payment (e.g. Bitcoin) to release decryption key (e.g. WannaCry). |
| **Spyware / Keylogger** | Silently monitors user activities, web browsing history, and keyboard keystrokes in background. | Transmits harvested credit card numbers, passwords, and personal identities to third parties. |

---

### 3. Transmission Vectors & Safe Computing Habits

#### Primary Infection Sources:
1. Infected removable media (USB flash drives, memory cards, external HDDs).
2. Malicious email attachments (phishing emails with executable \`.exe\` or macro-enabled \`.docm\` files).
3. Downloading pirated software, cracked games, and unauthorized torrent files from untrusted websites.
4. Connecting to unencrypted public Wi-Fi networks without VPN or firewall protection.

#### Antivirus Defense Mechanisms:
- **Signature-Based Scanning**: Compares suspect files against a database of known malware binary signatures.
- **Heuristic Analysis**: Detects previously unknown zero-day malware by monitoring suspicious, aggressive program behaviors.
- **Leading Commercial Antivirus Engines**: Norton, Kaspersky, Windows Defender, Avast, Bitdefender, McAfee.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which type of malware replicates automatically across computer networks without requiring human execution of a host program?
  - A) Trojan horse
  - B) Computer worm (*Correct — self-propagating network malware*)
  - C) Macro virus
  - D) Logic bomb
- **Question 2**: A user downloads what appears to be a genuine media player, but running it secretly opens a backdoor for unauthorized remote hackers. This malware is a:
  - A) Trojan horse (*Correct — deceptive disguise*)
  - B) Computer worm
  - C) Boot sector virus
  - D) File infector`,
    keyTakeaways: [
      'Malware encompasses viruses, worms, trojans, ransomware, and spyware.',
      'Worms replicate independently across networks without user action; viruses require execution of a host file.',
      'Antivirus programs use signature matching and heuristic behavioral analysis to neutralize threats.'
    ],
    associatedQuizId: 'waec-dp-ss1-q2'
  },

  // ==========================================
  // WEEK 3: SPREADSHEETS & CELL ADDRESSING
  // ==========================================
  {
    id: 'dp-ss1-term2-week3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Spreadsheet Applications, Grid Anatomy & Cell Addressing',
    subtopics: [
      'Definition of Spreadsheet, Workbook vs. Worksheet',
      'Grid Anatomy: Rows, Columns, Active Cell & Name Box',
      'Relative Cell Referencing (A1) Mechanics',
      'Absolute ($A$1) & Mixed ($A1, A$1) Cell Referencing'
    ],
    readingTimeMinutes: 8,
    summary: 'Master electronic spreadsheets, navigate coordinate grids, enter data types, and apply relative, absolute, and mixed cell referencing protocols.',
    contentMarkdown: `### 1. What is an Electronic Spreadsheet?

An **electronic spreadsheet** (e.g. Microsoft Excel, Google Sheets, LibreOffice Calc) is an interactive application program designed for the organization, numerical analysis, automated calculation, and graphical visualization of tabular data arranged in rows and columns.

#### Workbook vs. Worksheet:
- **Workbook**: An entire spreadsheet document file (saved with \`.xlsx\` or \`.ods\` extension), which can contain multiple individual worksheets.
- **Worksheet**: A single two-dimensional grid page consisting of intersecting rows and columns.

---

### 2. Spreadsheet Grid Anatomy

[Diagram: spreadsheet-grid-anatomy]

| Component | Technical Function & Coordinates |
| :--- | :--- |
| **Columns** | Vertical sections identified by alphabetical letters (**$A, B, C, \\dots, Z, AA, \\dots, XFD$**; total $= 16,384$ columns). |
| **Rows** | Horizontal sections identified by numbers (**$1, 2, 3, \\dots, 1,048,576$** rows). |
| **Cell** | The rectangular intersection of a column and a row (e.g. Cell **$C4$**). |
| **Active Cell Pointer** | The currently selected cell highlighted with a bold border; receives current keyboard inputs. |
| **Name Box** | Display box located to the left of the formula bar showing the address of the active cell (e.g. $C4$). |
| **Formula Bar** | Display bar that shows the actual underlying formula, mathematical equation, or raw value stored in the active cell. |

---

### 3. Cell Referencing Protocols: Relative, Absolute & Mixed

| Referencing Type | Syntax Format | Behavior When Formula is Copied / Dragged Down | Practical Example Use Case |
| :--- | :--- | :--- | :--- |
| **Relative Reference** | \`A1\` | **Both column and row coordinates adjust automatically** relative to the new destination. | Copying \`=B2 * C2\` down an invoice column to compute row-by-row line item totals. |
| **Absolute Reference** | \`$A$1\` | **Both column and row coordinates remain frozen / locked**. The dollar sign (\`$\`) locks the coordinate. | Referencing a single static tax rate or exchange rate cell: \`=C4 * $A$1\`. |
| **Mixed Reference** | \`$A1\` or \`A$1\` | **Only one coordinate is locked**: \`$A1\` locks column $A$ while allowing row to change; \`A$1\` locks row $1$ while allowing column to change. | Constructing multi-row, multi-column multiplication tables. |

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: In Microsoft Excel, what symbol is placed before column and row coordinates to make a cell reference absolute?
  - A) \`#\` (Hash)
  - B) \`$\` (Dollar sign) (*Correct — \`$A$1\` locks both coordinates*)
  - C) \`@\` (At sign)
  - D) \`%\` (Percentage)
- **Question 2**: If the formula \`=A1 + B1\` in cell \`C1\` is copied and pasted into cell \`C2\`, what will the formula become in \`C2\`?
  - A) \`=A1 + B1\`
  - B) \`=A2 + B2\` (*Correct — relative coordinates shift one row down*)
  - C) \`=$A$2 + $B$2\`
  - D) \`=A1 + B2\``,
    keyTakeaways: [
      'A spreadsheet grid consists of vertical columns (A-Z) and horizontal rows (1-1,048,576).',
      'The active cell address appears in the Name Box; its underlying formula appears in the Formula Bar.',
      'Relative references (A1) adjust when copied; absolute references ($A$1) freeze coordinates with dollar signs.'
    ],
    associatedQuizId: 'waec-dp-ss1-q3'
  },

  // ==========================================
  // WEEK 4: SPREADSHEET FORMULAS & FUNCTIONS
  // ==========================================
  {
    id: 'dp-ss1-term2-week4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Spreadsheet Formulas, Mathematical Functions & Logic',
    subtopics: [
      'Syntax Rules of Spreadsheet Formulas (Equal Sign =)',
      'Arithmetic Operators & Operator Precedence (PEMDAS)',
      'Standard Mathematical & Statistical Functions: SUM, AVERAGE, COUNT, MAX, MIN',
      'Conditional Logic: The IF() Function Statement'
    ],
    readingTimeMinutes: 8,
    summary: 'Write syntax-compliant mathematical formulas, apply operator precedence rules, and utilize statistical functions and conditional IF statements.',
    contentMarkdown: `### 1. Formulas vs. Built-in Functions

- **Formula**: A custom user-written mathematical expression designed to calculate a specific result:
  \`=A1 + B1 * C1\`
- **Function**: A built-in, pre-programmed standard computational algorithm with a fixed name and syntax:
  \`=SUM(A1:A10)\`

> *Cardinal Rule of Spreadsheets: **Every formula and function MUST begin with an equal sign ($=$)**. Without the initial $=$, the program interprets the entry as static text.*

---

### 2. Operator Precedence (PEMDAS / BODMAS)

When evaluating compound mathematical expressions, spreadsheets follow standard algebraic precedence:
1. **Parentheses**: \`( )\` evaluated first.
2. **Exponents**: \`^\` (e.g. \`2^3 = 8\`).
3. **Multiplication & Division**: \`*\` and \`/\` evaluated from left to right.
4. **Addition & Subtraction**: \`+\` and \`-\` evaluated from left to right.

#### Example:
Expression: \`= 10 + 5 * 2^2\`
- Step 1 (Exponent): \`2^2 = 4\`
- Step 2 (Multiplication): \`5 * 4 = 20\`
- Step 3 (Addition): \`10 + 20 = 30\` (Result $= 30$)

---

### 3. Essential Standard Spreadsheet Functions

| Function Name | Syntax Specification | Functional Output Description | Practical Example |
| :--- | :--- | :--- | :--- |
| **SUM** | \`=SUM(range)\` | Computes the arithmetic total of all numerical values in the specified cell range. | \`=SUM(D2:D50)\` sums all student marks. |
| **AVERAGE** | \`=AVERAGE(range)\` | Calculates the statistical arithmetic mean of all numeric values. | \`=AVERAGE(E2:E30)\` computes class mean score. |
| **COUNT** | \`=COUNT(range)\` | Counts the number of cells in the range that contain **numerical numbers only**. | \`=COUNT(A2:A100)\` counts total students with test scores. |
| **COUNTA** | \`=COUNTA(range)\` | Counts the number of cells that are **not empty** (numbers, text, symbols). | \`=COUNTA(B2:B100)\` counts total student names entered. |
| **MAX** | \`=MAX(range)\` | Identifies and returns the highest numerical value in the range. | \`=MAX(C2:C50)\` finds the top exam score. |
| **MIN** | \`=MIN(range)\` | Identifies and returns the lowest numerical value in the range. | \`=MIN(C2:C50)\` finds the lowest exam score. |
| **IF** | \`=IF(test, true_val, false_val)\` | Evaluates a logical condition and returns one value if TRUE, and another if FALSE. | \`=IF(C2 >= 50, "PASS", "FAIL")\` |

---

### 4. Common Spreadsheet Error Codes

| Error Code | Root Cause & Diagnostic Meaning | Correction Protocol |
| :--- | :--- | :--- |
| \`#####\` | The cell is too narrow to display the long number or date. | Double-click column header boundary to widen the column. |
| \`#DIV/0!\` | The formula attempts to divide a number by zero or an empty cell. | Verify denominator divisor cell is not zero. |
| \`#VALUE!\` | The formula contains an incompatible data type (e.g. attempting to add text to a number: \`=A1 + "Apple"\`). | Ensure all referenced cells contain numerical data. |
| \`#NAME?\` | A function name is misspelled (e.g. \`=SUMM(A1:A10)\` or \`=AVRAGE(B1:B5)\`). | Correct the spelling of the function keyword. |
| \`#REF!\` | A cell referenced in the formula has been deleted from the sheet. | Restore the deleted cell or update formula coordinates. |

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: What will be the result of the spreadsheet formula \`= 12 + 6 / 2\`?
  - A) 9
  - B) 15 (*Correct — Division precedes addition: $6 / 2 = 3$; $12 + 3 = 15$*)
  - C) 18
  - D) 3
- **Question 2**: Which function is used to determine how many students scored 50 marks and above in an exam column?
  - A) \`=SUMIF()\`
  - B) \`=COUNTIF(range, ">=50")\` (*Correct — conditional counting function*)
  - C) \`=AVERAGE()\`
  - D) \`=MAX()\``,
    keyTakeaways: [
      'All spreadsheet formulas must begin with an equal sign (=).',
      'Evaluation follows PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.',
      'SUM adds values, AVERAGE finds the mean, COUNT tallies numbers, and IF performs logical branching.'
    ],
    associatedQuizId: 'waec-dp-ss1-q4'
  },

  // ==========================================
  // WEEK 5: DATA VISUALIZATION & CHARTS
  // ==========================================
  {
    id: 'dp-ss1-term2-week5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Data Visualization & Charting Types in Spreadsheets',
    subtopics: [
      'The Purpose & Power of Visual Data Presentation',
      'Chart Types: Column, Bar, Line, Pie & Scatter Plots',
      'Chart Elements: Axes, Legends, Data Labels & Titles',
      'Algorithmic Flowcharts: ISO Standard Control Logic Symbols'
    ],
    readingTimeMinutes: 7,
    summary: 'Transform raw numerical tables into meaningful visual charts and master standard flowchart symbols for algorithmic logic control.',
    contentMarkdown: `### 1. Why Visualize Data?

Data visualization converts dense tables of raw numbers into graphical representations, enabling decision-makers to rapidly identify trends, anomalies, outliers, seasonal patterns, and proportional distributions that would otherwise remain hidden in text rows.

---

### 2. Standard Chart Types & When to Use Them

| Chart Class | Visual Structure | Primary Analytical Purpose | Practical West African Business Example |
| :--- | :--- | :--- | :--- |
| **Column Chart** | Vertical rectangular bars | Comparing discrete categorical data items across distinct groups. | Comparing annual cocoa output across 6 Nigerian agricultural zones. |
| **Bar Chart** | Horizontal rectangular bars | Comparing categories with lengthy text labels. | Ranking secondary schools by WAEC pass percentages. |
| **Line Chart** | Data points connected by continuous line segments | Visualizing continuous trends, fluctuations, and time-series patterns over time. | Tracking daily Naira-to-Dollar exchange rate shifts over 12 months. |
| **Pie Chart** | Circular disc divided into proportional sector slices | Displaying proportional part-to-whole percentage distributions ($100\\%$ total). | Showing national federal budget revenue allocations across sectors. |
| **Scatter Plot ($X-Y$)** | Individual unlinked coordinate dots plotted on Cartesian axes | Demonstrating mathematical correlation between two continuous variables. | Plotting fertilizer application dosage ($kg/ha$) against maize yield ($tonnes$). |

---

### 3. Key Anatomical Components of a Chart
1. **Chart Title**: Clearly states what data the chart portrays and the relevant timeframe.
2. **Horizontal Axis ($X\\text{-axis / Category Axis}$)**: Displays the independent variables or category labels.
3. **Vertical Axis ($Y\\text{-axis / Value Axis}$)**: Displays the numerical scale of measurement (e.g. Metric Tonnes, Millions of Naira).
4. **Legend**: A color-coded key identifying multiple data series plotted on the same chart.
5. **Data Labels**: Numerical values stamped directly above or beside data markers for precise reading.

---

### 4. Algorithmic Flowcharts & Standard ISO Symbols

Flowcharts provide visual blueprints for data processing pipelines and computer program logic:

[Diagram: data-flow-charts]

- **Terminal (Oval / Rounded Rectangle)**: Indicates the **START** or **STOP / END** of the program logic.
- **Input / Output (Parallelogram)**: Represents user data entry (\`INPUT ExamScore\`) or displaying results (\`PRINT "PASS"\`).
- **Process (Rectangle)**: Represents an internal computational operation or variable assignment (\`Total = Score1 + Score2\`).
- **Decision (Diamond)**: Represents a conditional logical test (\`Score >= 50?\`) with mutually exclusive output branches (**YES / NO**).
- **Flowlines (Arrows)**: Connects symbols, showing the exact directional sequence of execution.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: Which chart type is most suitable for representing the proportional sector contribution of agriculture, oil, and manufacturing to Nigeria's Gross Domestic Product (GDP)?
  - A) Scatter plot
  - B) Pie chart (*Correct — ideal for part-to-whole percentage breakdowns totaling 100%*)
  - C) Line chart
  - D) Radar chart
- **Question 2**: In a computer programming flowchart, which geometric symbol represents a conditional decision test?
  - A) Parallelogram
  - B) Diamond (*Correct — decision diamond with dual branching*)
  - C) Rectangle
  - D) Oval`,
    keyTakeaways: [
      'Column and bar charts compare discrete categories; line charts track continuous time-series trends.',
      'Pie charts represent proportional part-to-whole distributions totaling 100%.',
      'In flowcharts, ovals represent Start/Stop, parallelograms represent Input/Output, and diamonds represent Decisions.'
    ],
    associatedQuizId: 'waec-dp-ss1-q5'
  },

  // ==========================================
  // WEEK 6: WORD PROCESSING & ARCHITECTURE
  // ==========================================
  {
    id: 'dp-ss1-term2-week6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Word Processing, Document Formatting & Mail Merge',
    subtopics: [
      'Definition & Functions of Word Processing Packages',
      'GUI Interface Anatomy: Ribbon, Ruler, Margins & Status Bar',
      'Text Formatting, Paragraph Alignment & Tabular Layouts',
      'The Mail Merge Principle for Mass Personalized Documents'
    ],
    readingTimeMinutes: 7,
    summary: 'Master professional document formatting, manipulate layout rulers and margins, and execute mail merges to produce personalized batch documents.',
    contentMarkdown: `### 1. What is Word Processing?

**Word processing** is the creation, editing, formatting, storage, and printing of textual documents (letters, reports, legal contracts, certificates) using specialized application software such as Microsoft Word, Google Docs, or Apple Pages.

---

### 2. Interface Anatomy of Modern Word Processors

1. **The Ribbon**: Tabbed command toolbar at the top organizing tools into logical functional groups (**Home**, **Insert**, **Page Layout**, **References**, **Mailings**, **Review**, **View**).
2. **Ruler**: Horizontal and vertical graduated bars displaying page margins, paragraph indents, and tab stops.
3. **Margins**: The blank white space separating text content from the physical edge of the printed page (standard margin $= 1.0\\,\\text{inch}$ or $2.54\\,\\text{cm}$).
4. **Status Bar**: Bottom bar displaying active page number, total word count, language dictionary, and zoom slider.

---

### 3. Paragraph Formatting & Alignment

- **Left Alignment (\`Ctrl + L\`)**: Text aligns flush along the left margin; ragged right edge (standard for general correspondence).
- **Center Alignment (\`Ctrl + E\`)**: Text centers symmetrically between margins (used for titles and certificates).
- **Right Alignment (\`Ctrl + R\`)**: Text aligns flush along the right margin; ragged left edge (used for dates and sender addresses).
- **Justified Alignment (\`Ctrl + J\`)**: Word spacing adjusts dynamically so text aligns **flush along both left and right margins** (standard for textbooks, newspapers, and academic publications).

#### Essential Keyboard Shortcut Combinations:
| Shortcut Combination | Executed Word Processing Command |
| :--- | :--- |
| \`Ctrl + C\` / \`Ctrl + V\` | Copy selected text to clipboard / Paste from clipboard |
| \`Ctrl + X\` | Cut selected text (removes from document into clipboard) |
| \`Ctrl + Z\` / \`Ctrl + Y\` | Undo last action / Redo last undone action |
| \`Ctrl + S\` | Save active document to storage disk |
| \`Ctrl + B\` / \`Ctrl + I\` / \`Ctrl + U\` | Toggle **Bold** / *Italics* / <u>Underline</u> styling |
| \`Ctrl + F\` / \`Ctrl + H\` | Find specific text / Find and Replace text |

---

### 4. The Mail Merge Principle

**Mail Merge** is an automated feature in word processing used to create multiple personalized letters, envelopes, admission letters, or certificates from a single template document:
1. **Main Document**: Contains the static boilerplate text and placeholders called **Merge Fields** (e.g. \`<<FirstName>>\`, \`<<AdmissionNo>>\`).
2. **Data Source**: A structured database or spreadsheet table containing the unique recipient records (names, addresses, scores).
3. **Merged Document**: The resulting batch document combining the boilerplate text with unique personal records for each individual recipient.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: Which paragraph alignment aligns text flush against both the left and right margins simultaneously?
  - A) Left alignment
  - B) Right alignment
  - C) Justified alignment (*Correct — \`Ctrl + J\` creates clean straight margins on both sides*)
  - D) Center alignment
- **Question 2**: The word processing facility that allows a school principal to generate 500 personalized admission letters from one master template and an Excel student database is:
  - A) AutoCorrect
  - B) Mail Merge (*Correct*)
  - C) Thesaurus
  - D) Macros`,
    keyTakeaways: [
      'Word processors format text, paragraphs, tables, and page layouts for printing and digital sharing.',
      'Justified alignment (Ctrl + J) spaces words so text aligns flush against both left and right margins.',
      'Mail Merge combines a main boilerplate document with a database data source to produce personalized batch documents.'
    ],
    associatedQuizId: 'waec-dp-ss1-q6'
  },

  // ==========================================
  // WEEK 7: INTRODUCTION TO DBMS & ARCHITECTURE
  // ==========================================
  {
    id: 'dp-ss1-term2-week7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Introduction to Database Management Systems (DBMS)',
    subtopics: [
      'The Data Hierarchy: Character, Field, Record, File & Database',
      'Flat-File vs. Relational Database Management Systems (RDBMS)',
      'Entities, Attributes & Tables (Relations)',
      'Primary Keys, Foreign Keys & Referential Integrity'
    ],
    readingTimeMinutes: 8,
    summary: 'Discover the architecture of Relational Database Management Systems, navigate the data hierarchy, and enforce referential integrity with primary and foreign keys.',
    contentMarkdown: `### 1. The Data Hierarchy

In computer data processing, data is structured into a logical ascending hierarchy:

$$\\text{Bit} \\longrightarrow \\text{Character / Byte} \\longrightarrow \\text{Field} \\longrightarrow \\text{Record} \\longrightarrow \\text{Table / File} \\longrightarrow \\text{Database}$$

| Hierarchy Level | Definition | Concrete Secondary School Example |
| :--- | :--- | :--- |
| **Character / Byte** | The smallest addressable unit of text, number, or symbol ($8\\,\\text{bits}$). | The letter \`'A'\` or digit \`'7'\`. |
| **Field (Attribute / Column)** | A collection of characters representing a single meaningful data item of a specific data type. | \`FirstName\`, \`DateOfBirth\`, \`AdmissionNumber\`. |
| **Record (Tuple / Row)** | A complete collection of related fields describing one single entity. | A single row containing complete information for student *Amina Bello*. |
| **Table / File (Relation)** | A collection of related records arranged in rows and columns. | The \`STUDENTS\` table containing records for all 500 enrolled students. |
| **Database** | An organized, integrated collection of related tables managed as a unified system. | The \`NationalSchoolRecord_DB\` containing \`STUDENTS\`, \`TEACHERS\`, and \`EXAM_SCORES\`. |

---

### 2. Flat-File vs. Relational Database Management Systems (RDBMS)

- **Flat-File Database**: Stores all data in a single plain text file or single spreadsheet table (e.g. a simple CSV file).
  - *Severe Limitations*: High **data redundancy** (duplication of student names on every transaction); prone to **update anomalies** and inconsistency.
- **Relational Database (RDBMS)**: Organizes data into multiple specialized tables linked together by common key fields (e.g. Microsoft Access, MySQL, PostgreSQL, Oracle).
  - *Advantages*: Eliminates data redundancy, saves storage space, ensures data integrity, and supports complex multi-table queries.

---

### 3. Primary Keys & Foreign Keys

[Diagram: relational-database-schema]

1. **Primary Key ($PK$)**:
   - A unique field (or combination of fields) chosen to uniquely identify each individual record in a database table.
   - **Mandatory Invariant**: A Primary Key **must be unique** and **can NEVER contain a null (empty) value**.
   - Examples: \`NationalID_NIN\`, \`AdmissionNumber\`, \`BankAccountNumber\`.
2. **Foreign Key ($FK$)**:
   - A field in a child table that points back to and matches the Primary Key field in a parent table.
   - Creates the relational bridge establishing **1-to-Many ($1:N$)** or **Many-to-Many ($M:N$)** relationships between tables.
3. **Referential Integrity**:
   - A database rule guaranteeing that a foreign key value in a child table must match an existing primary key in the parent table, preventing orphaned records.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: In a database table, a single horizontal row containing all related data fields for an individual student is called a:
  - A) Field
  - B) Record (or Tuple) (*Correct*)
  - C) Schema
  - D) Attribute
- **Question 2**: A field in a database table whose values must be strictly unique and can never be left empty is called the:
  - A) Foreign key
  - B) Primary key (*Correct — uniquely identifies each entity row*)
  - C) Secondary key
  - D) Index key`,
    keyTakeaways: [
      'The data hierarchy progresses: Character → Field → Record → Table → Database.',
      'Relational databases eliminate duplicate data redundancy by linking tables using keys.',
      'A Primary Key uniquely identifies a record and cannot be null; a Foreign Key links child tables to parent tables.'
    ],
    associatedQuizId: 'waec-dp-ss1-q7'
  },

  // ==========================================
  // WEEK 8: DATABASE TABLES & DATA TYPES
  // ==========================================
  {
    id: 'dp-ss1-term2-week8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Relational Database Operations, Data Types & Validation Rules',
    subtopics: [
      'Creating Tables: Design View vs. Datasheet View',
      'Primitive Database Data Types (Text, Number, Date, Currency, Boolean)',
      'Field Properties: Field Size, Default Values & Required Rules',
      'Data Validation Rules & Input Masks for Error Prevention'
    ],
    readingTimeMinutes: 7,
    summary: 'Design database tables in Design View, select appropriate primitive data types, and enforce input validation rules to prevent data entry errors.',
    contentMarkdown: `### 1. Database Table Views

In DBMS applications like Microsoft Access, tables are managed in two complementary views:
- **Design View**: The architectural blueprint mode where developers define field names, select data types, configure field size limits, and assign the Primary Key.
- **Datasheet View**: The data entry grid mode resembling a spreadsheet where users input, edit, view, and delete actual data records.

---

### 2. Standard Database Data Types

Selecting the correct data type ensures data integrity and optimizes disk storage:

| Data Type | Permitted Values & Storage Characteristics | Practical West African Database Example |
| :--- | :--- | :--- |
| **Short Text (Varchar)** | Alphanumeric text, spaces, and punctuation up to 255 characters. | Student full names, street addresses, phone numbers (stored as text so leading zeros are preserved: \`08031234567\`). |
| **Long Text (Memo)** | Extensive text up to 65,536+ characters. | Doctor's medical notes, disciplinary case remarks. |
| **Number / Integer** | Quantitative numerical data used for mathematical calculations. | Number of students enrolled, quantities in warehouse. |
| **Date / Time** | Calendar dates and chronological timestamps. | \`DateOfBirth\` (\`15/04/2009\`), \`EnrollmentDate\`. |
| **Currency** | Monetary values with fixed decimal precision; prevents rounding errors. | Tuition fees (\`₦ 75,000.00\`), employee salary. |
| **AutoNumber** | System-generated unique sequential integer incrementing automatically. | Transaction invoice IDs, student auto-indexing. |
| **Yes / No (Boolean)** | Binary logical state storing only one of two values: \`True/False\` or \`1/0\`. | \`IsBoardingStudent\` (\`Yes\`), \`FeesPaid\` (\`No\`). |

---

### 3. Field Properties & Data Validation Rules

**Validation Rules** prevent human clerical errors at the moment of data entry:
1. **Field Size**: Restricts maximum characters (e.g. setting state code to \`2\` characters for \`LA\`, \`KD\`, \`OG\`).
2. **Required Property**: Setting \`Required = Yes\` ensures a field cannot be left blank (Not Null).
3. **Validation Rule**: A logical expression enforcing valid data entry boundaries:
   - Example 1: \`Validation Rule: >= 0 AND <= 100\` (Restricts exam marks to range 0–100).
   - Example 2: \`Validation Rule: < Date()\` (Ensures date of birth cannot be in the future).
4. **Validation Text**: The error alert message displayed to the user when they violate the validation rule (e.g. *"Error: Exam mark must be between 0 and 100!"*).
5. **Input Mask**: Enforces a strict formatting pattern for structured entries (e.g. Phone Number mask: \`\(9999\)\ 999-9999\`).

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Why should telephone numbers (such as \`08031234567\`) be stored as Short Text rather than a Number data type in a database?
  - A) Phone numbers are too long for integer storage
  - B) Number data types automatically drop the crucial leading zero (\`8031234567\`) and phone numbers are never mathematically calculated (*Correct*)
  - C) Text data types consume zero disk space
  - D) Text data types encrypt phone numbers automatically
- **Question 2**: Which field property in Microsoft Access ensures that a user cannot save a record with an empty \`LastName\` field?
  - A) Default Value
  - B) Required = Yes (*Correct — enforces Not Null constraint*)
  - C) Input Mask
  - D) Indexed = No`,
    keyTakeaways: [
      'Design View builds the table schema; Datasheet View allows live record entry and editing.',
      'Phone numbers must be stored as Short Text to preserve leading zeros.',
      'Validation Rules prevent user entry errors by setting logical boundaries (e.g. marks between 0 and 100).'
    ],
    associatedQuizId: 'waec-dp-ss1-q8'
  },

  // ==========================================
  // WEEK 9: QUERIES, FORMS, AND REPORTS
  // ==========================================
  {
    id: 'dp-ss1-term2-week9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Database Queries, SQL Syntax, Forms & Reports',
    subtopics: [
      'The Purpose of Database Queries (Information Extraction)',
      'Structured Query Language (SQL): SELECT, FROM, WHERE & ORDER BY',
      'Database Forms for Controlled User Data Entry',
      'Professional Reports for Printable Management Summaries'
    ],
    readingTimeMinutes: 8,
    summary: 'Write structured SQL queries to filter records, build user-friendly input forms, and compile professional formatted printable reports for decision makers.',
    contentMarkdown: `### 1. The Four Core Objects in an Access/SQL Database

A complete Database Management System consists of four coordinated objects:
1. **Tables**: The primary repositories where data is persistently stored in rows and columns.
2. **Queries**: Search questions used to filter, calculate, sort, and extract specific subsets of records from one or more tables.
3. **Forms**: User-friendly interactive graphical screens designed for safe, guided data entry and navigation.
4. **Reports**: Formatted, styled, printable summaries structured for paper printing or export to PDF for executives.

---

### 2. Structured Query Language (SQL) Fundamentals

**SQL** is the international standard declarative programming language used to communicate with and retrieve records from relational databases:

\`\`\`sql
SELECT column1, column2
FROM TableName
WHERE condition
ORDER BY column1 ASC;
\`\`\`

#### Core SQL Keywords:
- **\`SELECT\`**: Specifies which fields/columns to display in the result output.
- **\`FROM\`**: Specifies which database table(s) to query.
- **\`WHERE\`**: Filters records based on logical criteria (records matching the condition are returned).
- **\`ORDER BY\`**: Sorts the output in Ascending (\`ASC\`) or Descending (\`DESC\`) order.

#### Practical Nigerian Secondary School Query Example:
*Problem*: Retrieve the first name, last name, and scores of all SS 1 students who scored 70 marks and above in Chemistry, sorted from highest score to lowest:

\`\`\`sql
SELECT FirstName, LastName, ExamScore
FROM EXAM_RESULTS
WHERE ClassLevel = 'SS 1' AND SubjectName = 'Chemistry' AND ExamScore >= 70
ORDER BY ExamScore DESC;
\`\`\`

---

### 3. Forms vs. Reports

| Characteristic Metric | Database Form (Input Interface) | Database Report (Output Summary) |
| :--- | :--- | :--- |
| **Primary Purpose** | **Data Entry & Editing** on screen | **Data Presentation & Printing** on paper/PDF |
| **Interactivity** | Highly interactive (buttons, drop-down combo boxes, text input boxes) | Static, read-only; cannot be used to edit underlying table data |
| **Target Audience** | Data entry clerks and computer operators | School principals, board of governors, auditors, managers |
| **Calculation Hierarchy** | Computes current active record values | Groups data with headers, sub-totals, and grand totals |

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which SQL clause is used to filter records based on a specified condition?
  - A) \`SELECT\`
  - B) \`FROM\`
  - C) \`WHERE\` (*Correct — filters rows matching criteria*)
  - D) \`GROUP\`
- **Question 2**: Which database object is formatted specifically for printing hard-copy student report cards or annual financial audits?
  - A) Table
  - B) Query
  - C) Form
  - D) Report (*Correct — formatted printable document*)`,
    keyTakeaways: [
      'The 4 core database objects are Tables (storage), Queries (extraction), Forms (input), and Reports (output).',
      'SQL queries use SELECT (fields), FROM (table), WHERE (criteria), and ORDER BY (sorting).',
      'Forms are interactive input screens; Reports are static, grouped printable documents for management.'
    ],
    associatedQuizId: 'waec-dp-ss1-q9'
  },

  // ==========================================
  // WEEK 10: COMPUTER ETHICS & CYBER LAWS
  // ==========================================
  {
    id: 'dp-ss1-term2-week10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Computer Ethics, Cybercrimes in Nigeria & Cyber Law',
    subtopics: [
      'Principles of Computer Ethics & Netiquette',
      'Cybercrimes Taxonomy: Identity Theft, Advance Fee Fraud (419), Hacking',
      'The Cybercrime (Prohibition, Prevention, etc.) Act of Nigeria (2015)',
      'Software Piracy, Copyright Laws & Intellectual Property Rights'
    ],
    readingTimeMinutes: 7,
    summary: 'Evaluate moral and legal codes in computing, analyze cybercrime manifestations under Nigerian law, and respect software copyright and intellectual property.',
    contentMarkdown: `### 1. Computer Ethics & Netiquette

**Computer Ethics** is the set of moral principles and professional standards that govern the responsible, legal, and respectful use of computers, software, and digital networks:
- **Netiquette (Network Etiquette)**: Polite online behavior—avoiding cyberbullying, refraining from typing in ALL CAPS (which signifies shouting), respecting others' digital privacy, and not forwarding unverified fake news.

---

### 2. Major Cybercrimes in Nigeria

| Cybercrime Class | Modus Operandi & Digital Mechanism | Nigerian Legal Violation |
| :--- | :--- | :--- |
| **Advance Fee Fraud (Section 419)** | Deceptive emails or messages promising massive wealth or inheritance in exchange for an upfront processing fee. | Violation of Advance Fee Fraud and Cybercrime Acts; carries severe prison sentences. |
| **Phishing** | Creating fraudulent clone websites (e.g. fake bank login portals) to dupe victims into typing passwords and PINs. | Cyber fraud and identity theft. |
| **Identity Theft** | Stealing another citizen's personal credentials (NIN, BVN, credit card, biometric data) to commit fraud. | Impersonation and financial fraud under Nigerian law. |
| **Hacking / Unauthorized Access** | Breaking through digital firewalls and authentication barriers to access private database servers without permission. | Cyber espionage and electronic trespass. |
| **Cyberstalking & Harassment** | Using social media and messaging apps to systematically threaten, intimidate, or blackmail an individual. | Subject to heavy fines and imprisonment under Section 24 of the Cybercrime Act. |

---

### 3. The Cybercrime Act of Nigeria (2015)

Signed into law to establish an institutional framework for the prohibition, prevention, detection, prosecution, and punishment of electronic crimes in Nigeria:
- Criminalizes attacks on **Critical National Information Infrastructure (CNII)** like banking systems, electrical grids, and telecommunication networks.
- Mandates banks to verify BVN identities and report cyber attacks to CERT (Computer Emergency Response Team).
- Prescribes penalties ranging from heavy fines to life imprisonment for cyber offenses endangering national security.

---

### 4. Software Piracy & Copyright Laws

- **Software Piracy**: The illegal, unauthorized copying, distribution, downloading, sharing, or commercial resale of copyrighted software programs without purchasing legitimate developer licenses.
- **Intellectual Property Protection**: Software developers invest years of engineering and capital into authoring code; using keygens, cracks, or unauthorized copies breaches the Nigerian Copyright Act.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: The fraudulent practice of sending deceptive emails that mimic legitimate commercial banks to steal customers' online login details is known as:
  - A) Cyberstalking
  - B) Phishing (*Correct — identity deception trap*)
  - C) Software piracy
  - D) Plagiarism
- **Question 2**: The unauthorized copying, commercial reproduction, and distribution of licensed computer software without purchasing a genuine license is termed:
  - A) Software engineering
  - B) Software piracy (*Correct — copyright infringement*)
  - C) Open source distribution
  - D) Cloud computing`,
    keyTakeaways: [
      'Netiquette establishes courteous digital behavior and respect for online privacy.',
      'Cybercrimes in Nigeria include phishing, identity theft, advance fee fraud (419), and cyberstalking.',
      'The Cybercrime Act of 2015 establishes legal penalties and prison sentences for digital offenses in Nigeria.'
    ],
    associatedQuizId: 'waec-dp-ss1-q10'
  },

  // ==========================================
  // WEEK 11: MAINTENANCE & DISASTER RECOVERY
  // ==========================================
  {
    id: 'dp-ss1-term2-week11',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Computer Maintenance, Data Backup & Disaster Recovery',
    subtopics: [
      'Preventative Hardware Maintenance: Dusting, Cooling & Cable Care',
      'Software Maintenance: Disk Defragmentation & Temp File Cleanup',
      'The 3-2-1 Backup Strategy & Storage Hierarchy',
      'Disaster Recovery Planning for Agricultural and Commercial Enterprises'
    ],
    readingTimeMinutes: 7,
    summary: 'Implement routine hardware and software maintenance schedules, master the universal 3-2-1 backup rule, and formulate disaster recovery plans.',
    contentMarkdown: `### 1. Hardware vs. Software Preventative Maintenance

- **Hardware Preventative Maintenance**:
  - Regular cleaning using an anti-static blower to remove insulating dust carpets from motherboards, CPU heat sinks, and power supply fans.
  - Ensuring computers operate in well-ventilated, air-conditioned rooms to prevent thermal throttling.
  - Periodic inspection of electrical cables and grounding wires to prevent fire sparks.
- **Software Preventative Maintenance**:
  - Running **Disk Defragmentation** (on traditional HDDs) to reorganize fragmented file clusters into contiguous sectors, accelerating read/write speeds.
  - Clearing temporary Internet caches, cookies, and system temp files (\`%temp%\`) to recover storage capacity.
  - Keeping operating systems, device drivers, and security patches updated.

---

### 2. The Storage & Backup Hierarchy

[Diagram: storage-backup-hierarchy]

#### The Universal 3-2-1 Data Backup Rule:
To guarantee that data can survive hardware failures, ransomware attacks, fires, or theft:
- Keep at least **3 total copies** of all important data records (1 primary working copy + 2 backup copies).
- Store backups on **2 different storage media types** (e.g. Internal SSD + External Optical/NAS drive).
- Keep at least **1 copy completely off-site** in a remote physical location or secure **Cloud storage facility** (e.g. Google Cloud, AWS S3, Microsoft OneDrive).

---

### 3. Disaster Recovery Planning

A **Disaster Recovery Plan (DRP)** is a documented, structured protocol detailing how an enterprise will restore critical digital systems and resume operations following an unexpected catastrophic disaster (such as flood, fire, server room theft, or severe cyberattack):
- **Data Mirroring**: Real-time replication of active transactions to a secondary remote server.
- **Off-Site Vaulting**: Storing encrypted backup tapes or disk cartridges in fireproof vaults miles away from the primary data center.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: According to the universal 3-2-1 backup strategy, how many backup copies must be stored off-site away from the primary business premises?
  - A) None
  - B) At least 1 copy (*Correct — 1 off-site copy protects against local fire/theft*)
  - C) Exactly 2 copies
  - D) 3 copies
- **Question 2**: Which software maintenance utility reorganizes scattered, fragmented file clusters on a hard disk drive into contiguous sectors to improve read performance?
  - A) Antivirus scanner
  - B) Disk Defragmenter (*Correct*)
  - C) File compression tool
  - D) System uninstaller`,
    keyTakeaways: [
      'Preventative maintenance includes dust removal, thermal management, and disk defragmentation.',
      'The 3-2-1 backup rule requires 3 copies on 2 different media with 1 stored off-site or in the cloud.',
      'A Disaster Recovery Plan ensures business continuity after catastrophic hardware failure or cyberattacks.'
    ],
    associatedQuizId: 'waec-dp-ss1-q11'
  },

  // ==========================================
  // WEEK 12: COMPREHENSIVE REVISION & DRILLS
  // ==========================================
  {
    id: 'dp-ss1-term2-week12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Comprehensive 2nd Term Data Processing Review & WAEC Drills',
    subtopics: [
      'Integrated Concept Map: Security, Spreadsheets & Database Architecture',
      'Diagnostic Spreadsheet Formula & Function Evaluation Drills',
      'SQL Query Writing & Database Table Relationship Problem Sets',
      'Common WAEC Examiner Traps & Practical Exam Guidelines'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate 12 weeks of SS 1 Data Processing with challenging practical past WAEC and NECO examination drills with detailed step-by-step solutions.',
    contentMarkdown: `### 1. Integrated 2nd Term Data Processing Master Review Map

This term covered the essential core disciplines of modern enterprise information technology:
1. **Data Security & Malware Defense**: Mitigating digital threats through firewalls, passwords, encryption, and antivirus scanning engines.
2. **Spreadsheet Engineering**: Grid coordinates, relative vs. absolute referencing (\`$A$1\`), operator precedence, statistical formulas (\`SUM\`, \`AVERAGE\`), and conditional \`IF\` logic.
3. **Relational Database Systems (RDBMS)**: The data hierarchy, primary and foreign keys, referential integrity, and SQL query language (\`SELECT ... FROM ... WHERE\`).
4. **Computer Ethics & Law**: Responsible netiquette, the Nigerian Cybercrime Act (2015), and software copyright enforcement.
5. **System Longevity**: Preventative maintenance and the universal 3-2-1 backup discipline.

---

### 2. High-Yield Multi-Topic WAEC Practical Drills

#### Drill 1: Spreadsheet Formula & Absolute Referencing
**Scenario**: Cell \`A1\` contains the Nigerian VAT tax rate ($7.5\\% = 0.075$). Cells \`B2:B5\` contain invoice sales amounts for four clients: \`B2 = 10,000\`, \`B3 = 20,000\`, \`B4 = 30,000\`, \`B5 = 40,000\`.
1. Write the exact formula in cell \`C2\` to compute the VAT amount for client 1, ensuring that the formula can be dragged down safely to cell \`C5\`.
2. Write the formula in cell \`C6\` to compute the total VAT collected across all four clients.

- **Solution 1**:
  $$= \\text{B2} \\times \\mathbf{\\$A\\$1}$$
  *Explanation: An absolute reference \`\$A\$1\` must be used so that when the formula is copied down to row 5, the tax cell remains frozen at \`A1\` while the client sales amount adjusts relatively (\`B3\`, \`B4\`, \`B5\`).*
- **Solution 2**:
  $$= \\mathbf{SUM(C2:C5)}$$

---

#### Drill 2: SQL Query Formulation
**Scenario**: A database table named \`INVENTORY\` contains fields: \`ItemCode\`, \`ItemName\`, \`Category\`, \`UnitPrice\`, \`QuantityInStock\`.
Write the standard SQL query statement to display the \`ItemName\` and \`UnitPrice\` of all items in the \`'Stationery'\` category that have a \`UnitPrice\` greater than \`₦ 1,500\`, sorted alphabetically by \`ItemName\`.

- **SQL Query Solution**:
\`\`\`sql
SELECT ItemName, UnitPrice
FROM INVENTORY
WHERE Category = 'Stationery' AND UnitPrice > 1500
ORDER BY ItemName ASC;
\`\`\`

---

### 3. Top 5 Examiner Pitfalls to Avoid in WAEC Data Processing

| Common Student Pitfall | Correct WAEC Standard & Examination Protocol |
| :--- | :--- |
| **Omitting the Equal Sign in Formulas** | Every spreadsheet formula MUST start with \`=\`. Writing \`SUM(A1:B10)\` instead of \`=SUM(A1:B10)\` earns zero marks in WAEC exams. |
| **Confusing Primary and Foreign Keys** | A **Primary Key** uniquely identifies rows in its *own* table; a **Foreign Key** in a child table points back to the primary key of the *parent* table. |
| **Using Arithmetic Operators for Functions** | Never write \`=SUM(A1 + A2)\`; write either \`=A1 + A2\` or \`=SUM(A1:A2)\`. Redundant operators inside \`SUM\` reveal poor computing literacy. |
| **Misunderstanding 3-2-1 Backup Rule** | Remember: 3 copies, 2 different media formats, and **1 off-site or cloud copy** to withstand local physical destruction. |
| **Storing Numeric Codes as Numbers** | Phone numbers, NIN, and bank account numbers must be declared as **Short Text** in databases to preserve vital leading zeros. |

---

### 4. Practice Checkpoint Questions

- **Question 1**: Which spreadsheet error code is displayed when a formula attempts to divide a numeric value by an empty cell or zero?
  - A) \`#####\`
  - B) \`#DIV/0!\` (*Correct — division by zero error*)
  - C) \`#VALUE!\`
  - D) \`#NAME?\`
- **Question 2**: In SQL, what keyword is used to arrange retrieved records in descending order?
  - A) \`SORT\`
  - B) \`ORDER BY ... DESC\` (*Correct*)
  - C) \`DOWN\`
  - D) \`REVERSE\``,
    keyTakeaways: [
      'Spreadsheet formulas must start with =; absolute references lock coordinates with $.',
      'SQL queries filter with WHERE and sort with ORDER BY.',
      'The 3-2-1 backup rule guarantees data survival across hardware, environmental, and cyber disasters.'
    ],
    associatedQuizId: 'waec-dp-ss1-q12'
  }
];
