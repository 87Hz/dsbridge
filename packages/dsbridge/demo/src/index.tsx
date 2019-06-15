import React from 'react';
import { render } from 'react-dom';
import dsBridge from '../../dist';

const App = () => {
  console.log(dsBridge);

  return (
    <div>
      <h1>DSBridge Demo</h1>
      <p>
        This demo is to test dsbridge integration for: iOS, Android & Electron
      </p>

      <hr />
      <h2>hasNativeMethod: 'chatchat'</h2>
      <p>
        <button onClick={() => dsBridge.hasNativeMethod('chatchat', 'all')}>
          all
        </button>
      </p>
      <p>
        <button onClick={() => dsBridge.hasNativeMethod('chatchat', 'syn')}>
          syn
        </button>
      </p>
      <p>
        <button onClick={() => dsBridge.hasNativeMethod('chatchat', 'asyn')}>
          asyn
        </button>
      </p>

      <hr />
      <h2>disableJavascriptDialogBlock</h2>
      <p>
        <button onClick={() => dsBridge.disableJavascriptDialogBlock(true)}>
          true
        </button>
      </p>
      <p>
        <button onClick={() => dsBridge.disableJavascriptDialogBlock(false)}>
          false
        </button>
      </p>

      <hr />
      <h2></h2>
    </div>
  );
};

render(<App />, document.getElementById('app'));
