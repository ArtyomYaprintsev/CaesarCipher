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
          pattern: {
            value: !isRuOnly
              ? /^(?:(?:[A-Za-zА-Яа-яЁё]{5})[-\s])*[A-Za-zА-Яа-яЁё]{1,5}\s?$/gm
              : /^(?:(?:[А-Яа-яЁё]{5})[-\s])*[А-Яа-яЁё]{1,5}\s?$/gm,
            message: "Invalid cipher value, check hints.",
          },
        })}
      />

      <HintList
        hints={[
          "Cipher text must be in groups of 5 characters (excluding the last group), separated by a '-' sign or a space.",
          `Cipher can only contains letters of the ${
            isRuOnly ? "Russian alphabet" : "Russian and Latin alphabets"
          }.`,
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
