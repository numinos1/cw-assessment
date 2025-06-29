import { useEffect, useReducer } from 'react';
import { initAssessment, assessmentReducer } from './assessment.reducer';
import { Guess } from '../guess/guess.component';
import { Config } from '../config/config.component';
import { TOptionMap } from '../config/config.types';
import { Results } from '../results/results.component';
import { Phrase } from '../phrase/phrase.component';
import { Continue } from '../continue/continue.component';
//import { Speech } from '../speech/speech.component';
import { useKeyboard } from '../../effects/use-keybboard.effect';
import player from '../../services/player.service';
import { Countdown } from '../countdown/countdown.component';
import { Instructions } from '../instructions/instructions.component';

/**
 * Assessment Component
 **/
export function Assessment() {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    null,
    initAssessment
  );

  function onCountdown(options: TOptionMap) {
    dispatch({ type: 'on-countdown', options });
  }

  function onStart() {
    dispatch({ type: 'on-start' });
  }

  function onGuess(answer: string) {
    dispatch({ type: 'on-guess', answer });
  }

  function onRepeat() {
    dispatch({ type: 'on-repeat' });
  }

  function onAnswer() {
    dispatch({ type: 'on-answer' });
  }

  function onClose() {
    const options = state.options as TOptionMap;

    if (options.returnurl) {
      window.location.href = `${options.returnurl}`;
    }
    else {
      window.close();
    }
  }

  function onMode(mode: string) {
    dispatch({ type: 'on-mode', mode });
  }

  // --------------------------------------------------
  useKeyboard((event: KeyboardEvent) => {
    dispatch({ type: 'press-key', event })
  });

  // --------------------------------------------------
  useEffect(() => {
    player.stop();

    return player.on('*', (type: string, event: any) => {
      switch (type) {
        case 'char:start': 
        case 'char:end':
        case 'play:stop':
          dispatch({ type, event });
      }
    });
  }, [dispatch]);

  return (
    <div className="assessment">
      <Instructions 
        status={state.status}
        answers={state.options.answers}
        answer={state.questions[state.index]?.answer}
      />

      {state.status !== 'config'
        && state.status !== 'results'
        && state.status !== 'countdown'
        && (
        <Phrase
          status={state.status}
          question={state.questions[state.index]}
          playIndex={state.playIndex}
        />
      )}
      {state.status === 'config' && (
        <Config
          options={state.options}
          onCountdown={onCountdown}
        />
      )}
      <div className="assessment-body">
        {state.status === 'countdown' && (
          <Countdown
            onStart={onStart}
          />
        )}
        {/* {state.status === 'guess' && (
          <Speech question={state.questions[state.index]} onGuess={onGuess} />
        )} */}
        {(state.status === 'guess'
          || state.status === 'answer')
          && (
          <Guess
            status={state.status}
            question={state.questions[state.index]}
            onGuess={onGuess}
            options={state.options}
          />
        )}
        {state.status === 'answer' && (
          <Continue
            questions={state.questions}
            onAnswer={onAnswer}
            onClose={onClose}
            index={state.index}
          />
        )}
        {state.status === 'results' && (
          <Results
            assessment={state}
            onRepeat={onRepeat}
            onMode={onMode}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}