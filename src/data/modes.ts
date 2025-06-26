export interface TModeData {
  level: string;
  cpm: number;
  eff: number;
  freq: string;
  callsigns: string;
  questions: number;
  words: number;
  minchars: number;
  maxchars: number;
  answers: number;
  timeout: number;
  vocab: string;
}

export const MODES: Record<string, TModeData> = {
  beginner: {
    level: 'Beginner',
    cpm: 18,
    eff: 6, // 4
    freq: "450,550,600,700",
    callsigns: '',
    questions: 5,
    words: 1,
    minchars: 2,
    maxchars: 3,
    answers: 5,
    timeout: 30,
    vocab: 'threek'
  },
  fundamental: {
    level: 'Fundamental',
    cpm: 18,
    eff: 6, // 6
    freq: "450,550,600,700",
    callsigns: '', //'4 1x3', // four 1x3 callsigns
    questions: 5,
    words: 1,
    minchars: 2,
    maxchars: 3,
    answers: 5,
    timeout: 30,
    vocab: 'threek'
  },
  intermediate: {
    level: 'Intermediate',
    cpm: 25,
    eff: 10, // 10
    freq: "450,550,600,700",
    callsigns: '1 complex', //'4 complex', // four complex callsigns
    questions: 7,
    words: 2,
    minchars: 3,
    maxchars: 5,
    answers: 5,
    timeout: 20,
    vocab: 'threek'
  },
  advanced: {
    level: 'Advanced',
    cpm: 25,
    eff: 18, // 20
    freq: "450,550,600,700",
    callsigns: '1 complex', // four complex callsigns
    questions: 7,
    words: 2,
    minchars: 3,
    maxchars: 5,
    answers: 7,
    timeout: 20,
    vocab: 'threek'
  }
};