import { TAction, TStorageOptions, TOptionMap, TOptValue, TOption } from './config.types';
import { MODES } from '../../data/modes';
//import { getStore } from '../../utils/local-storage';

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
        type: StringType(),
        value: '',
        error: '',
        isHidden: false
      },
      {
        label: 'Character Speed',
        name: 'wpm',
        type: NumberType(15, 100),
        value: 30,
        error: '',
        isHidden: false
      },
      {
        label: 'Effective Speed',
        name: 'eff',
        type: NumberType(4, 100),
        value: 30,
        error: '',
        isHidden: false
      },
      {
        label: 'Tone Frequency',
        name: 'freq',
        type: StringValues(400, 800),
        value: 600,
        error: '',
        isHidden: false
      },
      {
        label: 'Question Count',
        name: 'questions',
        type: NumberType(2, 20),
        value: 10,
        error: '',
        isHidden: false
      },
      {
        label: 'Answer Count',
        name: 'answers',
        type: NumberType(3, 10),
        value: 5, 
        error: '',
        isHidden: false
      },
      {
        label: 'Word Count',
        name: 'words',
        type: NumberType(1, 5),
        value: 2,
        error: '',
        isHidden: false
      },
      {
        label: 'Max Word Size',
        name: 'characters',
        type: NumberType(2, 5),
        value: 3,
        error: '',
        isHidden: false
      },
      {
        label: 'Level',
        name: 'level',
        type: StringType(),
        value: '',
        error: '',
        isHidden: true
      },
      {
        label: 'Mode',
        name: 'mode',
        type: StringType(),
        value: '',
        error: '',
        isHidden: true
      },
      {
        label: 'Token',
        name: 'token',
        type: StringType(),
        value: '',
        error: '',
        isHidden: true
      },
      {
        label: 'Return URL',
        name: 'returnurl',
        type: StringType(),
        value: '',
        error: '',
        isHidden: true
      },
      {
        label: 'CWOps Info',
        name: 'infor',
        type: StringType(),
        value: '',
        error: '',
        isHidden: true
      },
      {
        label: 'Vocabulary',
        name: 'vocab',
        type: StringType(),
        value: 'threek',
        error: '',
        isHidden: true
      }
    ]);
}

/**
 * String Type
 **/
function StringType(): Function {
  return (initValue: any) => {
    let error = '';
    let value = '';

    if (initValue != null) {
      value = `${initValue}`;
    }
    value.trim();

    return { value, error };
  }
}

/**
 * Callsign Validator
 **/
// function CallsignType(): Function {
//   return (initValue: any) => {
//     let error = '';
//     let value = '';
    
//     if (initValue != null) {
//       value = `${initValue}`
//     }
//     value = value.trim().toUpperCase();

//     // All call signs: [a-zA-Z0-9]{1,3}[0-9][a-zA-Z0-9]{0,3}[a-zA-Z]
//     // Non-US call signs: \b(?!K)(?!k)(?!N)(?!n)(?!W)(?!w)(?!A[A-L])(?!a[a-l])[a-zA-Z0-9][a-zA-Z0-9]?[a-zA-Z0-9]?[0-9][a-zA-Z0-9][a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?\b
//     // US call signs: [AKNWaknw][a-zA-Z]{0,2}[0-9][a-zA-Z]{1,3}
//     if (!/^[A-Z0-9]{1,3}[0-9][A-Z0-9]{0,3}[A-Z]\/?[A-Z0-9]{0,5}$/.test(value)) {
//       error = 'Invalid Callsign';
//     }
//     return { value, error };
//   }
// }

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
 * String Number Value(s)
 **/
function StringValues(min: number, max: number): Function {
  return (initValue: any) => {
    let error = '';
    let value = '';

    if (initValue != null) {
      value = `${initValue}`;
    }
    value = value.split(/[,| ]+/).map(strVal => {
      if (!strVal) {
        return 0;
      }
      const intVal = parseInt(strVal, 10);

      if (isNaN(intVal) || intVal < min || intVal > max) {
        error = `value(s) must be between ${min} - ${max}`;
        return 0;
      }
      return intVal;
    })
    .filter(val => val)
    .join(',');
    
    if (!value) {
      error = `value(s) must be between ${min} - ${max}`;
    }
    return { value, error };
  }
}

/**
 * Set Value Defaults:
 **/
function initValues(
  values: TOptionMap,
  state: TOption[]
): TOption[] {
 //// const storeValues = getStore<TOptionMap>('options') || {};
  const htmlValues = getHtmlValues("#cw-assessment");
  const urlValues = getUrlValues();
  const modeValues = getModeValues(values, htmlValues, urlValues);

  return state.map(option => {
    const { name } = option;
    let value = modeValues[name] || values[name];

    if (value == null) {
      value = urlValues.get(name === 'wpm' ? 'cpm' : name)
        || htmlValues[name === 'wpm' ? 'cpm' : name]
       // || storeValues[name]
        || option.value;
    }
    return {
      ...option,
      ...option.type(value),
    };
  });
}

/**
 * Get the Mode Values
 **/
function getModeValues(values: TOptionMap, htmlValues: DOMStringMap, urlValues: URLSearchParams): any {
  const valuesMode = values.mode != null ? `${values.mode}` : '';
  const mode = (valuesMode || urlValues.get('mode') || htmlValues.mode || '').toLowerCase();
  return MODES[mode] || {};
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
      const { error } = option.type(value);
      return {
        ...option,
        value,
        error
      };
    }
    return option;
  });
}