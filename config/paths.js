const path = require('path');

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),
  // Public path
  public: path.resolve(__dirname, '../public'),
  // Production files
  build: path.resolve(__dirname, '../dist'),
  // Temp directory
  tmp: path.resolve(__dirname, '../tmp'),
  // base path
  base: '/page/'
};
