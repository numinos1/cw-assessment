//import { getStore } from '../../utils/local-storage';
import { TOptionMap } from '../config/config.types';
import { TAssessmentState, TAction, TQuestion } from './assessment.types';
import { WORD_LIST2 } from '../../data/words';
import { Vocabulary } from '../../utils/vocabulary';
import { setStore } from '../../utils/local-storage';
import { createId } from '../../utils/values';
import { pickQuestions, pickAnswers, playQuestion } from './assessment.helpers';

const CWOPS_URL = 'https://cwa.cwops.org/wp-content/uploads/testapi.php';

// ---------------------------------------------------------
//                       Initialize
// ---------------------------------------------------------

/**
 * Initialize Assessment State
 **/
export function initAssessment(): TAssessmentState {
  return {
    id: createId(11),
    options: {},
    questions: [],
    index: 0,
    status: 'config', 
      // config
      // play
      // guess
      // next -> play | results
      // results
    results: {
      total: 0,
      right: 0,
      score: 0
    },
    playIndex: undefined
  };
}

// ---------------------------------------------------------
//                        Reduce
// ---------------------------------------------------------

/**
 * Assessment Reducer
 **/
export function assessmentReducer(
  state: TAssessmentState,
  action: TAction
) {
  switch (action.type) {
    case 'on-config': 
      return setOptionsAction(state, action.options);
    case 'on-guess':
      return guessAnswerAction(state, action.answer);
    case 'on-repeat':
      return returnToConfigAction(state)
    case 'on-answer':
      return nextQuestionAction(state)
    case 'press-key': 
      return pressKeyAction(state, action.event);
    case 'char:start': 
      return startCharAction(state, action.event);
    case 'char:end': 
      return endCharAction(state);
    case 'play:stop':
      return endPlayAction(state);
    default:
      return state;
  }
}

// ---------------------------------------------------------
//                        Actions
// ---------------------------------------------------------

export function endPlayAction(
  state: TAssessmentState
): TAssessmentState {
  return {
    ...state,
    status: 'guess'
  };
}

/**
 * Start Play Character
 **/
export function startCharAction(
  state: TAssessmentState,
  event: any
): TAssessmentState {
  return {
    ...state,
    playIndex: event.index
  };
}

/**
 * End Play Character
 **/
export function endCharAction(
  state: TAssessmentState
): TAssessmentState {
  return {
    ...state,
    playIndex: undefined
  };
}

export function nextQuestionAction(
  state: TAssessmentState
): TAssessmentState {
  const nextIndex = state.index + 1;
  const isDone = nextIndex === state.questions.length;
  const results = toResults(state.questions);
  
  if (isDone) {
    const payload = {
      cs: state.options.callsign,
      score: results.score,
      level: 'Fundamental'
    };
    const params = Object
      .entries(payload)
      .map(([key, val]) => `${key}=${val}`)
      .join(',');
    const body = btoa(params);

    console.log('params', params, body);

    fetch(CWOPS_URL, {
      method: 'POST',
      body: `variable=${body}`,
      headers: {
        'mode':'cors'
      }
    })
    .then(response => {
      console.log('response', response);
    });
  }

  return playQuestion({
    ...state,
    index: nextIndex,
    status: isDone 
      ? 'results' 
      : 'play',
    results: results
  });
}

/**
 * Calculate Results
 **/
function toResults(questions: TQuestion[]) {
  const total = questions.length;
  const right = questions.reduce((count, question) =>
    question.phrase === question.answer
      ? count + 1
      : count,
    0
  );
  const score = Math.round((right / total) * 100);

  return { total, right, score };
}

/**
 * Return To Config
 **/
export function returnToConfigAction(
  state: TAssessmentState
): TAssessmentState {
  return {
    ...state,
    id: createId(11),
    status: 'config'
  };
}

/**
 * Set Options
 **/
export function setOptionsAction(
  state: TAssessmentState,
  options: TOptionMap
): TAssessmentState {
  const vocab = new Vocabulary(WORD_LIST2, options.characters as number);
  setStore('options', options);

  return playQuestion({
    ...state,
    options: options,
    questions: pickQuestions(vocab, options).map(phrase => ({
      phrase: phrase,
      answer: '',
      answers: pickAnswers(vocab, phrase),
    })),
    index: 0,
    status: 'play'
  });
}

/**
 * Keyboard Event
 **/
export function pressKeyAction(
  state: TAssessmentState,
  event: KeyboardEvent
): TAssessmentState {
  const { key } = event;

  if (key.length === 1 && state.status === 'guess') {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
  if (key === 'Enter') {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
  return state;
}

/**
 * Guess Answer
 **/
export function guessAnswerAction(
  state: TAssessmentState,
  answer: string
): TAssessmentState {
  console.log('ANSWER', answer);

  return {
    ...state,
    status: 'answer',
    questions: state.questions.map((question, i) => ({
      ...question,
      answer: i === state.index
        ? answer
        : question.answer
    }))
  };
}
