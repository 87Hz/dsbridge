import '../dist/preload';
import './wallet.core';

import { callHandler } from '../dist';

const sum = callHandler('wallet-core.add', [1, 20]);
console.log('sum', sum);

callHandler('wallet-core.add-asyn', [10, 2], (sum: number) => {
  console.log('asyn sum', sum);
});

export const App = () => null;
