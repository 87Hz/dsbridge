# dsbridge-web

DSBridge (https://www.npmjs.com/package/dsbridge) is an awesome library for communication between Native (iOS and Android) and WebView.

If you have a library using DSBridge and would like to reuse it in Browser without additional build process, this package will serve that purpose.

## APIs

Mostly based on DSBridge-Android API: https://github.com/wendux/DSBridge-Android

### Implemented

- `callHandler<T = any>(method: string, args?: any[]) => Promise<T>`: Call the javascript API. If a handler is given, the javascript handler can respond. the handlerName can contain the namespace. As browser is single thread and dsbridge itself is async, there is no difference between sync and async call from native, and you should always use `await` to get return value, namely it will always return a `Promise`.

- `hasJavascriptMethod(method: string) => boolean`: Test whether the handler exist in javascript.

- `addNativeMethod<T = any, R = any>(method: string, func: (args: T) => R | Promise<R>, allowOverwriteBuiltin: boolean = false)`: renamed from `addJavascriptObject`, register one native method under given name. If the same name is used for multiple methods, the later will overwrite the previous. The handler func could be either sync or async. (See example below). Try not set `allowOverwriteBuiltin` as true unless you really want to change a particular builtin behavior.

- `removeNativeMethod(method: string)`: renamed from `removeJavascriptObject`, remove one native method by given name. (See example below)

### Not Implemented

Functions below I think is not applicable in Browser. If you have any use case, please create an issue for that.

- `disableJavascriptDialogBlock`

- `setJavascriptCloseWindowListener`

- `setWebContentsDebuggingEnabled`

## Examples

### WebMethods (your universal dsbridge library)

```ts
import dsbridge from 'dsbridge';

dsbridge.register('web', {
  add: (a: number, b: number) => a + b,

  testNativeMethods: () => {
    // native.hello Hello, Jack
    console.log('native.hello', dsbridge.call('native.hello', ['Jack']));

    // hasNativeMethod("native.hello") true
    console.log(
      'hasNativeMethod("native.hello")',
      dsbridge.hasNativeMethod('native.hello')
    );

    // hasNativeMethod("native.world") false
    console.log(
      'hasNativeMethod("native.world")',
      dsbridge.hasNativeMethod('native.world')
    );

    // native.helloAsync Hello, Jack
    dsbridge.call('native.helloAsync', ['Jack'], (json: string) => {
      const { data } = JSON.parse(json);
      console.log('native.helloAsync', data);
    });
  },
});

dsbridge.registerAsyn('web-async', {
  add: (a: number, b: number, cb: (sum: number) => void) => cb(a + b),
});
```

### NativeMethods

```ts
import { addNativeMethod, removeNativeMethod } from 'dsbridge-web';

addNativeMethod<[string], string>('native.hello', ([name]) => `Hello, ${name}`);

addNativeMethod<[string], string>(
  'native.helloAsync',
  async ([name]) => `Hello, ${name}`
);

removeNativeMethod('native.another');
```

### MainApp

```ts
// ---------------------------------------------
// hasJavascriptMethod
//
// has handler web.add? true
console.log('has handler web.add?', hasJavascriptMethod('web.add'));
// has handler web-async.add? true
console.log('has handler web-async.add?', hasJavascriptMethod('web-async.add'));
// has handler add? false
console.log('has handler add?', hasJavascriptMethod('add'));

// ---------------------------------------------
// callHandler
//
(async () => {
  // sync function
  const add = await callHandler('web.add', [1, 20]);
  // web.add 21
  console.log('web.add', add);

  // async function
  const addAsync = await callHandler('web-async.add', [20, 20]);
  // web-async.addAsync 40
  console.log('web-async.addAsync', addAsync);
})();

// ---------------------------------------------
// testNativeMethods
//
callHandler('web.testNativeMethods');
```
