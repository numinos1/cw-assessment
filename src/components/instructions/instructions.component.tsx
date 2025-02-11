interface TInstructions {
  status: string;
  answers: number | string;
}

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

export function Instructions({ status, answers }: TInstructions) {
  return (
    <div className="instructions">
      {showInstructions(status, answers)}
    </div>
  );
}

/**
 * To Instructions
 **/
function showInstructions(status: string, answers: number | string) {
  const answerCount: string = typeof answers === 'number'
    ? NUMBERS[answers] || ''
    : answers;

  switch (status) {
    case 'config':
      return '';
    case 'countdown':
      return 'Get ready. First question starts in';
    case 'play':
      return 'Listen to the morse code characters';
    case 'guess':
      return `Choose the correct answer from the ${answerCount} options`;
    case 'answer':
      return 'Continue to the next question or quit';
    case 'results':
      return 'View results and continue';
  }
  return `STATUS: ${status}`;
}