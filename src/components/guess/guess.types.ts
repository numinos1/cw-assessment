import { TQuestion } from "../assessment/assessment.types";

export interface TGuessParams {
  status: string;
  question: TQuestion;
  onGuess: Function;
}