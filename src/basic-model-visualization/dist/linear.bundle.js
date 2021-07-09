/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/calculate.js":
/*!**************************!*\
  !*** ./src/calculate.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sigmoid": () => (/* binding */ sigmoid),
/* harmony export */   "renderScale": () => (/* binding */ renderScale),
/* harmony export */   "getWideData": () => (/* binding */ getWideData),
/* harmony export */   "getLongData": () => (/* binding */ getLongData),
/* harmony export */   "sample": () => (/* binding */ sample)
/* harmony export */ });
/**
 * @module calculate
 * @file 有用的函数集合
 */


/** sigmoid 函数
 * @param  {number} x
 */
const sigmoid = x => 1 / (1 + Math.exp(-x));



/** 由数组生成均匀比例尺的函数
 * @param  {Array} X
 */
const renderScale = function (X) {
  let step = (d3.max(X) - d3.min(X)) / 100;
  return d3.range(d3.min(X) - step, d3.max(X) + step, step);
};



/** 由两个向量生成交叉矩阵，即一个宽数据表
 * @param  {} X1
 * @param  {} X2
 * @param  {} f
 */
const getWideData = function (X1, X2, f) {
  let arr = [];
  // 千万不能用 for...in... 可能会有稀奇古怪的错误
  for (let x2 of X2) {
    let arr2 = [];
    for (let x1 of X1) {
      arr2.push(f(x1, x2));
    }
    arr.push(arr2);
  }
  return { X1: X1, X2: X2, Y: arr };
};



/** 由两个向量生成长数据表
 * @param  {} xs
 * @param  {} ys
 * @param  {} f
 */
const getLongData = function (xs, ys, f) {
  // 注意，展开为长数据后，x，y 两个字段的向量都会变得很长，不是原来的向量
  let xsLong = [];
  let ysLong = [];
  let zsLong = [];

  for (let x of xs) {
    for (let y of ys) {
      xsLong.push(x);
      ysLong.push(y);
      zsLong.push(f(x, y));
    }
  }
  return { xs: xsLong, ys: ysLong, zs: zsLong };
};



/** 1:n 随机抽样函数
 * @param  {} scale
 */
const sample = function (scale) {
  return [...Array(scale)]
    .map((d, i) => i)
    .sort((a, b) => Math.random() - 0.5);
};





/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "alpha": () => (/* binding */ alpha),
/* harmony export */   "epochs": () => (/* binding */ epochs),
/* harmony export */   "batchSize": () => (/* binding */ batchSize)
/* harmony export */ });
const scale = 200;
const alpha = 0.03;
const epochs = 5000;
const batchSize = 50;



/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "regressionPoints": () => (/* binding */ regressionPoints),
/* harmony export */   "regressionTensors": () => (/* binding */ regressionTensors),
/* harmony export */   "classificationPoints": () => (/* binding */ classificationPoints),
/* harmony export */   "classificationTensors": () => (/* binding */ classificationTensors),
/* harmony export */   "linearPoints": () => (/* binding */ linearPoints),
/* harmony export */   "linearTensors": () => (/* binding */ linearTensors),
/* harmony export */   "circlePoints": () => (/* binding */ circlePoints),
/* harmony export */   "circleTensors": () => (/* binding */ circleTensors),
/* harmony export */   "positivePoints": () => (/* binding */ positivePoints),
/* harmony export */   "negativePoints": () => (/* binding */ negativePoints),
/* harmony export */   "SpiralTensors": () => (/* binding */ SpiralTensors)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/**
 * @module data
 * @file 
 */




// 01 一元回归数据
function renderRegressionPoints(scale) {
  const X = [...Array(scale)].map(d => Math.random()).sort();
  const Y = X.map(x => 1.2 * x + Math.random() / 10);
  return { X: X, Y: Y };
};
const regressionPoints = renderRegressionPoints(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale);
const regressionTensors = {
  X: tf.tensor2d(regressionPoints.X, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1]),
  Y: tf.tensor2d(regressionPoints.Y, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1])
};


// 02 一元分类数据
function renderClassificationPoints(scale) {
  const X = [...Array(scale)].map(d => 2 * Math.random()).sort();
  const conditions = X.map(x => 0.7 * x - 0.02 * Math.random() + 0.51);
  const Y = conditions.map(condition => condition > 0.8 && condition < 1.4 ? 1 : 0);
  return { X: X, Y: Y };
}
const classificationPoints = renderClassificationPoints(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale);
const classificationTensors = {
  X: tf.tensor2d(classificationPoints.X, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1]),
  Y: tf.tensor2d(classificationPoints.Y, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1])
};


