import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { pathOr, T, F, startsWith, has, always, cond, equals } from 'ramda';

let nextCallbackId = 0;
const global: any = window;
const returnValSub = new Subject<string>();

/** ---------------------------------------------------------
 * nativeHandlers
 */
export type NativeSyncHandler = (argsJson: string) => string | void;
export type NativeAsyncHandler = (argsJson: string) => Promise<string | void>;

const isBuiltinMethodName = startsWith('_dsb.');
const nativeSyncHandlers: Record<string, NativeSyncHandler> = {};
const nativeAsyncHandlers: Record<string, NativeAsyncHandler> = {};

/** ---------------------------------------------------------
 * init
 */
export interface HandlerRes {
  data: any;
  error?: HandlerError;
}

export interface HandlerError {
  code: string;
  value: string;
}

const createErrorHandlerSyncFn = (
  code: string,
  value: string
): NativeSyncHandler => () => {
  const res: HandlerRes = { data: null, error: { code, value } };
  return JSON.stringify(res);
};

const createErrorHandlerAsyncFn = (
  code: string,
  value: string
): NativeAsyncHandler => async () => {
  const res: HandlerRes = { data: null, error: { code, value } };
  return JSON.stringify(res);
};

(() => {
  global['_dsbridge'] = {
    call: (method: string, argsJson: string) => {
      const { _dscbstub } = JSON.parse(argsJson);

      // ----------------------------------------------------
      // sync
      if (!_dscbstub) {
        const nativeSyncHandler: NativeSyncHandler = pathOr(
          createErrorHandlerSyncFn('native-sync-handler-not-found', method),
          [method],
          nativeSyncHandlers
        );
        return nativeSyncHandler(argsJson);
      }

      // ----------------------------------------------------
      // async
      (async () => {
        const nativeAsyncHandler: NativeAsyncHandler = pathOr(
          createErrorHandlerAsyncFn('native-async-handler-not-found', method),
          [method],
          nativeAsyncHandlers
        );
        const ret = await nativeAsyncHandler(argsJson);
        const callbackFn: Function = pathOr(F, [_dscbstub], global);
        callbackFn(ret);
      })();

      return;
    },
  };
})();

/** ---------------------------------------------------------
 * hasJavascriptMethod
 */
export const hasJavascriptMethod: (method: string) => boolean = pathOr(
  F,
  ['_dsf', '_hasJavascriptMethod'],
  global
);

/** ---------------------------------------------------------
 * callHandler
 */
const idMatched = (currId: number) => (argsJson: string) => {
  const {
    data: { id },
  } = JSON.parse(argsJson);
  return id === currId;
};

export const callHandler = (method: string, args: any = {}) => {
  const id = nextCallbackId++;

  const infoJson = {
    method,
    data: JSON.stringify(args),
    callbackId: id,
  };

  return new Promise((resolve) => {
    returnValSub.pipe(first(idMatched(id))).subscribe(resolve);
    global._handleMessageFromNative(infoJson);
  });
};

/** ---------------------------------------------------------
 * addNativeSyncMethod
 */
export const addNativeSyncMethod = (
  method: string,
  func: NativeSyncHandler,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;
  nativeSyncHandlers[method] = func;
};

/** ---------------------------------------------------------
 * addNativeAsyncMethod
 */
export const addNativeAsyncMethod = (
  method: string,
  func: NativeAsyncHandler,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;
  nativeAsyncHandlers[method] = func;
};

/** ---------------------------------------------------------
 * removeNativeMethod
 */
export const removeNativeMethod = (method: string) => {
  if (isBuiltinMethodName(method)) return;

  delete nativeSyncHandlers[method];
  delete nativeAsyncHandlers[method];
};

/** ---------------------------------------------------------
 * builtinMethods
 */
addNativeSyncMethod(
  '_dsb.dsinit',
  () => {
    const res: HandlerRes = { data: true };
    return JSON.stringify(res);
  },
  true
);

addNativeSyncMethod(
  '_dsb.disableJavascriptDialogBlock',
  (argsJson) => {
    const { disable } = JSON.parse(argsJson);
    const res: HandlerRes = { data: disable };
    return JSON.stringify(res);
  },
  true
);

addNativeSyncMethod(
  '_dsb.returnValue',
  (argsJson) => {
    returnValSub.next(argsJson);
    return;
  },
  true
);

addNativeSyncMethod(
  '_dsb.hasNativeMethod',
  (argsJson) => {
    const {
      data: { name, type },
    } = JSON.parse(argsJson);

    const hasSyncMethod = has(name, nativeSyncHandlers);
    const hasAsyncMethod = has(name, nativeAsyncHandlers);
    const hasAllMethods = hasSyncMethod && hasAsyncMethod;

    const exists = cond([
      [equals('syn'), always(hasSyncMethod)],
      [equals('asyn'), always(hasAsyncMethod)],
      [equals('all'), always(hasAllMethods)],
      [T, F],
    ])(type);

    const res: HandlerRes = { data: exists };
    return JSON.stringify(res);
  },
  true
);
