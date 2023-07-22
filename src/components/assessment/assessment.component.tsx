import { useEffect, useReducer } from 'react';
import { initAssessment, assessmentReducer } from './assessment.reducer';
import { Guess } from '../guess/guess.component';
import { Config } from '../config/config.component';
import { TOptionMap } from '../config/config.types';
import { Play } from '../play/play.component';
import { Results } from '../results/results.component';
import { Phrase } from '../phrase/phrase.component';
import { useKeyboard } from '../../effects/use-keybboard.effect';
import player from '../../services/player.service';

/**
 * Assessment Component
 **/
export function Assessment() {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    null,
    initAssessment
  );
  
  function onConfig(options: TOptionMap) {
    dispatch({ type: 'on-config', options });
  }

  function onGuess(answer: string) {
    dispatch({ type: 'on-guess', answer });
  }

  // function onNext() {
  //   dispatch({ type: 'on-next' });
  // }

  function onRepeat() {
    dispatch({ type: 'on-repeat' });
  }

  // --------------------------------------------------
  useKeyboard((event: KeyboardEvent) => {
    dispatch({ type: 'press-key', event })
  });

  // --------------------------------------------------
  useEffect(() => {
    player.stop();

    return player.on('*', (type: string, event: any) => {
      console.log(type, event);
      switch (type) {
        case 'char:start':
          return dispatch({
            type: 'start-play-char',
            playIndex: event.index
          });
        case 'char:end':
          return dispatch({
            type: 'end-play-char'
          });
        case 'play:stop':
          return dispatch({
            type: 'end-play'
          });
      }
    });
  }, [dispatch]);

  console.log('STATUS', state.status);

  return (
    <div className="assessment">
      {state.status !== 'config' && state.status !== 'results' && (
        <Phrase question={state.questions[state.index]} playIndex={state.playIndex} />
      )}
      {state.status === 'config' && (
        <Config options={state.options} onConfig={onConfig} />
      )}
      <div className="assessment-body">
        {state.status === 'play' && (
          <Play />
        )}
        {state.status === 'guess' && (
          <Guess question={state.questions[state.index]} onGuess={onGuess} />
        )}
        {/* {state.status === 'next' && (
          <button className="question-next" onClick={onNext}>Next Question</button>
        )} */}
        {state.status === 'results' && (
          <Results questions={state.questions} onRepeat={onRepeat} />
        )}
      </div>
    </div>
  );
}