// 03 二元线性可分数据
function renderDualLinearPoints(scale) {
  const X1 = [...Array(scale)].map(d => d3.randomNormal()());
  const X2 = [...Array(scale)].map(d => d3.randomNormal()());

  const X = [], Y = [];
  for (let i of d3.range(scale)) {
    X.push([X1[i], X2[i]]);
    Y.push(X2[i] - 0.5 * X1[i] - 0.1 > 0 ? 1 : 0);
  }

  return { X1: X1, X2: X2, X: X, Y: Y };
}
const linearPoints = renderDualLinearPoints(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale);
const linearTensors = {
  input: tf.tensor2d(linearPoints.X, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 2]),
  output: tf.tensor2d(linearPoints.Y, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1])
};


// 04 二元圆形数据
function renderDualCirclePoints(scale) {
  const X1 = [...Array(scale)].map(d => d3.randomNormal()());
  const X2 = [...Array(scale)].map(d => d3.randomNormal()());

  const X = [], Y = [];
  for (let i of d3.range(scale)) {
    X.push([X1[i], X2[i]]);
    Y.push(X1[i] ** 2 + X2[i] ** 2 < 0.5 ? 1 : 0);
  }

  return { X1: X1, X2: X2, X: X, Y: Y };
}
const circlePoints = renderDualCirclePoints(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale);
const circleTensors = {
  input: tf.tensor2d(circlePoints.X, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 2]),
  output: tf.tensor2d(circlePoints.Y, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1])
};


// 05 二元双螺旋数据
function renderDualSpiralPoints(scale, theta0, label) {

  const spiralPoints = [...Array(scale)].map((d, i) => {
    const r = 5 * i / scale + 0.5;
    const theta = 2 * Math.PI * 1.75 * i / scale + theta0;
    const x1 = r * Math.cos(theta) + Math.random() / 5 - 0.1;
    const x2 = r * Math.sin(theta) + Math.random() / 5 - 0.1;
    return { x1: x1, x2: x2, x: [x1, x2], y: label };
  });

  const spiralDataFrame = {
    X1: spiralPoints.map(point => point.x1),
    X2: spiralPoints.map(point => point.x2),
    X: spiralPoints.map(point => point.x),
    Y: spiralPoints.map(point => point.y)
  };

  return spiralDataFrame;
};
const positivePoints = renderDualSpiralPoints(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale / 2, 0, 1);
const negativePoints = renderDualSpiralPoints(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale / 2, Math.PI, 0);

function renderSpiralTensors(positivePoints, negativePoints) {
  const X = positivePoints.X.concat(negativePoints.X);
  const Y = positivePoints.Y.concat(negativePoints.Y);

  return {
    input: tf.tensor2d(X, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 2]),
    output: tf.tensor2d(Y, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale, 1])
  };
}
const SpiralTensors = renderSpiralTensors(positivePoints, negativePoints);








/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/linear.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _calculate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculate.js */ "./src/calculate.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.js */ "./src/data.js");
/**
 * @file 二元线性可分数据的二分类问题
 */





const X1Scale = (0,_calculate_js__WEBPACK_IMPORTED_MODULE_1__.renderScale)(_data_js__WEBPACK_IMPORTED_MODULE_2__.linearPoints.X1);
const X2Scale = (0,_calculate_js__WEBPACK_IMPORTED_MODULE_1__.renderScale)(_data_js__WEBPACK_IMPORTED_MODULE_2__.linearPoints.X2);


// Plotting
const pointsTrace = {
  name: 'points',
  type: 'scatter3d',
  mode: 'markers',
  x: _data_js__WEBPACK_IMPORTED_MODULE_2__.linearPoints.X1,
  y: _data_js__WEBPACK_IMPORTED_MODULE_2__.linearPoints.X2,
  z: _data_js__WEBPACK_IMPORTED_MODULE_2__.linearPoints.Y,
  marker: {
    color: 'black',
    symbol: 'circle',
    size: 1.5,
    opacity: 0.9
  }
};

