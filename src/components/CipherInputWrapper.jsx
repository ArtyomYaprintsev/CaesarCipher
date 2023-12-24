import React from "react";

import HintList from "./HintList";

const CipherInputWrapper = ({ register, errors, isRuOnly }) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor='cipher-text' className='required'>
        Cipher text:
      </label>
      <textarea
        id='cipher-text'
        {...register("cipherText", {
          required: "The cipher text is required.",
          validate: {
            checkNotAllowedCharacters: (value) => {
              if (/[^A-ZА-Я-\s]/.test(value)) {
                return "Cipher can to contain only russian or latin characters in upper case, a `-` sign or a space";
              }
            },
            checkOnlyRussianLetters: (value) => {
              const isContainLatinCharacters = /[a-z]/i.test(value);

              if (isRuOnly && isContainLatinCharacters) {
                return "Cipher can not to contain latin characters";
              }
            },
          },
        })}
      />

      <HintList
        hints={[
          "Cipher text must be in groups of n characters (excluding the last group), separated by a '-' sign or a space.",
          "Letters must be used in upper case",
          "Result will be returned in upper case.",
        ]}
      />

      {errors.cipherText && (
        <span role='alert'>{errors.cipherText.message}</span>
      )}
    </div>
  );
};

export default CipherInputWrapper;
