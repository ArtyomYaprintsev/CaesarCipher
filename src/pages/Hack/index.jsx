import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Result from "../../components/Result";
import CipherInputWrapper from "../../components/CipherInputWrapper";

import { hackCipher } from "../../utils/caesarCipher";

const HackPage = () => {
  const [hacked, setHacked] = useState({
    shift: 0,
    hackedText: null,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const submitForm = (data) => {
    setHacked(hackCipher(data.cipherText));
  };

  return (
    <div className='hack-page page'>
      <div className='description'>
        The code is suitable for hacking a cipher that has been encrypted using
        the "Caesar Cipher". For hacking, "The Least Square" method and data
        from the table "Frequency of letters of the Russian alphabet" are used.
        <br />
        <br />
        Код подходит для взлома шифра, который был получен методом "Шифр
        Цезаря". Для взлома используется метод наименьших квадратов и данные из
        таблицы "Частота использования букв русского алфавита".
      </div>

      <form className='hack-form' onSubmit={handleSubmit(submitForm)}>
        <CipherInputWrapper isRuOnly register={register} errors={errors} />

        {hacked.hackedText && (
          <Result text={hacked.hackedText}>
            <span>{`Hacked cipher shift: ${hacked.shift}`}</span>
          </Result>
        )}

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default HackPage;
