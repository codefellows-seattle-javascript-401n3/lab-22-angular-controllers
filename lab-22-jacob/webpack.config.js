let HTMLplugin = require('html-webpack-plugin');
module.exports = {
  entry: `${__dirname}/app/entry.js`, //same as saying require('./app/index.js')  --> where our very first JS file is.
  output: {
    filename: 'bundle.js', //gonna make a file called bundle.
    path: `${__dirname}/build` //in a directory called build....
  },
  plugins: [
    new HTMLplugin({
      template: `${__dirname}/app/index.html`
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|woff|ttf|svg).*/,
        loader: 'url?limit=10000&name=fonts/[hash].[ext]'
      }
    ]
  }
};
