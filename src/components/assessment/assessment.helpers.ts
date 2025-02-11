import player from '../../services/player.service';
import { rand, randomEntry, scrambleList, countMap } from '../../utils/values';
import { Vocabulary } from '../../utils/vocabulary';
import { TOptionMap } from '../config/config.types';
import { TAssessmentState } from './assessment.types';
import { render } from 'morse-player';
import { CALLSIGN_MAP, CALLSIGN_ALPHA, CALLSIGN_NUMERIC } from '../../data/sound-map';

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
  const callsigns = parseCallsigns(options.callsigns as string);
  const pickedQuestions: string[] = [];

  questions -= callsigns.count;

  // select standard questions
  for (let i = 0; i < questions; i++) {
    pickedQuestions.push(pickQuestion(list, words));
  }
  // select callsigns
  for (let i = 0; i < callsigns.count; i++) {
    const value = callsigns.min
      ? render(`[callsign min:${callsigns.min} max:${callsigns.max}]`)
      : render(`[callsign vocab:${callsigns.vocabs.join(',')}]`);
    
    pickedQuestions.push(value.join(''));
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
 * 
 * - First param must be number of callsigns {integer}
 * - Second param can be min or formats
 * - Third param can be max or formats
 * - Fourth+ params can be formats
 * 
 * - example: "2 3 4" (callsignes from 3-4 length)
 * - example: "2 1x3,complex,lnll" (callsigns from formats)
 * - example: "2 3 4 complex" (callsigns from 3-4 length & from complex format)
 * - example: "2 3 complex 1x3 2x3" (callsigns with 3 length & from formats)
 **/
export function parseCallsigns(
  callsigns: string
) {
  let count = 0;
  let min = 0;
  let max = 0;
  let vocabs: string[] = [];

  const parts = callsigns.split(/\s+/);

  // extract count (first param)
  if (parts.length) {
    const p1 = parts.shift() || '';

    if (/^\d+$/.test(p1)) {
      count = parseInt(p1, 10) || 0;
    }
  }
  // extract min or vocab (second param)
  if (parts.length) {
    const p2 = parts.shift() || '';

    if (/^\d+$/.test(p2)) {
      min = parseInt(p2, 10);
      if (min < 3) min = 3;
      if (min > 6) min = 6;
    }
    else {
      p2.split(/[^a-zA-Z0-9_-]+/)
        .forEach(entry =>
          vocabs.push(entry)
        );
    }
  }
  // extract max or vocab (third param)
  if (parts.length) {
    const p3 = parts.shift() || '';

    if (/^\d+$/.test(p3)) {
      max = parseInt(p3, 10);
      if (max < min) max = min;
      if (max < 3) max = 3;
      if (max > 6) max = 6;
    }
    else {
      p3.split(/[^a-zA-Z0-9_-]+/)
        .forEach(entry =>
          vocabs.push(entry)
        );
    }
  }
  // extract vocab (other params)
  if (parts.length) {
    parts.forEach(part => {
      part.split(/[^a-zA-Z0-9_-]+/)
        .forEach(entry =>
          vocabs.push(entry)
        );
    });
  }

  if (count) {
    if (!vocabs.length && !min) min = 3;
    if (!vocabs.length && !max) max = min;
  }
  return { count, min, max, vocabs };
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
  const list = new Set<string>();
  const size = callsign.length;
  let i = 0;

  // replace up to three characters
  while (i++ < 100 && list.size < 15) {
    const changes = rand(3); 
    const call = callsign.split('');

    // replace anywhere in the callsign
    for (let x = 0; x < changes; x++) {
      const pos = rand(size); 
      const char = call[pos];
      const alts = i < 50 ? CALLSIGN_MAP[char] : []; 
    
      // phonetic replacements
      if (alts) {
        call[pos] = randomEntry(alts);
      }
      // alphabetic replacement
      else if (/[a-zA-Z]/.test(char)) {
        call[pos] = randomEntry(CALLSIGN_ALPHA);
      }
      // numeric replacement
      else {
        call[pos] = randomEntry(CALLSIGN_NUMERIC);
      }
    }
    list.add(call.join(''));
  }

  return [...list];
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
      wpm: state.options.cpm
    };

    // TODO - [set freq:x] is needed to fix a bug in the player.
    // The options.freq doesn't take effect on the first run.
    setTimeout(() =>
      player.play(`[set freq:${freq}]${phrase}`, options),
      1000
    );
  }
  return state;
}


