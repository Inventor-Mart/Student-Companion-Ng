import { CurriculumTopic } from '../types';

export const SS3_DATA_PROCESSING_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: DBMS FUNDAMENTALS
  // ==========================================
  {
    id: 'dp-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Database Management Systems (DBMS): Architecture, Flat-Files vs. RDBMS & Components',
    subtopics: [
      'Concept of a Database and Database Management System (DBMS)',
      'Comparison: Traditional Paper-Based Filing vs. Flat-Files vs. Relational DBMS (RDBMS)',
      'Five Core Components of a DBMS: Hardware, Software, Data, Procedures, and Users',
      'Popular Commercial and Open-Source DBMS Packages (MySQL, MS Access, Oracle, PostgreSQL)'
    ],
    readingTimeMinutes: 9,
    summary: 'Master foundational DBMS concepts, compare flat-file systems with relational architectures, and analyze the five core components of modern database environments.',
    contentMarkdown: `### 1. Concepts of Database & DBMS

A **database** is an organized, structured collection of logically related data stored electronically in a computer system, designed for rapid search, retrieval, and updating.

A **Database Management System (DBMS)** is specialized software that serves as an interface between the database, end-users, and application programs, allowing users to create, read, update, and manage data efficiently.

---

### 2. Traditional Filing vs. Flat-File vs. Relational DBMS

| Dimension | Manual Paper-Based Filing | Flat-File Database (e.g., CSV / Excel) | Relational DBMS (e.g., MySQL / MS Access) |
| :--- | :--- | :--- | :--- |
| **Data Redundancy** | Extremely high; duplicate files across multiple departmental cabinets. | Moderate; data repeated across separate spreadsheet sheets. | **Minimized / Eliminated** through foreign keys and relational normalization. |
| **Data Integrity & Consistency** | Low; updating a client address in one folder leaves other folders outdated. | Inconsistent; no automated validation between different files. | **High**; updating a single master record updates all related linked views automatically. |
| **Search Speed & Retrieval** | Sluggish; requires manual physical searching through paper drawers. | Moderate; slows down drastically as spreadsheet rows exceed tens of thousands. | **Instantaneous**; indexed queries scan millions of records in milliseconds. |
| **Concurrent Multi-User Access** | Impossible; only one person can hold a physical paper folder at a time. | Limited; file locking conflicts when multiple users edit concurrently. | **Seamless**; robust concurrency control and multi-user transaction management. |
| **Data Security & Access Control** | Vulnerable to physical theft, pest infestation, and office fires. | Basic password protection on the entire file. | **Granular role-based security**; users restricted to specific tables or columns. |

---

### 3. The Five Core Components of a DBMS

1. **Hardware:** The physical computer equipment (servers, hard drives, RAM, networking cables) that stores and runs the database engine.
2. **Software:** The database engine program itself (e.g., MySQL, Oracle, Microsoft Access) alongside the host operating system.
3. **Data:** The actual informational content stored within the database (operational data, metadata / data about data such as schema definitions and data types).
4. **Procedures:** The operational rules, backup guidelines, and disaster-recovery protocols governing how the database is designed, populated, and maintained.
5. **Users:** The people interacting with the system:
   - **Database Administrator (DBA):** Manages security, assigns user permissions, and oversees performance tuning and backups.
   - **Database Designers:** Designs schemas, entity relationships, and normalization structures.
   - **Application Programmers:** Writes software code that interfaces with the database via SQL.
   - **End Users:** Non-technical operational staff entering or querying daily records.`,
    keyTakeaways: [
      'A DBMS is specialized software that manages data storage, retrieval, and security.',
      'Relational databases eliminate data redundancy and preserve integrity across linked tables.',
      'The five core components of a DBMS are Hardware, Software, Data, Procedures, and Users.',
      'Database Administrators (DBAs) oversee access permissions, performance optimization, and regular backups.'
    ],
    associatedQuizId: 'waec-ss3-dp-dbms-fundamentals-quiz'
  },

  // ==========================================
  // WEEK 2: RDBMS DESIGN & ER MODELING
  // ==========================================
  {
    id: 'dp-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Relational Database Design & ER Modeling: Tables, Keys & Relationship Cardinality',
    subtopics: [
      'Relational Terminology: Tables (Relations), Fields (Attributes), and Records (Tuples)',
      'Database Keys: Primary Key, Foreign Key, Candidate Key, and Composite Primary Key',
      'Entity-Relationship Diagrams (ERD): Entities, Attributes, and Relationship Types',
      'Relationship Cardinalities: One-to-One (1:1), One-to-Many (1:N), and Many-to-Many (M:N)'
    ],
    readingTimeMinutes: 10,
    summary: 'Design relational database tables, master primary and foreign key constraints, construct Entity-Relationship Diagrams, and evaluate relationship cardinalities.',
    contentMarkdown: `### 1. Relational Terminology

In relational database systems:
- **Table (Relation):** A two-dimensional grid of rows and columns storing data about a specific entity (e.g., a *Students* table).
- **Field / Column (Attribute):** A vertical column representing a specific property or characteristic of the entity (e.g., *DateOfBirth*, *Surname*).
- **Record / Row (Tuple):** A horizontal row containing a complete set of attribute values for a single specific entity instance.

---

### 2. Classification of Database Keys

A **key** is a field or combination of fields used to uniquely identify records and establish relational connections between tables:

| Key Type | Technical Definition & Purpose | Practical Illustrative Example |
| :--- | :--- | :--- |
| **Primary Key (PK)** | A field (or group of fields) that **uniquely identifies each record** in a table. It must contain unique values and **can never be NULL**. | *StudentID* (e.g., STU/2026/001) in a Students table. |
| **Foreign Key (FK)** | A field in one table that references and matches the Primary Key of another table, establishing a relational link between them (**referential integrity**). | *DepartmentID* placed inside the Students table to link each student to a specific department. |
| **Candidate Key** | Any attribute (or set of attributes) that satisfies the uniqueness criteria to serve as a Primary Key. | *AdmissionNumber*, *NationalIDNumber (NIN)*, and *EmailAddress* in a student table are candidate keys. |
| **Composite Key** | A primary key composed of **two or more fields combined together** to guarantee unique identification when no single field is unique alone. | In an Enrollment table: *StudentID* + *CourseCode* combined form a composite key. |

---

### 3. Entity-Relationship Diagrams (ERD) & Cardinalities

[Diagram: erd-data-modeling]

An **Entity-Relationship Diagram (ERD)** is a graphical data modeling diagram representing the conceptual structure of a database:

- **Entity (Rectangle):** A real-world person, place, object, or event about which data is captured (e.g., *Student*, *Course*).
- **Attribute (Oval):** A property or characteristic describing an entity (e.g., *StudentName*).
- **Relationship (Diamond):** The logical association between two or more entities (e.g., *Enrolls In*).

#### Three Types of Relationship Cardinality:
1. **One-to-One (1:1):** Each record in Table A is associated with exactly one record in Table B (e.g., Each *Citizen* has exactly one *National Identity Number (NIN)*).
2. **One-to-Many (1:N):** A single record in Table A can be associated with multiple records in Table B, but each record in Table B relates to only one record in Table A (e.g., One *School Department* has many *Students*).
3. **Many-to-Many (M:N):** Multiple records in Table A relate to multiple records in Table B (e.g., Many *Students* enroll in many *Courses*).
   *Crucial RDBMS Rule:* Many-to-Many relationships cannot be modeled directly in relational engines; they must be decomposed into two One-to-Many relationships using a bridge/junction table (e.g., an *Enrollments* table).`,
    keyTakeaways: [
      'A Primary Key uniquely identifies a record in a table and cannot contain null values.',
      'A Foreign Key links a child table to the primary key of a parent table to preserve referential integrity.',
      'A Composite Key uses two or more fields combined together to uniquely identify a record.',
      'Many-to-Many relationships require an intermediary junction table to decompose into two One-to-Many relationships.'
    ],
    associatedQuizId: 'waec-ss3-dp-erd-modeling-quiz'
  },

  // ==========================================
  // WEEK 3: DATABASE NORMALIZATION PRINCIPLES
  // ==========================================
  {
    id: 'dp-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Database Normalization: Modification Anomalies, 1NF, 2NF & 3NF Pipelines',
    subtopics: [
      'Concept and Objectives of Database Normalization (Minimizing Redundancy)',
      'Database Modification Anomalies: Insertion, Deletion, and Update Anomalies',
      'First Normal Form (1NF): Elimination of Repeating Groups and Atomicity of Values',
      'Second Normal Form (2NF) and Third Normal Form (3NF): Eliminating Partial and Transitive Dependencies'
    ],
    readingTimeMinutes: 10,
    summary: 'Understand database normalization theory, identify data anomalies, decompose unnormalized relations through 1NF, 2NF, and 3NF, and maintain Boyce-Codd standards.',
    contentMarkdown: `### 1. The Concept of Normalization

**Database Normalization** is a systematic multi-step mathematical process of organizing database tables and attributes to **minimize data redundancy** and prevent **data modification anomalies**, while preserving data dependencies.

Developed by Edgar F. Codd (the father of relational databases), normalization systematically decomposes bloated, unorganized tables into smaller, well-structured, linked tables.

---

### 2. Database Modification Anomalies in Unnormalized Tables

If customer and order data are lumped into a single unnormalized table:
1. **Update / Modification Anomaly:** If a customer changes their phone number, the change must be updated across hundreds of past order rows. If any row is missed, data becomes contradictory.
2. **Insertion Anomaly:** You cannot enter details for a brand-new customer who has not yet placed an order if the primary key includes an *OrderID* (since primary keys cannot be NULL).
3. **Deletion Anomaly:** If you delete a customer’s only purchase order from the table, you accidentally delete all recorded contact information for that customer as well!

---

### 3. The Progressive Stages of Normalization

[Diagram: database-normalization-pipeline]

| Normal Form | Core Requirement | How to Achieve Compliance |
| :--- | :--- | :--- |
| **Unnormalized Form (UNF)** | Table contains repeating multi-valued fields or non-atomic data. | Data contains comma-separated entries in a single cell (e.g., Phone: *0802..., 0803...*). |
| **First Normal Form (1NF)** | **Atomicity of Values:** Every column must contain only single, atomic (indivisible) values. There must be no repeating groups, and each row must have a unique identifier. | Split multi-valued fields so that each cell holds exactly one data item; assign a primary key. |
| **Second Normal Form (2NF)** | Must be in 1NF, AND **all non-key attributes must be fully functionally dependent on the entire primary key** (Elimination of **Partial Functional Dependencies**). | Relevant only when a composite primary key exists. If an attribute depends on only part of the composite key, move it into a separate table. |
| **Third Normal Form (3NF)** | Must be in 2NF, AND **no non-key attribute should depend on another non-key attribute** (Elimination of **Transitive Dependencies**). | *"All attributes must depend on the key, the whole key, and nothing but the key."* If Column C depends on Column B, which depends on Key A, move B and C into a new table. |

---

### 4. Worked Step-by-Step Normalization Example

Consider an unnormalized hospital record:
*PatientID, PatientName, DoctorID, DoctorName, DoctorSpecialty*

1. **Step 1: Check for 1NF:** All fields contain atomic values, so it is in 1NF. Primary key is *PatientID*.
2. **Step 2: Check for 2NF:** The primary key is single (*PatientID*), so no partial dependencies exist; it automatically satisfies 2NF.
3. **Step 3: Check for 3NF:** Notice that *DoctorName* and *DoctorSpecialty* depend directly on *DoctorID* (a non-key attribute), not on *PatientID*. This is a **transitive dependency** ($PatientID \\rightarrow DoctorID \\rightarrow DoctorName$).
4. **Resolution to 3NF:** Decompose into two tables:
   - **Patients Table:** *PatientID (PK), PatientName, DoctorID (FK)*
   - **Doctors Table:** *DoctorID (PK), DoctorName, DoctorSpecialty*`,
    keyTakeaways: [
      'Normalization organizes database tables to minimize redundancy and prevent insertion, deletion, and update anomalies.',
      '1NF requires atomicity: every cell must contain a single, indivisible value without repeating groups.',
      '2NF eliminates partial dependencies where an attribute depends on only part of a composite primary key.',
      '3NF eliminates transitive dependencies where a non-key attribute depends on another non-key attribute.'
    ],
    associatedQuizId: 'waec-ss3-dp-normalization-quiz'
  },

  // ==========================================
  // WEEK 4: SQL I: DDL & DML
  // ==========================================
  {
    id: 'dp-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Structured Query Language (SQL) I: DDL Architecture & Core DML Operations',
    subtopics: [
      'Overview of Structured Query Language (SQL) as an ANSI/ISO Standard',
      'Data Definition Language (DDL): CREATE TABLE, ALTER TABLE, and DROP TABLE Commands',
      'Common SQL Data Types: INT, VARCHAR, CHAR, DATE, DECIMAL, and Constraints (NOT NULL, UNIQUE)',
      'Data Manipulation Language (DML): INSERT INTO, SELECT, UPDATE, and DELETE FROM Statements'
    ],
    readingTimeMinutes: 10,
    summary: 'Master SQL syntax, construct relational schemas using DDL statements, define data types and constraints, and execute core DML data manipulation statements.',
    contentMarkdown: `### 1. Overview of SQL

**Structured Query Language (SQL)** is the universal, standardized programming language used by developers and data administrators to define, manipulate, and query relational databases across MySQL, PostgreSQL, Oracle, SQLite, and Microsoft SQL Server.

SQL commands are grouped into two primary functional sub-languages:
- **Data Definition Language (DDL):** Commands that define, modify, or destroy database structures and schemas.
- **Data Manipulation Language (DML):** Commands that manage, insert, update, retrieve, and delete data rows within existing tables.

---

### 2. Data Definition Language (DDL) Syntax

#### 1. Creating a Table (CREATE TABLE):
Creates a new relation with defined columns, data types, and integrity constraints:

\`\`\`sql
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')),
    BirthDate DATE,
    DepartmentID INT,
    Score DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
\`\`\`

#### 2. Modifying Table Architecture (ALTER TABLE):
- **Adding a new column:**
  \`\`\`sql
  ALTER TABLE Students ADD PhoneNumber VARCHAR(15);
  \`\`\`
- **Dropping an existing column:**
  \`\`\`sql
  ALTER TABLE Students DROP COLUMN BirthDate;
  \`\`\`

#### 3. Deleting an Entire Table (DROP TABLE):
Completely removes the table definition and all its data permanently:
\`\`\`sql
DROP TABLE Students;
\`\`\`

---

### 3. Data Manipulation Language (DML) Syntax

#### 1. Inserting New Records (INSERT INTO):
\`\`\`sql
INSERT INTO Students (StudentID, FirstName, LastName, Gender, DepartmentID, Score)
VALUES (101, 'Amina', 'Bello', 'F', 2, 85.50);
\`\`\`

#### 2. Querying and Viewing Data (SELECT):
- Selecting specific columns:
  \`\`\`sql
  SELECT FirstName, LastName, Score FROM Students;
  \`\`\`
- Selecting all columns for filtered records:
  \`\`\`sql
  SELECT * FROM Students WHERE Score >= 70.00;
  \`\`\`

#### 3. Updating Existing Records (UPDATE):
*Crucial Safety Rule:* Always include a WHERE clause; omitting WHERE updates every record in the table!
\`\`\`sql
UPDATE Students
SET Score = 90.00
WHERE StudentID = 101;
\`\`\`

#### 4. Deleting Records (DELETE FROM):
\`\`\`sql
DELETE FROM Students
WHERE StudentID = 101;
\`\`\``,
    keyTakeaways: [
      'DDL commands (CREATE, ALTER, DROP) define and modify database structures.',
      'DML commands (SELECT, INSERT, UPDATE, DELETE) manipulate and retrieve data records.',
      'A primary key constraint guarantees uniqueness and prohibits NULL values.',
      'Always supply a WHERE condition with UPDATE and DELETE statements to avoid accidental table-wide modifications.'
    ],
    associatedQuizId: 'waec-ss3-dp-sql1-quiz'
  },

  // ==========================================
  // WEEK 5: SQL II: ADVANCED QUERIES
  // ==========================================
  {
    id: 'dp-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Structured Query Language (SQL) II: Filtering, Aggregate Functions & Table Joins',
    subtopics: [
      'Sorting and Limiting Query Results: ORDER BY (ASC, DESC) and LIMIT Clauses',
      'Pattern Matching and Logical Operators: AND, OR, NOT, BETWEEN, IN, and LIKE Wildcards',
      'SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX(), and GROUP BY / HAVING',
      'Relational Table Joins: INNER JOIN, LEFT JOIN, and Multi-Table Data Retrieval'
    ],
    readingTimeMinutes: 10,
    summary: 'Execute advanced SQL queries, sort and filter data, compute statistical metrics with aggregate functions and GROUP BY, and master relational INNER JOIN operations.',
    contentMarkdown: `### 1. Sorting & Advanced Filtering in SQL

#### 1. Sorting Results (ORDER BY):
Sorts retrieved rows in ascending (ASC, default) or descending (DESC) order:
\`\`\`sql
SELECT FirstName, LastName, Score
FROM Students
ORDER BY Score DESC, LastName ASC;
\`\`\`

#### 2. Pattern Matching with LIKE & Wildcards:
- **"%"** represents zero, one, or multiple characters.
- **"_"** represents exactly one single character.
\`\`\`sql
-- Finds all students whose surname begins with 'O' (e.g., Okafor, Okon)
SELECT * FROM Students WHERE LastName LIKE 'O%';

-- Finds all students whose email ends with '@gmail.com'
SELECT * FROM Students WHERE Email LIKE '%@gmail.com';
\`\`\`

---

### 2. Aggregate Functions & Grouping

Aggregate functions perform a calculation on a set of column values and return a single summary value:

| Aggregate Function | Mathematical Computation | SQL Example |
| :--- | :--- | :--- |
| **COUNT()** | Returns the total number of rows matching criteria | \`SELECT COUNT(*) FROM Students;\` |
| **SUM()** | Calculates the arithmetic sum of numerical values | \`SELECT SUM(Score) FROM Students;\` |
| **AVG()** | Computes the arithmetic mean of numerical values | \`SELECT AVG(Score) FROM Students WHERE DepartmentID = 1;\` |
| **MIN()** | Returns the minimum lowest value | \`SELECT MIN(Score) FROM Students;\` |
| **MAX()** | Returns the maximum highest value | \`SELECT MAX(Score) FROM Students;\` |

#### The GROUP BY and HAVING Clauses:
- **GROUP BY:** Groups rows sharing identical values into summary rows.
- **HAVING:** Filters grouped summary records (unlike WHERE, which filters individual raw records before grouping):

\`\`\`sql
SELECT DepartmentID, COUNT(*) AS TotalStudents, AVG(Score) AS AverageScore
FROM Students
GROUP BY DepartmentID
HAVING AVG(Score) >= 60.0;
\`\`\`

---

### 3. Relational Table Joins (INNER JOIN)

An **INNER JOIN** combines records from two tables based on a common matching foreign key column:

\`\`\`sql
SELECT Students.StudentID, Students.FirstName, Students.LastName, Departments.DepartmentName
FROM Students
INNER JOIN Departments ON Students.DepartmentID = Departments.DepartmentID
WHERE Departments.DepartmentName = 'Computer Science';
\`\`\``,
    keyTakeaways: [
      'The ORDER BY clause sorts query outputs in ascending (ASC) or descending (DESC) order.',
      'The LIKE operator uses the % wildcard for multiple characters and _ for a single character.',
      'Aggregate functions (COUNT, SUM, AVG, MIN, MAX) calculate summary values across rows.',
      'WHERE filters individual rows before grouping, while HAVING filters grouped results.',
      'An INNER JOIN combines rows from two tables where foreign key values match.'
    ],
    associatedQuizId: 'waec-ss3-dp-sql2-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM PRACTICAL COMPUTING CLINIC
  // ==========================================
  {
    id: 'dp-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Assessment & Practical Computing Clinic: Microsoft Access & Database Design',
    subtopics: [
      'Hands-on Table Design View in Microsoft Access: Field Properties, Data Types, and Validation Rules',
      'Establishing One-to-Many Relationships and Enforcing Referential Integrity',
      'Query Design View: Creating Select Queries, Parameter Queries, and Calculated Fields',
      'Automated Form Design, Subforms, and Report Generation for WAEC Practical Paper 3'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate practical database design in MS Access, set validation rules, construct queries in visual design view, and generate professional reports for exams.',
    contentMarkdown: `### 1. Microsoft Access Table Design View

In the WAEC Practical Data Processing examination (Paper 3), candidates must demonstrate hands-on database construction skills:

#### Essential Field Properties in MS Access:
1. **Field Size:** Specifies maximum character length for Short Text (e.g., setting *StateOfOrigin* to $20$ to conserve disk storage).
2. **Validation Rule:** An expression that restricts data entry to valid values (e.g., **&gt;= 0 And &lt;= 100** for test scores).
3. **Validation Text:** The custom error message displayed to the user when invalid data is entered (e.g., *"Score must be between 0 and 100"*).
4. **Required:** Set to **Yes** to mandate that the field cannot be left blank (equivalent to SQL **NOT NULL**).
5. **Indexed (No Duplicates):** Enforces unique values for candidate keys.

---

### 2. Establishing Relationships in MS Access

1. Open the **Relationships Window** from the Database Tools ribbon.
2. Add the parent table (*Departments*) and child table (*Students*).
3. Drag the Primary Key field (*DepartmentID*) from the parent table and drop it onto the Foreign Key field (*DepartmentID*) in the child table.
4. Check the box: **"Enforce Referential Integrity"**.
   - *Referential Integrity Principle:* Prevents orphan records. You cannot enter a *DepartmentID* in the Students table if that department does not already exist in the Departments table, and you cannot delete a department if students are currently enrolled in it.

---

### 3. Creating Calculated Fields in Access Queries

To calculate total student marks or percentages inside a Query:
1. Open **Query Design View** and add the *Students* table.
2. In an empty field column, enter a calculated field formula using square brackets:
   \`TotalScore: [ExamScore] + [TestScore]\`
   \`Percentage: ([TotalScore] / 100) * 100\`
3. Run the query by clicking the red exclamation mark (**! Run**).

---

### 4. Designing Forms & Generating Reports

- **Forms:** User-friendly graphical screens used for convenient data entry and viewing, shielding operational staff from raw database tables.
- **Reports:** Formatted, professional summaries of database records formatted specifically for printing or distribution to management (e.g., a student terminal report card with header, student photo, grade breakdown, and school stamp).`,
    keyTakeaways: [
      'In MS Access, Validation Rules restrict input ranges and Validation Text displays custom error alerts.',
      'Enforcing referential integrity prevents orphan records by matching child foreign keys to parent primary keys.',
      'Calculated fields in queries use bracket expressions such as [ExamScore] + [TestScore].',
      'Forms facilitate convenient data entry, while Reports format records for printing.'
    ],
    associatedQuizId: 'waec-ss3-dp-practical-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: NETWORKING & INTERNET TECHNOLOGIES
  // ==========================================
  {
    id: 'dp-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Computer Networking: Geographical Coverage, Topologies & Network Hardware',
    subtopics: [
      'Classification of Networks by Scale: PAN, LAN, WLAN, MAN, and WAN',
      'Physical Network Topologies: Star, Bus, Ring, Mesh, and Hybrid Configurations',
      'Networking Hardware Devices: Routers, Switches, Hubs, Modems, and Network Interface Cards (NIC)',
      'Transmission Media: Guided (Twisted Pair, Cat6, Fiber Optic) vs. Unguided (Radio, Satellite, Microwave)'
    ],
    readingTimeMinutes: 10,
    summary: 'Classify computer networks by geographical scale, compare physical network topologies, examine network hardware devices, and contrast guided vs wireless media.',
    contentMarkdown: `### 1. Network Classifications by Geographical Scale

A **computer network** is an interconnection of two or more autonomous computing devices linked via transmission media to share hardware resources (printers, storage drives), software, and data files:

| Network Scale | Full Name & Geographical Reach | Typical Practical Example |
| :--- | :--- | :--- |
| **PAN** | **Personal Area Network** ($< 10\\text{ meters}$) | Interconnecting a smartphone, wireless earbuds, and laptop via Bluetooth. |
| **LAN** | **Local Area Network** ($10\\text{ m} - 1\\text{ km}$) | A computer laboratory network in a secondary school, or an office floor in a bank. |
| **WLAN** | **Wireless Local Area Network** | Wi-Fi network connecting devices in a home or cybercafé without physical cables. |
| **MAN** | **Metropolitan Area Network** ($5\\text{ km} - 50\\text{ km}$) | Interconnecting bank branches or municipal government secretariats across Lagos City. |
| **WAN** | **Wide Area Network** (Countrywide / Global) | The **Internet**; interconnecting millions of computers globally via undersea fiber optic cables and satellites. |

---

### 2. Comparison of Physical Network Topologies

A **network topology** refers to the geometric arrangement and physical/logical layout of nodes, cables, and workstations in a network:

| Topology | Geometric Architecture | Key Advantage | Critical Disadvantage |
| :--- | :--- | :--- | :--- |
| **Star Topology** | All nodes connect individually to a central hub or switch via dedicated cables. | Easy to install and troubleshoot; failure of one cable or computer does not affect the rest of the network. | If the **central switch fails, the entire network collapses**; requires extensive cabling. |
| **Bus Topology** | All devices share a single linear central backbone cable terminated at both ends. | Inexpensive; requires minimal cable length. | If the central backbone cable breaks, the **entire network goes down**; heavy data collisions. |
| **Ring Topology** | Devices are connected in a closed circular loop; data packets travel unidirectionally. | Equal access for all nodes; no data collisions. | Break in any single point of the ring disrupts the entire network loop. |
| **Mesh Topology** | Every node has a dedicated point-to-point physical connection to every other node. | **Maximum fault tolerance and redundancy**; if one link fails, traffic routes around it. | Extremely expensive to cable; complex configuration. |

---

### 3. Core Networking Hardware Devices

1. **Network Interface Card (NIC):** A hardware circuit board installed in a computer that enables it to connect to a network; houses a permanent hardware **MAC Address**.
2. **Switch:** An intelligent device that forwards data packets **only to the specific destination port** based on MAC addresses, eliminating traffic congestion.
3. **Hub:** A non-intelligent device that broadcasts incoming data packets indiscriminately to all connected ports, causing network collisions.
4. **Router:** An intelligent device that operates at the Network Layer (IP) to route data packets between **different networks** (e.g., connecting a school LAN to the global Internet).
5. **Modem (Modulator-Demodulator):** Converts digital computer signals into analog signals for transmission over telephone lines, and vice versa.`,
    keyTakeaways: [
      'LAN covers local buildings; WAN spans national and global boundaries like the Internet.',
      'Star topology connects all devices to a central switch; failure of one cable does not crash the network.',
      'A switch forwards data packets intelligently to specific destination ports using MAC addresses.',
      'A router interconnects different networks and routes data packets using IP addresses.'
    ],
    associatedQuizId: 'waec-ss3-dp-networking-quiz'
  },

  // ==========================================
  // WEEK 8: NETWORK PROTOCOLS & SECURITY
  // ==========================================
  {
    id: 'dp-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Network Protocols & Cybersecurity: OSI Model, IP Addressing & Cyber Threats',
    subtopics: [
      'The OSI 7-Layer Reference Model vs. The TCP/IP Protocol Suite',
      'Common Application Protocols: HTTP, HTTPS, FTP, SMTP, DNS, and DHCP',
      'IP Addressing Fundamentals: IPv4 vs. IPv6 Architecture and Subnet Masks',
      'Cybersecurity Defenses: Firewalls, VPNs, WPA3, and Mitigation of Denial of Service (DoS) Attacks'
    ],
    readingTimeMinutes: 10,
    summary: 'Master the OSI 7-layer model, compare IPv4 and IPv6 addressing, evaluate essential Internet protocols, and implement network security defenses against cyber threats.',
    contentMarkdown: `### 1. The OSI 7-Layer Reference Model

The **Open Systems Interconnection (OSI)** model is a theoretical conceptual framework established by the ISO to describe how data communication occurs across a network in seven distinct layers:

$$\\begin{matrix}
\\textbf{Layer 7: Application} & \\longrightarrow & \\text{User interface & network services (HTTP, FTP, SMTP, DNS)} \\\\
\\textbf{Layer 6: Presentation} & \\longrightarrow & \\text{Data formatting, encryption/decryption, compression (SSL/TLS, JPEG)} \\\\
\\textbf{Layer 5: Session} & \\longrightarrow & \\text{Establishes, manages, and terminates connections between applications} \\\\
\\textbf{Layer 4: Transport} & \\longrightarrow & \\text{End-to-end reliability, segmenting, flow control (TCP, UDP)} \\\\
\\textbf{Layer 3: Network} & \\longrightarrow & \\text{Logical addressing and routing of packets across networks (IP, ICMP)} \\\\
\\textbf{Layer 2: Data Link} & \\longrightarrow & \\text{Physical framing, error detection, MAC addressing (Ethernet, Switches)} \\\\
\\textbf{Layer 1: Physical} & \\longrightarrow & \\text{Transmission of raw binary bits over physical media (Cables, Hubs, Voltage)}
\\end{matrix}$$

*(Mnemonic to remember the 7 layers from top to bottom: **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing).*

---

### 2. Common Application Layer Protocols

- **HTTP (Hypertext Transfer Protocol) / HTTPS:** Transfers web pages; HTTPS uses SSL/TLS encryption over port 443 for secure e-commerce.
- **FTP (File Transfer Protocol):** Uploads and downloads large computer files between client and server (ports 20 & 21).
- **SMTP (Simple Mail Transfer Protocol):** Sends outgoing emails between mail servers (port 25).
- **DNS (Domain Name System):** Resolves human-readable domain names into numerical IP addresses (e.g., converts **waecdirect.org** $\\rightarrow$ **192.168.1.1**).
- **DHCP (Dynamic Host Configuration Protocol):** Automatically assigns dynamic IP addresses to devices joining a network.

---

### 3. IP Addressing: IPv4 versus IPv6

An **Internet Protocol (IP) Address** is a unique numerical identifier assigned to every device connected to an IP network:

| Feature | IPv4 (Internet Protocol Version 4) | IPv6 (Internet Protocol Version 6) |
| :--- | :--- | :--- |
| **Address Bit Length** | **32 bits** long | **128 bits** long |
| **Format & Notation** | 4 decimal numbers separated by dots (e.g., **197.210.64.15**) | 8 groups of 4 hexadecimal digits separated by colons (e.g., **2001:0db8:85a3::8a2e:0370:7334**) |
| **Address Space Capacity** | $\\approx 4.3 \\times 10^9$ addresses ($4.3\\text{ billion}$) — **Globally exhausted** | $\\approx 3.4 \\times 10^{38}$ addresses — virtually limitless supply |
| **Built-In Security** | Security (IPsec) is optional | IPsec encryption is mandatory and built-in |

---

### 4. Network Security Defenses

1. **Firewalls:** Hardware devices or software utilities that inspect incoming and outgoing network traffic, blocking unauthorized packets based on defined security rules.
2. **Virtual Private Network (VPN):** Establishes an encrypted, private tunnel across the public Internet to protect sensitive data transfers from eavesdropping.
3. **Denial of Service (DoS / DDoS) Attacks:** An attack where cybercriminals flood a server with millions of fake data requests, overwhelming its bandwidth and crashing public access. Mitigated by load balancers and rate-limiting filters.`,
    keyTakeaways: [
      'The OSI model has 7 layers: Application, Presentation, Session, Transport, Network, Data Link, Physical.',
      'DNS translates human-friendly domain names into computer-readable IP addresses.',
      'IPv4 uses 32-bit addresses and is exhausted; IPv6 uses 128-bit hexadecimal addresses.',
      'A firewall monitors and filters incoming and outgoing network traffic based on security rules.'
    ],
    associatedQuizId: 'waec-ss3-dp-protocols-security-quiz'
  },

  // ==========================================
  // WEEK 9: BIG DATA & CLOUD COMPUTING
  // ==========================================
  {
    id: 'dp-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Big Data & Cloud Computing: The 5 Vs, Service Models (IaaS, PaaS, SaaS) & Storage',
    subtopics: [
      'Concept of Big Data and The 5 Vs: Volume, Velocity, Variety, Veracity, and Value',
      'Cloud Computing Definition, Elasticity, and Economic Benefits',
      'Cloud Service Models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS)',
      'Cloud Deployment Architectures (Public, Private, Hybrid) and Data Warehouses'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze Big Data characteristics, evaluate cloud computing elastic architectures, contrast IaaS, PaaS, and SaaS, and explore modern cloud deployments.',
    contentMarkdown: `### 1. The Big Data Paradigm

**Big Data** refers to extremely large, complex, and fast-moving datasets that exceed the processing capabilities of traditional relational database management systems:

#### The 5 Vs of Big Data:
1. **Volume:** Astronomical amounts of data generated every second (terabytes to petabytes from social media, financial transactions, sensors).
2. **Velocity:** The blistering speed at which new data is generated, streamed, and processed in real time (e.g., live stock trading on the NGX).
3. **Variety:** Diverse structural forms of data:
   - **Structured Data:** Tabular rows and columns (SQL databases).
   - **Semi-Structured Data:** JSON, XML log files.
   - **Unstructured Data:** Video footage, voice notes, satellite images, PDF documents ($> 80\\%$ of global data).
4. **Veracity:** The trustworthiness, accuracy, and quality of data.
5. **Value:** The actionable business insights and economic value extracted from data analytics.

---

### 2. Cloud Computing Service Models

**Cloud Computing** is the on-demand delivery of computing services (servers, storage, databases, networking, software) over the Internet ("the cloud") with pay-as-you-go pricing:

| Service Model | Full Name & Abbreviation | What the Cloud Provider Manages | What the Client User Manages | Prominent Real-World Examples |
| :--- | :--- | :--- | :--- | :--- |
| **IaaS** | **Infrastructure as a Service** | Physical servers, virtualization, storage drives, network data center. | Operating System, middleware, installed software applications, data. | Amazon AWS EC2, Microsoft Azure VMs, Google Compute Engine |
| **PaaS** | **Platform as a Service** | Hardware, OS, runtime environment, database engine. | Only the application code and data logic. | Google App Engine, Heroku, AWS Elastic Beanstalk |
| **SaaS** | **Software as a Service** | Entire software stack, hosting, updates, and maintenance. | Nothing; users access finished applications via web browser. | Google Workspace (Gmail, Docs), Microsoft 365, Dropbox, Zoom |

---

### 3. Cloud Deployment Models

- **Public Cloud:** Cloud infrastructure owned by commercial providers (AWS, Microsoft, Google) delivered over the public Internet to multiple client tenants.
- **Private Cloud:** Dedicated cloud infrastructure provisioned exclusively for a single corporate enterprise or government security agency with strict compliance needs.
- **Hybrid Cloud:** Combines public and private clouds, allowing sensitive financial data to remain on private servers while non-sensitive workloads scale on the public cloud.`,
    keyTakeaways: [
      'The 5 Vs of Big Data are Volume, Velocity, Variety, Veracity, and Value.',
      'SaaS delivers complete applications (Gmail); PaaS provides developer platforms; IaaS provides virtualized hardware (AWS EC2).',
      'Unstructured data (video, audio) accounts for over 80% of data generated globally.',
      'Hybrid clouds blend on-premises private security with scalable public cloud capacity.'
    ],
    associatedQuizId: 'waec-ss3-dp-cloud-computing-quiz'
  },

  // ==========================================
  // WEEK 10: DATA PRIVACY & NIGERIAN CYBER LAWS
  // ==========================================
  {
    id: 'dp-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Data Privacy & Cyber Laws: Malware Classifications, Cybercrimes Act & the NDPA 2023',
    subtopics: [
      'Classification of Malicious Software (Malware): Viruses, Worms, Trojans, Ransomware, and Spyware',
      'Social Engineering Vectors: Phishing, Spear Phishing, Smishing, and Man-in-the-Middle Attacks',
      'The Cybercrimes (Prohibition, Prevention, etc.) Act of 2015: Offenses and Legal Penalties',
      'The Nigeria Data Protection Act (NDPA 2023) and Statutory Rights of Data Subjects'
    ],
    readingTimeMinutes: 10,
    summary: 'Classify malware types, evaluate social engineering exploits, examine Nigeria’s Cybercrimes Act of 2015, and analyze data subject rights under the NDPA 2023.',
    contentMarkdown: `### 1. Classification of Malicious Software (Malware)

**Malware** is any software intentionally designed to cause damage to a computer, server, client, or computer network:

| Malware Type | Defining Mechanism & Vector | Primary Destructive Action |
| :--- | :--- | :--- |
| **Computer Virus** | Attaches itself to legitimate executable host files (**exe**, **doc**); requires human action (running the program) to spread. | Corrupts data files, deletes system records, or reformats hard drives. |
| **Worm** | Standalone malicious software that replicates automatically across computer networks **without human intervention**. | Consumes network bandwidth and system RAM, causing computer freeze. |
| **Trojan Horse** | Masquerades as a useful, benign application (e.g., a free game or cracked software) to trick the user into installing it. | Silently opens a **backdoor** allowing remote hackers to control the PC. |
| **Ransomware** | Encrypts all user documents and files using unbreakable cryptography. | Demands cryptocurrency ransom payments to release the decryption key. |
| **Spyware / Keylogger** | Secretly monitors user keystrokes, browsing history, and login activity. | Transmits harvested credit card credentials and passwords to cybercriminals. |

---

### 2. Social Engineering Attacks

**Social engineering** exploits human psychology rather than software vulnerabilities:
- **Phishing:** Deceptive bulk emails mimicking authentic banks to trick victims into revealing passwords or BVNs.
- **Smishing:** Phishing conducted via SMS text messages.
- **Spear Phishing:** Highly customized, researched phishing targeted at a specific corporate executive or accountant.

---

### 3. Nigerian Cyber Laws & Data Protection

#### 1. The Cybercrimes (Prohibition, Prevention, etc.) Act 2015:
- Criminalizes hacking, unauthorized access to computer systems, cyberstalking, identity theft, child pornography, and cyber-terrorism.
- Prescribes severe penalties ranging from heavy fines to life imprisonment for attacks on **Critical National Information Infrastructure (CNII)**.

#### 2. The Nigeria Data Protection Act (NDPA 2023):
Signed into law in June 2023, establishing the **Nigeria Data Protection Commission (NDPC)**:
- **Fundamental Principles:** Personal data must be processed lawfully, fairly, and transparently, and collected only for specified, legitimate purposes.
- **Statutory Rights of Data Subjects (Citizens):**
  - **Right to be Informed:** Must be notified before personal data is collected.
  - **Right of Access:** Entitled to request a copy of personal records held by any company.
  - **Right to Rectification:** Entitled to demand correction of inaccurate personal data.
  - **Right to Erasure ("Right to be Forgotten"):** Right to demand deletion of data when no longer legally required.
  - **Right to Data Portability:** Transferring personal data between service providers.`,
    keyTakeaways: [
      'Worms replicate independently across networks; viruses require an executable host file and human trigger.',
      'Ransomware encrypts user files and extorts cryptocurrency payments for decryption keys.',
      'The Cybercrimes Act of 2015 criminalizes computer hacking, cyberstalking, and identity theft in Nigeria.',
      'The Nigeria Data Protection Act (NDPA 2023) guarantees citizens rights to data access, correction, and erasure.'
    ],
    associatedQuizId: 'waec-ss3-dp-cyber-laws-quiz'
  },

  // ==========================================
  // WEEK 11: EDP CYCLE & SYSTEMS ANALYSIS
  // ==========================================
  {
    id: 'dp-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Electronic Data Processing (EDP) & SDLC: Stages, Implementation & Flowcharts',
    subtopics: [
      'The Electronic Data Processing (EDP) Life Cycle: Collection, Input, Processing, Storage, and Output',
      'Data Processing Methods: Batch, Real-Time (Online), Time-Sharing, and Distributed Processing',
      'The Systems Development Life Cycle (SDLC): Feasibility, Analysis, Design, Implementation, and Maintenance',
      'System Changeover Strategies: Direct, Parallel, Phased, and Pilot Implementation Methods'
    ],
    readingTimeMinutes: 10,
    summary: 'Study the EDP lifecycle, compare batch vs real-time processing, navigate the Systems Development Life Cycle (SDLC), and evaluate system conversion strategies.',
    contentMarkdown: `### 1. The Electronic Data Processing (EDP) Cycle

The **EDP Cycle** describes the sequence of stages through which raw data is transformed into meaningful information:

$$\\begin{matrix}
\\textbf{1. Data Collection} & \\longrightarrow & \\text{Gathering raw facts from source documents (survey forms, sales receipts)} \\\\
\\downarrow \\\\
\\textbf{2. Data Preparation} & \\longrightarrow & \\text{Validating, cleaning, and transcribing data into machine-readable format} \\\\
\\downarrow \\\\
\\textbf{3. Data Input} & \\longrightarrow & \\text{Entering data into computer memory via keyboard, barcode scanner, or OCR} \\\\
\\downarrow \\\\
\\textbf{4. Data Processing} & \\longrightarrow & \\text{Manipulating data via calculations, sorting, and comparison in the CPU} \\\\
\\downarrow \\\\
\\textbf{5. Storage & Output} & \\longrightarrow & \\text{Saving in database and outputting as reports, displays, or invoices}
\\end{matrix}$$

---

### 2. Modes of Data Processing

- **Batch Processing:** Data is accumulated into a batch over time and processed together in a single run (e.g., monthly civil service salary payroll, utility billing).
- **Real-Time (Online) Processing:** Data is processed immediately upon entry, producing instantaneous output (e.g., ATM withdrawals, flight bookings).

---

### 3. The Systems Development Life Cycle (SDLC)

[Diagram: data-flow-charts]

When organizations build or upgrade computer information systems, systems analysts follow the **SDLC**:

1. **Preliminary Investigation & Feasibility Study:** Evaluates technical, economic, and operational viability.
2. **Systems Analysis:** Studies current workflows, interviews users, and defines user requirements.
3. **Systems Design:** Designs database schemas, user interfaces, inputs, and outputs.
4. **Systems Development & Coding:** Programmers write code and build the database.
5. **Testing & Quality Assurance:** Eliminates bugs and verifies system stability.
6. **Implementation / Conversion:** Deploying the new system to operational users.
7. **Maintenance & Review:** Ongoing bug fixing and functional upgrades.

---

### 4. System Changeover Strategies

| Changeover Strategy | Operational Procedure | Key Advantage | Inherent Risk |
| :--- | :--- | :--- | :--- |
| **Direct Changeover ("Big Bang")** | The old system is abruptly shut down on a set date and the new system is immediately turned on. | Fast; inexpensive; no duplicated operations. | **High risk**; if the new system fails, operations halt completely with zero backup! |
| **Parallel Running** | The old system and new system are operated side-by-side simultaneously for a trial period. | **Safest method**; outputs are cross-checked; old system provides absolute backup. | Expensive; doubles workload for operational staff who must enter data twice. |
| **Pilot Running** | The new system is implemented completely in one single branch or department first before wider rollout. | Limits failure risk to a single pilot branch while debugging. | Takes considerable time to complete company-wide rollout. |
| **Phased Implementation** | The new system is introduced in incremental modules (e.g., deploying inventory first, then payroll). | Staff adapt gradually to each module. | Managing complex data interfaces between new and old modules. |`,
    keyTakeaways: [
      'The EDP cycle follows: Collection, Preparation, Input, Processing, Storage, and Output.',
      'Batch processing handles accumulated data in bulk (payroll); real-time processing executes instantly (ATMs).',
      'The SDLC stages are Feasibility, Analysis, Design, Coding, Testing, Implementation, and Maintenance.',
      'Parallel running is the safest changeover strategy, while direct changeover carries the highest operational risk.'
    ],
    associatedQuizId: 'waec-ss3-dp-edp-sdlc-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & WAEC DP MASTERCLASS
  // ==========================================
  {
    id: 'dp-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC Practical Data Processing Masterclass: Paper 2 & 3 Strategies',
    subtopics: [
      'Comprehensive Term Review: DBMS, Normalization, SQL, Networking, and Cybersecurity',
      'WAEC Data Processing Examination Format: Paper 1, Paper 2 (Theory), and Paper 3 (Practicals)',
      'Paper 3 Hands-on Laboratory Strategy: MS Access Database Creation & SQL Writing',
      'Examiner Scoring Guidelines: Avoiding Common Syntax Errors and Maximizing Technical Marks'
    ],
    readingTimeMinutes: 10,
    summary: 'Synthesize 2nd Term data processing, analyze WAEC exam paper formats, master practical database creation on MS Access, and apply examiner scoring rubrics.',
    contentMarkdown: `### 1. WAEC Data Processing Examination Structure

The WAEC examination in Data Processing evaluates both theoretical knowledge and hands-on laboratory computing:

1. **Paper 1: Multiple Choice Objectives (50 Questions / 1 Hour / 50 Marks):**
   - Tests speed, precision in technical definitions, hardware functions, and networking terms.
2. **Paper 2: Essay & Conceptual Theory (1 Hour 30 Minutes / 60 Marks):**
   - Requires answering **four** out of six structured questions covering database design, normalization, networking, and system analysis.
3. **Paper 3: Hands-on Practical Examination (2 Hours / 100 Marks):**
   - Conducted in the computer laboratory; students must construct working databases in **Microsoft Access**, spreadsheets in **Excel**, or web pages, and print their final outputs.

---

### 2. Practical Paper 3 Laboratory Strategy

- **Step 1: Save the Database Immediately:**
  - Create the file in the designated candidate folder named with your **Index Number** (e.g., **1050201045_Practical**).
- **Step 2: Table Construction Discipline:**
  - Assign correct data types: use *Short Text* for telephone numbers (never Number, because numbers strip leading zeros).
  - Explicitly define the **Primary Key** before saving the table design.
- **Step 3: Relationships & Referential Integrity:**
  - If a question asks to establish a relationship, always check **"Enforce Referential Integrity"** in Access.
- **Step 4: Writing SQL Queries:**
  - In Paper 2 and Paper 3, SQL queries must have exact syntax:
    \`\`\`sql
    SELECT StudentName, Grade FROM Results WHERE Grade = 'A';
    \`\`\`
  - Always remember the concluding semicolon (**;**).

---

### 3. Summary Review Checklist for WAEC Data Processing

| Syllabus Area | Key Rule to Remember |
| :--- | :--- |
| **Normalization** | 1NF = Atomic values; 2NF = No partial dependencies; 3NF = No transitive dependencies. |
| **SQL** | DDL defines structure (CREATE, ALTER, DROP); DML manipulates rows (INSERT, SELECT, UPDATE, DELETE). |
| **Networking** | Switches use MAC addresses; Routers use IP addresses; Star topology connects to a central switch. |
| **Cybersecurity** | Ransomware encrypts files; Phishing steals credentials; NDPA 2023 protects citizen data rights. |`,
    keyTakeaways: [
      'WAEC Data Processing Paper 3 tests hands-on database construction and query design in the laboratory.',
      'Always store telephone numbers as Short Text to preserve leading zero digits.',
      'Check referential integrity when building relationships between parent and child tables in Access.',
      'SQL queries must conform to standard syntax with terminating semicolons.'
    ],
    associatedQuizId: 'waec-ss3-dp-masterclass-quiz'
  }
];
