/**
 * Concat the Slot Classes
 **/
export function toSlotClass(
  letter: string,
  index: number,
  playIndex: number | undefined,
  status: string,
  answer: string
) {
  const out = ['phrase-slot'];

  if (letter === ' ') {
    out.push('phrase-slot-space');
  } 
  else {
    out.push('phrase-slot-char');

    if (status === 'answer') {
      if (answer === letter) {
        out.push('phrase-slot-right');
      }
      else {
        out.push('phrase-slot-wrong');
      }
    } 
    // TODO ( -1) hack to offset for [set freq:x] prefix
    else if (playIndex != null && index === (playIndex - 1)) {
      out.push('phrase-slot-play');
    }
  }
  return out.join(' ');
}

/**
 * Render the Slot Character
 **/
export function toSlotChar(
  letter: string,
  status: string
): string {
  if (status === 'answer') {
    return letter;
  }
  return (letter === ' ') ? ' ' : '?';
}