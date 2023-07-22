import { TQuestion } from "../assessment/assessment.types";

export interface TSpeechParams {
  question: TQuestion;
  onGuess: Function;
}