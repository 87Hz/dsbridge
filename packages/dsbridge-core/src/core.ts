import {
  both,
  cond,
  defaultTo,
  equals,
  F,
  has,
  ifElse,
  includes,
  mergeRight,
  pathSatisfies,
  pipe,
  prop,
  type,
} from 'ramda';

type ResCallbackFn<R = any> = (res: R) => void;
type Handler = object | (() => void);

const global = window as any;

const isFunc = pipe(
  type,
  equals('Function')
);

const getCbName = ifElse(
  isFunc,
  (cb: ResCallbackFn) => {
    const cbName = `dscb${global.dscb++}`;
    global[cbName] = cb;
    return cbName;
  },
  F
);

const isWindowDSBridge = has('_dsbridge');
const isUserAgentDSBridge = both(
  has('_dswk'),
  pathSatisfies(includes('_dsbridge'), ['navigator', 'userAgent'])
);

export const call = <R>(
  method: string,
  args?: object,
  callback?: ResCallbackFn<R>
) => {
  const arg = pipe(
    mergeRight({ _dscbstub: getCbName(global)(callback) }),
    JSON.stringify
  )({
    data: args,
  });

  const res = cond([
    [isWindowDSBridge, () => global._dsbridge.call(method, arg)],
    [isUserAgentDSBridge, () => prompt(`_dsbridge=${method}`, arg)],
  ])(global);

  return pipe(
    defaultTo('{}'),
    JSON.parse,
    prop('data')
  )(res);
};

export const register = (
  name: string,
  func: Handler,
  async: boolean = false
) => {
  if (!global._dsInit) {
    global._dsInit = true;
    setTimeout(() => {
      call('_dsb.dsinit');
    }, 0);
  }

  const q = async ? global._dsaf : global._dsf;
  if (isFunc(func)) {
    q[name] = func;
  } else {
    q._obs[name] = func;
  }
};

export const registerAsyn = (name: string, func: Handler) =>
  register(name, func, true);

export const hasNativeMethod = (
  name: string,
  type: 'all' | 'asyn' | 'syn' = 'all'
) => call('_dsb.hasNativeMethod', { name, type });

export const disableJavascriptDialogBlock = (disable: boolean = false) =>
  call('_dsb.disableJavascriptDialogBlock', { disable });
