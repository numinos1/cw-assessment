import { TOptionMap } from '../config/config.types';

export interface TAssessmentState {
  id: string;
  options: TOptionMap;
  questions: TQuestion[];
  index: number;
  tryCount: number;
  status: string;
  playIndex: number | undefined;
}

export interface TQuestion {
  phrase: string;
  answer: string;
  answers: string[];
  points: number;
}

export type TAction =
  | { type: 'on-start', options: any }
  | { type: 'on-guess', answer: any }
  | { type: 'on-repeat' }
  | { type: 'on-answer' }
  | { type: 'on-mode', mode: string }
  | { type: 'press-key', event: KeyboardEvent }
  | { type: 'char:start', event: any }
  | { type: 'char:end', event: any }
  | { type: 'play:stop', event: any };
