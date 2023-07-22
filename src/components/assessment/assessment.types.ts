import { TOptionMap } from '../config/config.types';

export interface TAssessmentState {
  options: TOptionMap;
  questions: TQuestion[];
  index: number;
  status: string;
  playIndex: number | undefined;
}

export interface TQuestion {
  phrase: string;
  answer: string;
  answers: string[];
}

export type TAction =
  | { type: 'on-config', options: any }
  | { type: 'on-guess', answer: any }
  | { type: 'on-repeat' }
  | { type: 'on-answer' }
  | { type: 'press-key', event: KeyboardEvent }
  | { type: 'char:start', event: any }
  | { type: 'char:end', event: any }
  | { type: 'play:stop', event: any };
