import player from '../../services/player.service';
import { rand, randomEntry, scrambleList, countMap } from '../../utils/values';
import { Vocabulary } from '../../utils/vocabulary';
import { TOptionMap } from '../config/config.types';
import { TAssessmentState } from './assessment.types';
import { render } from 'morse-player';
import { CALLSIGN_MAP } from '../../data/sound-map';

const IS_CALLSIGN = /^[A-Z]{1,2}\d[A-Z]{1,3}$/;

/**
 * Pick Questions
 **/
export function pickQuestions(
  vocab: Vocabulary,
  options: TOptionMap
): string[] {
  let questions = options.questions as number;
  const words = options.words as number;  
  const list = vocab.getRandomWords();
  const callsigns = parseCallsigns(options.callsigns as string, questions);
  const pickedQuestions: string[] = [];

  questions -= callsigns.count;

  // select standard questions
  for (let i = 0; i < questions; i++) {
    pickedQuestions.push(pickQuestion(list, words));
  }
  // select callsigns
  for (let i = 0; i < callsigns.count; i++) {
    pickedQuestions.push(
      render(`[callsign min:${callsigns.min} max:${callsigns.max}]`)
        .join('')
    );
  }
  return scrambleList(pickedQuestions);
}

/**
 * Pick Question
 **/
export function pickQuestion(
  list: string[],
  words: number,
) {
  return countMap(words, () =>
    list.pop()
  )
  .join(' ');
}

/**
 * Parse Callsigns String
 **/
export function parseCallsigns(
  callsigns: string,
  questions: number
) {
  let [count = 0, min = 3, max = 6] = callsigns
    .split(/\D+/)
    .map(v => parseInt(v, 10))
    .filter(v => !isNaN(v));
  
  if (count) {
    if (count > questions) {
      count = questions;
    }
    if (min < 3) {
      min = 3;
    }
    else if (min > 6) {
      min = 6;
    }
    if (max < 3) {
      max = 3;
    }
    else if (max > 6) {
      max = 6;
    }
    if (max < min) {
      max = min;
    }
  }
  return { count, min, max };
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
    IS_CALLSIGN.test(word)
      ? getSimilarCallsigns(word)
      : vocab.getSimilarWords(word)
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
 * Generate Similar Sounding Callsigns
 **/
export function getSimilarCallsigns(callsign: string): string[] {
  const list: string[] = [];
  const size = callsign.length;

  // replace up to three characters
  for (let i = 0; i < 10; i++) {
    const changes = rand(3); 
    const call = callsign.split('');

    // replace anywhere in the callsign
    for (let x = 0; x < changes; x++) {
      const pos = rand(size); 
      const char = call[pos];
      const alts = CALLSIGN_MAP[char];

      if (alts) {
        call[pos] = randomEntry(alts);
      }
    }
    list.push(call.join(''));
  }
  return list;
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
    // Translate CPM to WPM for the CW engine
    const options = {
      ...state.options,
      freq: freq,
      wpm: state.options.cpm
    };

    // TODO - [set freq:x] is needed to fix a bug in the player.
    // The options.freq doesn't take effect on the first run.
    setTimeout(() =>
      player.play(phrase, options),
      1000
    );
  }
  return state;
}


