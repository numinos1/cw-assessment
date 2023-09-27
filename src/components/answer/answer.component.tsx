import { TAnswerParams } from "./answer.types";

export function Answer({
  questions,
  onAnswer,
  onClose,
  index
}: TAnswerParams) {
  return (
    <div className="buttons">
      <button className="a-button" onClick={onAnswer}>
        {(questions.length - 1) === index
          ? 'See Results'
          : 'Next Question'
        }
      </button>
      <button className="a-button" onClick={onClose}>
        Quit
      </button>
    </div>
  );
}
