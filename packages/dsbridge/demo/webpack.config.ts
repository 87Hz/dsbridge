import { join } from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

export default (): Configuration => ({
  entry: './src/index.tsx',

  devServer: {
    compress: false,
    historyApiFallback: true,
    contentBase: join(__dirname, 'public'),
    host: '0.0.0.0',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx$/,
        use: ['babel-loader'],
      },
    ],
  },
});
