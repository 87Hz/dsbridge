module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
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
