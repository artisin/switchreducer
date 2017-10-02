const fs            = require('fs');
const path          = require('path');
const _             = require('lodash');
const webpack       = require('webpack');
const nodeExternals = require('webpack-node-externals');
const dev           = process.env.NODE_ENV === 'dev';

/**
 * Base Webpack Config
 */
const base = {
  entry: {
    'spirit-gun': path.resolve(__dirname, './lib/index.js')
  },
  devtool: dev ? '#eval-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  },
  plugins: dev ? [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({debug: true})
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // Appends eslint-disable
    new webpack.BannerPlugin({
      banner: '\n\n/* eslint-disable */\n',
      raw: true
    }),
    // Appends the License into the library builds
    new webpack.BannerPlugin(fs.readFileSync(path.join(process.cwd(), './LICENSE.txt'), 'utf8')),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
};


/**
 * Node Build
 */
const node = _.defaultsDeep({}, base);
node.target = 'node';
node.externals = [nodeExternals()];

/**
 * Web Build
 */
const web = _.defaultsDeep({}, base);
web.target = 'web';
web.output.filename = '[name].browser.js';

/**
 * Web Min Build
 */
const webMin = _.defaultsDeep({}, base);
webMin.target = 'web';
webMin.output.filename = '[name].browser.min.js';
if (!dev) {
  webMin.plugins.push(new webpack.optimize.UglifyJsPlugin());
}


module.exports = dev
               ? [web]
               :
                 // Remove or comment out if you do not want
                 // webpack to build a specific version
                 // node, web, webMin
                 [node, web, webMin];

