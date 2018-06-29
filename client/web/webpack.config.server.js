const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/server/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    // clean output folder before build
    new CleanWebpackPlugin([
      // clean all files build by webpack
      path.resolve(__dirname, 'dist'),
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader?emitFile=false',
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader?emitFile=false',
      },
    ],
  },
};
