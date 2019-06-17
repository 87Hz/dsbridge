export type CallHandlerParams = {
  handlerName: string;
  args?: object;
  callback?: Function;
};

export interface DSBrowser {
  callHandler: (params: CallHandlerParams) => void;
}
