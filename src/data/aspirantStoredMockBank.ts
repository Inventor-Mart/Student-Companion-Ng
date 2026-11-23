import { StoredMockExam, StoredMockQuestion } from '../types';

type CompactQ = [
  subject: string,
  topic: string,
  question: string,
  options: [string, string, string, string],
  correctAnswer: number,
  explanation: string,
  passage?: string
];

function buildQuestions(prefix: string, items: CompactQ[]): StoredMockQuestion[] {
  const seen = new Set<string>();
  const out: StoredMockQuestion[] = [];
  items.forEach((item, idx) => {
    const [subject, topic, question, options, correctAnswer, explanation, passage] = item;
    const norm = question.trim().toLowerCase();
    if (seen.has(norm)) return;
    seen.add(norm);
    out.push({
      id: `${prefix}-q${String(idx + 1).padStart(3, '0')}`,
      subject,
      topic,
      question,
      options,
      correctAnswer,
      explanation,
      ...(passage ? { passage } : {})
    });
  });
  return out;
}

// ============================================================================
// 1. JAMB UTME COMPLETE MOCK #1 (FREE TIER ACCESSIBLE · 60 UNIQUE QUESTIONS)
// Subjects: Use of English (15), Mathematics (15), Physics (15), Chemistry (15)
// ============================================================================
const JAMB_MOCK_1_ITEMS: CompactQ[] = [
  // Use of English (15)
  ['Use of English', 'Lexis & Structure', 'Choose the word nearest in meaning to the capitalized word: The chairman gave a SUCCINCT summary of the committee report.', ['Brief and clear', 'Lengthy and detailed', 'Harsh and critical', 'Vague and uncertain'], 0, '"Succinct" means expressed clearly and briefly without unnecessary words.'],
  ['Use of English', 'Antonyms', 'Choose the option opposite in meaning to the capitalized word: The newly elected prefect proved remarkably MAGNANIMOUS toward his former rivals.', ['Generous', 'Vindictive', 'Courageous', 'Eloquent'], 1, '"Magnanimous" means generous and forgiving; "vindictive" means seeking revenge and holding grudges.'],
  ['Use of English', 'Concord', 'Every one of the candidates who sat for the screening exercise ________ expected to present an original birth certificate.', ['are', 'were', 'is', 'have been'], 2, '"Every one" is a singular indefinite pronoun phrase and takes the singular verb "is".'],
  ['Use of English', 'Idioms', 'After years of hesitation, the entrepreneur finally BIT THE BULLET and launched her manufacturing plant.', ['Canceled the plan out of fear', 'Faced a difficult situation with courage', 'Borrowed money illegally', 'Ignored expert warnings'], 1, 'To "bite the bullet" means to force oneself to perform a painful or difficult action decisively.'],
  ['Use of English', 'Oral English', 'Which of the following words has the SAME vowel sound as the underlined letters in "cOUrl" / "bOArd"?', ['Word', 'Sword', 'Flood', 'Good'], 1, '"Sword" shares the long back rounded vowel /ɔː/ with "board".'],
  ['Use of English', 'Stress Pattern', 'Identify the correct primary stress pattern for the word "DEMOCRATIC":', ['DE-mo-cra-tic', 'de-MO-cra-tic', 'de-mo-CRA-tic', 'de-mo-cra-TIC'], 2, 'Words ending in "-ic" typically carry primary stress on the syllable immediately preceding the suffix: de-mo-CRA-tic.'],
  ['Use of English', 'Prepositions', 'The external auditor insisted ________ inspecting every voucher signed during the third quarter.', ['to', 'for', 'on', 'with'], 2, 'The verb "insist" collocates with the preposition "on" followed by a gerund ("insisted on inspecting").'],
  ['Use of English', 'Question Tags', 'You rarely attend the Saturday morning tutorial classes, ________?', ['do you', 'don’t you', 'did you', 'aren’t you'], 0, 'Negative adverbs such as "rarely", "seldom", and "hardly" make the statement negative, requiring a positive tag ("do you?").'],
  ['Use of English', 'Reported Speech', 'Convert to indirect speech: "I will submit the laboratory report tomorrow," Tolu promised.', ['Tolu promised that he will submit the laboratory report tomorrow.', 'Tolu promised that he would submit the laboratory report the following day.', 'Tolu promised that he submits the laboratory report the next day.', 'Tolu promised that he had submitted the laboratory report yesterday.'], 1, 'In indirect speech, "will" backshifts to "would" and "tomorrow" shifts to "the following day".'],
  ['Use of English', 'Registers', 'In banking terminology, a cheque that the bank refuses to pay because of insufficient funds is described as:', ['Endorsed', 'Dishonoured', 'Crossed', 'Cleared'], 1, 'A cheque rejected by the drawee bank due to insufficient funds or irregularities is termed a dishonoured (bounced) cheque.'],
  ['Use of English', 'Comprehension', 'Based on the passage, what primary advantage do solar micro-grids offer rural clinics?', ['They replace trained physicians with software', 'They maintain uninterrupted vaccine refrigeration and night-time care', 'They eliminate the need for national hospitals', 'They generate revenue by exporting electricity overseas'], 1, 'The passage highlights uninterrupted power for vaccine cold chains and nocturnal obstetric care.', 'Across northern and riverine communities in Nigeria, decentralized solar micro-grids are transforming primary healthcare. Clinics that previously lost vaccine potency during grid outages now run cold-chain refrigerators around the clock and attend safely to night-time deliveries.'],
  ['Use of English', 'Comprehension', 'Which word could best replace "potency" as used in the passage above?', ['Weight', 'Effectiveness', 'Color', 'Scarcity'], 1, 'In medical usage, vaccine potency refers to its biological effectiveness or strength.', 'Across northern and riverine communities in Nigeria, decentralized solar micro-grids are transforming primary healthcare. Clinics that previously lost vaccine potency during grid outages now run cold-chain refrigerators around the clock and attend safely to night-time deliveries.'],
  ['Use of English', 'Sentence Interpretation', 'Had the goalkeeper anticipated the deflection, the home team would have lifted the trophy. This implies that:', ['The goalkeeper saved the shot', 'The home team won the trophy easily', 'The goalkeeper did not anticipate the deflection and the team lost the trophy', 'The match was postponed due to rain'], 2, 'The inverted third-conditional clause ("Had he anticipated...") expresses a contrary-to-fact past event.'],
  ['Use of English', 'Spelling & Mechanics', 'Identify the correctly spelled word from the options below:', ['Accomodation', 'Acommodation', 'Accommodation', 'Accommadation'], 2, '"Accommodation" is spelled with double "c" and double "m".'],
  ['Use of English', 'Clauses', 'In the sentence "Although the traffic was heavy, the delegates arrived punctually," the italicized opening clause is an adverbial clause of:', ['Reason', 'Condition', 'Concession', 'Purpose'], 2, 'Clauses introduced by "although", "though", or "even though" express concession (contrast).'],

  // Mathematics (15)
  ['Mathematics', 'Indices', 'Evaluate (27 / 8)^(-2/3).', ['4 / 9', '9 / 4', '2 / 3', '3 / 2'], 0, 'Invert for the negative exponent: (8/27)^(2/3) = (2/3)^2 = 4/9.'],
  ['Mathematics', 'Logarithms', 'If log₁₀(x) = 2 and log₁₀(y) = 3, find the value of log₁₀(x²y).', ['7', '12', '6', '5'], 0, 'log₁₀(x²y) = 2log₁₀(x) + log₁₀(y) = 2(2) + 3 = 7.'],
  ['Mathematics', 'Surds', 'Rationalize the denominator of 6 / (√5 - √2).', ['2(√5 + √2)', '3(√5 + √2)', '6(√5 - √2)', '√5 + √2'], 0, 'Multiply numerator and denominator by (√5 + √2): 6(√5 + √2) / (5 - 2) = 6(√5 + √2)/3 = 2(√5 + √2).'],
  ['Mathematics', 'Quadratic Equations', 'If α and β are the roots of 2x² - 7x + 3 = 0, compute α + β + αβ.', ['5', '7 / 2', '2', '10'], 0, 'Sum of roots α + β = 7/2 and product αβ = 3/2. Their sum is (7/2) + (3/2) = 10/2 = 5.'],
  ['Mathematics', 'Sequences & Series', 'The 4th term of an arithmetic progression is 14 and the 9th term is 34. Find the first term.', ['2', '4', '6', '-2'], 0, 'a + 3d = 14 and a + 8d = 34 => 5d = 20 => d = 4. Substituting back: a = 14 - 12 = 2.'],
  ['Mathematics', 'Matrices', 'Find the determinant of the 2×2 matrix [[5, 3], [2, 4]].', ['14', '26', '20', '-14'], 0, 'Determinant = (5 × 4) - (3 × 2) = 20 - 6 = 14.'],
  ['Mathematics', 'Differentiation', 'Differentiate y = 4x³ - 5x² + 7x - 9 with respect to x.', ['12x² - 10x + 7', '12x² - 5x + 7', '4x² - 10x + 7', '12x³ - 10x + 7'], 0, 'Applying the power rule term-by-term gives dy/dx = 12x² - 10x + 7.'],
  ['Mathematics', 'Integration', 'Evaluate the definite integral ∫₀² (3x² + 2x) dx.', ['12', '8', '10', '16'], 0, 'Antiderivative is [x³ + x²] from 0 to 2 = (8 + 4) - 0 = 12.'],
  ['Mathematics', 'Trigonometry', 'If sin θ = 5/13 and θ is acute, find the value of tan θ.', ['5 / 12', '12 / 13', '12 / 5', '5 / 13'], 0, 'By Pythagoras, adjacent = √(13² - 5²) = 12. Therefore tan θ = opposite / adjacent = 5/12.'],
  ['Mathematics', 'Circle Geometry', 'An arc of a circle of radius 14 cm subtends an angle of 90° at the center. Taking π = 22/7, find the arc length.', ['22 cm', '44 cm', '11 cm', '154 cm'], 0, 'Arc length = (θ/360) × 2πr = (90/360) × 2 × (22/7) × 14 = (1/4) × 88 = 22 cm.'],
  ['Mathematics', 'Permutation', 'In how many distinct ways can the letters of the word "LAGOS" be arranged?', ['120', '60', '24', '720'], 0, 'All 5 letters in LAGOS are distinct, so the number of permutations is 5! = 120.'],
  ['Mathematics', 'Probability', 'A fair die is rolled once. What is the probability of obtaining a prime number?', ['1 / 2', '1 / 3', '2 / 3', '1 / 6'], 0, 'Prime numbers on a standard die are {2, 3, 5}, giving 3/6 = 1/2.'],
  ['Mathematics', 'Coordinate Geometry', 'Find the gradient of the straight line passing through points P(-2, 3) and Q(4, 15).', ['2', '3', '1 / 2', '-2'], 0, 'Gradient m = (15 - 3) / (4 - (-2)) = 12 / 6 = 2.'],
  ['Mathematics', 'Sets', 'In a class of 50 students, 32 offer Physics, 28 offer Chemistry, and 5 offer neither. How many offer both?', ['15', '10', '20', '12'], 0, 'Union = 50 - 5 = 45. Both = 32 + 28 - 45 = 15.'],
  ['Mathematics', 'Variation', 'If y varies inversely as x² and y = 4 when x = 3, find y when x = 6.', ['1', '2', '8', '16'], 0, 'k = yx² = 4 × 9 = 36. When x = 6, y = 36 / 36 = 1.'],

  // Physics (15)
  ['Physics', 'Kinematics', 'A body accelerates uniformly from rest at 3 m/s² for 8 seconds. Calculate the distance covered.', ['96 m', '24 m', '48 m', '192 m'], 0, 'Using s = ut + ½at² with u = 0: s = ½ × 3 × 8² = 1.5 × 64 = 96 m.'],
  ['Physics', 'Work & Energy', 'A 5 kg crate is lifted vertically through a height of 4 m (g = 10 m/s²). What gravitational potential energy is gained?', ['200 J', '20 J', '50 J', '400 J'], 0, 'PE = mgh = 5 × 10 × 4 = 200 J.'],
  ['Physics', 'Waves', 'A wave travels at 340 m/s with a frequency of 170 Hz. Determine its wavelength.', ['2.0 m', '0.5 m', '4.0 m', '1.7 m'], 0, 'λ = v / f = 340 / 170 = 2.0 m.'],
  ['Physics', 'Electricity', 'Three 6 Ω resistors are connected in parallel. What is their combined equivalent resistance?', ['2 Ω', '18 Ω', '3 Ω', '1.5 Ω'], 0, '1/R = 1/6 + 1/6 + 1/6 = 3/6 = 1/2, hence R = 2 Ω.'],
  ['Physics', 'Optics', 'An object is placed 30 cm in front of a converging lens of focal length 15 cm. Where is the image formed?', ['30 cm on the opposite side', '15 cm on the opposite side', '10 cm on the same side', 'At infinity'], 0, '1/v = 1/f - 1/u = 1/15 - 1/30 = 1/30 => v = +30 cm (real image on opposite side, since object is at 2F).'],
  ['Physics', 'Thermal Physics', 'How much heat energy is required to raise the temperature of 2 kg of water by 10°C? (c = 4200 J/kg·K)', ['84,000 J', '42,000 J', '8,400 J', '21,000 J'], 0, 'Q = mcΔT = 2 × 4200 × 10 = 84,000 J.'],
  ['Physics', 'Machines', 'A pulley system has a velocity ratio of 5 and efficiency of 80%. What is its mechanical advantage?', ['4.0', '6.25', '3.5', '5.0'], 0, 'Efficiency = (MA / VR) × 100 => MA = 0.80 × 5 = 4.0.'],
  ['Physics', 'Gas Laws', 'At constant temperature, a gas occupies 600 cm³ at 1.0 atm. What volume will it occupy at 3.0 atm?', ['200 cm³', '1800 cm³', '300 cm³', '150 cm³'], 0, 'By Boyle’s Law P₁V₁ = P₂V₂ => V₂ = (1.0 × 600) / 3.0 = 200 cm³.'],
  ['Physics', 'Radioactivity', 'A radioactive isotope has a half-life of 6 hours. What fraction remains undecayed after 18 hours?', ['1 / 8', '1 / 4', '1 / 3', '1 / 16'], 0, '18 hours = 3 half-lives. Remaining fraction = (1/2)³ = 1/8.'],
  ['Physics', 'Electromagnetism', 'A step-up transformer has 200 primary turns and 1000 secondary turns. If input voltage is 24 V AC, what is the output voltage?', ['120 V', '4.8 V', '240 V', '48 V'], 0, 'Vs / Vp = Ns / Np => Vs = 24 × (1000 / 200) = 120 V.'],
  ['Physics', 'Projectile Motion', 'A projectile is launched horizontally from a 45 m high cliff (g = 10 m/s²). How long does it take to hit the ground?', ['3 s', '4.5 s', '9 s', '2 s'], 0, 'h = ½gt² => 45 = 5t² => t² = 9 => t = 3 s.'],
  ['Physics', 'Pressure', 'Which instrument is specifically used to measure atmospheric pressure?', ['Barometer', 'Hydrometer', 'Hygrometer', 'Micrometer'], 0, 'A barometer measures atmospheric pressure; a hydrometer measures liquid relative density and a hygrometer measures humidity.'],
  ['Physics', 'Sound', 'Which property of a sound wave determines its pitch?', ['Frequency', 'Amplitude', 'Wave speed', 'Phase'], 0, 'Pitch depends on frequency, while loudness depends on amplitude.'],
  ['Physics', 'Electric Power', 'An electric iron rated 1000 W operates on a 250 V supply. What current flows through it?', ['4 A', '0.25 A', '25 A', '2.5 A'], 0, 'P = IV => I = P / V = 1000 / 250 = 4 A.'],
  ['Physics', 'Hooke’s Law', 'A spring extends by 4 cm when loaded with 20 N. What is its spring constant k in N/m?', ['500 N/m', '5 N/m', '80 N/m', '200 N/m'], 0, 'e = 0.04 m; k = F / e = 20 / 0.04 = 500 N/m.'],

  // Chemistry (15)
  ['Chemistry', 'Atomic Structure', 'An element has atomic number 17 and mass number 35. How many neutrons are in its nucleus?', ['18', '17', '35', '52'], 0, 'Number of neutrons = Mass number − Atomic number = 35 − 17 = 18.'],
  ['Chemistry', 'Stoichiometry', 'Calculate the molar mass of calcium trioxocarbonate(IV), CaCO₃. (Ca=40, C=12, O=16)', ['100 g/mol', '84 g/mol', '68 g/mol', '112 g/mol'], 0, 'Molar mass = 40 + 12 + (3 × 16) = 100 g/mol.'],
  ['Chemistry', 'Acids & Bases', 'What is the pH of a 0.001 mol/dm³ solution of strong monobasic acid HCl?', ['3', '1', '11', '4'], 0, '[H⁺] = 10⁻³ mol/dm³, so pH = -log₁₀(10⁻³) = 3.'],
  ['Chemistry', 'Chemical Bonding', 'Which type of bond is formed between sodium and chlorine in solid NaCl?', ['Electrovalent (Ionic)', 'Covalent', 'Metallic', 'Coordinate covalent'], 0, 'Sodium transfers one valence electron to chlorine, forming electrostatic attraction between Na⁺ and Cl⁻ ions.'],
  ['Chemistry', 'Organic Chemistry', 'What is the general molecular formula of the alkene homologous series?', ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₁OH'], 0, 'Alkenes contain one carbon–carbon double bond and follow CₙH₂ₙ (for n ≥ 2).'],
  ['Chemistry', 'Redox Reactions', 'Determine the oxidation number of manganese in potassium tetraoxomanganate(VII), KMnO₄.', ['+7', '+4', '+6', '+2'], 0, '+1 + Mn + 4(-2) = 0 => Mn = +7.'],
  ['Chemistry', 'Gas Preparation', 'Which drying agent is suitable for drying ammonia gas (NH₃) in the laboratory?', ['Calcium oxide (Quicklime)', 'Concentrated H₂SO₄', 'Fused CaCl₂', 'Phosphorus(V) oxide'], 0, 'Ammonia is basic and reacts with acidic drying agents or forms complexes with CaCl₂; basic CaO dries it safely.'],
  ['Chemistry', 'Electrolysis', 'During the electrolysis of concentrated aqueous NaCl (brine) using carbon electrodes, which gas is liberated at the cathode?', ['Hydrogen', 'Chlorine', 'Oxygen', 'Sodium vapor'], 0, 'H⁺ is lower in the electrochemical series than Na⁺, so H⁺ is preferentially discharged as H₂ gas at the cathode.'],
  ['Chemistry', 'Periodic Table', 'Which halogen exists as a reddish-brown liquid at room temperature?', ['Bromine', 'Chlorine', 'Fluorine', 'Iodine'], 0, 'Fluorine and chlorine are gases, bromine is a liquid, and iodine is a dark violet solid at room temperature.'],
  ['Chemistry', 'Rates of Reaction', 'Adding a positive catalyst to a chemical reaction increases the reaction rate by:', ['Providing an alternative pathway with lower activation energy', 'Increasing the enthalpy change ΔH', 'Shifting equilibrium strictly to the products', 'Raising the temperature of the reactants'], 0, 'A catalyst lowers the activation energy barrier without altering ΔH or equilibrium position.'],
  ['Chemistry', 'Hydrocarbons', 'Which reagent distinguishes an alkene (ethene) from an alkane (ethane) by decolorizing rapidly?', ['Bromine water', 'Limewater', 'Blue litmus paper', 'Aqueous NaOH'], 0, 'Unsaturated alkenes undergo rapid addition with reddish-brown bromine water, turning it colorless.'],
  ['Chemistry', 'Water Chemistry', 'Permanent hardness of water is caused primarily by dissolved:', ['Calcium and magnesium tetraoxosulphate(VI)', 'Calcium hydrogen trioxocarbonate(IV)', 'Sodium chloride', 'Potassium trioxonitrate(V)'], 0, 'Dissolved CaSO₄ and MgSO₄ cause permanent hardness which cannot be removed by simple boiling.'],
  ['Chemistry', 'Metals & Extraction', 'Aluminium is extracted industrially from purified bauxite (Al₂O₃) by:', ['Electrolysis of molten alumina dissolved in cryolite', 'Reduction with carbon monoxide in a blast furnace', 'Roasting in excess air', 'Displacement using zinc'], 0, 'Because aluminium is highly electropositive, it requires Hall–Héroult electrolysis in molten cryolite.'],
  ['Chemistry', 'Equilibrium', 'In the Haber process N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ), increasing pressure favors:', ['The forward reaction (more ammonia)', 'The backward reaction', 'No change in yield', 'Complete decomposition of nitrogen'], 0, '4 moles of gas form 2 moles of gas, so higher pressure shifts equilibrium toward fewer gas moles (NH₃).'],
  ['Chemistry', 'Separation Techniques', 'Crude oil is separated into petrol, kerosene, and diesel in a refinery using:', ['Fractional distillation', 'Sublimation', 'Paper chromatography', 'Decantation'], 0, 'Fractional distillation separates miscible hydrocarbon fractions based on differences in boiling points.']
];

// ============================================================================
// 2. JAMB UTME COMPLETE MOCK #2 (FREE TIER ACCESSIBLE · 60 UNIQUE QUESTIONS)
// Subjects: Use of English (15), Biology (15), Economics (15), Government (15)
// ============================================================================
const JAMB_MOCK_2_ITEMS: CompactQ[] = [
  // Use of English (15)
  ['Use of English', 'Synonyms', 'Choose the word closest in meaning to the capitalized word: The witness gave a CORROBORATING account of the accident.', ['Supporting', 'Contradicting', 'Exaggerated', 'Fictional'], 0, 'To corroborate means to confirm or give supporting evidence to a statement.'],
  ['Use of English', 'Antonyms', 'Choose the word most nearly opposite in meaning to the capitalized word: Rural farmers often face EPHEMERAL rainfall patterns.', ['Brief', 'Enduring', 'Sudden', 'Seasonal'], 1, '"Ephemeral" means short-lived; its opposite is "enduring" or lasting.'],
  ['Use of English', 'Grammar', 'Scarcely had the invigilator distributed the scripts ________ the power supply was restored.', ['than', 'when', 'while', 'after'], 1, '"Scarcely" and "hardly" correlate with "when" (whereas "no sooner" correlates with "than").'],
  ['Use of English', 'Idioms', 'The whistleblower decided to SPILL THE BEANS before the senate panel. This means she:', ['Wasted food at the canteen', 'Revealed confidential information', 'Resigned quietly without comment', 'Requested a recess'], 1, '"Spill the beans" is an idiom meaning to disclose secret or privileged facts.'],
  ['Use of English', 'Oral English', 'Which word contains a SILENT consonant letter?', ['Debt', 'Desk', 'Damp', 'Drum'], 0, 'In "debt" (/det/), the letter "b" is silent.'],
  ['Use of English', 'Stress Pattern', 'Select the option with the correct emphatic stress for: "ADEOLA bought a blue bicycle" (answering "Did Chinedu buy a blue bicycle?"):', ['ADEOLA bought a blue bicycle.', 'Adeola BOUGHT a blue bicycle.', 'Adeola bought a BLUE bicycle.', 'Adeola bought a blue BICYCLE.'], 0, 'Emphatic stress falls on the contrasted word "ADEOLA" rather than Chinedu.'],
  ['Use of English', 'Concord', 'The principal, together with his vice-principals, ________ inspecting the newly built science block.', ['are', 'were', 'is', 'have been'], 2, 'Parenthetical phrases introduced by "together with" or "as well as" do not make a singular subject plural; hence "is".'],
  ['Use of English', 'Prepositions', 'The panel found the contractor guilty ________ gross negligence.', ['for', 'with', 'of', 'about'], 2, 'The adjective "guilty" takes the preposition "of".'],
  ['Use of English', 'Register', 'In parliamentary procedure, the minimum number of members required to conduct valid business is called a:', ['Manifesto', 'Quorum', 'Referendum', 'Caucus'], 1, 'A quorum is the legally required minimum attendance to validate proceedings.'],
  ['Use of English', 'Comprehension', 'What main obstacle to urban rail transit does the passage identify?', ['Lack of willing passengers', 'High upfront capital cost and coordination across agencies', 'Absence of steel factories worldwide', 'Shortage of ticket printers'], 1, 'The passage explicitly cites upfront capital outlay and inter-agency coordination.', 'Rapid urbanization across West African megacities has made bus-only corridors insufficient during peak rush hours. Although light-rail systems require substantial upfront capital and tight coordination between municipal and federal agencies, they deliver unmatched passenger throughput and sharply cut urban emissions.'],
  ['Use of English', 'Comprehension', 'The tone of the passage toward urban light-rail transit is best described as:', ['Hostile', 'Pragmatically supportive', 'Sarcastic', 'Indifferent'], 1, 'The author acknowledges cost challenges while emphasizing unmatched throughput and lower emissions.', 'Rapid urbanization across West African megacities has made bus-only corridors insufficient during peak rush hours. Although light-rail systems require substantial upfront capital and tight coordination between municipal and federal agencies, they deliver unmatched passenger throughput and sharply cut urban emissions.'],
  ['Use of English', 'Sentence Completion', 'It is high time the committee ________ its final recommendations to the senate.', ['submits', 'submitted', 'will submit', 'submitting'], 1, 'The expression "It is high time" is followed by the past subjunctive form ("submitted").'],
  ['Use of English', 'Homophones', 'Choose the correct word to complete the sentence: The judge advised the lawyer to ________ relevant constitutional precedents.', ['sight', 'site', 'cite', 'side'], 2, '"Cite" means to quote or refer to an authority or legal precedent.'],
  ['Use of English', 'Active & Passive', 'Change to passive voice: "The engineers repaired the suspension bridge yesterday."', ['The suspension bridge was repaired by the engineers yesterday.', 'The suspension bridge is repaired by the engineers yesterday.', 'The engineers were repaired by the bridge yesterday.', 'The suspension bridge has been repairing yesterday.'], 0, 'Simple past active ("repaired") converts to simple past passive ("was repaired").'],
  ['Use of English', 'Figures of Speech', 'Identify the figure of speech in: "The dry harmattan wind whispered secrets through the cashew grove."', ['Personification', 'Oxymoron', 'Pun', 'Litotes'], 0, 'Attributing human speech ("whispered secrets") to the wind is personification.'],

  // Biology (15)
  ['Biology', 'Cell Biology', 'Which organelle is responsible for aerobic respiration and ATP synthesis in eukaryotic cells?', ['Mitochondrion', 'Ribosome', 'Lysosome', 'Golgi apparatus'], 0, 'Mitochondria oxidize glucose derivatives via the Krebs cycle and oxidative phosphorylation to synthesize ATP.'],
  ['Biology', 'Genetics', 'In a monohybrid cross between two heterozygous tall pea plants (Tt × Tt), what proportion of offspring will be dwarf (tt)?', ['25%', '50%', '75%', '100%'], 0, 'Genotypes are TT, Tt, Tt, tt — 1 out of 4 (25%) is homozygous recessive (tt).'],
  ['Biology', 'Plant Physiology', 'Which tissue transports manufactured sucrose from green leaves to storage organs in flowering plants?', ['Phloem', 'Xylem', 'Cambium', 'Epidermis'], 0, 'Phloem sieve tubes translocate organic nutrients (sugars) from sources to sinks.'],
  ['Biology', 'Human Nutrition', 'Which digestive enzyme secreted in the mouth begins the breakdown of cooked starch into maltose?', ['Salivary amylase (Ptyalin)', 'Pepsin', 'Lipase', 'Trypsin'], 0, 'Salivary amylase hydrolyzes starch to maltose in the slightly alkaline medium of the mouth.'],
  ['Biology', 'Ecology', 'In a terrestrial food chain (Grass → Grasshopper → Toad → Snake), the toad occupies which trophic level?', ['Third trophic level (Secondary consumer)', 'First trophic level', 'Second trophic level', 'Decomposer level'], 0, 'Grass (1st/producer) → Grasshopper (2nd/primary) → Toad (3rd/secondary consumer).'],
  ['Biology', 'Excretion', 'What is the functional structural unit of the mammalian kidney?', ['Nephron', 'Alveolus', 'Neuron', 'Villus'], 0, 'Each kidney contains roughly one million nephrons responsible for ultrafiltration and selective reabsorption.'],
  ['Biology', 'Circulation', 'Which blood vessel carries oxygenated blood from the lungs back to the left atrium of the heart?', ['Pulmonary vein', 'Pulmonary artery', 'Vena cava', 'Hepatic portal vein'], 0, 'The pulmonary vein is the sole vein carrying oxygenated blood to the left atrium.'],
  ['Biology', 'Homeostasis', 'Which pancreatic hormone lowers elevated blood glucose levels by stimulating glycogen storage in the liver?', ['Insulin', 'Glucagon', 'Adrenaline', 'Thyroxine'], 0, 'Beta cells of the Islets of Langerhans secrete insulin to convert excess glucose into glycogen.'],
  ['Biology', 'Microorganisms', 'Which vector transmits the Plasmodium parasite responsible for malaria?', ['Female Anopheles mosquito', 'Aedes mosquito', 'Tsetse fly', 'Housefly'], 0, 'Only the female Anopheles mosquito injects Plasmodium sporozoites during a blood meal.'],
  ['Biology', 'Osmosis', 'When an animal red blood cell is placed in pure distilled water, it swells and bursts in a process called:', ['Haemolysis', 'Plasmolysis', 'Crenation', 'Turgidity'], 0, 'Because animal cells lack a rigid cellulose wall, hypotonic water influx causes bursting (haemolysis).'],
  ['Biology', 'Photosynthesis', 'Which mineral element forms the central atom of every chlorophyll molecule?', ['Magnesium', 'Iron', 'Calcium', 'Potassium'], 0, 'Magnesium sits at the center of the chlorophyll porphyrin ring; deficiency causes chlorosis.'],
  ['Biology', 'Reproduction', 'Double fertilization is a unique reproductive feature found in:', ['Angiosperms (Flowering plants)', 'Bryophytes', 'Ferns', 'Fungi'], 0, 'In angiosperms, one male gamete fertilizes the egg (zygote) and the second fuses with polar nuclei (endosperm).'],
  ['Biology', 'Evolution', 'Structures such as the human arm, bat wing, and whale flipper that share a common evolutionary origin are called:', ['Homologous structures', 'Analogous structures', 'Vestigial organs', 'Mutant alleles'], 0, 'Homologous structures share a pentadactyl skeletal ancestry adapted for diverse functions.'],
  ['Biology', 'Nervous System', 'Which part of the human brain primarily coordinates muscular balance and posture?', ['Cerebellum', 'Medulla oblongata', 'Hypothalamus', 'Olfactory lobe'], 0, 'The cerebellum fine-tunes voluntary muscle coordination, balance, and posture.'],
  ['Biology', 'Soil Science', 'Which group of bacteria converts atmospheric nitrogen directly into nitrates inside legume root nodules?', ['Rhizobium', 'Nitrosomonas', 'Pseudomonas', 'Vibrio'], 0, 'Symbiotic Rhizobium bacteria fix atmospheric N₂ in the root nodules of cowpea, groundnut, and soybean.'],

  // Economics (15)
  ['Economics', 'Basic Concepts', 'The true cost of choosing one economic alternative expressed in terms of the next best foregone alternative is:', ['Opportunity cost', 'Marginal revenue', 'Sunk cost', 'Variable cost'], 0, 'Opportunity cost measures the value of the highest-ranked alternative sacrificed when making a choice.'],
  ['Economics', 'Demand & Supply', 'If a 10% rise in the price of petrol leads to only a 2% fall in quantity demanded, demand for petrol is:', ['Inelastic (PED = 0.2)', 'Elastic (PED = 5.0)', 'Unitary elastic', 'Perfectly elastic'], 0, 'PED = %ΔQd / %ΔP = 2 / 10 = 0.2 (< 1), indicating price-inelastic demand.'],
  ['Economics', 'Market Structures', 'A market characterized by a single seller with high barriers to entry and no close substitutes is a:', ['Monopoly', 'Oligopoly', 'Perfect competition', 'Monopsony'], 0, 'A pure monopoly consists of one firm controlling supply of a unique product.'],
  ['Economics', 'National Income', 'GDP minus depreciation (capital consumption allowance) equals:', ['Net Domestic Product (NDP)', 'Gross National Product (GNP)', 'Personal Disposable Income', 'Nominal Wage Index'], 0, 'Subtracting depreciation from Gross Domestic Product yields Net Domestic Product.'],
  ['Economics', 'Money & Banking', 'Which institution serves as the lender of last resort and regulator of commercial banks in Nigeria?', ['Central Bank of Nigeria (CBN)', 'Nigerian Stock Exchange', 'Debt Management Office', 'Federal Inland Revenue Service'], 0, 'The CBN conducts monetary policy, issues legal tender, and acts as lender of last resort.'],
  ['Economics', 'Inflation', 'Inflation triggered by rising production wages and raw material prices is specifically termed:', ['Cost-push inflation', 'Demand-pull inflation', 'Imported deflation', 'Hyper-liquidity'], 0, 'Cost-push inflation occurs when aggregate supply shifts left due to higher input costs.'],
  ['Economics', 'Public Finance', 'A tax whose percentage rate rises as a taxpayer’s income increases is classified as:', ['Progressive tax', 'Regressive tax', 'Proportional tax', 'Excise duty'], 0, 'Progressive taxation (e.g., PAYE income brackets) takes a larger share from higher incomes.'],
  ['Economics', 'International Trade', 'David Ricardo’s theory explaining why countries benefit by specializing in goods with lower opportunity cost is:', ['Comparative advantage', 'Absolute monopoly', 'Mercantilism', 'Protectionism'], 0, 'Comparative advantage demonstrates mutual gains from trade even when one nation has absolute advantage in all goods.'],
  ['Economics', 'Production', 'The law of diminishing marginal returns applies strictly in the:', ['Short run when at least one factor is fixed', 'Long run when all inputs vary', 'Very long run with new technology', 'Zero-output shutdown state'], 0, 'Adding variable inputs to a fixed factor (like land or machinery) eventually decreases marginal output.'],
  ['Economics', 'Population', 'When a country’s population size maximizes output per head given existing resources and technology, it is at:', ['Optimum population', 'Overpopulation', 'Underpopulation', 'Zero birth rate'], 0, 'Optimum population yields the highest per capita income for available resources.'],
  ['Economics', 'Business Units', 'The maximum number of shareholders in a private limited liability company in Nigeria under CAMA is:', ['50 (excluding employees)', '20', '7', 'Unlimited'], 0, 'Under Nigeria’s Companies and Allied Matters Act, private limited companies cap non-employee shareholders at 50.'],
  ['Economics', 'Balance of Payments', 'Exporting crude oil and importing refined machinery are recorded under which section of the Balance of Payments?', ['Visible trade (Current Account)', 'Capital Account transfers', 'Official reserve gold swap', 'Invisible insurance ledger'], 0, 'Physical merchandise exports and imports make up the visible trade balance in the Current Account.'],
  ['Economics', 'Utility Theory', 'Consumer equilibrium for a single commodity occurs where marginal utility equals:', ['Market price', 'Total utility', 'Zero', 'Average fixed cost'], 0, 'A rational consumer maximizes satisfaction where MUₓ = Pₓ.'],
  ['Economics', 'Monetary Policy', 'To curb excessive inflation, the Central Bank typically:', ['Raises the Cash Reserve Ratio and sells treasury bills', 'Lowers the Monetary Policy Rate', 'Prints additional currency notes', 'Removes reserve requirements'], 0, 'Contractionary monetary policy (higher CRR and open-market sales) mops up excess liquidity.'],
  ['Economics', 'Regional Integration', 'The Economic Community of West African States (ECOWAS) was established in Lagos in:', ['1975', '1963', '1980', '1991'], 0, 'The Treaty of Lagos establishing ECOWAS was signed on 28 May 1975.'],

  // Government (15)
  ['Government', 'Constitutionalism', 'The principle that no citizen or ruler is above the law and all are equal before ordinary courts is:', ['Rule of Law', 'Parliamentary Supremacy', 'Feudalism', 'Oligarchy'], 0, 'A.V. Dicey’s Rule of Law affirms supremacy of law, equality before the law, and fundamental rights.'],
  ['Government', 'Separation of Powers', 'Which political philosopher popularized the modern doctrine of Separation of Powers in "The Spirit of the Laws"?', ['Baron de Montesquieu', 'Jean-Jacques Rousseau', 'Thomas Hobbes', 'Karl Marx'], 0, 'Montesquieu articulated separating legislative, executive, and judicial powers to prevent tyranny.'],
  ['Government', 'Nigerian Constitutional History', 'Which colonial constitution introduced the elective principle for Lagos and Calabar in 1922?', ['Clifford Constitution', 'Richards Constitution', 'Macpherson Constitution', 'Lyttleton Constitution'], 0, 'The 1922 Clifford Constitution introduced Nigeria’s first elected legislative council seats (3 Lagos, 1 Calabar).'],
  ['Government', 'Federalism', 'Under Nigeria’s 1999 Constitution, matters on which ONLY the Federal Government may legislate belong to the:', ['Exclusive Legislative List', 'Concurrent Legislative List', 'Residual List', 'Local Government Schedule'], 0, 'Defense, currency, and foreign affairs sit on the Exclusive Legislative List for the National Assembly alone.'],
  ['Government', 'Systems of Government', 'In a presidential system like Nigeria’s Fourth Republic, the Head of State and Head of Government are:', ['Fused in one directly elected executive President', 'Separated between Monarch and Prime Minister', 'Appointed by the Supreme Court', 'Rotated monthly among senators'], 0, 'A presidential system vests both ceremonial and executive leadership in the elected President.'],
  ['Government', 'Pre-Colonial Administration', 'Which pre-colonial Nigerian political system was famously acephalous (decentralized) with village assemblies?', ['Igbo pre-colonial system', 'Sokoto Caliphate Emirate system', 'Oyo Empire system', 'Benin Kingdom'], 0, 'Traditional Igbo society operated segmentary village democracy through the Amala/Oha-na-Eze and age grades.'],
  ['Government', 'Electoral Systems', 'An electoral system in which seats are allocated to parties in strict ratio to their share of total votes cast is:', ['Proportional representation', 'Simple plurality (First-past-the-post)', 'Electoral college', 'Run-off ballot'], 0, 'Proportional representation matches legislative seat percentages closely to popular vote percentages.'],
  ['Government', 'Arms of Government', 'The power of the courts to declare an executive action or statute unconstitutional is known as:', ['Judicial review', 'Executive clemency', 'Parliamentary immunity', 'Filibustering'], 0, 'Judicial review safeguards constitutional supremacy against unlawful legislation or executive acts.'],
  ['Government', 'Nigerian History', 'Nigeria attained Republican status, cutting final ceremonial ties with the British Crown, on:', ['1 October 1963', '1 October 1960', '15 January 1966', '29 May 1999'], 0, 'The 1963 Republican Constitution made Dr. Nnamdi Azikiwe Nigeria’s first ceremonial President.'],
  ['Government', 'International Organizations', 'The primary organ of the United Nations charged with maintaining international peace and security is the:', ['Security Council', 'Trusteeship Council', 'Economic and Social Council', 'Secretariat'], 0, 'The UN Security Council holds binding authority to authorize sanctions and peacekeeping operations.'],
  ['Government', 'Local Government', 'The landmark Nigerian Local Government Reform that established uniform nationwide local councils occurred in:', ['1976', '1967', '1989', '1954'], 0, 'The 1976 Local Government Reform recognized local governments as the third tier of federation.'],
  ['Government', 'Political Parties', 'A formal written statement of a political party’s policies and promises to voters prior to an election is its:', ['Manifesto', 'Decree', 'White paper', 'Gazzette'], 0, 'A party manifesto outlines its governance agenda to persuade the electorate.'],
  ['Government', 'Pressure Groups', 'Unlike political parties, pressure groups seek primarily to:', ['Influence government policies without contesting to control state power directly', 'Field presidential candidates in general elections', 'Draft military decrees', 'Replace the judiciary'], 0, 'Pressure groups (e.g., NLC, NBA, ASUU) lobby and advocate for members’ interests rather than forming government.'],
  ['Government', 'Civil Service', 'Which principle requires civil servants to serve any lawfully elected government loyally without partisan bias?', ['Political neutrality', 'Spoils patronage', 'Judicial activism', 'Collective bargaining'], 0, 'Neutrality ensures continuity and professional administration across changing elected governments.'],
  ['Government', 'Foreign Policy', 'During the 1970s liberation struggles in Southern Africa, Nigeria was recognized as a Frontline State due to its policy of:', ['Africa as the centerpiece of Nigerian foreign policy', 'Total isolationism', 'Cold War nuclear alignment', 'Bilateral customs union with Europe'], 0, 'Nigeria championed anti-apartheid and decolonization movements with Africa as its foreign policy centerpiece.']
];

// ============================================================================
// 3. WAEC WASSCE COMPLETE MOCK #1 (PAID ASPIRANT · 60 UNIQUE QUESTIONS)
// Subjects: Use of English (15), Mathematics (15), Physics (15), Biology (15)
// ============================================================================
const WAEC_MOCK_1_ITEMS: CompactQ[] = [
  // Use of English (15)
  ['Use of English', 'Vocabulary', 'Choose the most appropriate word: The governor commissioned an ________ investigation into the collapsed footbridge.', ['impartial', 'impulsive', 'imminent', 'immense'], 0, '"Impartial" means fair and unbiased, fitting an official public inquiry.'],
  ['Use of English', 'Lexis', 'Because the manuscript was completely ________, the archivist had to use ultraviolet imaging to decipher it.', ['illegible', 'illegal', 'illiterate', 'eligible'], 0, '"Illegible" means impossible or very difficult to read.'],
  ['Use of English', 'Grammar', 'No sooner had the choir finished the national anthem ________ the thunderstorm began.', ['when', 'than', 'then', 'while'], 1, '"No sooner" always pairs with the comparative conjunction "than".'],
  ['Use of English', 'Antonyms', 'Select the opposite of the capitalized word: His FRUGAL lifestyle allowed him to fund scholarships for ten pupils.', ['Thrifty', 'Extravagant', 'Modest', 'Prudent'], 1, '"Frugal" means economical and careful with money; "extravagant" means wasteful and lavish.'],
  ['Use of English', 'Oral English', 'Which word has a DIFFERENT consonant sound for the underlined "ch" compared to the others?', ['Church', 'Bench', 'Chef', 'Match'], 2, '"Chef" begins with /ʃ/ ("sh"), whereas church, bench, and match use the affricate /tʃ/.'],
  ['Use of English', 'Concord', 'Ten thousand naira ________ too much to charge for a single photocopy.', ['are', 'were', 'is', 'have been'], 2, 'Sums of money, distances, and periods of time considered as a single unit take a singular verb ("is").'],
  ['Use of English', 'Idioms', 'When the negotiations reached a deadlock, the mediator asked both unions to BURY THE HATCHET.', ['Conceal weapons in the forest', 'End their hostility and make peace', 'Postpone the strike indefinitely', 'Demand higher salaries'], 1, '"Bury the hatchet" means to settle a quarrel and restore peaceful relations.'],
  ['Use of English', 'Prepositions', 'She excels ________ analytical geometry and statistics.', ['at', 'in', 'with', 'on'], 1, 'Standard idiomatic usage is "excel in" an academic discipline or field.'],
  ['Use of English', 'Sentence Structure', 'Which of the following sentences is grammatically CORRECT?', ['Me and my brother visited Ibadan last week.', 'My brother and I visited Ibadan last week.', 'My brother and myself visits Ibadan last week.', 'I and my brother has visited Ibadan last week.'], 1, 'Subject position requires the nominative pronoun "I", politely placed after "my brother".'],
  ['Use of English', 'Synonyms', 'Choose the word nearest in meaning to the capitalized word: The chief examiner warned candidates against AMBIGUOUS phrasing.', ['Unclear', 'Concise', 'Elegant', 'Forceful'], 0, '"Ambiguous" means open to more than one interpretation, hence unclear.'],
  ['Use of English', 'Register', 'In publishing, the formal written permission granted by a copyright holder to reproduce an excerpt is called:', ['Royalty', 'Clearance', 'Bibliography', 'Footnote'], 1, 'Copyright clearance grants legal authorization to reproduce protected material.'],
  ['Use of English', 'Comprehension', 'According to the passage, why do mangrove forests protect coastal settlements?', ['They increase tidal wave speed', 'Their dense root networks absorb storm surge energy and trap sediment', 'They desalinate ocean water for drinking', 'They prevent rainfall from reaching inland farms'], 1, 'The passage credits tangled mangrove roots with dissipating wave force and stabilizing shorelines.', 'Along the Niger Delta coastline, mangrove swamps act as living seawalls. Their tangled prop roots dissipate storm-surge energy, trap riverine silt against coastal erosion, and shelter juvenile fish vital to local artisanal fisheries.'],
  ['Use of English', 'Comprehension', 'Which phrase best captures the writer’s view of mangrove swamps?', ['An ecological nuisance', 'A multifunctional coastal shield and nursery', 'An obstacle to shipping lanes', 'A temporary desert formation'], 1, 'The author calls them "living seawalls" that also shelter juvenile fish.', 'Along the Niger Delta coastline, mangrove swamps act as living seawalls. Their tangled prop roots dissipate storm-surge energy, trap riverine silt against coastal erosion, and shelter juvenile fish vital to local artisanal fisheries.'],
  ['Use of English', 'Conditionals', 'If I ________ the dean of admissions, I would publish cut-off formulas transparently.', ['am', 'was', 'were', 'be'], 2, 'Second-conditional counterfactual statements use the subjunctive "were" for all persons.'],
  ['Use of English', 'Punctuation', 'Which punctuation mark correctly introduces a formal list following an independent clause?', ['Colon (:)', 'Hyphen (-)', 'Apostrophe (’)', 'Question mark (?)'], 0, 'A colon introduces a list, explanation, or formal quotation after a complete clause.'],

  // Mathematics (15)
  ['Mathematics', 'Number Bases', 'Convert the binary number 11011₂ to base ten.', ['27', '25', '29', '23'], 0, '1×16 + 1×8 + 0×4 + 1×2 + 1×1 = 16 + 8 + 2 + 1 = 27.'],
  ['Mathematics', 'Modular Arithmetic', 'Evaluate (17 + 26) (mod 7).', ['1', '2', '3', '5'], 0, '17 + 26 = 43. Dividing 43 by 7 gives 6 remainder 1, so 43 ≡ 1 (mod 7).'],
  ['Mathematics', 'Factorization', 'Factorize completely: 3x² - 12y².', ['3(x - 2y)(x + 2y)', '3(x - 4y)(x + 4y)', '(3x - 2y)(x + 6y)', '3(x - 2y)²'], 0, 'Factor out 3: 3(x² - 4y²), then apply difference of two squares: 3(x - 2y)(x + 2y).'],
  ['Mathematics', 'Simultaneous Equations', 'Solve 2x + y = 11 and x - y = 1. Find the value of xy.', ['12', '8', '15', '20'], 0, 'Adding both equations gives 3x = 12 => x = 4, and y = 3. Hence xy = 4 × 3 = 12.'],
  ['Mathematics', 'Commercial Maths', 'A trader sells a bicycle for ₦48,000, making a 20% profit on cost price. Calculate the cost price.', ['₦40,000', '₦38,400', '₦42,000', '₦36,000'], 0, '1.20 × CP = 48,000 => CP = 48,000 / 1.2 = ₦40,000.'],
  ['Mathematics', 'Mensuration', 'Find the total surface area of a closed cube whose edge measures 5 cm.', ['150 cm²', '125 cm²', '100 cm²', '75 cm²'], 0, 'TSA = 6s² = 6 × 5² = 6 × 25 = 150 cm².'],
  ['Mathematics', 'Bearings', 'The bearing of town B from town A is 065°. What is the bearing of town A from town B?', ['245°', '115°', '295°', '185°'], 0, 'Back bearing = 065° + 180° = 245°.'],
  ['Mathematics', 'Statistics', 'Find the median of the data set: 14, 9, 21, 12, 18, 9, 15.', ['14', '12', '15', '13.5'], 0, 'Ordered set: 9, 9, 12, 14, 15, 18, 21. The middle (4th) value is 14.'],
  ['Mathematics', 'Geometric Progression', 'Find the 5th term of the GP: 3, 6, 12, ...', ['48', '24', '96', '36'], 0, 'a = 3, r = 2; T₅ = ar⁴ = 3 × 16 = 48.'],
  ['Mathematics', 'Polygons', 'Calculate the sum of interior angles of a regular octagon.', ['1080°', '900°', '720°', '1260°'], 0, 'Sum = (n - 2) × 180° = (8 - 2) × 180° = 1080°.'],
  ['Mathematics', 'Inequalities', 'Find the range of values of x satisfying 5x - 3 ≤ 2x + 9.', ['x ≤ 4', 'x ≥ 4', 'x ≤ 2', 'x < 4'], 0, '3x ≤ 12 => x ≤ 4.'],
  ['Mathematics', 'Sine Rule', 'In ΔABC, a = 10 cm, A = 30°, and B = 90°. Find the length of side b.', ['20 cm', '10√3 cm', '5 cm', '15 cm'], 0, 'b / sin 90° = 10 / sin 30° => b / 1 = 10 / 0.5 = 20 cm.'],
  ['Mathematics', 'Standard Form', 'Express 0.000475 in standard form.', ['4.75 × 10⁻⁴', '4.75 × 10⁻³', '47.5 × 10⁻⁵', '4.75 × 10⁴'], 0, 'Moving the decimal point 4 places right gives 4.75 × 10⁻⁴.'],
  ['Mathematics', 'Functions', 'If f(x) = 3x - 4, find f⁻¹(11).', ['5', '29', '7 / 3', '3'], 0, '3x - 4 = 11 => 3x = 15 => x = 5.'],
  ['Mathematics', 'Circle Theorems', 'The angle subtended by a diameter at any point on the circumference of a circle is always:', ['90°', '180°', '60°', '45°'], 0, 'Angle in a semicircle equals half the central angle of 180°, which is 90°.'],

  // Physics (15)
  ['Physics', 'Scalars & Vectors', 'Two perpendicular forces of 6 N and 8 N act on a point. What is the magnitude of their resultant?', ['10 N', '14 N', '2 N', '12 N'], 0, 'Resultant R = √(6² + 8²) = √(36 + 64) = √100 = 10 N.'],
  ['Physics', 'Momentum', 'A 2 kg trolley moving at 6 m/s collides and sticks to a stationary 4 kg trolley. Calculate their common velocity.', ['2 m/s', '3 m/s', '4 m/s', '1.5 m/s'], 0, 'Conservation of momentum: 2(6) + 0 = (2 + 4)v => 12 = 6v => v = 2 m/s.'],
  ['Physics', 'Circular Motion', 'A stone of mass 0.5 kg is whirled in a horizontal circle of radius 2 m at 4 m/s. Find the centripetal force.', ['4 N', '8 N', '2 N', '16 N'], 0, 'F = mv² / r = (0.5 × 16) / 2 = 4 N.'],
  ['Physics', 'Equilibrium', 'A uniform meter rule balances at the 50 cm mark. A 40 N weight is hung at 20 cm. Where must a 60 N weight be hung to restore balance?', ['70 cm mark', '65 cm mark', '80 cm mark', '30 cm mark'], 0, 'Clockwise moment = Anticlockwise moment: 40 × (50 - 20) = 60 × d => 1200 = 60d => d = 20 cm right of pivot = 70 cm mark.'],
  ['Physics', 'Refraction', 'Light passes from air into glass of refractive index 1.5. If speed of light in air is 3.0 × 10⁸ m/s, find its speed in glass.', ['2.0 × 10⁸ m/s', '4.5 × 10⁸ m/s', '1.5 × 10⁸ m/s', '2.5 × 10⁸ m/s'], 0, 'v = c / n = (3.0 × 10⁸) / 1.5 = 2.0 × 10⁸ m/s.'],
  ['Physics', 'Capacitors', 'Calculate the energy stored in a 10 μF capacitor charged to a potential difference of 100 V.', ['0.05 J', '0.5 J', '5 J', '0.005 J'], 0, 'E = ½CV² = 0.5 × (10 × 10⁻⁶) × 100² = 0.05 J.'],
  ['Physics', 'Magnetic Fields', 'Which rule predicts the direction of force on a current-carrying conductor placed in a magnetic field?', ['Fleming’s Left-Hand Rule', 'Fleming’s Right-Hand Rule', 'Lenz’s Law', 'Snell’s Law'], 0, 'Fleming’s Left-Hand Rule (motor rule) gives force direction; Right-Hand Rule gives induced current.'],
  ['Physics', 'Latent Heat', 'During melting of pure ice at 0°C, heat supplied is used to:', ['Break intermolecular bonds without raising temperature', 'Increase average kinetic energy of molecules', 'Decrease density to zero', 'Raise pressure inside the beaker'], 0, 'Specific latent heat of fusion overcomes intermolecular forces at constant temperature.'],
  ['Physics', 'Photoelectric Effect', 'In Einstein’s photoelectric equation, the minimum frequency of light required to eject electrons from a metal surface is called:', ['Threshold frequency', 'Resonant frequency', 'Harmonic frequency', 'Cutoff wavelength'], 0, 'Below the threshold frequency f₀, photons lack sufficient energy hf to overcome the work function.'],
  ['Physics', 'Density & Upthrust', 'According to Archimedes’ Principle, the upthrust experienced by a submerged object equals:', ['The weight of fluid displaced by the object', 'The mass of the object', 'The atmospheric pressure on the fluid surface', 'Twice the object’s volume'], 0, 'Upthrust equals the weight of the displaced liquid or gas.'],
  ['Physics', 'Simple Harmonic Motion', 'If the length of a simple pendulum is quadrupled, its period of oscillation becomes:', ['Doubled', 'Halved', 'Quadrupled', 'Unchanged'], 0, 'T = 2π√(L/g). Multiplying L by 4 multiplies T by √4 = 2.'],
  ['Physics', 'Semiconductors', 'Doping pure silicon with a pentavalent impurity such as phosphorus produces:', ['An n-type semiconductor', 'A p-type semiconductor', 'An insulator', 'A superconductor'], 0, 'Pentavalent atoms donate extra free electrons, creating an n-type (negative majority carrier) semiconductor.'],
  ['Physics', 'Electrostatics', 'Two point charges attract with force F at distance r. If the distance is doubled to 2r, the new force is:', ['F / 4', 'F / 2', '2F', '4F'], 0, 'By Coulomb’s inverse-square law, F ∝ 1/r², so doubling r reduces force to 1/4.'],
  ['Physics', 'AC Circuits', 'At resonance in a series RLC circuit, inductive reactance XL equals:', ['Capacitive reactance XC', 'Zero', 'Total resistance R', 'Supply voltage V'], 0, 'At resonance, XL = XC, giving minimum impedance Z = R and maximum current.'],
  ['Physics', 'Heat Transfer', 'The vacuum between the double glass walls of a thermos flask primarily prevents heat loss by:', ['Conduction and convection', 'Radiation alone', 'Evaporation', 'Sublimation'], 0, 'A vacuum contains no material medium for conduction or convection; silvering minimizes radiation.'],

  // Biology (15)
  ['Biology', 'Classification', 'In binomial nomenclature, the scientific name of modern humans is correctly written as:', ['Homo sapiens', 'homo Sapiens', 'HOMO SAPIENS', 'Homo Sapiens'], 0, 'Genus begins with a capital letter and species with lowercase, italicized or underlined.'],
  ['Biology', 'Cell Division', 'Which stage of mitosis sees sister chromatids align neatly along the cell’s equatorial plate?', ['Metaphase', 'Prophase', 'Anaphase', 'Telophase'], 0, 'During metaphase, spindle fibers align chromosomes along the middle equatorial plane.'],
  ['Biology', 'Respiration', 'Anaerobic respiration in human skeletal muscles during vigorous sprinting produces:', ['Lactic acid and small ATP', 'Ethanol and carbon dioxide', 'Glucose and oxygen', 'Urea and water'], 0, 'Insufficient oxygen triggers lactic acid fermentation in muscles, causing oxygen debt and cramps.'],
  ['Biology', 'Support & Movement', 'The longest and strongest bone in the human skeleton is the:', ['Femur', 'Humerus', 'Tibia', 'Radius'], 0, 'The femur (thigh bone) supports upper body weight and enables locomotion.'],
  ['Biology', 'Vitamins', 'Deficiency of Vitamin C (ascorbic acid) in the human diet leads to:', ['Scurvy', 'Rickets', 'Beri-beri', 'Night blindness'], 0, 'Vitamin C is vital for collagen synthesis; deficiency causes bleeding gums and scurvy.'],
  ['Biology', 'Plant Tropisms', 'The growth curvature of a plant shoot toward unilateral sunlight is known as:', ['Positive phototropism', 'Negative geotropism', 'Hydrotropism', 'Thigmotropism'], 0, 'Auxins migrate to the shaded side, causing faster cell elongation and bending toward light.'],
  ['Biology', 'Blood Groups', 'An individual with blood group AB is referred to as a universal recipient because their plasma lacks:', ['Both anti-A and anti-B antibodies', 'Red blood cells', 'Platelets', 'Haemoglobin'], 0, 'Lacking anti-A and anti-B antibodies prevents agglutination when receiving donor red cells.'],
  ['Biology', 'Sense Organs', 'Which part of the mammalian ear converts sound vibrations into nerve impulses?', ['Cochlea', 'Eustachian tube', 'Pinna', 'Semicircular canals'], 0, 'Hair cells in the organ of Corti inside the cochlea transduce fluid vibrations into electrical impulses.'],
  ['Biology', 'Pollination', 'Flowers with feathery stigmas, small dull petals, and abundant light pollen grains are adapted for:', ['Wind pollination (Anemophily)', 'Insect pollination', 'Bird pollination', 'Water dispersal'], 0, 'Grasses and maize rely on wind to carry light pollen onto exposed feathery stigmas.'],
  ['Biology', 'Adaptation', 'Pneumatophores (breathing roots) projecting above muddy waterlogged soil are characteristic of:', ['Mangrove trees', 'Desert cacti', 'Savannah baobabs', 'Alpine pines'], 0, 'Mangroves like Avicennia use aerial pneumatophores for gaseous exchange in anoxic mud.'],
  ['Biology', 'Conservation', 'Which practice helps prevent soil erosion on steep agricultural slopes?', ['Terracing and contour ploughing', 'Overgrazing', 'Bush burning', 'Continuous monocropping'], 0, 'Terracing slows surface runoff velocity and retains topsoil moisture.'],
  ['Biology', 'Genetics', 'Which sex chromosome pair determines a biological male in humans?', ['XY', 'XX', 'XO', 'YY'], 0, 'Human males are heterogametic (XY) while females are homogametic (XX).'],
  ['Biology', 'Transport in Animals', 'Which component of blood initiates clotting when a blood vessel is cut?', ['Platelets (Thrombocytes)', 'Lymphocytes', 'Erythrocytes', 'Albumin'], 0, 'Platelets release thromboplastin, triggering conversion of fibrinogen into insoluble fibrin mesh.'],
  ['Biology', 'Ecological Instruments', 'Which ecological instrument is used to measure wind speed in a habitat?', ['Anemometer', 'Secchi disc', 'Quadrat', 'Pooter'], 0, 'An anemometer measures wind velocity; a Secchi disc measures water turbidity.'],
  ['Biology', 'Nutrition', 'Symbiosis in which both participating organisms derive mutual benefit (such as lichens) is termed:', ['Mutualism', 'Parasitism', 'Commensalism', 'Saprophytism'], 0, 'In lichens, algae photosynthesize food while fungi provide shelter and mineral absorption.']
];

// ============================================================================
// 4. WAEC WASSCE COMPLETE MOCK #2 (PAID ASPIRANT · 60 UNIQUE QUESTIONS)
// Subjects: Use of English (15), Chemistry (15), Economics (15), Literature & Civics (15)
// ============================================================================
const WAEC_MOCK_2_ITEMS: CompactQ[] = [
  // Use of English (15)
  ['Use of English', 'Synonyms', 'Choose the word closest in meaning to the capitalized word: The dean commended her PERSEVERANCE through difficult research.', ['Determination', 'Hesitation', 'Arrogance', 'Curiosity'], 0, 'Perseverance means steady persistence despite obstacles.'],
  ['Use of English', 'Antonyms', 'Choose the opposite of the capitalized word: The coastal road became TREACHEROUS during the torrential downpour.', ['Dangerous', 'Safe', 'Muddy', 'Crowded'], 1, '"Treacherous" means hazardous and unpredictable; its antonym is "safe".'],
  ['Use of English', 'Grammar', 'Neither the coach nor the team captain ________ willing to concede defeat before the final whistle.', ['were', 'are', 'was', 'have been'], 2, 'Both subjects ("coach" and "captain") are singular, so the singular verb "was" agrees.'],
  ['Use of English', 'Idioms', 'Buying an uninspected used generator turned out to be a WHITE ELEPHANT for the hostel.', ['A rare lucky bargain', 'A costly possession that is burdensome and useless', 'A quiet energy-saving machine', 'A gift from the alumni'], 1, 'A "white elephant" is an expensive asset whose upkeep outweighs its usefulness.'],
  ['Use of English', 'Oral English', 'Which word rhymes perfectly with "plough"?', ['Tough', 'Cough', 'Bough', 'Through'], 2, '"Plough" and "bough" both end with the diphthong /aʊ/.'],
  ['Use of English', 'Stress Pattern', 'Select the correct primary stress for the noun "EXPORT" in: "Cocoa remains a vital agricultural export."', ['EX-port', 'ex-PORT', 'EX-PORT', 'ex-port'], 0, 'Two-syllable noun/verb homographs stress the first syllable as nouns (EX-port) and the second as verbs (ex-PORT).'],
  ['Use of English', 'Prepositions', 'The chemistry teacher abstained ________ commenting on the leaked rumors.', ['of', 'from', 'with', 'against'], 1, '"Abstain" is always followed by the preposition "from".'],
  ['Use of English', 'Register', 'In journalism, the short line giving the writer’s name at the top of a newspaper article is the:', ['Byline', 'Editorial', 'Caption', 'Masthead'], 0, 'A byline credits the journalist who authored the article.'],
  ['Use of English', 'Comprehension', 'What key benefit of community libraries is emphasized in the passage?', ['Free luxury entertainment', 'Providing quiet study space and reference texts to low-income learners', 'Replacing university lectures altogether', 'Printing national newspapers'], 1, 'The passage highlights quiet study rooms and shared reference books for learners from crowded households.', 'Public community libraries remain quiet engines of social mobility. For thousands of secondary school graduates living in bustling multi-family compounds, a well-lit reading room with shared reference textbooks often makes the decisive difference between an average pass and a scholarship score.'],
  ['Use of English', 'Comprehension', 'The metaphor "quiet engines of social mobility" suggests that community libraries:', ['Make mechanical noise', 'Steadily help determined learners advance academically and economically', 'Only serve automotive engineers', 'Operate strictly at night'], 1, 'Social mobility refers to upward educational and socioeconomic progress powered quietly by access to books.', 'Public community libraries remain quiet engines of social mobility. For thousands of secondary school graduates living in bustling multi-family compounds, a well-lit reading room with shared reference textbooks often makes the decisive difference between an average pass and a scholarship score.'],
  ['Use of English', 'Spelling', 'Choose the correctly spelled word:', ['Embarassment', 'Embarrassment', 'Embarrasment', 'Embarasment'], 1, '"Embarrassment" takes double "r" and double "s".'],
  ['Use of English', 'Syntax', 'Identify the dangling modifier error and select the CLEAREST revision:', ['Walking down the library corridor, the exam timetable caught my eye.', 'Walking down the library corridor, I spotted the exam timetable on the board.', 'The exam timetable walked down the library corridor quickly.', 'Spotting the board, the corridor was very quiet.'], 1, 'The participle phrase "Walking down the library corridor" must directly modify the person walking ("I").'],
  ['Use of English', 'Phrasal Verbs', 'The scholarship committee had to PUT OFF the interview until Monday due to aviation delays. "Put off" means:', ['Cancel permanently', 'Postpone', 'Criticize', 'Accelerate'], 1, '"Put off" means to reschedule to a later date or time.'],
  ['Use of English', 'Clauses', 'In "The textbook that you lent me helped enormously," the clause "that you lent me" is a:', ['Relative (Adjectival) clause', 'Noun clause', 'Adverbial clause of time', 'Main clause'], 0, 'It modifies the noun "textbook", functioning as a defining relative (adjectival) clause.'],
  ['Use of English', 'Word Choice', 'The laboratory assistant measured the exact ________ of sulphuric acid needed for titration.', ['amount', 'number', 'few', 'many'], 0, 'Uncountable nouns like "acid" take "amount", whereas countable nouns take "number".'],

  // Chemistry (15)
  ['Chemistry', 'Gas Laws', 'According to Charles’s Law, at constant pressure the volume of a fixed mass of gas is directly proportional to its:', ['Absolute temperature in Kelvin', 'Temperature in degrees Celsius', 'Molar mass', 'Atmospheric pressure'], 0, 'V ∝ T where T must be measured on the Kelvin (absolute) scale.'],
  ['Chemistry', 'Solutions', 'Calculate the molar concentration of a solution containing 4.0 g of NaOH dissolved in 250 cm³ of water. (Na=23, O=16, H=1)', ['0.40 mol/dm³', '0.10 mol/dm³', '1.60 mol/dm³', '0.25 mol/dm³'], 0, 'Moles = 4.0 / 40 = 0.10 mol; Volume = 0.25 dm³; Concentration = 0.10 / 0.25 = 0.40 mol/dm³.'],
  ['Chemistry', 'Organic Chemistry', 'The reaction between ethanol and ethanoic acid in the presence of concentrated H₂SO₄ produces an ester and water. This process is:', ['Esterification', 'Saponification', 'Cracking', 'Polymerization'], 0, 'Alkanol + Alkanoic acid ⇌ Ester + Water is esterification.'],
  ['Chemistry', 'Allotropes', 'Why does graphite conduct electricity while diamond does not?', ['Graphite has delocalized mobile electrons between its hexagonal layers', 'Graphite contains metallic sodium atoms', 'Diamond is soluble in water', 'Graphite has a lower atomic number'], 0, 'Each carbon in graphite bonds to only 3 others, leaving 1 delocalized electron per atom to carry charge.'],
  ['Chemistry', 'Isotopes', 'Isotopes of the same chemical element always possess identical:', ['Atomic number (proton count)', 'Mass number', 'Neutron number', 'Nuclear density'], 0, 'Isotopes share the same proton count and chemical behavior but differ in neutron count and mass number.'],
  ['Chemistry', 'Thermochemistry', 'A chemical reaction that absorbs heat energy from its surroundings has a:', ['Positive enthalpy change (+ΔH)', 'Negative enthalpy change (-ΔH)', 'Zero activation energy', 'Spontaneous combustion flame'], 0, 'Endothermic reactions absorb thermal energy, resulting in products with higher enthalpy (+ΔH).'],
  ['Chemistry', 'Salts', 'Which salt can be prepared safely by direct titration of dilute hydrochloric acid with aqueous sodium hydroxide?', ['Sodium chloride (NaCl)', 'Lead(II) chloride (PbCl₂)', 'Barium sulphate (BaSO₄)', 'Silver chloride (AgCl)'], 0, 'Soluble sodium salts are prepared via acid–alkali titration; insoluble salts use double decomposition precipitation.'],
  ['Chemistry', 'Qualitative Analysis', 'Passing carbon(IV) oxide through fresh limewater turns it milky due to formation of insoluble:', ['Calcium trioxocarbonate(IV)', 'Calcium hydroxide', 'Calcium chloride', 'Sodium carbonate'], 0, 'Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l).'],
  ['Chemistry', 'Polymers', 'Polythene (polyethylene) is produced industrially through addition polymerization of:', ['Ethene', 'Methane', 'Ethanol', 'Benzene'], 0, 'Many ethene monomers (CH₂=CH₂) open their double bonds to form long polythene chains.'],
  ['Chemistry', 'Periodic Trends', 'Moving from left to right across Period 3 of the Periodic Table, atomic radius generally:', ['Decreases due to stronger nuclear attraction on the same shell', 'Increases steadily', 'Remains constant', 'Drops to zero at argon'], 0, 'Additional protons pull electrons in the same valence shell closer to the nucleus.'],
  ['Chemistry', 'Faraday’s Laws', 'What mass of copper is deposited when 2 Faradays of electricity pass through aqueous CuSO₄? (Cu = 64)', ['64 g', '32 g', '128 g', '16 g'], 0, 'Cu²⁺ + 2e⁻ → Cu. 2 Faradays deposit exactly 1 mole of copper = 64 g.'],
  ['Chemistry', 'Air & Combustion', 'Which gas constitutes approximately 78% of dry atmospheric air by volume?', ['Nitrogen', 'Oxygen', 'Argon', 'Carbon(IV) oxide'], 0, 'Dry air is roughly 78% nitrogen, 21% oxygen, 0.93% argon, and 0.04% CO₂.'],
  ['Chemistry', 'Soap & Detergents', 'Alkaline hydrolysis of vegetable fats or oils using hot NaOH to manufacture soap is called:', ['Saponification', 'Hydrogenation', 'Fermentation', 'Neutralization'], 0, 'Saponification breaks triglyceride esters into glycerol and sodium salts of fatty acids (soap).'],
  ['Chemistry', 'Kinetic Theory', 'The direct transition of solid iodine crystals into purple vapor on gentle heating is:', ['Sublimation', 'Condensation', 'Evaporation', 'Crystallization'], 0, 'Sublimation bypasses the liquid phase completely.'],
  ['Chemistry', 'Environmental Chemistry', 'Excessive emission of sulphur(IV) oxide (SO₂) from coal plants primarily causes:', ['Acid rain', 'Ozone thickening', 'Water softening', 'Soil alkalinization'], 0, 'SO₂ dissolves and oxidizes in atmospheric moisture to form sulphurous and sulphuric acid rain.'],

  // Economics (15)
  ['Economics', 'Elasticity', 'Goods for which demand rises when consumer income falls (such as low-grade staple substitutes) are called:', ['Inferior goods', 'Luxury goods', 'Complementary goods', 'Public goods'], 0, 'Inferior goods exhibit negative income elasticity of demand (YED < 0).'],
  ['Economics', 'Cost Theory', 'Which cost remains unchanged in the short run even when a factory temporarily produces zero output?', ['Total Fixed Cost (TFC)', 'Marginal Cost (MC)', 'Total Variable Cost (TVC)', 'Average Variable Cost'], 0, 'Rent, insurance, and contractual depreciation are fixed costs incurred regardless of output level.'],
  ['Economics', 'Division of Labour', 'A major economic advantage of specialization and division of labour is:', ['Higher output per worker and mastery of specific tasks', 'Elimination of all machinery', 'Higher unit production cost', 'Total self-sufficiency of every worker'], 0, 'Repeating specialized tasks sharpens skill, saves tool-switching time, and boosts productivity.'],
  ['Economics', 'Money', 'Which function of money enables credit contracts and installment loans to be settled in the future?', ['Standard of deferred payment', 'Store of perishable goods', 'Physical weight measure', 'Barter coincidence'], 0, 'Money acts as a reliable unit for agreeing on future debt repayments.'],
  ['Economics', 'Unemployment', 'Joblessness caused by a mismatch between workers’ skills and modern industrial technology is:', ['Structural unemployment', 'Frictional unemployment', 'Seasonal unemployment', 'Voluntary retirement'], 0, 'Structural unemployment arises from long-term shifts in industry structure or automation.'],
  ['Economics', 'Public Finance', 'When planned government expenditure exceeds projected tax revenue in a fiscal year, the budget is a:', ['Budget deficit', 'Budget surplus', 'Balanced budget', 'Trade surplus'], 0, 'A deficit requires domestic or external borrowing to bridge the revenue shortfall.'],
  ['Economics', 'Agriculture', 'Which policy helps stabilize Nigerian cocoa and cashew farmers’ incomes against volatile harvest prices?', ['Guaranteed minimum price and commodity buffer stocks', 'Banning rural feeder roads', 'Increasing export tariffs on farm produce', 'Eliminating storage silos'], 0, 'Buffer stocks and price floors prevent price collapse during bumper harvests.'],
  ['Economics', 'Industrialization', 'Replacing imported consumer goods with locally manufactured equivalents is known as:', ['Import substitution industrialization', 'Dumping', 'Currency devaluation', 'Capital flight'], 0, 'Import substitution builds domestic manufacturing capacity to conserve foreign exchange.'],
  ['Economics', 'National Income', 'Which item must be EXCLUDED when computing Gross Domestic Product to avoid double counting?', ['Value of raw flour bought by a commercial bakery', 'Final loaves of bread sold to households', 'Government salaries for public teachers', 'New factory machinery purchased this year'], 0, 'Intermediate goods (flour used in bread) are already captured in the final product’s retail value.'],
  ['Economics', 'Stock Exchange', 'A speculator on the stock exchange who buys shares expecting prices to rise is called a:', ['Bull', 'Bear', 'Stag', 'Broker'], 0, 'Bulls anticipate rising markets; bears expect falling prices.'],
  ['Economics', 'Petroleum Economics', 'The organization of major oil-exporting nations that coordinates crude output quotas (of which Nigeria is a member) is:', ['OPEC', 'IMF', 'WTO', 'UNESCO'], 0, 'Nigeria joined the Organization of the Petroleum Exporting Countries (OPEC) in 1971.'],
  ['Economics', 'Distribution', 'Which channel member breaks bulk from manufacturers and stores goods in warehouses for retailers?', ['Wholesaler', 'Final consumer', 'Central banker', 'Customs broker'], 0, 'Wholesalers buy in large volume, provide warehousing, and break bulk for retail shops.'],
  ['Economics', 'Supply Curve', 'A government subsidy granted to maize farmers shifts the maize supply curve:', ['Rightward (outward), lowering equilibrium price', 'Leftward, raising price', 'Upward vertically', 'Into a horizontal demand line'], 0, 'Subsidies reduce marginal production cost, encouraging higher supply at every price.'],
  ['Economics', 'Economic Systems', 'An economy combining private enterprise with strategic state regulation and public utilities is a:', ['Mixed economy', 'Pure command economy', 'Subsistence barter economy', 'Feudal manor'], 0, 'Nigeria operates a mixed economy with private markets alongside public sector regulation.'],
  ['Economics', 'Development', 'The Human Development Index (HDI) measures national progress using income per capita, life expectancy, and:', ['Education (mean & expected years of schooling)', 'Military spending', 'Land surface area', 'Gold reserves'], 0, 'UNDP’s HDI combines health, education, and standard of living.'],

  // Literature & Civics (15)
  ['Literature & Civics', 'Drama', 'In drama, a speech delivered by a character alone on stage to reveal inner thoughts to the audience is a:', ['Soliloquy', 'Dialogue', 'Prologue', 'Epilogue'], 0, 'A soliloquy exposes private reflections without other characters hearing.'],
  ['Literature & Civics', 'Poetry', 'A fourteen-line lyric poem written in iambic pentameter with a structured rhyme scheme is a:', ['Sonnet', 'Ballad', 'Elegy', 'Ode'], 0, 'Both Shakespearean and Petrarchan sonnets strictly contain 14 lines.'],
  ['Literature & Civics', 'Literary Devices', 'Identify the device in: "The pen is mightier than the sword."', ['Metonymy', 'Onomatopoeia', 'Simile', 'Alliteration'], 0, 'Metonymy substitutes closely associated objects ("pen" for writing, "sword" for warfare).'],
  ['Literature & Civics', 'Prose Fiction', 'The turning point of highest emotional tension in a novel’s plot is the:', ['Climax', 'Exposition', 'Denouement', 'Flashback'], 0, 'The climax represents the decisive crisis leading into falling action and resolution.'],
  ['Literature & Civics', 'African Literature', 'Chinua Achebe’s classic novel "Things Fall Apart" centers on the tragic downfall of:', ['Okonkwo', 'Obi Okonkwo', 'Lakunle', 'Baroka'], 0, 'Okonkwo of Umuofia is the protagonist whose rigid pride collides with colonial disruption.'],
  ['Literature & Civics', 'Literary Terms', 'When the audience knows a crucial secret that a character on stage does not yet realize, this creates:', ['Dramatic irony', 'Verbal irony', 'Allusion', 'Hyperbole'], 0, 'Dramatic irony generates suspense through the contrast between audience awareness and character ignorance.'],
  ['Literature & Civics', 'Poetry', 'A mournful poem written to lament the passing of a loved one or public figure is an:', ['Elegy', 'Epic', 'Limerick', 'Satire'], 0, 'An elegy expresses solemn grief and reflection on mortality.'],
  ['Literature & Civics', 'Civic Education', 'Which Nigerian anti-graft agency investigates financial crimes such as advance fee fraud and money laundering?', ['EFCC', 'NAFDAC', 'FRSC', 'NIMET'], 0, 'The Economic and Financial Crimes Commission (EFCC) combats economic and financial crimes.'],
  ['Literature & Civics', 'Human Rights', 'Rights that cannot be lawfully taken away except through due constitutional process (e.g., right to life and fair hearing) are:', ['Fundamental human rights', 'Club privileges', 'Commercial patents', 'Trade quotas'], 0, 'Chapter IV of Nigeria’s Constitution entrenches fundamental human rights.'],
  ['Literature & Civics', 'Citizenship', 'Acquiring Nigerian citizenship through formal application after meeting residency and character criteria is citizenship by:', ['Naturalization', 'Birth', 'Descent', 'Conquest'], 0, 'Foreign nationals fulfilling statutory residence and integration requirements acquire citizenship by naturalization.'],
  ['Literature & Civics', 'Civic Duties', 'Which of the following is a primary civic obligation of every eligible Nigerian citizen?', ['Paying taxes honestly and obeying lawful regulations', 'Avoiding voter registration', 'Destroying public streetlamps', 'Ignoring traffic signals'], 0, 'Prompt tax compliance and respect for law sustain public infrastructure and democracy.'],
  ['Literature & Civics', 'National Symbols', 'On the Nigerian Coat of Arms, the two white horses supporting the black shield symbolize:', ['Dignity', 'Fertile soil', 'Rivers Niger and Benue', 'Agricultural wealth'], 0, 'The white horses stand for dignity; the eagle stands for strength; the black shield stands for fertile soil.'],
  ['Literature & Civics', 'Traffic Safety', 'Which federal agency is mandated to regulate road safety and reduce highway accidents in Nigeria?', ['Federal Road Safety Corps (FRSC)', 'National Drug Law Enforcement Agency (NDLEA)', 'Standards Organisation of Nigeria (SON)', 'Nigerian Maritime Administration (NIMASA)'], 0, 'FRSC oversees driver licensing, highway patrols, and road safety education.'],
  ['Literature & Civics', 'Democracy', 'Which institution conducts federal and state elections in Nigeria?', ['Independent National Electoral Commission (INEC)', 'National Youth Service Corps (NYSC)', 'Code of Conduct Bureau (CCB)', 'Revenue Mobilization Commission'], 0, 'INEC registers voters, regulates political parties, and administers national elections.'],
  ['Literature & Civics', 'Consumer Protection', 'Which Nigerian regulatory agency certifies the safety and quality of packaged foods, bottled water, and medicines?', ['NAFDAC', 'NCC', 'NERC', 'NCAA'], 0, 'The National Agency for Food and Drug Administration and Control (NAFDAC) regulates food and drug safety.']
];

// ============================================================================
// 5. NECO SSCE COMPLETE MOCK #1 (PAID ASPIRANT · 60 UNIQUE QUESTIONS)
// Subjects: Use of English (15), Mathematics (15), Chemistry (15), Biology (15)
// ============================================================================
const NECO_MOCK_1_ITEMS: CompactQ[] = [
  // Use of English (15)
  ['Use of English', 'Synonyms', 'Choose the word closest in meaning to the capitalized word: The chief justice delivered an ELOQUENT tribute.', ['Articulate', 'Clumsy', 'Silent', 'Bitter'], 0, '"Eloquent" means fluent, persuasive, and articulate in speech or writing.'],
  ['Use of English', 'Antonyms', 'Choose the word most nearly opposite in meaning to the capitalized word: The hospital maintained RIGOROUS hygiene protocols.', ['Strict', 'Lax', 'Sterile', 'Regular'], 1, '"Rigorous" means thorough and strict; "lax" means careless or loose.'],
  ['Use of English', 'Concord', 'A bouquet of freshly cut hibiscus flowers ________ placed on the podium before the ceremony.', ['were', 'are', 'was', 'have been'], 2, 'The head noun of the subject phrase is singular ("bouquet"), requiring "was".'],
  ['Use of English', 'Idioms', 'Despite losing the first round, the debater kept her CHIN UP and won the championship. This means she:', ['Looked strictly at the ceiling', 'Remained brave and optimistic under adversity', 'Refused to speak to the judges', 'Changed her topic midway'], 1, '"Keep one’s chin up" means staying cheerful and resilient during setbacks.'],
  ['Use of English', 'Oral English', 'Which word has the SAME consonant sound as the underlined letter in "meaSure"?', ['Vision', 'Mission', 'Session', 'Passion'], 0, 'Both "measure" and "vision" contain the voiced palato-alveolar fricative /ʒ/.'],
  ['Use of English', 'Stress Pattern', 'Identify the correct primary stress in the word "PHOTOGRAPHY":', ['PHO-to-gra-phy', 'pho-TO-gra-phy', 'pho-to-GRA-phy', 'pho-to-gra-PHY'], 1, 'Words ending in "-graphy" place primary stress on the antepenultimate syllable: pho-TO-gra-phy.'],
  ['Use of English', 'Prepositions', 'The hostel warden warned students to desist ________ tampering with electrical fuses.', ['of', 'from', 'with', 'to'], 1, '"Desist" takes the preposition "from".'],
  ['Use of English', 'Register', 'In medicine, an illness that spreads rapidly across multiple continents is classified as a:', ['Pandemic', 'Allergy', 'Fracture', 'Symptom'], 0, 'A pandemic crosses international borders affecting populations worldwide.'],
  ['Use of English', 'Comprehension', 'According to the passage, why is rainwater harvesting gaining popularity in dry-season farming?', ['It requires no storage tanks', 'It captures wet-season runoff to irrigate high-value crops during dry months', 'It eliminates sunlight exposure', 'It converts salt water into oil'], 1, 'The passage explains that lined ponds store rainy-season water for dry-season vegetable irrigation.', 'Smallholder cooperatives in Plateau and Kano states are constructing lined rainwater retention ponds beside their farms. By harvesting excess August rainfall, growers sustain dry-season tomato and pepper irrigation when market prices peak.'],
  ['Use of English', 'Comprehension', 'When do farmers earn the strongest market returns according to the passage?', ['During peak dry-season scarcity', 'Immediately after heavy flooding', 'Only during public holidays', 'Before planting seeds'], 0, 'Dry-season production lets farmers sell tomatoes and peppers when market prices peak.', 'Smallholder cooperatives in Plateau and Kano states are constructing lined rainwater retention ponds beside their farms. By harvesting excess August rainfall, growers sustain dry-season tomato and pepper irrigation when market prices peak.'],
  ['Use of English', 'Grammar', 'Would you mind ________ the window so fresh air can circulate?', ['open', 'to open', 'opening', 'opened'], 2, '"Would you mind" is followed by a gerund ("opening").'],
  ['Use of English', 'Spelling', 'Identify the correctly spelled word:', ['Maintainance', 'Maintenance', 'Maintanance', 'Maintenence'], 1, 'The correct spelling is "maintenance" (from maintain, changing "ai" to "e").'],
  ['Use of English', 'Question Tags', 'Let us revise the chemistry practical notes together, ________?', ['shall we', 'will we', 'don’t we', 'aren’t we'], 0, 'Suggestions beginning with "Let us / Let’s" always take the tag "shall we?".'],
  ['Use of English', 'Synonyms', 'Choose the option nearest in meaning to the capitalized word: The technician RECTIFIED the faulty circuit within minutes.', ['Corrected', 'Damaged', 'Ignored', 'Replaced with wood'], 0, 'To "rectify" means to put right or correct an error.'],
  ['Use of English', 'Figures of Speech', 'What literary device is used in "The classroom was a furnace during the afternoon power outage"?', ['Metaphor', 'Simile', 'Euphemism', 'Irony'], 0, 'Directly equating the classroom to a furnace without "like" or "as" is a metaphor.'],

  // Mathematics (15)
  ['Mathematics', 'Logarithms', 'Solve for x if log₂(x - 1) = 4.', ['17', '15', '9', '16'], 0, 'x - 1 = 2⁴ = 16 => x = 17.'],
  ['Mathematics', 'Binomial Expansion', 'Find the coefficient of x² in the expansion of (1 + 2x)⁴.', ['24', '12', '16', '6'], 0, 'C(4,2) × 1² × (2x)² = 6 × 4x² = 24x². Coefficient is 24.'],
  ['Mathematics', 'Compound Interest', 'Calculate the compound amount on ₦10,000 invested for 2 years at 10% per annum.', ['₦12,100', '₦12,000', '₦11,000', '₦12,500'], 0, 'A = P(1 + r)² = 10,000 × (1.1)² = 10,000 × 1.21 = ₦12,100.'],
  ['Mathematics', 'Trigonometry', 'Evaluate cos 60° + sin 30°.', ['1', '√3', '1 / 2', '√2'], 0, 'cos 60° = 0.5 and sin 30° = 0.5; their sum is 1.'],
  ['Mathematics', 'Coordinate Geometry', 'Find the midpoint of the line segment joining A(3, -5) and B(9, 7).', ['(6, 1)', '(6, 6)', '(3, 1)', '(12, 2)'], 0, 'Midpoint = ((3+9)/2, (-5+7)/2) = (6, 1).'],
  ['Mathematics', 'Mensuration', 'A right circular cylinder has radius 7 cm and height 10 cm (π = 22/7). Calculate its volume.', ['1540 cm³', '440 cm³', '770 cm³', '3080 cm³'], 0, 'V = πr²h = (22/7) × 49 × 10 = 154 × 10 = 1540 cm³.'],
  ['Mathematics', 'Statistics', 'The mean of five numbers is 16. When a sixth number is added, the new mean becomes 18. Find the sixth number.', ['28', '20', '24', '26'], 0, 'Sum of 5 = 80; Sum of 6 = 6 × 18 = 108; 6th number = 108 - 80 = 28.'],
  ['Mathematics', 'Matrices', 'If A = [[2, 1], [0, 3]], find A².', ['[[4, 5], [0, 9]]', '[[4, 1], [0, 9]]', '[[4, 3], [0, 6]]', '[[2, 5], [0, 9]]'], 0, 'Row 1×Col 1 = 4, Row 1×Col 2 = 2(1)+1(3) = 5, Row 2×Col 1 = 0, Row 2×Col 2 = 9.'],
  ['Mathematics', 'Differentiation', 'Find the gradient of the curve y = x² - 4x + 5 at the point where x = 3.', ['2', '6', '-2', '4'], 0, 'dy/dx = 2x - 4. At x = 3, gradient = 2(3) - 4 = 2.'],
  ['Mathematics', 'Probability', 'A bag holds 4 red and 6 blue marbles. Two marbles are drawn with replacement. What is the probability both are red?', ['4 / 25', '2 / 15', '1 / 5', '8 / 25'], 0, 'P(Red) = 4/10 = 2/5. With replacement: (2/5) × (2/5) = 4/25.'],
  ['Mathematics', 'Algebraic Fractions', 'Simplify (x² - 9) / (x² + 5x + 6) for x ≠ -3, -2.', ['(x - 3) / (x + 2)', '(x + 3) / (x + 2)', '(x - 3) / (x - 2)', '(x - 9) / (x + 6)'], 0, 'Numerator = (x - 3)(x + 3); Denominator = (x + 3)(x + 2). Canceling (x + 3) yields (x - 3)/(x + 2).'],
  ['Mathematics', 'Surds', 'Simplify √75 - √27 + √12.', ['4√3', '6√3', '2√3', '5√3'], 0, '5√3 - 3√3 + 2√3 = 4√3.'],
  ['Mathematics', 'Geometry', 'Two similar triangles have corresponding sides in the ratio 2 : 5. What is the ratio of their areas?', ['4 : 25', '2 : 5', '8 : 125', '4 : 10'], 0, 'Ratio of areas of similar figures equals the square of the linear scale factor: 2² : 5² = 4 : 25.'],
  ['Mathematics', 'Loci', 'The locus of points in a plane equidistant from two fixed points X and Y is the:', ['Perpendicular bisector of line segment XY', 'Circle centered at X', 'Angle bisector of XY', 'Parallel line to XY'], 0, 'Every point on the perpendicular bisector lies at equal distance from endpoints X and Y.'],
  ['Mathematics', 'Combinations', 'In how many ways can a committee of 3 students be selected from 6 nominees?', ['20', '120', '18', '15'], 0, '⁶C₃ = (6 × 5 × 4) / (3 × 2 × 1) = 20.'],

  // Chemistry (15)
  ['Chemistry', 'Atomic Orbitals', 'What is the ground-state electronic configuration of a neutral magnesium atom (Z = 12)?', ['1s² 2s² 2p⁶ 3s²', '1s² 2s² 2p⁶ 3p²', '1s² 2s² 2p⁴ 3s² 3p²', '1s² 2s² 2p⁶ 3s¹'], 0, 'Filling orbitals via the Aufbau principle gives 1s² 2s² 2p⁶ 3s² (2, 8, 2).'],
  ['Chemistry', 'Stoichiometry', 'What volume does 0.5 mole of oxygen gas (O₂) occupy at s.t.p.? (Molar volume = 22.4 dm³)', ['11.2 dm³', '22.4 dm³', '44.8 dm³', '5.6 dm³'], 0, 'Volume = moles × 22.4 = 0.5 × 22.4 = 11.2 dm³.'],
  ['Chemistry', 'Organic Isomerism', 'Butane and 2-methylpropane share the formula C₄H₁₀ but differ in carbon chain arrangement. They are:', ['Structural (chain) isomers', 'Optical enantiomers', 'Polymers', 'Allotropes'], 0, 'Chain isomers possess identical molecular formula with different branching structures.'],
  ['Chemistry', 'Transition Metals', 'A distinctive characteristic of transition metals such as iron and copper is:', ['Variable oxidation states and colored ions', 'Low melting points below 100°C', 'Inability to conduct heat', 'Complete absence of d-electrons'], 0, 'Partially filled d-orbitals give transition metals variable valencies, catalytic activity, and colored complexes.'],
  ['Chemistry', 'Solubility', 'Adding a small crystal to a supersaturated salt solution triggers rapid:', ['Crystallization of excess solute', 'Complete evaporation', 'Gas evolution', 'Acidification'], 0, 'Seeding relieves supersaturation by nucleating crystal growth until saturation equilibrium is reached.'],
  ['Chemistry', 'Chemical Tests', 'When dilute HCl is added to a solid carbonate salt, the gas evolved with brisk effervescence is:', ['Carbon(IV) oxide (CO₂)', 'Hydrogen (H₂)', 'Chlorine (Cl₂)', 'Sulphur(IV) oxide (SO₂)'], 0, 'Carbonates react with dilute mineral acids to liberate CO₂, which turns limewater milky.'],
  ['Chemistry', 'Industrial Chemistry', 'In the Contact Process for manufacturing H₂SO₄, which catalyst converts SO₂ to SO₃?', ['Vanadium(V) oxide (V₂O₅)', 'Finely divided iron', 'Nickel', 'Manganese(IV) oxide'], 0, 'V₂O₅ catalyzes 2SO₂ + O₂ ⇌ 2SO₃ efficiently at ~450°C without easy poisoning.'],
  ['Chemistry', 'Corrosion', 'Coating iron roofing sheets with a thin layer of zinc to prevent rusting is known as:', ['Galvanizing', 'Vulcanizing', 'Annealing', 'Crackling'], 0, 'Zinc provides both a physical barrier and sacrificial cathodic protection because Zn is more reactive than Fe.'],
  ['Chemistry', 'Hydrogen Bonding', 'Water has an unusually high boiling point (100°C) compared to H₂S (-60°C) primarily because of:', ['Strong intermolecular hydrogen bonding', 'Higher molecular mass', 'Metallic lattice forces', 'Ionic dissociation'], 0, 'High electronegativity of oxygen creates strong H-bonds between H₂O molecules.'],
  ['Chemistry', 'Buffer Solutions', 'A solution that resists noticeable changes in pH upon adding small quantities of acid or base is a:', ['Buffer solution', 'Standard titrant', 'Supersaturated brine', 'Indicator dye'], 0, 'Buffers typically consist of a weak acid and its conjugate salt (or weak base and its salt).'],
  ['Chemistry', 'Alkanols', 'Oxidation of a primary alkanol (ethanol) with acidified K₂Cr₂O₇ under reflux yields:', ['Ethanoic acid', 'Propanone', 'Ethene', 'Methane'], 0, 'Primary alcohols oxidize first to alkanals (ethanal) and under reflux fully to alkanoic acids (ethanoic acid).'],
  ['Chemistry', 'Avogadro’s Law', 'Equal volumes of all gases under identical temperature and pressure contain the same number of:', ['Molecules', 'Atoms regardless of formula', 'Grams', 'Protons'], 0, 'Avogadro’s hypothesis links gas volume directly to molar particle (molecule) count.'],
  ['Chemistry', 'Alloys', 'Brass is a widely used corrosion-resistant alloy composed primarily of:', ['Copper and Zinc', 'Copper and Tin', 'Iron and Carbon', 'Lead and Tin'], 0, 'Brass = Cu + Zn (whereas Bronze = Cu + Sn, Solder = Pb + Sn).'],
  ['Chemistry', 'Nuclear Chemistry', 'When a radioactive nucleus emits an alpha particle (⁴₂He), its atomic number decreases by:', ['2', '4', '1', '0'], 0, 'Alpha decay lowers mass number by 4 and atomic number by 2.'],
  ['Chemistry', 'Indicators', 'In an alkaline (basic) solution, phenolphthalein indicator displays which color?', ['Pink / Magenta', 'Colorless', 'Bright yellow', 'Deep blue'], 0, 'Phenolphthalein is colorless in acidic/neutral media and bright pink in alkaline media.'],

  // Biology (15)
  ['Biology', 'Cell Structure', 'Which feature is present in a typical plant palisade cell but ABSENT in a human cheek cell?', ['Cellulose cell wall and chloroplasts', 'Plasma membrane', 'Nucleus', 'Cytoplasm'], 0, 'Plant cells possess a rigid cellulose wall, large central vacuole, and chloroplasts.'],
  ['Biology', 'Enzymes', 'Heating an enzyme solution far above its optimum temperature (e.g., to 80°C) permanently destroys activity because the enzyme is:', ['Denatured (active site shape altered)', 'Frozen solid', 'Converted into glucose', 'Digested by water'], 0, 'Excessive thermal vibration breaks hydrogen/disulphide bonds stabilizing the 3D active site.'],
  ['Biology', 'Nutrition in Plants', 'During the light-dependent stage of photosynthesis, water molecules split to release oxygen in a process called:', ['Photolysis', 'Glycolysis', 'Transpiration', 'Deamination'], 0, 'Light energy splits H₂O into H⁺, electrons, and O₂ gas inside thylakoid membranes.'],
  ['Biology', 'Mammalian Teeth', 'Which type of mammalian teeth is specialized for tearing tough flesh in carnivores?', ['Canines', 'Incisors', 'Premolars', 'Molars'], 0, 'Long, pointed canines grip and tear flesh effectively.'],
  ['Biology', 'Gaseous Exchange', 'In bony fish (such as Tilapia), gaseous exchange takes place across thin, richly vascularized:', ['Gill filaments', 'Tracheoles', 'Alveoli', 'Spiracles'], 0, 'Counter-current blood flow across gill filaments maximizes dissolved oxygen uptake from water.'],
  ['Biology', 'Excretion in Plants', 'Plants eliminate excess water vapor into the atmosphere primarily through leaf:', ['Stomata', 'Root hairs', 'Xylem vessels', 'Sieve plates'], 0, 'Transpiration occurs mainly via stomatal pores regulated by guard cells.'],
  ['Biology', 'Endocrine System', 'Which endocrine gland located at the base of the brain is nicknamed the "master gland"?', ['Pituitary gland', 'Adrenal gland', 'Thyroid gland', 'Parathyroid gland'], 0, 'The pituitary secretes tropic hormones that control the thyroid, adrenals, and gonads.'],
  ['Biology', 'Skeleton', 'The joint at the human shoulder and hip allowing movement in multiple planes is a:', ['Ball-and-socket joint', 'Hinge joint', 'Pivot joint', 'Gliding joint'], 0, 'Ball-and-socket joints permit 360° circumduction, unlike uniaxial hinge joints (elbow/knee).'],
  ['Biology', 'Genetics', 'A sudden, heritable alteration in the base sequence of DNA is called a:', ['Mutation', 'Meiosis', 'Cloning', 'Transpiration'], 0, 'Gene or chromosomal mutations introduce novel alleles into a population.'],
  ['Biology', 'Ecology', 'Organisms such as fungi and saprophytic bacteria that recycle dead organic matter into soil minerals are:', ['Decomposers', 'Primary producers', 'Tertiary carnivores', 'Herbivores'], 0, 'Decomposers break down detritus, completing the carbon and nitrogen cycles.'],
  ['Biology', 'Seed Germination', 'Which three external environmental conditions are universally required for viable seed germination?', ['Water, oxygen, and suitable warmth', 'Sunlight, fertilizer, and wind', 'Carbon dioxide, frost, and darkness', 'Saltwater, clay, and pressure'], 0, 'Moisture activates enzymes, oxygen fuels aerobic respiration, and warmth sustains enzymatic rates.'],
  ['Biology', 'Disease Control', 'Vaccination confers active artificial immunity by stimulating white blood cells to produce:', ['Specific antibodies and memory cells', 'Red blood cells', 'Insulin hormones', 'Digestive enzymes'], 0, 'Weakened or inactivated antigens train lymphocytes to mount rapid secondary responses.'],
  ['Biology', 'Biomes', 'Which Nigerian vegetation belt is characterized by tall grasses scattered with fire-resistant locust bean and shea butter trees?', ['Guinea Savannah', 'Mangrove Swamp', 'Tropical Rainforest', 'Sahel Desert'], 0, 'The Guinea Savannah forms Nigeria’s broadest belt of woodland savannah and tall grass.'],
  ['Biology', 'Cell Transport', 'Uptake of mineral ions by root hair cells AGAINST a concentration gradient requires ATP and is called:', ['Active transport', 'Simple diffusion', 'Osmosis', 'Filtration'], 0, 'Active transport uses metabolic energy (ATP) and carrier proteins to pump ions uphill.'],
  ['Biology', 'Reflex Action', 'Which sequence accurately traces the pathway of a spinal reflex arc?', ['Receptor → Sensory neuron → Relay neuron → Motor neuron → Effector', 'Effector → Motor neuron → Brain → Receptor', 'Receptor → Motor neuron → Sensory neuron → Effector', 'Brain → Receptor → Relay neuron → Muscle'], 0, 'Impulses travel from receptor along afferent (sensory) neurons through the spinal cord to efferent (motor) neurons and effectors.']
];

// ============================================================================
// 6. NECO SSCE COMPLETE MOCK #2 (PAID ASPIRANT · 60 UNIQUE QUESTIONS)
// Subjects: Use of English (15), Physics (15), Government (15), Commerce & Accounting (15)
// ============================================================================
const NECO_MOCK_2_ITEMS: CompactQ[] = [
  // Use of English (15)
  ['Use of English', 'Synonyms', 'Choose the word nearest in meaning to the capitalized word: The mediator proposed a PRAGMATIC solution to the boundary dispute.', ['Practical', 'Impractical', 'Emotional', 'Secretive'], 0, '"Pragmatic" means dealing with matters sensibly and realistically.'],
  ['Use of English', 'Antonyms', 'Choose the opposite of the capitalized word: The audience was captivated by the speaker’s LUCID explanation.', ['Clear', 'Obscure', 'Brief', 'Lively'], 1, '"Lucid" means transparent and easy to understand; "obscure" means unclear or hard to follow.'],
  ['Use of English', 'Concord', 'Not only the bursar but also the senior accountants ________ attending the compliance workshop.', ['is', 'was', 'are', 'has been'], 2, 'With "not only... but also", the verb agrees with the nearer subject ("senior accountants" → plural "are").'],
  ['Use of English', 'Idioms', 'The rookie sprinter stole the show and LEFT EVERYONE IN THE DUST. This means she:', ['Refused to sweep the track', 'Far outperformed all other competitors', 'Arrived late for the race', 'Dropped her baton'], 1, '"Leave someone in the dust" means to outpace or outperform rivals decisively.'],
  ['Use of English', 'Oral English', 'Which word has the SAME initial consonant sound as "psychology"?', ['Science', 'Physics', 'Pigeon', 'Choir'], 0, 'Both "psychology" and "science" begin with the voiceless alveolar fricative /s/.'],
  ['Use of English', 'Stress Pattern', 'Select the correct primary stress for the word "EXAMINATION":', ['ex-a-mi-NA-tion', 'EX-a-mi-na-tion', 'ex-A-mi-na-tion', 'ex-a-MI-na-tion'], 0, 'Words ending in "-tion" carry primary stress on the penultimate syllable: ex-a-mi-NA-tion.'],
  ['Use of English', 'Prepositions', 'The new policy is fully compatible ________ national data protection standards.', ['to', 'with', 'for', 'against'], 1, '"Compatible" collocates with "with".'],
  ['Use of English', 'Register', 'In law, a written sworn statement of fact voluntarily made under oath is called an:', ['Affidavit', 'Invoice', 'Agenda', 'Abstract'], 0, 'An affidavit is a formal sworn declaration used as legal evidence.'],
  ['Use of English', 'Comprehension', 'What problem do cold-storage hubs solve for rural fruit growers according to the passage?', ['Lack of seed varieties', 'Post-harvest spoilage before produce reaches urban markets', 'Excessive rainfall in December', 'Shortage of plastic bags'], 1, 'Solar cold rooms keep perishable produce fresh until transport arrives, slashing post-harvest loss.', 'Up to forty percent of harvested tomatoes and mangoes in West Africa once spoiled on roadside verges before trucks arrived. Pay-as-you-store solar cold rooms placed directly inside rural markets now extend shelf life from two days to three weeks, boosting farmer earnings substantially.'],
  ['Use of English', 'Comprehension', 'How long do solar cold rooms extend the shelf life of stored produce in the passage?', ['From two days to three weeks', 'From one week to one year', 'Exactly twenty-four hours', 'Only during winter'], 0, 'The passage explicitly states extension from two days to three weeks.', 'Up to forty percent of harvested tomatoes and mangoes in West Africa once spoiled on roadside verges before trucks arrived. Pay-as-you-store solar cold rooms placed directly inside rural markets now extend shelf life from two days to three weeks, boosting farmer earnings substantially.'],
  ['Use of English', 'Grammar', 'By the time the external examiner arrives next Friday, we ________ all twelve experiments.', ['will have completed', 'completed', 'are completing', 'have been completing'], 0, 'Future perfect ("will have completed") describes an action finished prior to a future deadline.'],
  ['Use of English', 'Spelling', 'Choose the correctly spelled verb meaning to accept or take delivery of something:', ['Recieve', 'Receive', 'Receeve', 'Recive'], 1, 'Following the rule "i before e except after c", the spelling is "receive".'],
  ['Use of English', 'Phrasal Verbs', 'The scholarship board carefully LOOKED INTO every applicant’s transcript. "Looked into" means:', ['Investigated thoroughly', 'Rejected hastily', 'Admired briefly', 'Copied silently'], 0, '"Look into" is a phrasal verb meaning to investigate or examine closely.'],
  ['Use of English', 'Sentence Interpretation', 'Bola would rather read astrophysics than watch television. This means Bola:', ['Prefers reading astrophysics to watching television', 'Never reads astrophysics', 'Watches television constantly', 'Dislikes both activities'], 0, '"Would rather X than Y" expresses clear preference for X over Y.'],
  ['Use of English', 'Figures of Speech', 'Identify the figure of speech in: "Parting is such sweet sorrow."', ['Oxymoron', 'Alliteration', 'Hyperbole', 'Metonymy'], 0, 'Pairing two contradictory terms side-by-side ("sweet sorrow") is an oxymoron.'],

  // Physics (15)
  ['Physics', 'Units & Dimensions', 'Which of the following physical quantities is a DERIVED vector quantity?', ['Acceleration', 'Mass', 'Temperature', 'Electric current'], 0, 'Acceleration has both magnitude and direction and is derived from length and time (m/s²).'],
  ['Physics', 'Friction', 'A 10 kg wooden block rests on a horizontal floor with coefficient of static friction μ = 0.3 (g = 10 m/s²). Find the limiting frictional force.', ['30 N', '3 N', '100 N', '300 N'], 0, 'F = μR = μmg = 0.3 × 10 × 10 = 30 N.'],
  ['Physics', 'Power', 'A water pump raises 120 kg of water through 10 m in 20 seconds (g = 10 m/s²). Compute its power output.', ['600 W', '1200 W', '240 W', '60 W'], 0, 'Power = mgh / t = (120 × 10 × 10) / 20 = 12,000 / 20 = 600 W.'],
  ['Physics', 'Mirrors', 'Which type of mirror always produces a virtual, erect, and diminished image suitable for vehicle rear-view mirrors?', ['Convex mirror', 'Concave mirror', 'Plane mirror', 'Parabolic reflector'], 0, 'Convex mirrors provide a wide field of view with upright diminished virtual images.'],
  ['Physics', 'Wave Optics', 'The bending of light waves around the sharp edges of an obstacle or narrow slit is termed:', ['Diffraction', 'Polarization', 'Dispersion', 'Total internal reflection'], 0, 'Diffraction is the spreading of waves around obstacles or apertures comparable to their wavelength.'],
  ['Physics', 'Electricity', 'A cell of e.m.f. 1.5 V and internal resistance 0.5 Ω is connected across a 2.5 Ω resistor. Find the circuit current.', ['0.5 A', '0.6 A', '3.0 A', '1.0 A'], 0, 'I = E / (R + r) = 1.5 / (2.5 + 0.5) = 1.5 / 3.0 = 0.5 A.'],
  ['Physics', 'Thermal Expansion', 'A steel rod of length 2.0 m (α = 1.2 × 10⁻⁵ K⁻¹) is heated through 50 K. Calculate its linear expansion.', ['1.2 × 10⁻³ m (1.2 mm)', '2.4 × 10⁻³ m', '6.0 × 10⁻⁴ m', '1.2 × 10⁻² m'], 0, 'ΔL = L₀αΔT = 2.0 × 1.2×10⁻⁵ × 50 = 1.2 × 10⁻³ m.'],
  ['Physics', 'Gravitation', 'According to Newton’s Law of Universal Gravitation, if the masses of two bodies are each doubled at constant separation, the force becomes:', ['4 times as great', '2 times as great', 'Half as great', 'Unchanged'], 0, 'F = G(m₁m₂)/r²; doubling both m₁ and m₂ multiplies F by 2 × 2 = 4.'],
  ['Physics', 'Nuclear Physics', 'In a nuclear fission reactor, control rods made of boron or cadmium regulate the chain reaction by:', ['Absorbing excess thermal neutrons', 'Accelerating uranium atoms', 'Producing gamma radiation', 'Heating cooling water directly'], 0, 'Boron and cadmium have high neutron-capture cross-sections to control fission rate safely.'],
  ['Physics', 'Surface Tension', 'Why can a pond skater insect walk across calm water without sinking?', ['Surface tension forms an elastic-like surface film supporting its weight', 'Water has zero density at the top', 'Its legs contain helium gas', 'Upthrust pushes it upward from below'], 0, 'Cohesive forces among surface water molecules create surface tension capable of supporting light insects.'],
  ['Physics', 'Electromagnetic Spectrum', 'Which electromagnetic waves have the SHORTEST wavelength and highest photon energy?', ['Gamma rays', 'Radio waves', 'Infrared rays', 'Microwaves'], 0, 'Gamma rays sit at the highest-frequency, shortest-wavelength extreme of the EM spectrum.'],
  ['Physics', 'Sound', 'An echo is heard 0.6 seconds after clapping near a cliff wall. Taking speed of sound as 340 m/s, how far is the cliff?', ['102 m', '204 m', '51 m', '340 m'], 0, 'Distance d = (v × t) / 2 = (340 × 0.6) / 2 = 102 m.'],
  ['Physics', 'Electric Billing', 'How many kilowatt-hours (units) of electricity does a 2 kW water heater consume in 3.5 hours?', ['7.0 kWh', '5.5 kWh', '1.75 kWh', '14.0 kWh'], 0, 'Energy = Power (kW) × Time (h) = 2 × 3.5 = 7.0 kWh.'],
  ['Physics', 'Fluid Mechanics', 'Which instrument measures the relative density of battery acid or milk directly?', ['Hydrometer', 'Manometer', 'Thermocouple', 'Vernier caliper'], 0, 'A calibrated floating hydrometer reads specific gravity directly on its stem.'],
  ['Physics', 'Transistors & Diodes', 'The primary function of a p–n junction diode in a power adapter circuit is:', ['Rectification (converting AC to DC)', 'Stepping up AC voltage', 'Storing magnetic energy', 'Measuring resistance'], 0, 'A diode conducts current essentially in one forward direction, rectifying alternating current to direct current.'],

  // Government (15)
  ['Government', 'Constitutions', 'A constitution that cannot be amended by ordinary legislative majority and requires a special rigorous process is:', ['A rigid constitution', 'A flexible constitution', 'An unwritten constitution', 'A unitary charter'], 0, 'Federal states like Nigeria adopt rigid constitutions to protect states’ rights from arbitrary alteration.'],
  ['Government', 'Sovereignty', 'The supreme, final legal authority of a state to make and enforce laws within its territory without external dictation is:', ['Sovereignty', 'Delegated legislation', 'Bicameralism', 'Decentralization'], 0, 'Sovereignty denotes supreme independent state authority.'],
  ['Government', 'Legislature', 'A legislature composed of two chambers (such as Nigeria’s Senate and House of Representatives) is called:', ['Bicameral', 'Unicameral', 'Confederal', 'Collegial'], 0, 'Bicameralism balances population representation (House) with equal state representation (Senate).'],
  ['Government', 'Colonial Administration', 'The British colonial policy of ruling Northern Nigeria through existing Emirs and native treasuries was:', ['Indirect Rule', 'Policy of Assimilation', 'Direct Martial Law', 'Association'], 0, 'Lord Lugard pioneered Indirect Rule using indigenous institutions under British supervision.'],
  ['Government', 'Constitutional History', 'Which 1954 colonial constitution firmly established Nigeria as a federation of three regions with a Federal Territory of Lagos?', ['Lyttleton Constitution', 'Clifford Constitution', 'Richards Constitution', 'Independence Constitution'], 0, 'The 1954 Lyttleton Constitution introduced true federalism with Exclusive and Concurrent lists.'],
  ['Government', 'Public Opinion', 'Which of the following is the MOST reliable scientific method of gauging public opinion on a policy?', ['Randomly sampled opinion polls and referenda', 'Unverified social media rumors', 'Single-street speculation', 'Closed committee guesses'], 0, 'Representative scientific polling and referenda accurately reflect citizens’ views.'],
  ['Government', 'Delegated Legislation', 'Bye-laws enacted by Local Government Councils under authority granted by Parliament are examples of:', ['Delegated legislation', 'Judicial precedent', 'Executive veto', 'Constitutional referendum'], 0, 'Delegated (subordinate) legislation relieves Parliament of local technical rule-making.'],
  ['Government', 'African Union', 'The Organisation of African Unity (OAU), founded in Addis Ababa in 1963, formally transformed into the African Union (AU) in:', ['2002', '1990', '1975', '2010'], 0, 'The AU was officially launched in Durban, South Africa, in July 2002.'],
  ['Government', 'Commonwealth', 'The Commonwealth of Nations primarily consists of sovereign states that share historical ties with:', ['The United Kingdom', 'France', 'Portugal', 'Spain'], 0, 'Most Commonwealth members are former British territories cooperating on trade, education, and democracy.'],
  ['Government', 'Civil Rights', 'Which legal writ commands a detaining authority to produce a prisoner before a court to verify lawful detention?', ['Habeas corpus', 'Mandamus', 'Certiorari', 'Quo warranto'], 0, 'Habeas corpus ("produce the body") protects citizens against arbitrary unlawful imprisonment.'],
  ['Government', 'State Creation', 'General Yakubu Gowon restructured Nigeria’s four regions into twelve states in May:', ['1967', '1963', '1976', '1991'], 0, 'The 12-state decree of May 27, 1967 addressed minority fears and balanced the federation.'],
  ['Government', 'Public Corporations', 'State-owned enterprises created by an Act of Parliament to deliver essential public utilities (like rail or ports) are:', ['Public corporations', 'Sole proprietorships', 'Private partnerships', 'Cooperative thrift clubs'], 0, 'Public corporations have statutory legal personality to provide strategic services.'],
  ['Government', 'Franchise', 'Granting voting rights to all sane adult citizens regardless of gender, ethnicity, or wealth is:', ['Universal adult suffrage', 'Limited property franchise', 'Weighted voting', 'Indirect appointment'], 0, 'Universal adult suffrage underpins democratic equality in modern elections.'],
  ['Government', 'Checks & Balances', 'Under Nigeria’s presidential constitution, presidential nominees for Federal Ministers must be confirmed by the:', ['Senate', 'Supreme Court', 'Council of Traditional Rulers', 'House of Assembly'], 0, 'Section 147 requires Senate screening and confirmation of ministerial nominees.'],
  ['Government', 'Ombudsman', 'Nigeria’s Public Complaints Commission functions primarily as an Ombudsman to:', ['Investigate citizens’ grievances against administrative injustice by public officials', 'Collect customs duties', 'Arrest armed robbers', 'Print currency'], 0, 'The Ombudsman offers free, impartial redress against maladministration in public offices.'],

  // Commerce & Accounting (15)
  ['Commerce & Accounting', 'Double Entry', 'In double-entry bookkeeping, every credit entry must have a corresponding:', ['Equal debit entry', 'Larger cash discount', 'Bank overdraft', 'Petty cash voucher'], 0, 'The accounting equation stays balanced because total debits always equal total credits.'],
  ['Commerce & Accounting', 'Accounting Equation', 'If a business has total assets of ₦850,000 and total liabilities of ₦320,000, calculate owner’s capital (equity).', ['₦530,000', '₦1,170,000', '₦430,000', '₦620,000'], 0, 'Capital = Assets − Liabilities = 850,000 − 320,000 = ₦530,000.'],
  ['Commerce & Accounting', 'Books of Prime Entry', 'Credit sales of merchandise to customers are recorded first in the:', ['Sales Day Book (Sales Journal)', 'Purchases Day Book', 'Cash Book', 'Returns Inwards Book'], 0, 'Only credit sales of trading goods enter the Sales Day Book.'],
  ['Commerce & Accounting', 'Depreciation', 'A delivery van bought for ₦5,000,000 has a residual value of ₦500,000 and 5-year useful life. Using straight-line depreciation, what is the annual charge?', ['₦900,000', '₦1,000,000', '₦1,100,000', '₦800,000'], 0, 'Annual depreciation = (Cost − Salvage) / Life = (5,000,000 − 500,000) / 5 = ₦900,000.'],
  ['Commerce & Accounting', 'Final Accounts', 'Gross profit is calculated in the Trading Account as Net Sales minus:', ['Cost of Goods Sold', 'Operating Expenses', 'Fixed Assets', 'Drawings'], 0, 'Gross Profit = Net Sales − Cost of Goods Sold.'],
  ['Commerce & Accounting', 'Insurance', 'Which principle of insurance ensures a policyholder is restored to their pre-loss financial position without profiting from a claim?', ['Indemnity', 'Utmost good faith', 'Contribution', 'Proximate cause'], 0, 'Indemnity prevents insurance from becoming a source of windfall profit (life assurance excluded).'],
  ['Commerce & Accounting', 'Trade Documents', 'A document sent by a seller to a buyer to correct an OVERCHARGE on a previously issued invoice is a:', ['Credit note', 'Debit note', 'Delivery note', 'Consignment note'], 0, 'A credit note reduces the amount owed by the customer for overcharges or returned goods.'],
  ['Commerce & Accounting', 'Warehousing', 'A secure warehouse where imported dutiable goods are stored under customs supervision until duties are paid is a:', ['Bonded warehouse', 'Retail depot', 'Cold kiosk', 'Wholesale stall'], 0, 'Bonded warehouses allow importers to defer duty payment or re-export goods duty-free.'],
  ['Commerce & Accounting', 'Banking', 'A standing instruction authorizing a bank to pay a fixed amount periodically (e.g., monthly rent) is a:', ['Standing order', 'Bank draft', 'Traveler’s cheque', 'Bill of lading'], 0, 'A standing order automates recurring fixed-sum transfers from a customer’s account.'],
  ['Commerce & Accounting', 'Foreign Trade', 'Which shipping document serves as a receipt for goods loaded aboard a vessel and document of title in sea trade?', ['Bill of lading', 'Airway bill', 'Pro-forma invoice', 'Quotation'], 0, 'A bill of lading evidences the contract of carriage and transfers title to sea cargo.'],
  ['Commerce & Accounting', 'Trial Balance', 'Which error does NOT affect the arithmetical agreement of a Trial Balance?', ['Error of complete omission', 'Single-entry posting error', 'Error of addition in the cash book', 'Transposition on only one side'], 0, 'Completely omitting both debit and credit leaves Trial Balance totals equal.'],
  ['Commerce & Accounting', 'Partnerships', 'When partners have no formal partnership deed, profits and losses under the Partnership Act are shared:', ['Equally', 'Strictly by age', 'According to alphabetical order', 'Entirely to the managing partner'], 0, 'In the absence of an agreement, the Partnership Act mandates equal profit-and-loss sharing.'],
  ['Commerce & Accounting', 'Working Capital', 'Working capital of an enterprise is defined as Current Assets minus:', ['Current Liabilities', 'Long-term Debentures', 'Issued Share Capital', 'Goodwill'], 0, 'Working capital measures short-term liquidity available for daily operations.'],
  ['Commerce & Accounting', 'E-Commerce', 'Using secure electronic fund transfers and card gateways to complete retail purchases online is part of:', ['E-Commerce', 'Barter trade', 'Hire purchase', 'Consignment auction'], 0, 'E-Commerce enables digital ordering, payment settlement, and fulfillment over networks.'],
  ['Commerce & Accounting', 'Marketing Mix', 'The classic "4 Ps" of the marketing mix consist of Product, Price, Place, and:', ['Promotion', 'Production', 'Payroll', 'Procurement'], 0, 'Product, Price, Place, and Promotion define the foundational marketing strategy framework.']
];

const SEED_TIMESTAMP = '2026-01-10T09:00:00.000Z';

export const STARTER_STORED_MOCK_EXAMS: StoredMockExam[] = [
  {
    id: 'mock-jamb-01',
    board: 'JAMB',
    paperNumber: 1,
    title: 'JAMB UTME Complete Mock #1',
    subtitle: 'Full 4-Subject Science & English CBT · Zero Repetitions',
    source: 'starter',
    orderIndex: 1,
    isFreeStarter: true,
    durationMinutes: 120,
    subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
    totalQuestions: JAMB_MOCK_1_ITEMS.length,
    createdAt: SEED_TIMESTAMP,
    questions: buildQuestions('mock-jamb-01', JAMB_MOCK_1_ITEMS)
  },
  {
    id: 'mock-jamb-02',
    board: 'JAMB',
    paperNumber: 2,
    title: 'JAMB UTME Complete Mock #2',
    subtitle: 'Full 4-Subject Life Sciences, Social Sciences & English CBT',
    source: 'starter',
    orderIndex: 2,
    isFreeStarter: true,
    durationMinutes: 120,
    subjects: ['Use of English', 'Biology', 'Economics', 'Government'],
    totalQuestions: JAMB_MOCK_2_ITEMS.length,
    createdAt: SEED_TIMESTAMP,
    questions: buildQuestions('mock-jamb-02', JAMB_MOCK_2_ITEMS)
  },
  {
    id: 'mock-waec-01',
    board: 'WAEC',
    paperNumber: 1,
    title: 'WAEC WASSCE Complete Mock #1',
    subtitle: 'Official-Style WASSCE Science & General Objective Paper',
    source: 'starter',
    orderIndex: 3,
    isFreeStarter: false,
    durationMinutes: 90,
    subjects: ['Use of English', 'Mathematics', 'Physics', 'Biology'],
    totalQuestions: WAEC_MOCK_1_ITEMS.length,
    createdAt: SEED_TIMESTAMP,
    questions: buildQuestions('mock-waec-01', WAEC_MOCK_1_ITEMS)
  },
  {
    id: 'mock-waec-02',
    board: 'WAEC',
    paperNumber: 2,
    title: 'WAEC WASSCE Complete Mock #2',
    subtitle: 'Official-Style WASSCE Chemistry, Economics & Humanities Paper',
    source: 'starter',
    orderIndex: 4,
    isFreeStarter: false,
    durationMinutes: 90,
    subjects: ['Use of English', 'Chemistry', 'Economics', 'Literature & Civics'],
    totalQuestions: WAEC_MOCK_2_ITEMS.length,
    createdAt: SEED_TIMESTAMP,
    questions: buildQuestions('mock-waec-02', WAEC_MOCK_2_ITEMS)
  },
  {
    id: 'mock-neco-01',
    board: 'NECO',
    paperNumber: 1,
    title: 'NECO SSCE Complete Mock #1',
    subtitle: 'Complete NECO Science & Mathematics Objective Paper',
    source: 'starter',
    orderIndex: 5,
    isFreeStarter: false,
    durationMinutes: 90,
    subjects: ['Use of English', 'Mathematics', 'Chemistry', 'Biology'],
    totalQuestions: NECO_MOCK_1_ITEMS.length,
    createdAt: SEED_TIMESTAMP,
    questions: buildQuestions('mock-neco-01', NECO_MOCK_1_ITEMS)
  },
  {
    id: 'mock-neco-02',
    board: 'NECO',
    paperNumber: 2,
    title: 'NECO SSCE Complete Mock #2',
    subtitle: 'Complete NECO Physics, Government & Commerce Paper',
    source: 'starter',
    orderIndex: 6,
    isFreeStarter: false,
    durationMinutes: 90,
    subjects: ['Use of English', 'Physics', 'Government', 'Commerce & Accounting'],
    totalQuestions: NECO_MOCK_2_ITEMS.length,
    createdAt: SEED_TIMESTAMP,
    questions: buildQuestions('mock-neco-02', NECO_MOCK_2_ITEMS)
  }
];

// Curated unique reserve questions specifically reserved for weekly National Mock Tournaments
// (Never duplicated in any of the 6 fixed starter mocks above)
const TOURNAMENT_UNIQUE_RESERVE_ITEMS: CompactQ[] = [
  ['Use of English', 'Lexis & Structure', 'Choose the word closest in meaning to the capitalized word: The ambassador responded with consummate TACT during the press briefing.', ['Diplomacy', 'Anger', 'Silence', 'Haste'], 0, '"Tact" is sensitivity and diplomacy in dealing with delicate issues.'],
  ['Use of English', 'Antonyms', 'Choose the opposite of the capitalized word: The arid savannah soil was surprisingly BARREN after the drought.', ['Fertile', 'Dry', 'Rocky', 'Dusty'], 0, '"Barren" means incapable of producing vegetation; its opposite is "fertile".'],
  ['Use of English', 'Concord', 'Statistics ________ a compulsory quantitative course for all first-year economics undergraduates.', ['are', 'were', 'is', 'have been'], 2, 'When referring to an academic subject, "Statistics" is singular and takes "is".'],
  ['Use of English', 'Idioms', 'After months of midnight studying, Bola passed the UTME WITH FLYING COLOURS. This means she:', ['Wore colorful traditional attire', 'Passed with exceptional distinction', 'Barely scraped the cut-off mark', 'Finished the paper last'], 1, '"With flying colours" signifies outstanding success.'],
  ['Use of English', 'Oral English', 'Which word contains the SAME vowel sound as the underlined letters in "bUry"?', ['Bet', 'Burn', 'Bull', 'But'], 0, '"Bury" is pronounced /ˈberi/, sharing the short /e/ vowel of "bet".'],
  ['Use of English', 'Prepositions', 'The senate panel acquitted the treasurer ________ all allegations of misappropriation.', ['from', 'of', 'with', 'about'], 1, 'The verb "acquit" collocates strictly with "of".'],
  ['Use of English', 'Grammar', 'Hardly had the whistle blown ________ the striker curled the ball into the top corner.', ['than', 'when', 'while', 'since'], 1, '"Hardly" pairs with "when".'],
  ['Use of English', 'Register', 'In parliamentary finance, the annual official statement of government revenue and expenditure estimates is the:', ['Appropriation Bill', 'Subpoena', 'Communiqué', 'Affidavit'], 0, 'An Appropriation Bill legislates the national budget.'],
  ['Use of English', 'Synonyms', 'Choose the word nearest in meaning to the capitalized word: The curator authenticated the ANCIENT bronze head from Ife.', ['Antique', 'Modern', 'Synthetic', 'Fragile'], 0, '"Ancient" and "antique" both denote great historical age.'],
  ['Use of English', 'Spelling', 'Identify the correctly spelled noun referring to an incident or event:', ['Occurence', 'Occurrence', 'Ocurrence', 'Occurrance'], 1, '"Occurrence" takes double "c" and double "r".'],

  ['Mathematics', 'Indices', 'Solve for x if 9^(x - 1) = 27^(x - 2).', ['4', '3', '2', '5'], 0, '3^(2x - 2) = 3^(3x - 6) => 2x - 2 = 3x - 6 => x = 4.'],
  ['Mathematics', 'Logarithms', 'Evaluate log₅(125) + log₅(1/25).', ['1', '5', '-1', '3'], 0, 'log₅(5³) + log₅(5⁻²) = 3 - 2 = 1.'],
  ['Mathematics', 'Quadratic Roots', 'For what value of k does x² - 8x + k = 0 have equal (repeated) roots?', ['16', '8', '64', '4'], 0, 'Discriminant b² - 4ac = 0 => 64 - 4k = 0 => k = 16.'],
  ['Mathematics', 'AP Sum', 'Find the sum of the first 10 positive even integers (2, 4, 6, ..., 20).', ['110', '100', '90', '120'], 0, 'S₁₀ = (10/2)(2 + 20) = 5 × 22 = 110.'],
  ['Mathematics', 'Calculus', 'Find the stationary (minimum) value of y = x² - 6x + 14.', ['5', '3', '14', '8'], 0, 'dy/dx = 2x - 6 = 0 => x = 3; y(3) = 9 - 18 + 14 = 5.'],
  ['Mathematics', 'Trigonometry', 'Solve 2 sin θ = √3 for 0° ≤ θ ≤ 90°.', ['60°', '30°', '45°', '90°'], 0, 'sin θ = √3/2 => θ = 60°.'],
  ['Mathematics', 'Mensuration', 'Find the volume of a sphere of radius 3 cm in terms of π.', ['36π cm³', '27π cm³', '12π cm³', '108π cm³'], 0, 'V = (4/3)πr³ = (4/3)π(27) = 36π cm³.'],
  ['Mathematics', 'Matrices', 'For which value of p is the matrix [[p, 4], [3, 6]] singular?', ['2', '8', '12', '4'], 0, 'Singular matrix has det = 0 => 6p - 12 = 0 => p = 2.'],
  ['Mathematics', 'Probability', 'Two fair coins are tossed simultaneously. Find the probability of getting at least one Head.', ['3 / 4', '1 / 2', '1 / 4', '1'], 0, 'Outcomes: {HH, HT, TH, TT}; 3 of 4 have at least one Head.'],
  ['Mathematics', 'Coordinate Geometry', 'Find the distance between points M(-1, 2) and N(3, 5).', ['5', '7', '√7', '25'], 0, 'd = √((3 - (-1))² + (5 - 2)²) = √(16 + 9) = 5.'],

  ['Physics', 'Kinematics', 'A car decelerates uniformly from 20 m/s to rest in 5 seconds. Calculate its retardation.', ['4 m/s²', '100 m/s²', '2.5 m/s²', '5 m/s²'], 0, 'a = (v - u)/t = (0 - 20)/5 = -4 m/s² (retardation = 4 m/s²).'],
  ['Physics', 'Electricity', 'Two 4 Ω resistors in series are connected in parallel with an 8 Ω resistor. Find the net resistance.', ['4 Ω', '16 Ω', '2 Ω', '6 Ω'], 0, 'Series branch = 4 + 4 = 8 Ω; 8 Ω || 8 Ω = 4 Ω.'],
  ['Physics', 'Optics', 'The critical angle for light leaving glass into air is 42°. What is the refractive index of the glass (sin 42° ≈ 0.669)?', ['1.49', '0.67', '2.00', '1.25'], 0, 'n = 1 / sin C = 1 / 0.669 ≈ 1.49.'],
  ['Physics', 'Waves', 'A stretched string of length 0.8 m vibrates in its fundamental mode at 200 Hz. What is the wave speed along the string?', ['320 m/s', '160 m/s', '250 m/s', '400 m/s'], 0, 'For fundamental mode, λ = 2L = 1.6 m; v = fλ = 200 × 1.6 = 320 m/s.'],
  ['Physics', 'Work & Power', 'A force of 40 N pushes a cart 15 m along a track at 60° to the horizontal (cos 60° = 0.5). Find work done.', ['300 J', '600 J', '450 J', '150 J'], 0, 'W = F d cos θ = 40 × 15 × 0.5 = 300 J.'],
  ['Physics', 'Gas Laws', 'A gas at 27°C (300 K) has volume 300 cm³. At constant pressure, what is its volume at 127°C (400 K)?', ['400 cm³', '600 cm³', '225 cm³', '1411 cm³'], 0, 'V₂ = V₁(T₂/T₁) = 300 × (400/300) = 400 cm³.'],
  ['Physics', 'Nuclear Physics', 'In β⁻ (beta-minus) decay, a neutron inside the nucleus transforms into a proton, an antineutrino, and:', ['A fast-moving electron', 'A helium nucleus', 'A positron', 'An X-ray photon only'], 0, 'Beta-minus emission increases atomic number by 1 while keeping mass number unchanged.'],
  ['Physics', 'Electromagnetism', 'What is the root-mean-square (r.m.s.) voltage of an AC supply whose peak voltage is 282.8 V? (√2 ≈ 1.414)', ['200 V', '400 V', '141.4 V', '240 V'], 0, 'Vrms = V₀ / √2 = 282.8 / 1.414 = 200 V.'],
  ['Physics', 'Elasticity', 'The ratio of tensile stress to tensile strain within the elastic limit of a wire is:', ['Young’s Modulus', 'Bulk Modulus', 'Shear Coefficient', 'Surface Energy'], 0, 'Young’s Modulus E = Stress / Strain.'],
  ['Physics', 'Thermodynamics', 'At what temperature do the Celsius and Fahrenheit scales read the exact same numerical value?', ['-40°', '0°', '-32°', '37°'], 0, 'C = (5/9)(C - 32) => 9C = 5C - 160 => 4C = -160 => C = -40°.'],

  ['Chemistry', 'Stoichiometry', 'How many moles of H₂O are produced when 2 moles of H₂ burn completely in excess O₂?', ['2 moles', '1 mole', '4 moles', '0.5 mole'], 0, '2H₂ + O₂ → 2H₂O shows a 1:1 molar ratio between H₂ and H₂O.'],
  ['Chemistry', 'Acids & Bases', 'Which oxide is AMPHOTERIC, reacting with both strong acids and strong alkalis?', ['Aluminium oxide (Al₂O₃)', 'Sodium oxide (Na₂O)', 'Carbon(IV) oxide (CO₂)', 'Calcium oxide (CaO)'], 0, 'Al₂O₃, ZnO, and PbO exhibit amphoteric behavior.'],
  ['Chemistry', 'Organic Chemistry', 'The functional group -CHO characterizes which homologous series?', ['Alkanals (Aldehydes)', 'Alkanones (Ketones)', 'Alkanoic acids', 'Esters'], 0, 'Aldehydes carry a terminal carbonyl -CHO group.'],
  ['Chemistry', 'Electrochemistry', 'Which metal displaces copper from aqueous CuSO₄ solution?', ['Zinc', 'Silver', 'Gold', 'Mercury'], 0, 'Zinc lies above copper in the reactivity series, displacing Cu²⁺ ions as reddish-brown copper.'],
  ['Chemistry', 'Bonding', 'Which molecule has a tetrahedral geometry with bond angles of 109.5°?', ['Methane (CH₄)', 'Water (H₂O)', 'Carbon(IV) oxide (CO₂)', 'Boron trifluoride (BF₃)'], 0, 'Four identical bonding pairs around carbon in CH₄ minimize repulsion in a regular tetrahedron.'],
  ['Chemistry', 'Separation', 'Separating a mixture of colored plant chlorophyll pigments is best performed by:', ['Chromatography', 'Filtration', 'Crystallization', 'Magnetization'], 0, 'Paper or thin-layer chromatography separates pigments by differential solubility and adsorption.'],
  ['Chemistry', 'Periodic Table', 'Elements in Group 0 (Noble Gases) are chemically unreactive because they have:', ['Completely filled valence electron shells', 'Zero neutrons', 'High metallic luster', 'Unstable radioactive nuclei'], 0, 'Duplet (He) or octet valence shells give noble gases maximum electronic stability.'],
  ['Chemistry', 'Stoichiometry', 'Calculate the percentage by mass of nitrogen in ammonium trioxonitrate(V), NH₄NO₃. (N=14, H=1, O=16)', ['35%', '28%', '17.5%', '42%'], 0, 'Molar mass = 80 g/mol; Mass of N = 28 g; %N = (28/80) × 100 = 35%.'],
  ['Chemistry', 'Environmental', 'Which gas is chiefly responsible for depleting the stratospheric ozone layer?', ['Chlorofluorocarbons (CFCs)', 'Nitrogen', 'Argon', 'Neon'], 0, 'UV light breaks CFCs to release chlorine radicals that catalytically destroy O₃ molecules.'],
  ['Chemistry', 'Kinetics', 'Grinding marble chips (CaCO₃) into fine powder speeds up reaction with HCl because it increases:', ['Exposed surface area', 'Molar concentration of acid', 'Activation energy', 'Molecular mass'], 0, 'Greater surface area increases collision frequency between solid particles and H⁺ ions.']
];

export function buildWeeklyTournamentFallbackPaper(params: {
  tournamentId: string;
  weekKey: string;
  editionNumber: number;
  title?: string;
  orderIndex?: number;
}): StoredMockExam {
  // Deterministic weekly rotation over the dedicated non-starter reserve pool
  const offset = (params.editionNumber * 7) % TOURNAMENT_UNIQUE_RESERVE_ITEMS.length;
  const rotated: CompactQ[] = [
    ...TOURNAMENT_UNIQUE_RESERVE_ITEMS.slice(offset),
    ...TOURNAMENT_UNIQUE_RESERVE_ITEMS.slice(0, offset)
  ];

  const questions = buildQuestions(params.tournamentId, rotated);

  return {
    id: params.tournamentId,
    board: 'JAMB',
    paperNumber: Math.max(1, params.editionNumber),
    title: params.title || `National Mock Tournament · ${params.weekKey}`,
    subtitle: `Official Weekly UTME Tournament Paper (${params.weekKey})`,
    source: 'tournament',
    orderIndex: params.orderIndex ?? (6 + Math.max(1, params.editionNumber)),
    isFreeStarter: false,
    durationMinutes: 90,
    subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
    totalQuestions: questions.length,
    tournamentId: params.tournamentId,
    weekKey: params.weekKey,
    createdAt: new Date().toISOString(),
    questions
  };
}
