import { TPhraseParams } from "./phrase.types";
import { toSlots } from "./phrase.helpers";

/**
 * Phrase Component
 */
export function Phrase(phraseParams: TPhraseParams) {
  const slots = toSlots(phraseParams);

  return (
    <div className="phrase">
      {slots.map((slot, index) => (
        <div className={slot.style} key={index}>
          {slot.letter}
        </div>
      ))}
    </div>
  );
}

