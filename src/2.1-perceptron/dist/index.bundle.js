/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./data/data.js":
/*!**********************!*\
  !*** ./data/data.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trainData": () => (/* binding */ trainData),
/* harmony export */   "testData": () => (/* binding */ testData),
/* harmony export */   "trainTensors": () => (/* binding */ trainTensors),
/* harmony export */   "testTensors": () => (/* binding */ testTensors)
/* harmony export */ });
/**
 * @module data
 * @file 一元输入与输出
 */


const trainData = {
  sizeMB: [0.080, 9.000, 0.001, 0.100, 8.000, 5.000, 0.100, 6.000, 0.050, 0.500,
    0.002, 2.000, 0.005, 10.00, 0.010, 7.000, 6.000, 5.000, 1.000, 1.000],
  timeSec: [0.135, 0.739, 0.067, 0.126, 0.646, 0.435, 0.069, 0.497, 0.068, 0.116,
    0.070, 0.289, 0.076, 0.744, 0.083, 0.560, 0.480, 0.399, 0.153, 0.149]
};
const testData = {
  sizeMB: [5.000, 0.200, 0.001, 9.000, 0.002, 0.020, 0.008, 4.000, 0.001, 1.000,
    0.005, 0.080, 0.800, 0.200, 0.050, 7.000, 0.005, 0.002, 8.000, 0.008],
  timeSec: [0.425, 0.098, 0.052, 0.686, 0.066, 0.078, 0.070, 0.375, 0.058, 0.136,
    0.052, 0.063, 0.183, 0.087, 0.066, 0.558, 0.066, 0.068, 0.610, 0.057]
};


// Convert data to Tensors.
// 生成张量对象，tf.tensor2d()的第一个参数是数据，第二个参数是张量的dimension
const trainTensors = {
  sizeMB: tf.tensor2d(trainData.sizeMB, [20, 1]),
  timeSec: tf.tensor2d(trainData.timeSec, [20, 1])
};
const testTensors = {
  sizeMB: tf.tensor2d(testData.sizeMB, [20, 1]),
  timeSec: tf.tensor2d(testData.timeSec, [20, 1])
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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data.js */ "./data/data.js");


//--------------可视化部分---------------

// 图像初始化
const trainTrace = {
  x: _data_data_js__WEBPACK_IMPORTED_MODULE_0__.trainData.sizeMB,
  y: _data_data_js__WEBPACK_IMPORTED_MODULE_0__.trainData.timeSec,
  name: 'trainData',
  mode: 'markers',
  type: 'scatter',
  marker: { symbol: "circle", size: 8 }
};
const testTrace = {
  x: _data_data_js__WEBPACK_IMPORTED_MODULE_0__.testData.sizeMB,
  y: _data_data_js__WEBPACK_IMPORTED_MODULE_0__.testData.timeSec,
  name: 'testData',
  mode: 'markers',
  type: 'scatter',
  marker: { symbol: "triangle-up", size: 10 }
};
// 表示训练10轮的trace
// mode: "lines" 只需给出两端坐标，plotly 自动画线
const trace10Epochs = {
  x: [0, 2],
  y: [0, 0.01],
  name: 'model after N epochs',
  mode: 'lines',
  line: { color: 'blue', width: 1, dash: 'dot' },
};
// 训练20轮
const trace20Epochs = {
  x: [0, 2],
  y: [0, 0.03],
  name: 'model after N epochs',
  mode: 'lines',
  line: { color: 'green', width: 2, dash: 'dash' }
};
// 训练100轮
const trace100Epochs = {
  x: [0, 2],
  y: [0, 0.05],
  name: 'model after N epochs',
  mode: 'lines',
  line: { color: 'red', width: 3, dash: 'longdash' }
};
// 训练200轮
const trace200Epochs = {
  x: [0, 2],
  y: [0, 0.1],
  name: 'model after N epochs',
  mode: 'lines',
  line: { color: 'black', width: 4, dash: 'solid' }
};

