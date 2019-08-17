# DSBridge-Async

On top of `dsbridge`, added `callAsync()` to promisify `call()`.

All native dsbridge functions are exported without any changes:

- call()
- register()
- registerAsyn()
- hasNativeMethod()
- disableJavascriptDialogBlock()

## Install

```bash
npm i dsbridge-async
```

## Usage

```ts
import dsbridge from "dsbridge-async";

// instead of passing callback, callAsync will return a promise
const task = async () => {
  const res = await dsbridge.callAsync("method-name", someArgs);
  console.log(res);
};
```
