import { ipcMain } from 'electron';
import {
  includes,
  T,
  F,
  startsWith,
  without,
  cond,
  always,
  equals,
} from 'ramda';

// interface ReturnType {
//   id: number;
//   complete: string;
//   data: any;
// }

// const global: any = window;
// let nextCallbackId = 0;
// const returnValSub = new Subject<string>();
// const returnValStream: Observable<ReturnType> = returnValSub.pipe(
//   map((json) => prop('data', JSON.parse(json)))
// );

/** ---------------------------------------------------------
 * nativeHandlers
 */
const isBuiltinMethodName = startsWith('_dsb.');
let nativeSyncHandlers: string[] = [];
let nativeAsyncHandlers: string[] = [];

/** ---------------------------------------------------------
 * addNativeMethod
 */
export const addNativeSyncMethod = <R = any>(
  method: string,
  func: (argJson: string) => R,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;

  // replace handler for this method
  ipcMain.removeAllListeners(method);
  ipcMain.on(method, (event: any, argJson: string) => {
    const ret = func(argJson);
    event.returnValue = ret;
  });

  // add to nativeSyncHandlers array
  nativeSyncHandlers.push(method);
};

export const addNativeAsyncMethod = <T = any, R = any>(
  method: string,
  func: (args: T) => Promise<R>,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;

  // replace handler for this method
  ipcMain.removeAllListeners(method);
  ipcMain.on(method, (event: any, arg: any) => {
    (async () => {
      const { data, _dscbstub } = arg;
      const ret = await func(data);
      const retChannel = `${method}-${_dscbstub}`;
      event.reply(retChannel, ret);
    })();
  });

  // add to nativeAsyncHandlers array
  nativeAsyncHandlers.push(method);
};

/** ---------------------------------------------------------
 * removeNativeMethod
 */
export const removeNativeMethod = (method: string) => {
  ipcMain.removeAllListeners(method);
  nativeSyncHandlers = without([method], nativeSyncHandlers);
  nativeAsyncHandlers = without([method], nativeAsyncHandlers);
};

/** ---------------------------------------------------------
 * builtinMethods
 */
addNativeSyncMethod(
  '_dsb.dsinit',
  always(JSON.stringify({ data: true })),
  true
);

addNativeSyncMethod(
  '_dsb.disableJavascriptDialogBlock',
  (args: { disable: boolean }) => {
    const { disable } = args;
    return JSON.stringify({ data: disable });
  },
  true
);

export type NativeMethodType = 'all' | 'syn' | 'asyn';
addNativeSyncMethod(
  '_dsb.hasNativeMethod',
  (args: { name: string; type: NativeMethodType }) => {
    const { name, type } = args;

    const hasMethod = includes(name);
    const hasMethodAsSync = hasMethod(nativeSyncHandlers);
    const hasMethodAsAsync = hasMethod(nativeAsyncHandlers);
    const hasMethodAsAll = hasMethodAsAsync && hasMethodAsSync;

    const ret = cond<NativeMethodType, boolean>([
      [equals<NativeMethodType>('syn'), always(hasMethodAsSync)],
      [equals<NativeMethodType>('asyn'), always(hasMethodAsAsync)],
      [equals<NativeMethodType>('all'), always(hasMethodAsAll)],
      [T, F],
    ])(type);

    return JSON.stringify({ data: ret });
  },
  true
);

addNativeSyncMethod('_dsb.returnValue', (arg) => {}, true);
