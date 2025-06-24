import { TPhraseParams, TSlot } from "./phrase.types";

/**
 * Generate Letter Slots for the Question Phrase
 */
export function toSlots({
  status,
  question,
  playIndex
}: TPhraseParams) {
  const guessedWords = question.answer ? question.answer.split(' ') : [];
  const targetWords = question.phrase.split(' ');
  const slots: TSlot[] = [];
  let letterIndex = 1;

  targetWords.forEach((targetWord, wordIndex) => {
    const guessedWord = question.answer === '<TIMEOUT>'
      ? 'WRONG-WORD'
      : guessedWords[wordIndex];
    const style = ['phrase-slot', 'phrase-slot-char'];
    
    // add space before each word (except the first)
    if (wordIndex) {
      letterIndex++;
      slots.push({
        letter: '',
        style: 'phrase-slot phrase-slot-space'
      });
    }
    // add style for the guessed word
    if (guessedWord) {
      style.push(guessedWord === targetWord
        ? 'phrase-slot-right'
        : 'phrase-slot-wrong'
      );
    }
    else if (status === 'guess' && wordIndex === guessedWords.length) {
      style.push('phrase-slot-guess');
    }
    // add slot for each letter of the target word
    targetWord.split('').forEach(letter => {
      slots.push({
        letter: guessedWord
          ? letter
          : '?',
        style: (playIndex === letterIndex++)
          ? style.concat('phrase-slot-play').join(' ')
          : style.join(' ')
      });
    });
  });

  return slots;
}
