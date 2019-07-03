// Load dsbridge-web.preload
import '../dist/preload';
// Load wallet.core
import './wallet.core';
// Load dsbridge-web library
import { callHandler, hasJavascriptMethod } from '../dist';

// ---------------------------------------------
// check handlers
console.log(
  'has sync handler wallet-core.add?',
  hasJavascriptMethod('wallet-core.add')
);

console.log(
  'has async handler wallet-core.add-asyn?',
  hasJavascriptMethod('wallet-core.add-asyn', true)
);

console.log('has sync handler add?', hasJavascriptMethod('add'));
console.log('has async handler add-asyn?', hasJavascriptMethod('add-asyn'));

// ---------------------------------------------
// call sync function
const sum = callHandler('wallet-core.add', [1, 20]);
console.log('sum', sum);

// ---------------------------------------------
// call async function
callHandler('wallet-core.add-asyn', [10, 2], (sum: number) => {
  console.log('asyn sum', sum);
});
