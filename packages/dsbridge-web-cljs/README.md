# DSBridge-Web

## DSBriget for Web

### global variables that DSBridge-JS relies on

- \_dsbridge: it should have a `call` method (method:string, arg:string)

- \_dsaf: async registry, func -> root, obj -> .obs

- \_dsf: sync registry, func -> root, obj -> .obs

- \_dsInit: boolean, indicating whether initialized or not

- dscb: number, increase per callback added

### Implementation

- in webpack, add following in entry ['dsbridge-web/dist/preload.js', '@chat.chat/web3']
- then in project:

```ts
import { addJavascriptObject, callHandler } from 'dsbridge-web';

addJavascriptObject({ sync, async }, 'cc.getFriendList');
addJavascriptObject({ sync, async }, 'cc.getWalletAddresses');
callHandler('btc.getAddress');
```
