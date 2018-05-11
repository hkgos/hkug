import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import { compose, withProps, withHandlers, pure } from 'recompose';
import injectSheet from 'react-jss';
import { matchPath, withRouter } from 'react-router-dom';
import allCategories from '../../../utils/categories';
import { fetchTopics } from '../../../modules/topic';

const { Header } = Layout;

const styles = theme => ({
  menuIcon: {
    lineHeight: 2.95,
    cursor: 'pointer',
    'z-index': 1,
    margin: '0 15px 0 15px',
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
    background: theme.primaryColor8,
    padding: 0,
    textAlign: 'left',
    color: '#fff',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  headerText: {
    padding: 0,
  },
  '@media only screen and (min-width: 992px)': {
    header: {
      textAlign: 'center',
    },
    headerText: {
      padding: '0 64px 0 64px',
    },
  },
});

const AppHeader = ({
  classes,
  header,
  isValidCategory,
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
    <span className={classes.headerText}>{header}</span>
    <Icon
      style={{ fontSize: 22 }}
      className={classes.rightIcon}
      type="reload"
      onClick={isValidCategory && handleReloadClick}
    />
  </Header>
);

AppHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  header: PropTypes.node.isRequired,
  isValidCategory: PropTypes.bool.isRequired,
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapsed: PropTypes.func.isRequired,
  handleReloadClick: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  connect(() => ({}), { fetchTopics }),
  withProps(({ location }) => {
    const match = matchPath(location.pathname, { path: '/topics/:id' });
    let header = 'HKUG 香港聯登';
    let categoryId = null;
    if (match && match.params.id) {
      const category = allCategories.find(c => c.id === Number(match.params.id));
      if (category) {
        header = category.name;
        categoryId = category.id;
      }
    }
    return ({ header, categoryId, isValidCategory: categoryId !== null });
  }),
  withHandlers({
    handleReloadClick: props => () => {
      props.fetchTopics({ category: props.categoryId }, { reset: true });
    },
  }),
  pure,
);

export default enhance(AppHeader);
