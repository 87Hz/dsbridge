/*
Calling dsBridge.disableJavascriptDialogBlock(...) has the same effect as calling disableJavascriptDialogBlock in Java.

Example:

//disable
dsBridge.disableJavascriptDialogBlock()
//enable
dsBridge.disableJavascriptDialogBlock(false)
*/
import { call } from './call';

export const disableJavascriptDialogBlock = (disable: boolean = false) =>
  call('_dsb.disableJavascriptDialogBlock', { disable });
