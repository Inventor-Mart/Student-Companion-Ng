# Implementation Plan: SS 1 (2nd Term) English Language Curriculum

This plan outlines the generation and integration of the exhaustive **SS 1 (2nd Term) English Language** curriculum based on the verified 12-week NERDC / WAEC / NECO scheme of work.

---

## 1. Curriculum Architecture & Content Scope

The lessons will be created in a dedicated module file: **`src/data/ss1EnglishData.ts`** implementing the `CurriculumTopic` interface with full pedagogical depth:

### Week-by-Week Curriculum Roadmap:
1. **Week 1:**
   - **Speech Work:** Revision of Diphthongs (/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/, /ɪə/, /eə/, /ʊə/) with phonetic transcription charts.
   - **Grammar:** Phrasal Verbs (intransitive vs. transitive, separable vs. inseparable, idiomatic meanings).
   - **Comprehension:** Reading to identify the writer's mood and tone (satirical, melancholic, reverent, indignant).
   - **Composition:** Expository Essay ("The Causes and Effects of Drug Abuse" with structured statistical and clinical breakdown).
   - **Literature:** African Prose — *Second Class Citizen* by Buchi Emecheta (Historical context, racial and gender discrimination in 1960s London, patriarchal oppression in Nigeria, themes and setting).

2. **Week 2:**
   - **Speech Work:** Consonant Fricatives (/f/, /v/, /θ/, /ð/, /s/, /z/, /ʃ/, /ʒ/, /h/) with minimal pairs and pronunciation drills.
   - **Grammar:** Clauses (Main / Independent clauses vs. Subordinate / Dependent clauses).
   - **Comprehension:** Skimming and scanning techniques for rapid retrieval of thesis points.
   - **Composition:** Formal Letter Writing (Letter of Complaint to a Municipal or School Authority with two addresses, reference line, formal heading, and complimentary close).
   - **Literature:** *Second Class Citizen* — In-depth characterization (Adah's resilience vs. Francis Obi's patriarchal indolence and domestic violence) and plot progression.

