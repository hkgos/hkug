import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loading = () => (
  <View style={styles.view}>
    <ActivityIndicator
      size="large"
    />
  </View>
);

export default Loading;
