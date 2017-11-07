/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataTools = __webpack_require__(2);

var _userControls = __webpack_require__(4);

var _userControls2 = _interopRequireDefault(_userControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _dataTools.createStore)(_userControls2.default);

console.log('called');
exports.default = store;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(0);

var _store2 = _interopRequireDefault(_store);

var _loadAssets = __webpack_require__(5);

var _loadAssets2 = _interopRequireDefault(_loadAssets);

var _targets = __webpack_require__(6);

var _targets2 = __webpack_require__(7);

var _targets3 = _interopRequireDefault(_targets2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_store2.default.subscribe(function () {
  return console.log(_store2.default.getState());
});

var checkKey = function checkKey(e, isDown) {
  e = e || window.event;
  var msg = isDown ? 'PRESSED' : 'RELEASED';

  if (e.keyCode == '75') {
    // up arrow
    _store2.default.dispatch({ type: 'UP_' + msg });
  } else if (e.keyCode == '74') {
    // down arrow
    _store2.default.dispatch({ type: 'DOWN_' + msg });
  } else if (e.keyCode == '72') {
    // left arrow
    _store2.default.dispatch({ type: 'LEFT_' + msg });
  } else if (e.keyCode == '76') {
    // right arrow
    _store2.default.dispatch({ type: 'RIGHT_' + msg });
  }
};

var initGameController = function initGameController() {
  document.onkeydown = function (e) {
    checkKey(e, true);
  };
  document.onkeyup = function (e) {
    checkKey(e, false);
  };
};

var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.style.border = "1px solid #ddd";
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var render = function render(ctx, targets) {
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = '#3d5966';
  ctx.fillRect(0, 0, 400, 400);

  (0, _targets.renderTargets)(ctx, targets);
};

var frame = function frame(targets) {
  render(ctx, targets);
  requestAnimationFrame(function () {
    return frame(targets);
  });
};

window.onload = function () {
  initGameController();

  (0, _loadAssets2.default)(function (assets) {
    _targets3.default.up.image = assets.up.img;
    _targets3.default.down.image = assets.down.img;
    _targets3.default.right.image = assets.right.img;
    _targets3.default.left.image = assets.left.img;
    requestAnimationFrame(function () {
      return frame(_targets3.default);
    });
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _deepFreeze = __webpack_require__(3);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStore = exports.createStore = function createStore(reducerFunction) {
  var state = void 0;
  var listeners = [];

  var getState = function getState() {
    return (0, _deepFreeze2.default)(state);
  };

  var dispatch = function dispatch(action) {
    state = (0, _deepFreeze2.default)(reducerFunction(state, action));
    listeners.forEach(function (listener) {
      return listener();
    });
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);

    return function () {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    };
  };

  dispatch({}); /* force initial state to be applied */

  return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var deepFreeze = function deepFreeze(obj) {
  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function (name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) == 'object' && prop !== null) deepFreeze(prop);
  });

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
};

exports.default = deepFreeze;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  left: false,
  down: false,
  up: false,
  right: false
};

var userControls = function userControls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'UP_PRESSED':
      return _extends({}, state, { up: true });
    case 'DOWN_PRESSED':
      return _extends({}, state, { down: true });
    case 'UP_RELEASED':
      return _extends({}, state, { up: false });
    case 'DOWN_RELEASED':
      return _extends({}, state, { down: false });
    case 'LEFT_PRESSED':
      return _extends({}, state, { left: true });
    case 'RIGHT_PRESSED':
      return _extends({}, state, { right: true });
    case 'LEFT_RELEASED':
      return _extends({}, state, { left: false });
    case 'RIGHT_RELEASED':
      return _extends({}, state, { right: false });
    default:
      return state;
  };
};

exports.default = userControls;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadAssets = function loadAssets(callback) {
  var loadedCount = 0;
  var images = [{ id: 'up', file: "staticUp", ext: ".png" }, { id: 'down', file: "staticDown", ext: ".png" }, { id: 'left', file: "staticLeft", ext: ".png" }, { id: 'right', file: "staticRight", ext: ".png" }];

  var imageLoaded = function imageLoaded(event) {
    loadedCount++;
    if (loadedCount === images.length) callback(assets);
  };

  var assets = images.reduce(function (acc, cur, i) {
    var img = new Image();
    acc[cur.id] = {};
    img.src = "assets/" + cur.file + cur.ext;
    img.onload = imageLoaded;
    acc[cur.id].img = img;
    return acc;
  }, {});
};

exports.default = loadAssets;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTargets = exports.renderActiveTarget = undefined;

var _store = __webpack_require__(0);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderActiveTarget = exports.renderActiveTarget = function renderActiveTarget(ctx, keyId, target) {
  ctx.beginPath();
  ctx.arc(target.x + 25, 75, 25, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.shadowColor = 'rgb(255,255,255)';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = null;
  ctx.shadowColor = null;
};

var renderTargets = exports.renderTargets = function renderTargets(ctx, targets) {
  var state = _store2.default.getState();

  ctx.drawImage(targets.left.image, targets.left.x, targets.left.y, 50, 50);
  ctx.drawImage(targets.down.image, targets.down.x, targets.down.y, 50, 50);
  ctx.drawImage(targets.up.image, targets.up.x, targets.up.y, 50, 50);
  ctx.drawImage(targets.right.image, targets.right.x, targets.right.y, 50, 50);

  Object.keys(state).forEach(function (keyboardButton) {
    if (state[keyboardButton]) renderActiveTarget(ctx, keyboardButton, targets[keyboardButton]);
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var targets = {
  left: {
    image: null,
    x: 50,
    y: 50
  },
  down: {
    image: null,
    x: 125,
    y: 50
  },
  up: {
    image: null,
    x: 200,
    y: 50
  },
  right: {
    image: null,
    x: 275,
    y: 50
  }
};

exports.default = targets;

/***/ })
/******/ ]);