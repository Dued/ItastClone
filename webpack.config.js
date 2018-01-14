const path = require('path');

module.exports = {
  //entry point
  entry: './src/js/main.js',
  //outputs
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public/js')
  },
  resolve: {
    alias: {
      "enchant.js": path.join(__dirname, './src/js/enchant.js')
    }
  }
};
