import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import { compose, withProps, pure } from 'recompose';
import injectSheet from 'react-jss';
import { matchPath, withRouter } from 'react-router-dom';
import allCategories from '../../../utils/categories';

const { Header } = Layout;

const styles = theme => ({
  menuIcon: {
    float: 'left',
    lineHeight: 2.95,
    cursor: 'pointer',
    'z-index': 1,
    margin: '0 15px 0 15px',
  },
  header: {
    background: theme.primaryColor8,
    padding: 0,
    textAlign: 'left',
    color: '#fff',
  },
  headerText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '@media only screen and (min-width: 992px)': {
    menuIcon: {
      display: 'none',
    },
    header: {
      textAlign: 'center',
    },
    headerText: {
      width: 100,
      margin: '0 auto',
    },
  },
});

const AppHeader = ({
  classes,
  header,
  menuCollapsed,
  setMenuCollapsed,
}) => (
  <Header className={classes.header}>
    <Icon
      style={{ fontSize: 22 }}
      className={classes.menuIcon}
      type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={() => { setMenuCollapsed(!menuCollapsed); }}
    />
    <div className={classes.headerText}>{header}</div>
  </Header>
);

AppHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  header: PropTypes.node.isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapsed: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withProps(({ location }) => {
    const match = matchPath(location.pathname, { path: '/topics/:id' });
    let header = 'HKUG 香港聯登';
    if (match && match.params.id) {
      const category = allCategories.find(c => c.id === Number(match.params.id));
      if (category) {
        header = category.name;
      }
    }
    return ({ header });
  }),
  pure,
);

export default enhance(AppHeader);
