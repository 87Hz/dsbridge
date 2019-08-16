"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNativeMethod = exports.addNativeAsyncMethod = exports.addNativeSyncMethod = exports.callHandler = exports.hasJavascriptMethod = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _pathOr = _interopRequireDefault(require("ramda/src/pathOr"));

var _T = _interopRequireDefault(require("ramda/src/T"));

var _F = _interopRequireDefault(require("ramda/src/F"));

var _startsWith = _interopRequireDefault(require("ramda/src/startsWith"));

var _has = _interopRequireDefault(require("ramda/src/has"));

var _always = _interopRequireDefault(require("ramda/src/always"));

var _cond = _interopRequireDefault(require("ramda/src/cond"));

var _equals = _interopRequireDefault(require("ramda/src/equals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nextCallbackId = 0;
var global = window;
var returnValSub = new _rxjs.Subject();
/** ---------------------------------------------------------
 * nativeHandlers
 */

var isBuiltinMethodName = (0, _startsWith["default"])('_dsb.');
var nativeSyncHandlers = {};
var nativeAsyncHandlers = {};
/** ---------------------------------------------------------
 * init
 */

var createErrorHandlerSyncFn = function createErrorHandlerSyncFn(code, value) {
  return function () {
    var res = {
      data: null,
      error: {
        code: code,
        value: value
      }
    };
    return JSON.stringify(res);
  };
};

var createErrorHandlerAsyncFn = function createErrorHandlerAsyncFn(code, value) {
  return (
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              res = {
                data: null,
                error: {
                  code: code,
                  value: value
                }
              };
              return _context.abrupt("return", JSON.stringify(res));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  );
};

(function () {
  global['_dsbridge'] = {
    call: function call(method, argsJson) {
      var _JSON$parse = JSON.parse(argsJson),
          _dscbstub = _JSON$parse._dscbstub; // ----------------------------------------------------
      // sync


      if (!_dscbstub) {
        var nativeSyncHandler = (0, _pathOr["default"])(createErrorHandlerSyncFn('native-sync-handler-not-found', method), [method], nativeSyncHandlers);
        return nativeSyncHandler(argsJson);
      } // ----------------------------------------------------
      // async


      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var nativeAsyncHandler, ret, callbackFn;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nativeAsyncHandler = (0, _pathOr["default"])(createErrorHandlerAsyncFn('native-async-handler-not-found', method), [method], nativeAsyncHandlers);
                _context2.next = 3;
                return nativeAsyncHandler(argsJson);

              case 3:
                ret = _context2.sent;
                callbackFn = (0, _pathOr["default"])(_F["default"], [_dscbstub], global);
                callbackFn(ret);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();

      return;
    }
  };
})();
/** ---------------------------------------------------------
 * hasJavascriptMethod
 */


var hasJavascriptMethod = (0, _pathOr["default"])(_F["default"], ['_dsf', '_hasJavascriptMethod'], global);
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

var callHandler = function callHandler(method) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var id = nextCallbackId++;
  var infoJson = {
    method: method,
    data: JSON.stringify(args),
    callbackId: id
  };
  return new Promise(function (resolve) {
    returnValSub.pipe((0, _operators.first)(idMatched(id))).subscribe(resolve);

    global._handleMessageFromNative(infoJson);
  });
};
/** ---------------------------------------------------------
 * addNativeSyncMethod
 */


exports.callHandler = callHandler;

var addNativeSyncMethod = function addNativeSyncMethod(method, func) {
  var allowOverwriteBuiltin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;
  nativeSyncHandlers[method] = func;
};
/** ---------------------------------------------------------
 * addNativeAsyncMethod
 */


exports.addNativeSyncMethod = addNativeSyncMethod;

var addNativeAsyncMethod = function addNativeAsyncMethod(method, func) {
  var allowOverwriteBuiltin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!allowOverwriteBuiltin && isBuiltinMethodName(method)) return;
  nativeAsyncHandlers[method] = func;
};
/** ---------------------------------------------------------
 * removeNativeMethod
 */


exports.addNativeAsyncMethod = addNativeAsyncMethod;

var removeNativeMethod = function removeNativeMethod(method) {
  if (isBuiltinMethodName(method)) return;
  delete nativeSyncHandlers[method];
  delete nativeAsyncHandlers[method];
};
/** ---------------------------------------------------------
 * builtinMethods
 */


exports.removeNativeMethod = removeNativeMethod;
addNativeSyncMethod('_dsb.dsinit', function () {
  var res = {
    data: true
  };
  return JSON.stringify(res);
}, true);
addNativeSyncMethod('_dsb.disableJavascriptDialogBlock', function (argsJson) {
  var _JSON$parse3 = JSON.parse(argsJson),
      disable = _JSON$parse3.disable;

  var res = {
    data: disable
  };
  return JSON.stringify(res);
}, true);
addNativeSyncMethod('_dsb.returnValue', function (argsJson) {
  returnValSub.next(argsJson);
  return;
}, true);
addNativeSyncMethod('_dsb.hasNativeMethod', function (argsJson) {
  var _JSON$parse4 = JSON.parse(argsJson),
      _JSON$parse4$data = _JSON$parse4.data,
      name = _JSON$parse4$data.name,
      type = _JSON$parse4$data.type;

  var hasSyncMethod = (0, _has["default"])(name, nativeSyncHandlers);
  var hasAsyncMethod = (0, _has["default"])(name, nativeAsyncHandlers);
  var hasAllMethods = hasSyncMethod && hasAsyncMethod;
  var exists = (0, _cond["default"])([[(0, _equals["default"])('syn'), (0, _always["default"])(hasSyncMethod)], [(0, _equals["default"])('asyn'), (0, _always["default"])(hasAsyncMethod)], [(0, _equals["default"])('all'), (0, _always["default"])(hasAllMethods)], [_T["default"], _F["default"]]])(type);
  var res = {
    data: exists
  };
  return JSON.stringify(res);
}, true);