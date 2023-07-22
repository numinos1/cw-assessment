/**
 * Concat the Slot Classes
 **/
export function toSlotClass(
  letter: string,
  index: number,
  playIndex: number | undefined
) {
  const out = ['phrase-slot'];

  if (letter === ' ') {
    out.push('phrase-slot-space');
  } 
  else {
    out.push('phrase-slot-char');

    if (index === playIndex) {
      out.push('phrase-slot-play');
    }
  }
  return out.join(' ');
}