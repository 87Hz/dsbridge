import {
  addNativeSyncMethod,
  addNativeAsyncMethod,
  removeNativeMethod,
  callHandler,
} from 'dsbridge-electron';

addNativeSyncMethod('hello', (argsJson) => {
  const { data: name } = JSON.parse(argsJson);
  return JSON.stringify({ data: `Hello, ${name}` });
});

addNativeAsyncMethod('helloAsync', async (argsJson) => {
  const { data: name } = JSON.parse(argsJson);
  return JSON.stringify({ data: `Hello, ${name}` });
});

removeNativeMethod('another');
