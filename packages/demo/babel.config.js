module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/typescript', '@babel/react', '@babel/env'];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
