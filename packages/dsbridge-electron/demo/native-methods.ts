import {
  addNativeSyncMethod,
  addNativeAsyncMethod,
  removeNativeMethod,
} from 'dsbridge-electron';

addNativeSyncMethod<string, string>('hello', (name) =>
  JSON.stringify({ data: `Hello, ${name}` })
);

addNativeAsyncMethod<string, string>('helloAsync', async (name) =>
  JSON.stringify({ data: `Hello, ${name}` })
);

removeNativeMethod('another');
