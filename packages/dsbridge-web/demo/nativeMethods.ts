import { addNativeMethod, removeNativeMethod } from 'dsbridge-web';

addNativeMethod<[string], string>('native.hello', ([name]) => `Hello, ${name}`);

addNativeMethod<[string], string>(
  'native.helloAsync',
  async ([name]) => `Hello, ${name}`
);

removeNativeMethod('native.another');
