/**
 * Get data from localstorage
 */
export function getStore<TValue>(
  name: string
): TValue | undefined {
  let state = localStorage.getItem(name);

  if (!state) {
    return;
  }
  try {
    return JSON.parse(state);
  }
  catch (err) {
    console.log('LOCAL STORAGE ERROR', err);
    return undefined;
  }
}

/**
 * Set data to localstorage
 */
export function setStore<TValue>(
  name: string,
  state: TValue
): TValue {
  if (state == null) {
    localStorage.removeItem(name);
  }
  else {
    localStorage.setItem(name,
      JSON.stringify(state)
    );
  }
  return state;
}
