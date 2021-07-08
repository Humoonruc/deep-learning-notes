/**
 * @module normalization
 * @file 提供标准化函数，将每个字段的值标准化
 */


/** 计算每列数据的平均值和标准差
 * Calculates the mean and standard deviation of each column of a data array.
 * @param {Tensor2d} data Dataset from which to calculate the mean and
 *                        std of each column independently.
 * @returns {Object} Contains the mean and standard deviation of each vector column as 1d tensors. 每列的均值和标准差，多列组成一维张量，两个张量再组成对象
 */
export function determineMeanAndStddev(data) {
  // data 是一个二维张量，一个数据表
  // mean(0) 表示沿第一个维度（样本obs）的方向计算均值，返回一维张量
  // 永远注意维度，不要出错
  const dataMean = data.mean(0);
  const dataStd = data.sub(dataMean).square().mean(0).sqrt();
  return { dataMean, dataStd };
}


/** 链式法则和广播机制的张量运算
 * 三个参数都是张量，data 为二维数据表，按列分别计算
 * 如二维张量减一维张量，会将一维张量扩展若干次，成为同size的二维张量再相减
 * size 较小的张量扩展为 size 较大的张量，这被称为 broadcast 机制
 * 
 * Given expected mean and standard deviation, normalizes a dataset by
 * subtracting the mean and dividing by the standard deviation.
 *
 * @param {Tensor2d} data: Data to normalize. Shape: [batch, numFeatures].
 * @param {Tensor1d} dataMean: Expected mean of the data. Shape [numFeatures].
 * @param {Tensor1d} dataStd: Expected std of the data. Shape [numFeatures]
 *
 * @returns {Tensor2d}: Tensor the same shape as data, but each column
 * normalized to have zero mean and unit standard deviation.
 */
export function normalizeTensor(data, dataMean, dataStd) {
  return data.sub(dataMean).div(dataStd);
}