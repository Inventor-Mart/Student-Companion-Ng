export interface SpellingWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  sentence: string;
  origin?: string;
  level: number;
}

export const SPELLING_BEE_TIERS: SpellingWord[] = [
  // --- TIER 1: LEVELS 1 - 5 (Foundational Secondary & Junior WAEC) ---
  {
    id: 'sb-1',
    word: 'RHYTHM',
    phonetic: '/ˈrɪð.əm/',
    partOfSpeech: 'noun',
    definition: 'A strong, regular repeated pattern of movement or sound.',
    sentence: 'The traditional Yoruba talking drum produces a vibrant _____ that guides the dancers.',
    origin: 'Greek',
    level: 1
  },
  {
    id: 'sb-2',
    word: 'CALENDAR',
    phonetic: '/ˈkæl.ən.dər/',
    partOfSpeech: 'noun',
    definition: 'A chart or series of pages showing the days, weeks, and months of a particular year.',
    sentence: 'The secondary school academic _____ marks WAEC examinations for the month of May.',
    origin: 'Latin',
    level: 2
  },
  {
    id: 'sb-3',
    word: 'SEPARATE',
    phonetic: '/ˈsep.ər.ət/',
    partOfSpeech: 'adjective / verb',
    definition: 'Forming or viewed as a unit by itself; not joined or connected.',
    sentence: 'The chemistry teacher instructed the students to _____ the mixture using filtration.',
    origin: 'Latin',
    level: 3
  },
  {
    id: 'sb-4',
    word: 'DILEMMA',
    phonetic: '/daɪˈlem.ə/',
    partOfSpeech: 'noun',
    definition: 'A situation in which a difficult choice has to be made between two or more alternatives.',
    sentence: 'The prefect faced a moral _____ when deciding whether to report his classmate.',
    origin: 'Greek',
    level: 4
  },
  {
    id: 'sb-5',
    word: 'ACCOMMODATE',
    phonetic: '/əˈkɒm.ə.deɪt/',
    partOfSpeech: 'verb',
    definition: 'To provide lodging or sufficient space for somebody.',
    sentence: 'The new boarding school hostel was built to _____ over four hundred students.',
    origin: 'Latin',
    level: 5
  },

  // --- TIER 2: LEVELS 6 - 10 (Intermediate Senior WAEC & NECO) ---
  {
    id: 'sb-6',
    word: 'BUREAUCRACY',
    phonetic: '/bjʊəˈrɒk.rə.si/',
    partOfSpeech: 'noun',
    definition: 'A system of government in which most decisions are taken by state officials rather than elected representatives.',
    sentence: 'Excessive _____ in the ministry delayed the approval of the state scholarship fund.',
    origin: 'French',
    level: 6
  },
  {
    id: 'sb-7',
    word: 'OCCURRENCE',
    phonetic: '/əˈkʌr.əns/',
    partOfSpeech: 'noun',
    definition: 'An incident or event that happens.',
    sentence: 'A total solar eclipse is a rare astronomical _____ in West Africa.',
    origin: 'Latin',
    level: 7
  },
  {
    id: 'sb-8',
    word: 'PRIVILEGE',
    phonetic: '/ˈprɪv.əl.ɪdʒ/',
    partOfSpeech: 'noun',
    definition: 'A special right, advantage, or immunity granted to a particular person or group.',
    sentence: 'Representing Nigeria at the Pan-African Mathematics Olympiad was a great _____.',
    origin: 'Latin',
    level: 8
  },
  {
    id: 'sb-9',
    word: 'CONSCIENTIOUS',
    phonetic: '/ˌkɒn.ʃiˈen.ʃəs/',
    partOfSpeech: 'adjective',
    definition: 'Wishing to do what is right, especially to do one’s work or duty well and thoroughly.',
    sentence: 'The senior prefect was praised by the principal for her _____ approach to school duties.',
    origin: 'Latin',
    level: 9
  },
  {
    id: 'sb-10',
    word: 'LIAISON',
    phonetic: '/liˈeɪ.zɒn/',
    partOfSpeech: 'noun',
    definition: 'Communication or cooperation which facilitates a close working relationship between people or organizations.',
    sentence: 'The tutor served as a crucial _____ between the student and the scholarship board.',
    origin: 'French',
    level: 10
  },

  // --- TIER 3: LEVELS 11 - 15 (National Competition & Advanced Exam) ---
  {
    id: 'sb-11',
    word: 'ONOMATOPOEIA',
    phonetic: '/ˌɒn.əˌmæt.əˈpiː.ə/',
    partOfSpeech: 'noun',
    definition: 'The formation of a word from a sound associated with what is named (e.g. sizzle, cuckoo).',
    sentence: 'The English literature teacher asked the students to identify examples of _____ in the poem.',
    origin: 'Greek',
    level: 11
  },
  {
    id: 'sb-12',
    word: 'SURREPTITIOUS',
    phonetic: '/ˌsʌr.əpˈtɪʃ.əs/',
    partOfSpeech: 'adjective',
    definition: 'Kept secret, especially because it would not be approved of.',
    sentence: 'The invigilator caught the candidate making a _____ attempt to check his phone.',
    origin: 'Latin',
    level: 12
  },
  {
    id: 'sb-13',
    word: 'CHRYSANTHEMUM',
    phonetic: '/krɪˈsænθ.ə.məm/',
    partOfSpeech: 'noun',
    definition: 'A popular cultivated plant of the daisy family, with brightly coloured ornamental flowers.',
    sentence: 'The biology specimen featured the delicate floral petals of a cultivated _____.',
    origin: 'Greek',
    level: 13
  },
  {
    id: 'sb-14',
    word: 'BOURGEOISIE',
    phonetic: '/ˌbʊəʒ.wɑːˈziː/',
    partOfSpeech: 'noun',
    definition: 'The middle class, typically with reference to its perceived materialistic values or conventional attitudes.',
    sentence: 'In Karl Marx’s economic theory, the proletariat is locked in conflict with the ruling _____.',
    origin: 'French',
    level: 14
  },
  {
    id: 'sb-15',
    word: 'PARAPHERNALIA',
    phonetic: '/ˌpær.ə.fəˈneɪ.li.ə/',
    partOfSpeech: 'noun',
    definition: 'Miscellaneous articles, especially the equipment needed for a particular activity.',
    sentence: 'The science laboratory was neatly organized with all necessary chemistry _____.',
    origin: 'Greek',
    level: 15
  },

  // --- TIER 4: LEVELS 16 - 20 (National Grand Finale) ---
  {
    id: 'sb-16',
    word: 'IDIOSYNCRASY',
    phonetic: '/ˌɪd.i.əˈsɪŋ.krə.si/',
    partOfSpeech: 'noun',
    definition: 'A mode of behaviour or way of thought peculiar to an individual.',
    sentence: 'His habit of tapping the desk three times before solving any algebra equation was an endearing _____.',
    origin: 'Greek',
    level: 16
  },
  {
    id: 'sb-17',
    word: 'RECONNAISSANCE',
    phonetic: '/rɪˈkɒn.ɪ.səns/',
    partOfSpeech: 'noun',
    definition: 'Military observation of a region to locate an enemy or ascertain strategic features.',
    sentence: 'The geography club conducted an aerial _____ of the erosion gullies in Enugu state.',
    origin: 'French',
    level: 17
  },
  {
    id: 'sb-18',
    word: 'SESQUIPEDALIAN',
    phonetic: '/ˌses.kwɪ.pɪˈdeɪ.li.ən/',
    partOfSpeech: 'adjective',
    definition: 'Characterized by the use of long and ponderous words.',
    sentence: 'The debate speaker’s _____ vocabulary impressed the panel of WAEC examiners.',
    origin: 'Latin',
    level: 18
  },
  {
    id: 'sb-19',
    word: 'PULCHRITUDINOUS',
    phonetic: '/ˌpʌl.krɪˈtjuː.dɪ.nəs/',
    partOfSpeech: 'adjective',
    definition: 'Having great physical beauty and aesthetic charm.',
    sentence: 'The essay celebrated the _____ landscapes of the Obudu Cattle Ranch in Cross River.',
    origin: 'Latin',
    level: 19
  },
  {
    id: 'sb-20',
    word: 'PRESTIDIGITATION',
    phonetic: '/ˌpres.tɪˌdɪdʒ.ɪˈteɪ.ʃən/',
    partOfSpeech: 'noun',
    definition: 'Magic tricks performed as entertainment; sleight of hand.',
    sentence: 'The physics teacher explained optical illusions as scientific demonstrations rather than mere _____.',
    origin: 'French',
    level: 20
  },

  // --- TIER 5: LEVELS 21 - 25 (International Olympiad Masters) ---
  {
    id: 'sb-21',
    word: 'ANTIDISESTABLISHMENTARIANISM',
    phonetic: '/ˌæn.ti.dɪs.ɪˌstæb.lɪʃ.mənˈteə.ri.ə.nɪ.zəm/',
    partOfSpeech: 'noun',
    definition: 'Opposition to the disestablishment of a state church or traditional institutional system.',
    sentence: 'The historic British debate was famously centered around the principle of _____.',
    origin: 'Latin / English',
    level: 21
  },
  {
    id: 'sb-22',
    word: 'FLOCCINAUCINIHILIPILIFICATION',
    phonetic: '/ˌflɒk.sɪ.nɔː.sɪ.nɪ.hɪl.ɪˌpɪl.ɪ.fɪˈkeɪ.ʃən/',
    partOfSpeech: 'noun',
    definition: 'The action or habit of estimating something as valueless or insignificant.',
    sentence: 'His disdainful _____ of the student project was firmly rebuked by the headmaster.',
    origin: 'Latin',
    level: 22
  },
  {
    id: 'sb-23',
    word: 'MAGNANIMITY',
    phonetic: '/ˌmæɡ.nəˈnɪm.ə.ti/',
    partOfSpeech: 'noun',
    definition: 'The condition of being very generous or forgiving, especially toward a rival or less powerful person.',
    sentence: 'The winning school showed inspiring _____ by warmly congratulating the defeated finalists.',
    origin: 'Latin',
    level: 23
  },
  {
    id: 'sb-24',
    word: 'EQUANIMITY',
    phonetic: '/ˌek.wəˈnɪm.ə.ti/',
    partOfSpeech: 'noun',
    definition: 'Mental calmness, composure, and evenness of temper, especially in a difficult situation.',
    sentence: 'She maintained her _____ even under the intense pressure of the national TV quiz finals.',
    origin: 'Latin',
    level: 24
  },
  {
    id: 'sb-25',
    word: 'UBIQUITOUS',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    partOfSpeech: 'adjective',
    definition: 'Present, appearing, or found everywhere at the same time.',
    sentence: 'Mobile phones and internet connectivity have become _____ in modern Nigerian cities.',
    origin: 'Latin',
    level: 25
  }
];

