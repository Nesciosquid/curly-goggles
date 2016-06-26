import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { CurlyApp } from './components/app.jsx';
import { AppReducer } from './reducers/index.js';

const root = document.getElementById('reactRoot');

const store = createStore(AppReducer);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <CurlyApp />
    </Provider>,
    root
  );
};

store.subscribe(render);
store.dispatch({
  type: 'UPDATE_RESULT',
});

const getRandomChar = (possible) =>
  (possible.charAt(Math.floor(Math.random() * possible.length)));
const getRandomString = (possible, length) => {
  let temp = '';
  for (let i = 0; i < length; i++) {
    temp += getRandomChar(possible);
  }
  return temp;
};
const randomSeq = getRandomString('ACTG', 500);
store.dispatch({
  type: 'SET_SEQUENCE',
  sequence: randomSeq,
});
