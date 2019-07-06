// import { Subject, Observable } from 'rxjs';
// import { map, first } from 'rxjs/operators';
// import { pathOr, F, T, prop, propEq } from 'ramda';

// interface ReturnType {
//   id: number;
//   complete: string;
//   data: any;
// }

// const global: any = window;
// let nextCallbackId = 0;
// const returnValSub = new Subject<string>();
// const returnValStream: Observable<ReturnType> = returnValSub.pipe(
//   map((json) => prop('data', JSON.parse(json)))
// );

// /** ---------------------------------------------------------
//  * nativeHandlers
//  */
// const nativeHandlers = {
//   ['_dsb.dsinit']: T,
//   ['_dsb.hasNativeMethod']: T,
//   ['_dsb.disableJavascriptDialogBlock']: T,
//   ['_dsb.returnValue']: (data: string) => returnValSub.next(data),
// };

// /** ---------------------------------------------------------
//  * nativeHandlers
//  */
// const nativeHandlers = {
//   ['_dsb.dsinit']: T,
//   ['_dsb.hasNativeMethod']: T,
//   ['_dsb.disableJavascriptDialogBlock']: T,
//   ['_dsb.returnValue']: (data: string) => returnValSub.next(data),
// };

// /** ---------------------------------------------------------
//  * init
//  */
// (() => {
//   global._dsbridge = {
//     call: (method: string, arg: string) =>
//       pathOr<Function>(F, [method], nativeHandlers)(arg),
//   };
// })();

// /** ---------------------------------------------------------
//  * hasJavascriptMethod
//  */
// export const hasJavascriptMethod: (method: string) => boolean = pathOr(
//   F,
//   ['_dsf', '_hasJavascriptMethod'],
//   global
// );

// /** ---------------------------------------------------------
//  * callHandler
//  */
// export const callHandler = <T = any>(
//   method: string,
//   args?: any[]
// ): Promise<T> => {
//   const id = nextCallbackId++;

//   const infoJson = {
//     method,
//     data: JSON.stringify(args),
//     callbackId: id,
//   };

//   return new Promise((resolve) => {
//     returnValStream
//       .pipe<ReturnType>(first(propEq('id', id)))
//       .subscribe((ret) => resolve(ret.data));
//     global._handleMessageFromNative(infoJson);
//   });
// };

// /** ---------------------------------------------------------
//  * addNativeMethod
//  */
// export const addNativeMethod = <T = any, R = any>(
//   method: string,
//   func: (args: T) => R | Promise<R>
// ) => {
//   nativeHandlers[method] = (json: string): any => {
//     const { data: args, _dscbstub } = JSON.parse(json);

//     // sync
//     if (!_dscbstub) return JSON.stringify({ data: func(args) });

//     // async
//     (async () =>
//       global[_dscbstub](JSON.stringify({ data: await func(args) })))();
//   };
// };

// /** ---------------------------------------------------------
//  * removeNativeMethod
//  */
// export const removeNativeMethod = (method: string) => {
//   delete nativeHandlers[method];
// };
