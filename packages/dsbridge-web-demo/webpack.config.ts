import { join } from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

export default (): Configuration => ({
  entry: ['@babel/polyfill', './src/index.ts'],

  devServer: {
    compress: false,
    historyApiFallback: true,
    contentBase: join(__dirname, 'public'),
    host: '0.0.0.0',
  },

  resolve: {
    extensions: ['.ts'],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
    ],
  },
});
