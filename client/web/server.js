/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const Loadable = require('react-loadable');
const express = require('express');
const httpProxy = require('http-proxy');
const ssr = require('./dist/server.js'); // eslint-disable-line import/no-unresolved

const app = express();
const proxy = httpProxy.createProxyServer({});
const indexHtml = fs.readFileSync(path.resolve(__dirname, 'public', 'index.html'), 'utf8');
const stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'react-loadable.json'), 'utf8'));

app.use(compression());

app.get('/', ssr.renderHomePage({ indexHtml, stats }));
app.get('/topics/:category', ssr.renderTopicListPage({ indexHtml, stats }));
app.get('/topics/:category/:thread', ssr.renderThreadPage({ indexHtml, stats }));

app.use(express.static('public'));

app.use('/hkg-api-mobile', (req, res, next) => {
  proxy.web(req, res, {
    changeOrigin: true,
    autoRewrite: true,
    followRedirects: true,
    target: 'https://api-1.hkgolden.com/',
  }, (err) => {
    console.error(err);
    next(err);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

Loadable.preloadAll().then(() => {
  app.listen(8080, () => {
    console.log('Running on http://localhost:8080/');
  });
});
