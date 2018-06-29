import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import configureStore from './store/configureStore';
import App from './containers/App';

/* eslint-disable no-underscore-dangle */
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
/* eslint-enable */

const store = configureStore(preloadedState);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <App store={store} />,
    document.getElementById('root'),
    () => {
      const ssrStyles = document.getElementById('ssr-styles');
      if (ssrStyles) {
        ssrStyles.parentNode.removeChild(ssrStyles);
      }
    },
  );
});
