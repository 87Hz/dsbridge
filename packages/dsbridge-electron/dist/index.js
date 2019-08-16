"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callHandler = exports.hasJavascriptMethod = exports.removeNativeMethod = exports.addNativeAsyncMethod = exports.addNativeSyncMethod = void 0;

var _electron = require("electron");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _includes = _interopRequireDefault(require("ramda/src/includes"));

var _T = _interopRequireDefault(require("ramda/src/T"));

var _F = _interopRequireDefault(require("ramda/src/F"));

var _startsWith = _interopRequireDefault(require("ramda/src/startsWith"));

var _without = _interopRequireDefault(require("ramda/src/without"));

var _cond = _interopRequireDefault(require("ramda/src/cond"));

var _always = _interopRequireDefault(require("ramda/src/always"));

var _equals = _interopRequireDefault(require("ramda/src/equals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nextCallbackId = 0;
var returnValSub = new _rxjs.Subject();
var isBuiltinMethodName = (0, _startsWith["default"])('_dsb.');
var nativeSyncHandlers = [];
var nativeAsyncHandlers = [];
/** ---------------------------------------------------------
 * addNativeMethod
 */

var addNativeSyncMethod = function addNativeSyncMethod(method, func) {
  var allowOverwriteBuiltin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return; // replace handler for this method

  _electron.ipcMain.removeAllListeners(method);

  _electron.ipcMain.on(method, function (event, argsJson) {
    var ret = func(argsJson);
    event.returnValue = ret;
  }); // add to nativeSyncHandlers array


  nativeSyncHandlers.push(method);
};

exports.addNativeSyncMethod = addNativeSyncMethod;

var addNativeAsyncMethod = function addNativeAsyncMethod(method, func) {
  var allowOverwriteBuiltin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return; // replace handler for this method

  _electron.ipcMain.removeAllListeners(method);

  _electron.ipcMain.on(method, function (event, argsJson) {
    _asyncToGenerator(function* () {
      var _JSON$parse = JSON.parse(argsJson),
          _dscbstub = _JSON$parse._dscbstub;

      var ret = yield func(argsJson);
      var retChannel = "".concat(method, "-").concat(_dscbstub);
      ret && event.reply(retChannel, ret);
    })();
  }); // add to nativeAsyncHandlers array


  nativeAsyncHandlers.push(method);
};
/** ---------------------------------------------------------
 * removeNativeMethod
 */


exports.addNativeAsyncMethod = addNativeAsyncMethod;

var removeNativeMethod = function removeNativeMethod(method) {
  _electron.ipcMain.removeAllListeners(method);

  nativeSyncHandlers = (0, _without["default"])([method], nativeSyncHandlers);
  nativeAsyncHandlers = (0, _without["default"])([method], nativeAsyncHandlers);
};
/** ---------------------------------------------------------
 * hasJavascriptMethod
 */


exports.removeNativeMethod = removeNativeMethod;

var hasJavascriptMethod = function hasJavascriptMethod(renderer, method) {
  return new Promise(function (resolve) {
    var retChannel = "_hasJavascriptMethod-".concat(method);

    _electron.ipcMain.once(retChannel, function (_event, ret) {
      resolve(ret);
    });

    renderer.send('_hasJavascriptMethod', method);
  });
};
/** ---------------------------------------------------------
 * callHandler
 */


exports.hasJavascriptMethod = hasJavascriptMethod;

var idMatched = function idMatched(currId) {
  return function (argsJson) {
    var _JSON$parse2 = JSON.parse(argsJson),
        id = _JSON$parse2.data.id;

    return id === currId;
  };
};

var callHandler = function callHandler(renderer, method) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var id = nextCallbackId++;
  var info = {
    method: method,
    data: JSON.stringify(args),
    callbackId: id
  };
  return new Promise(function (resolve) {
    returnValSub.pipe((0, _operators.first)(idMatched(id))).subscribe(resolve);
    renderer.send('_handleMessageFromNative', info);
  });
};
/** ---------------------------------------------------------
 * builtinMethods
 */


exports.callHandler = callHandler;

var noop = function noop() {};

addNativeSyncMethod('_dsb.dsinit', (0, _always["default"])(JSON.stringify({
  data: true
})), true);
addNativeSyncMethod('_dsb.disableJavascriptDialogBlock', noop, true);
addNativeSyncMethod('_dsb.hasNativeMethod', function (argsJson) {
  var _JSON$parse3 = JSON.parse(argsJson),
      _JSON$parse3$data = _JSON$parse3.data,
      name = _JSON$parse3$data.name,
      type = _JSON$parse3$data.type;

  var hasMethod = (0, _includes["default"])(name);
  var hasMethodAsSync = hasMethod(nativeSyncHandlers);
  var hasMethodAsAsync = hasMethod(nativeAsyncHandlers);
  var hasMethodAsAll = hasMethodAsAsync && hasMethodAsSync;
  var ret = (0, _cond["default"])([[(0, _equals["default"])('syn'), (0, _always["default"])(hasMethodAsSync)], [(0, _equals["default"])('asyn'), (0, _always["default"])(hasMethodAsAsync)], [(0, _equals["default"])('all'), (0, _always["default"])(hasMethodAsAll)], [_T["default"], _F["default"]]])(type);
  return JSON.stringify({
    data: ret
  });
}, true);
addNativeSyncMethod('_dsb.returnValue', function (argsJson) {
  returnValSub.next(argsJson);
}, true);