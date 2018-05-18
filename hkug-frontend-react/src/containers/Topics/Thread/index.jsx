import React from 'react';
import PropTypes from 'prop-types';
import { List, Row, Icon } from 'antd';
import {
  compose,
  lifecycle,
  withHandlers,
  pure,
} from 'recompose';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { fetchReplies } from '../../../modules/thread';
import Avatar from '../../../components/Avatar';
import IconText from '../../../components/IconText';
import Reply from '../../../models/Reply';

const styles = theme => ({
  container: {
  },
  content: {
    fontSize: 'medium',
    marginTop: '1em',
    marginBottom: '1em',
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
  backIcon: {
    cursor: 'pointer',
    color: '#fff',
    float: 'left',
    lineHeight: `${theme.headerHeight - (theme.padding * 2)}px`,
    marginRight: theme.margin,
  },
  list: {
    margin: '0 !important',
    padding: `0 ${theme.padding}px !important`,
  },
  item: {
    borderBottom: '1px solid #e8e8e8',
    paddingTop: theme.padding,
    paddingBottom: theme.padding,
  },
});

const Thread = ({
  classes,
  replies,
  title,
  handleBackClick,
}) => (
  <div className={classes.container}>
    <div className={classes.titleContainer}>
      <Icon
        style={{ fontSize: 22 }}
        className={classes.backIcon}
        type="arrow-left"
        onClick={handleBackClick}
      />
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
  </div>
);
Thread.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(PropTypes.instanceOf(Reply)).isRequired,
  handleBackClick: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  connect(state => ({
    title: state.thread.title,
    replies: state.thread.replies,
  }), { fetchReplies }),
  lifecycle({
    componentWillMount() {
      const query = new URLSearchParams(this.props.location.search);
      let page = query.get('page');
      if (!page || page < 1) {
        page = 1;
      }
      const [forum, thread] = this.props.match.params.thread.split('+');
      this.props.fetchReplies({ thread, page, forum });
    },
  }),
  withHandlers({
    handleBackClick: ({ history }) => () => {
      history.goBack();
    },
  }),
  pure,
);

export default enhance(Thread);
