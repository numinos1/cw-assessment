import { TAction, TStorageOptions, TOptionMap, TOptValue, TOption } from './config.types';
import { MODES } from '../../data/modes';
import { CONFIG_SCHEMA } from './config.schema';
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
  return initValues(values || {}, CONFIG_SCHEMA);
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
      value = urlValues.get(name)
        || htmlValues[name]
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