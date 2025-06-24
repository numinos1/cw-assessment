import { useEffect, useState } from 'react';
import { TGuessParams } from "./guess.types";

/**
 * Guess Component
 **/
export function Guess({
  status,
  question,
  onGuess,
  options
}: TGuessParams) {
  const [remaining, setRemaining] = useState<number>(() =>
    typeof options.timeout === 'number' ? options.timeout : 0
  );
  const guessedAnswer = question.answer.split(' ').filter(Boolean);
  const wordIndex: number = guessedAnswer.length;

  const answersWords: string[][] = question.answers.map(answer => answer.split(' '));
  const answerWords: string[] = answersWords.map(answer => answer[wordIndex]);

  /**
   * Countdown Timer
   */
  useEffect(() => {
    let handle: number = 0;

    if (status !== 'guess') {
      setRemaining(-1);
      return;
    }

    if (remaining > 0) {
      handle = setTimeout(() => {
        setRemaining(remaining - 1);
      }, 1000);

      return () => {
        clearTimeout(handle);
      }
    }
    else if (remaining === 0) {
      onGuess('<TIMEOUT>');
    }
  }, [remaining]);

  return (
    <div className="question">
      {status === 'guess' && (
        <div className="question-answers">
          {answerWords.map((guessWord, index)=> (
            <button
              key={guessWord + index}
              onClick={() => onGuess(guessedAnswer.concat(guessWord).join(' '))}
              className='guess-word'
            >
              {guessWord}
            </button>
          ))}
        </div>
      )}
      {status === 'guess' && remaining > 0 && (
        <div className="question-remaining">
          {remaining} seconds left
        </div>
      )}
      {remaining === 0 && (
        <div className="question-timeout">
          Time Expired
        </div>
      )}
    </div>
  );
}
