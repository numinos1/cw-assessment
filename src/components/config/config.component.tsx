import { useReducer, FormEvent } from 'react';
import { TConfigParams, TOptionMap } from './config.types';
import { initOptions, reduceOptions } from './config.reducer';

/**
 * Config Component
 **/
export function Config({
  options,
  onStart
}: TConfigParams) {
  const [state, dispatch] = useReducer(reduceOptions, null,
    () => initOptions(options)
  );
  // disable option editing if level is set
  const isEnabled = !state.filter(o => o.name === 'level')[0].value;
  const values = state.reduce((obj, val) => {
    obj[val.name] = val.value;
    return obj;
  }, {} as Record<string, any>);

  /**
   * On Input Change
   **/
  function onInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch({ 
      type: 'set-option',
      change: {
        name: event.target.name,
        value: event.target.value
      }
    });
  }

  /**
   * On Form Submit
   **/
  function onSubmit(
    event: FormEvent
  ) {
    event.preventDefault();
    
    const errors = state.filter(opt => !!opt.error);

    if (!errors.length) {
      const values = state.reduce<TOptionMap>((out, opt) => {
        out[opt.name] = opt.type(opt.value).value;
        return out;
      }, {});
      onStart(values);
    }
  }

  return (
    <div className="options-form">
      <form onSubmit={onSubmit}>
        {isEnabled
          ? state.filter(o => !o.isHidden).map(option => (
            <div
              className={option.error ? 'options-input options-errors' : 'options-input'}
              key={option.name}
            >
              <label htmlFor="{option.inputName}">{option.label}</label>
              <input name={option.name} value={option.value} onChange={onInput} />
              <div className="option-error">{option.error}</div>
            </div>
          ))
          : (
            <div>
              <p>
                The assessment will be a series of questions and multiple-choice answers.
                Each question will consist of {values.words} word{values.words === 1 ? '' : 's'} containing {values.characters} characters.
                The program will send you the question in Morse code and display five possible answers.
                You then select the answer based on what you've heard. 
                This is what it will look like:
              </p>   
              <img src="/images/question-screenshot.png" width="100%" />
              <p>
                After you have selected an answer, the program will then display what was sent and what you selected, indicating which
                word{values.words === 1 ? '' : 's'} you missed, if any.
              </p>
              <p>
                You can then proceed to the next question.
              </p>
              <p>
                Your score will be the percentage of words copied correctly.
              </p>
            </div>
          )
        }
        <button type="submit" className="a-button">Start Assessment</button>
      </form>
    </div>
  );
}
