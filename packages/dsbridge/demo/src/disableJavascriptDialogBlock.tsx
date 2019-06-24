import React, { useState } from 'react';
import dsBridge from '../../dist';

export const DisableJavascriptDialogBlock = () => {
  const [enable, setEnable] = useState('false');
  const [res, setRes] = useState('');

  const handleRun = () => {
    const dsRes = dsBridge.disableJavascriptDialogBlock(enable === 'true');
    setRes(dsRes);
  };

  return (
    <>
      <hr />
      <h2>disableJavascriptDialogBlock</h2>

      <p>
        <select value={enable} onChange={(e) => setEnable(e.target.value)}>
          {['true', 'false'].map((enable) => (
            <option value={enable} key={enable}>
              {enable}
            </option>
          ))}
        </select>
      </p>

      <p>
        <button
          onClick={handleRun}
        >{`disableJavascriptDialogBlock(${enable})`}</button>
      </p>

      <p>Res: {JSON.stringify(res)}</p>
    </>
  );
};
