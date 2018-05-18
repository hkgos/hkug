import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';
import ErrorPage from '../Error';

const styles = {
  '@keyframes loading': {
    '0%': 'background-position: 0 50%',
    '50%': 'background-position: 100% 50%',
    to: 'background-position: 0 50%',
  },
  loading: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    'background-image': 'linear-gradient(125deg,#fff,#f3f3f3 41%,#ededed 0,#fff)',
    'background-size': '200% 100%',
    animation: 'loading 3s ease infinite',
  },
};

const Loading = ({
  classes,
  error,
  pastDelay,
  retry,
}) => {
  if (error) {
    return <ErrorPage retry={retry} />;
  } else if (pastDelay) {
    return <div className={classes.loading} />;
  }
  return null;
};
Loading.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  error: PropTypes.bool, // eslint-disable-line react/require-default-props
  pastDelay: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(Loading);
