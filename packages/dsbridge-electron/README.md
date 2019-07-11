# dsbridge-electron

DSBridge (https://www.npmjs.com/package/dsbridge) is an awesome library for communication between Native (iOS and Android) and WebView.

If you have a library using DSBridge and would like to reuse it in Electron without additional build process, this package will serve that purpose.

## APIs

Mostly based on DSBridge-Android API: https://github.com/wendux/DSBridge-Android

### Implemented

- `callHandler(renderer: WebContents, method: string, args: any = {}) => Promise<string>`: Call the javascript API. If a handler is given, the javascript handler can respond. the handlerName can contain the namespace. There is no difference between sync and async call from native, namely you should always use `await` to get return value, namely it will always return a `Promise`.

- `hasJavascriptMethod(method: string) => boolean`: Test whether the handler exist in javascript.

- `addNativeSyncMethod(method: string, func: (argsJson: string) => string | void, allowOverwriteBuiltin: boolean = false)`: renamed from `addJavascriptObject`, register one native sync method under the given name. If the same name is used for multiple methods, the later will overwrite the previous. Try not set `allowOverwriteBuiltin` as true unless you really want to change a particular builtin behavior.

- `addNativeAsyncMethod(method: string, func: (argsJson: string) => Promise<string | void>, allowOverwriteBuiltin: boolean = false)`: renamed from `addJavascriptObject`, register one native async method under the given name. If the same name is used for multiple methods, the later will overwrite the previous. Try not set `allowOverwriteBuiltin` as true unless you really want to change a particular builtin behavior.

- `removeNativeMethod(method: string)`: renamed from `removeJavascriptObject`, remove one native method by given name.

### Not Implemented

Functions below I think is not applicable in Electron. If you have any use case, please create an issue for that.

- `disableJavascriptDialogBlock`

- `setJavascriptCloseWindowListener`

- `setWebContentsDebuggingEnabled`
