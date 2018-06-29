import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import {
  Layout,
  BackTop,
  LocaleProvider,
  Icon,
} from 'antd';
import {
  compose,
  withStateHandlers,
  withProps,
  pure,
} from 'recompose';
import injectSheet, { ThemeProvider } from 'react-jss';
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import antdLocale from 'antd/lib/locale-provider/zh_TW';
import { SIDE_MENU_BREAK_POINT } from '../../constants';
import theme from '../../styles/theme/default';
import Sider from './Sider';
import Header from './Header';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';

const { Content } = Layout;

const styles = ({
  contentlayout: {
    minHeight: '100vh',
    maxHeight: '100vh',
  },
  content: {
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#212121',
    },
    '&::-webkit-scrollbar': {
      width: '.5em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#a2a2a2',
    },
  },
  overlay: {
    display: 'none',
    position: 'fixed',
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    background: 'black',
    zIndex: 99,
    opacity: 0.6,
  },
  backTop: {
    bottom: 150,
  },
  footer: {
    zIndex: 10,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
    color: theme.invertTextColor,
    '& i': {
      color: theme.invertTextColor,
      marginLeft: theme.marginSmall,
    },
  },
  [`@media only screen and (max-width: ${SIDE_MENU_BREAK_POINT}px)`]: {
    content: {
      minWidth: '100vw',
    },
    overlay: {
      display: 'block',
    },
    footer: {
      minWidth: '100vw',
    },
  },
});

const Home = Loadable({
  loader: () => import('../Home'),
  loading: Loading,
  delay: 500,
});
const Topics = Loadable({
  loader: () => import('../Topics'),
  loading: Loading,
  delay: 500,
});

const App = ({
  store,
  url,
  browser,
  classes,
  menuCollapsed,
  setMenuCollapsed,
}) => {
  const Router = browser ? BrowserRouter : StaticRouter;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocaleProvider locale={antdLocale}>
          <Router location={!browser && url}>
            <Layout>
              <Sider menuCollapsed={menuCollapsed} setMenuCollapse={setMenuCollapsed} />
              <Layout className={classes.contentlayout}>
                <Header menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                {!menuCollapsed && (
                  <div
                    className={classes.overlay}
                    role="presentation"
                    onClick={() => { setMenuCollapsed(true); }}
                    onKeyPress={() => { setMenuCollapsed(true); }}
                  />
                )}
                <Content className={classes.content}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/topics/:category" component={Topics} />
                    <Route component={NotFound} />
                  </Switch>
                  <BackTop
                    className={classes.backTop}
                    target={() => document.getElementsByClassName(classes.content)[0]}
                  />
                </Content>
                <Layout.Footer className={classes.footer}>
                  HKUG ©2018 Created by HKGOS
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/hkgos/hkug"
                  >
                    <Icon type="github" />
                  </a>
                </Layout.Footer>
              </Layout>
            </Layout>
          </Router>
        </LocaleProvider>
      </ThemeProvider>
    </Provider>
  );
};

App.propTypes = {
  url: PropTypes.string,
  browser: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapsed: PropTypes.func.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};
App.defaultProps = {
  url: '',
  browser: true,
};

let enhance = compose(
  injectSheet(styles),
  withProps(() => ({ menuCollapsed: true })),
  withStateHandlers(({ menuCollapsed = false }) => ({ menuCollapsed }), {
    setMenuCollapsed: () => menuCollapsed => ({
      menuCollapsed,
    }),
  }),
  pure,
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  enhance = compose(enhance, hot(module));
}

export default enhance(App);
