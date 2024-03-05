import { TPhraseParams } from "./phrase.types";

interface TSlot {
  letter: string;
  style: string;
}

export function Phrase({
  question,
  playIndex,
  status
}: TPhraseParams) {
  const phraseWords = question.phrase.split(' ');
  const answerWords = question.answer ? question.answer.split(' ') : [];
  const playingIndex = playIndex;
  let letterIndex = 1;

  const slots: TSlot[] = phraseWords.reduce((out: TSlot[], word, index) => {
    const answer = answerWords[index];
    const style = ['phrase-slot phrase-slot-char'];
   
    if (index) {
      letterIndex++;
      out.push({
        letter: '',
        style: 'phrase-slot phrase-slot-space'
      });
    }
    if (answer === word) {
      style.push('phrase-slot-right');
    }
    else if (answer) {
      style.push('phrase-slot-wrong');
    }
    return out.concat(
      word.split('').map(letter => ({
        letter: status === 'answer'
          ? letter
          : '?',
        style: (playingIndex === letterIndex++)
          ? style.concat('phrase-slot-play').join(' ')
          : style.join(' ')
      }))
    );
  }, []);

  return (
    <div className="phrase">
      {slots.map((slot, index) => (
        <div className={slot.style} key={index}>
          {slot.letter}
        </div>
      ))}
    </div>
  );
}

