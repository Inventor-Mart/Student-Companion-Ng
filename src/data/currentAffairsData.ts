export interface CurrentAffairsQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Nigeria' | 'World';
}

export const NIGERIA_CURRENT_AFFAIRS_BANK: CurrentAffairsQuestion[] = [
  {
    id: 'nga-1',
    question: 'Who was the first indigenous Governor-General of Nigeria upon independence?',
    options: ['Dr. Nnamdi Azikiwe', 'Sir Tafawa Balewa', 'Chief Obafemi Awolowo', 'Sir Ahmadu Bello'],
    correctIndex: 0,
    explanation: 'Dr. Nnamdi Azikiwe became the first indigenous Governor-General in 1960 and later Nigeria’s first President when the country became a Republic in 1963.',
    category: 'Nigeria'
  },
  {
    id: 'nga-2',
    question: 'Which Nigerian state is officially recognized with the slogan "Centre of Learning"?',
    options: ['Kaduna State', 'Oyo State', 'Enugu State', 'Kano State'],
    correctIndex: 0,
    explanation: 'Kaduna State is known as the "Centre of Learning" due to its dense concentration of prestigious tertiary and military academic institutions.',
    category: 'Nigeria'
  },
  {
    id: 'nga-3',
    question: 'In what year was the Central Bank of Nigeria (CBN) established?',
    options: ['1958', '1960', '1963', '1973'],
    correctIndex: 0,
    explanation: 'The Central Bank of Nigeria was established by the CBN Act of 1958 and officially commenced operations on July 1, 1959.',
    category: 'Nigeria'
  },
  {
    id: 'nga-4',
    question: 'What is the longest river in Nigeria?',
    options: ['River Niger', 'River Benue', 'Cross River', 'River Kaduna'],
    correctIndex: 0,
    explanation: 'River Niger is the principal river of West Africa and the longest river running through Nigeria, converging with River Benue at Lokoja.',
    category: 'Nigeria'
  },
  {
    id: 'nga-5',
    question: 'Who was the first female Senior Advocate of Nigeria (SAN)?',
    options: ['Chief Folake Solanke', 'Justice Mary Odili', 'Funmilayo Ransome-Kuti', 'Ngozi Okonjo-Iweala'],
    correctIndex: 0,
    explanation: 'Chief Folake Solanke became the first woman to be conferred with the rank of Senior Advocate of Nigeria in 1981.',
    category: 'Nigeria'
  },
  {
    id: 'nga-6',
    question: 'Which Nigerian constitutional conference introduced the Federal structure with three regions?',
    options: ['The 1954 Lyttelton Constitution', 'The 1946 Richards Constitution', 'The 1951 Macpherson Constitution', 'The 1922 Clifford Constitution'],
    correctIndex: 0,
    explanation: 'The 1954 Lyttelton Constitution formally established the federal system of government in Nigeria, creating autonomous Western, Eastern, and Northern regions.',
    category: 'Nigeria'
  },
  {
    id: 'nga-7',
    question: 'How many senators represent each state in the Nigerian National Assembly?',
    options: ['3 Senators', '2 Senators', '4 Senators', '5 Senators'],
    correctIndex: 0,
    explanation: 'Under Section 48 of the 1999 Constitution, each of Nigeria’s 36 states is represented by 3 senators, plus 1 for the Federal Capital Territory (Total 109).',
    category: 'Nigeria'
  },
  {
    id: 'nga-8',
    question: 'The famous ancient bronze heads and terra cotta sculptures discovered in Edo State are attributed to which civilization?',
    options: ['Kingdom of Benin', 'Nok Culture', 'Igbo-Ukwu Civilization', 'Oyo Empire'],
    correctIndex: 0,
    explanation: 'The Benin Bronzes are a collection of intricately cast brass and bronze commemorative heads and plaques from the Kingdom of Benin.',
    category: 'Nigeria'
  },
  {
    id: 'nga-9',
    question: 'Which Nigerian city is known as the "Coal City"?',
    options: ['Enugu', 'Jos', 'Abeokuta', 'Warri'],
    correctIndex: 0,
    explanation: 'Enugu gained the nickname "Coal City" following the discovery of coal at Udi Ridge in 1909 and the development of the mining industry.',
    category: 'Nigeria'
  },
  {
    id: 'nga-10',
    question: 'Who composed the music for the restored Nigerian national anthem "Nigeria, We Hail Thee"?',
    options: ['Lillian Jean Williams', 'Frances Berda', 'Pa Benedict Odiase', 'Fela Sowande'],
    correctIndex: 1,
    explanation: 'Lillian Jean Williams wrote the lyrics, while Frances Berda composed the music for "Nigeria, We Hail Thee", adopted at independence in 1960 and reinstated in 2024.',
    category: 'Nigeria'
  },
  {
    id: 'nga-11',
    question: 'What is the highest mountain peak in Nigeria?',
    options: ['Chappal Waddi (Gangirwal)', 'Zuma Rock', 'Idanre Hills', 'Olumo Rock'],
    correctIndex: 0,
    explanation: 'Chappal Waddi, situated in Taraba State near the border with Cameroon, stands at 2,419 metres as the highest peak in Nigeria.',
    category: 'Nigeria'
  },
  {
    id: 'nga-12',
    question: 'Who designed the national flag of Nigeria in 1959?',
    options: ['Taiwo Akinkunmi', 'Ben Enwonwu', 'Aina Onabolu', 'Bruce Onobrakpeya'],
    correctIndex: 0,
    explanation: 'Pa Michael Taiwo Akinkunmi, then an engineering student in London, won the national competition to design Nigeria’s green-white-green flag in 1959.',
    category: 'Nigeria'
  },
  {
    id: 'nga-13',
    question: 'Which Nigerian currency banknote features the portrait of Chief Obafemi Awolowo?',
    options: ['₦100 Note', '₦200 Note', '₦500 Note', '₦1000 Note'],
    correctIndex: 0,
    explanation: 'The ₦100 banknote features Chief Obafemi Awolowo, premier of the Western Region and advocate of free universal primary education.',
    category: 'Nigeria'
  },
  {
    id: 'nga-14',
    question: 'What is the administrative capital of Adamawa State?',
    options: ['Yola', 'Jalingo', 'Damaturu', 'Gombe'],
    correctIndex: 0,
    explanation: 'Yola is the capital and administrative headquarters of Adamawa State in north-eastern Nigeria.',
    category: 'Nigeria'
  },
  {
    id: 'nga-15',
    question: 'Which Nigerian writer won the Nobel Prize in Literature in 1986?',
    options: ['Wole Soyinka', 'Chinua Achebe', 'Chimamanda Ngozi Adichie', 'Ben Okri'],
    correctIndex: 0,
    explanation: 'Professor Wole Soyinka made history in 1986 as the first African writer to be awarded the Nobel Prize in Literature.',
    category: 'Nigeria'
  }
];

