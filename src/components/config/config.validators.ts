/**
 * String Type
 **/
export function StringType(): Function {
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
 * Number Validator
 **/
export function NumberType(min: number, max: number): Function {
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
export function StringValues(min: number, max: number): Function {
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
