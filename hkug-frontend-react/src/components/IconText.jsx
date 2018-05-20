import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import {
  compose,
  pure,
} from 'recompose';
import injectSheet from 'react-jss';

const styles = {
  icon: {
    marginRight: 8,
  },
};

const IconText = ({
  classes,
  icon,
  text,
  ...rest
}) => (
  <span {...rest}>
    <Icon type={icon} className={classes.icon} />
    {text}
  </span>
);

IconText.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.node,
};
IconText.defaultProps = {
  text: null,
};

const enhance = compose(injectSheet(styles), pure);

export default enhance(IconText);
