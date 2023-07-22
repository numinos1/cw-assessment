// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#events
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isNoSpeech = typeof SpeechRecognition === "undefined";

// const recognition = useMemo(() => {
//   const recognition = SpeechRecognition 
//     ? new SpeechRecognition() 
//     : null;

//   //recognition.lang = "en-US";
//   recognition.continuous = false;
//   recognition.interimResults = true;
//   recognition.maxAlternatives = 1;

//   // recognition.addEventListener('error', event => {
//   //   console.log('ERROR', event);
//   // });

//   // recognition.addEventListener('nomatch', event => {
//   //   console.log('NO_MATCH', event);
//   // });

//   // recognition.addEventListener('soundstart', event => {
//   //   console.log('SOUND_START', event);
//   // });

//   // recognition.addEventListener('soundend', event => {
//   //   console.log('SOUND_END', event);
//   // });

//   // recognition.addEventListener('speechstart', event => {
//   //   console.log('SPEECH_START', event);
//   // });

//   // recognition.addEventListener('speechend', event => {
//   //   console.log('SPEECH_END', event);
//   // });

//   recognition.addEventListener('audioend', event => {
//     console.log('AUDIO_END', event);
//     setState(state => ({
//       ...state,
//       programs: state.programs.map(entry => ({
//         ...entry,
//         status: state.selected === entry.id
//           ? 'done'
//           : entry.status
//       }))
//     }));
//     recognition.stop();
//   });

//   recognition.addEventListener('start', event => {
//     console.log('START', event);
//     setState(state => ({
//       ...state,
//       programs: state.programs.map(entry => ({
//         ...entry,
//         status: state.selected === entry.id
//           ? 'recording'
//           : entry.status
//       }))
//     }));
//   });

//   // recognition.addEventListener('end', event => {
//   //   console.log('END', event);
//   // });

//   recognition.addEventListener("result", event => {
//     console.log('RESULT', event);

//     const text = [];

//     for (const res of event.results) {
//       text.push(res[0].transcript);
//     }
//     const guess = text.join(' ');

//     setState(state => ({
//       ...state,
//       programs: state.programs.map(entry => ({
//         ...entry,
//         guess: state.selected === entry.id
//           ? guess
//           : entry.guess,
//         score: state.selected === entry.id
//           ? toScore(entry.text, guess)
//           : entry.score
//       }))
//     }));
//   });
//   return recognition;
// }, [setState]);
