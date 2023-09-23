import { useReducer, FormEvent } from 'react';
import { TConfigParams, TOptionMap } from './config.types';
import { initOptions, reduceOptions } from './config.reducer';

/**
 * Config Component
 **/
export function Config({
  options,
  onConfig
}: TConfigParams) {
  const [state, dispatch] = useReducer(reduceOptions, null,
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
      onConfig(
        state.reduce<TOptionMap>((out, opt) => {
          out[opt.name] = opt.value;
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
            className={option.error ? 'options-input options-errors' : 'options-input'}
            key={option.name}
          >
            <label htmlFor="{option.inputName}">{option.label}</label>
            <input name={option.name} value={option.value} onChange={onInput} />
            <div className="option-error">{option.error}</div>
          </div>
        ))}
        <button type="submit" className="a-button">Start Assessment</button>
      </form>
    </div>
  );
}
