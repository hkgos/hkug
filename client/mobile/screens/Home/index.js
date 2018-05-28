import React from 'react';
import { StyleSheet, WebView, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import Header from '../Header';

const styles = StyleSheet.create({
  webView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <WebView
      style={styles.webView}
      startInLoadingState
      renderLoading={() => (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicator}
        />
      )}
      source={{ uri: 'https://github.com/hkgos/hkug/blob/master/README.md' }}
    />
  </Container>
);

export default Home;
