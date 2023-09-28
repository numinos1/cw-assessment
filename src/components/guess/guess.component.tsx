import { TGuessParams } from "./guess.types";
import { TQuestion } from "../assessment/assessment.types";

/**
 * Guess Component
 **/
export function Guess({
  status,
  question,
  onGuess
}: TGuessParams) {
  return (
    <div className="question">
      <div className="question-answers">
        {question.answers.map(answer => (
          <button
            key={answer}
            onClick={() => onGuess(answer)}
            className={toStyle(status, question, answer)}
          >
            {answer}
          </button>
        ))}
      </div>
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