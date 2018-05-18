import React from 'react';
import PropTypes from 'prop-types';
import { List, Row, Pagination } from 'antd';
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  branch,
  renderComponent,
  pure,
} from 'recompose';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { fetchReplies } from '../../../modules/thread';
import Avatar from '../../../components/Avatar';
import IconText from '../../../components/IconText';
import Reply from '../../../models/Reply';
import Loading from '../../../containers/Loading';

const styles = theme => ({
  container: {
  },
  content: {
    fontSize: 'medium',
    marginTop: '1em',
    marginBottom: '1em',
    '& blockquote': {
      paddingLeft: '.8rem',
      marginBottom: '.8rem',
      marginLeft: '.8rem',
      borderLeft: `.2rem solid ${theme.secondaryColor}`,
    },
    '& img': {
      maxWidth: `calc(100vw - ${theme.siderWidth}px - ${theme.padding}px * 3)`,
      verticalAlign: 'unset',
    },
  },
  titleContainer: {
    background: theme.secondaryColor,
    padding: theme.padding,
    height: theme.headerHeight,
    lineHeight: `${theme.headerHeight - (theme.padding * 2)}px`,
  },
  title: {
    color: '#fff',
    margin: 0,
    fontSize: 'large',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  list: {
    margin: '0 !important',
    padding: `0 ${theme.padding}px !important`,
  },
  item: {
    borderBottom: `1px solid ${theme.secondaryColor}`,
    paddingTop: theme.padding,
    paddingBottom: theme.padding,
  },
  pagination: {
    padding: theme.padding,
    textAlign: 'center',
  },
});

const Thread = ({
  classes,
  replies,
  title,
  page,
  totalPage,
  handlePageChange,
}) => (
  <div className={classes.container}>
    <div className={classes.titleContainer}>
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
          {item.contentReactElement(classes.content)}
          <Row gutter={16}>
            <IconText icon="pushpin-o" text={item.index} />
            <IconText icon="clock-circle-o" text={item.replyMoment.fromNow()} />
          </Row>
        </div>
      )}
    />
    <div className={classes.pagination}>
      <Pagination
        showQuickJumper
        pageSize={25}
        current={page}
        total={totalPage * 25}
        onChange={handlePageChange}
      />
    </div>
  </div>
);
Thread.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(PropTypes.instanceOf(Reply)).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  connect(state => ({
    title: state.thread.title,
    replies: state.thread.replies,
    totalPage: state.thread.totalPage,
    isLoading: state.thread.isFetchingReplies,
    isError: state.thread.isFetchRepliesError,
  }), { fetchReplies }),
  withProps((props) => {
    const query = new URLSearchParams(props.location.search);
    let page = query.get('page');
    if (!page || page < 1) {
      page = 1;
    }
    const [forum, thread] = props.match.params.thread.split('+');
    return ({
      initPage: () => { props.fetchReplies({ thread, page, forum }); },
      page: Number(page),
      thread,
      forum,
    });
  }),
  lifecycle({
    componentWillMount() {
      this.props.initPage();
    },
    componentDidUpdate(prevProps) {
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
    renderComponent(({ initPage, isError }) => <Loading error={isError} retry={initPage} />),
  ),
  withHandlers({
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
