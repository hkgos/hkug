import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { compose, withProps, pure } from 'recompose';
import injectSheet from 'react-jss';
import { matchPath, withRouter } from 'react-router-dom';
import allCategories from '../../../utils/categories';

const { Header } = Layout;

const styles = theme => ({
  header: {
    background: theme.primaryColor8,
    padding: 0,
    textAlign: 'center',
    color: '#fff',
  },
});

const AppHeader = ({ classes, header }) => (
  <Header className={classes.header}>
    {header}
  </Header>
);

AppHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  header: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withProps(({ location }) => {
    const match = matchPath(location.pathname, { path: '/topics/:id' });
    let header = 'HKUG 香港聯登';
    if (match && match.params.id) {
      const category = allCategories.find(c => c.id === Number(match.params.id));
      if (category) {
        header = category.name;
      }
    }
    return ({ header });
  }),
  pure,
);

export default enhance(AppHeader);
