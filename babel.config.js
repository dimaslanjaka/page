module.exports = function (_api) {
  return {
    plugins: ['macros'],
    presets: ['@babel/preset-env', '@babel/preset-react'],
  };
};
