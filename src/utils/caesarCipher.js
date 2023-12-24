import { LATIN_STRING, LETTER_STAFF, RUSSIAN_STRING } from "./caesarConsts";
import { getLetterFrequency } from "./letterFrequencies";

/**
 *
 * @param {string} text
 * @returns the given text in uppercase with replaced 'Ё' characters to 'Е'
 * and removed all non-letters.
 */
const prepareTextToShift = (text) => {
  return text
    .toUpperCase()
    .replaceAll("Ё", "$1Е")
    .replace(/[^A-ZА-Я]/g, "");
};

/**
 *
 * @param {string} letter
 * @param {number} shift
 * @returns shifted in related alphabet letter.
 */
const shiftLetter = (letter, shift) => {
  if (!LETTER_STAFF[letter]) {
    throw new Error("Invalid letter given.");
  }

  let letterAlphabet = LATIN_STRING;
  let letterShift = shift % LATIN_STRING.length;

  if (LETTER_STAFF[letter].isRussian) {
    letterAlphabet = RUSSIAN_STRING;
    letterShift = shift % RUSSIAN_STRING.length;
  }

  return letterAlphabet[
    (LETTER_STAFF[letter].index + letterShift + letterAlphabet.length) %
      letterAlphabet.length
  ];
};

/**
 *
 * @param {string} text
 * @param {number} shift
 * @returns shifted the given string on the given shift.
 */
const shiftText = (text, shift) => {
  return Array.from(text)
    .map((letter) => shiftLetter(letter, shift))
    .join("");
};

/**
 *
 * @param {string} text
 * @returns the given text separated by '-' sign each 5 characters.
 */
const formatText = (text) => {
  const formatted = text.replace(/(.{5})/g, "$1-");

  if (formatted.at(-1) === "-") {
    return formatted.slice(0, formatted.length - 1);
  }

  return formatted;
};

/**
 *
 * @param letterCounter
 * @returns formatted letter counter with alphabet related rules.
 */
const formatLetterCounter = (letterCounter) => {
  const formatted = { ...letterCounter };

  // Ё and E letters must be counted as similar characters.
  if (formatted["Ё"]) {
    formatted["Е"] = (formatted["Е"] ?? 0) + formatted["Ё"];
    delete formatted["Ё"];
  }

  // Ъ and Ь letters must be counted as similar characters.
  if (formatted["Ъ"]) {
    formatted["Ь"] = (formatted["Ь"] ?? 0) + formatted["Ъ"];
    delete formatted["Ъ"];
  }

  return formatted;
};

/**
 *
 * @param {string} text
 * @returns object of letter as key and count of times a letter appears in the
 * text as value.
 */
const countLettersInText = (text) => {
  return formatLetterCounter(
    Array.from(text).reduce((prev, cur) => {
      prev[cur] = (prev[cur] ?? 0) + 1;
      return prev;
    }, {})
  );
};

/**
 *
 * @param {string} text
 * @returns object of letter as key and letter frequencies in the given text
 * as value.
 */
const getLetterFrequenciesInText = (text) => {
  return Object.fromEntries(
    Object.entries(countLettersInText(text)).map(([letter, count]) => [
      letter,
      Math.round((count / text.length) * 1000) / 1000,
    ])
  );
};

/**
 *
 * @param cipherFrequency
 * @returns possible shift using the Least Squares
 * (https://en.wikipedia.org/wiki/Least_squares) method.
 */
const findShift = (cipherFrequency) => {
  const shifts = Array.from({ length: RUSSIAN_STRING.length }, (_, i) => i).map(
    (shift) =>
      Array.from(RUSSIAN_STRING).reduce((prev, cur) => {
        return (
          prev +
          Math.pow(
            getLetterFrequency(cur) -
              (cipherFrequency[shiftLetter(cur, shift)] ?? 0),
            2
          )
        );
      }, 0)
  );

  return shifts.indexOf(Math.min.apply(null, shifts));
};

/**
 *
 * @param {string} plainText
 * @param {number} shift
 * @returns encoded by the Caesar Cipher method text.
 */
export const encodeText = (plainText, shift = 0) => {
  return formatText(shiftText(prepareTextToShift(plainText), +shift));
};

/**
 *
 * @param {string} cipherText
 * @param {shift} shift
 * @returns decoded by the Caesar Cipher method text.
 */
export const decodeText = (cipherText, shift = 0) => {
  return formatText(shiftText(prepareTextToShift(cipherText), -+shift));
};

/**
 *
 * @param {string} cipherText
 * @returns hacked shift and hacked decoded by the Caesar Cipher method text.
 */
export const hackCipher = (cipherText) => {
  const preparedText = prepareTextToShift(cipherText);
  const shift = findShift(getLetterFrequenciesInText(preparedText));

  return {
    shift,
    hackedText: formatText(shiftText(preparedText, -1 * shift)),
  };
};
