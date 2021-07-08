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



export { sigmoid, renderScale, getWideData, getLongData, sample };