import { useEffect, useState } from 'react';
import { TGuessParams } from "./guess.types";
import { TQuestion } from "../assessment/assessment.types";

/**
 * Guess Component
 **/
export function Guess({
  status,
  question,
  onGuess,
  options
}: TGuessParams) {
  const [remaining, setRemaining] = useState(
    typeof options.timeout === 'number'
      ? options.timeout
      : 0
  );

  function makeGuess(answer: string) {
    onGuess(answer);
    setRemaining(-1);
  }

  useEffect(() => {
    let handle: number = 0;

    if (remaining > 0) {
      handle = setTimeout(() => {
        setRemaining(remaining - 1);
      }, 1000);

      return () => {
        clearTimeout(handle);
      }
    }
    else if (remaining === 0) {
      onGuess('');
    }
  }, [remaining]);

  return (
    <div className="question">
      <div className="question-answers">
        {question.answers.map(answer => (
          <button
            key={answer}
            onClick={() => status === 'guess' && makeGuess(answer)}
            className={toStyle(status, question, answer)}
          >
            {answer}
          </button>
        ))}
      </div>
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

/**
 * To Style
 **/
function toStyle(
  status: string,
  question: TQuestion,
  answer: string
) {
  if (status === 'guess') {
    return '';
  }
  if (question.answer !== answer) {
    return 'question-ignore';
  }
  if (question.phrase === answer) {
    return 'question-right';
  }
  if (!question.points) {
    return 'question-wrong';
  }
  return 'question-half';
}