import { TAssessmentState } from "../assessment/assessment.types";
import { MouseEventHandler } from 'react';

export interface TResultsParams {
  assessment: TAssessmentState;
  onRepeat: MouseEventHandler<HTMLButtonElement>
  onClose: MouseEventHandler<HTMLButtonElement>
  onMode: Function
}

export interface TResults {
  total: number;
  right: number;
  words: number;
  score: number;
}