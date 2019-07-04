# dsbridge-web

## APIs

API refer to Android: https://github.com/wendux/DSBridge-Android

### Implemented

- `callHandler<T = any>(method: string, args?: any[]) => Promise<T>`: Call the javascript API. If a handler is given, the javascript handler can respond. the handlerName can contain the namespace. As browser is single thread and dsbridge itself is async, there is no difference between sync and async call from native, and you should always use `await` to get return value, namely it will always return a promise.

* `hasJavascriptMethod(method: string) => boolean`: Test whether the handler exist in javascript.

### WIP

- `addJavascriptObject`

- `removeJavascriptObject`

### Not Implemented

- `disableJavascriptDialogBlock`

- `setJavascriptCloseWindowListener`

- `setWebContentsDebuggingEnabled`
