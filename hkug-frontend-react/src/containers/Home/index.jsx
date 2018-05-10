import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';

const styles = {
};

const Home = ({ classes }) => (
  <div>HOME</div>
);
Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(Home);
