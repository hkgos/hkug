import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, message } from 'antd';
import {
  compose,
  branch,
  withHandlers,
  renderComponent,
  lifecycle,
  pure,
} from 'recompose';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import IconText from '../../components/IconText';
import NotFound from '../NotFound';
import allCategories from '../../utils/categories';
import { fetchTopics } from '../../modules/topic';

const styles = theme => ({
  container: {
    flex: 'auto',
    margin: '0 16px 0',
  },
  listItem: {
    '& li': {
      '@media only screen and (max-width: 768px)': {
        width: '33% !important',
        padding: '5px 0 0 0 !important',
        textAlign: 'left !important',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '& em': {
          display: 'none',
        },
      },
    },
  },
  footer: {
    textAlign: 'center',
    padding: 16,
  },
  male: {
    color: theme.maleColor,
  },
  female: {
    color: theme.femaleColor,
  },
});

const Footer = ({ loadMore, className }) => ( // eslint-disable-line react/prop-types
  <div className={className}>
    <Button icon="ellipsis" type="primary" onClick={loadMore}>繼續睇</Button>
  </div>
);

const AuthorName = ({ name, gender, classes }) => ( // eslint-disable-line react/prop-types
  <span className={gender === 'M' ? classes.male : classes.female}>{name}</span>
);

const renderActions = item => [
  <IconText icon="like-o" text={item.like} />,
  <IconText icon="dislike-o" text={item.dislike} />,
  <IconText icon="message" text={item.totalReplies} />,
  <IconText icon="clock-circle-o" text={item.lastReplyMoment.fromNow()} />,
  <IconText
    icon="export"
    text={item.forumName}
    onClick={() => {
      const newWindow = window.open();
      newWindow.opener = null;
      newWindow.location = item.href;
    }}
  />,
];

const renderItem = classes => item => (
  <List.Item
    key={`${item.forum}+${item.topicId}`}
    actions={renderActions(item)}
    className={classes.listItem}
  >
    <List.Item.Meta
      title={<a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a>}
      description={
        <AuthorName
          name={item.authorName}
          gender={item.authorGender}
          classes={classes}
        />
      }
    />
    {item.content}
  </List.Item>
);

const Topics = ({
  classes,
  topics,
  loading,
  handleLoadMore,
}) => (
  <div className={classes.container}>
    <List
      locale={{
        emptyText: '乜都冇，試下F5',
      }}
      itemLayout="vertical"
      dataSource={topics}
      renderItem={renderItem(classes)}
      footer={
        topics.length > 0 &&
        !loading &&
        <Footer className={classes.footer} loadMore={handleLoadMore} />
      }
    >
      {loading && <LoadingIndicator />}
    </List>
  </div>
);
Topics.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    forum: PropTypes.oneOf(['HKG', 'LIHKG']).isRequired,
    topicId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    like: PropTypes.number,
    dislike: PropTypes.number,
    totalReplies: PropTypes.number.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};

const enhance = compose(
  withRouter,
  branch(
    ({ match }) => !allCategories.some(c => c.id === Number(match.params.id)),
    renderComponent(NotFound),
  ),
  connect(state => ({
    topics: state.topic.topics,
    loading: state.topic.isFetchingTopics,
    isError: state.topic.isFetchTopicsError,
    error: state.topic.fetchTopicsError,
  }), { fetchTopics }),
  lifecycle({
    componentWillMount() {
      const category = this.props.match.params.id;
      this.props.fetchTopics({ category }, { reset: true });
    },
    componentDidUpdate(prevProps) {
      if (!prevProps.isError && this.props.isError) {
        message.config({
          top: 72,
          duration: 3,
          maxCount: 1,
        });
        message.error(this.props.error.message);
      }
    },
  }),
  withHandlers({
    handleLoadMore: props => () => {
      props.fetchTopics({ category: props.match.params.id });
    },
  }),
  injectSheet(styles),
  pure,
);

export default enhance(Topics);
