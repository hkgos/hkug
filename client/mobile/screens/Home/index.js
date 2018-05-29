import React from 'react';
import { Container } from 'native-base';
import Header from '../Header';
import LoadingWebView from '../../components/LoadingWebView';

const Home = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} drawer />
    <LoadingWebView source={{ uri: 'https://github.com/hkgos/hkug/blob/master/README.md' }} />
  </Container>
);

export default Home;
