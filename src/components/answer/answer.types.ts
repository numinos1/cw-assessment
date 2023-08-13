import { TQuestion } from "../assessment/assessment.types";
import { MouseEventHandler } from 'react';

export interface TAnswerParams {
  questions: TQuestion[];
  onAnswer: MouseEventHandler<HTMLButtonElement>,
  index: number
}