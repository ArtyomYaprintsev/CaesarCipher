import React, { useState } from "react";
import { useForm } from "react-hook-form";

import HintList from "../../components/HintList";
import ResultPopup from "../../components/ResultPopup";

import "../../assets/decode.scss";
import { decodeText } from "../../utils/caesarCipher";

const DecodePage = () => {
  const [plainTextValue, setPlainTextValue] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const submitForm = (data) => {
    setPlainTextValue(decodeText(data.cipherText, data.encodeShift));
  };

  return (
    <div className='decode-page page'>
      <div className='description'>Decode description</div>
      <form className='decode-form' onSubmit={handleSubmit(submitForm)}>
        <div className='input-wrapper'>
          <label htmlFor='decode-shift' className='required'>
            Set decode shift:
          </label>
          <div className='shift__wrapper'>
            <span className='shift__hint'>m = </span>
            <input
              type='number'
              step='1'
              id='decode-shift'
              placeholder='0'
              {...register("decodeShift", {
                required: "The decode shift value is required.",
              })}
            />
          </div>

          <HintList
            hints={[
              "The decode shift must be an integer number.",
              "Decode shift must be equal to the used encode shift.",
            ]}
          />

          {errors.decodeShift && (
            <span role='alert'>{errors.decodeShift.message}</span>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='cipher-text' className='required'>
            Cipher text:
          </label>
          <textarea
            id='cipher-text'
            {...register("cipherText", {
              required: "The cipher text is required.",
              pattern: {
                value:
                  /^(?:(?:[A-Za-zА-Яа-яЁё]{5})[-\s])+[A-Za-zА-Яа-яЁё]{1,5}\s?$/gm,
                message: "Invalid cipher value, check hints.",
              },
            })}
          />

          <HintList
            hints={[
              "Cipher text must be in groups of 5 characters (excluding the last group), separated by a '-' sign or a space.",
              "Cipher can only contains letters og the Russian and Latin alphabets.",
              "Result will be returned in upper case.",
            ]}
          />

          {errors.cipherText && (
            <span role='alert'>{errors.cipherText.message}</span>
          )}
        </div>

        <input type='submit' value='Submit' disabled={plainTextValue} />
      </form>

      <ResultPopup
        resultValue={plainTextValue}
        onClose={plainTextValue ? () => setPlainTextValue(null) : () => {}}
      />
    </div>
  );
};

export default DecodePage;
