import 'moment/locale/zh-hk';

import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import moment from 'moment';
import Drawer from './screens/Drawer';
import Home from './screens/Home';
import Topics from './screens/Topics';
import Thread from './screens/Thread';
import configureStore from './store/configureStore';
import robotoMedium from './assets/fonts/Roboto-Medium.ttf';


moment.locale('zh-hk');

const store = configureStore();


const Navigator = createDrawerNavigator(
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

class App extends React.Component {
  constructor() {
    super();
    this.state = { fontLoaded: false };
  }
  componentDidMount() {
    Font.loadAsync({
      Roboto_medium: robotoMedium,
    // eslint-disable-next-line react/no-did-mount-set-state
    }).then(this.setState({ fontLoaded: true }));
  }

  render() {
    return this.state.fontLoaded ? (<Navigator />) : null;
  }
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
