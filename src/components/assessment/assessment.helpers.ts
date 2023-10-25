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
  const questions = options.questions as number;
  const words = options.words as number;
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
  phrase: string,
  options: TOptionMap
): string[] {
  const answerTotal = Number(options.answers) || 5;
  const words = phrase.split(' ');
  const answers = new Set([phrase]);
  const wordLists = words.map(word => 
    vocab.getSimilarWords(word)
  );

  for (let i = 0; answers.size < answerTotal && i < 100; ++i) {
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
  const question = state.questions[state.index];
  
  if (question) {
    const phrase = state.questions[state.index].phrase;
    let freq = `${state.options.freq}`;

    if (freq.indexOf(',') >= 0) {
      freq = freq.replace(/,/gm, ' '); 
      freq = `[pick from:"${freq}"]`;
    }
    // TODO - [set freq:x] is needed to fix a bug in the player.
    // The options.freq doesn't take effect on the first run.
    setTimeout(() =>
      player.play(
        `[set freq:${freq}]${phrase}`,
        state.options
      ),
      500
    );
  }
  return state;
}


