/*
dsBridge.registerAsyn(methodName|namespace,function|asyApiObject)
Because JavaScript does not support function overloading,
it is not possible to define asynchronous function and sync function of the same name.

dsBridge.registerAsyn('append',function(arg1,arg2,arg3,responseCallback){
     responseCallback(arg1+" "+arg2+" "+arg3);
})

//namespace test1 for asynchronous calls
dsBridge.registerAsyn("test1",{
  tag:"test1",
  test1:function(responseCallback){
	  return responseCallback(this.tag+"1")
  },
  test2:function(responseCallback){
	  return responseCallback(this.tag+"2")
  }
})
*/
import { Handler, register } from './register';

export const registerAsyn = (name: string, func: Handler) =>
  register(name, func, true);
