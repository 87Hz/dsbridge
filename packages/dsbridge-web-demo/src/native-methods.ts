import {
  HandlerRes,
  addNativeSyncMethod,
  addNativeAsyncMethod,
  removeNativeMethod,
} from 'dsbridge-web';

addNativeSyncMethod('native.hello', (argsJson) => {
  const { data } = JSON.parse(argsJson);
  const res: HandlerRes = { data: `Hello, ${data}` };
  return JSON.stringify(res);
});

addNativeAsyncMethod('native.helloAsync', async (argsJson) => {
  const { data } = JSON.parse(argsJson);
  const res: HandlerRes = { data: `Hello, ${data}` };
  return JSON.stringify(res);
});

removeNativeMethod('native.another');
