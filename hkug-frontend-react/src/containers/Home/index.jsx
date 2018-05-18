import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import injectSheet from 'react-jss';

const styles = theme => ({
  container: {
    margin: `${theme.margin}px ${theme.margin}px 0`,
  },
});

const GitHubLink = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/hkgos/hkug"
  >
    GitHub
  </a>
);

const Home = ({ classes }) => (
  <div className={classes.container}>
    <section>
      <h1>HKUG 香港聯登</h1>
      <p>高登 ＋ 連登 ＝ 聯登</p>
    </section>
    <section>
      <h1>目標</h1>
      <p>建立一個可以同時觀看高登及連登的討論區，方便兩登都想留意的用家。</p>
    </section>
    <section>
      <h1>問題回報</h1>
      <p>這是一個開源項目，有問題請到 <GitHubLink /> 回報。
      </p>
    </section>
  </div>
);

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const enhance = compose(
  injectSheet(styles),
  pure,
);

export default enhance(Home);
