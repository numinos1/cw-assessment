export interface TModeData {
  level: string;
  cpm: number;
  eff: number;
  freq: string;
  questions: number;
  words: number;
  characters: number;
}

export const MODES: Record<string, TModeData> = {
  beginner: {
    level: 'Beginner',
    cpm: 15,
    eff: 4,
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 2
  },
  fundamental: {
    level: 'Fundamental',
    cpm: 25,
    eff: 6,
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 2
  },
  intermediate: {
    level: 'Intermediate',
    cpm: 25,
    eff: 10,
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 3
  },
  advanced: {
    level: 'Advanced',
    cpm: 25,
    eff: 20,
    freq: "500,550,600,650,700",
    questions: 5,
    words: 2,
    characters: 4
  }
};