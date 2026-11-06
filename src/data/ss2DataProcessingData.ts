import { CurriculumTopic } from '../types';

export const SS2_DATA_PROCESSING_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: DATA MODELING & ENTITY-RELATIONSHIP (ER) DIAGRAMS
  // ==========================================
  {
    id: 'dp-ss2-term2-week1',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Data Modeling & Entity-Relationship Diagrams (ERD)',
    subtopics: [
      'Concept of Data Modeling in System Analysis and Database Design',
      'Building Blocks of ERDs: Entities, Attributes, and Relationships',
      'Entity Types (Strong vs. Weak Entities) and Attribute Classifications',
      'Cardinality and Modality: One-to-One (1:1), One-to-Many (1:N), and Many-to-Many (M:N)'
    ],
    readingTimeMinutes: 8,
    summary: 'Master the principles of conceptual database modeling, construct Entity-Relationship Diagrams (ERDs), differentiate attribute types, and evaluate relationship cardinalities in school and commercial systems.',
    contentMarkdown: `### 1. What is Data Modeling?

In computerized information systems, **data modeling** is the formal process of creating a visual and conceptual representation of either a whole information system or parts of it to communicate connections between data points and structures.

The model acts as an architectural blueprint before physical tables are constructed inside a Relational Database Management System (RDBMS) like MySQL, PostgreSQL, or Microsoft Access.

### 2. Core Components of Entity-Relationship Diagrams (ERD)

[Diagram: erd-data-modeling]

An Entity-Relationship Diagram represents three fundamental constructs:

| Construct | Definition | Real-World Example | Standard ERD Symbol |
| :--- | :--- | :--- | :--- |
| **Entity** | Any distinct real-world person, place, object, or event about which data is captured. | Student, Subject, WAEC Registration | Rectangle |
| **Attribute** | A descriptive property, characteristic, or quality that qualifies an entity. | StudentID, Surname, DateOfBirth | Oval / Ellipse |
| **Relationship** | An association or meaningful business connection linking two or more entities. | Student *Enrolls in* Subject | Diamond |

### 3. Classification of Attributes

Attributes provide structural granularity to database entities. In WAEC examination questions, attributes are classified into four key categories:

1. **Simple (Atomic) vs. Composite Attributes:**
   - **Simple:** Cannot be divided into smaller sub-components (e.g. \`Age\`, \`Gender\`, \`Score\`).
   - **Composite:** Can be logically broken into sub-attributes (e.g. \`FullName\` divided into \`FirstName\`, \`MiddleName\`, and \`Surname\`; \`Address\` divided into \`HouseNo\`, \`Street\`, \`LGA\`, and \`State\`).

2. **Single-Valued vs. Multi-Valued Attributes:**
   - **Single-Valued:** Holds exactly one value per entity instance (e.g. \`NIN\` - National Identification Number).
   - **Multi-Valued:** Can hold multiple discrete values for a single entity (e.g. \`PhoneNumbers\`, \`Hobbies\`). In ER diagrams, multi-valued attributes are symbolized by double ellipses.

3. **Stored vs. Derived Attributes:**
   - **Stored:** Physically persisted in table storage (e.g. \`DateOfBirth\`).
   - **Derived:** Computed dynamically on demand from stored attributes (e.g. \`CurrentAge = CurrentYear - YearOfBirth\`). Symbolized by a dashed ellipse.

### 4. Cardinality Ratios in School Database Systems

Cardinality specifies the maximum number of entity instances that can participate in a relationship:

| Cardinality Ratio | Notation | Practical Nigerian Educational Example |
| :--- | :--- | :--- |
| **One-to-One** | 1 : 1 | One Student possesses exactly one unique JAMB Registration Profile Code. |
| **One-to-Many** | 1 : N | One Secondary School Department employs multiple Subject Teachers. |
| **Many-to-Many** | M : N | Many SS 2 Students enroll in Many WAEC Subjects (requires an associative table). |

> **WAEC Practical Tip:** A Many-to-Many ($M:N$) relationship cannot be directly implemented in a normalized relational database. It must be resolved into two One-to-Many ($1:N$) relationships using an intermediate intersection table (also known as a junction or associative entity).`,
    keyTakeaways: [
      'Data modeling bridges business logic and physical database table architecture.',
      'Entities are represented by rectangles, attributes by ellipses, and relationships by diamonds.',
      'Derived attributes are computed dynamically and should never be stored redundantly.',
      'Many-to-Many relationships must be resolved into two 1:N relationships via a junction table.'
    ],
    associatedQuizId: 'dp-ss2-erd-quiz'
  },

  // ==========================================
  // WEEK 2: RELATIONAL DATABASE CONCEPTS & KEYS
  // ==========================================
  {
    id: 'dp-ss2-term2-week2',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Relational Database Concepts, Structure & Key Constraints',
    subtopics: [
      'Relational Model Terminology: Relations, Tuples, Attributes, and Domains',
      'Characteristics of Relational Tables and Integrity Constraints',
      'Database Keys: Super Keys, Candidate Keys, Primary Keys, Alternate Keys, and Foreign Keys',
      'Entity Integrity and Referential Integrity Rules'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze the relational database model, examine formal mathematical terminology alongside practical table structures, and master database keys and integrity rules.',
    contentMarkdown: `### 1. Formal Relational Terminology vs. Everyday Database Terms

The relational model, formulated by Dr. E.F. Codd in 1970, uses precise mathematical concepts that map directly to standard database table components:

| Formal Relational Term | Commercial RDBMS Term | Everyday Spreadsheet Equivalent |
| :--- | :--- | :--- |
| **Relation** | Table | Sheet / Grid |
| **Tuple** | Row / Record | Horizontal Entry line |
| **Attribute** | Column / Field | Vertical Column Header |
| **Domain** | Data Type & Range Constraint | Permissible column values (e.g. 0 to 100) |
| **Degree** | Field Count | Total number of columns in the table |
| **Cardinality** | Record Count | Total number of rows/tuples in the table |

### 2. Hierarchy of Database Keys

Keys are attribute sets that enforce uniqueness, speed up indexing, and build relationships across tables:

| Key Type | Formal Definition | Example in School Portal |
| :--- | :--- | :--- |
| **Super Key** | Any set of one or more attributes that uniquely identifies a row in a table. | {StudentID}, {StudentID, Email}, {NIN, Phone} |
| **Candidate Key** | A minimal Super Key with zero redundant attributes. | StudentID alone, or NIN alone |
| **Primary Key (PK)** | The specific Candidate Key chosen by the database designer as the principal unique identifier. | \`StudentID\` (e.g. \`STU/2026/0491\`) |
| **Alternate Key** | Candidate keys that were not chosen as the Primary Key. | \`NIN\` or \`EmailAddress\` |
| **Foreign Key (FK)** | An attribute in one table whose values must match the Primary Key of another parent table. | \`ClassID\` inside the \`STUDENTS\` table linking to \`CLASSES\` |
| **Composite Key** | A primary key composed of two or more attributes combined to guarantee uniqueness. | {\`StudentID\`, \`SubjectCode\`} in an Exam Results table |

### 3. Fundamental Integrity Rules in RDBMS

To prevent corrupt, dangling, or contradictory records, every relational engine enforces two strict integrity constraints:

1. **Entity Integrity Constraint:**
   - No primary key component can accept a \`NULL\` (blank or unknown) value.
   - *Rationale:* If a primary key was null, the row could not be uniquely addressed or indexed.

2. **Referential Integrity Constraint:**
   - A foreign key value in a child table must either match an existing valid primary key value in the referenced parent table, or be explicitly \`NULL\`.
   - *Rationale:* Prevents "orphan records" (e.g. assigning a student to a ClassID that does not exist in the School Classes directory).`,
    keyTakeaways: [
      'A table is a Relation, a row is a Tuple, and a column is an Attribute.',
      'The Degree of a relation is its number of columns; Cardinality is its number of rows.',
      'A Candidate Key is a minimal super key; the chosen candidate key becomes the Primary Key.',
      'Entity Integrity forbids NULL values in primary keys; Referential Integrity prevents orphan records.'
    ],
    associatedQuizId: 'dp-ss2-relational-keys-quiz'
  },

  // ==========================================
  // WEEK 3: FILE ORGANIZATION & PROCESSING METHODS
  // ==========================================
  {
    id: 'dp-ss2-term2-week3',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'File Organization & Record Access Methods',
    subtopics: [
      'Concept of Computer File Organization and Data Hierarchy',
      'Sequential File Organization: Structure, Merits, Demerits, and Applications',
      'Random (Direct) File Organization and Hashing Algorithms',
      'Indexed-Sequential File Access (ISAM) and Comparative Trade-offs'
    ],
    readingTimeMinutes: 7,
    summary: 'Compare sequential, random/direct, and indexed-sequential file organization structures, analyze storage media suitability, and assess processing latency.',
    contentMarkdown: `### 1. The Computer Data Hierarchy

In data storage architecture, information is organized in an escalating hierarchy of logical abstraction:

\`Bit (0/1) → Byte/Character → Field (Column) → Record (Row) → File (Table) → Database\`

**File Organization** refers to the physical arrangement of records on a secondary storage medium (magnetic tape, hard disk, SSD) and the corresponding software strategy used to retrieve them.

### 2. Comparative Analysis of File Organization Strategies

| Feature | Sequential File Organization | Random / Direct Access | Indexed-Sequential (ISAM) |
| :--- | :--- | :--- | :--- |
| **Storage Order** | Records saved in strict serial key order ($K_1, K_2, K_3...$). | Records stored using a mathematical hashing function $h(K)$. | Records stored sequentially with a searchable separate index file. |
| **Hardware Medium** | Magnetic tape, Serial hard disk files. | Hard Disk Drive (HDD), Solid State Drive (SSD). | High-speed magnetic/flash disk storage. |
| **Access Speed** | Very slow for ad-hoc search; fast for 100% batch sweeps. | Extremely fast direct lookup ($O(1)$ constant time). | Fast for both sequential generation and individual queries. |
| **Insertion Penalty** | Requires creating a new sorted file version. | Requires collision handling techniques (open addressing). | May require index rebalancing ($B$-Tree node splits). |
| **Primary Use Case** | Monthly school payroll, Electricity bill printing. | Bank ATM balance queries, JAMB UTME logins. | Supermarket inventory, Student academic transcripts. |

### 3. Hashing in Direct File Access

In direct file access, the computer does not scan records line by line. Instead, it passes the search key through a **Hashing Algorithm**:

$$\\text{Physical Disk Block Address} = \\text{HashFunction}(\\text{RecordKey})$$

- **Example (Division-Remainder Hashing):** If records are keyed by student ID $2415$ and the storage partition has $100$ sectors:
  $$\\text{Disk Address} = 2415 \\pmod{100} = 15$$
  The RDBMS jumps directly to Sector $15$ in a single disk read operation.
- **Hash Collisions:** When two distinct keys produce the identical sector address, the operating system uses overflow chaining or linear probing to store the duplicate in a contiguous bucket.`,
    keyTakeaways: [
      'Sequential access requires reading all preceding records to reach record N.',
      'Direct access uses hashing functions to compute storage addresses instantly.',
      'Indexed-Sequential Access combines sequential batch efficiency with index-driven direct queries.',
      'Sequential files are ideal for batch payroll, while direct access is critical for real-time banking.'
    ],
    associatedQuizId: 'dp-ss2-file-org-quiz'
  },

  // ==========================================
  // WEEK 4: DATABASE MANAGEMENT SYSTEMS (DBMS) ARCHITECTURE
  // ==========================================
  {
    id: 'dp-ss2-term2-week4',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Database Management Systems (DBMS) Architecture & Components',
    subtopics: [
      'Definition of DBMS and Historical Evolution from Flat File Systems',
      'The ANSI-SPARC Three-Level Database Architecture (External, Conceptual, Internal)',
      'Data Independence: Logical vs. Physical Data Independence',
      'Core Engine Components: Data Dictionary, Query Processor, and Storage Engine'
    ],
    readingTimeMinutes: 7,
    summary: 'Examine database management systems, analyze the ANSI-SPARC 3-tier architecture, distinguish logical from physical data independence, and master data dictionaries.',
    contentMarkdown: `### 1. What is a DBMS?

A **Database Management System (DBMS)** is specialized system software that facilitates the creation, maintenance, querying, and administrative control of computerized databases.

Prior to DBMS technology, organizations used decentralized **Flat File Systems**, which suffered from severe shortcomings:
- Excessive data redundancy (same student address typed in bursary, hostel, and clinic files).
- Data inconsistency (updating a phone number in one department left outdated copies in others).
- Rigid program-data dependence (modifying a table column broke all application source code).

### 2. The ANSI-SPARC Three-Level Database Architecture

To isolate user applications from physical storage hardware, the database community established the three-tier ANSI-SPARC architecture:

| Architectural Tier | Alternative Name | Target User | Description & Scope |
| :--- | :--- | :--- | :--- |
| **1. External Level** | View Level | End Users, School Bursar, Student Portal | Custom user perspectives that display only relevant subsets of data while hiding sensitive fields (e.g. teachers see exam scores but cannot see salary records). |
| **2. Conceptual Level** | Logical Level | Database Administrator (DBA), Systems Analyst | Complete structural definition of what data is stored, entity relationships, integrity constraints, and business logic across the enterprise. |
| **3. Internal Level** | Physical Level | Systems Programmer, Hardware Storage OS | How data is physically stored on SSD/HDD sectors, indexing mechanisms, data compression, and byte allocation. |

### 3. Data Independence

Data independence is the architectural capacity to alter the schema at one level of the database system without requiring alterations at adjacent higher levels:

1. **Logical Data Independence:**
   - The capacity to modify the **Conceptual Schema** (e.g. adding a new field \`MotherMaidenName\` or creating an extra table) without altering existing **External Views** or rewriting front-end user applications.
2. **Physical Data Independence:**
   - The capacity to modify the **Internal Schema** (e.g. upgrading from HDD to NVMe SSD, switching RAID arrays, or changing file indexing algorithms) without altering the **Conceptual Schema** or logical table definitions.

### 4. The Data Dictionary (Metadata Repository)

The **Data Dictionary** (or System Catalog) is the internal database containing "data about data" (**metadata**). It holds:
- Exact names, data types, and byte lengths of all fields.
- Primary key, foreign key, and unique constraint definitions.
- User permission matrices and access rights.`,
    keyTakeaways: [
      'DBMS solves data redundancy, inconsistency, and program-data dependence found in flat files.',
      'The ANSI-SPARC architecture consists of External (Views), Conceptual (Logical), and Internal (Physical) levels.',
      'Logical data independence allows conceptual changes without breaking user views.',
      'The data dictionary stores system metadata detailing table schemas, constraints, and security permissions.'
    ],
    associatedQuizId: 'dp-ss2-dbms-arch-quiz'
  },

  // ==========================================
  // WEEK 5: DATABASE CREATION & SQL QUERIES
  // ==========================================
  {
    id: 'dp-ss2-term2-week5',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Database Creation & SQL Commands: DDL vs. DML',
    subtopics: [
      'Introduction to Structured Query Language (SQL) Standards',
      'Data Definition Language (DDL): CREATE, ALTER, and DROP Commands',
      'Data Manipulation Language (DML): INSERT, SELECT, UPDATE, and DELETE Commands',
      'Filtering, Aggregation, and Sorting: WHERE, ORDER BY, GROUP BY, and LIKE'
    ],
    readingTimeMinutes: 9,
    summary: 'Write practical SQL statements, differentiate DDL schema commands from DML data commands, and construct filtering and aggregation queries for examination mastery.',
    contentMarkdown: `### 1. Overview of Structured Query Language (SQL)

**SQL (Structured Query Language)** is the international standard declarative language used to define, populate, manipulate, and query relational databases.

SQL commands are divided into distinct functional sub-languages:
- **DDL (Data Definition Language):** Defines, modifies, and destroys schema structures.
- **DML (Data Manipulation Language):** Queries, inserts, modifies, and purges data records.
- **DCL (Data Control Language):** Manages permissions (\`GRANT\`, \`REVOKE\`).

### 2. DDL Commands in Action (Schema Building)

\`\`\`sql
-- 1. Create the Students Table
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Surname VARCHAR(50) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')),
    ClassLevel VARCHAR(10) DEFAULT 'SS 2',
    Age INT CHECK (Age >= 10)
);

-- 2. Alter Table to add StateOfOrigin
ALTER TABLE Students ADD StateOfOrigin VARCHAR(30);

-- 3. Drop Table (Deletes structure and all data)
-- DROP TABLE Students;
\`\`\`

### 3. DML Commands in Action (Data Manipulation)

\`\`\`sql
-- Insert a new student record
INSERT INTO Students (StudentID, Surname, FirstName, Gender, ClassLevel, Age, StateOfOrigin)
VALUES (101, 'Adeyemi', 'Chinedu', 'M', 'SS 2', 16, 'Enugu');

-- Update record
UPDATE Students
SET ClassLevel = 'SS 3'
WHERE StudentID = 101;

-- Delete record
DELETE FROM Students
WHERE StudentID = 101;
\`\`\`

### 4. Querying and Filtering Data (SELECT)

| Query Requirement | SQL Syntax Example |
| :--- | :--- |
| **All Records** | \`SELECT * FROM Students;\` |
| **Column Projection** | \`SELECT Surname, ClassLevel FROM Students;\` |
| **Conditional Filter** | \`SELECT * FROM Students WHERE Age >= 16 AND Gender = 'F';\` |
| **Pattern Search (Wildcard)** | \`SELECT * FROM Students WHERE Surname LIKE 'O%';\` *(names starting with O)* |
| **Sorting** | \`SELECT * FROM Students ORDER BY Surname ASC;\` |
| **Aggregation (Count)** | \`SELECT COUNT(*) AS TotalStudents FROM Students WHERE ClassLevel = 'SS 2';\` |
| **Grouped Summary** | \`SELECT Gender, AVG(Age) FROM Students GROUP BY Gender;\` |`,
    keyTakeaways: [
      'DDL commands (CREATE, ALTER, DROP) manage table structure; DML (SELECT, INSERT, UPDATE, DELETE) manage records.',
      'The WHERE clause filters rows; ORDER BY sorts ascending (ASC) or descending (DESC).',
      'The wildcard % in a LIKE clause matches zero or more characters.',
      'Aggregate functions include COUNT(), SUM(), AVG(), MIN(), and MAX().'
    ],
    associatedQuizId: 'dp-ss2-sql-queries-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM CLINIC & DATABASE NORMALIZATION
  // ==========================================
  {
    id: 'dp-ss2-term2-week6',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Database Clinic: Normalization (1NF, 2NF, 3NF)',
    subtopics: [
      'Database Anomalies: Insertion, Deletion, and Update/Modification Anomalies',
      'Concept of Functional Dependency and Determinants ($X \\to Y$)',
      'Step-by-Step Normalization: Unnormalized Form (UNF) to First Normal Form (1NF)',
      'Second Normal Form (2NF) and Third Normal Form (3NF) Decompositions'
    ],
    readingTimeMinutes: 9,
    summary: 'Eliminate update anomalies and structural redundancy through normalization, resolve partial and transitive dependencies, and construct 1NF, 2NF, and 3NF tables.',
    contentMarkdown: `### 1. Why Normalize Databases?

**Normalization** is the systematic mathematical technique of decomposing complex, redundant tables into smaller, well-structured relations to eliminate **data anomalies**:

- **Update Anomaly:** Modifying a teacher's phone number requires updating 40 student rows. If one row is missed, data becomes contradictory.
- **Insertion Anomaly:** You cannot add a new subject to the database until at least one student registers for it.
- **Deletion Anomaly:** Deleting the only student enrolled in Agricultural Science unintentionally deletes the entire Agricultural Science department record from the system.

### 2. The Normalization Pipeline

[Diagram: database-normalization-pipeline]

### 3. Normal Form Progression

| Normal Form | Core Requirement | How to Achieve It |
| :--- | :--- | :--- |
| **Unnormalized (UNF)** | Table contains repeating groups or multi-valued fields. | Starting state of raw survey sheets or uncleaned spreadsheets. |
| **1st Normal Form (1NF)** | Each column contains only **atomic** (indivisible) values; each row has a primary key; no repeating groups. | Split multi-valued fields into distinct rows so each cell holds exactly one value. |
| **2nd Normal Form (2NF)** | Must be in 1NF **AND** contain **no partial functional dependencies**. | If a table has a composite key {A, B}, all non-key fields must depend on both A and B, not just A alone. Split into separate tables. |
| **3rd Normal Form (3NF)** | Must be in 2NF **AND** contain **no transitive dependencies**. | Non-key fields must not depend on other non-key fields ($X \\to Y$ and $Y \\to Z$). Move intermediate determinant $Y$ into its own table. |

### 4. The Golden Normalization Mnemonic

> **E.F. Codd's Maxim:** "Every non-key attribute must depend on the key (1NF), the whole key (2NF), and nothing but the key (3NF), so help me Codd."`,
    keyTakeaways: [
      'Normalization prevents insertion, deletion, and update anomalies.',
      '1NF requires atomic values and unique primary keys without repeating groups.',
      '2NF removes partial functional dependencies on composite keys.',
      '3NF eliminates transitive dependencies between non-key attributes.'
    ],
    associatedQuizId: 'dp-ss2-normalization-quiz'
  },

  // ==========================================
  // WEEK 7: WEB DESIGN & HTML BASICS
  // ==========================================
  {
    id: 'dp-ss2-term2-week7',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Web Design Packages & HyperText Markup Language (HTML) Architecture',
    subtopics: [
      'Overview of Web Design Packages (WYSIWYG Editors vs. Code Text Editors)',
      'Basic Architecture of an HTML5 Document: <!DOCTYPE>, <html>, <head>, and <body>',
      'Structural Tags: Headings (h1-h6), Paragraphs (p), Links (a), Images (img), and Lists',
      'HTML Table Construction and Form Input Elements'
    ],
    readingTimeMinutes: 7,
    summary: 'Construct semantic web pages using HTML, implement headings, hyperlinks, images, tables, and form inputs, and evaluate web design software tools.',
    contentMarkdown: `### 1. Web Authoring Tools

Web development utilizes two primary software categories:
1. **WYSIWYG (What You See Is What You Get) Editors:** Adobe Dreamweaver, Google Web Designer, WordPress visual builders. Allows visual layout without manual coding.
2. **Text / Code Editors:** VS Code, Sublime Text, Notepad++. The developer writes raw semantic markup and scripts directly.

### 2. Standard Anatomy of an HTML5 Web Document

Every valid HTML document conforms to a hierarchical tree structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Federal Government College Lagos - Portal</title>
</head>
<body>
    <h1>Welcome to Senior Secondary School 2</h1>
    <p>Data Processing teaches foundational computing, database architecture, and web design.</p>
    <a href="https://waecnigeria.org">Visit WAEC Official Website</a>
</body>
</html>
\`\`\`

### 3. Core HTML Tags and Attributes

| Category | Tag & Syntax | Description |
| :--- | :--- | :--- |
| **Headings** | \`<h1>Heading 1</h1>\` to \`<h6>Heading 6</h6>\` | \`<h1>\` is the largest, most significant title; \`<h6>\` is the smallest sub-heading. |
| **Paragraph** | \`<p>Text goes here</p>\` | Defines a block of body text with standard line spacing. |
| **Hyperlink** | \`<a href="url">Click Here</a>\` | Navigates to a target URL via the \`href\` (hypertext reference) attribute. |
| **Image** | \`<img src="logo.png" alt="School Logo" width="200">\` | Self-closing void tag; \`alt\` supplies accessibility text if image fails to load. |
| **Ordered List** | \`<ol><li>Item 1</li><li>Item 2</li></ol>\` | Numbered list ($1, 2, 3$). |
| **Unordered List**| \`<ul><li>Item A</li><li>Item B</li></ul>\` | Bulleted list. |

### 4. HTML Table Structure

Tables arrange tabular data on web portals:

\`\`\`html
<table border="1">
    <tr>
        <th>Subject</th>
        <th>Continuous Assessment</th>
        <th>Exam</th>
    </tr>
    <tr>
        <td>Data Processing</td>
        <td>28</td>
        <td>64</td>
    </tr>
</table>
\`\`\``,
    keyTakeaways: [
      'HTML (HyperText Markup Language) is the standard markup language for creating web pages.',
      'An HTML document consists of a <head> section (metadata) and a <body> section (visible content).',
      'The <a> tag creates hyperlinks; <img> embeds images using src and alt attributes.',
      'HTML tables are built with <table>, <tr> (row), <th> (header cell), and <td> (data cell).'
    ],
    associatedQuizId: 'dp-ss2-web-html-quiz'
  },

  // ==========================================
  // WEEK 8: COMPUTER VIRUSES, MALWARE & INTERNET SECURITY
  // ==========================================
  {
    id: 'dp-ss2-term2-week8',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Computer Viruses, Malware Classification & Information Security',
    subtopics: [
      'Definition of Computer Virus and Malware (Malicious Software)',
      'Classification of Malware: Viruses, Worms, Trojan Horses, Spyware, and Ransomware',
      'Mechanisms of Infection: USB Drives, Phishing Emails, Drive-by Downloads, and Pirated Software',
      'Preventive Security: Antivirus Suites, Firewalls, Signatures, and Heuristic Analysis'
    ],
    readingTimeMinutes: 7,
    summary: 'Classify malware types including worms, Trojans, and ransomware, evaluate attack vectors, and implement layered defense mechanisms with antivirus and firewalls.',
    contentMarkdown: `### 1. What is Malware?

**Malware (Malicious Software)** is any unauthorized program or code designed to disrupt, damage, exploit, or gain unauthorized access to computer systems, data, or networks.

A **Computer Virus** is specifically a self-replicating program that attaches itself to legitimate executable files or documents and executes when the infected host program is launched.

### 2. Major Malware Categories

| Malware Variant | Key Operational Mechanism | Distinctive Threat / Impact |
| :--- | :--- | :--- |
| **Computer Virus** | Attaches to host files (\`.exe\`, \`.docx\`); requires human execution. | Corrupts system files, deletes data, alters boot sectors. |
| **Worm** | Standalone program that replicates across local networks without host files or human intervention. | Consumes network bandwidth, degrades Internet speed, opens backdoors. |
| **Trojan Horse** | Disguises as a harmless, attractive utility (e.g. cracked game or PDF reader). | Silently opens unauthorized remote access for cyber attackers. |
| **Ransomware** | Encrypts victim's documents and databases using strong cryptography ($AES-256$). | Demands cryptocurrency ransom payment to release the decryption key. |
| **Spyware / Keylogger** | Silently records keystrokes, passwords, and browsing habits in the background. | Steals online banking PINs, email logins, and identity credentials. |

### 3. Primary Infection Vectors

- Uninspected Flash Drives and external storage media shared across public cybercafés.
- Phishing emails containing malicious invoice attachments or fraudulent banking links.
- Downloading "cracked" operating systems and pirated software from untrusted websites.
- Connecting to unprotected public Wi-Fi hotspots without encryption.

### 4. Defense Strategies: Antivirus & Firewalls

1. **Antivirus Software (e.g. Norton, Kaspersky, Windows Defender):**
   - **Signature-Based Scanning:** Compares file signatures against a live database of known malware patterns.
   - **Heuristic Analysis:** Monitors program behaviors in a virtual sandbox to detect zero-day unknown threats.
2. **Network Firewall:**
   - Hardware or software filter that inspects incoming and outgoing packet traffic against security rules, blocking unauthorized ports.`,
    keyTakeaways: [
      'Malware is the umbrella term for all harmful software; a virus requires a host file to execute.',
      'Worms propagate autonomously across computer networks without human action.',
      'Trojan horses disguise as legitimate tools to deliver hidden malicious payloads.',
      'Heuristic detection enables antivirus software to intercept newly engineered malware.'
    ],
    associatedQuizId: 'dp-ss2-malware-security-quiz'
  },

  // ==========================================
  // WEEK 9: COMPUTER MAINTENANCE & HARDWARE SERVICING
  // ==========================================
  {
    id: 'dp-ss2-term2-week9',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Computer Maintenance, Troubleshooting & Hardware Servicing',
    subtopics: [
      'Preventive Maintenance vs. Corrective Maintenance',
      'Environmental Hazards: Dust, Humidity, Heat, Power Surges, and Static Electricity (ESD)',
      'Hardware Servicing Routines: Blower Cleaning, Thermal Paste, and Cable Seating',
      'Software Maintenance: Disk Defragmentation, Cache Clearing, and System Restore'
    ],
    readingTimeMinutes: 7,
    summary: 'Distinguish preventive from corrective maintenance, mitigate environmental hazards, execute hardware cleaning procedures, and optimize operating system performance.',
    contentMarkdown: `### 1. Preventive vs. Corrective Maintenance

In computer lab administration, hardware longevity requires two complementary maintenance strategies:

| Maintenance Strategy | Operational Definition | Practical Example |
| :--- | :--- | :--- |
| **Preventive Maintenance** | Routine, scheduled actions performed proactively to prevent hardware failure and optimize performance. | Blowing dust from motherboards quarterly, running disk checks, replacing thermal paste. |
| **Corrective Maintenance** | Actions taken to diagnose, repair, or replace components *after* a malfunction or hardware crash has occurred. | Replacing a blown Power Supply Unit (PSU), reinstalling a crashed operating system. |

### 2. Environmental Hazards to Computers in the Tropics

1. **Excessive Heat:** Causes CPU thermal throttling, spontaneous restarts, and silicon degradation. (Mitigation: air conditioning, heat sinks, functional fans).
2. **Dust and Particulate Accumulation:** Clogs cooling fans, forms an insulating blanket over chips, and causes short circuits when humid. (Mitigation: anti-static blower, dust covers).
3. **Power Fluctuations (Surges and Spikes):** Common in developing power grids; fries capacitors on motherboards. (Mitigation: Uninterruptible Power Supply / UPS, surge protectors, voltage stabilizers).
4. **Electrostatic Discharge (ESD):** Static electricity from human hands can damage delicate RAM and CMOS chips. (Mitigation: anti-static wrist strap, grounding before touching internal components).

### 3. Software Maintenance Utilities

- **Disk Defragmentation:** Reorganizes scattered file clusters on mechanical HDDs into contiguous sectors, speeding up read heads.
- **Disk Cleanup / Cache Purge:** Deletes temporary installation files, browser cache, and system error dumps to reclaim disk space.
- **Driver Updates:** Ensures graphics, network, and chipset controllers operate with vendor stability patches.`,
    keyTakeaways: [
      'Preventive maintenance stops failures before they happen; corrective maintenance fixes breakdowns.',
      'Dust and heat are leading physical causes of computer failure in tropical environments.',
      'Always use a surge protector or UPS to shield electronics from erratic line voltage.',
      'An anti-static wrist strap prevents Electrostatic Discharge (ESD) from damaging CMOS chips.'
    ],
    associatedQuizId: 'dp-ss2-maintenance-quiz'
  },

  // ==========================================
  // WEEK 10: ELECTRONIC MAIL & INTERNET PROTOCOLS
  // ==========================================
  {
    id: 'dp-ss2-term2-week10',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Electronic Mail (E-mail) Architecture & Internet Communication Protocols',
    subtopics: [
      'Structure and Functional Anatomy of an Email Address and Message Header',
      'Email Routing Protocols: SMTP, POP3, and IMAP',
      'File Transfer Protocol (FTP) and Web Protocols (HTTP vs. HTTPS)',
      'Email Etiquette, Spam, Phishing Threats, and Attachment Safety'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze email message headers, compare email transmission protocols (SMTP, POP3, IMAP), evaluate FTP and HTTPS security, and practice professional email communication.',
    contentMarkdown: `### 1. Anatomy of an Electronic Mail System

Electronic mail (Email) is a network method of exchanging digital messages between authors and recipients across computer networks.

An email address consists of two mandatory parts separated by the \`@\` symbol:

\`chinedu.adeyemi@schoolportal.edu.ng\`
- \`chinedu.adeyemi\`: Local mailbox name / username.
- \`schoolportal.edu.ng\`: Domain name of the Mail Transfer Agent (MTA) server.

### 2. Message Header Fields

| Field Name | Description | Privacy / Operational Impact |
| :--- | :--- | :--- |
| **To:** | Primary recipient(s). | Visible to all parties receiving the email. |
| **Cc (Carbon Copy):** | Secondary recipients who receive an informational copy. | Visible to everyone; used for monitoring. |
| **Bcc (Blind Carbon Copy):**| Hidden recipients. | Email addresses remain invisible to To and Cc recipients (maintains student privacy in bulk notices). |
| **Subject:** | Concise summary of message purpose. | Appears in inbox list; critical for spam filtering. |
| **Attachment:** | Attached digital files (PDF, JPG, ZIP). | Carries maximum risk of embedded macro viruses. |

### 3. Internet Communication Protocols

| Protocol | Full Name | Standard Port | Primary Role |
| :--- | :--- | :--- | :--- |
| **SMTP** | Simple Mail Transfer Protocol | Port 25 / 587 | **Pushes/sends** outgoing emails from client to server and between mail servers. |
| **POP3** | Post Office Protocol v3 | Port 110 / 995 | **Downloads** messages to local device and deletes them from server by default. |
| **IMAP** | Internet Message Access Protocol | Port 143 / 993 | **Synchronizes** messages live across multiple devices (phone, laptop) while preserving copies on the cloud server. |
| **FTP** | File Transfer Protocol | Port 20 / 21 | Uploads and downloads large data files to remote servers. |
| **HTTPS** | Hypertext Transfer Protocol Secure | Port 443 | Delivers encrypted ($SSL/TLS$) web traffic, preventing eavesdropping. |`,
    keyTakeaways: [
      'SMTP is used exclusively for sending emails; POP3 and IMAP are used for receiving emails.',
      'IMAP synchronizes email across multiple devices, whereas POP3 downloads and deletes by default.',
      'Bcc (Blind Carbon Copy) protects recipient privacy by hiding email addresses from other recipients.',
      'HTTPS uses SSL/TLS encryption over port 443 to secure web communications.'
    ],
    associatedQuizId: 'dp-ss2-email-protocols-quiz'
  },

  // ==========================================
  // WEEK 11: DATA PRIVACY & NIGERIAN CYBERCRIME LAWS
  // ==========================================
  {
    id: 'dp-ss2-term2-week11',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Data Privacy, Intellectual Property & Cybercrime Laws in Nigeria',
    subtopics: [
      'Concepts of Data Privacy, Confidentiality, and Information Ethics',
      'The Nigeria Data Protection Regulation (NDPR 2019 / Data Protection Act 2023)',
      'Cybercrimes (Prohibition, Prevention, etc.) Act 2015: Offenses and Penalties',
      'Intellectual Property, Software Piracy, Copyright Infringement, and Plagiarism'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate digital privacy principles, examine the Nigerian Data Protection Act and Cybercrimes Act 2015, analyze cyber offenses, and uphold intellectual property rights.',
    contentMarkdown: `### 1. Data Privacy & Fundamental Rights

In the digital era, **Data Privacy** governs the proper handling, collecting, processing, and storage of personal identifiable information (PII) such as names, biometric fingerprints, bank verification numbers (BVN), and health records.

Section 37 of the 1999 Constitution of the Federal Republic of Nigeria guarantees the privacy of citizens, their homes, correspondence, telephone conversations, and telegraphic communications.

### 2. The Nigeria Data Protection Act (NDPA)

The Nigeria Data Protection Commission (NDPC) enforces data rights based on international standards:
1. **Lawfulness & Consent:** Personal data must only be collected with the clear, informed consent of the individual.
2. **Purpose Limitation:** Data collected for school registration cannot be sold to private marketing companies without explicit permission.
3. **Data Minimization:** Only collect the minimum amount of data required for the designated task.
4. **Security & Integrity:** Data controllers must deploy encryption and firewalls to shield student data from leaks.

### 3. Cybercrimes (Prohibition, Prevention, etc.) Act 2015

Nigeria's Cybercrime Act establishes strict legal frameworks and criminal penalties for electronic offenses:

| Cyber Offense | Description | Penalty Under Act |
| :--- | :--- | :--- |
| **System Hacking / Intrusion** | Unauthorized access to secure servers, banking portals, or government databases. | Up to 5 years imprisonment or heavy fines. |
| **Critical Infrastructure Attack** | Sabotaging power grid systems, air traffic control, or military databases. | Up to 10 years imprisonment to life without option of fine. |
| **Identity Theft & Impersonation** | Creating fraudulent social media or banking profiles using another person's name or photos. | 7 years imprisonment and/or ₦5,000,000 fine. |
| **Cyberstalking & Harassment** | Sending offensive, menacing, or intimidating digital messages. | 3 years imprisonment or ₦7,000,000 fine. |
| **Cyber Terrorist Activity** | Orchestrating digital attacks causing national disruption or loss of life. | Death penalty if loss of life results. |

### 4. Intellectual Property & Software Piracy

- **Software Piracy:** Unauthorized copying, distribution, or commercial use of copyrighted software without a vendor license.
- **Plagiarism:** Presenting someone else's code, text, or research as one's own without proper academic attribution.`,
    keyTakeaways: [
      'The NDPA ensures personal data is processed lawfully, transparently, and securely.',
      'The Cybercrime Act 2015 criminalizes hacking, identity theft, cyberstalking, and infrastructure sabotage.',
      'Identity theft carries up to 7 years imprisonment under Nigerian law.',
      'Software piracy and plagiarism violate intellectual property rights and copyright laws.'
    ],
    associatedQuizId: 'dp-ss2-cybercrime-law-quiz'
  },

  // ==========================================
  // WEEK 12: EXAMINATION MASTERCLASS & PRACTICAL CLINIC
  // ==========================================
  {
    id: 'dp-ss2-term2-week12',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review, WAEC Examination Masterclass & Database Practical Workshop',
    subtopics: [
      'Comprehensive Term Review of Data Processing Concepts',
      'Step-by-Step Resolution of WAEC Data Processing Practical Scenarios',
      'Advanced SQL Query Construction: Joins, Subqueries, and Complex Filtering',
      'Exam Strategies for WAEC Paper 1 (Objective), Paper 2 (Theory), and Paper 3 (Practicals)'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate Second Term Data Processing competencies, master table joins and database practicals, review past WAEC question types, and refine exam techniques.',
    contentMarkdown: `### 1. Second Term Core Synthesis

This term covered the structural backbone of modern computing and data architecture:
1. **Weeks 1–3:** Conceptual ERD modeling, relational keys, and physical file organization.
2. **Weeks 4–6:** 3-tier DBMS architecture, SQL DDL/DML, and 1NF/2NF/3NF normalization.
3. **Weeks 7–9:** Web markup (HTML5), malware defense, and hardware servicing.
4. **Weeks 10–11:** Internet communication protocols (SMTP/IMAP/FTP) and Nigerian cyber law.

### 2. Multi-Table Querying: The SQL INNER JOIN

WAEC practical examinations frequently test candidates on extracting data spanning two related tables:

\`\`\`sql
-- Retrieve Student Names alongside their enrolled Course Names
SELECT Students.Surname, Students.FirstName, Courses.CourseTitle
FROM Students
INNER JOIN Enrollment ON Students.StudentID = Enrollment.StudentID
INNER JOIN Courses ON Enrollment.CourseCode = Courses.CourseCode
WHERE Students.ClassLevel = 'SS 2'
ORDER BY Students.Surname ASC;
\`\`\`

### 3. High-Frequency WAEC Theory Scenarios & Model Solutions

**Question 1: Differentiate between a Primary Key and a Foreign Key.**
- *Model Answer:* A **Primary Key** is an attribute (or set of attributes) that uniquely identifies each tuple within its own table and cannot accept null values. A **Foreign Key** is an attribute in a child table whose values refer directly to the primary key of a parent table, establishing a referential integrity link between the two relations.

**Question 2: State three reasons why disk defragmentation improves computer performance.**
- *Model Answer:*
  1. Gathers non-contiguous file clusters and places them in consecutive physical disk blocks.
  2. Reduces the mechanical travel distance and seek time of the drive read/write head.
  3. Accelerates application launch times and improves file transfer rates.

### 4. Exam Hall Checkpoints for Success

- **Paper 1 (Objectives):** Watch for technical distinctions (e.g. SMTP vs. POP3; DDL vs. DML).
- **Paper 2 (Theory):** When drawing ERDs, always label cardinalities ($1:1, 1:N, M:N$) and underline Primary Key attributes.
- **Paper 3 (Practicals):** Verify table relationships in Access/MySQL before entering records to ensure foreign key constraints validate successfully.`,
    keyTakeaways: [
      'SQL INNER JOIN combines tuples from two or more tables based on a related foreign key.',
      'Underline primary keys and use dashed lines for foreign keys in ERD schema drawings.',
      'Disk defragmentation consolidates fragmented files to speed up drive access times.',
      'Adhere strictly to referential integrity when designing normalized multi-table databases.'
    ],
    associatedQuizId: 'dp-ss2-final-exam-quiz'
  }
];
