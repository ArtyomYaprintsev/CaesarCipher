export const LATIN_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const RUSSIAN_STRING = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

export const LETTER_STAFF = {
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
