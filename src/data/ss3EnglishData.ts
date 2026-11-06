import { CurriculumTopic } from '../types';

export const SS3_ENGLISH_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: SPEECH WORK: MONOPHTHONGS & DIPHTHONGS
  // ==========================================
  {
    id: 'eng-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Speech Work: Phonemic Analysis of the 12 Monophthongs & 8 Diphthongs',
    subtopics: [
      'The Cardinal Vowel Quadrilateral: Tongue Height (Close, Mid, Open) and Part of Tongue (Front, Central, Back)',
      'The 12 Pure Vowels (Monophthongs): Short Vowels vs. Long Vowels with Length Marks (ː)',
      'The 8 Diphthongs: Closing Glides (/eɪ/, /aɪ/, /ɔɪ/, /əʊ/, /aʊ/) vs. Centering Glides (/ɪə/, /eə/, /ʊə/)',
      'Minimal Pair Contrast Drills and WAEC Paper 3 Oral English Test Practice'
    ],
    readingTimeMinutes: 8,
    summary: 'Master English phonetics by mapping the 12 monophthongs on the Daniel Jones vowel quadrilateral, distinguishing pure vowels from vocalic diphthong glides, and practicing minimal pair contrasts.',
    contentMarkdown: `### 1. The 12 Pure Vowels (Monophthongs)

A **monophthong** is a single vowel sound produced with a relatively stable tongue position and unchanging vocal tract resonance throughout its production:

[Diagram: english-phonemic-vowel-matrix]

| Phonetic Symbol | Tongue Position | Vowel Length | Common Spelling Patterns & Exam Examples |
| :--- | :--- | :--- | :--- |
| **/iː/** | Front, Close | Long | *seat, receive, piece, machine, key* |
| **/ɪ/** | Front-Central, Half-Close | Short | *sit, myth, build, women, busy* |
| **/e/** | Front, Half-Close / Half-Open | Short | *bed, head, friend, said, bury* |
| **/æ/** | Front, Open | Short | *cat, plaid, bad, wax* |
| **/ɑː/** | Back, Open | Long | *father, calm, pass, heart, clerk* |
| **/ɒ/** | Back, Open | Short | *pot, watch, yacht, cough, because* |
| **/ɔː/** | Back, Half-Open | Long | *port, saw, caught, broad, door, war* |
| **/ʊ/** | Back, Half-Close | Short | *put, foot, look, wolf, could* |
| **/uː/** | Back, Close | Long | *food, blue, shoe, through, pool* |
| **/ʌ/** | Central, Half-Open | Short | *cup, blood, son, tough, double* |
| **/ɜː/** | Central, Mid | Long | *bird, word, heard, turn, journey* |
| **/ə/** (Schwa) | Central, Neutral | Ultra-Short | *about, teacher, doctor, comma, police* |

---

### 2. The 8 Diphthongs (Vocalic Glides)

A **diphthong** is a complex vowel sound that glides smoothly from an initial vowel target position toward a second vowel target position within the same single syllable:

1. **Closing Diphthongs (Gliding upward toward Close /ɪ/):**
   - **/eɪ/**: *play, wait, weight, table, steak*
   - **/aɪ/**: *time, fly, buy, aisle, height*
   - **/ɔɪ/**: *boy, coin, boil, voice*
2. **Closing Diphthongs (Gliding upward toward Close /ʊ/):**
   - **/əʊ/**: *go, home, road, soul, toe, brooch*
   - **/aʊ/**: *now, house, out, cow, drought*
3. **Centering Diphthongs (Gliding toward Central Schwa /ə/):**
   - **/ɪə/**: *here, clear, ear, deer, fierce*
   - **/eə/**: *hair, there, care, bear, pear*
   - **/ʊə/**: *pure, cure, tour, jury, mature*

---

### 3. Common WAEC Minimal Pair Pitfalls

- **/iː/** vs **/ɪ/**: *sheep* /ʃiːp/ vs *ship* /ʃɪp/; *leak* /liːk/ vs *lick* /lɪk/
- **/æ/** vs **/ʌ/**: *match* /mætʃ/ vs *much* /mʌtʃ/; *batter* /ˈbætə/ vs *butter* /ˈbʌtə/
- **/ɔː/** vs **/əʊ/**: *caught* /kɔːt/ vs *coat* /kəʊt/; *law* /lɔː/ vs *low* /ləʊ/`,
    keyTakeaways: [
      'The length mark (:) identifies long vowels in phonetic transcriptions.',
      'The schwa /ə/ is the most common vowel in unstressed English syllables.',
      'Diphthongs glide across two vowel qualities within a single syllable.',
      'WAEC Oral English frequently tests contrasts between /iː/ vs /ɪ/ and /æ/ vs /ʌ/.'
    ],
    associatedQuizId: 'eng-ss3-vowels-quiz'
  },

  // ==========================================
  // WEEK 2: ADVANCED SENTENCE SYNTHESIS & CLAUSES
  // ==========================================
  {
    id: 'eng-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Advanced Sentence Synthesis: Complex & Compound-Complex Structures',
    subtopics: [
      'Structural Sentence Types: Simple, Compound, Complex, and Compound-Complex',
      'The Three Functional Subordinate Clauses: Noun, Adjectival (Relative), and Adverbial',
      'Coordinating Conjunctions (FANBOYS) vs. Subordinating Conjunctions and Relative Pronouns',
      'Synthesizing Choppy Simple Sentences into Mature Academic Prose'
    ],
    readingTimeMinutes: 9,
    summary: 'Master syntactic sentence hierarchy, evaluate the functional grammatical roles of dependent clauses, and practice combining ideas into sophisticated compound-complex sentences.',
    contentMarkdown: `### 1. Structural Sentence Architecture

[Diagram: english-advanced-sentence-synthesis]

A well-crafted English essay utilizes varied sentence architecture to create pleasing rhythm and intellectual depth:

| Sentence Type | Structural Composition | Exemplary Model Sentence |
| :--- | :--- | :--- |
| **Simple** | 1 Independent Main Clause | *The federal government enacted new economic fiscal policies.* |
| **Compound** | $\\ge 2$ Independent Main Clauses joined by coordinating conjunction (FANBOYS: *for, and, nor, but, or, yet, so*) | *The monetary authority increased interest rates, **yet** inflation remained elevated across all sectors.* |
| **Complex** | 1 Independent Main Clause + $\\ge 1$ Subordinate Dependent Clause | *Although commodity prices surged, the manufacturing conglomerate maintained its baseline production quota.* |
| **Compound-Complex**| $\\ge 2$ Independent Main Clauses + $\\ge 1$ Subordinate Dependent Clause | *Amina passed her exams with distinction, **and** her parents organized a celebration, **because she had studied diligently throughout the term**.* |

---

### 2. The Three Subordinate Clauses & Grammatical Functions

1. **Noun Clause:**
   - Functions as Subject of Verb, Object of Verb, Subject Complement, or Object of Preposition.
   - Example: *“**What the principal announced this morning** surprised everyone.”* (Function: Subject of the verb *"surprised"*).
2. **Adjectival (Relative) Clause:**
   - Qualifies or modifies a preceding noun or pronoun.
   - Example: *“The textbook **which our literature teacher recommended** is out of print.”* (Function: Modifies the noun *"textbook"*).
3. **Adverbial Clause:**
   - Modifies a verb, adjective, or another adverb, indicating time, place, condition, concession, manner, or reason.
   - Example: *“The assembly commenced **as soon as the national anthem concluded**.”* (Function: Adverbial clause of time modifying the verb *"commenced"*).`,
    keyTakeaways: [
      'Compound sentences use coordinating conjunctions (FANBOYS) to join equal independent clauses.',
      'Complex sentences contain one main clause and at least one subordinate dependent clause.',
      'Noun clauses perform nominal functions like Subject, Object, or Complement.',
      'Varying sentence structures significantly elevates essay marks in WAEC Paper 2.'
    ],
    associatedQuizId: 'eng-ss3-sentence-synthesis-quiz'
  },

  // ==========================================
  // WEEK 3: CONTINUOUS WRITING: SPEECH WRITING
  // ==========================================
  {
    id: 'eng-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Continuous Writing: Public Speech Writing & Rhetorical Engagement',
    subtopics: [
      'Features and Protocols of Public Speeches: Salutations, Dignitary Hierarchy, and Audience Acknowledgement',
      'Rhetorical Devices: The Rule of Three (Tricolon), Anaphora, Rhetorical Questions, and Emotive Diction',
      'Thematic Structuring: Compelling Exordium (Introduction), Structured Arguments, and Memorably Resonant Peroration (Conclusion)',
      'Model Speech Walkthrough for Valedictory and National Youth Forum Scenarios'
    ],
    readingTimeMinutes: 8,
    summary: 'Study the conventions of formal oral delivery in writing, learn strict protocol salutations, utilize persuasive rhetorical figures, and structure compelling speeches for school assemblies and youth summits.',
    contentMarkdown: `### 1. The Structure of an Official Speech

A speech is written to be delivered orally before a live audience, requiring distinctive conversational immediacy, formal protocols, and persuasive cadence:

1. **The Title / Heading:** Bold, centered, stating the occasion and speaker (e.g., *“A SPEECH DELIVERED BY THE OUTGOING HEAD PREFECT ON THE OCCASION OF THE 25TH VALEDICTORY SERVICE”*).
2. **Formal Salutations (Protocol Hierarchy):**
   - Address dignitaries in descending order of seniority:
   > *“The Chairman of the Board of Governors, The Respected Principal, Vice-Principals, Distinguished Members of Faculty, Honored Parents and Guardians, and My Fellow Graduating Scholars...”*
3. **The Exordium (Introduction):** Hook the audience, acknowledge the honor of speaking, and establish the central purpose.
4. **The Body (Substantive Thematic Paragraphs):** Develop 3–4 coherent arguments with clear transitions.
5. **The Peroration (Conclusion):** Summarize with an inspiring call to action and conclude with formal gratitude: *“Thank you all for your kind attention. God bless you.”*

---

### 2. High-Scoring Rhetorical Devices for Speeches

| Rhetorical Device | Definition & Technique | Exemplary Sentence for Speech |
| :--- | :--- | :--- |
| **Tricolon (Rule of Three)** | Presenting three parallel words or rhythmic phrases together | *“We must work with **discipline**, strive with **integrity**, and conquer with **resilience**.”* |
| **Anaphora** | Repetition of a word or phrase at the start of successive clauses | *“**We cannot** surrender our dreams. **We cannot** compromise our ethics. **We cannot** fail our generation.”* |
| **Rhetorical Question** | A provocative question asked for persuasive effect rather than an answer | *“Shall we sit idly by while the torch of academic excellence dims in our hands?”* |
| **Hypophora** | Asking a question and immediately answering it | *“What is our greatest asset as Nigerian youths? It is our unyielding determination to innovate.”* |`,
    keyTakeaways: [
      'Public speeches require strict protocol salutations arranged in descending order of dignity.',
      'Speeches are written for the ear: use rhythmic rhetorical devices like tricolons and anaphora.',
      'Always conclude a formal speech with an inspiring call to action and a polite expression of gratitude.',
      'Avoid dry, passive narration; use active verbs and inclusive pronouns (we, our, together).'
    ],
    associatedQuizId: 'eng-ss3-speech-writing-quiz'
  },

  // ==========================================
  // WEEK 4: SPEECH WORK: CONSONANT CONTRASTS
  // ==========================================
  {
    id: 'eng-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Speech Work: Consonant Articulation, Plosives, Fricatives & Affricates',
    subtopics: [
      'Parameters of Consonant Classification: Place of Articulation, Manner of Articulation, and Voicing',
      'Contrasting Voiceless and Voiced Dental Fricatives: /θ/ (think, bath) vs. /ð/ (this, breathe)',
      'Contrasting Post-Alveolar Fricatives and Affricates: /ʃ/ vs. /ʒ/ and /tʃ/ vs. /dʒ/',
      'Silent Consonants and Phonetic Traps in Nigerian English (e.g., debt, subtle, comb, bomb, castle)'
    ],
    readingTimeMinutes: 8,
    summary: 'Deconstruct English consonant articulation, master dental fricatives (/θ/ and /ð/) and affricates (/tʃ/ and /dʒ/), and identify orthographic silent letters tested in WAEC Oral English.',
    contentMarkdown: `### 1. The Consonant Articulation Framework

Consonants are articulated by obstructing the airstream in the vocal tract. They are classified by three parameters:
1. **Voicing:** Vibration (voiced) or non-vibration (voiceless) of the vocal cords.
2. **Place of Articulation:** Bilabial, Labiodental, Dental, Alveolar, Post-Alveolar, Palatal, Velar, Glottal.
3. **Manner of Articulation:** Plosive, Fricative, Affricate, Nasal, Lateral, Approximant.

---

### 2. High-Yield Consonant Contrasts in WAEC

| Contrast Pair | Voicing State | Minimal Pair Words & Distinctions |
| :--- | :--- | :--- |
| **/θ/** vs. **/ð/** | Voiceless vs. Voiced Dental Fricative | *thick* /θɪk/ vs. *this* /ðɪs/<br>*breath* (noun) /breθ/ vs. *breathe* (verb) /briːð/<br>*cloth* /klɒθ/ vs. *clothe* /kləʊð/ |
| **/s/** vs. **/z/** | Voiceless vs. Voiced Alveolar Fricative | *price* /praɪs/ vs. *prize* /praɪz/<br>*loose* /luːs/ vs. *lose* /luːz/ |
| **/ʃ/** vs. **/ʒ/** | Voiceless vs. Voiced Post-Alveolar Fricative | *mission* /ˈmɪʃn/ vs. *vision* /ˈvɪʒn/<br>*dilution* /daɪˈluːʃn/ vs. *delusion* /dɪˈluːʒn/ |
| **/tʃ/** vs. **/dʒ/**| Voiceless vs. Voiced Post-Alveolar Affricate | *choke* /tʃəʊk/ vs. *joke* /dʒəʊk/<br>*rich* /rɪtʃ/ vs. *ridge* /rɪdʒ/ |

---

### 3. Silent Consonant Traps

WAEC Oral examinations routinely test words with unpronounced silent letters:
- **Silent 'b':** *debt* /det/, *subtle* /ˈsʌtl/, *doubt* /daʊt/, *comb* /kəʊm/, *tomb* /tuːm/, *plumber* /ˈplʌmə/.
- **Silent 'k' & 'g':** *knight* /naɪt/, *knife* /naɪf/, *gnat* /næt/, *sign* /saɪn/, *phlegm* /flem/.
- **Silent 'l':** *calm* /kɑːm/, *salmon* /ˈsæmən/, *half* /hɑːf/, *folk* /fəʊk/, *colonel* /ˈkɜːnl/.
- **Silent 'p':** *psychology* /saɪˈkɒlədʒi/, *pneumonia* /njuːˈməʊniə/, *receipt* /rɪˈsiːt/, *corps* /kɔː/.
- **Silent 't':** *castle* /ˈkɑːsl/, *listen* /ˈlɪsn/, *whistle* /ˈwɪsl/, *fasten* /ˈfɑːsn/, *Christmas* /ˈkrɪsməs/.`,
    keyTakeaways: [
      'The difference between /θ/ and /ð/ is voicing: vocal cords vibrate for /ð/ (breathe, this).',
      'The word "breathe" ends in voiced /ð/, whereas the noun "breath" ends in voiceless /θ/.',
      'Letters like "b" in subtle and "p" in receipt are completely silent in standard pronunciation.',
      'In words like "calm" and "salmon", the letter "l" is completely silent.'
    ],
    associatedQuizId: 'eng-ss3-consonants-quiz'
  },

  // ==========================================
  // WEEK 5: LEXIS & STRUCTURE: PHRASAL VERBS & IDIOMS
  // ==========================================
  {
    id: 'eng-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Lexis & Structure: High-Yield Phrasal Verbs & Idiomatic Expressions',
    subtopics: [
      'Nature of Phrasal Verbs: Verb + Preposition/Adverb Particle and Semantic Non-Compositionality',
      'Transitive vs. Intransitive and Separable vs. Inseparable Phrasal Verbs',
      'Core Multi-Word Verbs in WAEC (e.g., look into, put off, call off, turn down, give in, make out)',
      'Mastering Figurative Idioms and Contextual Usage in Academic Writing'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze multi-word verb particles whose meanings cannot be deduced from individual words alone, classify separable and inseparable combinations, and master idioms frequently tested in WAEC.',
    contentMarkdown: `### 1. Anatomy of Phrasal Verbs

A **phrasal verb** is an idiomatic phrase consisting of a verb and another element (typically an adverb or a preposition). Its collective meaning is **non-compositional**—it diverges completely from the literal definition of the base verb:

| Phrasal Verb | Literal Fallacy | Idiomatic / Standard Meaning | Exemplary Usage |
| :--- | :--- | :--- | :--- |
| **Put off** | *"To place away"* | To postpone or delay | *The school board **put off** the inter-house sports competition until March.* |
| **Call off** | *"To shout away"* | To cancel an event entirely | *The aviation union decided to **call off** the planned strike after negotiations.* |
| **Look into** | *"To stare inside"* | To investigate or examine | *A special committee was constituted to **look into** the exam leakage.* |
| **Turn down** | *"To rotate downwards"* | To reject or decline an offer | *Emeka **turned down** the lucrative scholarship in favor of starting his business.* |
| **Come by** | *"To travel beside"* | To acquire or obtain | *Genuine historical artifacts are difficult to **come by** in modern markets.* |

---

### 2. Separable vs. Inseparable Phrasal Verbs

- **Separable:** When the direct object is a pronoun, it **must** be placed between the verb and particle:
  - *Correct:* “Please turn **it** off.”
  - *Incorrect:* “Please turn off it.”
- **Inseparable:** The particle must remain immediately adjacent to the verb:
  - *Correct:* “The detective looked **into** the case.” (Never: *looked the case into*).

---

### 3. Idiomatic Expressions Commonly Tested in WAEC

- **“Burn the midnight oil”:** To study or work late into the night.
- **“Hit the nail on the head”:** To state the exact truth or identify the precise problem.
- **“Bite off more than one can chew”:** To undertake a task that is too vast for one's capacity.
- **“A blessing in disguise”:** An apparent misfortune that ultimately yields positive results.
- **“At the eleventh hour”:** At the last possible moment before a deadline expires.`,
    keyTakeaways: [
      'Phrasal verbs have non-literal, idiomatic meanings that cannot be guessed from the base verb alone.',
      '"Put off" means to postpone, whereas "call off" means to cancel entirely.',
      'Pronoun objects must sit between the verb and particle in separable phrasal verbs (turn it off).',
      'Idioms should be used naturally and sparingly to enhance essay flair without sounding clichéd.'
    ],
    associatedQuizId: 'eng-ss3-phrasal-verbs-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM COMPREHENSION MASTERCLASS
  // ==========================================
  {
    id: 'eng-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Reading Comprehension: Deductions, Tone & Contextual Vocabulary',
    subtopics: [
      'Strategic Reading: Skimming for Gist vs. Scanning for Specific Data Points',
      'Inferential vs. Literal Comprehension Questions in WAEC Passages',
      'Decoding Authorial Tone, Mood, and Attitude (Satirical, Sarcastic, Objective, Eulogistic)',
      'The One-to-One Rule for Contextual Vocabulary Replacement (Matching Word Class and Tense)'
    ],
    readingTimeMinutes: 9,
    summary: 'Master WAEC Reading Comprehension passage strategies, evaluate inferential questions, identify authorial tone and attitude, and apply the strict one-to-one word substitution rule.',
    contentMarkdown: `### 1. Types of Comprehension Questions in WAEC

In WAEC Paper 2 Section B, candidates encounter two unseen comprehension passages. Questions are structured into four distinct categories:

| Question Category | Examiner’s Cognitive Demand | Answering Strategy |
| :--- | :--- | :--- |
| **Literal (Factual)** | Information explicitly stated in the text | Locate the exact sentence; paraphrase in your own words; never copy verbatim |
| **Inferential (Deductive)** | Information implied between the lines | Deduce logical conclusions using textual clues and contextual evidence |
| **Grammatical Function** | Identification of a underlined clause or phrase | Name the grammatical structure (e.g., *Noun phrase*) and its function (e.g., *Object of verb*) |
| **Figures of Speech** | Identification of literary devices (Metaphor, Simile, Irony) | Name the figure and explain its specific contextual meaning in the passage |

---

### 2. Identifying Authorial Tone, Mood & Attitude

The author's choice of adjectives, adverbs, and syntax reveals their underlying stance toward the subject:
- **Objective / Dispassionate:** Impartial, matter-of-fact reporting of evidence without emotional bias.
- **Satirical / Sarcastic:** Mocking or ridiculing social vices, political hypocrisy, or corruption.
- **Eulogistic / Reverent:** Praising, admiring, and commemorating an individual or achievement.
- **Pessimistic / Despondent:** Emphasizing gloom, despair, and inevitable negative outcomes.

---

### 3. The Strict One-to-One Vocabulary Substitution Rule

In vocabulary questions (e.g., *"For each of the following words, find another word or phrase that means the same and can replace it in the passage"*):
1. **Identical Part of Speech:** A noun must replace a noun; an adjective must replace an adjective; an adverb must replace an adverb.
2. **Identical Grammatical Tense & Number:**
   - If the word is past tense (*"commenced"*), the replacement must be past tense (*"began"* or *"started"*, never *"begin"*).
   - If the word is plural (*"impediments"*), the replacement must be plural (*"obstacles"* or *"hindrances"*).
3. **Plug-in Test:** Substitute your replacement directly into the passage sentence. It must preserve flawless grammatical flow without requiring additional prepositions or auxiliary verbs.`,
    keyTakeaways: [
      'Never copy sentences verbatim from comprehension passages; always rephrase in your own words.',
      'Inferential questions demand logical deductions based on subtle textual clues.',
      'Contextual vocabulary replacements must match the exact grammatical tense, number, and word class.',
      'Grammatical function questions require two parts: identifying the structure and stating its syntactic role.'
    ],
    associatedQuizId: 'eng-ss3-comprehension-quiz'
  },

  // ==========================================
  // WEEK 7: CONTINUOUS WRITING: NARRATIVE & DESCRIPTIVE
  // ==========================================
  {
    id: 'eng-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Continuous Writing: Narrative & Descriptive Essay Techniques',
    subtopics: [
      'Narrative Arc: Freytag’s Pyramid (Exposition, Rising Action, Climax, Falling Action, Resolution)',
      'Show, Don’t Tell: Replacing Abstract Statements with Sensory Imagery and Concrete Details',
      'Descriptive Spatial Organization: Painting Vivid Character Profiles and Atmospheric Settings',
      'Punctuating Direct Speech and Dialogue Correctly to Create Dynamic Dramatic Tension'
    ],
    readingTimeMinutes: 8,
    summary: 'Elevate creative prose writing through deliberate narrative plotting, apply the "show, don’t tell" sensory principle, and master the punctation rules of dialogue and character interaction.',
    contentMarkdown: `### 1. Plotting the Narrative Arc

A compelling narrative avoids linear, boring chronicles (*"I woke up, then I ate, then I went..."*). Instead, it follows a structured dramatic arc:
1. **Exposition:** Introduces characters, setting, and the baseline atmosphere in vivid sensory detail.
2. **Inciting Incident:** An unexpected complication disrupts the status quo (e.g., an ominous message, sudden storm, road accident).
3. **Rising Action:** Conflicts intensify as obstacles thwart the protagonist’s attempts to regain control.
4. **Climax:** The moment of supreme peril, revelation, or decisive confrontation.
5. **Falling Action & Resolution:** Consequences unfold, leading to a thoughtful, credible conclusion.

---

### 2. "Show, Don't Tell" Sensory Technique

Examiners penalize dry, abstract summaries. Replace telling with vivid, multi-sensory showing:

| Flat "Telling" (Low Marks) | Dynamic "Showing" with Sensory Imagery (High Marks) |
| :--- | :--- |
| *Bisi was very afraid.* | *Cold beads of perspiration broke across Bisi’s forehead, her trembling hands clutched the wooden railing, and her heart pounded against her ribs like a trapped bird.* |
| *The market was crowded and noisy.* | *The choking aroma of smoked catfish and pungent spices hung heavy in the stifling afternoon heat as aggressive traders bellowed prices over the deafening blare of vehicular horns.* |
| *The old man was poor.* | *His threadbare agbada, faded by countless washings, hung loosely over protruding collarbones, while his cracked plastic slippers slapped softly against the parched red clay.* |

---

### 3. Rules for Punctuating Direct Dialogue

- Enclose spoken words within quotation marks (single or double, but remain consistent).
- Every change of speaker requires starting a **fresh new paragraph**.
- Place commas, periods, question marks, and exclamation marks **inside** the quotation marks:
  > *“Look out for the ditch!” screamed Chidi, lunging forward.*  
  > *“I can manage,” Amina gasped, her breath coming in ragged bursts.*`,
    keyTakeaways: [
      'Engaging narratives employ the dramatic arc: exposition, conflict, climax, and resolution.',
      '"Show, don’t tell" brings writing alive through sight, sound, smell, and tactile sensations.',
      'Start a new paragraph whenever a new character begins speaking in dialogue.',
      'Punctuation marks (commas, periods, question marks) must always stay inside the quotation marks.'
    ],
    associatedQuizId: 'eng-ss3-narrative-descriptive-quiz'
  },

  // ==========================================
  // WEEK 8: LEXIS & STRUCTURE: NOMINALIZATION & GERUNDS
  // ==========================================
  {
    id: 'eng-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Lexis & Structure: Nominalization, Gerunds & Academic Register',
    subtopics: [
      'Nominalization: Deriving Abstract Nouns from Verbs and Adjectives via Suffixation',
      'The Gerund (-ing Form) as a Verbal Noun: Subject, Direct Object, and Object of Preposition',
      'Distinguishing Gerunds from Present Participles and Progressive Verb Tenses',
      'Elevating Colloquial Speech into Sophisticated Formal Academic Register'
    ],
    readingTimeMinutes: 8,
    summary: 'Transform active verbs into formal nominal structures, analyze gerunds functioning as verbal nouns, distinguish participles from gerunds, and elevate informal writing into academic register.',
    contentMarkdown: `### 1. The Art of Nominalization

**Nominalization** is the linguistic process of transforming verbs, adjectives, or entire clauses into formal abstract nouns. It is the hallmark of sophisticated, objective academic prose:

| Base Verb / Adjective | Derivational Suffix | Nominalized Form | Formal Academic Application |
| :--- | :--- | :--- | :--- |
| *propose* (verb) | *-al* | **proposal** | *“The board approved the committee’s **proposal**.”* |
| *expand* (verb) | *-sion* | **expansion** | *“Rapid industrial **expansion** drove urbanization.”* |
| *investigate* (verb) | *-tion* | **investigation** | *“A thorough **investigation** revealed irregularities.”* |
| *resilient* (adjective) | *-ce* | **resilience** | *“The community displayed remarkable **resilience**.”* |
| *transparent* (adjective) | *-cy* | **transparency** | *“Democratic governance requires fiscal **transparency**.”* |

---

### 2. The Gerund: The Verbal Noun

A **gerund** is a verb form ending in *-ing* that functions grammatically as a **noun**:
1. **As Subject of a Verb:**
   - *“**Swimming** builds cardiovascular endurance.”*
   - *“**Cheating** in national examinations destroys academic integrity.”*
2. **As Direct Object of a Verb:**
   - *“The judge considered **adjourning** the proceedings.”*
3. **As Object of a Preposition:**
   - *“He was accused **of embezzling** public funds.”*
   - *“She succeeded **by working** relentlessly.”*

---

### 3. Gerund vs. Present Participle vs. Continuous Verb

- **Gerund (Noun):** *“**Walking** is beneficial.”* (Subject of verb).
- **Present Participle (Adjective):** *“The **walking** wounded arrived at the clinic.”* (Modifies wounded).
- **Progressive Finite Verb (Action):** *“He is **walking** towards the administrative hall.”* (Part of compound verb).`,
    keyTakeaways: [
      'Nominalization converts verbs and adjectives into formal abstract nouns.',
      'Academic and formal writing relies heavily on nominalized structures to maintain objectivity.',
      'A gerund ends in -ing but functions strictly as a noun (subject, object, complement).',
      'Gerunds must be distinguished from present participles which function as descriptive adjectives.'
    ],
    associatedQuizId: 'eng-ss3-nominalization-gerunds-quiz'
  },

  // ==========================================
  // WEEK 9: SPEECH WORK: SENTENCE & EMPHATIC STRESS
  // ==========================================
  {
    id: 'eng-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Speech Work: Sentence Stress, Nuclear Pitch & Emphatic Stress',
    subtopics: [
      'Content Words (Nouns, Main Verbs, Adjectives, Adverbs) vs. Structure / Function Words',
      'Normal Sentence Stress Rhythm: Isochrony and English as a Stress-Timed Language',
      'Emphatic Stress: Shifting Nuclear Stress to Signal Contrast, Contradiction, and Focus',
      'Mastering the WAEC Emphatic Stress Multiple-Choice Question Format'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze sentence rhythm and pitch prominence, contrast stressed content words with unstressed grammatical words, and master the exact question-and-answer format used in WAEC emphatic stress tests.',
    contentMarkdown: `### 1. Content Words vs. Function Words

In spoken English, syllables do not carry equal prominence. English is a **stress-timed language**, meaning stressed beats occur at relatively regular time intervals:

- **Content Words (Carrying Primary Meaning - Usually STRESSED):**
  - Nouns (*doctor, Nigeria, integrity*)
  - Main Verbs (*run, build, investigate*)
  - Adjectives (*brilliant, swift, corrupt*)
  - Adverbs (*quickly, silently, never*)
- **Function / Structure Words (Grammatical Glue - Usually UNSTRESSED):**
  - Articles (*a, an, the*)
  - Prepositions (*in, at, on, to*)
  - Pronouns (*he, she, it, they*)
  - Auxiliary Verbs (*is, was, has, can*)
  - Conjunctions (*and, but, so*)

---

### 2. Emphatic Stress & Contrastive Meaning

**Emphatic stress** occurs when a speaker places special pitch height and volume on a particular word in an utterance to contradict an assumption, emphasize a contrast, or provide critical clarification.

Consider the sentence: *“MUSA drove the green car to Kano yesterday.”*

| Word Stressed in Capital Letters | Implied Contradiction / Meaning | Correct Matching WAEC Question |
| :--- | :--- | :--- |
| **MUSA** drove the green car to Kano yesterday. | Musa did it, **not** John, Ali, or Chidi | *Did Ali drive the green car to Kano yesterday?* (No, MUSA did). |
| Musa **DROVE** the green car to Kano yesterday. | He drove it, **not** flew, towed, or pushed it | *Did Musa fly the green car to Kano yesterday?* (No, he DROVE it). |
| Musa drove the **GREEN** car to Kano yesterday. | It was green, **not** red, black, or blue | *Did Musa drive the red car to Kano yesterday?* (No, the GREEN car). |
| Musa drove the green **CAR** to Kano yesterday. | It was a car, **not** a lorry, motorcycle, or bus | *Did Musa drive the green lorry to Kano yesterday?* (No, the green CAR). |
| Musa drove the green car to **KANO** yesterday. | He went to Kano, **not** Abuja, Lagos, or Jos | *Did Musa drive the green car to Abuja yesterday?* (No, to KANO). |
| Musa drove the green car to Kano **YESTERDAY**. | It happened yesterday, **not** today or last week | *Did Musa drive the green car to Kano today?* (No, YESTERDAY). |`,
    keyTakeaways: [
      'Content words (nouns, main verbs) are stressed; function words (articles, prepositions) are unstressed.',
      'Emphatic stress shifts vocal prominence to contradict an error or highlight a contrast.',
      'In WAEC emphatic stress questions, the correct question must disagree with the capitalized stressed word.',
      'All other words in the correct matching question must match the original sentence exactly.'
    ],
    associatedQuizId: 'eng-ss3-emphatic-stress-quiz'
  },

  // ==========================================
  // WEEK 10: CONTINUOUS WRITING: INFORMAL & SEMI-FORMAL LETTERS
  // ==========================================
  {
    id: 'eng-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Continuous Writing: Informal & Semi-Formal Letter Architecture',
    subtopics: [
      'Comparative Structural Blueprint: Formal vs. Semi-Formal vs. Informal Letters',
      'Informal Letters: Single Address, Warm Salutation, Conversational Tone, and Friendly Sign-off',
      'Semi-Formal Letters: Single Address, Respectful Salutation, Measured Tone, and Balanced Diction',
      'Common Register Failures: Avoiding Unprofessional Slang while Maintaining Natural Warmth'
    ],
    readingTimeMinutes: 8,
    summary: 'Compare formal, semi-formal, and informal letter conventions, master layout formatting (single vs. double addresses, salutations, sign-offs), and maintain register consistency.',
    contentMarkdown: `### 1. Structural Comparison of Letter Types

| Letter Component | Informal Letter | Semi-Formal Letter | Formal Letter |
| :--- | :--- | :--- | :--- |
| **Intended Recipient** | Close friends, siblings, peers | Teachers, elders, landlord, family friends | School Principal, Commissioner, Editor, CEO |
| **Address Layout** | **One address** (Writer’s address top-right + date) | **One address** (Writer’s address top-right + date) | **Two addresses** (Writer top-right; Recipient top-left) |
| **Salutation** | *Dear Chidi,* or *Dearest Mum,* | *Dear Mr. Okon,* or *Dear Uncle Bola,* | *Dear Sir,* or *Dear Madam,* |
| **Title / Heading** | **No title permitted** | **No title permitted** | **Mandatory capitalized/underlined title** |
| **Contractions** | Freely permitted (*can’t, I’m, didn’t*) | Controlled, rare | **Strictly prohibited** (*cannot, I am*) |
| **Subscription (Sign-off)**| *Your affectionate friend,* or *Yours sincerely,* followed by **first name only** | *Yours sincerely,* followed by **full name** | *Yours faithfully,* followed by **signature & full name** |

---

### 2. Layout Model of an Informal Letter

\`\`\`
                                                    Federal Government College,
                                                    P.M.B. 1024,
                                                    Enugu, Enugu State.
                                                    15th October, 2026.

Dear Tunde,

   How are you holding up with your preparation for the mock examinations? I was thrilled to receive your letter last week...

   [Body paragraphs: Warm, engaging, conversational narrative with natural idioms and personal anecdotes]

   Extend my warmest regards to your parents and little sister. I look forward to your prompt reply.

                                                    Yours sincerely,
                                                    Emeka
\`\`\``,
    keyTakeaways: [
      'Informal and semi-formal letters carry only one address: the writer’s address at top-right.',
      'Informal letters never carry a subject heading or title.',
      'Contractions (don’t, I’m) are acceptable in informal letters but banned in formal letters.',
      'The subscription of an informal letter ends with the writer’s first name only (no signature).'
    ],
    associatedQuizId: 'eng-ss3-letter-writing-quiz'
  },

  // ==========================================
  // WEEK 11: SUMMARY WRITING: THE 5-POINT RULE
  // ==========================================
  {
    id: 'eng-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Summary Writing Mastery: The 5-Point Rule & Core Idea Extraction',
    subtopics: [
      'The Core Purpose of Summary: Distilling Essential Substance without Cosmetic Padding',
      'The Elimination Process: Removing Illustrations, Quotations, Analogies, and Parenthetical Details',
      'Drafting in Complete Grammatical Sentences: The Golden Rule of WAEC Summary Scoring',
      'Avoiding the Deadly Traps: Mindless Lift Penalty, Incomplete Sentences, and Rambling Preambles'
    ],
    readingTimeMinutes: 9,
    summary: 'Master the rigorous requirements of WAEC summary writing, eliminate rhetorical fluff and illustrative examples, write concise, grammatically complete answers, and avoid the devastating mindless-lifting penalty.',
    contentMarkdown: `### 1. The Nature of Summary Writing

Summary writing in WAEC Paper 2 Section C tests your ability to extract **key thematic arguments** from a 500-word passage and express them in concise, grammatically complete sentences:

- **What to Eliminate (Rhetorical Fluff):**
  - Historical anecdotes and narrative stories.
  - Figurative analogies, metaphors, and similes.
  - Repetitions, rephrasings, and rhetorical questions.
  - Statistical lists, percentage enumerations, and detailed examples (*for instance, such as*).
- **What to Retain (The Core Gist):**
  - The central claim or causal argument of each major paragraph.

---

### 2. The Golden Rules of WAEC Summary Scoring

| Rule | Examiner's Expectation | Consequence of Violation |
| :--- | :--- | :--- |
| **Complete Sentences** | Every answer must be a self-contained sentence with a Subject and a Finite Verb | Phrases, clauses, or bullet points receive an automatic **minus 1 mark** penalty |
| **No Mindless Lifting** | Express the extracted point in your own original words using synonyms and fresh phrasing | Lifting an entire sentence verbatim results in a **Zero mark** penalty for that point |
| **One Point per Sentence** | If a question requests three reasons, write three separate numbered sentences | Jamming two points into one sentence forfeits marks for the second point |
| **Direct Answers** | Avoid rambling preambles like *“The author stated in the passage that the first reason is...”* | Lead directly to the point: *“Deforestation accelerates topsoil erosion.”* |

---

### 3. Model Question & Answer Transformation

**Passage Extract:**
> *“When young people consume excessive amounts of refined sugar, their blood glucose levels spike dramatically, which leads to metabolic stress. For instance, in a recent hospital study of 500 teenagers in Ibadan, doctors observed heightened lethargy and dental cavities. Furthermore, over-dependence on sugary snacks suppresses appetite for nutrient-dense traditional meals like vegetable soup.”*

**Question:** *In two sentences, one for each, state two negative effects of high sugar intake mentioned in the passage.*

- **Drafting Step 1 (Locate key claims):**
  1. Causes metabolic stress and dental problems.
  2. Reduces appetite for nutritious food.
- **Drafting Step 2 (Eliminate examples):** Cut hospital study of 500 teenagers, Ibadan, vegetable soup.
- **Final High-Scoring WAEC Answers:**
  - *(a) It causes severe metabolic complications and tooth decay in young people.*
  - *(b) It discourages the consumption of nutritious, balanced meals.*`,
    keyTakeaways: [
      'Summary answers must be written in complete grammatical sentences with subject and finite verb.',
      'Never copy sentences verbatim from the passage; mindless lifting earns zero marks.',
      'Strip away all illustrations, statistics, hospital case studies, and rhetorical examples.',
      'Write exactly one self-contained point per numbered sentence.'
    ],
    associatedQuizId: 'eng-ss3-summary-mastery-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & WAEC EXAMINATION CLINIC
  // ==========================================
  {
    id: 'eng-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC SSCE English Language Examination Clinic',
    subtopics: [
      'Comprehensive Term 1 Synthesis: Oral Phonetics, Advanced Syntax, Continuous Writing, and Summary',
      'WAEC SSCE English Tripartite Architecture: Paper 1 (Objectives), Paper 2 (Essay & Summary), Paper 3 (Test of Orals)',
      'Marking Schemes for Continuous Writing: Content (10), Organization (10), Expression (20), Mechanical Accuracy (10)',
      'Speed and Time Management Protocols to Secure an A1 Grade in WAEC English'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate all First Term English competencies, dissect the WAEC tripartite paper structure, analyze the 50-mark continuous writing rubric, and implement time-tested exam strategies.',
    contentMarkdown: `### 1. The WAEC English Tripartite Structure

To achieve an A1 grade in WAEC English Language, candidates must perform consistently across three separate papers:

| Examination Component | Duration & Format | Total Marks | Content Tested |
| :--- | :--- | :--- | :--- |
| **Paper 1 (Objectives)** | 1 Hour · 80 Multiple-Choice Questions | 80 Marks (weighted) | Lexis & Structure: Antonyms, Synonyms, Sentence Completion, Idioms, Prepositions |
| **Paper 2 (Theory)** | 2 Hours 15 Minutes · Essay, Comprehension & Summary | 100 Marks | Section A: Continuous Writing (50 marks)<br>Section B: Comprehension (30 marks)<br>Section C: Summary Writing (20 marks) |
| **Paper 3 (Test of Orals)** | 45 Minutes · 60 Multiple-Choice Questions | 30 Marks | Vowel contrasts, Consonants, Rhymes, Word Stress, Emphatic Stress |

---

### 2. The 50-Mark Continuous Writing Rubric

Examiners grade the 450-word essay across four strict criteria:

1. **Content (10 Marks):** Relevance to topic, adequacy of ideas, depth of arguments, maturity of thought.
2. **Organization (10 Marks):** Paragraph transitions, logical coherence, balanced introduction and conclusion, appropriate letter/speech format.
3. **Expression (20 Marks):** Varied vocabulary, figurative language, sophisticated sentence structures, natural idiomatic mastery.
4. **Mechanical Accuracy (10 Marks):**
   - Starts at 10 marks.
   - **Deductions:** Exactly **$\\frac{1}{2}$ mark** is deducted for every single error in spelling, punctuation, capitalization, or concord.
   - 20 mechanical errors reduce this section to zero!

---

### 3. Examination Time Allocation Protocol

During Paper 2 ($2\\frac{1}{4}$ hours = 135 minutes):
- **Continuous Writing (50 marks):** 50 minutes (10 mins planning/outline, 35 mins writing 450 words, 5 mins proofreading).
- **Reading Comprehension (30 marks):** 45 minutes (approx. 22 minutes per passage).
- **Summary Writing (20 marks):** 35 minutes (15 mins reading and isolating points, 15 mins drafting concise sentences, 5 mins polishing).
- **Final Buffer:** 5 minutes general check for spelling and punctuation.`,
    keyTakeaways: [
      'Paper 2 continuous writing is scored on Content (10), Organization (10), Expression (20), and Mechanical Accuracy (10).',
      'Every punctuation, spelling, or capitalization error deducts exactly 1/2 mark from Mechanical Accuracy.',
      'Test of Orals (Paper 3) tests vowels, consonants, rhymes, and syllable/emphatic stress.',
      'Spend 50 minutes on the essay, 45 minutes on comprehension, and 35 minutes on summary.'
    ],
    associatedQuizId: 'eng-ss3-waec-clinic-quiz'
  }
];
