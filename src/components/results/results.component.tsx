import { TResultsParams } from "./results.types";

export function Results({
  questions,
  onRepeat
}: TResultsParams) {
  return (
    <div className="results">
      <h2>Results</h2>
      {questions.map((question, index) => (
        <div className="results-answer">
          {index + 1}. &nbsp;
          <div className="results-letters">
            {question.phrase.split('').map((letter, i) => (
              <span
                className={question.answer[i].toUpperCase() === letter.toUpperCase()
                  ? 'results-char-right'
                  : 'results-char-wrong'
                }
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      ))}
      <button className="a-button" onClick={onRepeat}>Try Again</button>
    </div>
  );
}
