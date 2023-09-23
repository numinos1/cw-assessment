import { TResultsParams } from "./results.types";
import { TResults } from "../assessment/assessment.types";

export function Results({
  results,
  onRepeat
}: TResultsParams) {
  return (
    <div className="results">
      <h2>{toHeader(results)}</h2>
      <div className="score">{results.score}%</div>
      <button className="a-button" onClick={onRepeat}>Try Again</button>
    </div>
  );
}

function toHeader({ right, total, score }: TResults) {
  if (right === total) {
    return "Congratulations! you got a perfect score.";
  }
  if (total - 1 === right) {
    return "Good job! you only missed one answer.";
  }
  if (score >= 80) {
    return "Well done. You only missed a couple of answers.";
  }
  if (score > 50) {
    return "You got more than half correct.";
  }
  return "You got less than half correct";
}