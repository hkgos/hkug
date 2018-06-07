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
    'background-image': 'linear-gradient(125deg, #111 0%, #333 50%, #111 50%, #333 100%)',
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
  error: PropTypes.bool,
  pastDelay: PropTypes.bool,
  retry: PropTypes.func.isRequired,
};
Loading.defaultProps = {
  error: false,
  pastDelay: true,
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(Loading);
