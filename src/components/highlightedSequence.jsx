import React from 'react';

export const HighlightedSequence = ({ highlightedStrings, onFocus }) => {
  const spans = [];
  highlightedStrings.forEach((highString, index) => {
    let className = 'span-cloud ';
    if (highString.forward && highString.reverse) {
      className += 'highlight-both';
    } else if (highString.forward && !highString.reverse) {
      className += 'highlight-forward';
    } else if (!highString.forward && highString.reverse) {
      className += 'highlight-reverse';
    }

    spans.push(
      <div key={index} className={className}>{highString.seq}</div>
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
