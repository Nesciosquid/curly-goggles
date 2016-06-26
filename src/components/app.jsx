import React from 'react';
import { OligoPane } from './oligoPane.jsx';
import { SequencePane } from './sequencePane.jsx';

export const CurlyApp = (props, context) => (
  <div>
    <OligoPane title={'oligos'} value={context.store.getState().oligos} />
    <SequencePane title={'sequence'} value={context.store.getState().sequence} />
  </div>
);

CurlyApp.contextTypes = {
  store: React.PropTypes.object,
};
