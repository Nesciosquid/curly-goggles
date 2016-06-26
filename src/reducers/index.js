const setOligos = (state, newOligos) => (
  Object.assign({}, state, { oligos: newOligos })
);

const setSequence = (state, newSequence) => (
  Object.assign({}, state, { sequence: newSequence })
);

const initState = {
  oligos: 'ATGC',
  sequence: 'ACCTTGATGCGGCGAT',
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
