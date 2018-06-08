import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { List, Button, message } from 'antd';
import {
  compose,
  withHandlers,
  lifecycle,
  pure,
} from 'recompose';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { modules } from 'hkug-client-core';
import LoadingIndicator from '../../../components/LoadingIndicator';
import IconText from '../../../components/IconText';
import { matchShape } from '../../../utils/propTypes';

const { fetchTopics } = modules.topic;

const styles = theme => ({
  container: {
    '& .ant-list-empty-text': {
      color: `${theme.textColor} !important`,
    },
  },
  listItem: {
    padding: theme.padding,
    borderBottom: `.2rem solid ${theme.primaryColor} !important`,
    '& a': {
      color: `${theme.textColor} !important`,
      '&:hover': {
        color: `${theme.hoverColor} !important`,
      },
    },
    '& span': {
      color: `${theme.secondaryTextColor}`,
    },
    '& li': {
      '@media only screen and (max-width: 768px)': {
        width: '33% !important',
        padding: `${theme.paddingSmall}px 0 0 0 !important`,
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
    padding: theme.padding,
  },
  male: {
    color: `${theme.maleColor} !important`,
  },
  female: {
    color: `${theme.femaleColor} !important`,
  },
});

const Footer = ({ loadMore, className }) => ( // eslint-disable-line react/prop-types
  <div className={className}>
    <Button icon="ellipsis" type="primary" onClick={loadMore}>繼續睇</Button>
  </div>
);

const AuthorName = ({ name, gender, classes }) => { // eslint-disable-line react/prop-types
  let className;
  if (gender === 'M') {
    className = classes.male;
  } else if (gender === 'F') {
    className = classes.female;
  }
  return <span className={className}>{name}</span>;
};

const renderActions = item => [
  <IconText icon="like-o" text={item.like} />,
  <IconText icon="dislike-o" text={item.dislike} />,
  <IconText icon="message" text={item.totalReplies} />,
  <IconText icon="clock-circle-o" text={moment(item.lastReplyDate).fromNow()} />,
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

const renderItem = (classes, match) => item => (
  <List.Item
    key={`${item.forum}+${item.topicId}`}
    actions={renderActions(item)}
    className={classes.listItem}
  >
    <List.Item.Meta
      title={
        <Link
          to={`${match.url}/${item.forum}+${item.topicId}`}
          href={`${match.url}/${item.forum}+${item.topicId}`}
        >
          {item.title}
        </Link>
      }
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
  match,
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
      renderItem={renderItem(classes, match)}
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
  match: matchShape.isRequired,
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
  connect(state => ({
    topics: state.topic.topics,
    loading: state.topic.isFetchingTopics,
    isError: state.topic.isFetchTopicsError,
    error: state.topic.fetchTopicsError,
  }), { fetchTopics }),
  lifecycle({
    componentWillMount() {
      const { category } = this.props.match.params;
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
      props.fetchTopics({ category: props.match.params.category });
    },
  }),
  injectSheet(styles),
  pure,
);

export default enhance(Topics);
