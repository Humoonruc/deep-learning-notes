/**
 * @module Rosenblatt
 * @file Rosenblatt 感知器
 */

import { renderPoints } from './01-renderRandomData.js';

// config
const scale = 1000;
const alpha = 0.03;
const m = 100;
let w = 0.5; // 模型参数的初始值


// data
const points = renderPoints(scale);
const xs = points.xs;
const ys = points.ys;


// SGD adjust
for (let j = 0; j < m; j++) {
  for (let i = 0; i < scale; i++) {
    const e = ys[i] - w * xs[i];
    w = w + e * alpha;
  }
}


const ysPre = xs.map(x => x * w);

export { w, xs, ys, ysPre };