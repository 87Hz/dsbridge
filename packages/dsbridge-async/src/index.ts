import dsbridge from 'dsbridge';

const dsbridgeAsync = {
  callAsync: <T = any, R = any>(handlerName: string, args?: T) =>
    new Promise<R>(resolve => dsbridge.call(handlerName, args, resolve)),

  call: dsbridge.call,
  register: dsbridge.register,
  registerAsyn: dsbridge.registerAsyn,
  hasNativeMethod: dsbridge.hasNativeMethod,
  disableJavascriptDialogBlock: dsbridge.disableJavascriptDialogBlock,
};

export default dsbridgeAsync;
