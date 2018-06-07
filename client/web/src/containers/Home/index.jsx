import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, lifecycle, withStateHandlers, withHandlers, branch, renderComponent } from 'recompose';
import injectSheet from 'react-jss';
import showdown from 'showdown';

import Loading from '../../containers/Loading';


const styles = theme => ({
  container: {
    margin: `${theme.margin}px ${theme.margin}px 0`,
    '& img': {
      maxWidth: '100%',
    },
  },
});

const Home = ({ classes, createMarkup }) => (
  <div
    className={classes.container}
    dangerouslySetInnerHTML={createMarkup()} // eslint-disable-line react/no-danger
  />
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
      pastDelay: false,
      isLoading: false,
      isError: false,
    }),
    {
      setText: () => value => ({ text: value }),
      setPastDelay: () => value => ({ pastDelay: value }),
      setLoading: () => value => ({ isLoading: value }),
      setError: () => value => ({ isError: value }),
    },
  ),
  withHandlers({
    fetchReadme: ({
      setText,
      setPastDelay,
      setLoading,
      setError,
    }) => () => {
      setPastDelay(false);
      setLoading(true);
      setTimeout(() => { setPastDelay(true); }, 500);
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
    componentWillMount() {
      this.props.fetchReadme();
    },
  }),
  branch(
    ({ isLoading, isError }) => isLoading || isError,
    renderComponent(({ fetchReadme, isError, pastDelay }) =>
      <Loading error={isError} retry={fetchReadme} pastDelay={pastDelay} />),
  ),
  pure,
);

export default enhance(Home);
