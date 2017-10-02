/*!
 * The MIT License
 * 
 * Copyright (c) 2017 te schultz
 * https://github.com/artisin/switchreducer
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */


/* eslint-disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/isUndefined"), require("lodash/isFunction"), require("lodash/has"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/isUndefined", "lodash/isFunction", "lodash/has"], factory);
	else if(typeof exports === 'object')
		exports["switchreducer"] = factory(require("lodash/isUndefined"), require("lodash/isFunction"), require("lodash/has"));
	else
		root["switchreducer"] = factory(root["lodash/isUndefined"], root["lodash/isFunction"], root["lodash/has"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchreducer = exports.switchcase = undefined;

var _isUndefined = __webpack_require__(1);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isFunction = __webpack_require__(2);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _has2 = __webpack_require__(3);

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var switchcase = exports.switchcase = function switchcase(cases) {
  return function (defaultState) {
    return function (key) {
      return function (f) {
        return (0, _isFunction2.default)(f) ? f() : f;
      }(function () {
        return (0, _has3.default)(cases, key) ? cases[key] : defaultState;
      }());
    };
  };
};

/**
 * Switch reduce lib default export
 * @param  {---} initstate -> inital reducer state
 * @param  {fnc} cases)    -> reducer
 * @return {[type]}           [description]
 */
var switchreducer = exports.switchreducer = function switchreducer(initstate, cases) {
  return function (state, action) {
    state = (0, _isUndefined2.default)(state) ? initstate : state;
    var type = action.type;

    return switchcase(cases(Object.assign({}, { state: state }, action)))(state)(type);
  };
};
exports.default = switchreducer;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash/isUndefined");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash/has");

/***/ })
/******/ ]);
});
//# sourceMappingURL=switchreducer.js.map