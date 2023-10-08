interface TInstructions {
  status: string;
}

export function Instructions({ status }: TInstructions) {
  return (
    <div className="instructions">
      {showInstructions(status)}
    </div>
  );
}

/**
 * To Instructions
 **/
function showInstructions(status: string) {
  switch (status) {
    case 'config':
      return '';
    case 'countdown':
      return 'Get ready. First question starts in';
    case 'play':
      return 'Listen to the morse code characters';
    case 'guess':
      return 'Choose the correct answer from the five options';
    case 'answer':
      return 'Continue to the next question or quit';
    case 'results':
      return 'View results and continue';
  }
  return `STATUS: ${status}`;
}