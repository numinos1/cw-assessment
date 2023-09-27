export interface TOption {
  label: string;
  name: string;
  type: Function;
  value: string | number;
  error: string;
  isHidden: boolean;
}

export interface TOptValue {
  name: string;
  value: string;
}

export interface TStorageOptions {
  [char: string]: number | string;
}

export type TAction =
  | { type: 'set-option', change: TOptValue };

export interface TConfigParams {
  options: TStorageOptions;
  onConfig: (options: TOptionMap) => void;
}

export type TOptionMap = Record<string, number | string>;