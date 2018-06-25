import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  compose,
  pure,
  lifecycle,
  withStateHandlers,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose';
import injectSheet from 'react-jss';
import showdown from 'showdown';

import { PAGE_TITLE_BASE } from '../../constants';
import Loading from '../../components/Loading';
import Delay from '../../components/Delay';

const styles = theme => ({
  container: {
    margin: `${theme.margin}px ${theme.margin}px 0`,
    '& img': {
      maxWidth: '100%',
    },
  },
});

const Home = ({ classes, createMarkup }) => (
  <div>
    <Helmet>
      <title>
        {PAGE_TITLE_BASE}
      </title>
    </Helmet>
    <div
      className={classes.container}
      dangerouslySetInnerHTML={createMarkup()} // eslint-disable-line react/no-danger
    />
  </div>
);

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  createMarkup: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withStateHandlers(
    () => ({
      text: '',
      isLoading: false,
      isError: false,
    }),
    {
      setText: () => value => ({ text: value }),
      setLoading: () => value => ({ isLoading: value }),
      setError: () => value => ({ isError: value }),
    },
  ),
  withHandlers({
    fetchReadme: ({
      setText,
      setLoading,
      setError,
    }) => () => {
      setLoading(true);
      fetch('https://raw.githubusercontent.com/hkgos/hkug/master/README.md')
        .then(res => res.text())
        .then((text) => { setText(text); setLoading(false); })
        .catch(() => { setError(true); });
    },
    createMarkup: ({ text }) => () => {
      const converter = new showdown.Converter();
      converter.setFlavor('github');
      const html = converter.makeHtml(text);
      return {
        __html: html,
      };
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchReadme();
    },
  }),
  branch(
    ({ isLoading, isError }) => isLoading || isError,
    renderComponent(({ fetchReadme, isError }) => (
      <Delay>
        <Loading error={isError} retry={fetchReadme} />
      </Delay>
    )),
  ),
  pure,
);

export default enhance(Home);
