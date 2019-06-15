/*
dsBridge.call(method,[arg,callback])
Call Java api synchronously and asynchronously。

method: Java API name， can contain the namespace。

arg: argument, Only one allowed, if you expect multiple parameters, you can pass them with a json object.

callback(String returnValue): callback to handle the result. only asynchronous invocation required.
*/
import { cond, defaultTo, mergeRight, has, pipe, prop } from 'ramda';

import {
  createFn,
  isFunc,
  isWindowDSBridge,
  isUserAgentDSBridge,
} from './utils';

type ResCallbackFn<R = any> = (res: R) => void;

const registerCb = (global: any, cb?: ResCallbackFn) => {
  const globalCbName = `dscb_${global.dscb++}`;
  global[globalCbName] = cb;
  return globalCbName;
};

const withCbIfAny = (global: any, cb?: ResCallbackFn) => (arg: object) => {
  if (isFunc(cb) && has('dscb', global)) {
    return mergeRight({ _dscbstub: registerCb(global, cb) })(arg);
  }

  return arg;
};

const _call = (global: any) => <R>(
  method: string,
  args?: object,
  callback?: ResCallbackFn<R>
) => {
  const arg = pipe(
    withCbIfAny(global, callback),
    JSON.stringify
  )({
    data: args,
  });

  const res = cond([
    [isWindowDSBridge, () => global._dsbridge.call(method, arg)],
    [isUserAgentDSBridge, () => prompt(`_dsbridge=${method}`, arg)],
  ])(global);

  return pipe(
    defaultTo<any>('{}'),
    JSON.parse,
    prop('data')
  )(res);
};

export const call = createFn(_call);
