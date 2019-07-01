import React, { useEffect } from 'react';
import dsBridge from 'dsbridge';

export const Register = () => {
  useEffect(() => {
    dsBridge.register('addValue', (l: number, r: number) => l + r);

    dsBridge.register('test', {
      test1: () => 'test1',
      test2: () => 'test2',
    });
  }, [dsBridge]);

  return (
    <>
      <hr />
      <h2>Register</h2>
      <h5>Following methods has been registered.</h5>

      <pre>
        {`
dsBridge.register('addValue', (l: number, r: number) => l + r);

dsBridge.register('test', {
  test1: () => 'test1',
  test2: () => 'test2',
});
`}
      </pre>
    </>
  );
};
