import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';
import ErrorPage from '../Error';

const styles = theme => ({
  container: {
    height: 'calc(100vh - 64px - 69px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
    width: 64,
    height: 64,
    '& div': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      width: 51,
      height: 51,
      margin: 6,
      border: `6px solid ${theme.primaryColor}`,
      borderRadius: '50%',
      animation: 'loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      borderColor: `${theme.primaryColor} transparent transparent transparent`,
      '&:nth-child(1)': {
        animationDelay: '-0.45s',
      },
      '&:nth-child(2)': {
        animationDelay: '-0.3s',
      },
      '&:nth-child(3)': {
        animationDelay: '-0.15s',
      },
    },
  },
  '@keyframes loading': {
    '0%': 'transform: rotate(0deg)',
    '100%': 'transform: rotate(360deg)',
  },
});

// const styles = {
//   '@keyframes loading': {
//     '0%': 'background-position: 0 50%',
//     '50%': 'background-position: 100% 50%',
//     to: 'background-position: 0 50%',
//   },
//   loading: {
//     position: 'fixed',
//     width: '100%',
//     height: '100%',
//     'background-image': 'linear-gradient(125deg, #111 0%, #333 50%, #111 50%, #333 100%)',
//     'background-size': '200% 100%',
//     animation: 'loading 3s ease infinite',
//   },
// };

const Loading = ({
  classes,
  error,
  pastDelay,
  retry,
}) => {
  if (error) {
    return <ErrorPage retry={retry} />;
  } else if (pastDelay) {
    return (
      <div className={classes.container}>
        <div className={classes.loading}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
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
