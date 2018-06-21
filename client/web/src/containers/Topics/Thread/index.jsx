import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { List, Row, Button, Icon, Dropdown, Menu } from 'antd';
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  withStateHandlers,
  branch,
  renderComponent,
  pure,
} from 'recompose';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { modules, models } from 'hkug-client-core';
import Avatar from '../../../components/Avatar';
import IconText from '../../../components/IconText';
import Loading from '../../../containers/Loading';
import { PAGE_TITLE_BASE } from '../../../constants';

const { Reply } = models;
const { fetchReplies, fetchQuote } = modules.thread;
const ButtonGroup = Button.Group;

const styles = theme => ({
  content: {
    fontSize: 'medium',
    marginTop: '1em',
    marginBottom: '1em',
    wordWrap: 'break-word',
    '& blockquote': {
      margin: '0 0 1rem',
      paddingBottom: '.3rem',
      paddingLeft: '.7rem',
      borderLeft: `.1rem solid ${theme.secondaryColor}`,
    },
    '& img': {
      maxWidth: '30vw',
      verticalAlign: 'unset',
    },
    '& pre': {
      color: '#0FFF1A',
      background: '#0B0B0C',
      padding: theme.padding,
      borderRadius: '.2rem',
    },
  },
  titleContainer: {
    padding: theme.padding,
    height: theme.headerHeight,
    borderBottom: `1px solid ${theme.secondaryColor}`,
    lineHeight: `${theme.headerHeight - (theme.padding * 2)}px`,
    '& i': {
      fontSize: 'x-large',
      lineHeight: `${theme.headerHeight - (theme.padding * 2)}px`,
      float: 'left',
      marginRight: theme.margin,
      cursor: 'pointer',
    },
  },
  title: {
    margin: 0,
    fontSize: 'large',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  list: {
    margin: '0 !important',
    padding: '0 !important',
  },
  item: {
    borderBottom: `1px solid ${theme.secondaryColor} !important`,
    padding: theme.padding,
  },
  pagination: {
    padding: theme.padding,
    textAlign: 'center',
    '& div:first-child': {
      marginRight: theme.margin,
    },
    '& div:last-child': {
      marginLeft: theme.margin,
    },
  },
  dropDownMenu: {
    maxHeight: 150,
    overflow: 'auto',
  },
  floatButton: {
    opacity: 0.7,
    textAlign: 'center',
    position: 'fixed',
    right: '4%',
    bottom: 220,
    '& div': {
      marginBottom: theme.margin,
      '& button': {
        border: 'rgba(0, 0, 0, 0.65)',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        color: '#fff',
        '&:hover': {
          borderColor: '#1c1a1a',
          backgroundColor: '#1c1a1a',
        },
      },
    },
    '& div:last-child': {
      marginBottom: 0,
    },
  },
});

const Thread = ({
  classes,
  replies,
  thread,
  title,
  page,
  totalPage,
  like,
  dislike,
  pageMenuItems,
  fetchQuoteAction,
  fetchingQuoteId,
  handlePageChange,
  handleBackToList,
}) => (
  <div>
    <Helmet>
      <title>{`${title} | ${PAGE_TITLE_BASE}`}</title>
    </Helmet>
    <div className={classes.titleContainer}>
      <Icon type="arrow-left" onClick={handleBackToList} />
      <h1 className={classes.title}>{title}</h1>
    </div>
    <List
      className={classes.list}
      locale={{
        emptyText: '乜都冇，試下F5',
      }}
      itemLayout="vertical"
      dataSource={replies}
      renderItem={item => (
        <div key={item.replyId} className={classes.item}>
          <Avatar
            src={item.authorIconHref}
            name={item.authorName}
            gender={item.authorGender}
          />
          {item.contentReactElement({
            className: classes.content,
            render: props => (
              <Button
                shape="circle"
                icon="ellipsis"
                type="primary"
                {...props}
              />
            ),
            handler: (quote) => {
              fetchQuoteAction({ quote, thread }, { replyId: item.replyId, quote });
            },
            fetchingIds: fetchingQuoteId,
          })}
          <Row gutter={16}>
            <IconText icon="tag-o" text={item.index} />
            <IconText icon="clock-circle-o" text={moment(item.replyDate).fromNow()} />
            {Number(item.index) === 1 && <IconText icon="like-o" text={like} />}
            {Number(item.index) === 1 && <IconText icon="dislike-o" text={dislike} />}
          </Row>
        </div>
      )}
    />
    <div className={classes.floatButton}>
      <div>
        <Button
          type="primary"
          onClick={handleBackToList}
        >
          <Icon type="arrow-left" />
        </Button>
      </div>
      <div>
        <Button
          disabled={page === 1}
          type="primary"
          onClick={() => { handlePageChange(page - 1); }}
        >
          <Icon type="up" />
        </Button>
      </div>
      <div>
        <Dropdown
          placement="bottomCenter"
          trigger={['click']}
          overlay={
            <Menu
              theme="dark"
              className={classes.dropDownMenu}
              selectable
              selectedKeys={[String(page)]}
              onClick={({ key }) => { handlePageChange(key); }}
            >
              {pageMenuItems}
            </Menu>
          }
        >
          <Button
            size="large"
            shape="circle"
            type="primary"
          >
            {page}
          </Button>
        </Dropdown>
      </div>
      <div>
        <Button
          disabled={page === totalPage}
          type="primary"
          onClick={() => { handlePageChange(page + 1); }}
        >
          <Icon type="down" />
        </Button>
      </div>
    </div>
    <div className={classes.pagination}>
      <ButtonGroup>
        <Button disabled={page === 1} type="primary" icon="verticle-right" onClick={() => { handlePageChange(1); }} />
        <Button disabled={page === 1} type="primary" icon="left" onClick={() => { handlePageChange(page - 1); }} />
      </ButtonGroup>
      <Dropdown
        placement="topCenter"
        trigger={['click']}
        overlay={
          <Menu
            className={classes.dropDownMenu}
            selectable
            selectedKeys={[String(page)]}
            onClick={({ key }) => { handlePageChange(key); }}
          >
            {pageMenuItems}
          </Menu>
        }
      >
        <Button
          size="large"
          data-nav="page"
        >
          {`第 ${page} 頁`}<Icon type="down" />
        </Button>
      </Dropdown>
      <ButtonGroup>
        <Button disabled={page === totalPage} type="primary" icon="right" onClick={() => { handlePageChange(page + 1); }} />
        <Button disabled={page === totalPage} type="primary" icon="verticle-left" onClick={() => { handlePageChange(totalPage); }} />
      </ButtonGroup>
    </div>
  </div>
);
Thread.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  thread: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(PropTypes.instanceOf(Reply)).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  like: PropTypes.number.isRequired,
  dislike: PropTypes.number.isRequired,
  pageMenuItems: PropTypes.arrayOf(PropTypes.node).isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleBackToList: PropTypes.func.isRequired,
  fetchQuoteAction: PropTypes.func.isRequired,
  fetchingQuoteId: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const enhance = compose(
  injectSheet(styles),
  connect(state => ({
    title: state.thread.title,
    replies: state.thread.replies,
    totalPage: state.thread.totalPage,
    like: state.thread.like,
    dislike: state.thread.dislike,
    isLoading: state.thread.isFetchingReplies,
    isError: state.thread.isFetchRepliesError,
    fetchRepliesError: state.thread.fetchRepliesError,
    fetchingQuoteId: state.thread.fetchingQuoteId,
  }), { fetchReplies, fetchQuoteAction: fetchQuote }),
  withProps((props) => {
    const query = new URLSearchParams(props.location.search);
    let page = query.get('page');
    if (!page || page < 1) {
      page = 1;
    }
    const forum = query.get('forum');
    const { thread } = props.match.params;

    const pageMenuItems = [];

    for (let i = 0; i < props.totalPage; i += 1) {
      pageMenuItems.push(<Menu.Item key={i + 1}>{`第 ${i + 1} 頁`}</Menu.Item>);
    }
    return ({
      initPage: () => { props.fetchReplies({ thread, page, forum }); },
      page: Number(page),
      thread,
      forum,
      pageMenuItems,
    });
  }),
  withStateHandlers(
    () => ({ pastDelay: false }),
    {
      setPastDelay: () => value => ({ pastDelay: value }),
    },
  ),
  lifecycle({
    componentWillMount() {
      this.props.initPage();
    },
    componentDidUpdate(prevProps) {
      if (this.props.isLoading && !prevProps.isLoading) {
        this.props.setPastDelay(false);
        setTimeout(() => { this.props.setPastDelay(true); }, 500);
      }
      if (this.props.page !== prevProps.page) {
        this.props.fetchReplies({
          thread: this.props.thread,
          page: this.props.page,
          forum: this.props.forum,
        });
      }
    },
  }),
  branch(
    ({ isLoading, isError }) => isLoading || isError,
    renderComponent(({
      initPage,
      isError,
      pastDelay,
      fetchRepliesError,
    }) => (
      <Loading
        error={isError}
        retry={initPage}
        pastDelay={pastDelay}
        detail={fetchRepliesError && fetchRepliesError.message}
      />
    )),
  ),
  withHandlers({
    handleBackToList: ({ history, match, location }) => () => {
      const { state } = location;
      if (state && state.type) {
        history.push(`/topics/${match.params.category}?type=${state.type}`);
      } else {
        history.push(`/topics/${match.params.category}`);
      }
    },
    handlePageChange: ({ history, location, forum }) => (page) => {
      const params = new URLSearchParams({ forum, page });
      history.push({
        pathname: location.pathname,
        search: `?${params}`,
        state: location.state,
      });
    },
  }),
  pure,
);

export default enhance(Thread);
