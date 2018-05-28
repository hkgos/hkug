import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { modules } from 'hkug-client-core';
import Header from '../Header';

const { fetchTopics } = modules.topic;

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
    return (
      <Container>
        <Header navigation={this.props.navigation} />
        <Content>
          <List
            dataArray={this.props.topics}
            renderRow={topic => (
              <ListItem>
                <Text>{topic.title}</Text>
              </ListItem>
            )}
          />
        </Content>
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
