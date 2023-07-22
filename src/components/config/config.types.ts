export interface TOption {
  inputLabel: string;
  inputName: string;
  inputValue: number;
  inputError: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
}

export interface TOptValue {
  name: string;
  value: number;
}

export interface TStorageOptions {
  [char: string]: number;
}

export type TAction =
  | { type: 'set-option', change: TOptValue };

export interface TConfigParams {
  options: TStorageOptions;
  onConfig: (options: TOptionMap) => void;
}

export type TOptionMap = Record<string, number>;