const dataSet = [trainTrace, testTrace, trace10Epochs, trace20Epochs, trace100Epochs, trace200Epochs];
const layout = {
  // ggplot2 风格
  width: 700,
  title: 'Model Fit Result',
  xaxis: {
    title: 'size (MB)',
    zeroline: false,
    ticks: 'outside',
    gridcolor: 'white',
    gridwidth: 1.5,
  },
  yaxis: {
    title: 'time (sec)',
    zeroline: false,
    ticks: 'outside',
    gridcolor: 'white',
    gridwidth: 1.5,
  },
  plot_bgcolor: '#ebebeb',
  editable: true,
};
Plotly.newPlot('plotArea', dataSet, layout);


/** 更新 plotly 图像的函数
 * @param  {Object} dataTrace - 要更新的 trace
 * @param  {Number} k - 权重系数
 * @param  {Number} b - 偏置
 * @param  {Number} N - epoch
 * @param  {Number} traceIndex - 初始化图形时 trace 的 index
 */
function updatePlot(dataTrace, k, b, N, traceIndex) {
  // 更新模型的参数
  // 线性变换 y=kx+b, k 称为 kernel, b 称为 bias, k 和 b 统称为 weights
  dataTrace.x = [0, 10];
  dataTrace.y = [b, b + (k * 10)];

  let update = {
    x: [dataTrace.x],
    y: [dataTrace.y],
    name: 'model after ' + N + ' epochs'
  };

  Plotly.restyle('plotArea', update, traceIndex);
}


//--------------深度学习部分---------------

// 1. Construct Model
const model = tf.sequential();

// tf.layers.dense() 建立了一个密集层：标量x经过变换成为标量y
// 密集层是相对于卷积层、循环层等模型而言的
model.add(tf.layers.dense({
  inputShape: [1], // 输入张量X的size（长度为1的1维张量）。假如是一个图片分类的任务，图片的像素是28*28，每个像素记录灰度值，则inputShepe的值就会是[28, 28, 1]
  units: 1, // 唯一一层神经元的数目
  // 没有规定激活函数的形式，这一层变换就是线性变换
}));


// 2. Compile Model
// 指定优化器: SGD方法, alpha = 0.0005，很小，故意优化得慢一点来可视化这个过程
// const optimizer = 'sgd'; // 优化器的简写 
// 指定损失函数为 error 的绝对值的平均值，用伪代码表示即 lossFunction = average(absolute(k*x+b-y))
model.compile({ optimizer: tf.train.sgd(0.0005), loss: 'meanAbsoluteError' });


// 3. model.setWeights() 设定模型参数初始值，这一步也可以没有，即调用tfjs的默认参数初始化方法
// model.getWeights() 获取模型参数
let k = 0;
let b = 0;
// 在模型 Y=KX+B 中，K为二维张量（矩阵），B为一维张量（向量）
// tf.tensor2d()即创建二维张量（矩阵）的函数，第一个参数为矩阵按行展开的数组，第二个参数表示矩阵的规模
// tf.tensor1d()为创建一维张量（向量）的函数，第一个参数为表示向量的数组，不需要第二个参数
model.setWeights([tf.tensor2d([k], [1, 1]), tf.tensor1d([b])]);


