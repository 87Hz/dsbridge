module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        exclude: ['transform-regenerator'],
      },
    ],
  ],
  plugins: [
    [
      'transform-imports',
      {
        ramda: {
          transform: 'ramda/src/${member}',
          preventFullImport: true,
        },
      },
    ],
  ],
};
