import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <persistGate persistor={persistor}>
        <Routing />
      </persistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

