import { TQuestion } from "../assessment/assessment.types";
import { MouseEventHandler } from 'react';

export interface TResultsParams {
  questions: TQuestion[];
  onRepeat: MouseEventHandler<HTMLButtonElement>
}