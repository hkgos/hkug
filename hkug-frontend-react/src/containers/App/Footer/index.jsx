import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';

const { Footer } = Layout;

const styles = {
  footer: {
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const AppFooter = ({ classes }) => (
  <Footer className={classes.footer}>
    HKUG ©2018 Created by HKGOS&nbsp;
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/hkgos/hkug"
    >
      <Icon type="github" />
    </a>
  </Footer>
);

AppFooter.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(AppFooter);
