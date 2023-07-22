import { TResultsParams } from "./results.types";

export function Results({
  questions,
  onRepeat
}: TResultsParams) {
  return (
    <div>
      <h2>Results</h2>
      <button className="repeat" onClick={onRepeat}>Try Again</button>
      <pre>{JSON.stringify(questions, null, '  ')}</pre>
    </div>
  );
}
