import { ipcMain, Event } from 'electron';
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

export interface IpcEvent extends Event {
  reply: (channel: string, msg: string) => void;
}

/** ---------------------------------------------------------
 * nativeHandlers
 */
export type NativeSyncHandler = (argsJson: string) => string | void;
export type NativeAsyncHandler = (argsJson: string) => Promise<string | void>;

const isBuiltinMethodName = startsWith('_dsb.');
let nativeSyncHandlers: string[] = [];
let nativeAsyncHandlers: string[] = [];

/** ---------------------------------------------------------
 * addNativeMethod
 */
export const addNativeSyncMethod = (
  method: string,
  func: NativeSyncHandler,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;

  // replace handler for this method
  ipcMain.removeAllListeners(method);
  ipcMain.on(method, (event: IpcEvent, argsJson: string) => {
    const ret = func(argsJson);
    event.returnValue = ret;
  });

  // add to nativeSyncHandlers array
  nativeSyncHandlers.push(method);
};

export const addNativeAsyncMethod = (
  method: string,
  func: NativeAsyncHandler,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;

  // replace handler for this method
  ipcMain.removeAllListeners(method);
  ipcMain.on(method, (event: IpcEvent, argsJson: string) => {
    (async () => {
      const { _dscbstub } = JSON.parse(argsJson);
      const ret = await func(argsJson);
      const retChannel = `${method}-${_dscbstub}`;
      ret && event.reply(retChannel, ret);
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
const noop = () => {};

addNativeSyncMethod(
  '_dsb.dsinit',
  always(JSON.stringify({ data: true })),
  true
);

addNativeSyncMethod('_dsb.disableJavascriptDialogBlock', noop, true);

export type NativeMethodType = 'all' | 'syn' | 'asyn';
addNativeSyncMethod(
  '_dsb.hasNativeMethod',
  (argsJson) => {
    const {
      data: { name, type },
    } = JSON.parse(argsJson);

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

addNativeSyncMethod('_dsb.returnValue', (argsJson) => {}, true);
