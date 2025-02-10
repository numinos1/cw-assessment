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
}

export const MODES: Record<string, TModeData> = {
  beginner: {
    level: 'Beginner',
    cpm: 15,
    eff: 4, // 4
    freq: "500,550,600,650,700",
    callsigns: '',
    questions: 5,
    words: 1,
    minchars: 2,
    maxchars: 3,
    answers: 5,
    timeout: 30
  },
  fundamental: {
    level: 'Fundamental',
    cpm: 25,
    eff: 6, // 6
    freq: "500,550,600,650,700",
    callsigns: '4 1x3', // four 1x3 callsigns
    questions: 5,
    words: 1,
    minchars: 2,
    maxchars: 4,
    answers: 5,
    timeout: 30
  },
  intermediate: {
    level: 'Intermediate',
    cpm: 25,
    eff: 10, // 10
    freq: "500,550,600,650,700",
    callsigns: '4 complex', // four complex callsigns
    questions: 5,
    words: 1,
    minchars: 3,
    maxchars: 4,
    answers: 6,
    timeout: 30
  },
  advanced: {
    level: 'Advanced',
    cpm: 30,
    eff: 20, // 20
    freq: "500,550,600,650,700",
    callsigns: '4 complex', // four complex callsigns
    questions: 5,
    words: 1,
    minchars: 4,
    maxchars: 5,
    answers: 7,
    timeout: 30
  }
};