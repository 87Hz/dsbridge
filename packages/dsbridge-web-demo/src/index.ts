import { callHandler, hasJavascriptMethod } from 'dsbridge-web';

import './web-methods';
import './native-methods';

// ---------------------------------------------
// hasJavascriptMethod
//
console.log('has handler web.add?', hasJavascriptMethod('web.add'));
console.log('has handler web-async.add?', hasJavascriptMethod('web-async.add'));
console.log('has handler add?', hasJavascriptMethod('add'));

// ---------------------------------------------
// callHandler
//
(async () => {
  // sync function
  const addRes = (await callHandler('web.add', [1, 20])) as string;
  const {
    data: { data: addResData },
  } = JSON.parse(addRes);
  console.log('web.add', addResData);

  // async function
  const addAsyncRes = (await callHandler('web-async.add', [20, 20])) as string;
  const {
    data: { data: addAsyncResData },
  } = JSON.parse(addAsyncRes);
  console.log('web-async.addAsync', addAsyncResData);
})();

// ---------------------------------------------
// testNativeMethods
//
callHandler('web.testNativeMethods');
