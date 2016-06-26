import { cutSeqWithOligo } from '../sequenceOperations.js';
const updateResult = (state) => {
  const result = cutSeqWithOligo(state.sequence, state.oligos);
  return Object.assign({}, state, { result });
};

const setOligos = (state, newOligos) => {
  const newState = Object.assign({}, state, { oligos: newOligos });
  return updateResult(newState);
};

const setSequence = (state, newSequence) => {
  const newState = Object.assign({}, state, { sequence: newSequence });
  return updateResult(newState);
};

const initState = {
  oligos: 'ATGC',
  sequence: 'ACCTTGATGCGGCGAT',
  result: {
    cuts: 0,
    time: 0,
    fragments: [],
  },
};

export const AppReducer = (state = initState, action) => {
  switch (action.type) {
    case ('SET_OLIGOS'):
      return setOligos(state, action.oligos);
    case ('SET_SEQUENCE'):
      return setSequence(state, action.sequence);
    case ('UPDATE_RESULT'):
      return updateResult(state);
    default:
      return state;
  }
};
