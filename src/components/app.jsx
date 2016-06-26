import React from 'react';
import { OligoPane } from './oligoPane.jsx';
import { SequencePane } from './sequencePane.jsx';
import { ResultsPane } from './resultsPane.jsx';

export const CurlyApp = (props, context) => {
  const state = context.store.getState();
  const result = state.result;
  return (
    <div>
      <div className="row">
        <OligoPane title={'oligos'} value={state.oligos} />
        <SequencePane
          title={'sequence'}
          value={state.sequence}
          oligo={state.oligos}
        />
      </div>
      <div className="row">
        <ResultsPane
          title={'results'}
          cuts={result.cuts}
          time={result.time}
          fragments={result.fragments}
        />
      </div>
    </div>
  );
};

CurlyApp.contextTypes = {
  store: React.PropTypes.object,
};
