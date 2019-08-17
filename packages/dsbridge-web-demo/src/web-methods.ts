import dsbridge from 'dsbridge-async';

dsbridge.register('web', {
  add: (a: number, b: number) => a + b,

  testNativeMethods: () => {
    console.log('native.hello', dsbridge.call('native.hello', 'Jack'));

    dsbridge.call('native.helloAsync', 'Jack', argsJson => {
      const { data } = JSON.parse(argsJson);
      console.log('native.helloAsync', data);
    });

    console.log(
      'hasNativeMethod("native.hello", "syn")',
      dsbridge.hasNativeMethod('native.hello', 'syn')
    );

    console.log(
      'hasNativeMethod("native.helloAsync", "asyn")',
      dsbridge.hasNativeMethod('native.helloAsync', 'asyn')
    );

    console.log(
      'hasNativeMethod("native.world", "syn")',
      dsbridge.hasNativeMethod('native.world', 'syn')
    );
  },
});

dsbridge.registerAsyn('web-async', {
  add: (a: number, b: number, cb: (sum: number) => void) => cb(a + b),
});
