import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import ReactDOM from 'react-dom';
import 'react-table/react-table.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
