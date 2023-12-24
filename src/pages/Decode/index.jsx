import React, { useState } from "react";
import { useForm } from "react-hook-form";

import HintList from "../../components/HintList";
import Result from "../../components/Result";
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
      <div className='description'>
        The Caesar Cipher is used for decryption. The method "moves” all the
        letters of the given cipher by the specified shift to obtain the plain
        text (the decryption shift must be equal to the encryption shift).
        <br />
        Для расшифрования используется Шифр Цезаря, который для получения
        изначального сообщения "сдвигает" все буквы шифра на указанную величину
        сдвига (сдвиг должен быть равен сдвигу, указанному при зашифровке).
      </div>

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

        {plainTextValue && <Result text={plainTextValue} />}

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default DecodePage;
