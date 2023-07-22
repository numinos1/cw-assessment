import { useReducer, FormEvent } from 'React';
import { TConfigParams, TOptionMap } from './config.types';
import { initOptions, reduceOptions } from './config.reducer';

/**
 * Config Component
 **/
export function Config({
  options,
  onConfig
}: TConfigParams) {
  const [state, dispatch] = useReducer(
    reduceOptions, 
    null, 
    () => initOptions(options)
  );

  /**
   * On Input Change
   **/
  function onInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch({ 
      type: 'set-option',
      change: {
        name: event.target.name, //attributes.getNamedItem('value'), //.name.value,
        value: parseInt(event.target.value, 10) || 0
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
    
    const errors = state.filter(opt => !!opt.inputError);

    if (!errors.length) {
      onConfig(
        state.reduce<TOptionMap>((out, opt) => {
          out[opt.inputName] = opt.inputValue;
          return out;
        }, {})
      );
    }
  }

  return (
    <div className="options-form">
      <form onSubmit={onSubmit}>
        {state.map(option => (
          <div
            className={option.inputError ? 'options-input options-errors' : 'options-input'}
            key={option.inputName}
          >
            <label htmlFor="{option.inputName}">{option.inputLabel}</label>
            <input name={option.inputName} value={option.inputValue || ''} onChange={onInput} />
            <div className="option-error">{option.inputError}</div>
          </div>
        ))}
        <button type="submit" className="options-submit">Start Assessment</button>
      </form>
    </div>
  );
}
