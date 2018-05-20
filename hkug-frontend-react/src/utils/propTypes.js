import PropTypes from 'prop-types';

export const locationShape = PropTypes.shape({
  pathname: PropTypes.string,
  state: PropTypes.object,
  search: PropTypes.string,
  hash: PropTypes.string,
  key: PropTypes.string,
});

export const historyShape = PropTypes.shape({
  length: PropTypes.number,
  action: PropTypes.string,
  location: locationShape,
  push: PropTypes.func,
  replace: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  block: PropTypes.func,
});

export const matchShape = PropTypes.shape({
  params: PropTypes.object,
  isExact: PropTypes.bool,
  path: PropTypes.string,
  url: PropTypes.string,
});
