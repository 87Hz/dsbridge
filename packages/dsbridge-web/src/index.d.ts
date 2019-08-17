/** ---------------------------------------------------------
 * nativeHandlers
 */
export declare type NativeSyncHandler = (argsJson: string) => string | void;
export declare type NativeAsyncHandler = (argsJson: string) => Promise<string | void>;
/** ---------------------------------------------------------
 * init
 */
export interface HandlerRes {
    data: any;
    error?: HandlerError;
}
export interface HandlerError {
    code: string;
    value: string;
}
/** ---------------------------------------------------------
 * hasJavascriptMethod
 */
export declare const hasJavascriptMethod: (method: string) => boolean;
export declare const callHandler: (method: string, args?: any) => Promise<unknown>;
/** ---------------------------------------------------------
 * addNativeSyncMethod
 */
export declare const addNativeSyncMethod: (method: string, func: NativeSyncHandler, allowOverwriteBuiltin?: boolean) => void;
/** ---------------------------------------------------------
 * addNativeAsyncMethod
 */
export declare const addNativeAsyncMethod: (method: string, func: NativeAsyncHandler, allowOverwriteBuiltin?: boolean) => void;
/** ---------------------------------------------------------
 * removeNativeMethod
 */
export declare const removeNativeMethod: (method: string) => void;
