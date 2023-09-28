import React from "react";
import PropTypes from "prop-types";

import List from "./List";

const HintList = ({ hints = [] }) => {
  return (
    <List
      listClassName={"hint-list"}
      data={hints}
      renderItem={(hint) => <span className='hint'>{hint}</span>}
    />
  );
};

HintList.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HintList;
