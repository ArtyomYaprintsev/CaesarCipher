const LATIN_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const RUSSIAN_STRING = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

const LETTER_STAFF = {
  ...Object.fromEntries(
    Array.from(LATIN_STRING).map((letter, index) => [
      letter,
      { isLatin: true, isRussian: false, index },
    ])
  ),
  ...Object.fromEntries(
    Array.from(RUSSIAN_STRING).map((letter, index) => [
      letter,
      { isLatin: false, isRussian: true, index },
    ])
  ),
};

const prepareTextToShift = (text) => {
  return text
    .toUpperCase()
    .replaceAll("Ё", "$1E")
    .replace(/[^A-ZА-Я]/g, "");
};

const shiftLetter = (letter, latinShift, russianShift) => {
  if (!LETTER_STAFF[letter]) {
    throw new Error("Invalid letter given.");
  }

  if (LETTER_STAFF[letter].isRussian) {
    return RUSSIAN_STRING[LETTER_STAFF[letter].index + russianShift];
  }

  return LATIN_STRING[LETTER_STAFF[letter].index + latinShift];
};

const shiftText = (text, shift) => {
  const latinShift = shift % LATIN_STRING.length;
  const russianShift = shift % RUSSIAN_STRING.length;

  return Array.from(text)
    .map((letter) => shiftLetter(letter, latinShift, russianShift))
    .join("");
};

const formatShiftedText = (text) => {
  const formatted = text.replace(/(.{5})/g, "$1-");

  if (formatted.at(-1) === "-") {
    return formatted.slice(0, formatted.length - 1);
  }

  return formatted;
};

export const encodeText = (plainText, shift = 0) => {
  return formatShiftedText(shiftText(prepareTextToShift(plainText), +shift));
};

export const decodeText = (cipherText, shift = 0) => {
  return formatShiftedText(shiftText(prepareTextToShift(cipherText), -+shift));
};
