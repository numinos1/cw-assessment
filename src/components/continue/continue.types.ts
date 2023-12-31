import { TQuestion } from "../assessment/assessment.types";
import { MouseEventHandler } from 'react';

export interface TContinueParams {
  questions: TQuestion[];
  onAnswer: MouseEventHandler<HTMLButtonElement>,
  onClose: MouseEventHandler<HTMLButtonElement>,
  index: number
}