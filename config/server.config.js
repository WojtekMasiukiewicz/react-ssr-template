const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')

const paths = require('./paths')

const server = {
  mode: process.env.API_MODE,
  name: 'server',
  target: 'node',

  entry: {
    server: [
      require.resolve('core-js/stable'),
      require.resolve('regenerator-runtime/runtime'),
      path.resolve(paths.srcServer, 'index.ts')
    ]
  },

  externals: [
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      whitelist: /\.css$/
    })
  ],

  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __SERVER__: 'true',
      __BROWSER__: 'false'
    })
  ],

  stats: {
    colors: true
  }
}

module.exports = server
