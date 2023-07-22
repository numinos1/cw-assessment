import { TQuestion } from '../assessment/assessment.types';

export interface TPhraseParams {
  question: TQuestion;
  playIndex: number | undefined;
  status: string;
}