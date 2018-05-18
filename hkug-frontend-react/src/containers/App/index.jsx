import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Layout, BackTop } from 'antd';
import { compose, withStateHandlers, pure } from 'recompose';
import injectSheet from 'react-jss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Sider from './Sider';
import Header from './Header';
import Footer from './Footer';
import Loading from '../Loading';
import NotFound from '../NotFound';
import { SIDE_MENU_BREAK_POINT } from '../../constants';

const { Content } = Layout;

const styles = {
  contentlayout: {
    minHeight: '100vh',
    maxHeight: '100vh',
  },
  content: {
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
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
    bottom: 75,
  },
  [`@media only screen and (max-width: ${SIDE_MENU_BREAK_POINT}px)`]: {
    content: {
      minWidth: '100vw',
    },
    overlay: {
      display: 'block',
    },
  },
};

const Home = Loadable({
  loader: () => import('../Home'),
  loading: Loading,
  delay: 300,
});
const Topics = Loadable({
  loader: () => import('../Topics'),
  loading: Loading,
  delay: 300,
});

const App = ({ classes, menuCollapsed, setMenuCollapsed }) => (
  <Router>
    <Layout>
      <Sider menuCollapsed={menuCollapsed} setMenuCollapse={setMenuCollapsed} />
      <Layout className={classes.contentlayout}>
        <Header menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
        {!menuCollapsed &&
          <div
            className={classes.overlay}
            role="presentation"
            onClick={() => { setMenuCollapsed(true); }}
            onKeyPress={() => { setMenuCollapsed(true); }}
          />
        }
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
        <Footer />
      </Layout>
    </Layout>
  </Router>
);

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapsed: PropTypes.func.isRequired,
};

let enhance = compose(
  injectSheet(styles),
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
