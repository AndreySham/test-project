var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const commonConfig = {
  context: path.resolve(__dirname, 'app'),
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  module: {
  rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }
  ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

const developmentConfig = () => {

  const config = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      watchContentBase: true,
      inline: true,
      hot: true,
      open: true,
      port: 8080,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  };

  return Object.assign({}, commonConfig, config);

};

const productionConfig = () => commonConfig;


module.exports = (env) => {

  if (env === 'production') {

    return productionConfig();

  }

  return developmentConfig();

};
