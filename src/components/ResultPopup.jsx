import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const ResultPopup = ({
  action = "",
  resultValue = null,
  onClose = () => {},
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (resultValue) setIsOpened(true);
  }, [resultValue]);

  useEffect(() => {
    if (!isOpened) {
      onClose();
    }
  }, [isOpened]);

  useEffect(() => {
    let timeoutId;

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  const copyResult = (text) => {
    if (!navigator.clipboard) {
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => setIsCopied(true))
      .catch((err) => console.error("Async: Could not copy text: ", err));
  };

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
          <div className='result__wrapper'>
            <div className='result__header'>
              <span>Result</span>
              {resultValue && navigator.clipboard && (
                <button
                  className={`copy-btn${isCopied ? " copied" : ""}`}
                  type='button'
                  onClick={() => copyResult(resultValue)}
                >
                  Copy
                </button>
              )}
            </div>

            {resultValue}
          </div>
        </>
      }
    />
  );
};

export default ResultPopup;
