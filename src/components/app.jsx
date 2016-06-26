import React from 'react';
import { OligoPane } from './oligoPane.jsx';
import { SequencePane } from './sequencePane.jsx';
import { ResultsPane } from './resultsPane.jsx';

export const CurlyApp = (props, context) => {
  const state = context.store.getState();
  console.log(state);
  const result = state.result;
  return (
    <div>
      <OligoPane title={'oligos'} value={state.oligos} />
      <SequencePane title={'sequence'} value={state.sequence} />
      <ResultsPane
        title={'results'}
        cuts={result.cuts}
        time={result.time}
        fragments={result.fragments}
      />
    </div>
  );
};

CurlyApp.contextTypes = {
  store: React.PropTypes.object,
};
