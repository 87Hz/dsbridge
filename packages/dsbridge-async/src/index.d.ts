declare const dsbridgeAsync: {
    callAsync: <T = any, R = any>(handlerName: string, args?: T) => Promise<R>;
    call: {
        (handlerName: string, args?: any, responseCallback?: (retValue: any) => void): any;
        <T, R>(handlerName: string, args?: T, responseCallback?: (retValue: R) => void): R;
    };
    register: {
        (handlerName: string, handler: object | (() => any), async?: boolean): void;
        <F>(handlerName: string, handler: F, async?: boolean): void;
    };
    registerAsyn: {
        (handlerName: string, handler: object | (() => void)): void;
        <F>(handlerName: string, handler: F): void;
    };
    hasNativeMethod: (handlerName: string, type?: "all" | "asyn" | "syn") => boolean;
    disableJavascriptDialogBlock: (disable?: boolean) => void;
};
export default dsbridgeAsync;
