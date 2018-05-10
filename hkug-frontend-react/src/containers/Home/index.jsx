import React from 'react';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';

const styles = {
};

const Home = () => (
  <div />
);

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(Home);
