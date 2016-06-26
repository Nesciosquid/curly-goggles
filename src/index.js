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
render();
