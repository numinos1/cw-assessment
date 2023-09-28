import { useEffect } from 'react';
import { TResultsParams } from "./results.types";
import { toResults, sendResults, toHeader, toNextMode } from './results.helpers';

/**
 * Results Component
 **/
export function Results({
  assessment,
  onRepeat,
  onClose,
  onMode
}: TResultsParams) {
  const results = toResults(assessment.questions);
  const nextMode = toNextMode(assessment, results);

  useEffect(() =>
    sendResults(assessment),
    [assessment]
  );

  return (
    <div className="results">
      <h2>{toHeader(results)}</h2>
      <div className="score">{results.score}%</div>
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
