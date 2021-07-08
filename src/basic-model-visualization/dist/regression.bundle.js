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
/*!***************************!*\
  !*** ./src/regression.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ "./src/data.js");
/* harmony import */ var _plotlyStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plotlyStyle.js */ "./src/plotlyStyle.js");
/**
 * @file 一元回归
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
const pointsTrace = renderTrace(_data_js__WEBPACK_IMPORTED_MODULE_1__.regressionPoints, 'points', 'black');

let k = 0;
let b = 0;
const lineTrace = {
  name: 'regression line',
  mode: 'lines',
  x: [0, 1],
  y: [0, 0],
  line: {
    color: 'red',
    width: 2,
  },
};

Plotly.newPlot('01-unitary-regression', [pointsTrace, lineTrace], _plotlyStyle_js__WEBPACK_IMPORTED_MODULE_2__.layout);


// Define model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
model.compile({ optimizer: 'adam', loss: 'meanAbsoluteError' });
model.setWeights([tf.tensor2d([k], [1, 1]), tf.tensor1d([b])]);


// Train model
function updatePlot(plotDivId, traceIndex, plotTitle, epoch) {
  const k = model.getWeights()[0].dataSync()[0];
  const b = model.getWeights()[1].dataSync()[0];
  const loss = model.evaluate(_data_js__WEBPACK_IMPORTED_MODULE_1__.regressionTensors.X, _data_js__WEBPACK_IMPORTED_MODULE_1__.regressionTensors.Y).dataSync();

  const newStatus = {
    data: [{ x: [0, 1], y: [b, b + (k * 1)], }],
    traces: [traceIndex],
    layout: {
      title: {
        text: `${plotTitle}  第 ${epoch + 1} 次迭代, 拟合模型为: y = ${d3.format(".3f")(k)}x + ${d3.format(".3f")(b)}, loss = ${d3.format(".4f")(loss)}`,
      },
    },
  };

  Plotly.animate(plotDivId, newStatus, { transition: { duration: 1 } });
}

(async () => {
  await model.fit(_data_js__WEBPACK_IMPORTED_MODULE_1__.regressionTensors.X, _data_js__WEBPACK_IMPORTED_MODULE_1__.regressionTensors.Y, {
    epochs: 500,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 10 === 0) {
          updatePlot('01-unitary-regression', 1, '一元回归问题', epoch);
        }
      }
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL2Jhc2ljLW1vZGVscy8uL3NyYy9wbG90bHlTdHlsZS5qcyIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmFzaWMtbW9kZWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXNpYy1tb2RlbHMvLi9zcmMvcmVncmVzc2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7OztBQUdwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGdEQUFnRCw2Q0FBSztBQUNyRDtBQUNBLHNDQUFzQyw2Q0FBSztBQUMzQyxzQ0FBc0MsNkNBQUs7QUFDM0M7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSx3REFBd0QsNkNBQUs7QUFDN0Q7QUFDQSwwQ0FBMEMsNkNBQUs7QUFDL0MsMENBQTBDLDZDQUFLO0FBQy9DOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBLDRDQUE0Qyw2Q0FBSztBQUNqRDtBQUNBLHNDQUFzQyw2Q0FBSztBQUMzQyx1Q0FBdUMsNkNBQUs7QUFDNUM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0EsNENBQTRDLDZDQUFLO0FBQ2pEO0FBQ0Esc0NBQXNDLDZDQUFLO0FBQzNDLHVDQUF1Qyw2Q0FBSztBQUM1Qzs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsNkNBQUs7QUFDbkQsOENBQThDLDZDQUFLOztBQUVuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsNkNBQUs7QUFDaEMsNEJBQTRCLDZDQUFLO0FBQ2pDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7VUMvQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTs7O0FBR3NDO0FBQzBCO0FBQ3RCOzs7QUFHMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxnQ0FBZ0Msc0RBQWdCOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxrRUFBa0UsbURBQU07OztBQUd4RTtBQUNBO0FBQ0EsMkJBQTJCLDRCQUE0QjtBQUN2RCxlQUFlLCtDQUErQztBQUM5RDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIseURBQW1CLEVBQUUseURBQW1COztBQUV0RTtBQUNBLFlBQVksa0NBQWtDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVLE1BQU0sVUFBVSxtQkFBbUIsb0JBQW9CLE1BQU0sb0JBQW9CLFdBQVcsdUJBQXVCO0FBQzlJLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUEsd0NBQXdDLGNBQWMsY0FBYyxFQUFFO0FBQ3RFOztBQUVBO0FBQ0Esa0JBQWtCLHlEQUFtQixFQUFFLHlEQUFtQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsSSIsImZpbGUiOiJyZWdyZXNzaW9uLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNjYWxlID0gMjAwO1xyXG5jb25zdCBhbHBoYSA9IDAuMDM7XHJcbmNvbnN0IGVwb2NocyA9IDUwMDA7XHJcbmNvbnN0IGJhdGNoU2l6ZSA9IDUwO1xyXG5cclxuZXhwb3J0IHsgc2NhbGUsIGFscGhhLCBlcG9jaHMsIGJhdGNoU2l6ZSB9OyIsIi8qKlxyXG4gKiBAbW9kdWxlIGRhdGFcclxuICogQGZpbGUgXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgc2NhbGUgfSBmcm9tICcuL2NvbmZpZy5qcyc7XHJcblxyXG5cclxuLy8gMDEg5LiA5YWD5Zue5b2S5pWw5o2uXHJcbmZ1bmN0aW9uIHJlbmRlclJlZ3Jlc3Npb25Qb2ludHMoc2NhbGUpIHtcclxuICBjb25zdCBYID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gTWF0aC5yYW5kb20oKSkuc29ydCgpO1xyXG4gIGNvbnN0IFkgPSBYLm1hcCh4ID0+IDEuMiAqIHggKyBNYXRoLnJhbmRvbSgpIC8gMTApO1xyXG4gIHJldHVybiB7IFg6IFgsIFk6IFkgfTtcclxufTtcclxuY29uc3QgcmVncmVzc2lvblBvaW50cyA9IHJlbmRlclJlZ3Jlc3Npb25Qb2ludHMoc2NhbGUpO1xyXG5jb25zdCByZWdyZXNzaW9uVGVuc29ycyA9IHtcclxuICBYOiB0Zi50ZW5zb3IyZChyZWdyZXNzaW9uUG9pbnRzLlgsIFtzY2FsZSwgMV0pLFxyXG4gIFk6IHRmLnRlbnNvcjJkKHJlZ3Jlc3Npb25Qb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwMiDkuIDlhYPliIbnsbvmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyQ2xhc3NpZmljYXRpb25Qb2ludHMoc2NhbGUpIHtcclxuICBjb25zdCBYID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gMiAqIE1hdGgucmFuZG9tKCkpLnNvcnQoKTtcclxuICBjb25zdCBjb25kaXRpb25zID0gWC5tYXAoeCA9PiAwLjcgKiB4IC0gMC4wMiAqIE1hdGgucmFuZG9tKCkgKyAwLjUxKTtcclxuICBjb25zdCBZID0gY29uZGl0aW9ucy5tYXAoY29uZGl0aW9uID0+IGNvbmRpdGlvbiA+IDAuOCAmJiBjb25kaXRpb24gPCAxLjQgPyAxIDogMCk7XHJcbiAgcmV0dXJuIHsgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGNsYXNzaWZpY2F0aW9uUG9pbnRzID0gcmVuZGVyQ2xhc3NpZmljYXRpb25Qb2ludHMoc2NhbGUpO1xyXG5jb25zdCBjbGFzc2lmaWNhdGlvblRlbnNvcnMgPSB7XHJcbiAgWDogdGYudGVuc29yMmQoY2xhc3NpZmljYXRpb25Qb2ludHMuWCwgW3NjYWxlLCAxXSksXHJcbiAgWTogdGYudGVuc29yMmQoY2xhc3NpZmljYXRpb25Qb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwMyDkuozlhYPnur/mgKflj6/liIbmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbExpbmVhclBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFgxID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gZDMucmFuZG9tTm9ybWFsKCkoKSk7XHJcbiAgY29uc3QgWDIgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuXHJcbiAgY29uc3QgWCA9IFtdLCBZID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBkMy5yYW5nZShzY2FsZSkpIHtcclxuICAgIFgucHVzaChbWDFbaV0sIFgyW2ldXSk7XHJcbiAgICBZLnB1c2goWDJbaV0gLSAwLjUgKiBYMVtpXSAtIDAuMSA+IDAgPyAxIDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGxpbmVhclBvaW50cyA9IHJlbmRlckR1YWxMaW5lYXJQb2ludHMoc2NhbGUpO1xyXG5jb25zdCBsaW5lYXJUZW5zb3JzID0ge1xyXG4gIGlucHV0OiB0Zi50ZW5zb3IyZChsaW5lYXJQb2ludHMuWCwgW3NjYWxlLCAyXSksXHJcbiAgb3V0cHV0OiB0Zi50ZW5zb3IyZChsaW5lYXJQb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwNCDkuozlhYPlnIblvaLmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbENpcmNsZVBvaW50cyhzY2FsZSkge1xyXG4gIGNvbnN0IFgxID0gWy4uLkFycmF5KHNjYWxlKV0ubWFwKGQgPT4gZDMucmFuZG9tTm9ybWFsKCkoKSk7XHJcbiAgY29uc3QgWDIgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoZCA9PiBkMy5yYW5kb21Ob3JtYWwoKSgpKTtcclxuXHJcbiAgY29uc3QgWCA9IFtdLCBZID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBkMy5yYW5nZShzY2FsZSkpIHtcclxuICAgIFgucHVzaChbWDFbaV0sIFgyW2ldXSk7XHJcbiAgICBZLnB1c2goWDFbaV0gKiogMiArIFgyW2ldICoqIDIgPCAwLjUgPyAxIDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBYMTogWDEsIFgyOiBYMiwgWDogWCwgWTogWSB9O1xyXG59XHJcbmNvbnN0IGNpcmNsZVBvaW50cyA9IHJlbmRlckR1YWxDaXJjbGVQb2ludHMoc2NhbGUpO1xyXG5jb25zdCBjaXJjbGVUZW5zb3JzID0ge1xyXG4gIGlucHV0OiB0Zi50ZW5zb3IyZChjaXJjbGVQb2ludHMuWCwgW3NjYWxlLCAyXSksXHJcbiAgb3V0cHV0OiB0Zi50ZW5zb3IyZChjaXJjbGVQb2ludHMuWSwgW3NjYWxlLCAxXSlcclxufTtcclxuXHJcblxyXG4vLyAwNSDkuozlhYPlj4zonrrml4vmlbDmja5cclxuZnVuY3Rpb24gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSwgdGhldGEwLCBsYWJlbCkge1xyXG5cclxuICBjb25zdCBzcGlyYWxQb2ludHMgPSBbLi4uQXJyYXkoc2NhbGUpXS5tYXAoKGQsIGkpID0+IHtcclxuICAgIGNvbnN0IHIgPSA1ICogaSAvIHNjYWxlICsgMC41O1xyXG4gICAgY29uc3QgdGhldGEgPSAyICogTWF0aC5QSSAqIDEuNzUgKiBpIC8gc2NhbGUgKyB0aGV0YTA7XHJcbiAgICBjb25zdCB4MSA9IHIgKiBNYXRoLmNvcyh0aGV0YSkgKyBNYXRoLnJhbmRvbSgpIC8gNSAtIDAuMTtcclxuICAgIGNvbnN0IHgyID0gciAqIE1hdGguc2luKHRoZXRhKSArIE1hdGgucmFuZG9tKCkgLyA1IC0gMC4xO1xyXG4gICAgcmV0dXJuIHsgeDE6IHgxLCB4MjogeDIsIHg6IFt4MSwgeDJdLCB5OiBsYWJlbCB9O1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzcGlyYWxEYXRhRnJhbWUgPSB7XHJcbiAgICBYMTogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC54MSksXHJcbiAgICBYMjogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC54MiksXHJcbiAgICBYOiBzcGlyYWxQb2ludHMubWFwKHBvaW50ID0+IHBvaW50LngpLFxyXG4gICAgWTogc3BpcmFsUG9pbnRzLm1hcChwb2ludCA9PiBwb2ludC55KVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBzcGlyYWxEYXRhRnJhbWU7XHJcbn07XHJcbmNvbnN0IHBvc2l0aXZlUG9pbnRzID0gcmVuZGVyRHVhbFNwaXJhbFBvaW50cyhzY2FsZSAvIDIsIDAsIDEpO1xyXG5jb25zdCBuZWdhdGl2ZVBvaW50cyA9IHJlbmRlckR1YWxTcGlyYWxQb2ludHMoc2NhbGUgLyAyLCBNYXRoLlBJLCAwKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlclNwaXJhbFRlbnNvcnMocG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzKSB7XHJcbiAgY29uc3QgWCA9IHBvc2l0aXZlUG9pbnRzLlguY29uY2F0KG5lZ2F0aXZlUG9pbnRzLlgpO1xyXG4gIGNvbnN0IFkgPSBwb3NpdGl2ZVBvaW50cy5ZLmNvbmNhdChuZWdhdGl2ZVBvaW50cy5ZKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlucHV0OiB0Zi50ZW5zb3IyZChYLCBbc2NhbGUsIDJdKSxcclxuICAgIG91dHB1dDogdGYudGVuc29yMmQoWSwgW3NjYWxlLCAxXSlcclxuICB9O1xyXG59XHJcbmNvbnN0IFNwaXJhbFRlbnNvcnMgPSByZW5kZXJTcGlyYWxUZW5zb3JzKHBvc2l0aXZlUG9pbnRzLCBuZWdhdGl2ZVBvaW50cyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IHJlZ3Jlc3Npb25Qb2ludHMsIHJlZ3Jlc3Npb25UZW5zb3JzLCBjbGFzc2lmaWNhdGlvblBvaW50cywgY2xhc3NpZmljYXRpb25UZW5zb3JzLCBsaW5lYXJQb2ludHMsIGxpbmVhclRlbnNvcnMsIGNpcmNsZVBvaW50cywgY2lyY2xlVGVuc29ycywgcG9zaXRpdmVQb2ludHMsIG5lZ2F0aXZlUG9pbnRzLCBTcGlyYWxUZW5zb3JzIH07IiwiLyoqXHJcbiAqIEBtb2R1bGUgcGxvdGx5U3R5bGVcclxuICogQGZpbGUgZ2dwbG90MiDpo47moLznmoTkuoznu7Tlm77moLflvI9cclxuICovXHJcblxyXG5cclxuY29uc3QgbGF5b3V0ID0ge1xyXG4gIHRpdGxlOiB7XHJcbiAgICBmb250OiB7XHJcbiAgICAgIGZhbWlseTogJ1RpbWVzIE5ldyBSb21hbicsXHJcbiAgICAgIHNpemU6IDE4LFxyXG4gICAgfSxcclxuICAgIHhyZWY6ICdwYXBlcicsXHJcbiAgICB4OiAwLFxyXG4gIH0sXHJcbiAgbWFyZ2luOiB7XHJcbiAgICB0OiA1MCxcclxuICB9LFxyXG4gIHhheGlzOiB7XHJcbiAgICB6ZXJvbGluZTogZmFsc2UsXHJcbiAgICB0aWNrczogJ291dHNpZGUnLFxyXG4gICAgZ3JpZGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgZ3JpZHdpZHRoOiAxLjUsXHJcbiAgfSxcclxuICB5YXhpczoge1xyXG4gICAgemVyb2xpbmU6IGZhbHNlLFxyXG4gICAgdGlja3M6ICdvdXRzaWRlJyxcclxuICAgIGdyaWRjb2xvcjogJ3doaXRlJyxcclxuICAgIGdyaWR3aWR0aDogMS41LFxyXG4gIH0sXHJcbiAgcGxvdF9iZ2NvbG9yOiAnI2ViZWJlYicsXHJcbn07XHJcblxyXG5leHBvcnQgeyBsYXlvdXQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBAZmlsZSDkuIDlhYPlm57lvZJcclxuICovXHJcblxyXG5cclxuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzJztcclxuaW1wb3J0IHsgcmVncmVzc2lvblBvaW50cywgcmVncmVzc2lvblRlbnNvcnMgfSBmcm9tICcuL2RhdGEuanMnO1xyXG5pbXBvcnQgeyBsYXlvdXQgfSBmcm9tICcuL3Bsb3RseVN0eWxlLmpzJztcclxuXHJcblxyXG4vLyBQbG90dGluZ1xyXG5mdW5jdGlvbiByZW5kZXJUcmFjZShkYXRhLCBuYW1lLCBjb2xvcikge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBuYW1lLFxyXG4gICAgbW9kZTogJ21hcmtlcnMnLFxyXG4gICAgeDogZGF0YS5YLFxyXG4gICAgeTogZGF0YS5ZLFxyXG4gICAgbWFya2VyOiB7XHJcbiAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgc3ltYm9sOiAnY2lyY2xlJyxcclxuICAgICAgc2l6ZTogMixcclxuICAgICAgb3BhY2l0eTogMC43XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuY29uc3QgcG9pbnRzVHJhY2UgPSByZW5kZXJUcmFjZShyZWdyZXNzaW9uUG9pbnRzLCAncG9pbnRzJywgJ2JsYWNrJyk7XHJcblxyXG5sZXQgayA9IDA7XHJcbmxldCBiID0gMDtcclxuY29uc3QgbGluZVRyYWNlID0ge1xyXG4gIG5hbWU6ICdyZWdyZXNzaW9uIGxpbmUnLFxyXG4gIG1vZGU6ICdsaW5lcycsXHJcbiAgeDogWzAsIDFdLFxyXG4gIHk6IFswLCAwXSxcclxuICBsaW5lOiB7XHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICB3aWR0aDogMixcclxuICB9LFxyXG59O1xyXG5cclxuUGxvdGx5Lm5ld1Bsb3QoJzAxLXVuaXRhcnktcmVncmVzc2lvbicsIFtwb2ludHNUcmFjZSwgbGluZVRyYWNlXSwgbGF5b3V0KTtcclxuXHJcblxyXG4vLyBEZWZpbmUgbW9kZWxcclxuY29uc3QgbW9kZWwgPSB0Zi5zZXF1ZW50aWFsKCk7XHJcbm1vZGVsLmFkZCh0Zi5sYXllcnMuZGVuc2UoeyBpbnB1dFNoYXBlOiBbMV0sIHVuaXRzOiAxIH0pKTtcclxubW9kZWwuY29tcGlsZSh7IG9wdGltaXplcjogJ2FkYW0nLCBsb3NzOiAnbWVhbkFic29sdXRlRXJyb3InIH0pO1xyXG5tb2RlbC5zZXRXZWlnaHRzKFt0Zi50ZW5zb3IyZChba10sIFsxLCAxXSksIHRmLnRlbnNvcjFkKFtiXSldKTtcclxuXHJcblxyXG4vLyBUcmFpbiBtb2RlbFxyXG5mdW5jdGlvbiB1cGRhdGVQbG90KHBsb3REaXZJZCwgdHJhY2VJbmRleCwgcGxvdFRpdGxlLCBlcG9jaCkge1xyXG4gIGNvbnN0IGsgPSBtb2RlbC5nZXRXZWlnaHRzKClbMF0uZGF0YVN5bmMoKVswXTtcclxuICBjb25zdCBiID0gbW9kZWwuZ2V0V2VpZ2h0cygpWzFdLmRhdGFTeW5jKClbMF07XHJcbiAgY29uc3QgbG9zcyA9IG1vZGVsLmV2YWx1YXRlKHJlZ3Jlc3Npb25UZW5zb3JzLlgsIHJlZ3Jlc3Npb25UZW5zb3JzLlkpLmRhdGFTeW5jKCk7XHJcblxyXG4gIGNvbnN0IG5ld1N0YXR1cyA9IHtcclxuICAgIGRhdGE6IFt7IHg6IFswLCAxXSwgeTogW2IsIGIgKyAoayAqIDEpXSwgfV0sXHJcbiAgICB0cmFjZXM6IFt0cmFjZUluZGV4XSxcclxuICAgIGxheW91dDoge1xyXG4gICAgICB0aXRsZToge1xyXG4gICAgICAgIHRleHQ6IGAke3Bsb3RUaXRsZX0gIOesrCAke2Vwb2NoICsgMX0g5qyh6L+t5LujLCDmi5/lkIjmqKHlnovkuLo6IHkgPSAke2QzLmZvcm1hdChcIi4zZlwiKShrKX14ICsgJHtkMy5mb3JtYXQoXCIuM2ZcIikoYil9LCBsb3NzID0gJHtkMy5mb3JtYXQoXCIuNGZcIikobG9zcyl9YCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgUGxvdGx5LmFuaW1hdGUocGxvdERpdklkLCBuZXdTdGF0dXMsIHsgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMSB9IH0pO1xyXG59XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGF3YWl0IG1vZGVsLmZpdChyZWdyZXNzaW9uVGVuc29ycy5YLCByZWdyZXNzaW9uVGVuc29ycy5ZLCB7XHJcbiAgICBlcG9jaHM6IDUwMCxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICBvbkVwb2NoRW5kOiBhc3luYyAoZXBvY2gsIGxvZ3MpID0+IHtcclxuICAgICAgICBpZiAoKGVwb2NoICsgMSkgJSAxMCA9PT0gMCkge1xyXG4gICAgICAgICAgdXBkYXRlUGxvdCgnMDEtdW5pdGFyeS1yZWdyZXNzaW9uJywgMSwgJ+S4gOWFg+WbnuW9kumXrumimCcsIGVwb2NoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6IiJ9