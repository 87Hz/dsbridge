import dsbridge from 'dsbridge';

dsbridge.register('wallet-core.add', ([a, b]: [number, number]) => a + b);

dsbridge.registerAsyn(
  'wallet-core.add-asyn',
  ([a, b]: [number, number], cb: (sum: number) => void) => cb(a + b)
);

dsbridge.register('wallet-core.greet', () => {
  // get name from host
  const name = 0;

  // return hello, name
  return `Hello, ${name}`;
});
