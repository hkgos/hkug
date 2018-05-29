import React from 'react';
import { WebView } from 'react-native';

import Loading from '../Loading';

const LoadingWebView = props => (
  <WebView
    startInLoadingState
    renderLoading={Loading}
    {...props}
  />
);

export default LoadingWebView;
