import dsbridge from 'dsbridge';

dsbridge.register('wallet-core.add', (a: number, b: number) => a + b);

dsbridge.registerAsyn(
  'wallet-core.add-asyn',
  (a: number, b: number, cb: (sum: number) => void) => {
    cb(a + b);
  }
);
