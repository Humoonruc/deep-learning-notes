/**
 * @module data
 * @file 
 */

import { scale } from './config.js';


// 01 一元回归数据
function renderRegressionPoints(scale) {
  const X = [...Array(scale)].map(d => Math.random()).sort();
  const Y = X.map(x => 1.2 * x + Math.random() / 10);
  return { X: X, Y: Y };
};
const regressionPoints = renderRegressionPoints(scale);
const regressionTensors = {
  X: tf.tensor2d(regressionPoints.X, [scale, 1]),
  Y: tf.tensor2d(regressionPoints.Y, [scale, 1])
};


// 02 一元分类数据
function renderClassificationPoints(scale) {
  const X = [...Array(scale)].map(d => 2 * Math.random()).sort();
  const conditions = X.map(x => 0.7 * x - 0.02 * Math.random() + 0.51);
  const Y = conditions.map(condition => condition > 0.8 && condition < 1.4 ? 1 : 0);
  return { X: X, Y: Y };
}
const classificationPoints = renderClassificationPoints(scale);
const classificationTensors = {
  X: tf.tensor2d(classificationPoints.X, [scale, 1]),
  Y: tf.tensor2d(classificationPoints.Y, [scale, 1])
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
const linearPoints = renderDualLinearPoints(scale);
const linearTensors = {
  input: tf.tensor2d(linearPoints.X, [scale, 2]),
  output: tf.tensor2d(linearPoints.Y, [scale, 1])
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
const circlePoints = renderDualCirclePoints(scale);
const circleTensors = {
  input: tf.tensor2d(circlePoints.X, [scale, 2]),
  output: tf.tensor2d(circlePoints.Y, [scale, 1])
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
const positivePoints = renderDualSpiralPoints(scale / 2, 0, 1);
const negativePoints = renderDualSpiralPoints(scale / 2, Math.PI, 0);

function renderSpiralTensors(positivePoints, negativePoints) {
  const X = positivePoints.X.concat(negativePoints.X);
  const Y = positivePoints.Y.concat(negativePoints.Y);

  return {
    input: tf.tensor2d(X, [scale, 2]),
    output: tf.tensor2d(Y, [scale, 1])
  };
}
const SpiralTensors = renderSpiralTensors(positivePoints, negativePoints);






export { regressionPoints, regressionTensors, classificationPoints, classificationTensors, linearPoints, linearTensors, circlePoints, circleTensors, positivePoints, negativePoints, SpiralTensors };