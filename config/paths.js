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
  // Project Working Directory
  cwd: path.resolve(__dirname, '..'),
  // base path
  base: '/page/'
};
