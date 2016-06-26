import React from 'react';

export const HighlightedSequence = ({ highlightedStrings, onFocus}) => {
  const spans = [];
  highlightedStrings.forEach((subString, index) => {
    let className = 'span-cloud ';
    if (subString.highlight === 'forward') {
      className += 'highlight-forward';
    }

    spans.push(
      <div key={index} className={className}>{subString.seq}</div>
    );
  });
  return (
    <div className="cloud-container" onFocus={onFocus} onClick={onFocus}>
      {spans}
    </div>
  );
};

HighlightedSequence.propTypes = {
  highlightedStrings: React.PropTypes.array,
  onFocus: React.PropTypes.func,
};
