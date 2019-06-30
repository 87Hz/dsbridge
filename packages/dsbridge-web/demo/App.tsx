// Load dsbridge-web.preload
import '../dist/preload';
// Load wallet.core
import './wallet.core';
// Load dsbridge-web library
import { callHandler } from '../dist';

// Call sync function
const sum = callHandler('wallet-core.add', [1, 20]);
console.log('sum', sum);

// call async function
callHandler('wallet-core.add-asyn', [10, 2], (sum: number) => {
  console.log('asyn sum', sum);
});
