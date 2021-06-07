/**
 * @module Rosenblatt
 * @file Rosenblatt 感知器
 */


import { renderPoints } from './renderRandomData.js';


// config
const scale = 1000;
const alpha = 0.03;
let w = 0.5; // 模型参数的初始值


// data
const points = renderPoints(scale);

// SGD adjust
for (let m = 0; m < 10; m++) {
  points.forEach(point => {
    const e = point.y - w * point.x;
    w += e * alpha;
  });
}

const xs = points.map(point => point.x);
const ys = points.map(point => point.y);
const ysPre = xs.map(x => x * w);

export { w, xs, ys, ysPre };