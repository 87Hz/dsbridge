import React, { useState } from 'react';
import dsBridge from 'dsbridge';

export const CallSync = () => {
  const [method, setMethod] = useState('hello');
  const [arg, setArg] = useState('world');
  const [res, setRes] = useState('');

  const handleRun = () => {
    const dsRes = dsBridge.call(method, arg);
    setRes(dsRes);
  };

  return (
    <>
      <hr />
      <h2>CallSync</h2>
      <p>
        <input value={method} onChange={(e) => setMethod(e.target.value)} />
        <input value={arg} onChange={(e) => setArg(e.target.value)} />
      </p>

      <p>
        <button onClick={handleRun}>call({`'${method}', '${arg}'`})</button>
      </p>

      <p>Res: {JSON.stringify(res)}</p>
    </>
  );
};
