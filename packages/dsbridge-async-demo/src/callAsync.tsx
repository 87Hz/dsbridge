import React, { useState } from 'react';
import dsBridge from 'dsbridge-async';

export const CallAsync = () => {
  const [method, setMethod] = useState('helloAsync');
  const [arg, setArg] = useState('world');
  const [res, setRes] = useState('');

  const handleRun = async () => {
    const res = await dsBridge.callAsync(method, arg);
    setRes(res);
  };

  return (
    <>
      <hr />
      <h2>CallAsync</h2>
      <p>
        <input value={method} onChange={e => setMethod(e.target.value)} />
        <input value={arg} onChange={e => setArg(e.target.value)} />
      </p>

      <p>
        <button onClick={handleRun}>
          call({`'${method}', '${arg}', setRes`})
        </button>
      </p>

      <p>Res: {JSON.stringify(res)}</p>
    </>
  );
};
