import React, { useState } from 'react';
import dsBridge from 'dsbridge-async';

export const HasNativeMethod = () => {
  const [method, setMethod] = useState('hello');
  const [type, setType] = useState<any>('all');
  const [res, setRes] = useState('');
  const types = ['all', 'syn', 'asyn'];

  const handleRun = () => {
    const dsRes = dsBridge.hasNativeMethod(method, type);
    setRes(JSON.stringify(dsRes));
  };

  return (
    <>
      <hr />
      <h2>hasNativeMethod</h2>
      <p>
        <input value={method} onChange={e => setMethod(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          {types.map(type => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </p>

      <p>
        <button
          onClick={
            handleRun
          }>{`hasNativeMethod('${method}', '${type}')`}</button>
      </p>

      <p>Res: {JSON.stringify(res)}</p>
    </>
  );
};
