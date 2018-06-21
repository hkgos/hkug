import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import injectSheet from 'react-jss';
import showdown from 'showdown';

import { PAGE_TITLE_BASE } from '../../constants';
import Loading from '../../containers/Loading';


const styles = theme => ({
  container: {
    margin: `${theme.margin}px ${theme.margin}px 0`,
    '& img': {
      maxWidth: '100%',
    },
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.converter = new showdown.Converter();
    this.state = {
      text: '',
      pastDelay: false,
      isLoading: false,
      isError: false,
    };
  }

  componentWillMount() {
    this.fetchReadme();
  }

  componentWillUnmount() {
    // Clear all async tasks
    clearTimeout(this.timer);
    this.abortController.abort();
  }

  fetchReadme = () => {
    this.setState({ pastDelay: false, isLoading: true });
    this.timer = setTimeout(() => { this.setState({ pastDelay: true }); }, 500);
    fetch('https://raw.githubusercontent.com/hkgos/hkug/master/README.md', {
      method: 'get',
      signal: this.abortController.signal,
    })
      .then(res => res.text())
      .then((text) => { this.setState({ text, isLoading: false, isError: false }); })
      .catch(() => { this.setState({ isError: true }); });
  }

  createMarkup = () => {
    this.converter.setFlavor('github');
    const html = this.converter.makeHtml(this.state.text);
    return {
      __html: html,
    };
  }

  render() {
    const { isLoading, isError, pastDelay } = this.state;
    const { classes } = this.props;
    if (isLoading || isError) {
      return <Loading error={isError} retry={this.fetchReadme} pastDelay={pastDelay} />;
    }
    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE_BASE}</title>
        </Helmet>
        <div
          className={classes.container}
          dangerouslySetInnerHTML={this.createMarkup()} // eslint-disable-line react/no-danger
        />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default injectSheet(styles)(Home);
