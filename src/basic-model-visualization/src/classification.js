/**
 * @file 一元分类
 */


import * as config from './config.js';
import { classificationPoints, classificationTensors } from './data.js';
import { layout } from './plotlyStyle.js';


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
const classificationPointsTrace = renderTrace(classificationPoints, 'points', 'black');
const classificationLineTrace = {
  name: 'regression line',
  mode: 'lines',
  x: [0, 2],
  y: [0.5, 0.5],
  line: {
    color: 'red',
    width: 2,
  },
};
Plotly.newPlot('02-unitary-classification', [classificationPointsTrace, classificationLineTrace], layout);


// Define Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 2, activation: 'sigmoid' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });


// Train Model
function updatePlot(plotDivId, traceIndex, plotTitle, N) {
  // const loss = model.evaluate(classificationTensors.X, classificationTensors.Y)[0].dataSync();

  const arrayX = [...Array(config.scale + 1)].map((d, i) => 2 * i / config.scale);
  const tensorX = tf.tensor2d(arrayX, [config.scale + 1, 1]);
  const arrayY = model.predict(tensorX).dataSync();

  const newStatus = {
    data: [{ x: arrayX, y: arrayY }],
    traces: [traceIndex],
    layout: {
      title: {
        text: `${plotTitle}  第 ${N + 1} 次迭代`,
      },
    },
  };

  Plotly.animate(plotDivId, newStatus, { transition: { duration: 1 } });
}


(async () => {
  await model.fit(classificationTensors.X, classificationTensors.Y, {
    epochs: 10000,
    batchSize: config.batchSize,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 100 === 0) {
          updatePlot('02-unitary-classification', 1, '一元分类问题', epoch);
        }
      }
    }
  });
})();