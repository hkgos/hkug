import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Sider from './Sider';
import Header from './Header';
import Footer from './Footer';
import Loading from '../Loading';
import NotFound from '../NotFound';

const { Content } = Layout;

const styles = {
  contentlayout: {
    minHeight: '100vh',
    maxHeight: '100vh',
    overflow: 'auto',
  },
  content: {
    display: 'flex',
    overflow: 'auto',
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

const App = ({ classes }) => (
  <Router>
    <Layout>
      <Sider />
      <Layout className={classes.contentlayout}>
        <Header />
        <Content className={classes.content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/topics/:id" component={Topics} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </Router>
);

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

let enhance = compose(
  injectSheet(styles),
  pure,
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  enhance = compose(enhance, hot(module));
}

export default enhance(App);
