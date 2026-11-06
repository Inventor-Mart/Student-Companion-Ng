import { CBTExam, CBTQuestion, CurriculumTopic } from '../types';
import { CBT_EXAMS_DATABASE } from '../data/cbtExamData';

/**
 * Parses embedded practice questions from the topic's contentMarkdown
 */
function extractEmbeddedQuestions(content: string, topicTitle: string): CBTQuestion[] {
  const questions: CBTQuestion[] = [];
  
  // Regex to match:
  // - **Question 1**: Question text...
  //   - A) Option A
  //   - B) Option B (*Correct — explanation...*)
  //   - C) Option C
  //   - D) Option D
  const questionBlockRegex = /-\s*\*\*Question\s*\d+\*\*:\s*([^\n]+)([\s\S]*?)(?=(?:-\s*\*\*Question|\n###|\n---|$))/gi;
  let match: RegExpExecArray | null;

  while ((match = questionBlockRegex.exec(content)) !== null) {
    const rawQuestionText = match[1].trim();
    const optionsBlock = match[2];

    const optionRegex = /-\s*([A-D])\)\s*([^\n]+)/g;
    let optMatch: RegExpExecArray | null;
    const options: string[] = [];
    let correctIdx = 0;
    let explanation = `This is the correct answer according to the curriculum for ${topicTitle}.`;

    while ((optMatch = optionRegex.exec(optionsBlock)) !== null) {
      const letter = optMatch[1].toUpperCase();
      let optText = optMatch[2].trim();

      // Check if this option is flagged as correct
      if (/(\(\*?Correct|Correct\s*—|\*Correct\*)/i.test(optText)) {
        correctIdx = letter.charCodeAt(0) - 65; // A -> 0, B -> 1, C -> 2, D -> 3
        
        // Extract explanation if present
        const expMatch = optText.match(/\(\*?Correct\s*[-—:]?\s*([^)]*)\)/i);
        if (expMatch && expMatch[1].trim()) {
          explanation = expMatch[1].trim();
        }
        
        // Clean the option text
        optText = optText.replace(/\s*\(\*?Correct[^)]*\)\*?/gi, '').trim();
      }

      options.push(optText);
    }

    if (options.length >= 4) {
      questions.push({
        id: questions.length + 1,
        question: rawQuestionText,
        options: options.slice(0, 4),
        correctOptionIndex: correctIdx >= 0 && correctIdx < 4 ? correctIdx : 0,
        explanation,
        topicRef: topicTitle
      });
    }
  }

  return questions;
}

/**
 * Searches the global CBT database for any questions specifically matching this topic or subject
 */
function findDatabaseQuestions(topic: CurriculumTopic): CBTQuestion[] {
  const matches: CBTQuestion[] = [];
  const topicLower = topic.topicTitle.toLowerCase();
  const subjectLower = topic.subject.toLowerCase();

  for (const exam of CBT_EXAMS_DATABASE) {
    if (exam.subject.toLowerCase() === subjectLower) {
      for (const q of exam.questions) {
        if (
          q.topicRef &&
          (topicLower.includes(q.topicRef.toLowerCase()) || q.topicRef.toLowerCase().includes(topicLower))
        ) {
          matches.push({ ...q });
        }
      }
    }
  }

  return matches;
}

/**
 * Generates synthetic high-yield questions derived from the topic's keyTakeaways and subtopics
 */
