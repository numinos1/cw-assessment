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
