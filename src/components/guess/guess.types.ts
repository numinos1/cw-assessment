import { TQuestion } from "../assessment/assessment.types";

export interface TGuessParams {
  question: TQuestion;
  onGuess: Function;
}