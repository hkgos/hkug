const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appMountId = 'root';
const lang = 'zh-Hant';
const assetsPrefix = 'assets';
const contentBase = 'public';

const devMode = process.env.NODE_ENV !== 'production';

const mode = devMode ? 'development' : 'production';
const devServer = devMode ? {
  host: 'localhost',
  port: 8080,
  // return app bundle at any request
  historyApiFallback: true,
  // enables Hot Module Replacement
  hot: true,
  // enables Hot Module Replacement without page refresh as fallback in case of build failures
  hotOnly: true,
  // static content base path
  contentBase: path.resolve(__dirname, contentBase),
} : undefined;
const optimization = {
  splitChunks: {
    chunks: 'all',
  },
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
    }),
  ],
};
const plugins = [
  // clean output folder before build
  new CleanWebpackPlugin([
    // clean all files build by webpack
    path.resolve(__dirname, contentBase, assetsPrefix),
    // clean index.html only, keep other files not build by webpack
    path.resolve(__dirname, contentBase, 'index.html'),
    path.resolve(__dirname, contentBase, 'index-zh-Hant.html'),
    path.resolve(__dirname, contentBase, 'index-zh-Hans.html'),
  ]),
  // auto generate index.html by template
  new HtmlWebpackPlugin({
    // Required
    inject: false,
    // template file
    template: '!!pug-loader!./index.pug',
    // for better HMR
    alwaysWriteToDisk: true,
    // Optional
    lang,
    appMountId,
    title: 'HKUG',
  }),
  // enable alwaysWriteToDisk option
  new HtmlWebpackHarddiskPlugin(),
  // load only `moment/locale/zh-tw.js`
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-tw/),
];
if (devMode) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PROXY: JSON.stringify(true),
      },
    }),
    // keep vendor bundle unchanged when only module.id was changed, see:
    // https://webpack.js.org/guides/caching/#module-identifiers
    new webpack.HashedModuleIdsPlugin(),
    // extract css files
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.join(assetsPrefix, 'css', '[name].[hash].css'),
      chunkFilename: path.join(assetsPrefix, 'css', '[id].[hash].css'),
    }),
  );
}

module.exports = {
  mode,
  entry: './src/index.jsx',
  devServer,
  plugins,
  optimization,
  // config which extensions will be resolved, default only reslove .js only
  // to make
  // import module from './module'
  // works for .jsx extension, add 'jsx' to the extensions config
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: !devMode,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: !devMode,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: { 'primary-color': '#3d5476' },
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: path.join(assetsPrefix, 'media', devMode ? '[name].[ext]' : '[name].[hash].[ext]'),
        },
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader',
        options: {
          name: path.join(assetsPrefix, 'media', devMode ? '[name].[ext]' : '[name].[hash].[ext]'),
        },
      },
    ],
  },
  output: {
    // bundle name
    filename: path.join(assetsPrefix, 'js', devMode ? '[name].js' : '[name].[chunkhash].js'),
    // dynamic import() chunk
    chunkFilename: path.join(assetsPrefix, 'js', devMode ? '[name].js' : '[name].[chunkhash].js'),
    path: path.resolve(__dirname, contentBase),
    publicPath: '/',
  },
};
