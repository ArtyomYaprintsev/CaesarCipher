import { LETTER_STAFF } from "./caesarConsts";

const RUSSIAN_LETTER_FREQUENCY = {
  О: 0.09,
  Е: 0.072,
  А: 0.062,
  И: 0.062,
  Т: 0.053,
  Н: 0.053,
  С: 0.045,
  Р: 0.04,
  В: 0.038,
  Л: 0.035,
  К: 0.028,
  М: 0.026,
  Д: 0.025,
  П: 0.023,
  У: 0.021,
  Я: 0.018,
  Ы: 0.016,
  З: 0.016,
  Ь: 0.014,
  Б: 0.014,
  Г: 0.013,
  Ч: 0.012,
  Й: 0.01,
  Х: 0.009,
  Ж: 0.007,
  Ю: 0.006,
  Ш: 0.006,
  Ц: 0.003,
  Щ: 0.003,
  Э: 0.003,
  Ф: 0.002,
};

// https://en.wikipedia.org/wiki/Letter_frequency
const LATIN_LETTER_FREQUENCY = {
  E: 0.127,
  T: 0.91,
  A: 0.82,
  O: 0.75,
  I: 0.7,
  N: 0.67,
  S: 0.63,
  H: 0.61,
  R: 0.6,
  D: 0.43,
  L: 0.4,
  C: 0.28,
  U: 0.28,
  M: 0.24,
  W: 0.24,
  F: 0.22,
  G: 0.2,
  Y: 0.2,
  P: 0.19,
  B: 0.15,
  V: 0.098,
  K: 0.077,
  X: 0.015,
  J: 0.015,
  Q: 0.0095,
  Z: 0.0074,
};

/**
 *
 * @param {string} letter
 * @returns letter frequency from the related letter frequencies table.
 */
export const getLetterFrequency = (letter) => {
  if (!LETTER_STAFF[letter]) {
    throw new Error("Invalid letter given.");
  }

  if (LETTER_STAFF[letter].isLatin) {
    return LATIN_LETTER_FREQUENCY[letter];
  }

  if (RUSSIAN_LETTER_FREQUENCY[letter]) {
    return RUSSIAN_LETTER_FREQUENCY[letter];
  }

  //   Ъ and Ь letters has been counted as similar characters.
  if (letter === "Ъ") {
    return RUSSIAN_LETTER_FREQUENCY["Ь"];
  }

  //   Ё and E letters has been counted as similar characters.
  if (letter === "Ё") {
    return RUSSIAN_LETTER_FREQUENCY["Е"];
  }
};
