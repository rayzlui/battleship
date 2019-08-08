import React from 'react';
import PropTypes from 'prop-types';

export function TogglePlacement(props) {
  const { isVertical, flipDirection } = props;
  let buttonDescrption;
  if (isVertical === true) {
    buttonDescrption = 'Horizontalize Placement';
  } else {
    buttonDescrption = 'Verticalize Placement';
  }
  return (
    <button
      className="vertical-button"
      onClick={() => flipDirection(!isVertical)}
    >
      {buttonDescrption}
    </button>
  );
}

TogglePlacement.propTypes = {
  isVertical: PropTypes.bool,
  flipDirection: PropTypes.func,
};
