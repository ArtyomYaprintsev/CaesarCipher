import React, { useState } from "react";
import { useForm } from "react-hook-form";

import HintList from "../../components/HintList";
import ResultPopup from "../../components/ResultPopup";

import { encodeText } from "../../utils/caesarCipher";

import "../../assets/encode.scss";

const EncodePage = () => {
  const [cipherValue, setCipherValue] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const submitForm = (data) => {
    setCipherValue(encodeText(data.plainText, data.encodeShift));
  };

  return (
    <div className='encode-page page'>
      <div className='description'>Encode description</div>
      <form className='encode-form' onSubmit={handleSubmit(submitForm)}>
        <div className='input-wrapper'>
          <label htmlFor='encode-shift' className='required'>
            Set encode shift:
          </label>
          <div className='shift__wrapper'>
            <span className='shift__hint'>m = </span>
            <input
              type='number'
              step='1'
              id='encode-shift'
              placeholder='0'
              {...register("encodeShift", {
                required: "The encode shift value is required.",
              })}
            />
          </div>

          <HintList hints={["The encode shift must be an integer number."]} />

          {errors.encodeShift && (
            <span role='alert'>{errors.encodeShift.message}</span>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='plain-text' className='required'>
            Plain text:
          </label>
          <textarea
            id='plain-text'
            {...register("plainText", {
              required: "The plain text is required.",
              validate: {
                notContainNumbers: (val) => {
                  const isContainNumbers = /\d/.test(val);

                  if (isContainNumbers) {
                    return "The plain text can not to contain numbers.";
                  }

                  return !isContainNumbers;
                },
              },
            })}
          />

          <HintList
            hints={[
              "Use only letters of the Russian and Latin alphabets, other letters will be removed.",
              "Write numbers using words (for example, '1' - 'one').",
              "All non-letter characters will be removed.",
              "'Ё' letter will be replaced by 'Е'.",
              "Result will be returned in upper case.",
            ]}
          />

          {errors.plainText && (
            <span role='alert'>{errors.plainText.message}</span>
          )}
        </div>

        <input type='submit' value='Submit' disabled={!!cipherValue} />
      </form>

      <ResultPopup
        resultValue={cipherValue}
        onClose={cipherValue ? () => setCipherValue(null) : () => {}}
      />
    </div>
  );
};

export default EncodePage;
