import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';

const styles = theme => ({
  container: {
    height: 'calc(100vh - 64px - 69px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    display: 'inline-block',
    margin: theme.marginSmall,
    fontSize: 'x-large',
  },
  button: {
    display: 'inline-block',
    margin: theme.marginSmall,
  },
  detail: {
    color: theme.secondaryColor,
    margin: theme.margin,
  },
});

const ErrorPage = ({ classes, retry, detail }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <div className={classes.title}>發生錯誤</div>
      <div className={classes.button}>
        <Button
          type="primary"
          size="large"
          shape="circle"
          icon="reload"
          onClick={retry}
        />
      </div>
      <div className={classes.detail}>{detail}</div>
    </div>
  </div>
);
ErrorPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  retry: PropTypes.func.isRequired,
  detail: PropTypes.string,
};
ErrorPage.defaultProps = {
  detail: '未知的錯誤',
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(ErrorPage);
