/* eslint-disable func-names */
import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    alias: {
      actions: path.resolve(__dirname, '../src/actions'),
      models: path.resolve(__dirname, '../src/model'),
      ActionTypes: path.resolve(__dirname, '../src/constants/ActionTypes.js'),
      components: path.resolve(__dirname, '../src/components'),
      common: path.resolve(__dirname, '../src/components/common'),
    },
    // root: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../node_modules/react-routing/src'),
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
      }, {
        test: /\.(css|scss)$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=` +
          `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
          'postcss-loader?parser=postcss-scss',
        ],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      }, {
        test: /\.jade$/,
        loader: 'jade-loader',
      },
    ],
  },

  postcss: function plugins(bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
    ];
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: './src/client.js',
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'eval-source-map' : false,
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),
    new AssetsPlugin({
      path: path.join(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,

          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
  ],
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
  entry: './src/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    /^\.\/assets$/,
    function filter(context, request, cb) {
      // 匹配上述自定义的 alias, 防止 alias 中的模块被作为外部模块忽略
      const alias = new RegExp(`^(${Object.keys(config.resolve.alias).join('|')})`);
      const isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(alias);
      cb(null, Boolean(isExternal));
    },
  ],
  node: {
    console: true,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],
});

export default [clientConfig, serverConfig];
