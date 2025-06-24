//import { getStore } from '../../utils/local-storage';
import { TOptionMap } from '../config/config.types';
import { TAssessmentState, TAction } from './assessment.types';
import { vocabMap, threek }  from '../../data/vocab-map';
import { Vocabulary } from '../../utils/vocabulary';
import { setStore } from '../../utils/local-storage';
import { createId } from '../../utils/values';
import { pickQuestions, pickAnswers, playQuestion } from './assessment.helpers';
import { MODES } from '../../data/modes';

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
    tryCount: 0,
    status: 'config', 
      // config
      // countdown
      // play
      // guess
      // next -> play | results
      // results
    playIndex: 0,
    doneLevels: new Set()
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
    case 'on-countdown':
      return goCountdown(state, action.options);
    case 'on-start': 
      return startAssessment(state);
    case 'on-guess':
      return guessAnswerAction(state, action.answer);
    case 'on-repeat':
      return repeatAssessment(state)
    case 'on-answer':
      return nextQuestionAction(state)
    case 'on-mode':
      return setNewMode(state, action.mode);
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
    status: 'guess',
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
    playIndex: event.charIndex
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
    playIndex: 0
  };
}

export function nextQuestionAction(
  state: TAssessmentState
): TAssessmentState {
  const nextIndex = state.index + 1;
  const isDone = nextIndex === state.questions.length;
 
  return playQuestion({
    ...state,
    index: nextIndex,
    status: isDone 
      ? 'results' 
      : 'play'
  });
}

/**
 * Return To Config
 **/
export function repeatAssessment(
  state: TAssessmentState
): TAssessmentState {
  return {
    ...state,
    id: createId(11),
    status: 'countdown',
  };
}

/**
 * Set New Mode and Return to Config
 **/
export function setNewMode(
  state: TAssessmentState,
  mode: string
) {
  const doneLevels = new Set(
    [...state.doneLevels]
      .concat(state.options.mode + '')
  );
  return {
    ...state,
    id: createId(11),
    status: 'countdown',
    options: {
      ...state.options,
      ...MODES[mode.toLowerCase()],
      mode,
    },
    doneLevels
  };
}

/**
 * Start Countdown
 **/
export function goCountdown(
  state: TAssessmentState,
  options: TOptionMap
) {
  setStore('options', state.options);

  return {
    ...state,
    options: options,
    status: 'countdown'
  };
}

/**
 * Set Options
 **/
export function startAssessment(
  state: TAssessmentState
): TAssessmentState {
  const vocab = new Vocabulary(
    vocabMap.get(`${state.options.vocab}`.toLowerCase()) || threek,
    state.options.minchars as number,
    state.options.maxchars as number
  );

  return playQuestion({
    ...state,
    questions: pickQuestions(vocab, state.options).map(phrase => ({
      phrase: phrase,
      answer: '',
      answers: pickAnswers(vocab, phrase, state.options),
      points: 0
    })),
    index: 0,
    tryCount: toTryCount(state.tryCount, state.options, state.options),
    status: 'play'
  });
}

/**
 * Calculate new Try Count
 **/
function toTryCount(
  tryCount: number,
  oldOptions: TOptionMap,
  newOptions: TOptionMap
): number {
  return (oldOptions.level == null
      || oldOptions.level === newOptions.level)
    ? tryCount + 1
    : 1;
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
  const answerWords = answer.split(' ').filter(Boolean);
  const phraseWords = state.questions[state.index].phrase.split(' ');
  const isDone = answerWords.length === phraseWords.length
    || answer === '<TIMEOUT>';

  return {
    ...state,
    status: isDone ? 'answer' : 'guess',
    questions: state.questions.map((question, i) => ({
      ...question,
      answer: i === state.index
        ? answer
        : question.answer,
      points: i === state.index
        ? toPoints(question.phrase, answer)
        : question.points
    }))
  };
}

/**
 * Calculate points for a single answer
 **/
function toPoints(phrase: string, answer: string) {
  const phraseWords = phrase.split(' ');
  const answerWords = answer.split(' ');
  
  let points = 0;

  for (let i = 0; i < phraseWords.length; ++i) {
    if (phraseWords[i] === answerWords[i]) points++;
  }
  return points;
}
