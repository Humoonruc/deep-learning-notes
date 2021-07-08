/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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








/***/ }),

/***/ "./src/plotlyStyle.js":
/*!****************************!*\
  !*** ./src/plotlyStyle.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "layout": () => (/* binding */ layout)
/* harmony export */ });
/**
 * @module plotlyStyle
 * @file ggplot2 风格的二维图样式
 */


const layout = {
  title: {
    font: {
      family: 'Times New Roman',
      size: 18,
    },
    xref: 'paper',
    x: 0,
  },
  margin: {
    t: 50,
  },
  xaxis: {
    zeroline: false,
    ticks: 'outside',
    gridcolor: 'white',
    gridwidth: 1.5,
  },
  yaxis: {
    zeroline: false,
    ticks: 'outside',
    gridcolor: 'white',
    gridwidth: 1.5,
  },
  plot_bgcolor: '#ebebeb',
};



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
/*!*******************************!*\
  !*** ./src/classification.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ "./src/data.js");
/* harmony import */ var _plotlyStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plotlyStyle.js */ "./src/plotlyStyle.js");
/**
 * @file 一元分类
 */







// Plotting
function renderTrace(data, name, color) {
  return {
    name: name,
    mode: 'markers',
    x: data.X,
    y: data.Y,
    marker: {
      color: color,
      symbol: 'circle',
      size: 2,
      opacity: 0.7
    },
  };
}
const classificationPointsTrace = renderTrace(_data_js__WEBPACK_IMPORTED_MODULE_1__.classificationPoints, 'points', 'black');
const classificationLineTrace = {
  name: 'regression line',
  mode: 'lines',
  x: [0, 2],
  y: [0.5, 0.5],
  line: {
    color: 'red',
    width: 2,
  },
};
Plotly.newPlot('02-unitary-classification', [classificationPointsTrace, classificationLineTrace], _plotlyStyle_js__WEBPACK_IMPORTED_MODULE_2__.layout);


// Define Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 2, activation: 'sigmoid' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });


// Train Model
function updatePlot(plotDivId, traceIndex, plotTitle, N) {
  // const loss = model.evaluate(classificationTensors.X, classificationTensors.Y)[0].dataSync();

  const arrayX = [...Array(_config_js__WEBPACK_IMPORTED_MODULE_0__.scale + 1)].map((d, i) => 2 * i / _config_js__WEBPACK_IMPORTED_MODULE_0__.scale);
  const tensorX = tf.tensor2d(arrayX, [_config_js__WEBPACK_IMPORTED_MODULE_0__.scale + 1, 1]);
  const arrayY = model.predict(tensorX).dataSync();

  const newStatus = {
    data: [{ x: arrayX, y: arrayY }],
    traces: [traceIndex],
    layout: {
      title: {
        text: `${plotTitle}  第 ${N + 1} 次迭代`,
      },
    },
  };

  Plotly.animate(plotDivId, newStatus, { transition: { duration: 1 } });
}


