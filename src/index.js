/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');


  ReactDOM.render(
    <App {...initialState} />,
    document.querySelector('#root')
  );
});
