import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import {
  List,
  Button,
  Menu,
  message,
} from 'antd';
import {
  compose,
  withHandlers,
  lifecycle,
  withProps,
  pure,
} from 'recompose';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { categories, modules } from 'hkug-client-core';
import LoadingIndicator from '../../../components/LoadingIndicator';
import IconText from '../../../components/IconText';
import { matchShape } from '../../../utils/propTypes';
import { PAGE_TITLE_BASE } from '../../../constants';

const { fetchTopics, FETCH_TOPICS } = modules.topic;
const { getCategoryName } = categories;

const styles = theme => ({
  listItem: {
    padding: theme.padding,
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
    <Button icon="ellipsis" type="primary" onClick={loadMore}>
      繼續睇
    </Button>
  </div>
);

const AuthorName = ({ name, gender, classes }) => { // eslint-disable-line react/prop-types
  let className;
  if (gender === 'M') {
    className = classes.male;
  } else if (gender === 'F') {
    className = classes.female;
  }
  return (
    <span className={className}>
      {name}
    </span>
  );
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

const renderItem = (classes, match, type) => item => (
  <List.Item
    key={`${item.forum}+${item.topicId}`}
    actions={renderActions(item)}
    className={classes.listItem}
  >
    <List.Item.Meta
      title={(
        <Link
          to={{
            pathname: `${match.url}/${item.topicId}`,
            search: `?forum=${item.forum}`,
            state: { type },
          }}
          href={`${match.url}/${item.topicId}?forum=${item.forum}`}
        >
          {item.title}
        </Link>
      )}
      description={(
        <AuthorName
          name={item.authorName}
          gender={item.authorGender}
          classes={classes}
        />
      )}
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
  category,
  type,
  handleTypeChange,
}) => (
  <div>
    <Helmet>
      <title>
        {`${getCategoryName(category)} | ${PAGE_TITLE_BASE}`}
      </title>
    </Helmet>
    {
      category !== 3 && category !== 2 && (
        <Menu
          onClick={handleTypeChange}
          selectedKeys={[type]}
          theme="dark"
          mode="horizontal"
        >
          <Menu.Item key="all">
            全部
          </Menu.Item>
          <Menu.Item key="hkg">
            高登
          </Menu.Item>
          <Menu.Item key="lihkg">
            LIHKG
          </Menu.Item>
          <Menu.Item key="hot">
            熱門 (LIHKG)
          </Menu.Item>
        </Menu>
      )
    }
    {
      category === 2 && (
        <Menu
          onClick={handleTypeChange}
          selectedKeys={[type]}
          theme="dark"
          mode="horizontal"
        >
          <Menu.Item key="all">
            全部
          </Menu.Item>
          <Menu.Item key="hkg">
            高登
          </Menu.Item>
          <Menu.Item key="lihkg">
            LIHKG
          </Menu.Item>
          <Menu.Item key="daily">
            本日 (LIHKG)
          </Menu.Item>
          <Menu.Item key="weekly">
            本週 (LIHKG)
          </Menu.Item>
        </Menu>
      )
    }
    <List
      locale={{
        emptyText: '乜都冇，試下F5',
      }}
      itemLayout="vertical"
      dataSource={topics}
      renderItem={renderItem(classes, match, type)}
      footer={
        topics.length > 0
        && !loading
        && <Footer className={classes.footer} loadMore={handleLoadMore} />
      }
    >
      {loading && <LoadingIndicator />}
    </List>
  </div>
);
Topics.propTypes = {
  category: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
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
    status: state.topic.status,
    loading: state.topic.status === FETCH_TOPICS,
    error: state.topic.error,
  }), { fetchTopicsAction: fetchTopics }),
  withProps(({
    match,
    location,
  }) => {
    const { category } = match.params;
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('type');
    let type = 'all';
    if (Number(category) === 2 && (q === 'daily' || q === 'weekly' || q === 'lihkg' || q === 'hkg')) {
      type = q;
    } else if (Number(category) !== 2 && (q === 'hot' || q === 'hkg' || q === 'lihkg')) {
      type = q;
    }
    return ({
      category: Number(category),
      type,
    });
  }),
  lifecycle({
    componentDidMount() {
      const {
        category,
        type,
        fetchTopicsAction,
      } = this.props;
      /* eslint-disable no-underscore-dangle */
      if (window.__SS_RENDERED__) {
        delete window.__SS_RENDERED__;
        /* eslint-enable */
      } else {
        fetchTopicsAction({ category, type }, { reset: true });
      }
    },
    componentDidUpdate(prevProps) {
      if (prevProps.category !== this.props.category || prevProps.type !== this.props.type) {
        // Changed to other category / type, fetch with reset
        const { category, type } = this.props;
        this.props.fetchTopicsAction({ category, type }, { reset: true });
      }
      if (prevProps.status !== 'ERROR' && this.props.status === 'ERROR') {
        message.error(this.props.error);
      }
    },
  }),
  withHandlers({
    handleTypeChange: ({ history, match }) => ({ key }) => {
      history.push(`/topics/${match.params.category}?type=${key}`);
    },
    handleLoadMore: ({ category, type, fetchTopicsAction }) => () => {
      fetchTopicsAction({ category, type });
    },
  }),
  injectSheet(styles),
  pure,
);

export default enhance(Topics);
