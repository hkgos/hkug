import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { LocaleProvider } from 'antd';
import { ThemeProvider } from 'react-jss';
import antdLocale from 'antd/lib/locale-provider/zh_TW';
import { SIDE_MENU_BREAK_POINT } from '../../constants';

import App from '../App';

const Root = ({ store, theme }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocaleProvider locale={antdLocale}>
        <App menuCollapsed={window.innerWidth <= SIDE_MENU_BREAK_POINT} />
      </LocaleProvider>
    </ThemeProvider>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    // TODO: define theme shape
  }).isRequired,
};

const enhance = compose(
  connect(state => ({ theme: state.style.theme })),
  pure,
);

export default enhance(Root);
