import React, { useState } from "react";
import { useForm } from "react-hook-form";

import HintList from "../../components/HintList";
import ResultPopup from "../../components/ResultPopup";
import CipherInputWrapper from "../../components/CipherInputWrapper";

import { decodeText } from "../../utils/caesarCipher";

import "../../assets/decode.scss";

const DecodePage = () => {
  const [plainTextValue, setPlainTextValue] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const submitForm = (data) => {
    setPlainTextValue(decodeText(data.cipherText, data.decodeShift));
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

        <CipherInputWrapper register={register} errors={errors} />

        <input type='submit' value='Submit' disabled={!!plainTextValue} />
      </form>

      <ResultPopup
        resultValue={plainTextValue}
        onClose={plainTextValue ? () => setPlainTextValue(null) : () => {}}
      />
    </div>
  );
};

export default DecodePage;
