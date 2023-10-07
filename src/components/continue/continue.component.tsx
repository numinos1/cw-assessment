import { TContinueParams } from "./continue.types";

export function Continue({
  questions,
  onAnswer,
  onClose,
  index
}: TContinueParams) {
  return (
    <div className="continue">
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
