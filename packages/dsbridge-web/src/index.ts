import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { pathOr, F, T, propEq, startsWith, has } from 'ramda';

interface WebReturnType {
  id: number;
  complete: string;
  data: any;
}

const global: any = window;
let nextCallbackId = 0;
const returnValSub = new Subject<WebReturnType>();

/** ---------------------------------------------------------
 * nativeHandlers
 */
const isBuiltinMethodName = startsWith('_dsb.');
const nativeHandlers: Record<string, any> = {};

/** ---------------------------------------------------------
 * init
 */
(() => {
  global._dsbridge = {
    call: (method: string, arg: string) =>
      pathOr<Function>(F, [method], nativeHandlers)(arg),
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
export const callHandler = <T = any>(
  method: string,
  args: any[] = []
): Promise<T> => {
  const id = nextCallbackId++;

  const infoJson = {
    method,
    data: JSON.stringify(args),
    callbackId: id,
  };

  return new Promise((resolve) => {
    returnValSub
      .pipe<WebReturnType>(first(propEq('id', id)))
      .subscribe((ret) => resolve(ret.data));
    global._handleMessageFromNative(infoJson);
  });
};

/** ---------------------------------------------------------
 * addNativeMethod
 */
export const addNativeMethod = <T = any, R = any>(
  method: string,
  func: (args: T) => R | Promise<R>,
  allowOverwriteBuiltin: boolean = false
) => {
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;

  nativeHandlers[method] = (json: string): any => {
    const { data: args, _dscbstub } = JSON.parse(json);

    // sync
    if (!_dscbstub) return JSON.stringify({ data: func(args) });

    // async
    (async () =>
      global[_dscbstub](JSON.stringify({ data: await func(args) })))();
  };
};

/** ---------------------------------------------------------
 * removeNativeMethod
 */
export const removeNativeMethod = (method: string) => {
  if (isBuiltinMethodName(method)) return;
  delete nativeHandlers[method];
};

/** ---------------------------------------------------------
 * builtinMethods
 */
addNativeMethod('_dsb.dsinit', T, true);
addNativeMethod('_dsb.disableJavascriptDialogBlock', T, true);

addNativeMethod(
  '_dsb.returnValue',
  (arg) => {
    returnValSub.next(arg);
  },
  true
);

addNativeMethod(
  '_dsb.hasNativeMethod',
  (args) => {
    const name = pathOr('UnknownFunc', ['name'], args);
    return has(name, nativeHandlers);
  },
  true
);
