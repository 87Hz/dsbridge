// Load wallet.core
import './wallet.core';
// Load dsbridge-web library
import { callHandler, hasJavascriptMethod } from '../src';

// ---------------------------------------------
// check handlers
console.log(
  'has handler wallet-core.add?',
  hasJavascriptMethod('wallet-core.add')
);

console.log(
  'has handler wallet-core.addAsync?',
  hasJavascriptMethod('wallet-core.addAsync')
);

console.log('has handler add?', hasJavascriptMethod('add'));

// ---------------------------------------------
// call sync function
const sum = callHandler('wallet-core.add', [1, 20]);
console.log('sum', sum);

// // ---------------------------------------------
// // call async function
// callHandler('wallet-core.add-asyn', [10, 2], (sum: number) => {
//   console.log('asyn sum', sum);
// });
