import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text, List, ListItem, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { modules } from 'hkug-client-core';
import Header from '../Header';
import Loading from '../../components/Loading';

const { fetchTopics } = modules.topic;

const styles = StyleSheet.create({
  title: {
    marginLeft: 0,
    marginRight: 0,
  },
  subTitle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

class Topics extends Component {
  componentWillMount() {
    const category = this.props.navigation.getParam('category');
    this.props.fetchTopics({ category }, { reset: true });
  }
  componentDidUpdate(prevProps) {
    if (this.props.navigation.getParam('category') !== prevProps.navigation.getParam('category')) {
      this.props.fetchTopics({ category: this.props.navigation.getParam('category') }, { reset: true });
    }
  }
  render() {
    const {
      navigation,
      topics,
    } = this.props;
    return (
      <Container>
        <Header navigation={navigation} drawer />
        {this.props.loading ?
          <Loading /> :
          <Content>
            <List
              dataArray={topics}
              renderRow={t => (
                <ListItem
                  noIndent
                  onPress={() =>
                    navigation.navigate('Thread', {
                      id: t.topicId,
                      forum: t.forum,
                      title: t.title,
                      href: t.href,
                      state: navigation.state,
                    })
                  }
                >
                  <Body>
                    <Text style={styles.title}>{t.title}</Text>
                    <Text note style={styles.subTitle}>{t.authorName}</Text>
                    <View style={styles.infoRow}>
                      <Icon name="thumbs-up" style={styles.icon} />
                      <Text note>{t.like}</Text>
                      <Icon name="thumbs-down" style={styles.icon} />
                      <Text note>{t.dislike}</Text>
                      <Icon name="chatboxes" style={styles.icon} />
                      <Text note>{t.totalReplies}</Text>
                      <Icon name="time" style={styles.icon} />
                      <Text note>{moment(t.lastReplyDate).fromNow()}</Text>
                    </View>
                  </Body>
                </ListItem>
              )}
            />
          </Content>
        }
      </Container>
    );
  }
}

export default connect(state => ({
  topics: state.topic.topics,
  loading: state.topic.isFetchingTopics,
  isError: state.topic.isFetchTopicsError,
  error: state.topic.fetchTopicsError,
}), { fetchTopics })(Topics);
