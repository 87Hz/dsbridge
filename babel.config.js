module.exports = api => {
  api.cache.forever();

  const presets = [
    '@babel/preset-typescript',
    '@babel/react',
    ['@babel/preset-env', { exclude: ['@babel/plugin-transform-regenerator'] }],
  ];
  const plugins = ['ramda'];

  return { presets, plugins };
};
