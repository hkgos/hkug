import React from 'react';
import { WebView } from 'react-native';
import { Container } from 'native-base';
import Header from '../Header';
import Loading from '../../components/Loading';

const Home = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <WebView
      startInLoadingState
      renderLoading={Loading}
      source={{ uri: 'https://github.com/hkgos/hkug/blob/master/README.md' }}
    />
  </Container>
);

export default Home;
