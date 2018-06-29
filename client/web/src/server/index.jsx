import https from 'https';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { Helmet } from 'react-helmet';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { modules } from 'hkug-client-core';
import configureStore from '../store/configureStore';
import App from '../containers/App';

const { fetchTopics } = modules.topic;
const { fetchReplies } = modules.thread;

if (typeof window === 'undefined') {
  global.window = {};
}

function renderFullPage({
  indexHtml,
  style,
  title,
  content,
  script,
  preloadedState,
}) {
  let search = '</head>';
  let bp = indexHtml.search(search);
  let before = indexHtml.slice(0, bp);
  let after = indexHtml.slice(bp);
  const addStyle = `${before}<style type="text/css" id="ssr-styles">${style}</style>${after}`;
  search = '</body>';
  bp = addStyle.search(search);
  before = addStyle.slice(0, bp);
  after = addStyle.slice(bp);
  const addScript = `${before}${script}${after}`;
  search = '<div id="root"></div>';
  bp = addScript.search(search) + search.length;
  before = addScript.slice(0, bp);
  after = addScript.slice(bp);
  const addStore = `${before}<script>window.__SS_RENDERED__ = true; window.__PRELOADED_STATE__ = ${preloadedState}</script>${after}`;
  search = '<div id="root">';
  bp = addStore.search(search) + search.length;
  before = addStore.slice(0, bp);
  after = addStore.slice(bp);
  const full = `${before}${content}${after}`;
  if (title.match(/>.+<\//)) {
    return full.replace(/<title>.+<\/title>/, title);
  }
  return full;
}

const ssr = ({
  indexHtml,
  stats,
  action,
  name,
  req,
  res,
}) => {
  const store = configureStore();
  const unsubscribe = store.subscribe(() => {
    const state = (store.getState())[name];
    if (state.status !== action.type) {
      unsubscribe();
      const sheets = new SheetsRegistry();
      const dynamicModules = [];
      const content = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => dynamicModules.push(moduleName)}>
          <JssProvider registry={sheets}>
            <App store={store} browser={false} url={req.url} />
          </JssProvider>
        </Loadable.Capture>,
      );
      const helmet = Helmet.renderStatic();
      const title = helmet.title.toString();
      const bundles = getBundles(stats, dynamicModules);
      const script = bundles.map(bundle => `<script src="/${bundle.file}" type="text/javascript"></script>`).join('\n');
      const style = sheets.toString();
      const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
      res.send(renderFullPage({
        indexHtml,
        title,
        style,
        content,
        script,
        preloadedState,
      }));
    }
  });
  store.dispatch(action);
};

export const renderHomePage = ({ indexHtml, stats }) => (req, res, next) => {
  https.get('https://raw.githubusercontent.com/hkgos/hkug/master/README.md', (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      global.window.__README__ = data; // eslint-disable-line no-underscore-dangle
      const store = configureStore();
      const sheets = new SheetsRegistry();
      const dynamicModules = [];
      const content = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => dynamicModules.push(moduleName)}>
          <JssProvider registry={sheets}>
            <App store={store} browser={false} url={req.url} />
          </JssProvider>
        </Loadable.Capture>,
      );
      const helmet = Helmet.renderStatic();
      const title = helmet.title.toString();
      const bundles = getBundles(stats, dynamicModules);
      const readmeScript = [`<script>window.__README__ = ${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`];
      const script = readmeScript.concat(bundles.map(bundle => `<script src="/${bundle.file}" type="text/javascript"></script>`)).join('\n');
      const style = sheets.toString();
      const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
      res.send(renderFullPage({
        indexHtml,
        title,
        style,
        content,
        script,
        preloadedState,
      }));
    });
  }).on('error', (err) => {
    next(err);
  });
};

export const renderTopicListPage = ({ indexHtml, stats }) => (req, res) => {
  const { category } = req.params;
  const { type } = req.query;
  const action = fetchTopics({ category, type }, { reset: true });
  ssr({
    name: 'topic',
    indexHtml,
    stats,
    action,
    req,
    res,
  });
};

export const renderThreadPage = ({ indexHtml, stats }) => (req, res) => {
  const { thread } = req.params;
  const { forum, page } = req.query;
  const action = fetchReplies({
    thread,
    page,
    forum,
  });
  ssr({
    name: 'thread',
    indexHtml,
    stats,
    action,
    req,
    res,
  });
};
