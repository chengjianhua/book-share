// import webpackConfig from './webpack.config';
import path from 'path';

const config = {
  reslove: {
    alias: {
      actions: path.resolve(__dirname, '../src/actions'),
      models: path.resolve(__dirname, '../src/model'),
      ActionTypes: path.resolve(__dirname, '../src/constants/ActionTypes.js'),
      components: path.resolve(__dirname, '../src/components'),
      common: path.resolve(__dirname, '../src/components/common'),
    },
  },
};

export default config;
