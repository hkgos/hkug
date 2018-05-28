import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import { compose, withProps, withHandlers, pure } from 'recompose';
import injectSheet from 'react-jss';
import { matchPath, withRouter } from 'react-router-dom';
import { utils, modules } from 'hkug-client-core';
import { SIDE_MENU_BREAK_POINT } from '../../../constants';

const allCategories = utils.categories.default;
const { fetchTopics } = modules.topic;
const { fetchReplies } = modules.thread;

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
  connect(() => ({}), { fetchTopics, fetchReplies }),
  withProps(({ location }) => {
    const matchCategory = matchPath(location.pathname, { path: '/topics/:category' });
    const matchThread = matchPath(location.pathname, { path: '/topics/:category/:theadId', exact: true });
    let header = 'HKUG 香港聯登';
    let categoryId = null;
    let showReloadButton = false;
    let isTopics = false;
    let isThread = false;
    let threadId;
    let threadPage;
    let threadForum;
    if (matchCategory && matchCategory.params.category) {
      const category = allCategories.find(c => c.id === Number(matchCategory.params.category));
      if (category) {
        showReloadButton = true;
        isTopics = true;
        header = category.name;
        categoryId = category.id;
      }
    }
    if (matchThread && categoryId !== null) {
      isThread = true;
      [threadForum, threadId] = matchThread.params.theadId.split('+');
      const query = new URLSearchParams(location.search);
      threadPage = query.get('page') || 1;
    }
    return ({
      header,
      categoryId,
      threadId,
      threadPage,
      threadForum,
      showReloadButton,
      isTopics,
      isThread,
    });
  }),
  withHandlers({
    handleReloadClick: props => () => {
      if (props.isThread) {
        props.fetchReplies({
          thread: props.threadId,
          page: props.threadPage,
          forum: props.threadForum,
        });
      } else if (props.isTopics) {
        props.fetchTopics({ category: props.categoryId }, { reset: true });
      }
    },
  }),
  pure,
);

export default enhance(AppHeader);
