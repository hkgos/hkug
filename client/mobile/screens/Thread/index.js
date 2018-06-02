import React from 'react';
import { Container } from 'native-base';
import Header from '../Header';
import LoadingWebView from '../../components/LoadingWebView';

const Thread = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <LoadingWebView source={{ uri: navigation.getParam('href') }} />
  </Container>
);

export default Thread;
