import { scrambleList } from './values';
import { SOUND_MAP } from '../data/sound-map';

type TWordMatch = Array<[string, number]>;
type TCharMap = Map<string, number>;

/**
 * Vocabulary Class
 **/
export class Vocabulary {
  words: string[];

  /**
   * Constructor
   **/
  constructor(
    words: string,
    size: number
  ) {
    this.words = words
      .replace(/\s/g, '')
      .split(',')
      .map(word => word.toLowerCase())
      .filter(word => 
        word.length <= size
      );
  }
  
  /**
   * Get a Random Word
   **/
  getRandomWords(): string[] {
    return scrambleList(this.words);
  }

  /**
   * Get words of specific size
   **/
  getSizedWords(
    size: number
  ): string[] {
    return this.words.filter(word => 
      word.length <= size
    );
  }

  /**
   * Get words that sound like a word
   **/
  getSimilarWords(
    word: string
  ): string[] {
    const letters = word.toUpperCase().split('');
    const suffix = this._toMap(letters.pop(), 1028);
    const prefix = this._toMap(letters.shift(), 256);
    const body = this._toBodyMap(letters, 16);
    const length = word.length;

    return this.words.reduce<TWordMatch>((out, match) => 
      {
        if (match.length === length) {
          const parts = match.toUpperCase().split('');
          const end = parts.length - 1;
          let value = 0;

          value += (suffix.get(parts[end]) || 0);
          value += (prefix.get(parts[0]) || 0);

          for (let i = 1; i < end; ++i) {
            value += (body.get(parts[i]) || 0);
          }
          if (value) {
            out.push([match, value]);
          }
        }
        return out;
      }, 
      []
    )
    .sort((a, b) => b[1] - a[1])
    .map(val => val[0])
  }

  /**
   * PRIVATE
   * Create Head & Tail Sound Map
   **/
  _toMap(
    char: string | undefined,
    value: number
  ): TCharMap {
    const charMap = new Map<string, number>();

    if (char) {
      const soundChars = SOUND_MAP[char] || [];
      const halfValue = Math.floor(value / 2);

      charMap.set(char, value);
      soundChars.forEach((char: string) => {
        charMap.set(char, halfValue)
      });
    }
    return charMap;
  }

  /**
   * PRIVATE
   * Create Body Sound Map
   **/
  _toBodyMap(
    chars: string[],
    value: number
  ): TCharMap {
    const charMap = new Map();
    const soundVal = Math.floor(value / 8);

    chars.forEach(char => {
      const soundChars = SOUND_MAP[char] || [];

      charMap.set(char, value);
      soundChars?.forEach(char => {
        if (charMap.get(char) !== value) {
          charMap.set(char, soundVal);
        }
      });
    });

    return charMap;
  }
}
