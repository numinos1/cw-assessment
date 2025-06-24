interface TInstructions {
  status: string;
  answers: number | string;
  answer: string;
}

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const WORDS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

export function Instructions({ status, answers, answer }: TInstructions) {
  return (
    <div className="instructions">
      {showInstructions(status, answers, answer)}
    </div>
  );
}

/**
 * To Instructions
 **/
function showInstructions(status: string, answers: number | string, answer: string) {
  switch (status) {
    case 'config':
      return '';
    case 'countdown':
      return 'Get ready. First question starts in';
    case 'play':
      return 'Listen to the morse code characters';
    case 'guess':
      const answerCount: string = typeof answers === 'number'
        ? NUMBERS[answers] || ''
        : answers;
      const wordIndex = answer
        ? answer.split(' ').filter(Boolean).length
        : 0;
      return `Choose the ${WORDS[wordIndex]} word from the ${answerCount} options`;
    case 'answer':
      return 'Continue to the next question or quit';
    case 'results':
      return 'View results and continue';
  }
  return `STATUS: ${status}`;
}