import dsbridge from "dsbridge";

const dsbridgeAsync = {
  call: <T = any, R = any>(handlerName: string, args?: T) =>
    new Promise<R>(resolve => dsbridge.call(handlerName, args, resolve)),

  register: dsbridge.register,
  registerAsyn: dsbridge.registerAsyn,
  hasNativeMethod: dsbridge.hasNativeMethod,
  disableJavascriptDialogBlock: dsbridge.disableJavascriptDialogBlock
};

export { dsbridgeAsync };