// Expanded procedural vocabulary bank for levels > 25 (Infinite scaling)
const PROCEDURAL_INFINITE_POOL: Omit<SpellingWord, 'id' | 'level'>[] = [
  {
    word: 'ANACHRONISTIC',
    phonetic: '/əˌnæk.rəˈnɪs.tɪk/',
    partOfSpeech: 'adjective',
    definition: 'Belonging or appropriate to an earlier period, especially so as to seem old-fashioned.',
    sentence: 'Relying exclusively on paper ledgers in a modern fintech bank is considered completely _____.',
    origin: 'Greek'
  },
  {
    word: 'EPHEMERAL',
    phonetic: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'adjective',
    definition: 'Lasting for a very short time; transitory.',
    sentence: 'The dry-season morning dew in the savannah is _____ and evaporates with the sunrise.',
    origin: 'Greek'
  },
  {
    word: 'PERSPICACIOUS',
    phonetic: '/ˌpɜː.spɪˈkeɪ.ʃəs/',
    partOfSpeech: 'adjective',
    definition: 'Having a ready insight into and understanding of things; shrewd.',
    sentence: 'The _____ student quickly identified the hidden variable in the simultaneous equation.',
    origin: 'Latin'
  },
  {
    word: 'VERISIMILITUDE',
    phonetic: '/ˌver.ɪ.sɪˈmɪl.ɪ.tjuːd/',
    partOfSpeech: 'noun',
    definition: 'The appearance of being true or real.',
    sentence: 'The historical novel captured the 1960 Nigerian independence celebrations with remarkable _____.',
    origin: 'Latin'
  },
  {
    word: 'QUINTESSENTIAL',
    phonetic: '/ˌkwɪn.tɪˈsen.ʃəl/',
    partOfSpeech: 'adjective',
    definition: 'Representing the most perfect or typical example of a quality or class.',
    sentence: 'Chinua Achebe’s Things Fall Apart is widely recognized as the _____ classic of African literature.',
    origin: 'Latin'
  },
  {
    word: 'SERENDIPITY',
    phonetic: '/ˌser.ənˈdɪp.ə.ti/',
    partOfSpeech: 'noun',
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    sentence: 'Discovering the rare reference textbook at the local Lagos market was a moment of pure _____.',
    origin: 'Persian / English'
  },
  {
    word: 'CACOPHONY',
    phonetic: '/kəˈkɒf.ən.i/',
    partOfSpeech: 'noun',
    definition: 'A harsh, discordant mixture of sounds.',
    sentence: 'The market erupted into a _____ of car horns, street vendors, and bustling traders.',
    origin: 'Greek'
  },
  {
    word: 'SYCOPHANT',
    phonetic: '/ˈsɪk.ə.fænt/',
    partOfSpeech: 'noun',
    definition: 'A person who acts obsequiously toward someone important in order to gain advantage.',
    sentence: 'The courageous prefect spoke the truth plainly instead of behaving like an unprincipled _____.',
    origin: 'Greek'
  },
  {
    word: 'MELLIFLUOUS',
    phonetic: '/meˈlɪf.lu.əs/',
    partOfSpeech: 'adjective',
    definition: 'Pleasingly smooth and musical to hear.',
    sentence: 'The school choir’s _____ rendition of the Nigerian national anthem held everyone spellbound.',
    origin: 'Latin'
  },
  {
    word: 'PUSILLANIMOUS',
    phonetic: '/ˌpjuː.sɪˈlæn.ɪ.məs/',
    partOfSpeech: 'adjective',
    definition: 'Showing a lack of courage or determination; timid.',
    sentence: 'The brave captain refused to make a _____ retreat in the face of fierce competition.',
    origin: 'Latin'
  }
];

export function getWordForLevel(level: number): SpellingWord {
  // If in curated tiers 1 - 25
  const found = SPELLING_BEE_TIERS.find(w => w.level === level);
  if (found) return found;

  // Infinite scaling: pick from infinite pool cycling and varying deterministically
  const poolIndex = (level - 26) % PROCEDURAL_INFINITE_POOL.length;
  const base = PROCEDURAL_INFINITE_POOL[poolIndex];

  return {
    id: `sb-inf-${level}`,
    word: base.word,
    phonetic: base.phonetic,
    partOfSpeech: base.partOfSpeech,
    definition: base.definition,
    sentence: base.sentence,
    origin: base.origin,
    level
  };
}
