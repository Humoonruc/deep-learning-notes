/**
 * @file 二元线性可分数据的分类问题
 */


import * as config from './config.js';
import { renderScale, getWideData } from './calculate.js';
import { linearPoints, linearTensors } from './data.js';
const X1Scale = renderScale(linearPoints.X1);
const X2Scale = renderScale(linearPoints.X2);


// Plotting
const pointsTrace = {
  name: 'points',
  type: 'scatter3d',
  mode: 'markers',
  x: linearPoints.X1,
  y: linearPoints.X2,
  z: linearPoints.Y,
  marker: {
    color: 'black',
    symbol: 'circle',
    size: 1.5,
    opacity: 0.9
  }
};

const wideData = getWideData(X1Scale, X2Scale, (x1, x2) => 0.5);
let surfaceTrace = {
  name: 'fitting surface',
  type: 'surface',
  x: wideData.X1,
  y: wideData.X2,
  z: wideData.Y,
  opacity: 0.5,
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true } // 等高线
    }
  }
};

Plotly.newPlot('03-dual-linear-classification', [pointsTrace, surfaceTrace]);


// Define Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });


// Train Model
function updatePlot(plotDivId, traceIndex, plotTitle, N) {
  const loss = model.evaluate(linearTensors.input, linearTensors.output)[0].dataSync();

  const n = X1Scale.length;
  const YTable = [];
  for (let j of X2Scale) {
    const columnArray = [];
    for (let i of X1Scale) {
      columnArray.push([i, j]);
    }
    const columnTensor = tf.tensor2d(columnArray, [n, 2]);
    const columnValue = model.predict(columnTensor).dataSync();
    YTable.push(columnValue);
  }

  const newStatus = {
    data: [{
      x: X1Scale,
      y: X2Scale,
      z: YTable,
    }],
    traces: [traceIndex],
    layout: {
      title: {
        text: `${plotTitle}: 第 ${N + 1} 次迭代, loss = ${d3.format(".4f")(loss)}`,
      },
    },
  };

  Plotly.animate(plotDivId, newStatus, {
    transition: {
      duration: 1,
    },
    frame: {
      duration: 1,
    }
  });
}

(async () => {
  await model.fit(linearTensors.input, linearTensors.output, {
    epochs: config.epochs,
    batchSize: config.batchSize,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 50 === 0) {
          updatePlot('03-dual-linear-classification', 1, '线性可分数据的分类问题', epoch);
        }
      }
    }
  });
})();