// 4. model.fit() 训练模型
(async () => {
  await model.fit(
    _data_data_js__WEBPACK_IMPORTED_MODULE_0__.trainTensors.sizeMB, // 训练集输入张量
    _data_data_js__WEBPACK_IMPORTED_MODULE_0__.trainTensors.timeSec, // 训练集输出张量
    { // 配置训练的参数
      epochs: 200, // 进行多少轮训练
      // 针对不同事件的回调对象
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          // 每轮训练结束，获取最新的 k 和 b
          k = model.getWeights()[0].dataSync()[0];
          b = model.getWeights()[1].dataSync()[0];
          // console.log(`epoch ${epoch}`);
          if (epoch === 9) {
            // 在第10轮结束时，更新第一条线(原图的第三个trace)
            updatePlot(trace10Epochs, k, b, 10, 2);
          }
          if (epoch === 19) {
            // 在第20轮结束时，更新第二条线(原图的第四个trace)
            updatePlot(trace20Epochs, k, b, 20, 3);
          }
          if (epoch === 99) {
            updatePlot(trace100Epochs, k, b, 100, 4);
          }
          if (epoch === 199) {
            updatePlot(trace200Epochs, k, b, 200, 5);
          }
          await tf.nextFrame();
        }
      }
    });

  // 5. model.evaluate() 测试模型
  // 用测试集评估训练完毕的模型，输出loss statistics
  model.evaluate(_data_data_js__WEBPACK_IMPORTED_MODULE_0__.testTensors.sizeMB, _data_data_js__WEBPACK_IMPORTED_MODULE_0__.testTensors.timeSec).print();

  // 6. model.predict() 用模型预测
  // 该方法一次可以预测一组样本，样本中的每个数据要符合 inputShape 规定的 size
  // 从而这组样本需要封装为一个比单次输入维度更高的张量
  model.predict(tf.tensor2d([[7.8], [1.2], [13.5]])).print();
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yLTEvLi9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vMi0xL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzItMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vMi0xL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vMi0xL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vMi0xLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQzdCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05pRjs7QUFFakY7O0FBRUE7QUFDQTtBQUNBLEtBQUssMkRBQWdCO0FBQ3JCLEtBQUssNERBQWlCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSywwREFBZTtBQUNwQixLQUFLLDJEQUFnQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsdUNBQXVDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsZUFBZSw2REFBNkQ7OztBQUc1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFtQjtBQUN2QixJQUFJLCtEQUFvQjtBQUN4QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsTUFBTTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsaUJBQWlCLDZEQUFrQixFQUFFLDhEQUFtQjs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEkiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBtb2R1bGUgZGF0YVxyXG4gKiBAZmlsZSDkuIDlhYPovpPlhaXkuI7ovpPlh7pcclxuICovXHJcblxyXG5cclxuY29uc3QgdHJhaW5EYXRhID0ge1xyXG4gIHNpemVNQjogWzAuMDgwLCA5LjAwMCwgMC4wMDEsIDAuMTAwLCA4LjAwMCwgNS4wMDAsIDAuMTAwLCA2LjAwMCwgMC4wNTAsIDAuNTAwLFxyXG4gICAgMC4wMDIsIDIuMDAwLCAwLjAwNSwgMTAuMDAsIDAuMDEwLCA3LjAwMCwgNi4wMDAsIDUuMDAwLCAxLjAwMCwgMS4wMDBdLFxyXG4gIHRpbWVTZWM6IFswLjEzNSwgMC43MzksIDAuMDY3LCAwLjEyNiwgMC42NDYsIDAuNDM1LCAwLjA2OSwgMC40OTcsIDAuMDY4LCAwLjExNixcclxuICAgIDAuMDcwLCAwLjI4OSwgMC4wNzYsIDAuNzQ0LCAwLjA4MywgMC41NjAsIDAuNDgwLCAwLjM5OSwgMC4xNTMsIDAuMTQ5XVxyXG59O1xyXG5jb25zdCB0ZXN0RGF0YSA9IHtcclxuICBzaXplTUI6IFs1LjAwMCwgMC4yMDAsIDAuMDAxLCA5LjAwMCwgMC4wMDIsIDAuMDIwLCAwLjAwOCwgNC4wMDAsIDAuMDAxLCAxLjAwMCxcclxuICAgIDAuMDA1LCAwLjA4MCwgMC44MDAsIDAuMjAwLCAwLjA1MCwgNy4wMDAsIDAuMDA1LCAwLjAwMiwgOC4wMDAsIDAuMDA4XSxcclxuICB0aW1lU2VjOiBbMC40MjUsIDAuMDk4LCAwLjA1MiwgMC42ODYsIDAuMDY2LCAwLjA3OCwgMC4wNzAsIDAuMzc1LCAwLjA1OCwgMC4xMzYsXHJcbiAgICAwLjA1MiwgMC4wNjMsIDAuMTgzLCAwLjA4NywgMC4wNjYsIDAuNTU4LCAwLjA2NiwgMC4wNjgsIDAuNjEwLCAwLjA1N11cclxufTtcclxuXHJcblxyXG4vLyBDb252ZXJ0IGRhdGEgdG8gVGVuc29ycy5cclxuLy8g55Sf5oiQ5byg6YeP5a+56LGh77yMdGYudGVuc29yMmQoKeeahOesrOS4gOS4quWPguaVsOaYr+aVsOaNru+8jOesrOS6jOS4quWPguaVsOaYr+W8oOmHj+eahGRpbWVuc2lvblxyXG5jb25zdCB0cmFpblRlbnNvcnMgPSB7XHJcbiAgc2l6ZU1COiB0Zi50ZW5zb3IyZCh0cmFpbkRhdGEuc2l6ZU1CLCBbMjAsIDFdKSxcclxuICB0aW1lU2VjOiB0Zi50ZW5zb3IyZCh0cmFpbkRhdGEudGltZVNlYywgWzIwLCAxXSlcclxufTtcclxuY29uc3QgdGVzdFRlbnNvcnMgPSB7XHJcbiAgc2l6ZU1COiB0Zi50ZW5zb3IyZCh0ZXN0RGF0YS5zaXplTUIsIFsyMCwgMV0pLFxyXG4gIHRpbWVTZWM6IHRmLnRlbnNvcjJkKHRlc3REYXRhLnRpbWVTZWMsIFsyMCwgMV0pXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgdHJhaW5EYXRhLCB0ZXN0RGF0YSwgdHJhaW5UZW5zb3JzLCB0ZXN0VGVuc29ycyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgdHJhaW5EYXRhLCB0ZXN0RGF0YSwgdHJhaW5UZW5zb3JzLCB0ZXN0VGVuc29ycyB9IGZyb20gJy4uL2RhdGEvZGF0YS5qcyc7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0t5Y+v6KeG5YyW6YOo5YiGLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyDlm77lg4/liJ3lp4vljJZcclxuY29uc3QgdHJhaW5UcmFjZSA9IHtcclxuICB4OiB0cmFpbkRhdGEuc2l6ZU1CLFxyXG4gIHk6IHRyYWluRGF0YS50aW1lU2VjLFxyXG4gIG5hbWU6ICd0cmFpbkRhdGEnLFxyXG4gIG1vZGU6ICdtYXJrZXJzJyxcclxuICB0eXBlOiAnc2NhdHRlcicsXHJcbiAgbWFya2VyOiB7IHN5bWJvbDogXCJjaXJjbGVcIiwgc2l6ZTogOCB9XHJcbn07XHJcbmNvbnN0IHRlc3RUcmFjZSA9IHtcclxuICB4OiB0ZXN0RGF0YS5zaXplTUIsXHJcbiAgeTogdGVzdERhdGEudGltZVNlYyxcclxuICBuYW1lOiAndGVzdERhdGEnLFxyXG4gIG1vZGU6ICdtYXJrZXJzJyxcclxuICB0eXBlOiAnc2NhdHRlcicsXHJcbiAgbWFya2VyOiB7IHN5bWJvbDogXCJ0cmlhbmdsZS11cFwiLCBzaXplOiAxMCB9XHJcbn07XHJcbi8vIOihqOekuuiuree7gzEw6L2u55qEdHJhY2VcclxuLy8gbW9kZTogXCJsaW5lc1wiIOWPqumcgOe7meWHuuS4pOerr+WdkOagh++8jHBsb3RseSDoh6rliqjnlLvnur9cclxuY29uc3QgdHJhY2UxMEVwb2NocyA9IHtcclxuICB4OiBbMCwgMl0sXHJcbiAgeTogWzAsIDAuMDFdLFxyXG4gIG5hbWU6ICdtb2RlbCBhZnRlciBOIGVwb2NocycsXHJcbiAgbW9kZTogJ2xpbmVzJyxcclxuICBsaW5lOiB7IGNvbG9yOiAnYmx1ZScsIHdpZHRoOiAxLCBkYXNoOiAnZG90JyB9LFxyXG59O1xyXG4vLyDorq3nu4MyMOi9rlxyXG5jb25zdCB0cmFjZTIwRXBvY2hzID0ge1xyXG4gIHg6IFswLCAyXSxcclxuICB5OiBbMCwgMC4wM10sXHJcbiAgbmFtZTogJ21vZGVsIGFmdGVyIE4gZXBvY2hzJyxcclxuICBtb2RlOiAnbGluZXMnLFxyXG4gIGxpbmU6IHsgY29sb3I6ICdncmVlbicsIHdpZHRoOiAyLCBkYXNoOiAnZGFzaCcgfVxyXG59O1xyXG4vLyDorq3nu4MxMDDova5cclxuY29uc3QgdHJhY2UxMDBFcG9jaHMgPSB7XHJcbiAgeDogWzAsIDJdLFxyXG4gIHk6IFswLCAwLjA1XSxcclxuICBuYW1lOiAnbW9kZWwgYWZ0ZXIgTiBlcG9jaHMnLFxyXG4gIG1vZGU6ICdsaW5lcycsXHJcbiAgbGluZTogeyBjb2xvcjogJ3JlZCcsIHdpZHRoOiAzLCBkYXNoOiAnbG9uZ2Rhc2gnIH1cclxufTtcclxuLy8g6K6t57uDMjAw6L2uXHJcbmNvbnN0IHRyYWNlMjAwRXBvY2hzID0ge1xyXG4gIHg6IFswLCAyXSxcclxuICB5OiBbMCwgMC4xXSxcclxuICBuYW1lOiAnbW9kZWwgYWZ0ZXIgTiBlcG9jaHMnLFxyXG4gIG1vZGU6ICdsaW5lcycsXHJcbiAgbGluZTogeyBjb2xvcjogJ2JsYWNrJywgd2lkdGg6IDQsIGRhc2g6ICdzb2xpZCcgfVxyXG59O1xyXG5cclxuY29uc3QgZGF0YVNldCA9IFt0cmFpblRyYWNlLCB0ZXN0VHJhY2UsIHRyYWNlMTBFcG9jaHMsIHRyYWNlMjBFcG9jaHMsIHRyYWNlMTAwRXBvY2hzLCB0cmFjZTIwMEVwb2Noc107XHJcbmNvbnN0IGxheW91dCA9IHtcclxuICAvLyBnZ3Bsb3QyIOmjjuagvFxyXG4gIHdpZHRoOiA3MDAsXHJcbiAgdGl0bGU6ICdNb2RlbCBGaXQgUmVzdWx0JyxcclxuICB4YXhpczoge1xyXG4gICAgdGl0bGU6ICdzaXplIChNQiknLFxyXG4gICAgemVyb2xpbmU6IGZhbHNlLFxyXG4gICAgdGlja3M6ICdvdXRzaWRlJyxcclxuICAgIGdyaWRjb2xvcjogJ3doaXRlJyxcclxuICAgIGdyaWR3aWR0aDogMS41LFxyXG4gIH0sXHJcbiAgeWF4aXM6IHtcclxuICAgIHRpdGxlOiAndGltZSAoc2VjKScsXHJcbiAgICB6ZXJvbGluZTogZmFsc2UsXHJcbiAgICB0aWNrczogJ291dHNpZGUnLFxyXG4gICAgZ3JpZGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgZ3JpZHdpZHRoOiAxLjUsXHJcbiAgfSxcclxuICBwbG90X2JnY29sb3I6ICcjZWJlYmViJyxcclxuICBlZGl0YWJsZTogdHJ1ZSxcclxufTtcclxuUGxvdGx5Lm5ld1Bsb3QoJ3Bsb3RBcmVhJywgZGF0YVNldCwgbGF5b3V0KTtcclxuXHJcblxyXG4vKiog5pu05pawIHBsb3RseSDlm77lg4/nmoTlh73mlbBcclxuICogQHBhcmFtICB7T2JqZWN0fSBkYXRhVHJhY2UgLSDopoHmm7TmlrDnmoQgdHJhY2VcclxuICogQHBhcmFtICB7TnVtYmVyfSBrIC0g5p2D6YeN57O75pWwXHJcbiAqIEBwYXJhbSAge051bWJlcn0gYiAtIOWBj+e9rlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IE4gLSBlcG9jaFxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYWNlSW5kZXggLSDliJ3lp4vljJblm77lvaLml7YgdHJhY2Ug55qEIGluZGV4XHJcbiAqL1xyXG5mdW5jdGlvbiB1cGRhdGVQbG90KGRhdGFUcmFjZSwgaywgYiwgTiwgdHJhY2VJbmRleCkge1xyXG4gIC8vIOabtOaWsOaooeWei+eahOWPguaVsFxyXG4gIC8vIOe6v+aAp+WPmOaNoiB5PWt4K2IsIGsg56ew5Li6IGtlcm5lbCwgYiDnp7DkuLogYmlhcywgayDlkowgYiDnu5/np7DkuLogd2VpZ2h0c1xyXG4gIGRhdGFUcmFjZS54ID0gWzAsIDEwXTtcclxuICBkYXRhVHJhY2UueSA9IFtiLCBiICsgKGsgKiAxMCldO1xyXG5cclxuICBsZXQgdXBkYXRlID0ge1xyXG4gICAgeDogW2RhdGFUcmFjZS54XSxcclxuICAgIHk6IFtkYXRhVHJhY2UueV0sXHJcbiAgICBuYW1lOiAnbW9kZWwgYWZ0ZXIgJyArIE4gKyAnIGVwb2NocydcclxuICB9O1xyXG5cclxuICBQbG90bHkucmVzdHlsZSgncGxvdEFyZWEnLCB1cGRhdGUsIHRyYWNlSW5kZXgpO1xyXG59XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLea3seW6puWtpuS5oOmDqOWIhi0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gMS4gQ29uc3RydWN0IE1vZGVsXHJcbmNvbnN0IG1vZGVsID0gdGYuc2VxdWVudGlhbCgpO1xyXG5cclxuLy8gdGYubGF5ZXJzLmRlbnNlKCkg5bu656uL5LqG5LiA5Liq5a+G6ZuG5bGC77ya5qCH6YePeOe7j+i/h+WPmOaNouaIkOS4uuagh+mHj3lcclxuLy8g5a+G6ZuG5bGC5piv55u45a+55LqO5Y2356ev5bGC44CB5b6q546v5bGC562J5qih5Z6L6ICM6KiA55qEXHJcbm1vZGVsLmFkZCh0Zi5sYXllcnMuZGVuc2Uoe1xyXG4gIGlucHV0U2hhcGU6IFsxXSwgLy8g6L6T5YWl5byg6YePWOeahHNpemXvvIjplb/luqbkuLox55qEMee7tOW8oOmHj++8ieOAguWBh+WmguaYr+S4gOS4quWbvueJh+WIhuexu+eahOS7u+WKoe+8jOWbvueJh+eahOWDj+e0oOaYrzI4KjI477yM5q+P5Liq5YOP57Sg6K6w5b2V54Gw5bqm5YC877yM5YiZaW5wdXRTaGVwZeeahOWAvOWwseS8muaYr1syOCwgMjgsIDFdXHJcbiAgdW5pdHM6IDEsIC8vIOWUr+S4gOS4gOWxguelnue7j+WFg+eahOaVsOebrlxyXG4gIC8vIOayoeacieinhOWumua/gOa0u+WHveaVsOeahOW9ouW8j++8jOi/meS4gOWxguWPmOaNouWwseaYr+e6v+aAp+WPmOaNolxyXG59KSk7XHJcblxyXG5cclxuLy8gMi4gQ29tcGlsZSBNb2RlbFxyXG4vLyDmjIflrprkvJjljJblmag6IFNHROaWueazlSwgYWxwaGEgPSAwLjAwMDXvvIzlvojlsI/vvIzmlYXmhI/kvJjljJblvpfmhaLkuIDngrnmnaXlj6/op4bljJbov5nkuKrov4fnqItcclxuLy8gY29uc3Qgb3B0aW1pemVyID0gJ3NnZCc7IC8vIOS8mOWMluWZqOeahOeugOWGmSBcclxuLy8g5oyH5a6a5o2f5aSx5Ye95pWw5Li6IGVycm9yIOeahOe7neWvueWAvOeahOW5s+Wdh+WAvO+8jOeUqOS8quS7o+eggeihqOekuuWNsyBsb3NzRnVuY3Rpb24gPSBhdmVyYWdlKGFic29sdXRlKGsqeCtiLXkpKVxyXG5tb2RlbC5jb21waWxlKHsgb3B0aW1pemVyOiB0Zi50cmFpbi5zZ2QoMC4wMDA1KSwgbG9zczogJ21lYW5BYnNvbHV0ZUVycm9yJyB9KTtcclxuXHJcblxyXG4vLyAzLiBtb2RlbC5zZXRXZWlnaHRzKCkg6K6+5a6a5qih5Z6L5Y+C5pWw5Yid5aeL5YC877yM6L+Z5LiA5q2l5Lmf5Y+v5Lul5rKh5pyJ77yM5Y2z6LCD55SodGZqc+eahOm7mOiupOWPguaVsOWIneWni+WMluaWueazlVxyXG4vLyBtb2RlbC5nZXRXZWlnaHRzKCkg6I635Y+W5qih5Z6L5Y+C5pWwXHJcbmxldCBrID0gMDtcclxubGV0IGIgPSAwO1xyXG4vLyDlnKjmqKHlnosgWT1LWCtCIOS4re+8jEvkuLrkuoznu7TlvKDph4/vvIjnn6npmLXvvInvvIxC5Li65LiA57u05byg6YeP77yI5ZCR6YeP77yJXHJcbi8vIHRmLnRlbnNvcjJkKCnljbPliJvlu7rkuoznu7TlvKDph4/vvIjnn6npmLXvvInnmoTlh73mlbDvvIznrKzkuIDkuKrlj4LmlbDkuLrnn6npmLXmjInooYzlsZXlvIDnmoTmlbDnu4TvvIznrKzkuozkuKrlj4LmlbDooajnpLrnn6npmLXnmoTop4TmqKFcclxuLy8gdGYudGVuc29yMWQoKeS4uuWIm+W7uuS4gOe7tOW8oOmHj++8iOWQkemHj++8ieeahOWHveaVsO+8jOesrOS4gOS4quWPguaVsOS4uuihqOekuuWQkemHj+eahOaVsOe7hO+8jOS4jemcgOimgeesrOS6jOS4quWPguaVsFxyXG5tb2RlbC5zZXRXZWlnaHRzKFt0Zi50ZW5zb3IyZChba10sIFsxLCAxXSksIHRmLnRlbnNvcjFkKFtiXSldKTtcclxuXHJcblxyXG4vLyA0LiBtb2RlbC5maXQoKSDorq3nu4PmqKHlnotcclxuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCBtb2RlbC5maXQoXHJcbiAgICB0cmFpblRlbnNvcnMuc2l6ZU1CLCAvLyDorq3nu4Ppm4bovpPlhaXlvKDph49cclxuICAgIHRyYWluVGVuc29ycy50aW1lU2VjLCAvLyDorq3nu4Ppm4bovpPlh7rlvKDph49cclxuICAgIHsgLy8g6YWN572u6K6t57uD55qE5Y+C5pWwXHJcbiAgICAgIGVwb2NoczogMjAwLCAvLyDov5vooYzlpJrlsJHova7orq3nu4NcclxuICAgICAgLy8g6ZKI5a+55LiN5ZCM5LqL5Lu255qE5Zue6LCD5a+56LGhXHJcbiAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIG9uRXBvY2hFbmQ6IGFzeW5jIChlcG9jaCwgbG9ncykgPT4ge1xyXG4gICAgICAgICAgLy8g5q+P6L2u6K6t57uD57uT5p2f77yM6I635Y+W5pyA5paw55qEIGsg5ZKMIGJcclxuICAgICAgICAgIGsgPSBtb2RlbC5nZXRXZWlnaHRzKClbMF0uZGF0YVN5bmMoKVswXTtcclxuICAgICAgICAgIGIgPSBtb2RlbC5nZXRXZWlnaHRzKClbMV0uZGF0YVN5bmMoKVswXTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBlcG9jaCAke2Vwb2NofWApO1xyXG4gICAgICAgICAgaWYgKGVwb2NoID09PSA5KSB7XHJcbiAgICAgICAgICAgIC8vIOWcqOesrDEw6L2u57uT5p2f5pe277yM5pu05paw56ys5LiA5p2h57q/KOWOn+WbvueahOesrOS4ieS4qnRyYWNlKVxyXG4gICAgICAgICAgICB1cGRhdGVQbG90KHRyYWNlMTBFcG9jaHMsIGssIGIsIDEwLCAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChlcG9jaCA9PT0gMTkpIHtcclxuICAgICAgICAgICAgLy8g5Zyo56ysMjDova7nu5PmnZ/ml7bvvIzmm7TmlrDnrKzkuozmnaHnur8o5Y6f5Zu+55qE56ys5Zub5LiqdHJhY2UpXHJcbiAgICAgICAgICAgIHVwZGF0ZVBsb3QodHJhY2UyMEVwb2NocywgaywgYiwgMjAsIDMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGVwb2NoID09PSA5OSkge1xyXG4gICAgICAgICAgICB1cGRhdGVQbG90KHRyYWNlMTAwRXBvY2hzLCBrLCBiLCAxMDAsIDQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGVwb2NoID09PSAxOTkpIHtcclxuICAgICAgICAgICAgdXBkYXRlUGxvdCh0cmFjZTIwMEVwb2NocywgaywgYiwgMjAwLCA1KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF3YWl0IHRmLm5leHRGcmFtZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIC8vIDUuIG1vZGVsLmV2YWx1YXRlKCkg5rWL6K+V5qih5Z6LXHJcbiAgLy8g55So5rWL6K+V6ZuG6K+E5Lyw6K6t57uD5a6M5q+V55qE5qih5Z6L77yM6L6T5Ye6bG9zcyBzdGF0aXN0aWNzXHJcbiAgbW9kZWwuZXZhbHVhdGUodGVzdFRlbnNvcnMuc2l6ZU1CLCB0ZXN0VGVuc29ycy50aW1lU2VjKS5wcmludCgpO1xyXG5cclxuICAvLyA2LiBtb2RlbC5wcmVkaWN0KCkg55So5qih5Z6L6aKE5rWLXHJcbiAgLy8g6K+l5pa55rOV5LiA5qyh5Y+v5Lul6aKE5rWL5LiA57uE5qC35pys77yM5qC35pys5Lit55qE5q+P5Liq5pWw5o2u6KaB56ym5ZCIIGlucHV0U2hhcGUg6KeE5a6a55qEIHNpemVcclxuICAvLyDku47ogIzov5nnu4TmoLfmnKzpnIDopoHlsIHoo4XkuLrkuIDkuKrmr5TljZXmrKHovpPlhaXnu7Tluqbmm7Tpq5jnmoTlvKDph49cclxuICBtb2RlbC5wcmVkaWN0KHRmLnRlbnNvcjJkKFtbNy44XSwgWzEuMl0sIFsxMy41XV0pKS5wcmludCgpO1xyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiIn0=