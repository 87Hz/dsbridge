import { Event, WebContents } from 'electron';
export interface IpcEvent extends Event {
    reply: (channel: string, msg: string) => void;
}
/** ---------------------------------------------------------
 * nativeHandlers
 */
export declare type NativeSyncHandler = (argsJson: string) => string | void;
export declare type NativeAsyncHandler = (argsJson: string) => Promise<string | void>;
/** ---------------------------------------------------------
 * addNativeMethod
 */
export declare const addNativeSyncMethod: (method: string, func: NativeSyncHandler, allowOverwriteBuiltin?: boolean) => void;
export declare const addNativeAsyncMethod: (method: string, func: NativeAsyncHandler, allowOverwriteBuiltin?: boolean) => void;
/** ---------------------------------------------------------
 * removeNativeMethod
 */
export declare const removeNativeMethod: (method: string) => void;
/** ---------------------------------------------------------
 * hasJavascriptMethod
 */
export declare const hasJavascriptMethod: (renderer: WebContents, method: string) => Promise<boolean>;
export interface CallHandlerInfo {
    method: string;
    data: string;
    callbackId: number;
}
export declare const callHandler: (renderer: WebContents, method: string, args?: any) => Promise<string>;
export declare type NativeMethodType = 'all' | 'syn' | 'asyn';
//# sourceMappingURL=index.d.ts.map