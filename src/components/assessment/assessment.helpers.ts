import player from '../../services/player.service';
import { randomEntry, scrambleList, countMap } from '../../utils/values';
import { Vocabulary } from '../../utils/vocabulary';
import { TOptionMap } from '../config/config.types';
import { TAssessmentState } from './assessment.types';

/**
 * Pick Questions
 **/
export function pickQuestions(
  vocab: Vocabulary,
  options: TOptionMap
): string[] {
  const { questions, words } = options;
  const list = vocab.getRandomWords();

  return countMap(questions, () => 
    countMap(words, () => list.pop())
      .join(' ')
  );
}

/**
 * Pick Answers
 **/
export function pickAnswers(
  vocab: Vocabulary,
  phrase: string
): string[] {
  const words = phrase.split(' ');
  const answers = new Set([phrase]);
  const wordLists = words.map(word => 
    vocab.getSimilarWords(word)
  );

  for (let i = 0; answers.size < 5 && i < 100; ++i) {
    const answer = wordLists.map(matches => 
      randomEntry(matches, i < 5 ? 3 : 10)
    )
    answers.add(answer.join(' '));
  }
  return scrambleList([...answers]);
}

/**
 * Play Question
 **/
export function playQuestion(
  state: TAssessmentState
): TAssessmentState {
  if (!state.questions.length) {
    return state;
  }
  setTimeout(() => 
    player.play(
      state.questions[state.index].phrase, 
      state.options
    ), 
    100
  );

  return {
    ...state,
    status: 'play',
  };
}


