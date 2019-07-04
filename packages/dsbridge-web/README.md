# dsbridge-web

DSBridge (https://www.npmjs.com/package/dsbridge) is an awesome library for communication between Native (iOS and Android) and WebView.

If you have a library using DSBridge and would like to reuse it in Browser without additional build process, this package will serve that purpose.

## APIs

Mostly based on DSBridge-Android API: https://github.com/wendux/DSBridge-Android

### Implemented

- `callHandler<T = any>(method: string, args?: any[]) => Promise<T>`: Call the javascript API. If a handler is given, the javascript handler can respond. the handlerName can contain the namespace. As browser is single thread and dsbridge itself is async, there is no difference between sync and async call from native, and you should always use `await` to get return value, namely it will always return a `Promise`.

- `hasJavascriptMethod(method: string) => boolean`: Test whether the handler exist in javascript.

- `addNativeMethod<T = any, R = any>(method: string, func: (args: T) => R | Promise<R>)`: renamed from `addJavascriptObject`, register one native method under given name. If the same name is used for multiple registrations, the later will overwrite the previous. The handler func could be either sync or async. (See example below)

- `removeNativeMethod(method: string)`: renamed from `removeJavascriptObject`, remove one native method by given name. (See example below)

### Not Implemented

Functions below I think is not applicable in Browser. If you have any use case, please create an issue for that.

- `disableJavascriptDialogBlock`

- `setJavascriptCloseWindowListener`

- `setWebContentsDebuggingEnabled`

## Examples

### Your Universal DSBridge Library

```ts
import dsbridge from 'dsbridge';

dsbridge.register('web', {
  add: (a: number, b: number) => a + b,
});

dsbridge.registerAsyn('web', {
  addAsync: (a: number, b: number, cb: (sum: number) => void) => cb(a + b),
});

// native.hello Hello, Jack
console.log('native.hello', dsbridge.call('native.hello', ['Jack']));

dsbridge.call('native.helloAsync', ['Jack'], (json: string) => {
  const { data } = JSON.parse(json);
  // native.helloAsync Hello, Jack
  console.log('native.helloAsync', data);
});
```

### Main application

```ts
import {
  hasJavascriptMethod,
  callHandler,
  addNativeMethod,
  removeNativeMethod,
} from 'dsbridge-web';

hasJavascriptMethod('web.hello'); // true or false

(async () => {
  // sync handler
  const add = await callHandler('web.add', [1, 20]);
  console.log('add', add); // add 21

  // async handler
  const addAsync = await callHandler('web.addAsync', [20, 20]);
  console.log('addAsync', addAsync); // addAsync 40
})();

addNativeMethod<[string], string>('native.hello', ([name]) => `Hello, ${name}`);

addNativeMethod<[string], string>(
  'native.helloAsync',
  async ([name]) => `Hello, ${name}`
);

removeNativeMethod('native.another');
```
