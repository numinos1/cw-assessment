import { TAssessmentState, TQuestion } from "../assessment/assessment.types";
import { TResults } from './results.types';
import { MODES } from '../../data/modes';

const CWOPS_URL = 'https://cwa.cwops.org/wp-content/uploads/assessmentapi.php';
const RETRY_THRESHOLD = 60;

/**
 * To Results Header
 **/
// export function toHeader({ right, total, score }: TResults) {
//   if (right === total) {
//     return "Congratulations! you got a perfect score.";
//   }
//   if (total - 1 === right) {
//     return "Good job! you only missed one answer.";
//   }
//   if (score >= 80) {
//     return "Well done. You only missed a couple of answers.";
//   }
//   if (score > 50) {
//     return "You got more than half correct.";
//   }
//   return "You got less than half correct";
// }

/**
 * Send Results
 **/
export function sendResults(assessment: TAssessmentState) {
  const { options, questions } = assessment;
  const results = toResults(assessment);

  const payload = {
    callsign: options.callsign,
    level: options.level,
    token: options.token,
    cpm: options.cpm,
    eff: options.eff,
    freq: options.freq,
    questions: questions.length,
    answers: options.answers,
    infor: options.infor,
    vocab: options.vocab,
    words: options.words,
    characters: options.characters,
    callsigns: options.callsigns,
    score: results.score,
    set: toQuestionSet(questions),
  };
  const formData = new FormData();

  formData.append(
    'variable',
    btoa(JSON.stringify(payload))
  );
  
  //console.log('send payload', JSON.stringify(payload, null, '  '));

  fetch(CWOPS_URL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log('response', response);
  });
}

/**
 * To Question Set
 **/
export function toQuestionSet(questions: TQuestion[]) {
  return questions.reduce<any>((out, question, index) => {
    out[`${index + 1}`] = {
      sent: question.phrase,
      copied: question.answer,
      points: question.points
    };
    return out;
  }, {})
}

/**
 * Calculate Results
 **/
export function toResults(assessment: TAssessmentState): TResults {
  const { questions } = assessment;
  const total = questions.reduce((count, question) =>
    count + question.answer.split(' ').length,
    0
  );
  const points = questions.reduce((count, question) =>
    count + question.points,
    0
  );
  const score = Math.round((points / total) * 100);

  return { total, points, score };
}

/**
 * Find the next mode
 **/
export function toNextMode(assessment: TAssessmentState, results: TResults) {
  const modes = Object.keys(MODES);
  const level = `${assessment.options.level}`.toLowerCase();
  const modeIndex = modes.indexOf(level);
  const mode = assessment.options.mode;

  if (mode !== 'specific' && modeIndex >= 0) {
    const score = results.score;
    const nextMode = (score >= RETRY_THRESHOLD)
      ? modes[modeIndex + 1] || ''
      : modes[modeIndex - 1] || '';
    const nextLevel = MODES[nextMode]?.level || '';

    // don't allow repeating a done level
    if (!assessment.doneLevels.has(nextLevel.toLocaleLowerCase())) {
      return nextLevel;
    }
  }
  return '';
}