import './wallet.core';
import { callHandler, hasJavascriptMethod } from '../src';

// ---------------------------------------------
// hasJavascriptMethod
//
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
// callHandler
//
(async () => {
  // sync function
  const add = await callHandler('wallet-core.add', [1, 20]);
  console.log('add', add);

  // async function
  const addAsync = await callHandler('wallet-core.addAsync', [20, 20]);
  console.log('addAsync', addAsync);
})();
