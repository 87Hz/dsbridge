import {
  both,
  equals,
  has,
  includes,
  pathSatisfies,
  pipe,
  type,
  isNil,
  complement,
} from 'ramda';

export const isFunc = pipe(
  type,
  equals<any>('Function')
);

export const isWindowDSBridge = has('_dsbridge');

export const isUserAgentDSBridge = both(
  has('_dswk'),
  pathSatisfies(includes('_dsbridge'), ['navigator', 'userAgent'])
);

export const createFn = (fn: (global: any) => Function) => fn(window);

export const isNotNil = complement(isNil);
