import { getStore } from '../../utils/local-storage';
import { TOptionMap } from '../config/config.types';
import { TAssessmentState, TAction } from './assessment.types';
import { WORD_LIST2 } from '../../data/words';
import { Vocabulary } from '../../utils/vocabulary';
import { setStore } from '../../utils/local-storage';
import { pickQuestions, pickAnswers, playQuestion } from './assessment.helpers';

// ---------------------------------------------------------
//                       Initialize
// ---------------------------------------------------------

/**
 * Initialize Assessment State
 **/
export function initAssessment(): TAssessmentState {
  return {
    options: getStore<TOptionMap>('options') || {},
    questions: [],
    index: 0,
    status: 'config', 
      // config
      // play
      // guess
      // next -> play | results
      // results
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
    case 'press-key': 
      return pressKeyAction(state, action.event);
    case 'start-play-char': 
      return startCharAction(state, action.playIndex);
    case 'end-play-char': 
      return endCharAction(state);
    case 'end-play': 
      return { ...state, status: 'guess' };
    default:
      return state;
  }
}

// ---------------------------------------------------------
//                        Actions
// ---------------------------------------------------------

/**
 * Start Play Character
 **/
export function startCharAction(
  state: TAssessmentState,
  playIndex: number
): TAssessmentState {
  console.log('playIndex', playIndex);
  return {
    ...state,
    playIndex: playIndex
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

/**
 * Return To Config
 **/
export function returnToConfigAction(
  state: TAssessmentState
): TAssessmentState {
  return {
    ...state,
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
  const vocab = new Vocabulary(WORD_LIST2, options.characters);
  setStore('options', options);

  return playQuestion({
    ...state,
    options: options,
    questions: pickQuestions(vocab, options).map(phrase => ({
      phrase: phrase,
      answer: '',
      answers: pickAnswers(vocab, phrase),
    })),
    index: 0
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
  const nextIndex = state.index + 1;
  const isDone = nextIndex === state.questions.length;

  const nextState = {
    ...state,
    questions: state.questions.map((question, i) => ({
      ...question,
      answer: i === state.index
        ? answer
        : question.answer
    })),
    index: nextIndex,
    status: isDone 
      ? 'results' 
      : state.status
  };

  return isDone 
    ? nextState 
    : playQuestion(nextState);
}