const wideData = (0,_calculate_js__WEBPACK_IMPORTED_MODULE_1__.getWideData)(X1Scale, X2Scale, (x1, x2) => 0.5);
let surfaceTrace = {
  name: 'fitting surface',
  type: 'surface',
  x: wideData.X1,
  y: wideData.X2,
  z: wideData.Y,
  opacity: 0.5,
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true } // 等高线
    }
  }
};

const layout = {
  scene: {
    camera: {
      eye: { x: 1.77, y: 1.88, z: -1.25 }
    }
  }
};

Plotly.newPlot('03-dual-linear-classification', [pointsTrace, surfaceTrace], layout);


// Define Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });


// Train Model
function updatePlot(plotDivId, traceIndex, plotTitle, N) {
  const loss = model.evaluate(_data_js__WEBPACK_IMPORTED_MODULE_2__.linearTensors.input, _data_js__WEBPACK_IMPORTED_MODULE_2__.linearTensors.output)[0].dataSync();

  const n = X1Scale.length;
  const YTable = [];
  for (let j of X2Scale) {
    const columnArray = [];
    for (let i of X1Scale) {
      columnArray.push([i, j]);
    }
    const columnTensor = tf.tensor2d(columnArray, [n, 2]);
    const columnValue = model.predict(columnTensor).dataSync();
    YTable.push(columnValue);
  }

  const newStatus = {
    data: [{
      x: X1Scale,
      y: X2Scale,
      z: YTable,
    }],
    traces: [traceIndex],
    layout: {
      title: {
        text: `${plotTitle}: 第 ${N + 1} 次迭代, loss = ${d3.format(".4f")(loss)}`,
      },
    },
  };

  Plotly.animate(plotDivId, newStatus, {
    transition: {
      duration: 10,
    },
    frame: {
      duration: 10,
    }
  });
}

