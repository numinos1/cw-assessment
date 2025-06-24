import { TQuestion } from '../assessment/assessment.types';

export interface TPhraseParams {
  status: string;
  question: TQuestion;
  playIndex: number;
}
export interface TSlot {
  letter: string;
  style: string;
}