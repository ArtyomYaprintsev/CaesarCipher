import React from "react";
import PropTypes from "prop-types";

// import "../assets/scss/popup.scss";

const Popup = ({ closePopup, popupClassName = "", body = <></> }) => {
  return (
    <div className='popup-wrapper'>
      <div className='close-popup-wrapper' onClick={closePopup}></div>
      <div className={`popup-container container ${popupClassName}`}>
        {body && <div className='popup-body'>{body}</div>}
        <button className='close-popup' onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  popupClassName: PropTypes.string,
  body: PropTypes.element,
};

export default Popup;
