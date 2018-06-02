import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import {
  compose,
  pure,
} from 'recompose';
import injectSheet from 'react-jss';

const styles = {
  loadingIndicator: {
    textAlign: 'center',
    padding: 16,
  },
};

const LoadingIndicator = ({ classes, className, ...rest }) => (
  <div className={`${classes.loadingIndicator} ${className}`} {...rest}>
    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
  </div>
);
LoadingIndicator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};
LoadingIndicator.defaultProps = {
  className: '',
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(LoadingIndicator);
