import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';
import { SIDE_MENU_BREAK_POINT } from '../../../constants';

const { Footer } = Layout;

const styles = theme => ({
  footer: {
    zIndex: 10,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
    color: theme.invertTextColor,
    '& i': {
      color: theme.invertTextColor,
    },
  },
  [`@media only screen and (max-width: ${SIDE_MENU_BREAK_POINT}px)`]: {
    footer: {
      minWidth: '100vw',
    },
  },
});

const AppFooter = ({ classes }) => (
  <Footer className={classes.footer}>
    HKUG ©2018 Created by HKGOS&nbsp;&nbsp;
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
