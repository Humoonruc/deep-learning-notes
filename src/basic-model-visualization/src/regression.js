/**
 * @file 一元回归
 */


import * as config from './config.js';
import { regressionPoints, regressionTensors } from './data.js';
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
const pointsTrace = renderTrace(regressionPoints, 'points', 'black');

let k = 0;
let b = 0;
const lineTrace = {
  name: 'regression line',
  mode: 'lines',
  x: [0, 1],
  y: [0, 0],
  line: {
    color: 'red',
    width: 2,
  },
};

Plotly.newPlot('01-unitary-regression', [pointsTrace, lineTrace], layout);


// Define model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
model.compile({ optimizer: 'adam', loss: 'meanAbsoluteError' });
model.setWeights([tf.tensor2d([k], [1, 1]), tf.tensor1d([b])]);


// Train model
function updatePlot(plotDivId, traceIndex, plotTitle, epoch) {
  const k = model.getWeights()[0].dataSync()[0];
  const b = model.getWeights()[1].dataSync()[0];
  const loss = model.evaluate(regressionTensors.X, regressionTensors.Y).dataSync();

  const newStatus = {
    data: [{ x: [0, 1], y: [b, b + (k * 1)], }],
    traces: [traceIndex],
    layout: {
      title: {
        text: `${plotTitle}  第 ${epoch + 1} 次迭代, 拟合模型为: y = ${d3.format(".3f")(k)}x + ${d3.format(".3f")(b)}, loss = ${d3.format(".4f")(loss)}`,
      },
    },
  };

  Plotly.animate(plotDivId, newStatus, { transition: { duration: 1 } });
}

(async () => {
  await model.fit(regressionTensors.X, regressionTensors.Y, {
    epochs: 500,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 10 === 0) {
          updatePlot('01-unitary-regression', 1, '一元回归问题', epoch);
        }
      }
    }
  });
})();