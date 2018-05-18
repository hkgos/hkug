import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import { compose, withProps, withHandlers, pure } from 'recompose';
import injectSheet from 'react-jss';
import { matchPath, withRouter } from 'react-router-dom';
import allCategories from '../../../utils/categories';
import { fetchTopics } from '../../../modules/topic';
import { SIDE_MENU_BREAK_POINT } from '../../../constants';

const { Header } = Layout;

const styles = theme => ({
  menuIcon: {
    lineHeight: 2.95,
    cursor: 'pointer',
    zIndex: 1,
    margin: `0 ${theme.margin}px 0 ${theme.margin}px`,
  },
  leftIcon: {
    extend: 'menuIcon',
    float: 'left',
  },
  rightIcon: {
    extend: 'menuIcon',
    float: 'right',
  },
  header: {
    zIndex: 100,
    background: theme.primaryColor,
    padding: 0,
    textAlign: 'center',
    color: '#fff',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
  },
  headerText: {
    fontSize: '1.5em',
    marginBottom: 0,
  },
  headerTextOffset: {
    marginRight: 64,
  },
  [`@media only screen and (max-width: ${SIDE_MENU_BREAK_POINT}px)`]: {
    header: {
      minWidth: '100vw',
      textAlign: 'left',
    },
    headerText: {
      margin: '0 !important',
    },
  },
});

const AppHeader = ({
  classes,
  header,
  showReloadButton,
  menuCollapsed,
  setMenuCollapsed,
  handleReloadClick,
}) => (
  <Header className={classes.header}>
    <Icon
      style={{ fontSize: 22 }}
      className={classes.leftIcon}
      type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={() => { setMenuCollapsed(!menuCollapsed); }}
    />
    <span
      className={`${classes.headerText} ${!showReloadButton && classes.headerTextOffset}`}
    >
      {header}
    </span>
    {showReloadButton && <Icon
      style={{ fontSize: 22 }}
      className={classes.rightIcon}
      type="reload"
      onClick={handleReloadClick}
    />}
  </Header>
);

AppHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  header: PropTypes.node.isRequired,
  showReloadButton: PropTypes.bool.isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapsed: PropTypes.func.isRequired,
  handleReloadClick: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  connect(() => ({}), { fetchTopics }),
  withProps(({ location }) => {
    const exact = matchPath(location.pathname, { path: '/topics/:category', exact: true });
    const match = matchPath(location.pathname, { path: '/topics/:category' });
    let header = 'HKUG 香港聯登';
    let categoryId = null;
    if (match && match.params.category) {
      const category = allCategories.find(c => c.id === Number(match.params.category));
      if (category) {
        header = category.name;
        categoryId = category.id;
      }
    }
    let showReloadButton = false;
    if (exact && categoryId !== null) {
      showReloadButton = true;
    }
    return ({ header, categoryId, showReloadButton });
  }),
  withHandlers({
    handleReloadClick: props => () => {
      props.fetchTopics({ category: props.categoryId }, { reset: true });
    },
  }),
  pure,
);

export default enhance(AppHeader);
