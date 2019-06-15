/*
Test whether the handler exist in Java, the handlerName can contain the namespace.
type: optional["all"|"syn"|"asyn" ], default is "all".

dsBridge.hasNativeMethod('testAsyn')

//test namespace method
dsBridge.hasNativeMethod('test.testAsyn')

// test if exist a asynchronous function that named "testSyn"
dsBridge.hasNativeMethod('testSyn','asyn') //false
*/
import { call } from './call';

export const hasNativeMethod = (
  name: string,
  type: 'all' | 'asyn' | 'syn' = 'all'
) => call('_dsb.hasNativeMethod', { name, type });
