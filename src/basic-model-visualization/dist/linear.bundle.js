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
 * @file 二元线性可分数据的分类问题
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

Plotly.newPlot('03-dual-linear-classification', [pointsTrace, surfaceTrace]);


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
      duration: 1,
    },
    frame: {
      duration: 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvLi9zcmMvY2FsY3VsYXRlLmpzIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzLy4vc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzLy4vc3JjL2xpbmVhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7OztBQUlBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7Ozs7QUFJQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7OztBQUlBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7OztBQUdwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGdEQUFnRCw2Q0FBSztBQUNyRDtBQUNBLHNDQUFzQyw2Q0FBSztBQUMzQyxzQ0FBc0MsNkNBQUs7QUFDM0M7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSx3REFBd0QsNkNBQUs7QUFDN0Q7QUFDQSwwQ0FBMEMsNkNBQUs7QUFDL0MsMENBQTBDLDZDQUFLO0FBQy9DOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBLDRDQUE0Qyw2Q0FBSztBQUNqRDtBQUNBLHNDQUFzQyw2Q0FBSztBQUMzQyx1Q0FBdUMsNkNBQUs7QUFDNUM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0EsNENBQTRDLDZDQUFLO0FBQ2pEO0FBQ0Esc0NBQXNDLDZDQUFLO0FBQzNDLHVDQUF1Qyw2Q0FBSztBQUM1Qzs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsNkNBQUs7QUFDbkQsOENBQThDLDZDQUFLOztBQUVuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsNkNBQUs7QUFDaEMsNEJBQTRCLDZDQUFLO0FBQ2pDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztVQzNHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBOzs7QUFHc0M7QUFDb0I7QUFDRjtBQUN4RCxnQkFBZ0IsMERBQVcsQ0FBQyxxREFBZTtBQUMzQyxnQkFBZ0IsMERBQVcsQ0FBQyxxREFBZTs7O0FBRzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHFEQUFlO0FBQ3BCLEtBQUsscURBQWU7QUFDcEIsS0FBSyxvREFBYztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsMERBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsMkJBQTJCLG1EQUFtRDtBQUM5RSxlQUFlLHVFQUF1RTs7O0FBR3RGO0FBQ0E7QUFDQSw4QkFBOEIseURBQW1CLEVBQUUsMERBQW9COztBQUV2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVUsTUFBTSxNQUFNLGVBQWUsdUJBQXVCO0FBQzdFLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGtCQUFrQix5REFBbUIsRUFBRSwwREFBb0I7QUFDM0QsWUFBWSw4Q0FBYTtBQUN6QixlQUFlLGlEQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLEkiLCJmaWxlIjoibGluZWFyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbW9kdWxlIGNhbGN1bGF0ZVxyXG4gKiBAZmlsZSDmnInnlKjnmoTlh73mlbDpm4blkIhcclxuICovXHJcblxyXG5cclxuLyoqIHNpZ21vaWQg5Ye95pWwXHJcbiAqIEBwYXJhbSAge251bWJlcn0geFxyXG4gKi9cclxuY29uc3Qgc2lnbW9pZCA9IHggPT4gMSAvICgxICsgTWF0aC5leHAoLXgpKTtcclxuXHJcblxyXG5cclxuLyoqIOeUseaVsOe7hOeUn+aIkOWdh+WMgOavlOS+i+WwuueahOWHveaVsFxyXG4gKiBAcGFyYW0gIHtBcnJheX0gWFxyXG4gKi9cclxuY29uc3QgcmVuZGVyU2NhbGUgPSBmdW5jdGlvbiAoWCkge1xyXG4gIGxldCBzdGVwID0gKGQzLm1heChYKSAtIGQzLm1pbihYKSkgLyAxMDA7XHJcbiAgcmV0dXJuIGQzLnJhbmdlKGQzLm1pbihYKSAtIHN0ZXAsIGQzLm1heChYKSArIHN0ZXAsIHN0ZXApO1xyXG59O1xyXG5cclxuXHJcblxyXG4vKiog55Sx5Lik5Liq5ZCR6YeP55Sf5oiQ5Lqk5Y+J55+p6Zi177yM5Y2z5LiA5Liq5a695pWw5o2u6KGoXHJcbiAqIEBwYXJhbSAge30gWDFcclxuICogQHBhcmFtICB7fSBYMlxyXG4gKiBAcGFyYW0gIHt9IGZcclxuICovXHJcbmNvbnN0IGdldFdpZGVEYXRhID0gZnVuY3Rpb24gKFgxLCBYMiwgZikge1xyXG4gIGxldCBhcnIgPSBbXTtcclxuICAvLyDljYPkuIfkuI3og73nlKggZm9yLi4uaW4uLi4g5Y+v6IO95Lya5pyJ56iA5aWH5Y+k5oCq55qE6ZSZ6K+vXHJcbiAgZm9yIChsZXQgeDIgb2YgWDIpIHtcclxuICAgIGxldCBhcnIyID0gW107XHJcbiAgICBmb3IgKGxldCB4MSBvZiBYMSkge1xyXG4gICAgICBhcnIyLnB1c2goZih4MSwgeDIpKTtcclxuICAgIH1cclxuICAgIGFyci5wdXNoKGFycjIpO1xyXG4gIH1cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWTogYXJyIH07XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKiDnlLHkuKTkuKrlkJHph4/nlJ/miJDplb/mlbDmja7ooahcclxuICogQHBhcmFtICB7fSB4c1xyXG4gKiBAcGFyYW0gIHt9IHlzXHJcbiAqIEBwYXJhbSAge30gZlxyXG4gKi9cclxuY29uc3QgZ2V0TG9uZ0RhdGEgPSBmdW5jdGlvbiAoeHMsIHlzLCBmKSB7XHJcbiAgLy8g5rOo5oSP77yM5bGV5byA5Li66ZW/5pWw5o2u5ZCO77yMeO+8jHkg5Lik5Liq5a2X5q6155qE5ZCR6YeP6YO95Lya5Y+Y5b6X5b6I6ZW/77yM5LiN5piv5Y6f5p2l55qE5ZCR6YePXHJcbiAgbGV0IHhzTG9uZyA9IFtdO1xyXG4gIGxldCB5c0xvbmcgPSBbXTtcclxuICBsZXQgenNMb25nID0gW107XHJcblxyXG4gIGZvciAobGV0IHggb2YgeHMpIHtcclxuICAgIGZvciAobGV0IHkgb2YgeXMpIHtcclxuICAgICAgeHNMb25nLnB1c2goeCk7XHJcbiAgICAgIHlzTG9uZy5wdXNoKHkpO1xyXG4gICAgICB6c0xvbmcucHVzaChmKHgsIHkpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHsgeHM6IHhzTG9uZywgeXM6IHlzTG9uZywgenM6IHpzTG9uZyB9O1xyXG59O1xyXG5cclxuXHJcblxyXG4vKiogMTpuIOmaj+acuuaKveagt+WHveaVsFxyXG4gKiBAcGFyYW0gIHt9IHNjYWxlXHJcbiAqL1xyXG5jb25zdCBzYW1wbGUgPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICByZXR1cm4gWy4uLkFycmF5KHNjYWxlKV1cclxuICAgIC5tYXAoKGQsIGkpID0+IGkpXHJcbiAgICAuc29ydCgoYSwgYikgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IHNpZ21vaWQsIHJlbmRlclNjYWxlLCBnZXRXaWRlRGF0YSwgZ2V0TG9uZ0RhdGEsIHNhbXBsZSB9OyIsImNvbnN0IHNjYWxlID0gMjAwO1xyXG5jb25zdCBhbHBoYSA9IDAuMDM7XHJcbmNvbnN0IGVwb2NocyA9IDUwMDA7XHJcbmNvbnN0IGJhdGNoU2l6ZSA9IDUwO1xyXG5cclxuZXhwb3J0IHsgc2NhbGUsIGFscGhhLCBlcG9jaHMsIGJhdGNoU2l6ZSB9OyIsIi8qKlxyXG4gKiBAbW9kdWxlIGRhdGFcclxuICogQGZpbGUgXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgc2NhbGUgfSBmcm9tICcuL2NvbmZpZy5qcyc7XHJcblxyXG5cclxuLy8gMDEg5LiA5YWD5Zue5b2S5pWw5o2uXHJcbmZ1bmN0aW9uIHJlbmRlclJlZ3Jlc3Npb25Qb2ludHMoc2NhbGUpIHtcclxuICBjb25zdCBYID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gTWF0aC5yYW5kb20oKSkuc29ydCgpO1xyXG4gIGNvbnN0IFkgPSBYLm1hcCh4ID0+IDEuMiAqIHggKyBNYXRoLnJhbmRvbSgpIC8gMTApO1xyXG4gIHJldHVybiB7IFg6IFgsIFk6IFkgfTtcclxufTtcclxuY29uc3QgcmVncmVzc2lvblBvaW50cyA9IHJlbmRlclJlZ3Jlc3Npb25Qb2ludHMoc2NhbGUpO1xyXG5jb25zdCByZWdyZXNzaW9uVGVuc29ycyA9IHtcclxuICBYOiB0Zi50ZW5zb3IyZChyZWdyZXNzaW9uUG9pbnRzLlgsIFtzY2FsZSwgMV0pLFxyXG4gIFk6IHRmLnRlbnNvcjJkKHJlZ3Jlc3Npb25Qb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwMiDkuIDlhYPliIbnsbvmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyQ2xhc3NpZmljYXRpb25Qb2ludHMoc2NhbGUpIHtcclxuICBjb25zdCBYID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gMiAqIE1hdGgucmFuZG9tKCkpLnNvcnQoKTtcclxuICBjb25zdCBjb25kaXRpb25zID0gWC5tYXAoeCA9PiAwLjcgKiB4IC0gMC4wMiAqIE1hdGgucmFuZG9tKCkgKyAwLjUxKTtcclxuICBjb25zdCBZID0gY29uZGl0aW9ucy5tYXAoY29uZGl0aW9uID0+IGNvbmRpdGlvbiA+IDAuOCAmJiBjb25kaXRpb24gPCAxLjQgPyAxIDogMCk7XHJcbiAgcmV0dXJuIHsgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGNsYXNzaWZpY2F0aW9uUG9pbnRzID0gcmVuZGVyQ2xhc3NpZmljYXRpb25Qb2ludHMoc2NhbGUpO1xyXG5jb25zdCBjbGFzc2lmaWNhdGlvblRlbnNvcnMgPSB7XHJcbiAgWDogdGYudGVuc29yMmQoY2xhc3NpZmljYXRpb25Qb2ludHMuWCwgW3NjYWxlLCAxXSksXHJcbiAgWTogdGYudGVuc29yMmQoY2xhc3NpZmljYXRpb25Qb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwMyDkuozlhYPnur/mgKflj6/liIbmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbExpbmVhclBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFgxID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gZDMucmFuZG9tTm9ybWFsKCkoKSk7XHJcbiAgY29uc3QgWDIgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuXHJcbiAgY29uc3QgWCA9IFtdLCBZID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBkMy5yYW5nZShzY2FsZSkpIHtcclxuICAgIFgucHVzaChbWDFbaV0sIFgyW2ldXSk7XHJcbiAgICBZLnB1c2goWDJbaV0gLSAwLjUgKiBYMVtpXSAtIDAuMSA+IDAgPyAxIDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGxpbmVhclBvaW50cyA9IHJlbmRlckR1YWxMaW5lYXJQb2ludHMoc2NhbGUpO1xyXG5jb25zdCBsaW5lYXJUZW5zb3JzID0ge1xyXG4gIGlucHV0OiB0Zi50ZW5zb3IyZChsaW5lYXJQb2ludHMuWCwgW3NjYWxlLCAyXSksXHJcbiAgb3V0cHV0OiB0Zi50ZW5zb3IyZChsaW5lYXJQb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwNCDkuozlhYPlnIblvaLmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbENpcmNsZVBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFgxID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gZDMucmFuZG9tTm9ybWFsKCkoKSk7XHJcbiAgY29uc3QgWDIgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuXHJcbiAgY29uc3QgWCA9IFtdLCBZID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBkMy5yYW5nZShzY2FsZSkpIHtcclxuICAgIFgucHVzaChbWDFbaV0sIFgyW2ldXSk7XHJcbiAgICBZLnB1c2goWDFbaV0gKiogMiArIFgyW2ldICoqIDIgPCAwLjUgPyAxIDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGNpcmNsZVBvaW50cyA9IHJlbmRlckR1YWxDaXJjbGVQb2ludHMoc2NhbGUpO1xyXG5jb25zdCBjaXJjbGVUZW5zb3JzID0ge1xyXG4gIGlucHV0OiB0Zi50ZW5zb3IyZChjaXJjbGVQb2ludHMuWCwgW3NjYWxlLCAyXSksXHJcbiAgb3V0cHV0OiB0Zi50ZW5zb3IyZChjaXJjbGVQb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwNSDkuozlhYPlj4zonrrml4vmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSwgdGhldGEwLCBsYWJlbCkge1xyXG5cclxuICBjb25zdCBzcGlyYWxQb2ludHMgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoKGQsIGkpID0+IHtcclxuICAgIGNvbnN0IHIgPSA1ICogaSAvIHNjYWxlICsgMC41O1xyXG4gICAgY29uc3QgdGhldGEgPSAyICogTWF0aC5QSSAqIDEuNzUgKiBpIC8gc2NhbGUgKyB0aGV0YTA7XHJcbiAgICBjb25zdCB4MSA9IHIgKiBNYXRoLmNvcyh0aGV0YSkgKyBNYXRoLnJhbmRvbSgpIC8gNSAtIDAuMTtcclxuICAgIGNvbnN0IHgyID0gciAqIE1hdGguc2luKHRoZXRhKSArIE1hdGgucmFuZG9tKCkgLyA1IC0gMC4xO1xyXG4gICAgcmV0dXJuIHsgeDE6IHgxLCB4MjogeDIsIHg6IFt4MSwgeDJdLCB5OiBsYWJlbCB9O1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzcGlyYWxEYXRhRnJhbWUgPSB7XHJcbiAgICBYMTogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC54MSksXHJcbiAgICBYMjogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC54MiksXHJcbiAgICBYOiBzcGlyYWxQb2ludHMubWFwKHBvaW50ID0+IHBvaW50LngpLFxyXG4gICAgWTogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC55KVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBzcGlyYWxEYXRhRnJhbWU7XHJcbn07XHJcbmNvbnN0IHBvc2l0aXZlUG9pbnRzID0gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSAvIDIsIDAsIDEpO1xyXG5jb25zdCBuZWdhdGl2ZVBvaW50cyA9IHJlbmRlckR1YWxTcGlyYWxQb2ludHMoc2NhbGUgLyAyLCBNYXRoLlBJLCAwKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlclNwaXJhbFRlbnNvcnMocG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzKSB7XHJcbiAgY29uc3QgWCA9IHBvc2l0aXZlUG9pbnRzLlguY29uY2F0KG5lZ2F0aXZlUG9pbnRzLlgpO1xyXG4gIGNvbnN0IFkgPSBwb3NpdGl2ZVBvaW50cy5ZLmNvbmNhdChuZWdhdGl2ZVBvaW50cy5ZKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlucHV0OiB0Zi50ZW5zb3IyZChYLCBbc2NhbGUsIDJdKSxcclxuICAgIG91dHB1dDogdGYudGVuc29yMmQoWSwgW3NjYWxlLCAxXSlcclxuICB9O1xyXG59XHJcbmNvbnN0IFNwaXJhbFRlbnNvcnMgPSByZW5kZXJTcGlyYWxUZW5zb3JzKHBvc2l0aXZlUG9pbnRzLCBuZWdhdGl2ZVBvaW50cyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IHJlZ3Jlc3Npb25Qb2ludHMsIHJlZ3Jlc3Npb25UZW5zb3JzLCBjbGFzc2lmaWNhdGlvblBvaW50cywgY2xhc3NpZmljYXRpb25UZW5zb3JzLCBsaW5lYXJQb2ludHMsIGxpbmVhclRlbnNvcnMsIGNpcmNsZVBvaW50cywgY2lyY2xlVGVuc29ycywgcG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzLCBTcGlyYWxUZW5zb3JzIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQGZpbGUg5LqM5YWD57q/5oCn5Y+v5YiG5pWw5o2u55qE5YiG57G76Zeu6aKYXHJcbiAqL1xyXG5cclxuXHJcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZy5qcyc7XHJcbmltcG9ydCB7IHJlbmRlclNjYWxlLCBnZXRXaWRlRGF0YSB9IGZyb20gJy4vY2FsY3VsYXRlLmpzJztcclxuaW1wb3J0IHsgbGluZWFyUG9pbnRzLCBsaW5lYXJUZW5zb3JzIH0gZnJvbSAnLi9kYXRhLmpzJztcclxuY29uc3QgWDFTY2FsZSA9IHJlbmRlclNjYWxlKGxpbmVhclBvaW50cy5YMSk7XHJcbmNvbnN0IFgyU2NhbGUgPSByZW5kZXJTY2FsZShsaW5lYXJQb2ludHMuWDIpO1xyXG5cclxuXHJcbi8vIFBsb3R0aW5nXHJcbmNvbnN0IHBvaW50c1RyYWNlID0ge1xyXG4gIG5hbWU6ICdwb2ludHMnLFxyXG4gIHR5cGU6ICdzY2F0dGVyM2QnLFxyXG4gIG1vZGU6ICdtYXJrZXJzJyxcclxuICB4OiBsaW5lYXJQb2ludHMuWDEsXHJcbiAgeTogbGluZWFyUG9pbnRzLlgyLFxyXG4gIHo6IGxpbmVhclBvaW50cy5ZLFxyXG4gIG1hcmtlcjoge1xyXG4gICAgY29sb3I6ICdibGFjaycsXHJcbiAgICBzeW1ib2w6ICdjaXJjbGUnLFxyXG4gICAgc2l6ZTogMS41LFxyXG4gICAgb3BhY2l0eTogMC45XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgd2lkZURhdGEgPSBnZXRXaWRlRGF0YShYMVNjYWxlLCBYMlNjYWxlLCAoeDEsIHgyKSA9PiAwLjUpO1xyXG5sZXQgc3VyZmFjZVRyYWNlID0ge1xyXG4gIG5hbWU6ICdmaXR0aW5nIHN1cmZhY2UnLFxyXG4gIHR5cGU6ICdzdXJmYWNlJyxcclxuICB4OiB3aWRlRGF0YS5YMSxcclxuICB5OiB3aWRlRGF0YS5YMixcclxuICB6OiB3aWRlRGF0YS5ZLFxyXG4gIG9wYWNpdHk6IDAuNSxcclxuICBjb250b3Vyczoge1xyXG4gICAgejoge1xyXG4gICAgICBzaG93OiB0cnVlLFxyXG4gICAgICB1c2Vjb2xvcm1hcDogdHJ1ZSxcclxuICAgICAgaGlnaGxpZ2h0Y29sb3I6IFwiIzQyZjQ2MlwiLFxyXG4gICAgICBwcm9qZWN0OiB7IHo6IHRydWUgfSAvLyDnrYnpq5jnur9cclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5QbG90bHkubmV3UGxvdCgnMDMtZHVhbC1saW5lYXItY2xhc3NpZmljYXRpb24nLCBbcG9pbnRzVHJhY2UsIHN1cmZhY2VUcmFjZV0pO1xyXG5cclxuXHJcbi8vIERlZmluZSBNb2RlbFxyXG5jb25zdCBtb2RlbCA9IHRmLnNlcXVlbnRpYWwoKTtcclxubW9kZWwuYWRkKHRmLmxheWVycy5kZW5zZSh7IGlucHV0U2hhcGU6IFsyXSwgdW5pdHM6IDEsIGFjdGl2YXRpb246ICdzaWdtb2lkJyB9KSk7XHJcbm1vZGVsLmNvbXBpbGUoeyBvcHRpbWl6ZXI6ICdhZGFtJywgbG9zczogJ2JpbmFyeUNyb3NzZW50cm9weScsIG1ldHJpY3M6IFsnYWNjdXJhY3knXSB9KTtcclxuXHJcblxyXG4vLyBUcmFpbiBNb2RlbFxyXG5mdW5jdGlvbiB1cGRhdGVQbG90KHBsb3REaXZJZCwgdHJhY2VJbmRleCwgcGxvdFRpdGxlLCBOKSB7XHJcbiAgY29uc3QgbG9zcyA9IG1vZGVsLmV2YWx1YXRlKGxpbmVhclRlbnNvcnMuaW5wdXQsIGxpbmVhclRlbnNvcnMub3V0cHV0KVswXS5kYXRhU3luYygpO1xyXG5cclxuICBjb25zdCBuID0gWDFTY2FsZS5sZW5ndGg7XHJcbiAgY29uc3QgWVRhYmxlID0gW107XHJcbiAgZm9yIChsZXQgaiBvZiBYMlNjYWxlKSB7XHJcbiAgICBjb25zdCBjb2x1bW5BcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSBvZiBYMVNjYWxlKSB7XHJcbiAgICAgIGNvbHVtbkFycmF5LnB1c2goW2ksIGpdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbHVtblRlbnNvciA9IHRmLnRlbnNvcjJkKGNvbHVtbkFycmF5LCBbbiwgMl0pO1xyXG4gICAgY29uc3QgY29sdW1uVmFsdWUgPSBtb2RlbC5wcmVkaWN0KGNvbHVtblRlbnNvcikuZGF0YVN5bmMoKTtcclxuICAgIFlUYWJsZS5wdXNoKGNvbHVtblZhbHVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5ld1N0YXR1cyA9IHtcclxuICAgIGRhdGE6IFt7XHJcbiAgICAgIHg6IFgxU2NhbGUsXHJcbiAgICAgIHk6IFgyU2NhbGUsXHJcbiAgICAgIHo6IFlUYWJsZSxcclxuICAgIH1dLFxyXG4gICAgdHJhY2VzOiBbdHJhY2VJbmRleF0sXHJcbiAgICBsYXlvdXQ6IHtcclxuICAgICAgdGl0bGU6IHtcclxuICAgICAgICB0ZXh0OiBgJHtwbG90VGl0bGV9OiDnrKwgJHtOICsgMX0g5qyh6L+t5LujLCBsb3NzID0gJHtkMy5mb3JtYXQoXCIuNGZcIikobG9zcyl9YCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgUGxvdGx5LmFuaW1hdGUocGxvdERpdklkLCBuZXdTdGF0dXMsIHtcclxuICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgZHVyYXRpb246IDEsXHJcbiAgICB9LFxyXG4gICAgZnJhbWU6IHtcclxuICAgICAgZHVyYXRpb246IDEsXHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgbW9kZWwuZml0KGxpbmVhclRlbnNvcnMuaW5wdXQsIGxpbmVhclRlbnNvcnMub3V0cHV0LCB7XHJcbiAgICBlcG9jaHM6IGNvbmZpZy5lcG9jaHMsXHJcbiAgICBiYXRjaFNpemU6IGNvbmZpZy5iYXRjaFNpemUsXHJcbiAgICBjYWxsYmFja3M6IHtcclxuICAgICAgb25FcG9jaEVuZDogYXN5bmMgKGVwb2NoLCBsb2dzKSA9PiB7XHJcbiAgICAgICAgaWYgKChlcG9jaCArIDEpICUgNTAgPT09IDApIHtcclxuICAgICAgICAgIHVwZGF0ZVBsb3QoJzAzLWR1YWwtbGluZWFyLWNsYXNzaWZpY2F0aW9uJywgMSwgJ+e6v+aAp+WPr+WIhuaVsOaNrueahOWIhuexu+mXrumimCcsIGVwb2NoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6IiJ9