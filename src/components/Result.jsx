import React from "react";

const Result = ({ text, children = <></> }) => {
  return (
    <div className='result-wrapper'>
      <h3>Result:</h3>
      <div className='text'>{text}</div>
      {children}
    </div>
  );
};

export default Result;
