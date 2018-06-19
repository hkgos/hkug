import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { List, Row, Select, Button, Icon } from 'antd';
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

const { Option } = Select;
const { Reply } = models;
const { fetchReplies, fetchQuote } = modules.thread;

const styles = theme => ({
  container: {
  },
  content: {
    fontSize: 'medium',
    marginTop: '1em',
    marginBottom: '1em',
    wordWrap: 'break-word',
    '& blockquote': {
      margin: '0 0 1rem',
      paddingBottom: '.3rem',
      paddingLeft: '.7rem',
      borderLeft: `.1rem solid ${theme['border-color-split']}`,
    },
    '& img': {
      maxWidth: '30vw',
      verticalAlign: 'unset',
    },
    '& pre': {
    },
  },
  titleContainer: {
    padding: theme.padding,
    height: theme.headerHeight,
    borderBottom: `1px solid ${theme['border-color-split']}`,
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
    borderBottom: `1px solid ${theme['border-color-split']} !important`,
    padding: theme.padding,
  },
  pagination: {
    padding: theme.padding,
    textAlign: 'center',
  },
  select: {
    width: 104,
    marginLeft: `${theme.margin}px !important`,
    marginRight: `${theme.margin}px !important`,
  },
});

const Thread = ({
  classes,
  replies,
  thread,
  title,
  page,
  totalPage,
  pageOptions,
  fetchQuoteAction,
  fetchingQuoteId,
  handlePageChange,
  handleBackToList,
}) => (
  <div className={classes.container}>
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
            <IconText icon="pushpin-o" text={item.index} />
            <IconText icon="clock-circle-o" text={moment(item.replyDate).fromNow()} />
          </Row>
        </div>
      )}
    />
    <div className={classes.pagination}>
      <Button disabled={page === 1} type="primary" onClick={() => { handlePageChange(page - 1); }}>
        <Icon type="left" />上一頁
      </Button>
      <Select value={page} className={classes.select} onChange={handlePageChange}>
        {pageOptions}
      </Select>
      <Button disabled={page === totalPage} type="primary" onClick={() => { handlePageChange(page + 1); }}>
        下一頁<Icon type="right" />
      </Button>
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
  pageOptions: PropTypes.arrayOf(PropTypes.node).isRequired,
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
    isLoading: state.thread.isFetchingReplies,
    isError: state.thread.isFetchRepliesError,
    fetchingQuoteId: state.thread.fetchingQuoteId,
  }), { fetchReplies, fetchQuoteAction: fetchQuote }),
  withProps((props) => {
    const query = new URLSearchParams(props.location.search);
    let page = query.get('page');
    if (!page || page < 1) {
      page = 1;
    }
    const [forum, thread] = props.match.params.thread.split('+');

    const pageOptions = [];

    for (let i = 0; i < props.totalPage; i += 1) {
      pageOptions.push(<Option key={i + 1} value={i + 1}>{`第 ${i + 1} 頁`}</Option>);
    }
    return ({
      initPage: () => { props.fetchReplies({ thread, page, forum }); },
      page: Number(page),
      thread,
      forum,
      pageOptions,
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
    renderComponent(({ initPage, isError, pastDelay }) =>
      <Loading error={isError} retry={initPage} pastDelay={pastDelay} />),
  ),
  withHandlers({
    handleBackToList: ({ history, match }) => () => {
      history.push(`/topics/${match.params.category}`);
    },
    handlePageChange: ({ history, location }) => (page) => {
      history.push({
        pathname: location.pathname,
        search: `?page=${page}`,
      });
    },
  }),
  pure,
);

export default enhance(Thread);
