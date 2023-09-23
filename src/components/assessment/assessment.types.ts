import { TOptionMap } from '../config/config.types';

export interface TAssessmentState {
  id: string;
  options: TOptionMap;
  questions: TQuestion[];
  index: number;
  status: string;
  results: TResults;
  playIndex: number | undefined;
}

export interface TQuestion {
  phrase: string;
  answer: string;
  answers: string[];
}

export interface TResults {
  total: number;
  right: number;
  score: number;
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
