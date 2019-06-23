/*
dsBridge.register(methodName|namespace,function|synApiObject)
Because JavaScript does not support function overloading,
it is not possible to define asynchronous function and sync function of the same name.

dsBridge.register('addValue',function(l,r){
     return l+r;
})

//namespace test for synchronous
dsBridge.register("test",{
  tag:"test",
  test1:function(){
	  return this.tag+"1"
  },
  test2:function(){
	  return this.tag+"2"
  }
})
*/
import { call } from './call';
import { createFn, isFunc } from './utils';

export type Handler = object | (() => void);

const _register = (global: any) => (
  name: string,
  func: Handler,
  async: boolean = false
) => {
  if (!global._dsInit) {
    global._dsInit = true;
    setTimeout(() => {
      call('_dsb.dsinit');
    }, 0);
  }

  const q = async ? global._dsaf : global._dsf;
  if (!q) return;

  if (isFunc(func)) {
    q[name] = func;
  } else {
    q._obs[name] = func;
  }
};

export const register = createFn(_register);
