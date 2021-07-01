/**
 * @module index.js
 */

import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

import { BostonHousingDataset, featureDescriptions } from './data';
import * as normalization from './normalization';
import * as ui from './ui';

// Some hyperparameters for model training.
const NUM_EPOCHS = 200;
const BATCH_SIZE = 40;
const LEARNING_RATE = 0.01;

const bostonData = new BostonHousingDataset();
const tensors = {};

// Convert loaded data into tensors and creates normalized versions of the
// features.
export function arraysToTensors() {
  tensors.rawTrainFeatures = tf.tensor2d(bostonData.trainFeatures);
  tensors.trainTarget = tf.tensor2d(bostonData.trainTarget);
  tensors.rawTestFeatures = tf.tensor2d(bostonData.testFeatures);
  tensors.testTarget = tf.tensor2d(bostonData.testTarget);
  // Normalize mean and standard deviation of data.
  let { dataMean, dataStd } =
    normalization.determineMeanAndStddev(tensors.rawTrainFeatures);

  tensors.trainFeatures = normalization.normalizeTensor(
    tensors.rawTrainFeatures, dataMean, dataStd);
  tensors.testFeatures =
    normalization.normalizeTensor(tensors.rawTestFeatures, dataMean, dataStd);
};


/**
 * Builds and returns Linear Regression Model.
 * @returns {tf.Sequential} The linear regression model.
 */
export function linearRegressionModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({
    inputShape: [bostonData.numFeatures], // 输入的维度
    units: 1 // 单神经元输出
    // 没有定义激活函数，故为线性模型
  }));

  model.summary();
  return model;
};

/** multiLayerPerceptron, MLP 多层感知机
 * Builds and returns Multi Layer Perceptron Regression Model
 * with 1 hidden layers, each with 10 units activated by sigmoid.
 *
 * @returns {tf.Sequential} The multi layer perceptron regression model.
 */
export function multiLayerPerceptronRegressionModel1Hidden() {
  const model = tf.sequential();
  // 50 个神经元组成的隐藏层
  model.add(tf.layers.dense({
    inputShape: [bostonData.numFeatures],
    units: 50,
    activation: 'sigmoid',
    kernelInitializer: 'leCunNormal' // 初始化kernel(系数张量W)的方式
  }));
  model.add(tf.layers.dense({ units: 1 }));

  model.summary(); // 打印模型拓扑结构的文本报告
  return model;
};


/**
 * Builds and returns Multi Layer Perceptron Regression Model
 * with 2 hidden layers, each with 10 units activated by sigmoid.
 *
 * @returns {tf.Sequential} The multi layer perceptron regression mode  l.
 */
export function multiLayerPerceptronRegressionModel2Hidden() {
  const model = tf.sequential();
  model.add(tf.layers.dense({
    inputShape: [bostonData.numFeatures],
    units: 50,
    activation: 'sigmoid',
    kernelInitializer: 'leCunNormal'
  }));
  model.add(tf.layers.dense(
    { units: 50, activation: 'sigmoid', kernelInitializer: 'leCunNormal' }));
  model.add(tf.layers.dense({ units: 1 }));

  model.summary();
  return model;
};


/**
 * Describe the current linear weights for a human to read.
 *
 * @param {Array} kernel Array of floats of length 12.  One value per feature.
 * @returns {List} List of objects, each with a string feature name, and value
 *     feature weight.
 */
export function describeKernelElements(kernel) {
  tf.util.assert(
    kernel.length == 12,
    `kernel must be a array of length 12, got ${kernel.length}`);
  const outList = [];
  for (let idx = 0; idx < kernel.length; idx++) {
    outList.push({ description: featureDescriptions[idx], value: kernel[idx] });
  }
  return outList;
}


/**
 * Compiles `model` and trains it using the train data and runs model against
 * test data. Issues a callback to update the UI after each epcoh.
 *
 * @param {tf.Sequential} model Model to be trained.
 * @param {boolean} weightsIllustration Whether to print info about the learned
 *  weights.
 */
export async function run(model, modelName, weightsIllustration) {
  model.compile({
    optimizer: tf.train.sgd(LEARNING_RATE),
    loss: 'meanSquaredError'
  });

  let trainLogs = [];
  const container = document.querySelector(`#${modelName} .chart`);

  ui.updateStatus('Starting training process...');
  await model.fit(tensors.trainFeatures, tensors.trainTarget, {
    batchSize: BATCH_SIZE,
    epochs: NUM_EPOCHS,
    validationSplit: 0.2, // 20%数据作为验证集
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        await ui.updateModelStatus(
          `Epoch ${epoch + 1} of ${NUM_EPOCHS} completed.`,
          modelName
        );
        trainLogs.push(logs);
        tfvis.show.history(container, trainLogs, ['loss', 'val_loss']);

        // 获取和展示 weights
        if (weightsIllustration) {
          model.layers[0].getWeights()[0].data().then(kernelAsArr => {
            const weightsList = describeKernelElements(kernelAsArr);
            ui.updateWeightDescription(weightsList);
          });
        }
      }
    }
  });

  // 测试
  ui.updateStatus('Running on test data...');
  const result = model.evaluate(
    tensors.testFeatures,
    tensors.testTarget,
    { batchSize: BATCH_SIZE }
  ); // 返回标量
  const testLoss = result.dataSync()[0];

  // 输出三个损失：训练集、验证集、测试集
  const trainLoss = trainLogs[trainLogs.length - 1].loss;
  const valLoss = trainLogs[trainLogs.length - 1].val_loss;
  await ui.updateModelStatus(
    `Final train-set loss: ${trainLoss.toFixed(4)}\n` +
    `Final validation-set loss: ${valLoss.toFixed(4)}\n` +
    `Test-set loss: ${testLoss.toFixed(4)}`,
    modelName);
};


/**
 * 以最简单的模型作为基准：
 * 将平均值作为预测值，计算误差统计量，作为衡量其他模型性能的基准
 */
export function computeBaseline() {
  // 一维张量均值计算
  const avgPrice = tensors.trainTarget.mean();
  // 张量计算可能通过GPU进行
  // dataSync() 表示计算完毕后，将数值从GPU转给CPU
  console.log(`Average price: ${avgPrice.dataSync()}`);

  // 测试集各值减去训练集平均值，平方再取平均
  const baseline = tensors.testTarget.sub(avgPrice).square().mean();
  console.log(`Baseline loss: ${baseline.dataSync()}`);
  const baselineMsg = `Baseline loss (meanSquaredError) is ${baseline.dataSync()[0].toFixed(2)}`;
  ui.updateBaselineStatus(baselineMsg);
};


document.addEventListener('DOMContentLoaded', async () => {
  await bostonData.loadData();
  ui.updateStatus('Data loaded, converting to tensors');
  arraysToTensors();
  ui.updateStatus(
    'Data is now available as tensors.\n' +
    'Click a train button to begin.');
  // TODO Explain what baseline loss is. How it is being computed in this
  // Instance
  ui.updateBaselineStatus('Estimating baseline loss');
  computeBaseline();
  await ui.setup();
}, false);