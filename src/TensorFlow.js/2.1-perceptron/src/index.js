import { trainData, testData, trainTensors, testTensors } from '../data/data.js';

//--------------可视化部分---------------

// 图像初始化
const trainTrace = {
  x: trainData.sizeMB,
  y: trainData.timeSec,
  name: 'trainData',
  mode: 'markers',
  type: 'scatter',
  marker: { symbol: "circle", size: 8 }
};
const testTrace = {
  x: testData.sizeMB,
  y: testData.timeSec,
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
// 密集层是相对于卷积层等模型而言的
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
    trainTensors.sizeMB, // 训练集输入张量
    trainTensors.timeSec, // 训练集输出张量
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
  model.evaluate(testTensors.sizeMB, testTensors.timeSec).print();

  // 6. model.predict() 用模型预测
  // 该方法一次可以预测一组样本，样本中的每个数据要符合 inputShape 规定的 size
  // 从而这组样本需要封装为一个比单次输入维度更高的张量
  model.predict(tf.tensor2d([[7.8], [1.2], [13.5]])).print();
})();