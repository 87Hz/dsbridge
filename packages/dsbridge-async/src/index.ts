import dsbridge from 'dsbridge';

const dsbridgeEx = {
  call: (handlerName: string, args?: any) =>
    new Promise((resolve) => dsbridge.call(handlerName, args, resolve)),
};

export { dsbridgeEx };