(async () => {
  await model.fit(_data_js__WEBPACK_IMPORTED_MODULE_2__.linearTensors.input, _data_js__WEBPACK_IMPORTED_MODULE_2__.linearTensors.output, {
    epochs: _config_js__WEBPACK_IMPORTED_MODULE_0__.epochs,
    batchSize: _config_js__WEBPACK_IMPORTED_MODULE_0__.batchSize,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 50 === 0) {
          updatePlot('03-dual-linear-classification', 1, '线性可分数据的分类问题', epoch);
        }
      }
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvLi9zcmMvY2FsY3VsYXRlLmpzIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzLy4vc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzLy4vc3JjL2xpbmVhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7OztBQUlBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7Ozs7QUFJQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7OztBQUlBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7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Q0EsR0FBRztBQUNILENBQUMsSSIsImZpbGUiOiJsaW5lYXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBtb2R1bGUgY2FsY3VsYXRlXHJcbiAqIEBmaWxlIOacieeUqOeahOWHveaVsOmbhuWQiFxyXG4gKi9cclxuXHJcblxyXG4vKiogc2lnbW9pZCDlh73mlbBcclxuICogQHBhcmFtICB7bnVtYmVyfSB4XHJcbiAqL1xyXG5jb25zdCBzaWdtb2lkID0geCA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpO1xyXG5cclxuXHJcblxyXG4vKiog55Sx5pWw57uE55Sf5oiQ5Z2H5YyA5q+U5L6L5bC655qE5Ye95pWwXHJcbiAqIEBwYXJhbSAge0FycmF5fSBYXHJcbiAqL1xyXG5jb25zdCByZW5kZXJTY2FsZSA9IGZ1bmN0aW9uIChYKSB7XHJcbiAgbGV0IHN0ZXAgPSAoZDMubWF4KFgpIC0gZDMubWluKFgpKSAvIDEwMDtcclxuICByZXR1cm4gZDMucmFuZ2UoZDMubWluKFgpIC0gc3RlcCwgZDMubWF4KFgpICsgc3RlcCwgc3RlcCk7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKiDnlLHkuKTkuKrlkJHph4/nlJ/miJDkuqTlj4nnn6npmLXvvIzljbPkuIDkuKrlrr3mlbDmja7ooahcclxuICogQHBhcmFtICB7fSBYMVxyXG4gKiBAcGFyYW0gIHt9IFgyXHJcbiAqIEBwYXJhbSAge30gZlxyXG4gKi9cclxuY29uc3QgZ2V0V2lkZURhdGEgPSBmdW5jdGlvbiAoWDEsIFgyLCBmKSB7XHJcbiAgbGV0IGFyciA9IFtdO1xyXG4gIC8vIOWNg+S4h+S4jeiDveeUqCBmb3IuLi5pbi4uLiDlj6/og73kvJrmnInnqIDlpYflj6TmgKrnmoTplJnor69cclxuICBmb3IgKGxldCB4MiBvZiBYMikge1xyXG4gICAgbGV0IGFycjIgPSBbXTtcclxuICAgIGZvciAobGV0IHgxIG9mIFgxKSB7XHJcbiAgICAgIGFycjIucHVzaChmKHgxLCB4MikpO1xyXG4gICAgfVxyXG4gICAgYXJyLnB1c2goYXJyMik7XHJcbiAgfVxyXG4gIHJldHVybiB7IFgxOiBYMSwgWDI6IFgyLCBZOiBhcnIgfTtcclxufTtcclxuXHJcblxyXG5cclxuLyoqIOeUseS4pOS4quWQkemHj+eUn+aIkOmVv+aVsOaNruihqFxyXG4gKiBAcGFyYW0gIHt9IHhzXHJcbiAqIEBwYXJhbSAge30geXNcclxuICogQHBhcmFtICB7fSBmXHJcbiAqL1xyXG5jb25zdCBnZXRMb25nRGF0YSA9IGZ1bmN0aW9uICh4cywgeXMsIGYpIHtcclxuICAvLyDms6jmhI/vvIzlsZXlvIDkuLrplb/mlbDmja7lkI7vvIx477yMeSDkuKTkuKrlrZfmrrXnmoTlkJHph4/pg73kvJrlj5jlvpflvojplb/vvIzkuI3mmK/ljp/mnaXnmoTlkJHph49cclxuICBsZXQgeHNMb25nID0gW107XHJcbiAgbGV0IHlzTG9uZyA9IFtdO1xyXG4gIGxldCB6c0xvbmcgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgeCBvZiB4cykge1xyXG4gICAgZm9yIChsZXQgeSBvZiB5cykge1xyXG4gICAgICB4c0xvbmcucHVzaCh4KTtcclxuICAgICAgeXNMb25nLnB1c2goeSk7XHJcbiAgICAgIHpzTG9uZy5wdXNoKGYoeCwgeSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4geyB4czogeHNMb25nLCB5czogeXNMb25nLCB6czogenNMb25nIH07XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKiAxOm4g6ZqP5py65oq95qC35Ye95pWwXHJcbiAqIEBwYXJhbSAge30gc2NhbGVcclxuICovXHJcbmNvbnN0IHNhbXBsZSA9IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gIHJldHVybiBbLi4uQXJyYXkoc2NhbGUpXVxyXG4gICAgLm1hcCgoZCwgaSkgPT4gaSlcclxuICAgIC5zb3J0KChhLCBiKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IHsgc2lnbW9pZCwgcmVuZGVyU2NhbGUsIGdldFdpZGVEYXRhLCBnZXRMb25nRGF0YSwgc2FtcGxlIH07IiwiY29uc3Qgc2NhbGUgPSAyMDA7XHJcbmNvbnN0IGFscGhhID0gMC4wMztcclxuY29uc3QgZXBvY2hzID0gNTAwMDtcclxuY29uc3QgYmF0Y2hTaXplID0gNTA7XHJcblxyXG5leHBvcnQgeyBzY2FsZSwgYWxwaGEsIGVwb2NocywgYmF0Y2hTaXplIH07IiwiLyoqXHJcbiAqIEBtb2R1bGUgZGF0YVxyXG4gKiBAZmlsZSBcclxuICovXHJcblxyXG5pbXBvcnQgeyBzY2FsZSB9IGZyb20gJy4vY29uZmlnLmpzJztcclxuXHJcblxyXG4vLyAwMSDkuIDlhYPlm57lvZLmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyUmVncmVzc2lvblBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFggPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBNYXRoLnJhbmRvbSgpKS5zb3J0KCk7XHJcbiAgY29uc3QgWSA9IFgubWFwKHggPT4gMS4yICogeCArIE1hdGgucmFuZG9tKCkgLyAxMCk7XHJcbiAgcmV0dXJuIHsgWDogWCwgWTogWSB9O1xyXG59O1xyXG5jb25zdCByZWdyZXNzaW9uUG9pbnRzID0gcmVuZGVyUmVncmVzc2lvblBvaW50cyhzY2FsZSk7XHJcbmNvbnN0IHJlZ3Jlc3Npb25UZW5zb3JzID0ge1xyXG4gIFg6IHRmLnRlbnNvcjJkKHJlZ3Jlc3Npb25Qb2ludHMuWCwgW3NjYWxlLCAxXSksXHJcbiAgWTogdGYudGVuc29yMmQocmVncmVzc2lvblBvaW50cy5ZLCBbc2NhbGUsIDFdKVxyXG59O1xyXG5cclxuXHJcbi8vIDAyIOS4gOWFg+WIhuexu+aVsOaNrlxyXG5mdW5jdGlvbiByZW5kZXJDbGFzc2lmaWNhdGlvblBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFggPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiAyICogTWF0aC5yYW5kb20oKSkuc29ydCgpO1xyXG4gIGNvbnN0IGNvbmRpdGlvbnMgPSBYLm1hcCh4ID0+IDAuNyAqIHggLSAwLjAyICogTWF0aC5yYW5kb20oKSArIDAuNTEpO1xyXG4gIGNvbnN0IFkgPSBjb25kaXRpb25zLm1hcChjb25kaXRpb24gPT4gY29uZGl0aW9uID4gMC44ICYmIGNvbmRpdGlvbiA8IDEuNCA/IDEgOiAwKTtcclxuICByZXR1cm4geyBYOiBYLCBZOiBZIH07XHJcbn1cclxuY29uc3QgY2xhc3NpZmljYXRpb25Qb2ludHMgPSByZW5kZXJDbGFzc2lmaWNhdGlvblBvaW50cyhzY2FsZSk7XHJcbmNvbnN0IGNsYXNzaWZpY2F0aW9uVGVuc29ycyA9IHtcclxuICBYOiB0Zi50ZW5zb3IyZChjbGFzc2lmaWNhdGlvblBvaW50cy5YLCBbc2NhbGUsIDFdKSxcclxuICBZOiB0Zi50ZW5zb3IyZChjbGFzc2lmaWNhdGlvblBvaW50cy5ZLCBbc2NhbGUsIDFdKVxyXG59O1xyXG5cclxuXHJcbi8vIDAzIOS6jOWFg+e6v+aAp+WPr+WIhuaVsOaNrlxyXG5mdW5jdGlvbiByZW5kZXJEdWFsTGluZWFyUG9pbnRzKHNjYWxlKSB7XHJcbiAgY29uc3QgWDEgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuICBjb25zdCBYMiA9IFsuLi5BcnJheShzY2FsZSldLm1hcChkID0+IGQzLnJhbmRvbU5vcm1hbCgpKCkpO1xyXG5cclxuICBjb25zdCBYID0gW10sIFkgPSBbXTtcclxuICBmb3IgKGxldCBpIG9mIGQzLnJhbmdlKHNjYWxlKSkge1xyXG4gICAgWC5wdXNoKFtYMVtpXSwgWDJbaV1dKTtcclxuICAgIFkucHVzaChYMltpXSAtIDAuNSAqIFgxW2ldIC0gMC4xID4gMCA/IDEgOiAwKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IFgxOiBYMSwgWDI6IFgyLCBYOiBYLCBZOiBZIH07XHJcbn1cclxuY29uc3QgbGluZWFyUG9pbnRzID0gcmVuZGVyRHVhbExpbmVhclBvaW50cyhzY2FsZSk7XHJcbmNvbnN0IGxpbmVhclRlbnNvcnMgPSB7XHJcbiAgaW5wdXQ6IHRmLnRlbnNvcjJkKGxpbmVhclBvaW50cy5YLCBbc2NhbGUsIDJdKSxcclxuICBvdXRwdXQ6IHRmLnRlbnNvcjJkKGxpbmVhclBvaW50cy5ZLCBbc2NhbGUsIDFdKVxyXG59O1xyXG5cclxuXHJcbi8vIDA0IOS6jOWFg+WchuW9ouaVsOaNrlxyXG5mdW5jdGlvbiByZW5kZXJEdWFsQ2lyY2xlUG9pbnRzKHNjYWxlKSB7XHJcbiAgY29uc3QgWDEgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuICBjb25zdCBYMiA9IFsuLi5BcnJheShzY2FsZSldLm1hcChkID0+IGQzLnJhbmRvbU5vcm1hbCgpKCkpO1xyXG5cclxuICBjb25zdCBYID0gW10sIFkgPSBbXTtcclxuICBmb3IgKGxldCBpIG9mIGQzLnJhbmdlKHNjYWxlKSkge1xyXG4gICAgWC5wdXNoKFtYMVtpXSwgWDJbaV1dKTtcclxuICAgIFkucHVzaChYMVtpXSAqKiAyICsgWDJbaV0gKiogMiA8IDAuNSA/IDEgOiAwKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IFgxOiBYMSwgWDI6IFgyLCBYOiBYLCBZOiBZIH07XHJcbn1cclxuY29uc3QgY2lyY2xlUG9pbnRzID0gcmVuZGVyRHVhbENpcmNsZVBvaW50cyhzY2FsZSk7XHJcbmNvbnN0IGNpcmNsZVRlbnNvcnMgPSB7XHJcbiAgaW5wdXQ6IHRmLnRlbnNvcjJkKGNpcmNsZVBvaW50cy5YLCBbc2NhbGUsIDJdKSxcclxuICBvdXRwdXQ6IHRmLnRlbnNvcjJkKGNpcmNsZVBvaW50cy5ZLCBbc2NhbGUsIDFdKVxyXG59O1xyXG5cclxuXHJcbi8vIDA1IOS6jOWFg+WPjOieuuaXi+aVsOaNrlxyXG5mdW5jdGlvbiByZW5kZXJEdWFsU3BpcmFsUG9pbnRzKHNjYWxlLCB0aGV0YTAsIGxhYmVsKSB7XHJcblxyXG4gIGNvbnN0IHNwaXJhbFBvaW50cyA9IFsuLi5BcnJheShzY2FsZSldLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgY29uc3QgciA9IDUgKiBpIC8gc2NhbGUgKyAwLjU7XHJcbiAgICBjb25zdCB0aGV0YSA9IDIgKiBNYXRoLlBJICogMS43NSAqIGkgLyBzY2FsZSArIHRoZXRhMDtcclxuICAgIGNvbnN0IHgxID0gciAqIE1hdGguY29zKHRoZXRhKSArIE1hdGgucmFuZG9tKCkgLyA1IC0gMC4xO1xyXG4gICAgY29uc3QgeDIgPSByICogTWF0aC5zaW4odGhldGEpICsgTWF0aC5yYW5kb20oKSAvIDUgLSAwLjE7XHJcbiAgICByZXR1cm4geyB4MTogeDEsIHgyOiB4MiwgeDogW3gxLCB4Ml0sIHk6IGxhYmVsIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHNwaXJhbERhdGFGcmFtZSA9IHtcclxuICAgIFgxOiBzcGlyYWxQb2ludHMubWFwKHBvaW50ID0+IHBvaW50LngxKSxcclxuICAgIFgyOiBzcGlyYWxQb2ludHMubWFwKHBvaW50ID0+IHBvaW50LngyKSxcclxuICAgIFg6IHNwaXJhbFBvaW50cy5tYXAocG9pbnQgPT4gcG9pbnQueCksXHJcbiAgICBZOiBzcGlyYWxQb2ludHMubWFwKHBvaW50ID0+IHBvaW50LnkpXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHNwaXJhbERhdGFGcmFtZTtcclxufTtcclxuY29uc3QgcG9zaXRpdmVQb2ludHMgPSByZW5kZXJEdWFsU3BpcmFsUG9pbnRzKHNjYWxlIC8gMiwgMCwgMSk7XHJcbmNvbnN0IG5lZ2F0aXZlUG9pbnRzID0gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSAvIDIsIE1hdGguUEksIDApO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyU3BpcmFsVGVuc29ycyhwb3NpdGl2ZVBvaW50cywgbmVnYXRpdmVQb2ludHMpIHtcclxuICBjb25zdCBYID0gcG9zaXRpdmVQb2ludHMuWC5jb25jYXQobmVnYXRpdmVQb2ludHMuWCk7XHJcbiAgY29uc3QgWSA9IHBvc2l0aXZlUG9pbnRzLlkuY29uY2F0KG5lZ2F0aXZlUG9pbnRzLlkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5wdXQ6IHRmLnRlbnNvcjJkKFgsIFtzY2FsZSwgMl0pLFxyXG4gICAgb3V0cHV0OiB0Zi50ZW5zb3IyZChZLCBbc2NhbGUsIDFdKVxyXG4gIH07XHJcbn1cclxuY29uc3QgU3BpcmFsVGVuc29ycyA9IHJlbmRlclNwaXJhbFRlbnNvcnMocG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgcmVncmVzc2lvblBvaW50cywgcmVncmVzc2lvblRlbnNvcnMsIGNsYXNzaWZpY2F0aW9uUG9pbnRzLCBjbGFzc2lmaWNhdGlvblRlbnNvcnMsIGxpbmVhclBvaW50cywgbGluZWFyVGVuc29ycywgY2lyY2xlUG9pbnRzLCBjaXJjbGVUZW5zb3JzLCBwb3NpdGl2ZVBvaW50cywgbmVnYXRpdmVQb2ludHMsIFNwaXJhbFRlbnNvcnMgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBAZmlsZSDkuozlhYPnur/mgKflj6/liIbmlbDmja7nmoTkuozliIbnsbvpl67pophcclxuICovXHJcblxyXG5cclxuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzJztcclxuaW1wb3J0IHsgcmVuZGVyU2NhbGUsIGdldFdpZGVEYXRhIH0gZnJvbSAnLi9jYWxjdWxhdGUuanMnO1xyXG5pbXBvcnQgeyBsaW5lYXJQb2ludHMsIGxpbmVhclRlbnNvcnMgfSBmcm9tICcuL2RhdGEuanMnO1xyXG5jb25zdCBYMVNjYWxlID0gcmVuZGVyU2NhbGUobGluZWFyUG9pbnRzLlgxKTtcclxuY29uc3QgWDJTY2FsZSA9IHJlbmRlclNjYWxlKGxpbmVhclBvaW50cy5YMik7XHJcblxyXG5cclxuLy8gUGxvdHRpbmdcclxuY29uc3QgcG9pbnRzVHJhY2UgPSB7XHJcbiAgbmFtZTogJ3BvaW50cycsXHJcbiAgdHlwZTogJ3NjYXR0ZXIzZCcsXHJcbiAgbW9kZTogJ21hcmtlcnMnLFxyXG4gIHg6IGxpbmVhclBvaW50cy5YMSxcclxuICB5OiBsaW5lYXJQb2ludHMuWDIsXHJcbiAgejogbGluZWFyUG9pbnRzLlksXHJcbiAgbWFya2VyOiB7XHJcbiAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgIHN5bWJvbDogJ2NpcmNsZScsXHJcbiAgICBzaXplOiAxLjUsXHJcbiAgICBvcGFjaXR5OiAwLjlcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCB3aWRlRGF0YSA9IGdldFdpZGVEYXRhKFgxU2NhbGUsIFgyU2NhbGUsICh4MSwgeDIpID0+IDAuNSk7XHJcbmxldCBzdXJmYWNlVHJhY2UgPSB7XHJcbiAgbmFtZTogJ2ZpdHRpbmcgc3VyZmFjZScsXHJcbiAgdHlwZTogJ3N1cmZhY2UnLFxyXG4gIHg6IHdpZGVEYXRhLlgxLFxyXG4gIHk6IHdpZGVEYXRhLlgyLFxyXG4gIHo6IHdpZGVEYXRhLlksXHJcbiAgb3BhY2l0eTogMC41LFxyXG4gIGNvbnRvdXJzOiB7XHJcbiAgICB6OiB7XHJcbiAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgIHVzZWNvbG9ybWFwOiB0cnVlLFxyXG4gICAgICBoaWdobGlnaHRjb2xvcjogXCIjNDJmNDYyXCIsXHJcbiAgICAgIHByb2plY3Q6IHsgejogdHJ1ZSB9IC8vIOetiemrmOe6v1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxheW91dCA9IHtcclxuICBzY2VuZToge1xyXG4gICAgY2FtZXJhOiB7XHJcbiAgICAgIGV5ZTogeyB4OiAxLjc3LCB5OiAxLjg4LCB6OiAtMS4yNSB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuUGxvdGx5Lm5ld1Bsb3QoJzAzLWR1YWwtbGluZWFyLWNsYXNzaWZpY2F0aW9uJywgW3BvaW50c1RyYWNlLCBzdXJmYWNlVHJhY2VdLCBsYXlvdXQpO1xyXG5cclxuXHJcbi8vIERlZmluZSBNb2RlbFxyXG5jb25zdCBtb2RlbCA9IHRmLnNlcXVlbnRpYWwoKTtcclxubW9kZWwuYWRkKHRmLmxheWVycy5kZW5zZSh7IGlucHV0U2hhcGU6IFsyXSwgdW5pdHM6IDEsIGFjdGl2YXRpb246ICdzaWdtb2lkJyB9KSk7XHJcbm1vZGVsLmNvbXBpbGUoeyBvcHRpbWl6ZXI6ICdhZGFtJywgbG9zczogJ2JpbmFyeUNyb3NzZW50cm9weScsIG1ldHJpY3M6IFsnYWNjdXJhY3knXSB9KTtcclxuXHJcblxyXG4vLyBUcmFpbiBNb2RlbFxyXG5mdW5jdGlvbiB1cGRhdGVQbG90KHBsb3REaXZJZCwgdHJhY2VJbmRleCwgcGxvdFRpdGxlLCBOKSB7XHJcbiAgY29uc3QgbG9zcyA9IG1vZGVsLmV2YWx1YXRlKGxpbmVhclRlbnNvcnMuaW5wdXQsIGxpbmVhclRlbnNvcnMub3V0cHV0KVswXS5kYXRhU3luYygpO1xyXG5cclxuICBjb25zdCBuID0gWDFTY2FsZS5sZW5ndGg7XHJcbiAgY29uc3QgWVRhYmxlID0gW107XHJcbiAgZm9yIChsZXQgaiBvZiBYMlNjYWxlKSB7XHJcbiAgICBjb25zdCBjb2x1bW5BcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSBvZiBYMVNjYWxlKSB7XHJcbiAgICAgIGNvbHVtbkFycmF5LnB1c2goW2ksIGpdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbHVtblRlbnNvciA9IHRmLnRlbnNvcjJkKGNvbHVtbkFycmF5LCBbbiwgMl0pO1xyXG4gICAgY29uc3QgY29sdW1uVmFsdWUgPSBtb2RlbC5wcmVkaWN0KGNvbHVtblRlbnNvcikuZGF0YVN5bmMoKTtcclxuICAgIFlUYWJsZS5wdXNoKGNvbHVtblZhbHVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5ld1N0YXR1cyA9IHtcclxuICAgIGRhdGE6IFt7XHJcbiAgICAgIHg6IFgxU2NhbGUsXHJcbiAgICAgIHk6IFgyU2NhbGUsXHJcbiAgICAgIHo6IFlUYWJsZSxcclxuICAgIH1dLFxyXG4gICAgdHJhY2VzOiBbdHJhY2VJbmRleF0sXHJcbiAgICBsYXlvdXQ6IHtcclxuICAgICAgdGl0bGU6IHtcclxuICAgICAgICB0ZXh0OiBgJHtwbG90VGl0bGV9OiDnrKwgJHtOICsgMX0g5qyh6L+t5LujLCBsb3NzID0gJHtkMy5mb3JtYXQoXCIuNGZcIikobG9zcyl9YCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgUGxvdGx5LmFuaW1hdGUocGxvdERpdklkLCBuZXdTdGF0dXMsIHtcclxuICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgZHVyYXRpb246IDEwLFxyXG4gICAgfSxcclxuICAgIGZyYW1lOiB7XHJcbiAgICAgIGR1cmF0aW9uOiAxMCxcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCBtb2RlbC5maXQobGluZWFyVGVuc29ycy5pbnB1dCwgbGluZWFyVGVuc29ycy5vdXRwdXQsIHtcclxuICAgIGVwb2NoczogY29uZmlnLmVwb2NocyxcclxuICAgIGJhdGNoU2l6ZTogY29uZmlnLmJhdGNoU2l6ZSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICBvbkVwb2NoRW5kOiBhc3luYyAoZXBvY2gsIGxvZ3MpID0+IHtcclxuICAgICAgICBpZiAoKGVwb2NoICsgMSkgJSA1MCA9PT0gMCkge1xyXG4gICAgICAgICAgdXBkYXRlUGxvdCgnMDMtZHVhbC1saW5lYXItY2xhc3NpZmljYXRpb24nLCAxLCAn57q/5oCn5Y+v5YiG5pWw5o2u55qE5YiG57G76Zeu6aKYJywgZXBvY2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiIn0=