import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { compose, withProps, withHandlers, pure } from 'recompose';
import injectSheet from 'react-jss';
import { withRouter, matchPath } from 'react-router-dom';
import allCategories from '../../../utils/categories';
import { fetchTopics } from '../../../modules/topic';

const { Sider } = Layout;

const styles = theme => ({
  sider: {
    minHeight: '100vh',
    maxHeight: '100vh',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
  },
  logo: {
    height: 32,
    background: theme.primaryColor8,
    margin: 16,
  },
});

const AppSider = ({
  classes,
  categories,
  handleMenuItemClick,
  defaultSelectedKeys,
  menuCollapsed,
  setMenuCollapse,
}) => (
  <Sider
    className={classes.sider}
    breakpoint="lg"
    collapsedWidth="0"
    collapsed={menuCollapsed}
    onCollapse={({ collapsed }) => { setMenuCollapse(collapsed); }}
  >
    <div className={classes.logo} />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      onClick={handleMenuItemClick}
    >
      {
        categories.map(c => (
          <Menu.Item key={c.id}>
            <span>{c.name}</span>
          </Menu.Item>
        ))
      }
    </Menu>
  </Sider>
);

AppSider.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    hkgKey: PropTypes.string,
    lihkgKey: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapse: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  connect(() => ({}), { fetchTopics }),
  withProps(({ location }) => {
    const match = matchPath(location.pathname, { path: '/topics/:id' });
    const defaultSelectedKeys = [];
    if (match && match.params.id) {
      defaultSelectedKeys.push(match.params.id);
    }
    return ({ defaultSelectedKeys, categories: allCategories });
  }),
  withHandlers({
    handleMenuItemClick: props => ({ key }) => {
      props.setMenuCollapse(true);
      props.fetchTopics({ category: key }, { reset: true });
      props.history.push(`/topics/${key}`);
    },
  }),
  pure,
);

export default enhance(AppSider);
