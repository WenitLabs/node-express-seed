const fs = require('fs');
const path = require('path');
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common');
// eslint-disable-next-line
const { CheckerPlugin } = require('awesome-typescript-loader');
// eslint-disable-next-line
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const sourceMapSupportModule = "require('source-map-support').install({environment: 'node'});\n\n";

let output = { path: path.join(process.cwd(), '_dev'), filename: 'bundle.js' };
if (nodeEnv === 'production') {
  output = { path: path.join(process.cwd(), '_dist'), filename: 'server.js' };
}

const rules = webpackCommonConfig.module.rules.concat();
delete webpackCommonConfig.module;

const webpackConfig = merge(webpackCommonConfig, {
  mode: nodeEnv || 'none',
  devtool: 'source-map',
  entry: [
    './server.babel.js',
  ],
  output,
  target: 'node',
  module: {
    rules,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: sourceMapSupportModule,
      raw: true,
      entryOnly: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: nodeEnv === 'production',
      __DEV__: nodeEnv === 'development',
      'process.env.NODE_ENV': `"${nodeEnv}"`,
    }),
    new webpack.IgnorePlugin(/vertx/),
    new CheckerPlugin(),
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false,
    }),
  ],
  externals: nodeModules,
});

module.exports = webpackConfig;
