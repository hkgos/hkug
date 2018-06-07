import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  container: {
    height: 'calc(100vh - 64px - 69px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: `0 ${theme.marginSmall}px 0px ${theme.marginSmall}px`,
    fontSize: 'x-large',
  },
  button: {
    margin: `0 ${theme.marginSmall}px 0px ${theme.marginSmall}px`,
  },
});

const ErrorPage = ({ classes, retry }) => (
  <div className={classes.container}>
    <div className={classes.text}>發生錯誤</div>
    <div className={classes.button}>
      <Button
        type="primary"
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
