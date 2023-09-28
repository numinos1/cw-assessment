import { TPhraseParams } from "./phrase.types";
import { toSlotClass, toSlotChar } from "./phrase.helpers";

export function Phrase({
  question,
  playIndex,
  status
}: TPhraseParams) {
  return (
    <div>
      <div className="phrase">
        {question.phrase.split('').map((letter, index) => (
          <div className={toSlotClass(letter, index, playIndex, status, question.answer[index])} key={index}>
            {toSlotChar(letter, status)}
          </div>
        ))}
      </div>
      {/* {question.answer && (
        <div className="phrase">
          {question.answer.split('').map((letter, index) => (
            <div className={toSlotClass(letter, index, playIndex, status, question.phrase[index])} key={index}>
              {toSlotChar(letter, status)}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

