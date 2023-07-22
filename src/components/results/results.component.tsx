import { TResultsParams } from "./results.types";
import { TQuestion } from "../assessment/assessment.types";

export function Results({
  questions,
  onRepeat
}: TResultsParams) {
  return (
    <div className="results">
      <h2>Results</h2>
      {questions.map((question, index) => (
        <div className="results-answer" key={index}>
          {index + 1}. &nbsp;
          <div className="results-letters">
            {question.phrase.split('').map((letter, i) => (
              <span
                key={i}
                className={toLetterClass(question, letter, i)
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

function toLetterClass(
  question: TQuestion,
  source: string,
  index: number
): string {
  const letter = question.answer
    .substring(index, 1) || '';

  return (letter.toUpperCase() === source.toUpperCase())
    ? 'results-char-right'
    : 'results-char-wrong';
}