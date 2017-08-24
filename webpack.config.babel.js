import { join } from 'path';

const include = join(__dirname, 'src')

export default {
  entry: {
  'bundle': join(__dirname, './index')
  },
  output: {
    path: join(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Regio',
  },
  devServer: {
    contentBase: join(__dirname, './examples'),
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include},
    ]
  }
}
