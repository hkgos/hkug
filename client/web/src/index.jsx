import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './containers/Root';
import theme from './styles/theme/default';

// Prepare the store from previous state / create a new store
const store = configureStore();

ReactDOM.render(
  <Root store={store} theme={theme} />,
  document.getElementById('root'),
);
