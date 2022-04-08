import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App';
import reportWebVitals from './reportWebVitals';
import client from "./lib/query/client";
import store from './lib/redux/store';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <QueryClientProvider client={client}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
