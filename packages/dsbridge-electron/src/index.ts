import { always } from 'ramda';
import { call } from './call';

const createDsf = always({ _obs: [] });

((global: any) => {
  global._dsInit = false;

  // main
  global._dsBridge = { call };

  // function registry
  global._dsaf = createDsf();
  global._dsf = createDsf();

  // callback counter
  global.dscb = 0;
})(window);
