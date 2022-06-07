'use strict';

var utils = require('./utils');

var webpack = require('webpack');

var config = require('../config');

var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

var portfinder = require('portfinder');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [new webpack.DefinePlugin({
    'process.env': require('../config/dev.env')
  }), new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  new webpack.NoEmitOnErrorsPlugin(), new CopyWebpackPlugin([{
    from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'
  }, {
    from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'
  }, {
    from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js',
    to: 'js/'
  }]), // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })]
});
module.exports = new Promise(function (resolve, reject) {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort(function (err, port) {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port; // add port to devServer config

      devWebpackConfig.devServer.port = port; // Add FriendlyErrorsPlugin

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ["Your application is running here: http://".concat(config.dev.host, ":").concat(port)]
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }));
      resolve(devWebpackConfig);
    }
  });
});