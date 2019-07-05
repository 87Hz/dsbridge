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
        rxjs: {
          transform: 'rxjs/${member}',
          preventFullImport: true,
        },
        'rxjs/operators': {
          transform: 'rxjs/operators/${member}',
          preventFullImport: true,
        },
      },
    ],
  ],
};