(async () => {
  await model.fit(_data_js__WEBPACK_IMPORTED_MODULE_1__.classificationTensors.X, _data_js__WEBPACK_IMPORTED_MODULE_1__.classificationTensors.Y, {
    epochs: 10000,
    batchSize: _config_js__WEBPACK_IMPORTED_MODULE_0__.batchSize,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 100 === 0) {
          updatePlot('02-unitary-classification', 1, '一元分类问题', epoch);
        }
      }
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy8uL3NyYy9wbG90bHlTdHlsZS5qcyIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvLi9zcmMvY2xhc3NpZmljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FBRW9DOzs7QUFHcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxnREFBZ0QsNkNBQUs7QUFDckQ7QUFDQSxzQ0FBc0MsNkNBQUs7QUFDM0Msc0NBQXNDLDZDQUFLO0FBQzNDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0Esd0RBQXdELDZDQUFLO0FBQzdEO0FBQ0EsMENBQTBDLDZDQUFLO0FBQy9DLDBDQUEwQyw2Q0FBSztBQUMvQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQSw0Q0FBNEMsNkNBQUs7QUFDakQ7QUFDQSxzQ0FBc0MsNkNBQUs7QUFDM0MsdUNBQXVDLDZDQUFLO0FBQzVDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBLDRDQUE0Qyw2Q0FBSztBQUNqRDtBQUNBLHNDQUFzQyw2Q0FBSztBQUMzQyx1Q0FBdUMsNkNBQUs7QUFDNUM7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOENBQThDLDZDQUFLO0FBQ25ELDhDQUE4Qyw2Q0FBSzs7QUFFbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDZDQUFLO0FBQ2hDLDRCQUE0Qiw2Q0FBSztBQUNqQztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7O1VDL0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7OztBQUdzQztBQUNrQztBQUM5Qjs7O0FBRzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsOENBQThDLDBEQUFvQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esa0dBQWtHLG1EQUFNOzs7QUFHeEc7QUFDQTtBQUNBLDJCQUEyQixtREFBbUQ7QUFDOUUsMkJBQTJCLGtDQUFrQztBQUM3RCxlQUFlLHVFQUF1RTs7O0FBR3RGO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsNkNBQVksNkJBQTZCLDZDQUFZO0FBQ2hGLHVDQUF1Qyw2Q0FBWTtBQUNuRDs7QUFFQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVLE1BQU0sTUFBTTtBQUN2QyxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBLHdDQUF3QyxjQUFjLGNBQWMsRUFBRTtBQUN0RTs7O0FBR0E7QUFDQSxrQkFBa0IsNkRBQXVCLEVBQUUsNkRBQXVCO0FBQ2xFO0FBQ0EsZUFBZSxpREFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyxJIiwiZmlsZSI6ImNsYXNzaWZpY2F0aW9uLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNjYWxlID0gMjAwO1xyXG5jb25zdCBhbHBoYSA9IDAuMDM7XHJcbmNvbnN0IGVwb2NocyA9IDUwMDA7XHJcbmNvbnN0IGJhdGNoU2l6ZSA9IDUwO1xyXG5cclxuZXhwb3J0IHsgc2NhbGUsIGFscGhhLCBlcG9jaHMsIGJhdGNoU2l6ZSB9OyIsIi8qKlxyXG4gKiBAbW9kdWxlIGRhdGFcclxuICogQGZpbGUgXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgc2NhbGUgfSBmcm9tICcuL2NvbmZpZy5qcyc7XHJcblxyXG5cclxuLy8gMDEg5LiA5YWD5Zue5b2S5pWw5o2uXHJcbmZ1bmN0aW9uIHJlbmRlclJlZ3Jlc3Npb25Qb2ludHMoc2NhbGUpIHtcclxuICBjb25zdCBYID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gTWF0aC5yYW5kb20oKSkuc29ydCgpO1xyXG4gIGNvbnN0IFkgPSBYLm1hcCh4ID0+IDEuMiAqIHggKyBNYXRoLnJhbmRvbSgpIC8gMTApO1xyXG4gIHJldHVybiB7IFg6IFgsIFk6IFkgfTtcclxufTtcclxuY29uc3QgcmVncmVzc2lvblBvaW50cyA9IHJlbmRlclJlZ3Jlc3Npb25Qb2ludHMoc2NhbGUpO1xyXG5jb25zdCByZWdyZXNzaW9uVGVuc29ycyA9IHtcclxuICBYOiB0Zi50ZW5zb3IyZChyZWdyZXNzaW9uUG9pbnRzLlgsIFtzY2FsZSwgMV0pLFxyXG4gIFk6IHRmLnRlbnNvcjJkKHJlZ3Jlc3Npb25Qb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwMiDkuIDlhYPliIbnsbvmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyQ2xhc3NpZmljYXRpb25Qb2ludHMoc2NhbGUpIHtcclxuICBjb25zdCBYID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gMiAqIE1hdGgucmFuZG9tKCkpLnNvcnQoKTtcclxuICBjb25zdCBjb25kaXRpb25zID0gWC5tYXAoeCA9PiAwLjcgKiB4IC0gMC4wMiAqIE1hdGgucmFuZG9tKCkgKyAwLjUxKTtcclxuICBjb25zdCBZID0gY29uZGl0aW9ucy5tYXAoY29uZGl0aW9uID0+IGNvbmRpdGlvbiA+IDAuOCAmJiBjb25kaXRpb24gPCAxLjQgPyAxIDogMCk7XHJcbiAgcmV0dXJuIHsgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGNsYXNzaWZpY2F0aW9uUG9pbnRzID0gcmVuZGVyQ2xhc3NpZmljYXRpb25Qb2ludHMoc2NhbGUpO1xyXG5jb25zdCBjbGFzc2lmaWNhdGlvblRlbnNvcnMgPSB7XHJcbiAgWDogdGYudGVuc29yMmQoY2xhc3NpZmljYXRpb25Qb2ludHMuWCwgW3NjYWxlLCAxXSksXHJcbiAgWTogdGYudGVuc29yMmQoY2xhc3NpZmljYXRpb25Qb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwMyDkuozlhYPnur/mgKflj6/liIbmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbExpbmVhclBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFgxID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gZDMucmFuZG9tTm9ybWFsKCkoKSk7XHJcbiAgY29uc3QgWDIgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuXHJcbiAgY29uc3QgWCA9IFtdLCBZID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBkMy5yYW5nZShzY2FsZSkpIHtcclxuICAgIFgucHVzaChbWDFbaV0sIFgyW2ldXSk7XHJcbiAgICBZLnB1c2goWDJbaV0gLSAwLjUgKiBYMVtpXSAtIDAuMSA+IDAgPyAxIDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGxpbmVhclBvaW50cyA9IHJlbmRlckR1YWxMaW5lYXJQb2ludHMoc2NhbGUpO1xyXG5jb25zdCBsaW5lYXJUZW5zb3JzID0ge1xyXG4gIGlucHV0OiB0Zi50ZW5zb3IyZChsaW5lYXJQb2ludHMuWCwgW3NjYWxlLCAyXSksXHJcbiAgb3V0cHV0OiB0Zi50ZW5zb3IyZChsaW5lYXJQb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwNCDkuozlhYPlnIblvaLmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbENpcmNsZVBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFgxID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gZDMucmFuZG9tTm9ybWFsKCkoKSk7XHJcbiAgY29uc3QgWDIgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuXHJcbiAgY29uc3QgWCA9IFtdLCBZID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBkMy5yYW5nZShzY2FsZSkpIHtcclxuICAgIFgucHVzaChbWDFbaV0sIFgyW2ldXSk7XHJcbiAgICBZLnB1c2goWDFbaV0gKiogMiArIFgyW2ldICoqIDIgPCAwLjUgPyAxIDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGNpcmNsZVBvaW50cyA9IHJlbmRlckR1YWxDaXJjbGVQb2ludHMoc2NhbGUpO1xyXG5jb25zdCBjaXJjbGVUZW5zb3JzID0ge1xyXG4gIGlucHV0OiB0Zi50ZW5zb3IyZChjaXJjbGVQb2ludHMuWCwgW3NjYWxlLCAyXSksXHJcbiAgb3V0cHV0OiB0Zi50ZW5zb3IyZChjaXJjbGVQb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwNSDkuozlhYPlj4zonrrml4vmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSwgdGhldGEwLCBsYWJlbCkge1xyXG5cclxuICBjb25zdCBzcGlyYWxQb2ludHMgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoKGQsIGkpID0+IHtcclxuICAgIGNvbnN0IHIgPSA1ICogaSAvIHNjYWxlICsgMC41O1xyXG4gICAgY29uc3QgdGhldGEgPSAyICogTWF0aC5QSSAqIDEuNzUgKiBpIC8gc2NhbGUgKyB0aGV0YTA7XHJcbiAgICBjb25zdCB4MSA9IHIgKiBNYXRoLmNvcyh0aGV0YSkgKyBNYXRoLnJhbmRvbSgpIC8gNSAtIDAuMTtcclxuICAgIGNvbnN0IHgyID0gciAqIE1hdGguc2luKHRoZXRhKSArIE1hdGgucmFuZG9tKCkgLyA1IC0gMC4xO1xyXG4gICAgcmV0dXJuIHsgeDE6IHgxLCB4MjogeDIsIHg6IFt4MSwgeDJdLCB5OiBsYWJlbCB9O1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzcGlyYWxEYXRhRnJhbWUgPSB7XHJcbiAgICBYMTogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC54MSksXHJcbiAgICBYMjogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC54MiksXHJcbiAgICBYOiBzcGlyYWxQb2ludHMubWFwKHBvaW50ID0+IHBvaW50LngpLFxyXG4gICAgWTogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC55KVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBzcGlyYWxEYXRhRnJhbWU7XHJcbn07XHJcbmNvbnN0IHBvc2l0aXZlUG9pbnRzID0gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSAvIDIsIDAsIDEpO1xyXG5jb25zdCBuZWdhdGl2ZVBvaW50cyA9IHJlbmRlckR1YWxTcGlyYWxQb2ludHMoc2NhbGUgLyAyLCBNYXRoLlBJLCAwKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlclNwaXJhbFRlbnNvcnMocG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzKSB7XHJcbiAgY29uc3QgWCA9IHBvc2l0aXZlUG9pbnRzLlguY29uY2F0KG5lZ2F0aXZlUG9pbnRzLlgpO1xyXG4gIGNvbnN0IFkgPSBwb3NpdGl2ZVBvaW50cy5ZLmNvbmNhdChuZWdhdGl2ZVBvaW50cy5ZKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlucHV0OiB0Zi50ZW5zb3IyZChYLCBbc2NhbGUsIDJdKSxcclxuICAgIG91dHB1dDogdGYudGVuc29yMmQoWSwgW3NjYWxlLCAxXSlcclxuICB9O1xyXG59XHJcbmNvbnN0IFNwaXJhbFRlbnNvcnMgPSByZW5kZXJTcGlyYWxUZW5zb3JzKHBvc2l0aXZlUG9pbnRzLCBuZWdhdGl2ZVBvaW50cyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IHJlZ3Jlc3Npb25Qb2ludHMsIHJlZ3Jlc3Npb25UZW5zb3JzLCBjbGFzc2lmaWNhdGlvblBvaW50cywgY2xhc3NpZmljYXRpb25UZW5zb3JzLCBsaW5lYXJQb2ludHMsIGxpbmVhclRlbnNvcnMsIGNpcmNsZVBvaW50cywgY2lyY2xlVGVuc29ycywgcG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzLCBTcGlyYWxUZW5zb3JzIH07IiwiLyoqXHJcbiAqIEBtb2R1bGUgcGxvdGx5U3R5bGVcclxuICogQGZpbGUgZ2dwbG90MiDpo47moLznmoTkuoznu7Tlm77moLflvI9cclxuICovXHJcblxyXG5cclxuY29uc3QgbGF5b3V0ID0ge1xyXG4gIHRpdGxlOiB7XHJcbiAgICBmb250OiB7XHJcbiAgICAgIGZhbWlseTogJ1RpbWVzIE5ldyBSb21hbicsXHJcbiAgICAgIHNpemU6IDE4LFxyXG4gICAgfSxcclxuICAgIHhyZWY6ICdwYXBlcicsXHJcbiAgICB4OiAwLFxyXG4gIH0sXHJcbiAgbWFyZ2luOiB7XHJcbiAgICB0OiA1MCxcclxuICB9LFxyXG4gIHhheGlzOiB7XHJcbiAgICB6ZXJvbGluZTogZmFsc2UsXHJcbiAgICB0aWNrczogJ291dHNpZGUnLFxyXG4gICAgZ3JpZGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgZ3JpZHdpZHRoOiAxLjUsXHJcbiAgfSxcclxuICB5YXhpczoge1xyXG4gICAgemVyb2xpbmU6IGZhbHNlLFxyXG4gICAgdGlja3M6ICdvdXRzaWRlJyxcclxuICAgIGdyaWRjb2xvcjogJ3doaXRlJyxcclxuICAgIGdyaWR3aWR0aDogMS41LFxyXG4gIH0sXHJcbiAgcGxvdF9iZ2NvbG9yOiAnI2ViZWJlYicsXHJcbn07XHJcblxyXG5leHBvcnQgeyBsYXlvdXQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBAZmlsZSDkuIDlhYPliIbnsbtcclxuICovXHJcblxyXG5cclxuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzJztcclxuaW1wb3J0IHsgY2xhc3NpZmljYXRpb25Qb2ludHMsIGNsYXNzaWZpY2F0aW9uVGVuc29ycyB9IGZyb20gJy4vZGF0YS5qcyc7XHJcbmltcG9ydCB7IGxheW91dCB9IGZyb20gJy4vcGxvdGx5U3R5bGUuanMnO1xyXG5cclxuXHJcbi8vIFBsb3R0aW5nXHJcbmZ1bmN0aW9uIHJlbmRlclRyYWNlKGRhdGEsIG5hbWUsIGNvbG9yKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IG5hbWUsXHJcbiAgICBtb2RlOiAnbWFya2VycycsXHJcbiAgICB4OiBkYXRhLlgsXHJcbiAgICB5OiBkYXRhLlksXHJcbiAgICBtYXJrZXI6IHtcclxuICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICBzeW1ib2w6ICdjaXJjbGUnLFxyXG4gICAgICBzaXplOiAyLFxyXG4gICAgICBvcGFjaXR5OiAwLjdcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5jb25zdCBjbGFzc2lmaWNhdGlvblBvaW50c1RyYWNlID0gcmVuZGVyVHJhY2UoY2xhc3NpZmljYXRpb25Qb2ludHMsICdwb2ludHMnLCAnYmxhY2snKTtcclxuY29uc3QgY2xhc3NpZmljYXRpb25MaW5lVHJhY2UgPSB7XHJcbiAgbmFtZTogJ3JlZ3Jlc3Npb24gbGluZScsXHJcbiAgbW9kZTogJ2xpbmVzJyxcclxuICB4OiBbMCwgMl0sXHJcbiAgeTogWzAuNSwgMC41XSxcclxuICBsaW5lOiB7XHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICB3aWR0aDogMixcclxuICB9LFxyXG59O1xyXG5QbG90bHkubmV3UGxvdCgnMDItdW5pdGFyeS1jbGFzc2lmaWNhdGlvbicsIFtjbGFzc2lmaWNhdGlvblBvaW50c1RyYWNlLCBjbGFzc2lmaWNhdGlvbkxpbmVUcmFjZV0sIGxheW91dCk7XHJcblxyXG5cclxuLy8gRGVmaW5lIE1vZGVsXHJcbmNvbnN0IG1vZGVsID0gdGYuc2VxdWVudGlhbCgpO1xyXG5tb2RlbC5hZGQodGYubGF5ZXJzLmRlbnNlKHsgaW5wdXRTaGFwZTogWzFdLCB1bml0czogMiwgYWN0aXZhdGlvbjogJ3NpZ21vaWQnIH0pKTtcclxubW9kZWwuYWRkKHRmLmxheWVycy5kZW5zZSh7IHVuaXRzOiAxLCBhY3RpdmF0aW9uOiAnc2lnbW9pZCcgfSkpO1xyXG5tb2RlbC5jb21waWxlKHsgb3B0aW1pemVyOiAnYWRhbScsIGxvc3M6ICdiaW5hcnlDcm9zc2VudHJvcHknLCBtZXRyaWNzOiBbJ2FjY3VyYWN5J10gfSk7XHJcblxyXG5cclxuLy8gVHJhaW4gTW9kZWxcclxuZnVuY3Rpb24gdXBkYXRlUGxvdChwbG90RGl2SWQsIHRyYWNlSW5kZXgsIHBsb3RUaXRsZSwgTikge1xyXG4gIC8vIGNvbnN0IGxvc3MgPSBtb2RlbC5ldmFsdWF0ZShjbGFzc2lmaWNhdGlvblRlbnNvcnMuWCwgY2xhc3NpZmljYXRpb25UZW5zb3JzLlkpWzBdLmRhdGFTeW5jKCk7XHJcblxyXG4gIGNvbnN0IGFycmF5WCA9IFsuLi5BcnJheShjb25maWcuc2NhbGUgKyAxKV0ubWFwKChkLCBpKSA9PiAyICogaSAvIGNvbmZpZy5zY2FsZSk7XHJcbiAgY29uc3QgdGVuc29yWCA9IHRmLnRlbnNvcjJkKGFycmF5WCwgW2NvbmZpZy5zY2FsZSArIDEsIDFdKTtcclxuICBjb25zdCBhcnJheVkgPSBtb2RlbC5wcmVkaWN0KHRlbnNvclgpLmRhdGFTeW5jKCk7XHJcblxyXG4gIGNvbnN0IG5ld1N0YXR1cyA9IHtcclxuICAgIGRhdGE6IFt7IHg6IGFycmF5WCwgeTogYXJyYXlZIH1dLFxyXG4gICAgdHJhY2VzOiBbdHJhY2VJbmRleF0sXHJcbiAgICBsYXlvdXQ6IHtcclxuICAgICAgdGl0bGU6IHtcclxuICAgICAgICB0ZXh0OiBgJHtwbG90VGl0bGV9ICDnrKwgJHtOICsgMX0g5qyh6L+t5LujYCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgUGxvdGx5LmFuaW1hdGUocGxvdERpdklkLCBuZXdTdGF0dXMsIHsgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMSB9IH0pO1xyXG59XHJcblxyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCBtb2RlbC5maXQoY2xhc3NpZmljYXRpb25UZW5zb3JzLlgsIGNsYXNzaWZpY2F0aW9uVGVuc29ycy5ZLCB7XHJcbiAgICBlcG9jaHM6IDEwMDAwLFxyXG4gICAgYmF0Y2hTaXplOiBjb25maWcuYmF0Y2hTaXplLFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgIG9uRXBvY2hFbmQ6IGFzeW5jIChlcG9jaCwgbG9ncykgPT4ge1xyXG4gICAgICAgIGlmICgoZXBvY2ggKyAxKSAlIDEwMCA9PT0gMCkge1xyXG4gICAgICAgICAgdXBkYXRlUGxvdCgnMDItdW5pdGFyeS1jbGFzc2lmaWNhdGlvbicsIDEsICfkuIDlhYPliIbnsbvpl67popgnLCBlcG9jaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==