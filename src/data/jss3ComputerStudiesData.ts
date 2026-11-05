import { CurriculumTopic } from '../types';

export const JSS3_COMPUTER_STUDIES_TOPICS: CurriculumTopic[] = [
  {
    id: 'jss3-comp-t2-w1',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Spreadsheet Packages: Interface, Data Entry & Arithmetic Formulas',
    subtopics: [
      'Definition of Spreadsheets and Evolution from Paper Ledgers to Electronic Packages',
      'Common Spreadsheet Software: Microsoft Excel, Google Sheets, LibreOffice Calc',
      'Workbook vs. Worksheet, Rows (1 to 1,048,576), Columns (A to XFD), and Cell Referencing',
      'Data Types in Spreadsheets: Labels (Text), Values (Numbers), and Formulas / Functions',
      'Arithmetic Operators and Built-in Statistical Functions: =SUM(), =AVERAGE(), =MAX(), =MIN(), =COUNT()',
      'Case Study: Building a Nigerian Secondary School Student Terminal Report Sheet',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive guide to spreadsheet applications: GUI anatomy, cell coordinates, data typing, mathematical formula syntax, statistical function calculation, student grade sheet computation, and BECE examination questions.',
    contentMarkdown: `### 1. Introduction to Electronic Spreadsheets

A **spreadsheet** is an interactive software application designed for organizing, analyzing, formatting, and storing tabular data in a grid of rows and columns. It replaces traditional paper-based accounting ledgers with automated, dynamic computational power.

#### Leading Modern Spreadsheet Applications:
- **Microsoft Excel:** The global industrial standard suite component.
- **Google Sheets:** Free, cloud-based collaborative spreadsheet package running in web browsers.
- **LibreOffice Calc:** Open-source desktop alternative.

---

### 2. Anatomy of the Spreadsheet Interface

\`\`\`
   +-------------------------------------------------------------------------+
   | Title Bar: Student_Results_JSS3.xlsx - Excel                            |
   +-------------------------------------------------------------------------+
   | Menu Bar / Ribbon: File  Home  Insert  Page Layout  Formulas  Data      |
   +-------------------------------------------------------------------------+
   | Name Box: [ B4 ] | Formula Bar: [ =AVERAGE(C4:E4)                     ] |
   +---+--------------------+--------------------+--------------------+------+
   |   |        A           |         B          |         C          |  D   |
   +---+--------------------+--------------------+--------------------+------+
   | 1 | STUDENT NAME       | MATHEMATICS        | BASIC SCIENCE      | TOTAL|
   +---+--------------------+--------------------+--------------------+------+
   | 2 | Adeleke Ibrahim    | 85                 | 92                 | 177  |
   +---+--------------------+--------------------+--------------------+------+
   | 3 | Okonji Blessing    | 78                 | 88                 | 166  |
   +---+--------------------+--------------------+--------------------+------+
   | 4 | Danjuma Fatima     | 90                 | 94                 | 184  |  <-- Active Cell (B4)
   +---+--------------------+--------------------+--------------------+------+
   | Sheets: [ Sheet1 ] [ JSS3_Scores ] [ + ]                                |
   +-------------------------------------------------------------------------+
\`\`\`

#### Core Definitions:
- **Workbook:** The complete spreadsheet file (saved with extension **.xlsx** or **.ods**). A workbook contains one or more worksheets.
- **Worksheet:** A single page or sheet consisting of a grid of columns and rows.
- **Column:** Vertical division identified by letters of the English alphabet (**A, B, C, ... Z, AA, AB, ... up to XFD** = 16,384 columns in Excel).
- **Row:** Horizontal division identified by numbers (**1, 2, 3, ... up to 1,048,576 rows**).
- **Cell:** The intersection of a row and a column. It is the basic unit for storing data.
- **Cell Address / Reference:** The unique coordinate identifier of a cell, combining its Column Letter and Row Number (e.g., **B4** represents Column B, Row 4).
- **Active Cell:** The currently selected cell, highlighted by a thick colored border. Its address appears in the **Name Box**.
- **Formula Bar:** The display area where text, numbers, or mathematical formulas entered in the active cell are viewed and edited.

---

### 3. Data Types in Spreadsheets

Every entry in a spreadsheet belongs to one of three categories:
1. **Labels (Text):** Alphanumeric text used for titles, column headings, and names (e.g., "Student Name", "Basic Tech"). By default, **labels align to the LEFT** of the cell.
2. **Values (Numbers):** Numeric values, currency, dates, and percentages used in calculations (e.g., 85, ₦4,500, 15/01/2026). By default, **values align to the RIGHT** of the cell.
3. **Formulas and Functions:** Mathematical instructions that calculate results automatically. **EVERY formula or function MUST begin with an EQUAL SIGN (=)**.

---

### 4. Arithmetic Operators & Core Statistical Functions

#### Standard Arithmetic Operators:
- Addition: \`+\` (e.g., \`=A1 + B1\`)
- Subtraction: \`-\` (e.g., \`=A1 - B1\`)
- Multiplication: \`*\` (asterisk, e.g., \`=A1 * B1\`)
- Division: \`/\` (forward slash, e.g., \`=A1 / B1\`)
- Exponentiation: \`^\` (caret, e.g., \`=A1 ^ 2\`)

#### Essential Built-in Statistical Functions:
| Function | Syntax Example | Mathematical Purpose |
| :--- | :--- | :--- |
| **=SUM()** | \`=SUM(C2:C30)\` | Adds all numerical values within the specified cell range. |
| **=AVERAGE()** | \`=AVERAGE(D2:D30)\` | Calculates the arithmetic mean of numbers in the range. |
| **=MAX()** | \`=MAX(B2:B30)\` | Identifies and returns the highest (maximum) value in the range. |
| **=MIN()** | \`=MIN(B2:B30)\` | Identifies and returns the lowest (minimum) value in the range. |
| **=COUNT()** | \`=COUNT(A2:A30)\` | Counts the number of cells in the range that contain numeric values. |

---

### 5. Practical Nigerian School Scenario: Terminal Report Sheet

Suppose a JSS 3 teacher enters the continuous assessment test scores (out of 40) and exam scores (out of 60) for five students:
- Test score is in Column **B** (Rows 2 to 6).
- Exam score is in Column **C** (Rows 2 to 6).

To calculate the Total Score in Column **D** for the first student (Row 2):
\`=SUM(B2:C2)\` or \`=B2 + C2\`

To calculate the Average Total Score across all five students in cell **D7**:
\`=AVERAGE(D2:D6)\`

To display the highest score in the class in cell **D8**:
\`=MAX(D2:D6)\`

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** What character must be typed first before entering any calculation in a spreadsheet cell?  
*Solution:* The **equal sign (=)**. Without it, the spreadsheet treats the entry as ordinary label text.

**Question 2:** If cell C1 contains 20, cell C2 contains 30, and cell C3 contains 50, what value is returned by the formula \`=AVERAGE(C1:C3)\`?  
*Solution:*  
$$\text{Average} = \frac{20 + 30 + 50}{3} = \frac{100}{3} = 33.33$$`,
    keyTakeaways: [
      'Spreadsheets organize data in a rectangular grid of numbered rows and lettered columns.',
      'A cell is the intersection of a row and column; its address combines column letter and row number (e.g., C5).',
      'Every formula and function in a spreadsheet must begin with an equal sign (=).',
      'Common statistical functions include =SUM(), =AVERAGE(), =MAX(), =MIN(), and =COUNT().'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w2',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Database Management Systems (DBMS): Concepts, Structure & Queries',
    subtopics: [
      'Data vs. Information, and the Definition of a Database',
      'Functions of Database Management Systems (DBMS) and Popular Examples (Access, MySQL, Oracle, SQLite)',
      'Hierarchical Structure of Data: Character -> Field -> Record -> Table / File -> Database',
      'Field Data Types: Short Text, Long Text, Number, Date/Time, Currency, AutoNumber, Yes/No (Boolean)',
      'Database Keys: Primary Key (Unique Identification) vs. Foreign Key (Relational Linking)',
      'The Four Primary Database Objects: Tables, Queries, Forms, and Reports',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive analysis of database systems: data hierarchy, field/record/table relationships, primary key constraints, SQL query logic, forms and report generation, and BECE examination questions.',
    contentMarkdown: `### 1. Data vs. Information & Database Definition

- **Data:** Raw, unorganized, unprocessed facts, numbers, symbols, or observations that lack context (e.g., "Chukwuma", 14, "Abuja", 88).
- **Information:** Processed, structured, and organized data presented in a meaningful context that aids decision-making (e.g., *"Chukwuma is a 14-year-old student living in Abuja who scored 88% in Computer Studies"*).
- **Database:** An organized collection of related data stored electronically in a structured format so that it can be easily accessed, queried, updated, and managed with minimal data redundancy.

#### Database Management System (DBMS):
A specialized software package that serves as an interface between the database, end users, and application programs:
- **Desktop DBMS:** Microsoft Access, SQLite (ideal for small school or library management).
- **Enterprise Client-Server RDBMS:** MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server (powers massive platforms like JAMB registration, banking portals, and national NIMC databases).

---

### 2. The Data Hierarchy

\`\`\`
   +-----------------------------------------------------------+
   | DATABASE: School_Records.accdb                            |
   |                                                           |
   |   +---------------------------------------------------+   |
   |   | TABLE: Students_Table                             |   |
   |   |                                                   |   |
   |   |   +-------------------------------------------+   |   |
   |   |   | RECORD: Row 1                             |   |   |
   |   |   | [StudentID: 101 | Name: Amina | Age: 14 ] |   |   |
   |   |   +-------------------------------------------+   |   |
   |   |   | FIELD: Column (e.g., StudentID, Name, Age)|   |   |
   |   |   +-------------------------------------------+   |   |
   |   |   | CHARACTER / BYTE: Single letter or digit  |   |   |
   |   |   +-------------------------------------------+   |   |
   |   +---------------------------------------------------+   |
   +-----------------------------------------------------------+
\`\`\`

1. **Character / Byte:** The smallest unit of data (e.g., the letter 'A', the digit '7', or a punctuation mark).
2. **Field (Attribute / Column):** A single category of information within a record (e.g., \`Surname\`, \`DateOfBirth\`, \`AdmissionNumber\`).
3. **Record (Tuple / Row):** A collection of related fields describing a single complete entity (e.g., all personal data concerning one specific student).
4. **Table / File (Entity / Relation):** A collection of related records arranged in rows and columns.
5. **Database:** A collection of logically interrelated tables (e.g., \`StudentsTable\`, \`TeachersTable\`, \`FeesTable\`).

---

### 3. Field Data Types in Database Design

When creating table schemas, each field must be assigned a specific data type:
- **Short Text / Varchar:** Text and alphanumeric codes up to 255 characters (e.g., Names, Residential Addresses).
- **Long Text (Memo):** Extended paragraphs of text (e.g., Teacher remarks, medical history).
- **Number / Integer:** Numeric data used in mathematical calculations (e.g., Exam Scores, Quantities).
- **Date / Time:** Calendar dates and clock times (e.g., \`24/10/2011\`, \`08:30 AM\`).
- **Currency:** Monetary values formatted with currency symbols (e.g., ₦25,000.00).
- **AutoNumber:** Unique sequential integer assigned automatically by the DBMS upon record creation (commonly used for ID numbers).
- **Yes / No (Boolean):** Logical binary values representing True/False, Active/Inactive, or Paid/Unpaid.

---

### 4. Database Keys: Primary Key vs. Foreign Key

#### Primary Key:
A field (or combination of fields) that **uniquely identifies every individual record** in a database table.
- *Strict Rules:* A primary key can **never contain duplicate values** and can **never be empty (Null)**.
- *Examples in Nigeria:* National Identity Number (NIN), Bank Verification Number (BVN), JAMB Registration Number, School Admission Number.

#### Foreign Key:
A field in one table that matches the primary key of another table, creating a relational link between both tables (e.g., linking \`StudentID\` in a \`GradesTable\` to \`StudentID\` in the master \`StudentsTable\`).

---

### 5. The Four Primary Database Objects

1. **Tables:** The foundational containers where all raw data is stored in rows and columns.
2. **Queries:** Questions or requests formulated to extract, filter, sort, or manipulate specific records matching defined criteria (e.g., *"List all JSS 3 students who scored above 75% in Mathematics"*).
3. **Forms:** Customized graphical user interfaces (GUIs) featuring input text boxes and buttons designed for clean, user-friendly data entry and viewing.
4. **Reports:** Formatted, professional layouts organized for printing or digital distribution (e.g., Student Terminal Report Cards, Fee Clearance Statements).

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Define the term 'Primary Key' and provide two real-life examples used in Nigeria.  
*Solution:* A Primary Key is a unique identifier assigned to each record in a database table that guarantees no two rows have identical values. Examples include the **National Identity Number (NIN)** and **Bank Verification Number (BVN)**.

**Question 2:** State the difference between a Record and a Field in a database table.  
*Solution:* A **Field** is a single column representing a specific attribute (e.g., Age), whereas a **Record** is a horizontal row containing all fields describing one complete entity (e.g., complete profile of a student).`,
    keyTakeaways: [
      'A database is an organized collection of related data managed electronically via a DBMS.',
      'Data hierarchy progresses from Character -> Field -> Record -> Table -> Database.',
      'A Primary Key uniquely identifies every record in a table and cannot contain Null or duplicate values.',
      'The four primary DBMS objects are Tables (storage), Queries (search), Forms (entry), and Reports (output).'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w3',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Computer Networks: Scales, Topologies, Hardware & Transmission Media',
    subtopics: [
      'Definition, Purpose, and Economic Benefits of Computer Networking',
      'Geographical Classifications: PAN, LAN, MAN, and WAN (The Internet)',
      'Network Physical Topologies: Star, Bus, Ring, Mesh, Tree, and Hybrid Topologies',
      'Transmission Media: Guided (Twisted Pair, Coaxial, Fiber Optics) vs. Unguided (Radio, Microwave, Satellite)',
      'Essential Network Hardware: NIC, Hubs, Switches, Routers, Modems, and Access Points',
      'Ethernet Cables and RJ-45 Connector Crimping Color Standards (T568A / T568B)',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive analysis of computer networking: scale classifications, network topologies, physical and wireless transmission media, active network hardware devices, cable crimping standards, and BECE examination questions.',
    contentMarkdown: `### 1. What is a Computer Network?

A **computer network** is an interconnected collection of autonomous computers, servers, mobile devices, and peripherals linked together by transmission media to share resources, exchange data files, and facilitate communication.

#### Major Benefits of Networking:
- **Resource Sharing:** Sharing expensive hardware (laser printers, scanners, storage servers) among hundreds of users.
- **Centralized Data Management:** Maintaining student records or banking ledgers in one secure central database.
- **Cost Reduction:** Eliminating duplicate hardware purchases and physical paper trails.
- **Instant Communication:** Email, messaging, and video conferencing across branches.

---

### 2. Network Classification by Geographical Scale

1. **PAN (Personal Area Network):** Covers a short range of up to 10 meters around an individual (e.g., connecting a smartphone to Bluetooth wireless earbuds or a smartwatch).
2. **LAN (Local Area Network):** Interconnects computers within a localized building or campus (e.g., a school computer laboratory, an office floor, or a hospital).
3. **MAN (Metropolitan Area Network):** Spans an entire city or metropolitan region (e.g., a state government intranet connecting ministries across Ikeja, Lagos, or automated traffic camera networks).
4. **WAN (Wide Area Network):** Spans across states, countries, continents, or the entire globe (e.g., commercial banking ATM networks connecting Lagos, Kano, and London, and the global **Internet**).

---

### 3. Network Physical Topologies

A network **topology** refers to the geometric arrangement or physical layout of connected computers (nodes) and cables in a network.

\`\`\`
1. STAR TOPOLOGY                        2. BUS TOPOLOGY
        [ Node 1 ]                              [ Node 1 ]      [ Node 2 ]
            |                                       |               |
   [Node 4]-+-[ CENTRAL ]-[ Node 2 ]    ============+===============+============
            | [ SWITCH  ]                 (Terminator)  Trunk Cable   (Terminator)
        [ Node 3 ]                                  |               |
                                                [ Node 3 ]      [ Node 4 ]

3. RING TOPOLOGY                        4. MESH TOPOLOGY
        [ Node 1 ]                              [ Node 1 ]=========== [ Node 2 ]
         /      \\                              ||     \\         /     ||
        v        v                              ||       \\       /      ||
   [Node 4]     [Node 2]                        ||         \\   /       ||
        ^        ^                              ||           X            ||
         \\      /                              ||         /   \\       ||
        [ Node 3 ]                              ||       /       \\      ||
   (Token passes in circle)                     [ Node 4 ]=========== [ Node 3 ]
\`\`\`

| Topology | Operational Mechanism | Key Advantage | Key Disadvantage |
| :--- | :--- | :--- | :--- |
| **Star** | Every node connects directly to a central **Switch or Hub**. | If one cable fails, only that single computer disconnects; rest of network functions normally. | If the central switch fails, the entire network collapses. High cable usage. |
| **Bus** | All nodes connect to a single shared backbone cable with terminators at each end. | Easiest and cheapest to install with minimal cabling. | A break in the central trunk cable brings down the whole network. Collisions increase with users. |
| **Ring** | Data travels unidirectionally from node to node in a closed circular loop. | Orderly token passing prevents data packet collisions. | A failure in any single computer or cable breaks the entire loop. |
| **Mesh** | Every computer has a dedicated point-to-point connection to every other computer. | Ultimate redundancy and zero bottlenecks. | Extremely expensive, complex cabling, and high maintenance. |

---

### 4. Transmission Media: Guided vs. Unguided

#### A. Guided (Wired / Physical) Media:
1. **Twisted Pair Cable:** Two insulated copper wires twisted together to minimize electromagnetic interference (EMI).
   - *UTP (Unshielded Twisted Pair):* Standard Cat5e/Cat6 cables terminated with **RJ-45 plastic modular connectors** used in school computer labs. Cheap, flexible, max length $100\text{ m}$.
   - *STP (Shielded Twisted Pair):* Wrapped in protective metal foil for industrial environments.
2. **Coaxial Cable:** Central solid copper conductor surrounded by insulating dielectric, braided metallic shield, and outer jacket. Used for satellite dish connections (DSTV) and CCTV.
3. **Fiber Optic Cable:** Transmits pulses of light through ultra-pure strands of glass or plastic core using **Total Internal Reflection**.
   - *Advantages:* Immune to electrical noise/lightning, enormous bandwidth (gigabits/terabits per second), low signal attenuation over submarine intercontinental distances.

#### B. Unguided (Wireless) Media:
1. **Radio Waves:** Omnidirectional signals used for Wi-Fi (IEEE 802.11) and cellular GSM mobile communications.
2. **Microwaves:** High-frequency line-of-sight signals transmitted between parabolic dish antenna towers (telecom masts seen across Nigeria).
3. **Infrared:** Short-range line-of-sight transmission (TV remote controls).
4. **Satellite Communication:** Earth ground stations beam signals up to geostationary satellites ($35,786\text{ km}$ above the equator) which rebroadcast them back across wide geographic regions.

---

### 5. Essential Network Hardware Devices

- **Network Interface Card (NIC):** Hardware controller inside every computer containing a permanent, globally unique hardware address known as the **MAC Address**.
- **Switch:** Intelligent device operating at the Data Link layer that receives data packets and inspects the destination MAC address to forward data **only to the intended recipient computer**.
- **Router:** Connects different networks together (e.g., connecting a school LAN to the global Internet WAN). Directs data packets using **IP Addresses**.
- **Modem (Modulator-Demodulator):** Converts digital computer signals into analog signals for transmission over telephone lines or cables, and vice versa.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why is Star topology the most widely implemented network layout in modern computer laboratories?  
*Solution:* Because of its **fault tolerance**: if a single workstation's cable breaks or disconnects, all other computers continue communicating through the central switch without interruption.

**Question 2:** State two major advantages of fiber optic cables over copper twisted pair cables.  
*Solution:*
1. Fiber optic cables transmit data at near the speed of light using light pulses, providing immensely higher data bandwidth.
2. Fiber optic cables are made of glass and are completely immune to electromagnetic interference and lightning strikes.`,
    keyTakeaways: [
      'Networks are classified by geographical scope: PAN (personal), LAN (building), MAN (city), and WAN (global).',
      'Star topology connects all devices to a central switch; Bus uses a common backbone; Ring passes data in a loop.',
      'Guided media include Twisted Pair (UTP/STP), Coaxial, and ultra-high-speed Fiber Optic glass cables.',
      'Routers direct data packets between networks using IP addresses, while switches connect devices on a LAN using MAC addresses.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w4',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'The Internet, World Wide Web (WWW) & Network Protocols',
    subtopics: [
      'Origin and Evolution of the Internet (From ARPANET to Modern Cyberspace)',
      'Basic Internet Terminologies: World Wide Web (WWW), Web Page, Website, Web Browser, Web Server, ISP',
      'Deconstructing the Uniform Resource Locator (URL): Protocol, Domain Name, Subdomain, File Path',
      'IP Addressing: IPv4 (32-bit Dot-Decimal) vs. IPv6 (128-bit Hexadecimal) and the Role of DNS',
      'Core Communication Protocols: HTTP / HTTPS, TCP/IP, FTP, SMTP, POP3, and IMAP',
      'Search Engines vs. Web Portals, and Advanced Search Operators (AND, OR, NOT, Quotes)',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive analysis of the Internet: World Wide Web architecture, URL parsing, IPv4 vs IPv6 addressing, DNS translation mechanisms, transmission protocols (HTTP, HTTPS, TCP/IP), and advanced search operators.',
    contentMarkdown: `### 1. The Internet vs. The World Wide Web

While often used interchangeably, the Internet and the World Wide Web are distinct concepts:
- **The Internet:** The vast global physical infrastructure of interconnected computer networks, submarine optical fiber cables, routers, and satellites spanning the planet. (Origin: ARPANET in 1969 by the US Department of Defense).
- **The World Wide Web (WWW):** A massive collection of multimedia documents, web pages, and resources interconnected by **hyperlinks** that are transmitted over the Internet. (Invented by Sir Tim Berners-Lee in 1989 at CERN).

*Metaphor:* The **Internet** is the physical highway system; the **World Wide Web** is the traffic of cars, trucks, and buses traveling on that highway.

---

### 2. Basic Internet Terminologies

- **Web Page:** An electronic document created using HTML (HyperText Markup Language) containing text, images, audio, video, and hyperlinks.
- **Website:** A collection of related web pages stored under a common domain name on a web server (e.g., \`www.waeconline.org.ng\`).
- **Web Browser:** Client software used to retrieve, render, and view web pages on the Internet (e.g., Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).
- **Web Server:** A high-powered computer connected continuously to the Internet that stores websites and delivers web pages to clients upon request.
- **ISP (Internet Service Provider):** A commercial company licensed to provide Internet access to subscribers (e.g., MTN, Airtel, Glo, Starlink).

---

### 3. Deconstructing a URL (Uniform Resource Locator)

A **URL** is the unique web address used to locate a specific resource on the World Wide Web.

\`\`\`
   https://www.studentcompanion.ng/curriculum/jss3/science.html
   |---|   |----------------------| |-------------------------|
     1               2                            3

   1. Protocol (Scheme): https:// (Hypertext Transfer Protocol Secure)
   2. Domain Name: www.studentcompanion.ng
      - Subdomain: www
      - Second-level Domain: studentcompanion
      - Top-Level Domain (TLD): .ng (Country Code TLD for Nigeria)
   3. File Path & Resource: /curriculum/jss3/science.html
\`\`\`

#### Common Top-Level Domains (TLDs):
- \`.edu\` or \`.sch.ng\`: Educational institutions (universities, secondary schools in Nigeria).
- \`.gov\` or \`.gov.ng\`: Government agencies and ministries.
- \`.org\`: Non-profit organizations and examination boards (e.g., WAEC, NECO).
- \`.com\`: Commercial business enterprises.

---

### 4. IP Addresses & The Domain Name System (DNS)

Every device connected to the Internet is assigned a unique numerical label called an **IP Address (Internet Protocol Address)**:
- **IPv4 (Internet Protocol Version 4):** 32-bit numerical address expressed as four decimal numbers separated by dots (e.g., \`197.210.64.12\`). Provides about $4.3\text{ billion}$ unique addresses.
- **IPv6 (Internet Protocol Version 6):** 128-bit address written in hexadecimal format separated by colons (e.g., \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`). Created to provide trillions of addresses as IPv4 became exhausted.

#### The Domain Name System (DNS):
Because humans cannot easily remember long strings of numbers like \`142.250.190.46\`, the **DNS** serves as the **"phonebook of the Internet"**, automatically translating user-friendly domain names (e.g., \`google.com\`) into computer-readable IP addresses.

---

### 5. Core Internet Protocols

A **protocol** is an agreed-upon set of rules and standards governing the format and transmission of data between computers:
1. **TCP / IP (Transmission Control Protocol / Internet Protocol):** The fundamental suite of protocols powering the entire Internet. TCP breaks data files into small packets and reassembles them at the destination; IP handles packet addressing and routing.
2. **HTTP (HyperText Transfer Protocol):** Transmits unencrypted web page text and multimedia between web servers and browsers (runs on port 80).
3. **HTTPS (HTTP Secure):** Encrypts data transmission using SSL/TLS cryptographic certificates (runs on port 443). Protects bank passwords, credit card numbers, and examination credentials from interception. Indicated by a padlock icon in browser address bars.
4. **FTP (File Transfer Protocol):** Used for uploading and downloading large computer files to and from servers.
5. **SMTP (Simple Mail Transfer Protocol):** Sends outgoing emails between mail servers.
6. **POP3 / IMAP:** Retrieves incoming emails from mail servers to local email client applications.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Explain the difference between HTTP and HTTPS. Why is HTTPS mandatory for online banking and examination registration portals?  
*Solution:* HTTP transmits data in clear, unencrypted text that can be intercepted by hackers. **HTTPS (HTTP Secure)** encrypts all transmitted data using SSL/TLS encryption, ensuring passwords, student bio-data, and credit card numbers remain private and tamper-proof.

**Question 2:** What is the primary function of the Domain Name System (DNS)?  
*Solution:* To translate human-friendly domain names (like \`waeconline.org.ng\`) into machine-readable IP addresses (like \`192.168.1.1\`).`,
    keyTakeaways: [
      'The Internet is the global physical network hardware; the World Wide Web (WWW) is the multimedia information system.',
      'A URL specifies protocol, domain name, and directory path to a specific online resource.',
      'DNS translates human-readable domain names into numerical IP addresses.',
      'HTTPS encrypts web traffic to ensure confidentiality, authenticity, and protection against cyber snooping.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w5',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Digital Safety, Computer Viruses & Cybersecurity Safeguards',
    subtopics: [
      'Concept of Computer Security and Classification of Malicious Software (Malware)',
      'Malware Taxonomies: Viruses, Worms, Trojan Horses, Spyware, Adware, Ransomware, Keyloggers',
      'Sources and Vectors of Computer Infection: Infected USB Flash Drives, Pirated Software, Malicious Attachments',
      'Symptoms of Malware Infection: Slowdown, File Corruption, Frequent Freezing, Spontaneous Pop-ups',
      'Preventive Measures: Antivirus Installation, Signature Updates, Firewalls, Two-Factor Authentication (2FA)',
      'Cyber Crimes in Nigeria: Phishing Scams, Identity Theft, Credit Card Fraud, Cyberbullying, and The Cybercrimes Act',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive cybersecurity education: malware classification, infection vectors, diagnostic symptoms, antivirus defense mechanisms, password hygiene, cybercrime legal frameworks in Nigeria, and BECE examination questions.',
    contentMarkdown: `### 1. Computer Security & Malware

**Computer security** is the branch of technology concerned with safeguarding computer hardware, software programs, networks, and digital data from unauthorized access, theft, alteration, damage, or accidental destruction.

#### What is Malware?
**Malware** (short for *Malicious Software*) is any intrusive program code deliberately developed by cybercriminals to damage, disrupt, exploit, or gain unauthorized control over computer systems.

---

### 2. Major Classifications of Malware

1. **Computer Virus:** A parasitic program that attaches itself to legitimate executable files or documents. It requires **human action to spread** (e.g., launching an infected program or sharing an infected file). Once executed, it replicates itself and corrupts files.
2. **Computer Worm:** A standalone malicious program that replicates and spreads automatically across computer networks **without human intervention**, consuming vast network bandwidth.
3. **Trojan Horse:** A deceptive program masquerading as a useful, safe application (e.g., a free computer game or utility) that secretly installs backdoor malware to steal user passwords.
4. **Spyware & Keyloggers:** Covert software that monitors user activities, tracks keystrokes, and records credit card numbers and passwords, transmitting them secretly to external hackers.
5. **Ransomware:** Highly dangerous malware that encrypts all user files and photos, locking the victim out and demanding exorbitant ransom payments (often in cryptocurrency) to restore access.

---

### 3. Symptoms of Malware Infection

A computer compromised by malware typically exhibits observable behavioral symptoms:
- Sudden and extreme system performance degradation (system becomes abnormally sluggish).
- Frequent and unexplained computer crashes, blue screen errors, or sudden reboots.
- Mysterious disappearance or corruption of stored documents and folders.
- Inability to launch installed programs or the Windows Task Manager.
- Annoying promotional pop-up advertisements appearing on screen even when offline.
- Unusual high network bandwidth consumption when no applications are actively running.

---

### 4. Preventive Cybersecurity Measures

\`\`\`
                      CYBER DEFENSE IN DEPTH
   +-----------------------------------------------------------+
   | 1. STRONG AUTHENTICATION: Complex passwords + 2FA / OTP   |
   +-----------------------------------------------------------+
   | 2. ANTIVIRUS PROTECTION: Real-time scan + Regular updates |
   +-----------------------------------------------------------+
   | 3. NETWORK FIREWALL: Blocks unauthorized port access      |
   +-----------------------------------------------------------+
   | 4. BACKUP DISCIPLINE: 3-2-1 Offline & Cloud data copies   |
   +-----------------------------------------------------------+
   | 5. USER AWARENESS: Never click suspicious email links     |
   +-----------------------------------------------------------+
\`\`\`

1. **Antivirus Software:** Programs designed to detect, quarantine, and eliminate malware (e.g., Windows Defender, Norton, Kaspersky, Avast). **Must be updated regularly** with the latest virus definition databases to recognize newly emerging malware strains.
2. **Software Firewalls:** Network security barriers that monitor incoming and outgoing traffic, blocking unauthorized access requests.
3. **Two-Factor Authentication (2FA):** Requiring both a password and a secondary temporary verification code (OTP sent via SMS or authenticator app) before granting access.
4. **Password Hygiene:** Using strong passwords comprising at least 12 characters combining uppercase letters, lowercase letters, numbers, and symbols (e.g., \`Tr0p!c@l#2026\`). Never use obvious personal details like birthdates or phone numbers.
5. **Data Backup (The 3-2-1 Rule):** Keep 3 copies of important data on 2 different media formats, with 1 copy stored offsite or in cloud storage (e.g., Google Drive).

---

### 5. Cyber Crimes & Nigerian Cyber Law

- **Phishing:** Fraudulent emails or counterfeit websites designed to impersonate legitimate banks or examination portals to trick victims into revealing sensitive login passwords and PINs.
- **Identity Theft:** Stealing someone's personal credentials (NIN, BVN, photo) to commit financial fraud or impersonate them online.
- **Advance Fee Fraud (419 / Yahoo-Yahoo):** Deceptive promises of lucrative financial returns requiring victims to pay upfront clearance fees.
- **The Cybercrimes (Prohibition, Prevention, etc.) Act of Nigeria (2015):** The official federal statute providing legal frameworks for prosecuting cybercriminals, prescribing severe penalties, hefty fines, and lengthy prison terms for hacking, identity theft, child exploitation, and cyber-terrorism.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Differentiate between a Computer Virus and a Computer Worm.  
*Solution:* A **Virus** requires human action (such as opening an infected file or executing a program) to replicate and spread, whereas a **Worm** is an autonomous program that spreads automatically across computer networks without human assistance.

**Question 2:** Explain the term 'Phishing' and state one practical way a secondary school student in Nigeria can avoid falling victim to it.  
*Solution:* Phishing is a social engineering attack where fraudsters send deceptive emails or messages impersonating reputable institutions (like banks or WAEC) to steal passwords and financial details. Students can protect themselves by **never clicking on suspicious links** and always inspecting the exact URL domain in the browser address bar before entering passwords.`,
    keyTakeaways: [
      'Malware encompasses viruses, worms, trojans, spyware, adware, and extortionate ransomware.',
      'Viruses require human execution to spread, whereas worms self-replicate autonomously across networks.',
      'Effective cyber defense combines real-time updated antivirus software, strong passwords, 2FA, and regular backups.',
      'The Cybercrimes Act of Nigeria criminalizes unauthorized computer access, phishing, and digital identity fraud.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w6',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Continuous Assessment & Diagnostic Test',
    subtopics: [
      'Comprehensive Review of Weeks 1 to 5 Syllabus Topics',
      '15 Multi-Choice BECE Diagnostic Examination Questions with Detailed Solutions',
      'Section B: 3 Structured Practical Theory Problems with Marking Guide',
      'Diagnostic Error Analysis, Syntax Debugging, and Score Benchmarking'
    ],
    readingTimeMinutes: 16,
    summary: 'Standardized 15-question objective diagnostic examination and 3 structured theory problems with complete marking rubric evaluating Weeks 1 to 5: spreadsheets, databases, computer networking, Internet protocols, and cybersecurity.',
    contentMarkdown: `### 1. Mid-Term Assessment Overview & Instructions

- **Time Allowed:** 45 minutes
- **Structure:**
  - Section A: 15 Multi-Choice Questions (15 Marks)
  - Section B: 3 Structured Theory Problems (15 Marks)
  - Total: 30 Marks

---

### Section A: 15 BECE Objective Questions & Step-by-Step Solutions

**1.** The basic unit for storing data in an electronic spreadsheet formed by the intersection of a column and row is called:  
A. Coordinate  
B. Cell  
C. Ledger  
D. Record  
*Answer:* **B (Cell)**.

**2.** By default, numeric values entered into a spreadsheet cell are aligned to the:  
A. Left  
B. Center  
C. Right  
D. Justified  
*Answer:* **C (Right)**. Text labels align to the left; numeric values align to the right.

**3.** What is the correct formula to calculate the average of numbers in cells A1 through A10?  
A. \`=MEAN(A1:A10)\`  
B. \`=AVERAGE(A1:A10)\`  
C. \`=SUM(A1:A10)/COUNT\`  
D. \`AVERAGE(A1..A10)\`  
*Answer:* **B (\`=AVERAGE(A1:A10)\`)**. Must begin with \`=\` and use the standard function name.

**4.** In a database table, a horizontal row containing all related details about a single student is termed a:  
A. Field  
B. Record  
C. Key  
D. Form  
*Answer:* **B (Record / Tuple)**.

**5.** Which field data type should be selected for storing student school fees in a database table?  
A. Short Text  
B. AutoNumber  
C. Currency  
D. Long Text  
*Answer:* **C (Currency)**.

**6.** A primary key in a database table:  
A. Can contain duplicate values  
B. Uniquely identifies each record  
C. Can be left empty (Null)  
D. Must always be text only  
*Answer:* **B (Uniquely identifies each record)**.

**7.** A computer network spanning a single school compound or office building is classified as a:  
A. WAN  
B. MAN  
C. LAN  
D. PAN  
*Answer:* **C (LAN - Local Area Network)**.

**8.** Which network topology connects all computers to a single central switch or hub?  
A. Bus topology  
B. Star topology  
C. Ring topology  
D. Mesh topology  
*Answer:* **B (Star topology)**.

**9.** The physical transmission medium that carries data using light pulses through glass fibers is:  
A. Unshielded Twisted Pair  
B. Coaxial cable  
C. Fiber Optic cable  
D. Telephone wire  
*Answer:* **C (Fiber Optic cable)**.

**10.** Which component in a Uniform Resource Locator indicates the top-level domain for Nigerian organizations?  
A. \`.com\`  
B. \`.org.ng\`  
C. \`.uk\`  
D. \`.html\`  
*Answer:* **B (\`.org.ng\`)**.

**11.** The protocol used to transmit encrypted, secure web pages in online banking is:  
A. HTTP  
B. FTP  
C. HTTPS  
D. SMTP  
*Answer:* **C (HTTPS - Hypertext Transfer Protocol Secure)**.

**12.** What is the function of the Domain Name System (DNS)?  
A. Formats text on web pages  
B. Translates domain names into IP addresses  
C. Sends electronic mail  
D. Scans computers for viruses  
*Answer:* **B (Translates domain names into IP addresses)**.

**13.** Malicious software that replicates and spreads across computer networks automatically without human intervention is a:  
A. Virus  
B. Worm  
C. Trojan  
D. Adware  
*Answer:* **B (Computer Worm)**.

**14.** A deceptive email pretending to originate from a bank asking the recipient to click a link and confirm their ATM PIN is an example of:  
A. Hacking  
B. Phishing  
C. Spooling  
D. Sniffing  
*Answer:* **B (Phishing)**.

**15.** To protect computer systems from newly emerging viruses, antivirus software must be:  
A. Uninstalled regularly  
B. Updated frequently with latest virus signatures  
C. Replaced with games  
D. Kept offline permanently  
*Answer:* **B**. Regular signature updates enable detection of new threats.

---

### Section B: 3 Structured Practical Theory Problems

#### Question 1 (Spreadsheet Computations):
A JSS 3 teacher recorded CA test scores in column B (B2 to B11) and Exam scores in column C (C2 to C11).
(a) Write the exact formula to compute the total score for the first student in cell D2. *(1 Mark)*  
(b) Write the formula to find the highest total score in the class in cell D12. *(2 Marks)*  
(c) Write the formula to compute the average total score of the 10 students in cell D13. *(2 Marks)*

*Model Solution:*  
(a) \`=SUM(B2:C2)\` or \`=B2+C2\`  
(b) \`=MAX(D2:D11)\`  
(c) \`=AVERAGE(D2:D11)\`

#### Question 2 (Computer Networking Design):
(a) State two advantages and one disadvantage of the Star network topology for a school computer laboratory. *(3 Marks)*  
(b) Name the hardware device used to connect multiple computers together in a local area network. *(1 Mark)*  
(c) Identify the connector used at the end of a Cat5e UTP network cable. *(1 Mark)*

*Model Solution:*  
(a)
- *Advantages:*
  1. Fault tolerance: If one workstation cable disconnects, the rest of the network remains operational.
  2. Easy to troubleshoot and expand by plugging new cables into the switch.
- *Disadvantage:* If the central switch fails, the entire network fails.  
(b) **Network Switch** (or Hub).  
(c) **RJ-45 connector**.

#### Question 3 (Database Architecture & Security):
(a) Differentiate between a Primary Key and a Foreign Key in relational database design. *(3 Marks)*  
(b) State two effective password habits a student should adopt to safeguard their online examination portal account. *(2 Marks)*

*Model Solution:*  
(a) A **Primary Key** is a unique field that identifies each record in its own table without duplicates, while a **Foreign Key** is a field in a secondary table that references the primary key of another table to link both tables relationally.  
(b)
1. Use a strong password containing at least 12 characters combining uppercase, lowercase, numbers, and special symbols.
2. Never share passwords with friends or write them down near computer terminals, and change them periodically.`,
    keyTakeaways: [
      'Diagnostic continuous assessment reinforces spreadsheet formulas, database normalization, and network topology analysis.',
      'Precision in syntax (starting formulas with =) is essential for valid computer calculations.',
      'Cybersecurity hygiene requires understanding malware vectors and applying multi-layered defenses.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w7',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Computer Programming: Problem Solving, Algorithms & Flowcharts',
    subtopics: [
      'Concept of Computer Programming and Programming Language Generations (1GL to 5GL)',
      'The Program Development Life Cycle: Problem Definition, Algorithm Design, Coding, Debugging, Testing & Maintenance',
      'Algorithms: Definition, Properties of Good Algorithms (Finiteness, Definiteness, Input, Output, Effectiveness)',
      'Standard ANSI Flowchart Symbols: Terminal, Input/Output, Process, Decision, Connector, Flowline',
      'Step-by-Step Construction of Flowcharts for Mathematical Problem Solving',
      'Tracing and Dry-Running Algorithms to Detect Logic Errors',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Foundations of computer software engineering: programming language generations, systematic problem analysis, algorithmic pseudocode writing, ANSI flowcharting standards, dry-run tracing tables, and BECE examination questions.',
    contentMarkdown: `### 1. What is Computer Programming?

A **computer program** is an organized sequence of instructions written in a specialized programming language that directs a computer's central processing unit (CPU) to perform a specific task or solve a defined problem.
**Computer programming** is the comprehensive process of designing, writing, testing, debugging, and maintaining that source code.

#### Generations of Programming Languages:
1. **First Generation (1GL) - Machine Language:** Written in raw binary code (0s and 1s). The only language the CPU executes directly. Extremely difficult for humans.
2. **Second Generation (2GL) - Assembly Language:** Uses short mnemonic abbreviations (e.g., \`ADD\`, \`SUB\`, \`MOV\`, \`JMP\`). Requires an **Assembler** to translate into machine code.
3. **Third Generation (3GL) - High-Level Languages:** Uses English-like words and mathematical symbols (e.g., QBASIC, C, Pascal, Java, Python). Requires a **Compiler** or **Interpreter**.
4. **Fourth Generation (4GL):** Non-procedural languages focused on what output is needed rather than step-by-step algorithms (e.g., SQL for database queries).
5. **Fifth Generation (5GL):** Languages designed for artificial intelligence, expert systems, and natural language processing.

---

### 2. Algorithms in Problem Solving

An **algorithm** is a finite, step-by-step sequence of well-defined, unambiguous instructions designed to solve a specific computational problem or accomplish a specific task.

#### Five Fundamental Properties of a Good Algorithm:
1. **Finiteness:** Must terminate after a finite number of executable steps.
2. **Definiteness:** Every individual instruction must be clear, precise, and unambiguous.
3. **Input:** Must accept zero or more valid inputs.
4. **Output:** Must produce at least one defined output result.
5. **Effectiveness:** Every operation must be feasible and basic enough to be performed correctly.

#### Algorithm Example: Calculate Area and Perimeter of a Rectangle
\`\`\`
Step 1: Start
Step 2: Input the Length (L) and Width (W)
Step 3: Calculate Area = L * W
Step 4: Calculate Perimeter = 2 * (L + W)
Step 5: Output (Display) Area and Perimeter
Step 6: Stop
\`\`\`

---

### 3. Flowcharts & Standard ANSI Symbols

A **flowchart** is a graphical representation of an algorithm using standardized geometrical shapes connected by directional arrows (flowlines) to depict the logical flow of execution.

| Symbol Name | Geometrical Shape | Meaning & Function in Flowchart |
| :--- | :---: | :--- |
| **Terminal** | Rounded Oval / Capsule | Indicates the **START** or **STOP** (End) of the program. |
| **Input / Output** | Parallelogram | Represents entering data (e.g., \`READ L, W\`) or displaying results (\`PRINT Area\`). |
| **Process** | Rectangle | Represents computational calculations, arithmetic operations, or variable assignments (\`Area = L * W\`). |
| **Decision** | Diamond / Rhombus | Represents a logical condition testing with two alternative exit paths (**True/Yes** or **False/No**). |
| **Flowline** | Arrow ($\\longrightarrow, \\downarrow$) | Indicates the direction of program execution sequence. |
| **Connector** | Small Circle ($\\bigcirc$) | Connects separate flowline paths on the same page. |

---

### 4. Step-by-Step Flowchart Example: Determining Even or Odd Number

\`\`\`
                    ( START )
                        |
                        v
                 [/ INPUT N /]
                        |
                        v
                 < N MOD 2 = 0? >
                     /      \\
              YES   /        \\   NO
                   v          v
          [/ PRINT "Even" /]  [/ PRINT "Odd" /]
                   \\          /
                    \\        /
                     v        v
                     (  STOP  )
\`\`\`

---

### 5. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** State the meaning and geometric shape used for an Input/Output operation in a flowchart.  
*Solution:* The shape is a **parallelogram**. It represents entering data into the computer (e.g., \`INPUT A, B\`) or printing/displaying results on the screen.

**Question 2:** Why must every valid algorithm satisfy the property of 'Finiteness'?  
*Solution:* If an algorithm is not finite, it will loop indefinitely (infinite loop), causing the computer program to hang without ever producing an answer or terminating.`,
    keyTakeaways: [
      'An algorithm is a finite, step-by-step sequence of unambiguous instructions for solving a problem.',
      'Standard flowchart symbols include Oval (Start/Stop), Parallelogram (I/O), Rectangle (Process), and Diamond (Decision).',
      'High-level programming languages (3GL) like BASIC and Python use English-like syntax translated by compilers/interpreters.',
      'Flowcharts visually trace algorithmic logic, aiding error detection and software documentation.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w8',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Introduction to BASIC Programming: Syntax, Variables & Statements',
    subtopics: [
      'Overview of BASIC (Beginner\'s All-purpose Symbolic Instruction Code) and the QBASIC Environment',
      'BASIC Character Set, Constants (Numeric vs. String), and Variable Naming Rules',
      'Fundamental BASIC Statements: CLS, REM, PRINT, INPUT, LET, and END',
      'Relational and Logical Operators in BASIC: =, <>, <, >, <=, >=, AND, OR, NOT',
      'Conditional Control Structures: IF...THEN and IF...THEN...ELSE Branching',
      'Writing Complete QBASIC Programs: Area Calculations, Simple Interest & Student Pass/Fail Grading',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive hands-on programming with QBASIC: syntax rules, variable declaration, input/output statements, conditional branching, complete runnable code listings for mathematical problems, and BECE examination questions.',
    contentMarkdown: `### 1. Introduction to BASIC Programming

**BASIC** stands for **B**eginner's **A**ll-purpose **S**ymbolic **I**nstruction **C**ode. Developed in 1964 by John Kemeny and Thomas Kurtz at Dartmouth College, it remains the standard foundational programming language taught in the Nigerian secondary school national curriculum.
**QBASIC (QuickBASIC):** A structured, user-friendly interpreter environment featuring an integrated source code editor, automatic syntax checking, and instant execution.

---

### 2. Variables and Constants in BASIC

- **Constant:** A data value that remains fixed and unchanging throughout program execution (e.g., $3.142$, $100$, \`"Lagos"\`).
- **Variable:** A named memory location whose stored value can change during program execution.

#### Types of Variables:
1. **Numeric Variables:** Store numbers used in calculations.
   - Example: \`AGE\`, \`SCORE\`, \`RADIUS\`, \`LENGTH\`
2. **String Variables:** Store text, alphanumeric characters, and symbols enclosed in quotation marks. **MUST ALWAYS terminate with a dollar sign ($)**.
   - Example: \`STUDENTNAME$\`, \`STATE$\`, \`GRADE$\`

#### Rules for Naming Variables in BASIC:
- Must begin with an alphabet letter ($A-Z$).
- Can contain letters and digits, but no spaces or punctuation marks (except the ending \`$\` for strings).
- Must not be a reserved QBASIC keyword (e.g., cannot name a variable \`PRINT\` or \`INPUT\`).
- Ideally descriptive (e.g., \`TOTALSCORE\` rather than \`X\`).

---

### 3. Fundamental BASIC Statements

1. **\`REM\` (Remark):** Used for adding explanatory comments and documentation. Ignored by the computer during execution.
   \`REM Program to calculate Area of a Circle\`
2. **\`CLS\` (Clear Screen):** Clears the output monitor screen before displaying new program results.
3. **\`PRINT\`:** Outputs text messages, variable values, and computational results onto the monitor screen.
   \`PRINT "Hello, Nigerian Student!"\`
4. **\`INPUT\`:** Pauses execution and prompts the user to enter data from the keyboard into variables.
   \`INPUT "Enter your age: ", AGE\`
5. **\`LET\`:** Assigns a value or calculation result to a variable (the keyword \`LET\` is optional in modern QBASIC).
   \`LET AREA = LENGTH * WIDTH\` or simply \`AREA = LENGTH * WIDTH\`
6. **\`END\`:** Terminates the program execution cleanly.

---

### 4. Conditional Branching: \`IF...THEN...ELSE\`

Enables the program to make decisions based on whether a condition evaluates to **True** or **False**:

\`\`\`
IF condition THEN
    statements (executed if condition is True)
ELSE
    statements (executed if condition is False)
END IF
\`\`\`

---

### 5. Complete Worked QBASIC Program Listings

#### Program 1: Calculate Simple Interest ($I = \frac{P \times R \times T}{100}$)
\`\`\`
10 CLS
20 REM Program to Compute Simple Interest in Naira
30 PRINT "==========================================="
40 PRINT "    SIMPLE INTEREST COMPUTATION SYSTEM     "
50 PRINT "==========================================="
60 INPUT "Enter Principal amount (Naira): ", P
70 INPUT "Enter Annual Interest Rate (%): ", R
80 INPUT "Enter Time Duration (Years): ", T
90 LET SI = (P * R * T) / 100
100 PRINT "-------------------------------------------"
110 PRINT "Simple Interest Earned = N"; SI
120 PRINT "Total Amount Payable   = N"; (P + SI)
130 END
\`\`\`

#### Program 2: Student Examination Pass/Fail Evaluation
\`\`\`
10 CLS
20 REM JSS 3 BECE Exam Grading Program
30 INPUT "Enter Student Name: ", SNAME$
40 INPUT "Enter Basic Science Score (0 - 100): ", SCORE
50 IF SCORE >= 50 THEN
60     PRINT SNAME$; " PASSED with a score of "; SCORE; "%"
70 ELSE
80     PRINT SNAME$; " FAILED with a score of "; SCORE; "%"
90 END IF
100 END
\`\`\`

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** What symbol must be appended to the end of a string variable name in BASIC?  
*Solution:* The **dollar sign ($)** (e.g., \`NAME$\`).

**Question 2:** Identify the error in the following BASIC statement: \`10 INPUT Enter radius, R\`  
*Solution:* The prompt text message must be enclosed in **double quotation marks**:  
\`10 INPUT "Enter radius: ", R\``,
    keyTakeaways: [
      'BASIC (Beginner’s All-purpose Symbolic Instruction Code) is a classic educational programming language.',
      'Numeric variables store numbers; string variables store text and must end with a dollar sign ($).',
      'Core statements include CLS (clear screen), INPUT (data entry), PRINT (display), and END (terminate).',
      'IF...THEN...ELSE structures enable programs to make logical decisions based on condition evaluations.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w9',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Graphics Packages & Digital Presentation Software',
    subtopics: [
      'Definition of Graphics Packages and Distinction between Vector and Raster (Bitmap) Graphics',
      'Common Graphics Packages: CorelDraw, Adobe Photoshop, Paint, Adobe Illustrator',
      'Core Features of Graphic Editing Environments: Toolbox, Color Palette, Layers, Canvas, Zoom',
      'Image File Formats: JPEG, PNG, GIF, BMP, TIFF, SVG (Compression & Transparency Features)',
      'Digital Presentation Software (Microsoft PowerPoint, Google Slides): Interface, Slides, Templates',
      'Creating Professional Presentations: Slide Transitions, Custom Animations, Slide Shows',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering digital creative media: vector vs raster graphics, graphic design toolboxes, image file formats, Microsoft PowerPoint slide design, animations, slide transitions, and BECE examination questions.',
    contentMarkdown: `### 1. Vector vs. Raster Graphics

A **graphics package** is application software designed to create, edit, manipulate, and export visual images, diagrams, illustrations, and photographic artwork on a computer.

| Parameter | Vector Graphics (e.g., CorelDraw, Illustrator) | Raster / Bitmap Graphics (e.g., Photoshop, Paint) |
| :--- | :--- | :--- |
| **Composition** | Mathematical formulas defining lines, curves, shapes, and anchor points | A fixed grid of tiny colored picture elements called **pixels** |
| **Scaling** | **Infinite Scalability:** Can be enlarged to billboard size without any loss of quality or sharpness | **Pixelation:** Enlarging causes visible jagged edges and blurriness |
| **File Size** | Relatively small file sizes | Larger file sizes, proportional to image resolution |
| **Best Used For** | Logos, technical diagrams, engineering blueprints, typographic art | Real-world photographs, complex digital paintings |

---

### 2. Common Image File Formats

- **JPEG / JPG (Joint Photographic Experts Group):** Lossy compression format ideal for real-world digital photographs. Small file size, supports millions of colors, but **does not support transparency**.
- **PNG (Portable Network Graphics):** Lossless compression format. **Supports transparent backgrounds**; standard for website logos, buttons, and icons.
- **GIF (Graphics Interchange Format):** Supports simple frame-by-frame animations, limited to 256 colors.
- **SVG (Scalable Vector Graphics):** XML-based vector format for responsive web icons that scale infinitely without quality degradation.

---

### 3. Presentation Packages (Microsoft PowerPoint)

A **presentation package** is software used to organize ideas, text, bullet points, charts, images, and multimedia into dynamic, sequential visual slides for public lectures, business pitches, and classroom teaching.

#### Interface Anatomy:
- **Slide:** A single page of a presentation.
- **Slide Pane:** The central working canvas where text, shapes, and images are arranged.
- **Slide Sorter:** Overview view displaying thumbnails of all slides for easy reordering.
- **Slide Transition:** The visual motion effect that occurs when transitioning from one slide to the next during a slide show (e.g., Fade, Wipe, Push).
- **Custom Animation:** Visual and sound motion effects applied to individual elements *within* a slide (e.g., bullet points flying in one by one).

---

### 4. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why is vector graphics preferred over raster graphics for designing school logos and billboard banners?  
*Solution:* Vector graphics are based on mathematical paths rather than fixed pixels; they can be scaled up to billboard size **without any pixelation or loss of clarity**.

**Question 2:** What is the difference between a Slide Transition and a Custom Animation in Microsoft PowerPoint?  
*Solution:* A **Slide Transition** is the animated effect applied between full slides when advancing, whereas a **Custom Animation** is the motion effect applied to specific text, shapes, or images *on a single slide*.`,
    keyTakeaways: [
      'Vector graphics scale infinitely without loss of clarity; raster graphics are pixel-based and degrade when enlarged.',
      'PNG supports transparent backgrounds; JPEG provides compact photo compression without transparency.',
      'Presentation software organizes content into slides enhanced with slide transitions and custom animations.',
      'Slide transitions apply between consecutive slides; animations apply to individual objects on a single slide.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w10',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Career Opportunities in ICT & Emerging Technology Trends',
    subtopics: [
      'Professional Career Paths in Computing: Software Developers, Network Administrators, DBAs, Cybersecurity Experts',
      'Computer Hardware Technicians, UI/UX Designers, Data Analysts, and Cloud Engineers',
      'Professional Computing Bodies in Nigeria: CPN (Computer Professionals Registration Council), NCS (Nigeria Computer Society)',
      'Emerging Technologies Shaping the Future: Artificial Intelligence (AI) and Machine Learning',
      'Cloud Computing (AWS, Google Cloud, Azure), Internet of Things (IoT), and Robotics',
      'Blockchain Technology, Smart Contracts, and Cryptography Foundations',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive overview of computing careers: job roles, Nigerian professional associations (CPN, NCS), and frontier technologies transforming the 21st century: AI, cloud systems, IoT, robotics, and blockchain.',
    contentMarkdown: `### 1. Professional Career Opportunities in ICT

The rapid digital transformation of the Nigerian and global economy has created high-demand professional computing careers:

1. **Software Developer / Programmer:** Writes, debugs, and maintains source code for mobile apps, web applications, and enterprise systems.
2. **Database Administrator (DBA):** Designs, manages, secures, and optimizes database systems (e.g., maintaining banking transaction databases or national identity records).
3. **Network Engineer / Administrator:** Designs, installs, cables, and configures local area networks, routers, switches, and server infrastructure.
4. **Cybersecurity Analyst:** Defends computer networks and servers against hacking, malware incursions, phishing, and digital identity theft.
5. **Computer Hardware Technician:** Diagnoses, repairs, upgrades, and maintains physical computer components (CPUs, motherboards, RAM, power supplies).
6. **Data Analyst / Data Scientist:** Inspects, cleans, models, and interprets complex datasets to identify trends that guide strategic organizational decisions.

---

### 2. Professional Bodies in Nigeria

- **CPN (Computer Professionals Registration Council of Nigeria):** Established by Decree No. 49 of 1993 (now Act 49) as the official regulatory council for the control and regulation of the computing profession in Nigeria.
- **NCS (Nigeria Computer Society):** The umbrella association of all computing and information technology professionals, academics, and corporate bodies in Nigeria.

---

### 3. Emerging Technologies Transforming the 21st Century

1. **Artificial Intelligence (AI) & Machine Learning:** The science of training computer systems and algorithms to perform tasks that typically require human intelligence, such as visual image recognition, natural language translation, speech transcription, and medical diagnosis.
2. **Cloud Computing:** Delivering computing services—including servers, storage, databases, networking, and software—over the Internet ("the cloud") on a pay-as-you-go basis (e.g., Google Cloud, AWS, Microsoft Azure).
3. **Internet of Things (IoT):** The billions of physical devices around the world connected to the Internet, collecting and sharing sensor data (e.g., smart home security cameras, automated irrigation sensors on Nigerian farms).
4. **Robotics:** The intersection of mechanical engineering, computer science, and AI that designs autonomous robotic machines to perform dangerous or repetitive tasks (e.g., automated car assembly, bomb disposal).
5. **Blockchain:** A decentralized, distributed digital ledger technology that records transactions securely across multiple computers so that records cannot be altered retroactively (the backbone of cryptocurrencies and secure supply chains).

---

### 4. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** What is the full meaning of CPN in Nigerian computer professional regulation?  
*Solution:* **Computer Professionals Registration Council of Nigeria**.

**Question 2:** Explain the term 'Cloud Computing' and give two everyday examples used by students.  
*Solution:* Cloud computing is the delivery of computing services (storage, servers, software) over the Internet without requiring local hard drives. Examples include **Google Drive** for file storage and **Google Classroom** for online study.`,
    keyTakeaways: [
      'ICT careers include Software Developers, Database Administrators, Network Engineers, and Cybersecurity Analysts.',
      'The Computer Professionals Registration Council of Nigeria (CPN) officially regulates the IT profession in Nigeria.',
      'Artificial Intelligence enables computer software to perform tasks requiring human-like cognitive pattern recognition.',
      'Cloud computing delivers on-demand storage and computing services globally over the Internet.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  },
  {
    id: 'jss3-comp-t2-w11-12',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Termly Examination & Mock BECE Simulation',
    subtopics: [
      'Complete Second Term Syllabus Evaluation (Weeks 1 to 10)',
      '20 Comprehensive Multi-Choice BECE Examination Questions with Exhaustive Explanations',
      'Section B: 4 Extended Practical Theory, Coding & Essay Questions with Marking Rubrics',
      'Final BECE Examination Performance Benchmarking and Error Diagnosis'
    ],
    readingTimeMinutes: 18,
    summary: 'Comprehensive mock BECE terminal examination consisting of 20 multiple-choice questions with step-by-step rationales and 4 extended practical/coding essay problems covering the complete JSS 3 2nd term Computer Studies syllabus.',
    contentMarkdown: `### 1. Mock BECE Examination Instructions

- **Time Allowed:** 1 hour 30 minutes
- **Structure:**
  - Section A: 20 Objective Multi-Choice Questions (40 Marks)
  - Section B: 4 Structured Essay & Coding Questions (40 Marks)
  - Continuous Assessment Score: (20 Marks)
  - Total: 100 Marks

---

### Section A: 20 BECE Multi-Choice Objective Questions

**1.** The cell address representing the intersection of column D and row 7 is:  
A. 7D  
B. D7  
C. D:7  
D. $7$D  
*Rationale:* **B (D7)**. Standard cell referencing always lists the column letter first followed by row number.

**2.** In a spreadsheet, which of the following is a built-in statistical function?  
A. \`TOTAL\`  
B. \`SUM\`  
C. \`PLUS\`  
D. \`ADD\`  
*Rationale:* **B (\`SUM\`)**. \`=SUM()\` is the standard function.

**3.** What is the result of entering \`= 10 + 5 * 2\` in an Excel cell?  
A. 30  
B. 20  
C. 25  
D. 15  
*Rationale:* **B (20)**. Order of precedence evaluates multiplication before addition: $5 \times 2 = 10$, then $10 + 10 = 20$.

**4.** A collection of related fields describing a single complete entity in a database is a:  
A. File  
B. Record  
C. Table  
D. Attribute  
*Rationale:* **B (Record)**.

**5.** A field that uniquely identifies each record in a database table without duplicates is the:  
A. Secondary key  
B. Foreign key  
C. Primary key  
D. Alternate key  
*Rationale:* **C (Primary key)**.

**6.** A computer network that connects devices within an individual person's workspace up to 10 meters is a:  
A. LAN  
B. MAN  
C. PAN  
D. WAN  
*Rationale:* **C (PAN - Personal Area Network)**.

**7.** Which network topology has all computers connected directly to a central hub or switch?  
A. Bus  
B. Star  
C. Ring  
D. Mesh  
*Rationale:* **B (Star topology)**.

**8.** The connector attached to the ends of a Cat6 UTP network cable is:  
A. BNC  
B. RJ-11  
C. RJ-45  
D. USB  
*Rationale:* **C (RJ-45)**.

**9.** High-speed broadband transmission using total internal reflection of light pulses utilizes:  
A. Coaxial cables  
B. Fiber optic cables  
C. Twisted pair cables  
D. Copper wires  
*Rationale:* **B (Fiber optic cables)**.

**10.** In the URL \`https://www.jamb.gov.ng\`, what does \`.gov.ng\` signify?  
A. Commercial Nigerian entity  
B. Government agency in Nigeria  
C. School portal  
D. International organization  
*Rationale:* **B (Government agency in Nigeria)**.

**11.** Which protocol is responsible for translating human-friendly domain names into IP addresses?  
A. HTTP  
B. FTP  
C. DNS  
D. SMTP  
*Rationale:* **C (DNS - Domain Name System)**.

**12.** Standalone malicious software that replicates and travels automatically across computer networks without human action is a:  
A. Trojan horse  
B. Computer worm  
C. Macro virus  
D. Keylogger  
*Rationale:* **B (Computer worm)**.

**13.** The fraudulent practice of sending fake emails masquerading as reputable institutions to steal passwords is:  
A. Hacking  
B. Phishing  
C. Cracking  
D. Snooping  
*Rationale:* **B (Phishing)**.

**14.** In a flowchart, which geometrical symbol represents a conditional decision test?  
A. Rectangle  
B. Parallelogram  
C. Diamond  
D. Oval  
*Rationale:* **C (Diamond)**.

**15.** Which of the following is a valid string variable in QBASIC?  
A. \`NAME\`  
B. \`STUDENT$\`  
C. \`$SCORE\`  
D. \`VALUE#\`  
*Rationale:* **B (\`STUDENT$\`)**. String variables must end with a dollar sign.

**16.** What is the purpose of the \`CLS\` statement in QBASIC?  
A. Closes files  
B. Clears the monitor output screen  
C. Terminates execution  
D. Calculates sums  
*Rationale:* **B (Clears the screen)**.

**17.** Which graphics format supports transparent backgrounds?  
A. JPEG  
B. BMP  
C. PNG  
D. TIFF  
*Rationale:* **C (PNG)**.

**18.** The visual effect that occurs when transitioning from one slide to the next in Microsoft PowerPoint is a:  
A. Custom animation  
B. Slide transition  
C. Motion path  
D. Slide sorter  
*Rationale:* **B (Slide transition)**.

**19.** The official regulatory council for computing professionals in Nigeria established by law is:  
A. NCC  
B. CPN  
C. NITDA  
D. NBC  
*Rationale:* **B (CPN - Computer Professionals Registration Council of Nigeria)**.

**20.** Delivering on-demand computing services and file storage over the Internet without local servers is:  
A. Robotics  
B. Cloud Computing  
C. Bluetooth  
D. Dial-up  
*Rationale:* **B (Cloud Computing)**.

---

### Section B: 4 Extended Practical Theory & Coding Questions

#### Question 1 (Spreadsheets & Formulas):
A student examination ledger in Excel has the following scores:
- Mathematics score in cell B2 ($75$)
- English score in cell C2 ($80$)
- Basic Science score in cell D2 ($85$)
(a) Write the exact formula to compute the total score in cell E2. *(2 Marks)*  
(b) Write the formula to compute the average score across the three subjects in cell F2. *(2 Marks)*  
(c) Write a single formula using the \`MAX\` function to find the highest score among the three subjects in cell G2. *(2 Marks)*  
(d) Explain what happens if cell B2 is updated from $75$ to $90$. *(4 Marks)*

*Model Solution:*  
(a) \`=SUM(B2:D2)\` or \`=B2+C2+D2\`  
(b) \`=AVERAGE(B2:D2)\`  
(c) \`=MAX(B2:D2)\`  
(d) Because spreadsheets feature **automatic recalculation**, updating cell B2 causes all dependent formulas in cells E2 (Total), F2 (Average), and G2 (Max) to instantly update their results dynamically without manual re-entry.

#### Question 2 (Networking Topologies & Media):
(a) State three differences between a Local Area Network (LAN) and a Wide Area Network (WAN). *(3 Marks)*  
(b) Draw a clearly labeled diagram of a Star Network Topology with five workstations connected to a central switch. *(4 Marks)*  
(c) State three reasons why fiber optic cables are preferred over copper cables for national telecommunications backbones. *(3 Marks)*

*Model Solution:*  
(a)
1. LAN covers a small geographic area (building/lab); WAN spans vast global distances.
2. LAN operates at very high speeds (up to $1-10\text{ Gbps}$); WAN speeds vary.
3. LAN is owned by a single private organization; WAN connects through public infrastructure.  
(b) Diagram must show a central box labeled **Switch**, with five radiating cables connecting to individual computer nodes.  
(c)
1. Immensely higher data transmission bandwidth.
2. Complete immunity to electromagnetic interference and lightning surges.
3. Minimal signal degradation over long inter-city distances.

#### Question 3 (QBASIC Programming):
Write a complete, well-commented QBASIC program that:
1. Clears the screen.
2. Prompts the user to enter the base ($B$) and height ($H$) of a triangle.
3. Calculates the Area using the formula: $\text{Area} = \frac{1}{2} \times B \times H$.
4. Displays the calculated Area with an appropriate descriptive label.
5. Cleanly terminates execution. *(10 Marks)*

*Model Solution:*  
\`\`\`
10 CLS
20 REM Program to Compute Area of a Triangle
30 PRINT "========================================"
40 PRINT "    AREA OF A TRIANGLE CALCULATOR       "
50 PRINT "========================================"
60 INPUT "Enter Base length (cm): ", B
70 INPUT "Enter Height (cm): ", H
80 LET AREA = 0.5 * B * H
90 PRINT "----------------------------------------"
100 PRINT "Calculated Area = "; AREA; " sq cm"
110 END
\`\`\`

#### Question 4 (Cybersecurity & Emerging Tech):
(a) Differentiate between a Computer Virus, a Computer Worm, and a Trojan Horse. *(6 Marks)*  
(b) State two everyday applications of Artificial Intelligence (AI) in modern Nigeria. *(2 Marks)*  
(c) State two functions of the Computer Professionals Registration Council of Nigeria (CPN). *(2 Marks)*

*Model Solution:*  
(a)
- **Virus:** Parasitic code requiring human action to attach to files and replicate.
- **Worm:** Standalone malware that self-replicates and spreads across networks automatically without user interaction.
- **Trojan Horse:** Deceptive malware masquerading as harmless legitimate software that creates backdoors for hackers.  
(b)
1. AI facial recognition and biometric matching in banking verification and passport control.
2. Automated speech-to-text transcription and smartphone virtual assistants.  
(c)
1. Regulating and supervising the computing profession in Nigeria.
2. Accreditating computing programs in tertiary institutions and licensing IT practitioners.`,
    keyTakeaways: [
      'Comprehensive terminal mock BECE assesses spreadsheets, networking, QBASIC coding, and cybersecurity.',
      'Software programming requires understanding variables, control logic, and algorithmic execution.',
      'Emerging technologies like AI and cloud computing are redefining modern global ICT careers.'
    ],
    associatedQuizId: 'bece-computer-studies-2025'
  }
];
