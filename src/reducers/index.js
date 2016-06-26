import { cutSeqWithOligo } from '../sequenceOperations.js';

const setOligos = (state, newOligos) => {
  const result = cutSeqWithOligo(state.sequence, newOligos);
  return Object.assign({}, state, { oligos: newOligos, result });
};

const setSequence = (state, newSequence) => {
  const result = cutSeqWithOligo(newSequence, state.oligos);
  return Object.assign({}, state, { sequence: newSequence, result });
};

const initState = {
  oligos: 'ATGC',
  sequence: 'ACCTTGATGCGGCGAT',
  result: {},
};

export const AppReducer = (state = initState, action) => {
  switch (action.type) {
    case ('SET_OLIGOS'):
      return setOligos(state, action.oligos);
    case ('SET_SEQUENCE'):
      return setSequence(state, action.sequence);
    default:
      return state;
  }
};
