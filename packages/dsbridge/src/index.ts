import { call } from './call';
import { register } from './register';
import { registerAsyn } from './registerAsyn';
import { hasNativeMethod } from './hasNativeMethod';
import { disableJavascriptDialogBlock } from './disableJavascriptDialogBlock';

const dsbridge = {
  call,
  register,
  registerAsyn,
  hasNativeMethod,
  disableJavascriptDialogBlock,
};

export default dsbridge;
module.exports = dsbridge;
