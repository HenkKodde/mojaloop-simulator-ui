import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from 'utils/store';
import { sleep } from 'utils/async';
import { isDevelopment } from 'utils/env';
import { setAppConfig } from 'App/actions';
import App from 'App/index.js';
import 'icons/index';
import 'assets/normalize.css';
import 'index.css';

// setup browser history for client side routing
const history = createBrowserHistory({
  basename: '/',
});

const store = configureStore(history, { isDevelopment });

// Please note this is a local url, handled by the app ( see Route below ). It is not the /api/login endpoint
const loginUrl = `${window.location.protocol}//${window.location.host}/login`;

const NotFound = () => <div> View Not Found </div>;

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;

const boot = () => {
  const apiUrl = `127.0.0.1/api`;
  store.dispatch(setAppConfig({ apiUrl, loginUrl }));
  
  console.log('rendering', Root)
  ReactDOM.render(<Root />, document.getElementById('root'));
  
  if (isDevelopment) {
    const fetch = window.fetch;
    window.fetch = async (...args) => {
      await sleep(200);
      return fetch(...args);
    };
    // assing to global so that we can easily retrieve state
    // and dispatch actions from the browser console
    global.dispatch = store.dispatch;
    global.getState = store.getState;
  
  }
  
  global.version = () => {
    // Prints the TSP version and Commit Hash
    console.info(`FXP v${process.env.REACT_APP_VERSION}`);
    console.info(`Commit # ${process.env.REACT_APP_COMMIT}`);
  };
}


boot();
