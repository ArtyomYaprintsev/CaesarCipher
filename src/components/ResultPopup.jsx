import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const ResultPopup = ({
  action = "",
  resultValue = null,
  onClose = () => {},
}) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (resultValue) setIsOpened(true);
  }, [resultValue]);

  useEffect(() => {
    if (!isOpened) {
      onClose();
    }
  }, [isOpened]);

  if (!isOpened) {
    return <></>;
  }

  return (
    <Popup
      closePopup={() => setIsOpened(false)}
      popupClassName='action-result-popup'
      body={
        <>
          <div className='action-header'>Action header</div>
          <div className='result__wrapper'>{resultValue}</div>
        </>
      }
    />
  );
};

export default ResultPopup;
