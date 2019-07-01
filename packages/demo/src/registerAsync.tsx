import React, { useEffect } from 'react';
import dsBridge from 'dsbridge';

export const RegisterAsync = () => {
  useEffect(() => {
    dsBridge.registerAsyn(
      'append',
      (
        arg1: string,
        arg2: string,
        arg3: string,
        resCb: (res: string) => void
      ) => {
        resCb(arg1 + ' ' + arg2 + ' ' + arg3);
      }
    );

    dsBridge.registerAsyn('test', {
      test1: (resCb: (res: string) => void) => {
        resCb('test-1');
      },
      test2: (resCb: (res: string) => void) => {
        resCb('test-2');
      },
    });
  }, [dsBridge]);

  return (
    <>
      <hr />
      <h2>RegisterAsync</h2>
      <h5>Following methods has been registered.</h5>

      <pre>
        {`
dsBridge.registerAsyn(
  'append',
  (
    arg1: string,
    arg2: string,
    arg3: string,
    resCb: (res: string) => void
  ) => {
    resCb(arg1 + ' ' + arg2 + ' ' + arg3);
  }
);

dsBridge.registerAsyn('test', {
  test1: (resCb: (res: string) => void) => {
    resCb('test-1');
  },
  test2: (resCb: (res: string) => void) => {
    resCb('test-2');
  },
});
`}
      </pre>
    </>
  );
};
