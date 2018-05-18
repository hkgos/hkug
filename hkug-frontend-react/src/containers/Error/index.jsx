import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';

const styles = {
  container: {
    marginTop: '70%',
    textAlign: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 'xx-large',
  },
};

const ErrorPage = ({ classes, retry }) => (
  <div className={classes.container}>
    <div className={classes.text}>發生錯誤</div>
    <div>
      <Button
        size="large"
        shape="circle"
        icon="reload"
        onClick={retry}
      />
    </div>
  </div>
);
ErrorPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  retry: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  pure,
);

export default enhance(ErrorPage);
