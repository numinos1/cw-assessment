import { TAction, TStorageOptions, TOptValue, TOption } from './config.types';

// ---------------------------------------------------------
//                       Initialize
// ---------------------------------------------------------

/**
 * Initialize Config
 **/
export function initOptions(
  values: TStorageOptions
): TOption[] {
  return setDefaults(values, [{
    inputLabel: 'Character Speed',
    inputName: 'wpm',
    inputValue: 0,
    inputError: '',
    defaultValue: 30,
    minValue: 15,
    maxValue: 40
  }, {
    inputLabel: 'Effective Speed',
    inputName: 'eff',
    inputValue: 0,
    inputError: '',
    defaultValue: 30,
    minValue: 4,
    maxValue: 40
  }, {
    inputLabel: 'Tone Frequency',
    inputName: 'freq',
    inputValue: 0,
    inputError: '',
    defaultValue: 600,
    minValue: 400,
    maxValue: 800
  }, {
    inputLabel: 'Question Count',
    inputName: 'questions',
    inputValue: 0,
    inputError: '',
    defaultValue: 10,
    minValue: 2, //5,
    maxValue: 20
  }, {
    inputLabel: 'Word Count',
    inputName: 'words',
    inputValue: 0,
    inputError: '',
    defaultValue: 2,
    minValue: 1,
    maxValue: 5
  }, {
    inputLabel: 'Max Word Size',
    inputName: 'characters',
    inputValue: 0,
    inputError: '',
    defaultValue: 3,
    minValue: 2,
    maxValue: 5
  }]);
}

// ---------------------------------------------------------
//                           Reduce
// ---------------------------------------------------------

/**
 * Reduce Options
 **/
export function reduceOptions(
  state: TOption[],
  action: TAction
): TOption[] {
  switch (action.type) {
    case 'set-option': 
      return setErrors(setValue(state, action.change));
    default:
      return state;
  }
}

// ---------------------------------------------------------
//                   Actions & Helpers
// ---------------------------------------------------------

/**
 * Set Value Defaults
 **/
function setDefaults(
  values: TStorageOptions,
  state: TOption[]
): TOption[] {
  values = values || {};

  return state.map(option => ({
    ...option,
    inputValue: values[option.inputName] 
      || option.defaultValue
  }));
}

/**
 * Generate state errors
 **/
function setErrors(
  state: TOption[]
): TOption[] {
  return state.map(option => {
    const { minValue, maxValue, inputValue } = option;
    let inputError = '';

    if (!inputValue) {
      inputError = `value must be between ${minValue} - ${maxValue}`;
    }
    else if (inputValue > maxValue) {
      inputError = `value must be <= ${maxValue}`;
    }
    else if (inputValue < minValue) {
      inputError = `value must be >= ${minValue}`;
    }
    return { 
      ...option,
      inputError
    };
  });
}

/**
 * Set input value
 **/
function setValue(
  state: TOption[],
  optionValue: TOptValue
): TOption[] {
  const { name, value } = optionValue;

  return state.map(option => {
    if (option.inputName === name) {
      return {
        ...option,
        inputValue: value
      };
    }
    return option;
  });
}
