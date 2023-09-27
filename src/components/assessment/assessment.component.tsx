import { useEffect, useReducer } from 'react';
import { initAssessment, assessmentReducer } from './assessment.reducer';
import { Guess } from '../guess/guess.component';
import { Config } from '../config/config.component';
import { TOptionMap } from '../config/config.types';
import { Play } from '../play/play.component';
import { Results } from '../results/results.component';
import { Phrase } from '../phrase/phrase.component';
import { Answer } from '../answer/answer.component';
//import { Speech } from '../speech/speech.component';
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
    console.log('guess', answer);
    dispatch({ type: 'on-guess', answer });
  }

  function onRepeat() {
    dispatch({ type: 'on-repeat' });
  }

  function onAnswer() {
    dispatch({ type: 'on-answer' });
  }

  function onClose() {
    window.close();
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
      {state.status !== 'config' && state.status !== 'results' && (
        <Phrase
          question={state.questions[state.index]}
          playIndex={state.playIndex}
          status={state.status}
        />
      )}
      {state.status === 'config' && (
        <Config
          options={state.options}
          onConfig={onConfig}
        />
      )}
      <div className="assessment-body">
        {state.status === 'play' && (
          <Play />
        )}
        {/* {state.status === 'guess' && (
          <Speech question={state.questions[state.index]} onGuess={onGuess} />
        )} */}
        {state.status === 'guess' && (
          <Guess
            question={state.questions[state.index]}
            onGuess={onGuess}
          />
        )}
        {state.status === 'answer' && (
          <Answer
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