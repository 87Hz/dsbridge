/*
dsBridge.call(method,[arg,callback])
Call Java api synchronously and asynchronously。

method: Java API name， can contain the namespace。

arg: argument, Only one allowed, if you expect multiple parameters, you can pass them with a json object.

callback(String returnValue): callback to handle the result. only asynchronous invocation required.
*/
import { cond, defaultTo, F, ifElse, mergeRight, pipe, prop } from 'ramda';
import {
  createFn,
  isFunc,
  isWindowDSBridge,
  isUserAgentDSBridge,
} from './utils';

type ResCallbackFn<R = any> = (res: R) => void;

const getCbName = (global: any, cb?: ResCallbackFn) =>
  ifElse(
    isFunc,
    (cb: ResCallbackFn) => {
      const cbName = `dscb${global.dscb++}`;
      global[cbName] = cb;
      return cbName;
    },
    F
  )(cb);

const _call = (global: any) => <R>(
  method: string,
  args?: object,
  callback?: ResCallbackFn<R>
) => {
  const arg = pipe(
    mergeRight({ _dscbstub: getCbName(global, callback) }),
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
