import React, { useState } from "react";
import { useForm } from "react-hook-form";

import CipherInputWrapper from "../../components/CipherInputWrapper";
import ResultPopup from "../../components/ResultPopup";

import "../../assets/hack.scss";
import { hackCipher } from "../../utils/caesarCipher";

const HackPage = () => {
  const [plainTextValue, setPlainTextValue] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const submitForm = (data) => {
    setPlainTextValue(hackCipher(data.cipherText));
  };

  return (
    <div className='hack-page page'>
      <div className='description'>
        The code is suitable for hacking a cipher that has been encrypted using
        the "Caesar Cipher". For hacking, "The Least Square" method and data
        from the table "Frequency of letters of the Russian alphabet" are used.
        <br />
        Код подходит для взлома шифра, который был получен методом "Шифр
        Цезаря". Для взлома используется метод наименьших квадратов и данные из
        таблицы "Частота использования букв русского алфавита".
      </div>
      <form className='hack-form' onSubmit={handleSubmit(submitForm)}>
        <CipherInputWrapper isRuOnly register={register} errors={errors} />

        <input type='submit' value='Submit' disabled={!!plainTextValue} />
      </form>

      <ResultPopup
        resultValue={plainTextValue}
        onClose={plainTextValue ? () => setPlainTextValue(null) : () => {}}
      />
    </div>
  );
};

export default HackPage;