3. **Week 3:**
   - **Speech Work:** Consonant Affricates (/tʃ/ and /dʒ/) contrasting voiceless vs. voiced palato-alveolar articulation.
   - **Grammar:** Adjectival Clauses (Relative pronouns: *who, whom, whose, which, that*; defining / restrictive vs. non-defining clauses, grammatical function of qualifying nouns).
   - **Comprehension:** Reading to make valid logical inferences and deduce contextual word meanings.
   - **Composition:** Argumentative Essay ("Day Schools are Better than Boarding Schools" with balanced refutations).
   - **Literature:** Non-African Prose — *Lord of the Flies* by William Golding (Civilization vs. savagery, the beast within, symbolism of the conch shell and Piggy's glasses).

4. **Week 4:**
   - **Speech Work:** Sound Discrimination (Minimal pairs: /ɪ/ vs. /iː/, /ɒ/ vs. /ɔː/, /p/ vs. /b/, /t/ vs. /θ/).
   - **Grammar:** Adverbial Clauses (Time: *when, while, as soon as*; Condition: *if, unless, provided*; Reason: *because, since, as*).
   - **Comprehension:** Vocabulary development in Government and Politics (bicameral, constituency, gerrymandering, suffrage, separation of powers).
   - **Composition:** Narrative Essay ("An Unforgettable Experience" utilizing sensory imagery and chronological suspense).
   - **Literature:** African Drama — *The Lion and the Jewel* by Wole Soyinka (Yoruba village of Ilujinle, conflict between Western modernity and African tradition).

5. **Week 5:**
   - **Speech Work:** Syllables and Word Stress (Primary stress in 2-syllable noun-verb accent shifts like *'OB-ject* vs. *ob-'JECT*; 3-syllable stress rules).
   - **Grammar:** Noun Phrases (Structure: determiners, pre-modifiers, head noun, post-modifiers; grammatical functions: Subject, Object of transitive verb, Subject complement, Prepositional complement).
   - **Comprehension:** Critical evaluation of argumentative passages.
   - **Composition:** Article Writing for National Dailies ("The Role of the Youth in Nation Building").
   - **Literature:** *The Lion and the Jewel* — Thematic critique of vanity, Baroka's sexual cunning, and Lakunle's superficial mimicry of European civilization.

6. **Week 6:**
   - **Mid-Term Continuous Assessment:** 25 WAEC SSCE style questions covering Oral English, Lexis & Structure, and Comprehension.

7. **Week 7:**
   - **Speech Work:** Emphatic / Contrastive Stress in sentences (identifying implied questions).
   - **Grammar:** Active and Passive Voice (structural agent transformation across present, past, perfect, and continuous tenses).
   - **Comprehension:** Vocabulary development in Religion (monotheism, liturgy, theology, ecumenical, pilgrimage).
   - **Composition:** Speech Writing ("Valedictory Speech for Outgoing School Prefects" with formal address protocols).
   - **Literature:** Non-African Drama — *Look Back in Anger* by John Osborne or *Fences* by August Wilson.

8. **Week 8:**
   - **Speech Work:** Intonation Patterns (Tune 1: Falling tone for declarative statements and Wh-questions; Tune 2: Rising tone for Yes/No questions and polite requests).
   - **Grammar:** Direct and Indirect / Reported Speech (tense backshifting rules, pronoun modifications, spatial/temporal adverb transformations).
   - **Comprehension:** Summary Writing Mastery (identifying topic sentences, stripping illustrative padding, writing concise grammatically complete summary sentences).
   - **Composition:** Debate Writing (formal debate protocol, vocatives, point rebuttal).
   - **Literature:** Recommended African Poetry — *The Leader and the Led* by Niyi Osundare (Animal allegory on Nigerian political leadership) and *Black Woman* by Léopold Sédar Senghor.

9. **Week 9:**
   - **Speech Work:** Consonant Clusters (Initial 2- and 3-consonant clusters like /spl-/, /str-/; final clusters like /-kts/, /-sks/, /-mpts/).
   - **Grammar:** Question Tags (Negative statements + positive tags, positive statements + negative tags, modal auxiliary rules, irregular exceptions like *"I am", "Let's"*).
   - **Comprehension:** Intensive reading and passage analysis.
   - **Composition:** Formal Report Writing (structure of an administrative or science excursion report, impersonal passive tone).
   - **Literature:** Non-African Poetry — *The Journey of the Magi* by T.S. Eliot (Spiritual transformation and disillusionment) or *Caged Bird* by Maya Angelou.

10. **Week 10:**
    - **Termly Revision:** Comprehensive synoptic review tables of English phonetics, clause parsing trees, and WAEC literary glossaries.

11. **Weeks 11 & 12:**
    - **Termly WAEC/NECO SSCE Mock Examination:**
      - Paper 1 Section 1: Objective Lexis and Structure (Vocabulary, Idioms, Antonyms, Synonyms).
      - Paper 1 Section 2: Oral English Test (Vowels, Consonants, Rhymes, Stress, Intonation).
      - Paper 1 Section 3: Unseen Reading Comprehension and Summary.
      - Paper 2: Essay Writing & Continuous Composition Guidelines.

---

## 2. Integration & Verification

1. **Create Module:** Write `src/data/ss1EnglishData.ts`.
2. **Register in Curriculum Data:**
   - Update `src/data/curriculumData.ts` to import `SS1_ENGLISH_TOPICS`, export it, and spread it into `NIGERIAN_CURRICULUM_TOPICS`.
3. **Verify Build:** Run `compile_applet` and `lint_applet` (`tsc --noEmit`).
4. **Git Sync:** Commit and push the new SS 1 English data directly to the user's GitHub repository.
