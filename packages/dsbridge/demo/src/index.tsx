import React from 'react';
import { render } from 'react-dom';
import { HasNativeMethod } from './hasNativeMethod';
import { DisableJavascriptDialogBlock } from './disableJavascriptDialogBlock';
import { CallSync } from './callSync';
import { CallAsync } from './callAsync';
import { Register } from './register';
import { RegisterAsync } from './registerAsync';

const App = () => {
  return (
    <div>
      <h1>DSBridge Demo</h1>
      <p>
        This demo is to test dsbridge integration for: iOS, Android & Electron
      </p>

      <HasNativeMethod />
      <DisableJavascriptDialogBlock />
      <CallSync />
      <CallAsync />
      <Register />
      <RegisterAsync />
    </div>
  );
};

render(<App />, document.getElementById('app'));
