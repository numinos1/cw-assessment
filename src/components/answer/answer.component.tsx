import { TAnswerParams } from "./answer.types";

export function Answer({
  questions,
  onAnswer,
  onClose,
  index
}: TAnswerParams) {
  return (
    <div>
      <button className="a-button" onClick={onAnswer}>
        {(questions.length - 1) === index
          ? 'See Results'
          : 'Next Question'
        }
      </button>
      <br/>
      <button className="a-button" onClick={onClose}>
        Quit and Return to CWOps
      </button>
    </div>
  );
}