export const WORLD_CURRENT_AFFAIRS_BANK: CurrentAffairsQuestion[] = [
  {
    id: 'wld-1',
    question: 'Where is the official headquarters of the United Nations (UN) situated?',
    options: ['New York City, USA', 'Geneva, Switzerland', 'Paris, France', 'Brussels, Belgium'],
    correctIndex: 0,
    explanation: 'The primary headquarters of the United Nations is an international complex located in New York City, overlooking the East River.',
    category: 'World'
  },
  {
    id: 'wld-2',
    question: 'Which African city serves as the official headquarters of the African Union (AU)?',
    options: ['Addis Ababa, Ethiopia', 'Nairobi, Kenya', 'Johannesburg, South Africa', 'Cairo, Egypt'],
    correctIndex: 0,
    explanation: 'Addis Ababa has been the diplomatic seat of the Organization of African Unity (now African Union) since its foundation in 1963.',
    category: 'World'
  },
  {
    id: 'wld-3',
    question: 'What is the capital city of Australia?',
    options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
    correctIndex: 0,
    explanation: 'Canberra was chosen as the compromise federal capital of Australia in 1908, resolving the rivalry between Sydney and Melbourne.',
    category: 'World'
  },
  {
    id: 'wld-4',
    question: 'Who is currently the Director-General of the World Trade Organization (WTO)?',
    options: ['Dr. Ngozi Okonjo-Iweala', 'Amina J. Mohammed', 'Tedros Adhanom Ghebreyesus', 'Christine Lagarde'],
    correctIndex: 0,
    explanation: 'Dr. Ngozi Okonjo-Iweala took office in March 2021 as the first woman and the first African to lead the World Trade Organization.',
    category: 'World'
  },
  {
    id: 'wld-5',
    question: 'Which ocean is the largest and deepest on Earth?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    correctIndex: 0,
    explanation: 'The Pacific Ocean covers more than 30% of the Earth’s surface and contains the Mariana Trench, the deepest point on the planet.',
    category: 'World'
  },
  {
    id: 'wld-6',
    question: 'What is the primary currency of Japan?',
    options: ['Japanese Yen (JPY)', 'Chinese Yuan (CNY)', 'Korean Won (KRW)', 'Thai Baht (THB)'],
    correctIndex: 0,
    explanation: 'The official currency of Japan is the Yen (¥), which is one of the most heavily traded reserve currencies in the global economy.',
    category: 'World'
  },
  {
    id: 'wld-7',
    question: 'Which treaty officially established the European Union (EU) in 1993?',
    options: ['Maastricht Treaty', 'Treaty of Versailles', 'Treaty of Rome', 'Geneva Convention'],
    correctIndex: 0,
    explanation: 'The Maastricht Treaty was signed in 1992 and entered into force on November 1, 1993, formally creating the European Union and the groundwork for the euro.',
    category: 'World'
  },
  {
    id: 'wld-8',
    question: 'What is the largest landlocked country in the world by area?',
    options: ['Kazakhstan', 'Mongolia', 'Chad', 'Bolivia'],
    correctIndex: 0,
    explanation: 'Kazakhstan spans over 2.7 million square kilometers in Central Asia, making it the largest landlocked country on Earth.',
    category: 'World'
  },
  {
    id: 'wld-9',
    question: 'What scientific agency operates the James Webb Space Telescope (JWST)?',
    options: ['NASA (in partnership with ESA & CSA)', 'Roscosmos', 'ISRO', 'JAXA'],
    correctIndex: 0,
    explanation: 'The James Webb Space Telescope is led by NASA in collaboration with the European Space Agency (ESA) and the Canadian Space Agency (CSA).',
    category: 'World'
  },
  {
    id: 'wld-10',
    question: 'Which African nation was the first in sub-Saharan Africa to gain independence from colonial rule in 1957?',
    options: ['Ghana', 'Nigeria', 'Kenya', 'Senegal'],
    correctIndex: 0,
    explanation: 'Ghana gained its independence on March 6, 1957, under the leadership of Prime Minister Kwame Nkrumah.',
    category: 'World'
  },
  {
    id: 'wld-11',
    question: 'What is the capital city of Canada?',
    options: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'],
    correctIndex: 0,
    explanation: 'Ottawa, located in Ontario along the border with Quebec, was selected by Queen Victoria in 1857 as the capital of Canada.',
    category: 'World'
  },
  {
    id: 'wld-12',
    question: 'Which international organization monitors global public health and declared COVID-19 a pandemic?',
    options: ['World Health Organization (WHO)', 'UNICEF', 'UNESCO', 'Red Cross'],
    correctIndex: 0,
    explanation: 'The World Health Organization (WHO), headquartered in Geneva, is the specialized agency of the UN responsible for international public health.',
    category: 'World'
  },
  {
    id: 'wld-13',
    question: 'What is the tallest building in the world as of 2026?',
    options: ['Burj Khalifa (Dubai)', 'Shanghai Tower (China)', 'Merdeka 118 (Malaysia)', 'Abraj Al-Bait (Saudi Arabia)'],
    correctIndex: 0,
    explanation: 'Burj Khalifa in Dubai, United Arab Emirates, stands at 828 metres (2,717 ft) as the tallest skyscraper and freestanding structure in the world.',
    category: 'World'
  },
  {
    id: 'wld-14',
    question: 'Which strait separates the continents of Africa and Europe?',
    options: ['Strait of Gibraltar', 'Bosphorus Strait', 'Strait of Malacca', 'Bering Strait'],
    correctIndex: 0,
    explanation: 'The Strait of Gibraltar connects the Atlantic Ocean to the Mediterranean Sea and separates Spain in Europe from Morocco in Africa.',
    category: 'World'
  },
  {
    id: 'wld-15',
    question: 'Who was the first person to set foot on the Moon in July 1969?',
    options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Michael Collins'],
    correctIndex: 0,
    explanation: 'American astronaut Neil Armstrong stepped onto the lunar surface from Apollo 11 on July 20, 1969, declaring "That\'s one small step for man, one giant leap for mankind."',
    category: 'World'
  }
];

export async function fetchNextEndlessQuestions(
  scope: 'nigeria' | 'world',
  excludeIds: string[] = []
): Promise<CurrentAffairsQuestion[]> {
  try {
    const res = await fetch('/api/gemini/current-affairs-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope, count: 8 })
    });
    const data = await res.json();
    if (data?.success && Array.isArray(data.questions) && data.questions.length > 0) {
      return data.questions.map((q: any, i: number) => ({
        id: q.id || `ai-${scope}-${Date.now()}-${i}`,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || 'Verified factual answer.',
        category: scope === 'nigeria' ? 'Nigeria' : 'World'
      }));
    }
  } catch (err) {
    console.warn('Current Affairs Gemini generation fallback:', err);
  }

  // Curated bank fallback
  const pool = scope === 'nigeria' ? NIGERIA_CURRENT_AFFAIRS_BANK : WORLD_CURRENT_AFFAIRS_BANK;
  const filtered = pool.filter(q => !excludeIds.includes(q.id));
  const selectedPool = filtered.length >= 5 ? filtered : pool;

  // Shuffle selectedPool
  return [...selectedPool].sort(() => Math.random() - 0.5).slice(0, 10);
}
