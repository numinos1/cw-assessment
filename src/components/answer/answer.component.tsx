import { TAnswerParams } from "./answer.types";

export function Answer({
  questions,
  onAnswer,
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
    </div>
  );
}
