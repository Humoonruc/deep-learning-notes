/**
 * @module renderRandomData
 * @file 生成一个随机数据集
 * @author Humoonruc
 */


/** 生成由二维随机点组成的数组
 * @param  {number} scale 数据集的规模
 * @returns {Array} 返回x坐标已经按照升序排序完毕的数据集
 */
const renderPoints = function (scale) {
  const xs = [...Array(scale)].map(d => Math.random()).sort();
  const ys = xs.map(x => 1.2 * x + Math.random() / 10);
  return { xs: xs, ys: ys };
};

export { renderPoints };