import { pathOr, F } from 'ramda';

const global: any = window;
const nativeHandlers = {
  ['_dsb.dsinit']: () => true,
};

// init
(() => {
  global._dsbridge = {
    call: (method: string, arg: string) =>
      pathOr<Function>(F, [method], nativeHandlers)(arg),
  };
})();

export const hasJavascriptMethod: (method: string) => boolean = pathOr(
  F,
  ['_dsf', '_hasJavascriptMethod'],
  global
);

export function callHandler(method: string, args?: any[], cb?: Function) {
  const infoJson = {
    method,
    data: JSON.stringify([1, 2]),
    callbackId: 1,
  };

  // global._handleMessageFromNative(infoJson);
}
