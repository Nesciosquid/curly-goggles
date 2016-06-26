import React from 'react';

export const SequenceBox = ({ style, value, onChange, onBlur }) => (
  <textArea
    autoFocus
    style={style}
    defaultValue={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

SequenceBox.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  style: React.PropTypes.object,
};
