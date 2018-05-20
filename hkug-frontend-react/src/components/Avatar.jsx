import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as AntdAvatar } from 'antd';
import {
  compose,
  pure,
} from 'recompose';
import injectSheet from 'react-jss';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  M: {
    color: theme.maleColor,
  },
  F: {
    color: theme.femaleColor,
  },
});

const Avatar = ({
  classes,
  src,
  name,
  gender,
  className,
}) => (
  <div className={`${classes.container} ${className}`}>
    {src && <AntdAvatar src={src} style={{ marginRight: 8 }} />}
    <div className={classes[gender] || ''}>
      {name}
    </div>
  </div>
);

Avatar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.node,
  gender: PropTypes.oneOf(['M', 'F']),
};
Avatar.defaultProps = {
  className: '',
  gender: undefined,
  src: undefined,
  name: null,
};

const enhance = compose(injectSheet(styles), pure);

export default enhance(Avatar);
