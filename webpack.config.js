const path = require('path')

module.exports = {
  entry: './docs/main/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs/main/dist')
  },
  mode: 'development',
  externals: {
    'node-fetch': 'fetch',
    'text-encoding': 'TextEncoder',
    'whatwg-url': 'window',
    'isomorphic-fetch': 'fetch',
    '@trust/webcrypto': 'crypto',
    'fs': 'empty'
  }
}