function generateQuestionsFromTakeaways(topic: CurriculumTopic, startingId: number, needed: number): CBTQuestion[] {
  const generated: CBTQuestion[] = [];
  const takeaways = topic.keyTakeaways && topic.keyTakeaways.length > 0 ? topic.keyTakeaways : [];
  const subtopics = topic.subtopics && topic.subtopics.length > 0 ? topic.subtopics : [];

  for (let i = 0; i < needed; i++) {
    const qId = startingId + i;
    const targetCorrectIdx = (i + 1) % 4; // Evenly distributes across B (1), C (2), D (3), A (0)
    
    if (i < takeaways.length) {
      const takeaway = takeaways[i];
      const rawOptions = [
        takeaway,
        `The opposite principle applies under standard laboratory and field conditions.`,
        `This concept is only valid in theoretical simulations and not in practical secondary applications.`,
        `The principle has been replaced by modern alternative standards.`
      ];
      // Swap correct answer to targetCorrectIdx
      const options = [...rawOptions];
      const temp = options[0];
      options[0] = options[targetCorrectIdx];
      options[targetCorrectIdx] = temp;

      generated.push({
        id: qId,
        question: `In the study of ${topic.topicTitle}, which of the following statements represents the core scientific/technical principle?`,
        options,
        correctOptionIndex: targetCorrectIdx,
        explanation: `Core takeaway: ${takeaway}`,
        topicRef: topic.topicTitle
      });
    } else {
      const subtopicIndex = (i - takeaways.length) % Math.max(1, subtopics.length);
      const subtopic = subtopics[subtopicIndex] || topic.topicTitle;
      
      const questionPrompts = [
        `What is the primary significance or function of "${subtopic}" in ${topic.subject}?`,
        `Which standard procedure or characteristic is essential when working with "${subtopic}"?`,
        `In WAEC examinations, what key rule governs the application of "${subtopic}"?`,
        `How does "${subtopic}" contribute to overall system performance and efficiency?`,
        `Which of the following is a direct practical example or manifestation of "${subtopic}"?`
      ];

      const prompt = questionPrompts[i % questionPrompts.length];
      const rawOptions = [
        `It is governed by the fundamental rules and properties established in ${topic.topicTitle}.`,
        `It is completely independent of environmental, chemical, or physical factors.`,
        `It only functions when external power and inputs are completely absent.`,
        `It causes an immediate cessation of all related processes.`
      ];
      // Swap correct answer to targetCorrectIdx
      const options = [...rawOptions];
      const temp = options[0];
      options[0] = options[targetCorrectIdx];
      options[targetCorrectIdx] = temp;

      generated.push({
        id: qId,
        question: prompt,
        options,
        correctOptionIndex: targetCorrectIdx,
        explanation: `In ${topic.subject}, ${subtopic} operates under the foundational principles of ${topic.topicTitle}.`,
        topicRef: topic.topicTitle
      });
    }
  }

  return generated;
}

/**
 * Constructs a guaranteed 10-question topic-specific quiz for any lesson note in the system.
 */
export function getTopicSpecificQuiz(topic: CurriculumTopic): CBTExam {
  const TARGET_COUNT = 10;
  const questions: CBTQuestion[] = [];

  // 1. First, extract any embedded checkpoint questions in the note
  const embedded = extractEmbeddedQuestions(topic.contentMarkdown, topic.topicTitle);
  embedded.forEach(q => {
    questions.push({ ...q, id: questions.length + 1 });
  });

  // 2. Second, find matching database questions if we need more
  if (questions.length < TARGET_COUNT) {
    const dbQuestions = findDatabaseQuestions(topic);
    for (const dbQ of dbQuestions) {
      if (questions.length >= TARGET_COUNT) break;
      // Avoid duplicate question text
      if (!questions.some(q => q.question.toLowerCase() === dbQ.question.toLowerCase())) {
        questions.push({ ...dbQ, id: questions.length + 1 });
      }
    }
  }

  // 3. Third, if still under 10, generate tailored questions based on key takeaways & subtopics
  if (questions.length < TARGET_COUNT) {
    const needed = TARGET_COUNT - questions.length;
    const additional = generateQuestionsFromTakeaways(topic, questions.length + 1, needed);
    additional.forEach(q => {
      questions.push(q);
    });
  }

  // Ensure all 10 questions have sequential IDs
  const finalQuestions = questions.slice(0, TARGET_COUNT).map((q, idx) => ({
    ...q,
    id: idx + 1
  }));

  return {
    id: `topic-quiz-${topic.id}`,
    examType: 'WAEC',
    title: `${topic.topicTitle} - Topic Mastery Quiz`,
    subject: topic.subject,
    classLevel: topic.classLevel,
    durationMinutes: 10,
    year: 2025,
    xpReward: 300,
    questions: finalQuestions
  };
}
