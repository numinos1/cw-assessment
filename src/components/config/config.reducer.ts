import { TAction, TStorageOptions, TOptionMap, TOptValue, TOption } from './config.types';
import { getStore } from '../../utils/local-storage';

// ---------------------------------------------------------
//                       Initialize
// ---------------------------------------------------------

/**
 * Initialize Config
 **/
export function initOptions(
  values: TStorageOptions
): TOption[] {
  return initValues(
    values || {},
    [
      {
        label: 'Callsign',
        name: 'callsign',
        type: CallsignType(),
        value: '',
        error: ''
      },
      {
        label: 'Character Speed',
        name: 'wpm',
        type: NumberType(15, 40),
        value: 30,
        error: ''
      },
      {
        label: 'Effective Speed',
        name: 'eff',
        type: NumberType(4, 40),
        value: 30,
        error: ''
      },
      {
        label: 'Tone Frequency',
        name: 'freq',
        type: NumberType(400, 800),
        value: 600,
        error: ''
      },
      {
        label: 'Question Count',
        name: 'questions',
        type: NumberType(2, 20),
        value: 10,
        error: ''
      },
      {
        label: 'Word Count',
        name: 'words',
        type: NumberType(1, 5),
        value: 2,
        error: ''
      },
      {
        label: 'Max Word Size',
        name: 'characters',
        type: NumberType(2, 5),
        value: 3,
        error: ''
      }
    ]);
}

/**
 * Callsign Validator
 **/
function CallsignType(): Function {
  return (initValue: any) => {
    let error = '';
    let value = '';
    
    if (initValue != null) {
      value = `${initValue}`
    }
    value = value.trim().toUpperCase();

    if (!/^[A-Z0-9]{3,8}$/.test(value)) {
      error = 'Invalid Callsign';
    }
    return { value, error };
  }
}

/**
 * Number Validator
 **/
function NumberType(min: number, max: number): Function {
  return (initValue: any) => {
    let error = '';
    let value = 0;
    
    if (typeof initValue === 'string') {
      value = parseInt(initValue, 10) || value;
    }
    else if (typeof initValue === 'number') {
      value = initValue;
    }
    if (!value) {
      error = `value must be between ${min} - ${max}`;
    }
    else if (value > max) {
      error = `value must be <= ${max}`;
    }
    else if (value < min) {
      error = `value must be >= ${min}`;
    }
    return { value, error };
  }
}

/**
 * Set Value Defaults:
 * 
 * 1. Use current value 
 * 2. Or get value from the URL parameters
 * 3. Or get value from the HTML attributes
 * 4. Or get value from local storage
 * 5. Or use default schema value
 **/
function initValues(
  values: TOptionMap,
  state: TOption[]
): TOption[] {
  const storeValues = getStore<TOptionMap>('options') || {};
  const htmlValues = getHtmlValues("#cw-assessment");
  const urlValues = getUrlValues();

  return state.map(option => {
    const { name } = option;
    let value = values[name];

    if (value == null) {
      value = urlValues.get(name)
        || htmlValues[name]
        || storeValues[name]
        || option.value;
    }
    return {
      ...option,
      ...option.type(value),
    };
  });
}

/**
 * Get HTML Template Values
 **/
function getHtmlValues(selector: string): DOMStringMap {
  const el = document.querySelector(selector) as HTMLElement;
  return el?.dataset || {};
}

/**
 * Get URL Query Params
 **/
function getUrlValues(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

/**
 * Reduce Options
 **/
export function reduceOptions(
  state: TOption[],
  action: TAction
): TOption[] {
  switch (action.type) {
    case 'set-option': 
      return setValue(state, action.change);
    default:
      return state;
  }
}

/**
 * Set input value
 **/
function setValue(
  state: TOption[],
  kvPair: TOptValue
): TOption[] {
  const { name, value } = kvPair;

  return state.map(option => {
    if (option.name === name) {
      return {
        ...option,
        ...option.type(value)
      };
    }
    return option;
  });
}