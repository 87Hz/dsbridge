import { ipcMain, IpcMainEvent, WebContents } from 'electron';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
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

let nextCallbackId = 0;
const returnValSub = new Subject<string>();

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
  ipcMain.on(method, (event: IpcMainEvent, argsJson: string) => {
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
  ipcMain.on(method, (event: IpcMainEvent, argsJson: string) => {
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
 * hasJavascriptMethod
 */
export const hasJavascriptMethod = (renderer: WebContents, method: string) =>
  new Promise<boolean>(resolve => {
    const retChannel = `_hasJavascriptMethod-${method}`;
    ipcMain.once(retChannel, (_event: IpcMainEvent, ret: boolean) => {
      resolve(ret);
    });

    renderer.send('_hasJavascriptMethod', method);
  });

/** ---------------------------------------------------------
 * callHandler
 */
const idMatched = (currId: number) => (argsJson: string) => {
  const {
    data: { id },
  } = JSON.parse(argsJson);
  return id === currId;
};

export interface CallHandlerInfo {
  method: string;
  data: string;
  callbackId: number;
}

export const callHandler = (
  renderer: WebContents,
  method: string,
  args: any = {}
): Promise<string> => {
  const id = nextCallbackId++;

  const info: CallHandlerInfo = {
    method,
    data: JSON.stringify(args),
    callbackId: id,
  };

  return new Promise(resolve => {
    returnValSub.pipe(first(idMatched(id))).subscribe(resolve);
    renderer.send('_handleMessageFromNative', info);
  });
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
  argsJson => {
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

addNativeSyncMethod(
  '_dsb.returnValue',
  argsJson => {
    returnValSub.next(argsJson);
  },
  true
);
