import { TResults } from "../assessment/assessment.types";
import { MouseEventHandler } from 'react';

export interface TResultsParams {
  results: TResults;
  onRepeat: MouseEventHandler<HTMLButtonElement>
}