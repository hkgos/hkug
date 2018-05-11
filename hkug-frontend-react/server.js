/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.static('public'));

app.use('/hkg-api', (req, res, next) => {
  proxy.web(req, res, {
    changeOrigin: true,
    autoRewrite: true,
    followRedirects: true,
    target: 'http://web.hkgolden.com/api',
  }, (err) => {
    console.error(err);
    next(err);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(8080, () => {
  console.log('HTTP server started on port 8080...');
});
