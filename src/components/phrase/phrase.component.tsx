import { TPhraseParams } from "./phrase.types";
import { toSlotClass } from "./phrase.helpers";

export function Phrase({
  question,
  playIndex
}: TPhraseParams) {
  return (
    <div className="phrase">
      {question.phrase.split('').map((letter, index) => (
        <div className={toSlotClass(letter, index, playIndex)} key={index}>
          {letter === ' ' ? ' ' : '?'}
        </div>
      ))}
    </div>
  );
}
