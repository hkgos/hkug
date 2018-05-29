import 'moment/locale/zh-hk';

import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import moment from 'moment';
import Drawer from './screens/Drawer';
import Home from './screens/Home';
import Topics from './screens/Topics';
import Thread from './screens/Thread';
import configureStore from './store/configureStore';

moment.locale('zh-hk');

const store = configureStore();

const App = createDrawerNavigator(
  {
    Home,
    Topics,
    Thread,
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => <Drawer {...props} />,
  },
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
