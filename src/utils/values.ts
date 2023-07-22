/**
 * Random number from zero < size
 **/
export function rand(
  size: number
): number {
  return Math.floor(Math.random() * size);
}

/**
 * Count Map
 **/
export function countMap<Type>(
  count: number,
  cb: Function
): Type[] {
  const out = Array(count);

  for (let i = 0; i < count; ++i) {
    out[i] = cb(i);
  }
  return out;
}

/**
 * Scramble an array
 **/
export function scrambleList<Type>(
  list: Type[]
): Type[] {
  const randomized = list.slice();
  const size = randomized.length;

  for (let i = 0; i < size; ++i) {
    const to = Math.floor(Math.random() * size);

    const temp = randomized[to];
    randomized[to] = randomized[i];
    randomized[i] = temp;
  }
  return randomized;
}

/**
 * Randomly select one item from a list
 **/
export function randomEntry<Type>(
  list: Type[], 
  limit: number = 0
): Type {
  if (!limit || limit > list.length) {
    limit = list.length;
  }
  return list[rand(limit)];
}