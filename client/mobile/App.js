import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Drawer from './screens/Drawer';
import Home from './screens/Home';
import Topics from './screens/Topics';
import configureStore from './store/configureStore';

const store = configureStore();

const App = createDrawerNavigator(
  {
    Home,
    Topics,
  },
  {
    contentComponent: props => <Drawer {...props} />,
  },
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
