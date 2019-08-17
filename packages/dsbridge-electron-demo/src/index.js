require('@babel/register')({
  extensions: ['.ts', '.js'],
  ignore: [/node_modules/],
  rootMode: 'upward',
});

require('./main');
