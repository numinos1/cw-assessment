export interface TModeData {
  level: string;
  cpm: number;
  eff: number;
  freq: string;
  questions: number;
  words: number;
  characters: number;
  answers: number;
}

export const MODES: Record<string, TModeData> = {
  beginner: {
    level: 'Beginner',
    cpm: 15,
    eff: 4, // 4
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 2,
    answers: 5
  },
  fundamental: {
    level: 'Fundamental',
    cpm: 25,
    eff: 6, // 6
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 3,
    answers: 5
  },
  intermediate: {
    level: 'Intermediate',
    cpm: 25,
    eff: 10, // 10
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 3,
    answers: 6
  },
  advanced: {
    level: 'Advanced',
    cpm: 30,
    eff: 20, // 20
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 4,
    answers: 7
  }
};