import { useState, useEffect, useRef } from 'react';
import { TSpeechParams } from './speech.types';

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#events
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function toWord(event: any): string {
  const text = [];

  for (const res of event.results) {
    text.push(res[0].transcript);
  }
  return text.join(' ')
    .replace(/\s+/, ' ')
    .toLowerCase()
    .trim();
}

const INIT_STATE = {
  status: 'ready',
  result: ''
};

export function Speech({
  onGuess
}: TSpeechParams) {
  const [{ status, result }, setState] = useState(INIT_STATE);
  const ref = useRef<any>(null);

  function onListen() {
    ref.current.start();
    setState({
      status: 'listen',
      result: ''
    });
  }

  useEffect(() => {
    if (SpeechRecognition && !ref.current) {
      const speech = new SpeechRecognition();
      let result = '';

      //speech.lang = "en-US";
      speech.continuous = false;
      speech.interimResults = true;
      speech.maxAlternatives = 1;

      function onEnd(event: any): void {
        console.log('AUDIO_END', result, event);
        onGuess(result);
      }
      function onStart(event: any): void {
        console.log('START', event);
      }
      function onResult(event: any): void {
        result = toWord(event);
        console.log('RESULT', result);
        setState({
          status: 'listen',
          result: result
        });
      }
      speech.addEventListener('audioend', onEnd);
      speech.addEventListener('start', onStart);
      speech.addEventListener("result", onResult);

      ref.current = speech;

      return () => {
        speech.removeEventListener('audioend', onEnd);
        speech.removeEventListener('start', onStart);
        speech.removeEventListener("result", onResult);
      }
    }
  }, [onGuess, ref, setState]);

  if (!SpeechRecognition) {
    return (
      <div>Speech Not Supported</div>
    ); 
  }

  return (
    <div className="speech">
      {status === 'listen' && (
        <div className="speech-result">
          Listening: {result}
        </div>
      )}
      {status === 'ready' && (
        <button
          className="a-button"
          onClick={onListen}
        >
          Speak Answer
        </button>
      )}
    </div>
  );
}