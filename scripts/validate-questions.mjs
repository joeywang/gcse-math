// Validates the question datasets against the contract QuestionCard relies on.
//
// Run with: pnpm validate
//
// Two classes of bug have reached main before and are guarded here:
//   - a topic listed in Topics.js with no matching data file (broke the build)
//   - a question with no answer, which makes checkAnswer throw on submit
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = new URL('../src/data/', import.meta.url).pathname;
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// Mirrors generateFileName in src/hooks/useTopic.js.
const generateFileName = (topic) => {
  const cleanTopic = topic.replace(/\d+/g, '').trim();
  const words = cleanTopic.split(' ').map((word) => word.toLowerCase());
  return words
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
};

// Mirrors checkAnswer in src/components/QuestionCard.jsx.
const checkAnswer = (question, userAnswers) => {
  if (question.parts) {
    return question.parts.map(
      (part, index) =>
        userAnswers[index].toString().toLowerCase() === part.answer.toString().toLowerCase(),
    );
  }
  if (Array.isArray(question.answer)) {
    return question.answer.map(
      (ans, index) => userAnswers[index].toString().toLowerCase() === ans.toString().toLowerCase(),
    );
  }
  return [userAnswers[0].toString().toLowerCase() === question.answer.toString().toLowerCase()];
};

const dataFiles = readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));

// Every topic on the selection screen must resolve to a data file.
const { default: Topics } = await import('../src/data/Topics.js');
for (const topic of Topics) {
  const fileName = `${generateFileName(topic)}.json`;
  if (!dataFiles.includes(fileName)) {
    fail('Topics.js', `"${topic}" maps to ${fileName}, which does not exist`);
  }
}

let questionCount = 0;

for (const file of dataFiles.sort()) {
  let data;
  try {
    data = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf8'));
  } catch (err) {
    fail(file, `invalid JSON - ${err.message}`);
    continue;
  }

  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    fail(file, 'has no questions array');
    continue;
  }

  data.questions.forEach((question, index) => {
    questionCount++;
    const where = `${file} Q${question.number ?? `[index ${index}]`}`;

    // QuestionCard renders "Question {question.number}".
    if (question.number === undefined) fail(where, 'missing "number" (header renders as undefined)');

    if (question.parts) {
      question.parts.forEach((part, i) => {
        if (part.answer === undefined) fail(where, `part ${i + 1} has no answer`);
      });
    } else if (question.answer === undefined) {
      fail(where, 'has neither "answer" nor "parts"');
    }

    // Feeding the correct answer back in must not throw, and must be graded correct.
    const userAnswers = question.parts
      ? question.parts.map((p) => String(p.answer))
      : Array.isArray(question.answer)
        ? question.answer.map((a) => String(a))
        : [String(question.answer)];
    try {
      if (!checkAnswer(question, userAnswers).every(Boolean)) {
        fail(where, 'correct answer is not graded as correct');
      }
    } catch (err) {
      fail(where, `checkAnswer throws - ${err.message}`);
    }
  });
}

if (errors.length > 0) {
  console.error(`FAILED - ${errors.length} problem(s) across ${dataFiles.length} dataset(s):\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

console.log(
  `OK - ${Topics.length} topics, ${dataFiles.length} datasets, ${questionCount} questions validated`,
);
