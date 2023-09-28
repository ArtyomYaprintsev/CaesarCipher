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
      <div className='description'>Hack description</div>
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
