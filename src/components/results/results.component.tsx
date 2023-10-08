import { useEffect } from 'react';
import { TResultsParams } from "./results.types";
import { toResults, sendResults, toNextMode } from './results.helpers';

/**
 * Results Component
 **/
export function Results({
  assessment,
  onRepeat,
  onClose,
  onMode
}: TResultsParams) {
  const results = toResults(assessment);
  const nextMode = toNextMode(assessment, results);

  useEffect(() =>
    sendResults(assessment),
    [assessment]
  );

  return (
    <div className="results">
      <div className="results-score">
        <h2>You got {results.points} out of {results.total} words</h2>
        <div className="score">{results.score}%</div>
      </div>
      <div className="buttons">
        {assessment.tryCount < 2
          ? (<button className="a-button" onClick={onRepeat}>Try Again</button>)
          : ''
        }
        {nextMode
          ? (<button className="a-button" onClick={() => onMode(nextMode)}>Try {nextMode}</button>)
          : ''
        }
        <button className="a-button" onClick={onClose}>Return to CWOps</button>
      </div>
    </div>
  );
}
