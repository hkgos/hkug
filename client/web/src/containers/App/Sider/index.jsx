import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { compose, withProps, withHandlers, pure } from 'recompose';
import injectSheet from 'react-jss';
import { withRouter, matchPath, Link } from 'react-router-dom';
import { utils } from 'hkug-client-core';
import { SIDE_MENU_BREAK_POINT } from '../../../constants';
import logo from '../../../img/logo.png';

const allCategories = utils.categories.default;
const { Sider } = Layout;

const styles = theme => ({
  sider: {
    zIndex: 100,
    minHeight: '100vh',
    maxHeight: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
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
  menu: {
  },
  logo: {
    textAlign: 'center',
    margin: theme.margin,
    '& img': {
      height: 32,
    },
  },
});

const AppSider = ({
  classes,
  categories,
  handleMenuItemClick,
  handleHomeIconClick,
  selectedKeys,
  menuCollapsed,
  setMenuCollapse,
}) => (
  <Sider
    className={classes.sider}
    breakpoint="md"
    collapsedWidth="0"
    trigger={null}
    collapsed={menuCollapsed}
    onCollapse={(collapsed) => { setMenuCollapse(collapsed); }}
  >
    <div className={classes.logo}>
      <Link to="/" href="/" onClick={handleHomeIconClick}><img src={logo} alt="Application logo" /></Link>
    </div>
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      onClick={handleMenuItemClick}
      className={classes.menu}
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
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  handleHomeIconClick: PropTypes.func.isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapse: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withProps(({ location }) => {
    const match = matchPath(location.pathname, { path: '/topics/:category' });
    const selectedKeys = [];
    if (match && match.params.category) {
      selectedKeys.push(match.params.category);
    }
    return ({ selectedKeys, categories: allCategories });
  }),
  withHandlers({
    handleHomeIconClick: props => () => {
      if (window.innerWidth <= SIDE_MENU_BREAK_POINT) {
        props.setMenuCollapse(true);
      }
    },
    handleMenuItemClick: props => ({ key }) => {
      if (window.innerWidth <= SIDE_MENU_BREAK_POINT) {
        props.setMenuCollapse(true);
      }
      props.history.push(`/topics/${key}`);
    },
  }),
  pure,
);

export default enhance(AppSider);
