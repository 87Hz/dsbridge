import dsbridge from 'dsbridge';

dsbridge.register('wallet-core.add', ([a, b]: [number, number]) => a + b);

dsbridge.registerAsyn(
  'wallet-core.add-asyn',
  ([a, b]: [number, number], cb: (sum: number) => void) => cb(a + b)
);
