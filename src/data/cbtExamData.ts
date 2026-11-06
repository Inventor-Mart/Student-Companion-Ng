import { CBTExam } from '../types';

export const CBT_EXAMS_DATABASE: CBTExam[] = [
  // --- 1. JAMB UTME BIOLOGY ---
  {
    id: 'jamb-utme-biology-2025',
    examType: 'JAMB_UTME',
    title: 'JAMB UTME Biology National Mock',
    subject: 'Biology',
    classLevel: 'SS 3',
    durationMinutes: 10,
    year: 2025,
    xpReward: 350,
    questions: [
      {
        id: 1,
        question: 'Which of the following cellular organelles is primarily responsible for the synthesis of adenosine triphosphate (ATP) during aerobic cellular respiration?',
        options: [
          'Ribosome',
          'Mitochondrion',
          'Endoplasmic Reticulum',
          'Golgi apparatus'
        ],
        correctOptionIndex: 1,
        explanation: 'The mitochondrion is known as the powerhouse of the cell because the Krebs cycle and oxidative phosphorylation take place within its inner membrane and matrix to generate ATP.',
        topicRef: 'Cell Biology'
      },
      {
        id: 2,
        question: 'In human genetics, if both parents have heterozygous sickle cell trait (HbAS), what is the probability that their first child will inherit sickle cell anemia (HbSS)?',
        options: [
          '100% (1.00)',
          '50% (0.50)',
          '25% (0.25)',
          '0% (0.00)'
        ],
        correctOptionIndex: 2,
        explanation: 'A cross between AS and AS yields genotypes AA (25%), AS (50%), and SS (25%). Thus, there is a 1 in 4 (25%) probability of an SS child.',
        topicRef: 'Genetics & Heredity'
      },
      {
        id: 3,
        question: 'Which of the following blood groups is designated as the universal donor for red blood cells because its erythrocytes lack A and B surface antigens?',
        options: [
          'Blood Group AB positive',
          'Blood Group O negative',
          'Blood Group A positive',
          'Blood Group B negative'
        ],
        correctOptionIndex: 1,
        explanation: 'Group O negative blood contains neither A nor B antigens on RBC membranes, nor the Rh(D) antigen, preventing hemolytic agglutination reactions in recipients.',
        topicRef: 'Circulatory System'
      },
      {
        id: 4,
        question: 'The relationship between nitrogen-fixing bacteria (*Rhizobium*) inhabiting the root nodules of leguminous plants (*cowpea*) is an example of:',
        options: [
          'Commensalism',
          'Mutualism / Symbiosis',
          'Parasitism',
          'Amensalism'
        ],
        correctOptionIndex: 1,
        explanation: 'Mutualism is an obligate or beneficial association where both organisms benefit: Rhizobium fixes atmospheric nitrogen for the plant, while the cowpea supplies carbohydrates and shelter.',
        topicRef: 'Ecology'
      },
      {
        id: 5,
        question: 'During photosynthesis in green plants, the light-dependent photolysis of water occurs in the:',
        options: [
          'Thylakoid membrane / Grana of chloroplasts',
          'Stroma of chloroplasts',
          'Cytoplasm of palisade cells',
          'Outer mitochondrial membrane'
        ],
        correctOptionIndex: 0,
        explanation: 'The light reactions and photolysis of water occur across the thylakoid membrane/grana, while the dark light-independent Calvin cycle occurs in the stroma.',
        topicRef: 'Plant Physiology'
      }
    ]
  },

  // --- 2. WAEC WASSCE PHYSICS ---
  {
    id: 'waec-physics-mechanics-2024',
    examType: 'WAEC',
    title: 'WAEC WASSCE Physics Core Drill',
    subject: 'Physics',
    classLevel: 'SS 3',
    durationMinutes: 8,
    year: 2024,
    xpReward: 300,
    questions: [
      {
        id: 1,
        question: 'A projectile is launched from ground level with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Assuming g = 10 m/s², what is the total time of flight of the projectile?',
        options: [
          '2.0 seconds',
          '4.0 seconds',
          '6.0 seconds',
          '8.0 seconds'
        ],
        correctOptionIndex: 1,
        explanation: 'Time of flight T = (2 * u * sin θ) / g = (2 * 40 * sin 30°) / 10 = (80 * 0.5) / 10 = 40 / 10 = 4.0 seconds.',
        topicRef: 'Projectile Motion'
      },
      {
        id: 2,
        question: 'At what launch angle θ to the horizontal ground will a projectile achieve its maximum horizontal range in a vacuum?',
        options: [
          '30 degrees',
          '45 degrees',
          '60 degrees',
          '90 degrees'
        ],
        correctOptionIndex: 1,
        explanation: 'Horizontal range is given by R = (u² sin 2θ) / g. Range is maximized when sin 2θ = 1, meaning 2θ = 90°, so θ = 45°.',
        topicRef: 'Projectile Motion'
      },
      {
        id: 3,
        question: 'A body of mass 5 kg initially at rest is acted upon by a constant resultant force of 20 N for 3 seconds. What is the final momentum acquired by the body?',
        options: [
          '15 kg·m/s',
          '30 kg·m/s',
          '60 kg·m/s',
          '120 kg·m/s'
        ],
        correctOptionIndex: 2,
        explanation: 'Impulse = Change in Momentum = Force × time = 20 N × 3 s = 60 N·s = 60 kg·m/s.',
        topicRef: 'Newtonian Mechanics'
      },
      {
        id: 4,
        question: 'Which of the following electromagnetic waves has the highest frequency and shortest wavelength in the electromagnetic spectrum?',
        options: [
          'Radio waves',
          'Infrared radiation',
          'Ultraviolet rays',
          'Gamma rays'
        ],
        correctOptionIndex: 3,
        explanation: 'Gamma rays possess the highest frequency (above 10¹⁹ Hz) and highest photon energy, situated at the extreme high-energy end of the EM spectrum.',
        topicRef: 'Waves & Optics'
      }
    ]
  },

  // --- 3. WAEC WASSCE LITERATURE-IN-ENGLISH ---
  {
    id: 'waec-literature-african-prose-2025',
    examType: 'WAEC',
    title: 'WAEC Literature-in-English: Drama & African Prose',
    subject: 'Literature-in-English',
    classLevel: 'SS 3',
    durationMinutes: 10,
    year: 2025,
    xpReward: 350,
    questions: [
      {
        id: 1,
        question: 'In Wole Soyinka’s play "The Lion and the Jewel", the character Baroka is best described as:',
        options: [
          'A progressive westernized school teacher who rejects bride price',
          'The cunning Bale of Ilujinle who feigns impotence to woo Sidi',
          'The chief wrestler who abandons Yoruba traditions',
          'A colonial district commissioner imposing foreign taxes'
        ],
        correctOptionIndex: 1,
        explanation: 'Baroka, the "Lion" of Ilujinle, represents cunning traditional patriarchal authority. He spreads a false rumor of his loss of manhood through his head wife Sadiku to lower Sidi’s guard.',
        topicRef: 'African Drama'
      },
      {
        id: 2,
        question: 'In Buchi Emecheta’s novel "The Joys of Motherhood", Nnu Ego’s suffering primarily critiques:',
        options: [
          'The complete breakdown of agricultural trade during the Second World War',
          'The irony of traditional societal expectations equating a woman’s entire worth to childbearing',
          'The religious conflicts between missionary schools and native priests in Ibuza',
          'The rise of military rule in post-colonial West Africa'
        ],
        correctOptionIndex: 1,
        explanation: 'Emecheta uses poignant irony to show that despite sacrificing her vitality for her children in colonial Lagos, Nnu Ego dies alone by a roadside, proving the patriarchal promise of "joys of motherhood" to be tragic.',
        topicRef: 'African Prose'
      },
      {
        id: 3,
        question: '"The wind stood up and gave a shout / He whistled on his fingers and / Kicked the leaves and went about..." The dominant literary device in the excerpt is:',
        options: [
          'Oxymoron',
          'Personification',
          'Hyperbole',
          'Euphemism'
        ],
        correctOptionIndex: 1,
        explanation: 'Personification attributes human qualities, actions, and emotions (standing up, shouting, whistling on fingers, kicking leaves) to non-human inanimate objects or natural forces like the wind.',
        topicRef: 'Literary Appreciation'
      },
      {
        id: 4,
        question: 'A speech delivered by an actor alone on stage that reveals their innermost thoughts to the audience without being heard by other characters is a:',
        options: [
          'Dialogue',
          'Soliloquy',
          'Prologue',
          'Epilogue'
        ],
        correctOptionIndex: 1,
        explanation: 'A soliloquy is a dramatic convention where a character speaks their thoughts aloud when alone on stage, providing direct insight into their motives, dilemmas, and conscience.',
        topicRef: 'Dramatic Techniques'
      },
      {
        id: 5,
        question: 'In William Shakespeare’s "A Midsummer Night’s Dream", the love juice that causes characters to fall in love with the first living creature they see is extracted from:',
        options: [
          'The Root of Mandrake',
          'Love-in-Idleness (a wild purple pansy)',
          'The Golden Apple of Hesperides',
          'Deadly Nightshade'
        ],
        correctOptionIndex: 1,
        explanation: 'Oberon instructs Puck to fetch "Love-in-Idleness", a flower struck by Cupid’s bolt that turns purple and possesses magical love-enchantment powers when applied to sleeping eyelids.',
        topicRef: 'Non-African Drama'
      }
    ]
  },

  // --- 4. JAMB UTME GOVERNMENT ---
  {
    id: 'jamb-government-nigeria-2025',
    examType: 'JAMB_UTME',
    title: 'JAMB UTME Government & Political Institutions',
    subject: 'Government',
    classLevel: 'SS 3',
    durationMinutes: 9,
    year: 2025,
    xpReward: 330,
    questions: [
      {
        id: 1,
        question: 'Under the pre-colonial political system of the Yoruba (Old Oyo Empire), which supreme organ checked the excesses of the Alaafin and held the power to reject him by presenting an empty calabash?',
        options: [
          'The Are Ona Kakanfo',
          'The Oyomesi (Council of Kingmakers headed by the Bashorun)',
          'The Ogboni Confraternity alone',
          'The Ilari royal messengers'
        ],
        correctOptionIndex: 1,
        explanation: 'The Oyomesi was the supreme council of seven kingmakers led by the Bashorun. If the Alaafin acted tyrannically, the Oyomesi presented an empty calabash or parrot eggs, compelling him to commit ritual suicide.',
        topicRef: 'Pre-Colonial Administration'
      },
      {
        id: 2,
        question: 'Which colonial constitution introduced the "Elective Principle" in Nigeria, allowing 4 elected Africans (3 for Lagos and 1 for Calabar) into the Legislative Council in 1922?',
        options: [
          'Richards Constitution',
          'Clifford Constitution',
          'Macpherson Constitution',
          'Lyttelton Constitution'
        ],
        correctOptionIndex: 1,
        explanation: 'Sir Hugh Clifford introduced the Clifford Constitution in 1922, which introduced the elective principle and spurred Herbert Macaulay to form Nigeria’s first political party, the NNDP, in 1923.',
        topicRef: 'Constitutional Evolution'
      },
      {
        id: 3,
        question: 'The Lyttelton Constitution of 1954 is historically significant in Nigeria’s constitutional development primarily because it:',
        options: [
          'Abolished the elective principle completely',
          'Established a truly federal system of government with regional autonomy',
          'Introduced universal adult suffrage in Northern Nigeria',
          'Unified the colony and protectorate under Lord Lugard'
        ],
        correctOptionIndex: 1,
        explanation: 'The 1954 Lyttelton Constitution formally made Nigeria a Federation by dividing powers into Exclusive (Federal), Concurrent (Federal and Regional), and Residual (Regional) legislative lists.',
        topicRef: 'Federalism in Nigeria'
      },
      {
        id: 4,
        question: 'An independent government agency established to investigate citizens’ grievances and administrative injustices committed by public officials without court fees is the:',
        options: [
          'Federal Civil Service Commission',
          'Public Complaints Commission (Ombudsman)',
          'Code of Conduct Tribunal',
          'National Human Rights Commission only'
        ],
        correctOptionIndex: 1,
        explanation: 'The Public Complaints Commission acts as an Ombudsman to investigate administrative corruption, bureaucratic delays, unfair dismissals, and injustices by government ministries against ordinary citizens.',
        topicRef: 'Public Administration'
      }
    ]
  },

  // --- 5. WAEC WASSCE FURTHER MATHEMATICS ---
  {
    id: 'waec-further-maths-calculus-2025',
    examType: 'WAEC',
    title: 'WAEC Further Mathematics: Pure & Applied Calculus',
    subject: 'Further Mathematics',
    classLevel: 'SS 3',
    durationMinutes: 12,
    year: 2025,
    xpReward: 380,
    questions: [
      {
        id: 1,
        question: 'If y = (3x² - 5)⁴, find dy/dx using the chain rule (function of a function):',
        options: [
          '12x(3x² - 5)³',
          '24x(3x² - 5)³',
          '4(3x² - 5)³',
          '24x²(3x² - 5)³'
        ],
        correctOptionIndex: 1,
        explanation: 'Let u = 3x² - 5 => du/dx = 6x. y = u⁴ => dy/du = 4u³. By chain rule: dy/dx = (dy/du) * (du/dx) = 4(3x² - 5)³ * 6x = 24x(3x² - 5)³.',
        topicRef: 'Differential Calculus'
      },
      {
        id: 2,
        question: 'Evaluate the definite integral: ∫ from 0 to 2 of (3x² + 2x - 1) dx:',
        options: [
          '8',
          '10',
          '12',
          '14'
        ],
        correctOptionIndex: 1,
        explanation: 'Antiderivative: F(x) = [x³ + x² - x] from 0 to 2. F(2) = (2³ + 2² - 2) = (8 + 4 - 2) = 10. F(0) = 0. Value = 10 - 0 = 10.',
        topicRef: 'Integral Calculus'
      },
      {
        id: 3,
        question: 'Find the determinant of the 2x2 matrix M = [[4, 3], [2, 5]]:',
        options: [
          '14',
          '26',
          '20',
          '7'
        ],
        correctOptionIndex: 0,
        explanation: 'For a matrix [[a, b], [c, d]], det(M) = ad - bc = (4 * 5) - (3 * 2) = 20 - 6 = 14.',
        topicRef: 'Matrices & Determinants'
      },
      {
        id: 4,
        question: 'In how many distinct ways can a committee of 3 prefects be selected from a pool of 8 senior students?',
        options: [
          '56 ways',
          '336 ways',
          '24 ways',
          '120 ways'
        ],
        correctOptionIndex: 0,
        explanation: 'Order does not matter, so use combinations: ⁸C₃ = 8! / (3! * (8 - 3)!) = (8 * 7 * 6) / (3 * 2 * 1) = 336 / 6 = 56 ways.',
        topicRef: 'Permutations & Combinations'
      }
    ]
  },

  // --- 6. WAEC WASSCE AGRICULTURAL SCIENCE ---
  {
    id: 'waec-agric-science-2025',
    examType: 'WAEC',
    title: 'WAEC Agricultural Science: Soil & Animal Husbandry',
    subject: 'Agricultural Science',
    classLevel: 'SS 3',
    durationMinutes: 8,
    year: 2025,
    xpReward: 300,
    questions: [
      {
        id: 1,
        question: 'In the compound stomach of ruminant farm animals (cattle, sheep, goats), which chamber is considered the "true stomach" where enzymatic gastric digestion takes place?',
        options: [
          'Rumen (Paunch)',
          'Reticulum (Honeycomb)',
          'Omasum (Manyplies)',
          'Abomasum'
        ],
        correctOptionIndex: 3,
        explanation: 'The abomasum is the true stomach corresponding to the human monogastric stomach. It secretes hydrochloric acid and gastric enzymes (pepsin and rennin) for protein digestion.',
        topicRef: 'Animal Anatomy'
      },
      {
        id: 2,
        question: 'Which of the following fungal pathogens causes the devastating "Black Pod Disease" in Nigerian cocoa plantations (*Theobroma cacao*)?',
        options: [
          'Phytophthora palmivora',
          'Fusarium oxysporum',
          'Puccinia polysora',
          'Cercospora personata'
        ],
        correctOptionIndex: 0,
        explanation: 'Phytophthora palmivora is a fungal oomycete pathogen responsible for Black Pod Disease in cocoa, causing rotting of pods and severe yield losses in Ondo, Osun, and Cross River states.',
        topicRef: 'Crop Pathology'
      },
      {
        id: 3,
        question: 'The agricultural practice of growing a legume (e.g. cowpea, mucuna) and ploughing it green into the topsoil to enrich nitrogen and organic matter is known as:',
        options: [
          'Mulching',
          'Green Manuring',
          'Composting',
          'Crop Desiccation'
        ],
        correctOptionIndex: 1,
        explanation: 'Green manuring involves planting fast-growing leguminous cover crops and incorporating them into the soil while still green, replenishing humus, microbial life, and fixed nitrogen.',
        topicRef: 'Soil Fertility'
      },
      {
        id: 4,
        question: 'Which surveying instrument consists of 100 links measuring 66 feet (20.12 meters) in total length, widely used for measuring linear farm boundaries?',
        options: [
          "Gunter's Chain",
          'Prismatic Compass',
          'Ranging Pole',
          'Abney Level'
        ],
        correctOptionIndex: 0,
        explanation: "Gunter's chain is made of 100 steel links joined by rings, measuring exactly 66 feet or 22 yards. 10 square chains equal 1 acre, making it standard for farm land measurements.",
        topicRef: 'Farm Surveying'
      }
    ]
  },

  // --- 7. JAMB UTME CHRISTIAN RELIGIOUS STUDIES (CRS) ---
  {
    id: 'jamb-crs-biblical-studies-2025',
    examType: 'JAMB_UTME',
    title: 'JAMB UTME Christian Religious Studies (CRS)',
    subject: 'Christian Religious Studies (CRS)',
    classLevel: 'SS 3',
    durationMinutes: 8,
    year: 2025,
    xpReward: 320,
    questions: [
      {
        id: 1,
        question: 'According to the Genesis Chapter 1 creation account, on which day did God create celestial bodies: the sun, the moon, and the stars to rule the day and night?',
        options: [
          'First Day',
          'Third Day',
          'Fourth Day',
          'Sixth Day'
        ],
        correctOptionIndex: 2,
        explanation: 'Genesis 1:14-19 states that on the fourth day, God created lights in the expanse of the heavens (the greater light to rule the day and the lesser light to rule the night, and the stars).',
        topicRef: 'Old Testament Creation'
      },
      {
        id: 2,
        question: 'In the Epistle of Saint James (James 2:14-26), the apostle emphasizes that faith without works is:',
        options: [
          'Sufficient for justification in secret',
          'Dead and incapable of saving anyone',
          'Better than public charity',
          'Only applicable to Old Testament patriarchs'
        ],
        correctOptionIndex: 1,
        explanation: 'James argues that genuine saving faith naturally demonstrates itself through loving deeds and works of charity, declaring: "As the body without the spirit is dead, so faith without works is dead."',
        topicRef: 'Epistles & Faith'
      },
      {
        id: 3,
        question: 'In Jesus’ Sermon on the Mount (Matthew 5:9), what promise is explicitly given to the "peacemakers"?',
        options: [
          'They shall inherit the earth',
          'They shall be comforted',
          'They shall be called children of God',
          'They shall see God face to face'
        ],
        correctOptionIndex: 2,
        explanation: 'Matthew 5:9 reads: "Blessed are the peacemakers, for they shall be called children of God." (Blessed are the meek shall inherit the earth; blessed are the pure in heart shall see God).',
        topicRef: 'The Gospels'
      },
      {
        id: 4,
        question: 'Which prophet courageously confronted King Ahab on Mount Carmel, proving that Jehovah is the true living God when fire fell from heaven to consume the water-soaked sacrifice?',
        options: [
          'Prophet Elijah',
          'Prophet Elisha',
          'Prophet Jeremiah',
          'Prophet Amos'
        ],
        correctOptionIndex: 0,
        explanation: 'In 1 Kings 18, Prophet Elijah challenged the 450 prophets of Baal on Mount Carmel. God answered Elijah by fire, leading the people to proclaim: "The Lord, He is God!"',
        topicRef: 'Prophets of Israel'
      }
    ]
  },

  // --- 8. WAEC WASSCE CHEMISTRY ---
  {
    id: 'waec-chemistry-physical-organic-2025',
    examType: 'WAEC',
    title: 'WAEC WASSCE Chemistry: Electrochemistry & Bonding',
    subject: 'Chemistry',
    classLevel: 'SS 3',
    durationMinutes: 10,
    year: 2025,
    xpReward: 340,
    questions: [
      {
        id: 1,
        question: 'According to Faraday’s First Law of Electrolysis, the mass (m) of a substance liberated at an electrode during electrolysis is directly proportional to the:',
        options: [
          'Resistance of the electrolyte solution',
          'Quantity of electricity (Q = I * t) passed through the electrolyte',
          'Surface area of the cathode alone',
          'Volume of gas produced at standard temperature'
        ],
        correctOptionIndex: 1,
        explanation: 'Faraday’s 1st Law states that m ∝ Q => m = z * I * t, where m is liberated mass, I is electric current in amperes, t is time in seconds, and z is the electrochemical equivalent.',
        topicRef: 'Electrochemistry'
      },
      {
        id: 2,
        question: 'In the industrial Haber process for the synthesis of ammonia (N₂ + 3H₂ ⇌ 2NH₃, ΔH = -92 kJ/mol), which condition will shift the equilibrium position to the right to favor higher ammonia yield?',
        options: [
          'Decreasing the pressure in the reactor',
          'Increasing the temperature above 800°C',
          'Increasing the pressure and removing ammonia as it condenses',
          'Adding an inert gas at constant volume'
        ],
        correctOptionIndex: 2,
        explanation: 'By Le Chatelier’s Principle: Since the forward reaction reduces mole count (4 moles gas -> 2 moles gas), high pressure shifts equilibrium right. Continuous removal of NH₃ also drives product formation.',
        topicRef: 'Chemical Equilibrium'
      },
      {
        id: 3,
        question: 'Which of the following elements has the highest electronegativity value on the Pauling scale?',
        options: [
          'Chlorine (Cl)',
          'Oxygen (O)',
          'Fluorine (F)',
          'Nitrogen (N)'
        ],
        correctOptionIndex: 2,
        explanation: 'Fluorine has the highest electronegativity of all elements (4.0 on the Pauling scale) due to its small atomic radius and high effective nuclear charge.',
        topicRef: 'Periodic Table Trends'
      },
      {
        id: 4,
        question: 'What is the correct IUPAC systematic name for the organic compound: CH₃-CH(CH₃)-CH₂-COOH?',
        options: [
          '2-methylbutanoic acid',
          '3-methylbutanoic acid',
          '2-methylpropanoic acid',
          '4-carboxy-2-methylpropane'
        ],
        correctOptionIndex: 1,
        explanation: 'Number the carbon chain starting from the carboxylic carbon as C1: C1 is -COOH, C2 is -CH₂-, C3 has the methyl substituent -CH(CH₃)-, and C4 is -CH₃. Hence, 3-methylbutanoic acid.',
        topicRef: 'Organic Nomenclature'
      }
    ]
  },

  // --- 9. JAMB UTME ECONOMICS ---
  {
    id: 'jamb-economics-commercial-2025',
    examType: 'JAMB_UTME',
    title: 'JAMB UTME Economics Comprehensive',
    subject: 'Economics',
    classLevel: 'SS 3',
    durationMinutes: 8,
    year: 2025,
    xpReward: 320,
    questions: [
      {
        id: 1,
        question: 'Under perfect competition in the long run, the representative firm produces at an output level where:',
        options: [
          'Price = Marginal Cost = Minimum Average Total Cost',
          'Price > Marginal Cost',
          'Marginal Cost < Average Revenue',
          'Total Revenue is strictly minimized'
        ],
        correctOptionIndex: 0,
        explanation: 'Due to free entry and exit of firms, economic profits are competed away until P = MR = MC = minimum ATC, achieving productive and allocative efficiency.',
        topicRef: 'Market Structures'
      },
      {
        id: 2,
        question: 'When the percentage change in quantity demanded is exactly equal to the percentage change in price, price elasticity of demand is described as:',
        options: [
          'Perfect Inelastic (Ed = 0)',
          'Unitary Elastic (Ed = 1)',
          'Perfect Elastic (Ed = ∞)',
          'Fairly Inelastic (Ed < 1)'
        ],
        correctOptionIndex: 1,
        explanation: 'Unitary elasticity occurs when |%ΔQd / %ΔP| = 1. A 10% change in price causes an exact 10% change in quantity demanded in the opposite direction.',
        topicRef: 'Elasticity of Demand'
      },
      {
        id: 3,
        question: 'The Central Bank of Nigeria (CBN) can combat demand-pull inflation using contractionary monetary policy by:',
        options: [
          'Lowering the Monetary Policy Rate (MPR)',
          'Raising the Cash Reserve Ratio (CRR) for commercial banks',
          'Purchasing government treasury bills in Open Market Operations',
          'Printing additional currency notes'
        ],
        correctOptionIndex: 1,
        explanation: 'Increasing the CRR forces deposit money banks to hold more liquid reserves at the CBN, reducing their capacity to create credit and dampening money supply.',
        topicRef: 'Monetary Policy'
      },
      {
        id: 4,
        question: 'Which of the following is a direct tax according to the Nigerian fiscal taxation structure?',
        options: [
          'Value Added Tax (VAT)',
          'Customs import duties',
          'Personal Income Tax (PAYE)',
          'Excise duties on alcoholic beverages'
        ],
        correctOptionIndex: 2,
        explanation: 'Personal Income Tax (Pay-As-You-Earn) is levied directly on an individual’s earnings and its incidence cannot be shifted to a third party.',
        topicRef: 'Public Finance'
      }
    ]
  },

  // --- 10. BECE JUNIOR MATHEMATICS ---
  {
    id: 'bece-math-junior-2024',
    examType: 'BECE',
    title: 'BECE Junior Secondary Mathematics Drill',
    subject: 'Mathematics',
    classLevel: 'JSS 3',
    durationMinutes: 6,
    year: 2024,
    xpReward: 250,
    questions: [
      {
        id: 1,
        question: 'Solve for x in the linear algebraic equation: 3(2x - 4) = 4x + 8',
        options: [
          'x = 5',
          'x = 10',
          'x = 8',
          'x = 12'
        ],
        correctOptionIndex: 1,
        explanation: 'Expanding: 6x - 12 = 4x + 8. Collecting like terms: 6x - 4x = 8 + 12 => 2x = 20 => x = 10.',
        topicRef: 'Algebra'
      },
      {
        id: 2,
        question: 'The angles of a triangle are in the ratio 2 : 3 : 5. What is the magnitude of the largest angle?',
        options: [
          '36 degrees',
          '54 degrees',
          '90 degrees',
          '100 degrees'
        ],
        correctOptionIndex: 2,
        explanation: 'Sum of angles in a triangle is 180°. Total ratio parts = 2 + 3 + 5 = 10. The largest angle is (5/10) * 180° = 90° (a right-angled triangle).',
        topicRef: 'Geometry'
      },
      {
        id: 3,
        question: 'Find the simple interest on ₦50,000 invested at 8% per annum for 3 years.',
        options: [
          '₦4,000',
          '₦12,000',
          '₦15,000',
          '₦24,000'
        ],
        correctOptionIndex: 1,
        explanation: 'Simple Interest = (Principal * Rate * Time) / 100 = (50,000 * 8 * 3) / 100 = 1,200,000 / 100 = ₦12,000.',
        topicRef: 'Commercial Arithmetic'
      }
    ]
  },

  // --- 11. BECE JUNIOR ENGLISH LANGUAGE ---
  {
    id: 'bece-english-junior-2025',
    examType: 'BECE',
    title: 'BECE Junior English Language & Concord Drill',
    subject: 'English Language',
    classLevel: 'JSS 3',
    durationMinutes: 6,
    year: 2025,
    xpReward: 250,
    questions: [
      {
        id: 1,
        question: 'Choose the option that correctly completes the sentence: "Neither the teacher nor the students ______ in the classroom."',
        options: [
          'is',
          'are',
          'was',
          'has been'
        ],
        correctOptionIndex: 1,
        explanation: 'Under the rule of proximity in grammatical concord, when subjects are joined by "neither... nor", the verb agrees with the closer subject ("students", which is plural, hence "are").',
        topicRef: 'Grammatical Concord'
      },
      {
        id: 2,
        question: 'Identify the figure of speech in the phrase: "The wind whispered secrets through the open window."',
        options: [
          'Simile',
          'Metaphor',
          'Personification',
          'Hyperbole'
        ],
        correctOptionIndex: 2,
        explanation: 'Personification attributes human qualities (whispering secrets) to non-human entities (the wind).',
        topicRef: 'Figures of Speech'
      },
      {
        id: 3,
        question: 'What is the passive voice form of: "The principal addressed the assembly"?',
        options: [
          'The assembly was addressed by the principal',
          'The assembly had been addressed by the principal',
          'The assembly is being addressed by the principal',
          'The principal has addressed the assembly'
        ],
        correctOptionIndex: 0,
        explanation: 'Past simple active voice ("addressed") transforms to past simple passive ("was addressed").',
        topicRef: 'Active & Passive Voice'
      }
    ]
  },

  // --- 12. JSS 1 CONTINUOUS ASSESSMENT DRILL ---
  {
    id: 'jss1-math-basic-science-2025',
    examType: 'TERM_MOCK',
    title: 'JSS 1 Continuous Assessment: Foundations Drill',
    subject: 'Mathematics',
    classLevel: 'JSS 1',
    durationMinutes: 6,
    year: 2025,
    xpReward: 200,
    questions: [
      {
        id: 1,
        question: 'What is the Lowest Common Multiple (LCM) of 12, 18, and 24?',
        options: [
          '36',
          '48',
          '72',
          '96'
        ],
        correctOptionIndex: 2,
        explanation: 'Prime factorizations: 12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. LCM = 2³ × 3² = 8 × 9 = 72.',
        topicRef: 'Number & Numeration'
      },
      {
        id: 2,
        question: 'Express 0.375 as a common fraction in its simplest form.',
        options: [
          '3/8',
          '3/4',
          '7/16',
          '5/12'
        ],
        correctOptionIndex: 0,
        explanation: '0.375 = 375/1000. Dividing both numerator and denominator by 125 gives 3/8.',
        topicRef: 'Fractions & Decimals'
      },
      {
        id: 3,
        question: 'Which of the following properties distinguishes living things from non-living things (MR NIGER D)?',
        options: [
          'Ability to grow and reproduce',
          'Fixed geometric crystalline shape',
          'Complete absence of cellular respiration',
          'Zero response to environmental stimuli'
        ],
        correctOptionIndex: 0,
        explanation: 'All living organisms exhibit nutrition, irritability, movement, excretion, respiration, and reproduction (MR NIGER D).',
        topicRef: 'Basic Science & Biology'
      }
    ]
  },

  // --- 13. JSS 2 CONTINUOUS ASSESSMENT DRILL ---
  {
    id: 'jss2-algebra-integrated-science-2025',
    examType: 'TERM_MOCK',
    title: 'JSS 2 Termly Continuous Assessment Drill',
    subject: 'Mathematics',
    classLevel: 'JSS 2',
    durationMinutes: 6,
    year: 2025,
    xpReward: 220,
    questions: [
      {
        id: 1,
        question: 'Expand and simplify the algebraic expression: (2a + 3)(a - 4)',
        options: [
          '2a² - 5a - 12',
          '2a² + 5a - 12',
          '2a² - 8a + 12',
          '2a² - 12'
        ],
        correctOptionIndex: 0,
        explanation: '(2a + 3)(a - 4) = 2a² - 8a + 3a - 12 = 2a² - 5a - 12.',
        topicRef: 'Algebraic Expansion'
      },
      {
        id: 2,
        question: 'Calculate the area of a trapezium whose parallel sides are 14 cm and 10 cm, with a perpendicular height of 6 cm.',
        options: [
          '72 cm²',
          '144 cm²',
          '60 cm²',
          '84 cm²'
        ],
        correctOptionIndex: 0,
        explanation: 'Area of trapezium = 0.5 × (sum of parallel sides) × height = 0.5 × (14 + 10) × 6 = 0.5 × 24 × 6 = 72 cm².',
        topicRef: 'Plane Mensuration'
      },
      {
        id: 3,
        question: 'Which process in the water cycle involves liquid water changing into water vapor due to heat from the sun?',
        options: [
          'Condensation',
          'Evaporation',
          'Precipitation',
          'Transpiration'
        ],
        correctOptionIndex: 1,
        explanation: 'Evaporation is the phase transition from liquid water to atmospheric vapor powered by solar thermal energy.',
        topicRef: 'Environmental Science'
      }
    ]
  },

  // --- 14. SS 1 PROMOTIONAL CONTINUOUS ASSESSMENT DRILL ---
  {
    id: 'ss1-promotional-math-biology-2025',
    examType: 'TERM_MOCK',
    title: 'SS 1 Senior Continuous Assessment Drill',
    subject: 'Mathematics',
    classLevel: 'SS 1',
    durationMinutes: 7,
    year: 2025,
    xpReward: 260,
    questions: [
      {
        id: 1,
        question: 'Solve the simultaneous linear equations: 2x + y = 7 and x - y = 2',
        options: [
          'x = 3, y = 1',
          'x = 4, y = -1',
          'x = 2, y = 3',
          'x = 5, y = -3'
        ],
        correctOptionIndex: 0,
        explanation: 'Adding the two equations: (2x + x) + (y - y) = 7 + 2 => 3x = 9 => x = 3. Substituting x = 3 into second equation: 3 - y = 2 => y = 1.',
        topicRef: 'Simultaneous Equations'
      },
      {
        id: 2,
        question: 'In biological classification, which hierarchy represents the correct descending sequence from broadest to most specific?',
        options: [
          'Kingdom, Phylum, Class, Order, Family, Genus, Species',
          'Kingdom, Class, Phylum, Order, Genus, Family, Species',
          'Phylum, Kingdom, Order, Class, Family, Species, Genus',
          'Kingdom, Phylum, Order, Class, Genus, Family, Species'
        ],
        correctOptionIndex: 0,
        explanation: 'The Linnaean hierarchy: Kingdom, Phylum, Class, Order, Family, Genus, Species (mnemonic: King Philip Came Over For Good Soup).',
        topicRef: 'Classification of Living Things'
      },
      {
        id: 3,
        question: 'If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate the value of log₁₀ 18 without using a calculator.',
        options: [
          '1.2552',
          '0.7781',
          '1.5562',
          '0.9542'
        ],
        correctOptionIndex: 0,
        explanation: '18 = 2 × 3² => log₁₀ 18 = log₁₀ 2 + 2 log₁₀ 3 = 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552.',
        topicRef: 'Logarithms & Indices'
      }
    ]
  },

  // --- 15. SS 2 PROMOTIONAL ASSESSMENT DRILL ---
  {
    id: 'ss2-promotional-physics-chemistry-2025',
    examType: 'TERM_MOCK',
    title: 'SS 2 Senior Promotional Assessment Drill',
    subject: 'Physics',
    classLevel: 'SS 2',
    durationMinutes: 8,
    year: 2025,
    xpReward: 280,
    questions: [
      {
        id: 1,
        question: 'A car travelling at 20 m/s accelerates uniformly at 2.5 m/s² for 8 seconds. What total distance does it cover during this acceleration period?',
        options: [
          '240 meters',
          '160 meters',
          '320 meters',
          '200 meters'
        ],
        correctOptionIndex: 0,
        explanation: 'Using s = ut + 0.5at²: s = (20 × 8) + 0.5(2.5)(8²) = 160 + 0.5(2.5)(64) = 160 + 80 = 240 m.',
        topicRef: 'Kinematics & Motion'
      },
      {
        id: 2,
        question: 'According to Le Chatelier’s principle, what will happen to the equilibrium of an exothermic reaction (N₂ + 3H₂ ⇌ 2NH₃ + Heat) when temperature is increased?',
        options: [
          'Equilibrium shifts to the right (more NH₃ produced)',
          'Equilibrium shifts to the left (more N₂ and H₂ formed)',
          'No change occurs to product or reactant concentrations',
          'The equilibrium constant K increases'
        ],
        correctOptionIndex: 1,
        explanation: 'For an exothermic reaction, adding heat pushes the equilibrium in the endothermic reverse direction (to the left) to absorb the excess heat.',
        topicRef: 'Chemical Equilibrium'
      },
      {
        id: 3,
        question: 'What is the IUPAC name for the organic compound with chemical structure CH₃-CH(OH)-CH₂-CH₃?',
        options: [
          'Butan-2-ol',
          'Butan-1-ol',
          '2-methylpropan-2-ol',
          'Butanoic acid'
        ],
        correctOptionIndex: 0,
        explanation: 'A four-carbon saturated alkane chain with a hydroxyl (-OH) group on carbon 2 is designated Butan-2-ol.',
        topicRef: 'Organic Chemistry & Alkanols'
      }
    ]
  },
  // --- SS 1 BIOLOGY 2ND TERM EXAM ---
  {
    id: 'waec-biology-ss1-mock',
    examType: 'WAEC',
    title: 'WAEC SSCE Biology Promotional Exam (SS 1)',
    subject: 'Biology',
    classLevel: 'SS 1',
    durationMinutes: 15,
    year: 2025,
    xpReward: 350,
    questions: [
      {
        id: 1,
        question: 'Which of the following plant tissues is composed of dead cells with uniformly thickened, heavily lignified secondary walls?',
        options: [
          'Parenchyma',
          'Collenchyma',
          'Sclerenchyma',
          'Phloem companion cells'
        ],
        correctOptionIndex: 2,
        explanation: 'Sclerenchyma cells lose their protoplasts at maturity and develop thick, lignified secondary walls providing rigid, non-elastic mechanical strength.',
        topicRef: 'Plant Tissues & Histology'
      },
      {
        id: 2,
        question: 'The stepped growth curve observed in insects and other arthropods is a direct consequence of:',
        options: [
          'Seasonal temperature variations',
          'Periodic ecdysis of the rigid chitinous exoskeleton',
          'Alternation of sexual and asexual generations',
          'Fluctuation in blood volume'
        ],
        correctOptionIndex: 1,
        explanation: 'Because the chitinous exoskeleton is non-expandable once hardened, growth can only occur immediately after shedding the old cuticle (ecdysis) before the new one hardens.',
        topicRef: 'Supporting Systems & Skeletons'
      },
      {
        id: 3,
        question: 'During photosynthesis, the photolysis of water in the thylakoid grana yields:',
        options: [
          'Carbon dioxide, glucose, and ADP',
          'Protons, electrons, and oxygen gas',
          'Lactic acid and ATP',
          'Sucrose and water vapor'
        ],
        correctOptionIndex: 1,
        explanation: 'Photolysis is the light-driven catalytic splitting of water molecules into hydrogen ions (protons), electrons, and free oxygen gas as a byproduct.',
        topicRef: 'Plant Nutrition & Photosynthesis'
      },
      {
        id: 4,
        question: 'A food sample treated with sodium hydroxide followed by copper (II) sulphate solution produces a distinct violet coloration. This indicates the presence of:',
        options: [
          'Reducing sugars',
          'Starch',
          'Proteins',
          'Lipids'
        ],
        correctOptionIndex: 2,
        explanation: 'The Biuret test produces a violet or purple coloration in the presence of peptide bonds found in protein molecules.',
        topicRef: 'Food Tests & Animal Nutrition'
      },
      {
        id: 5,
        question: 'Why does the left ventricle of the mammalian heart possess a much thicker muscular wall than the right ventricle?',
        options: [
          'It pumps blood against high systemic resistance to all parts of the body',
          'It contains deoxygenated blood under low pressure',
          'It houses the sinoatrial pacemaker node',
          'It connects directly to the pulmonary artery'
        ],
        correctOptionIndex: 0,
        explanation: 'The left ventricle pumps oxygenated blood through the systemic aorta to distant body extremities, requiring substantial muscular force compared to the short pulmonary circuit.',
        topicRef: 'Mammalian Circulatory System'
      },
      {
        id: 6,
        question: 'In the human nephron, ultrafiltration takes place under high hydrostatic pressure primarily because:',
        options: [
          'The Loop of Henle is surrounded by a dense capillary network',
          'The afferent arteriole entering the glomerulus is wider than the efferent arteriole leaving it',
          'The renal vein contains valves',
          'Antidiuretic hormone stimulates renal blood flow'
        ],
        correctOptionIndex: 1,
        explanation: 'The diameter differential between the wide afferent arteriole and the narrow efferent arteriole creates high filtration pressure inside the glomerular capillaries.',
        topicRef: 'Excretory Systems & Nephron Physiology'
      }
    ]
  }
];
