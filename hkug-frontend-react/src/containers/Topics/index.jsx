import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Spin, Button, message } from 'antd';
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
import NotFound from '../NotFound';
import allCategories from '../../utils/categories';
import { fetchTopics } from '../../modules/topic';

const styles = {
  container: {
    flex: 'auto',
    margin: '0 16px 0',
  },
  loadingIndicator: {
    textAlign: 'center',
    padding: 16,
  },
  footer: {
    textAlign: 'center',
    padding: 16,
  },
};

const IconText = ({ type, text }) => ( // eslint-disable-line react/prop-types
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const LoadingIndicator = ({ className }) => ( // eslint-disable-line react/prop-types
  <div className={className}>
    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
  </div>
);

const Footer = ({ loadMore, className }) => ( // eslint-disable-line react/prop-types
  <div className={className}>
    <Button icon="ellipsis" type="primary" onClick={loadMore}>繼續睇</Button>
  </div>
);

const renderActions = item => [
  <IconText type="like-o" text={item.like} />,
  <IconText type="dislike-o" text={item.dislike} />,
  <IconText type="message" text={item.totalReplies} />,
];

const renderItem = item => (
  <List.Item
    key={`${item.forum}+${item.topicId}`}
    actions={renderActions(item)}
  >
    <List.Item.Meta
      title={<a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a>}
      description={item.authorName}
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
      itemLayout="vertical"
      dataSource={topics}
      renderItem={renderItem}
      footer={
        topics.length > 0 &&
        !loading &&
        <Footer className={classes.footer} loadMore={handleLoadMore} />
      }
    >
      {loading && <LoadingIndicator className={classes.loadingIndicator} />}
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
  }), { fetchTopics }),
  lifecycle({
    componentWillMount() {
      const category = this.props.match.params.id;
      this.props.fetchTopics({ category }, { reset: true });
    },
    componentDidUpdate(prevProps) {
      if (!prevProps.isError && this.props.isError) {
        message.error('發生錯誤，請稍後再試');
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
