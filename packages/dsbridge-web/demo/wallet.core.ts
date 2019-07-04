import dsbridge from 'dsbridge';

dsbridge.register('wallet-core', {
  add: (a: number, b: number) => a + b,

  testNativeMethods: () => {
    console.log('native.hello', dsbridge.call('native.hello', ['HU Ze']));

    dsbridge.call('native.helloAsync', ['HU Ze'], (json: string) => {
      const { data } = JSON.parse(json);
      console.log('native.helloAsync', data);
    });
  },
});

dsbridge.registerAsyn('wallet-core', {
  addAsync: (a: number, b: number, cb: (sum: number) => void) => cb(a + b),
});
