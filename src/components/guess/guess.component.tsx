import { TGuessParams } from "./guess.types";
/**
 * Guess Component
 **/
export function Guess({
  question,
  onGuess
}: TGuessParams) {
  return (
    <div className="question">
      <div className="question-answers">
        {question.answers.map(answer => (
          <button key={answer} onClick={() => onGuess(answer)}>{answer}</button>
        ))}
      </div>
    </div>
  );
}