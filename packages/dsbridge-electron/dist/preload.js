"use strict";

var _electron = require("electron");

var _F = _interopRequireDefault(require("ramda/src/F"));

var _pathOr = _interopRequireDefault(require("ramda/src/pathOr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var global = window;
/** ---------------------------------------------------------
 * init
 */

(function () {
  global['_dsbridge'] = {
    call: function call(method, argsJson) {
      var _JSON$parse = JSON.parse(argsJson),
          _dscbstub = _JSON$parse._dscbstub; // ----------------------------------------------------
      // sync


      if (!_dscbstub) return _electron.ipcRenderer.sendSync(method, argsJson); // ----------------------------------------------------
      // async

      var retChannel = "".concat(method, "-").concat(_dscbstub);

      _electron.ipcRenderer.once(retChannel, function (_event, msg) {
        global[_dscbstub](msg);
      });

      _electron.ipcRenderer.send(method, argsJson);
    }
  };
})();
/** ---------------------------------------------------------
 * _handleMessageFromNative
 */


_electron.ipcRenderer.on('_handleMessageFromNative', function (_event, info) {
  return global['_handleMessageFromNative'](info);
});
/** ---------------------------------------------------------
 * _hasJavascriptMethod
 */


_electron.ipcRenderer.on('_hasJavascriptMethod', function (event, method) {
  var checkFn = (0, _pathOr["default"])(_F["default"], ['_dsf', '_hasJavascriptMethod'], global);
  var retChannel = "_hasJavascriptMethod-".concat(method);
  var exists = checkFn(method);
  event.sender.send(retChannel, exists);
});