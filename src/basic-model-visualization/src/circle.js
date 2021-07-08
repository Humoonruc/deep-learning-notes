/**
 * @file 二元圆形数据的分类问题
 */


import * as config from './config.js';
import { renderScale, getWideData } from './calculate.js';
import { circlePoints, circleTensors } from './data.js';
const X1Scale = renderScale(circlePoints.X1);
const X2Scale = renderScale(circlePoints.X2);


// Plotting
const pointsTrace = {
  name: 'points',
  type: 'scatter3d',
  mode: 'markers',
  x: circlePoints.X1,
  y: circlePoints.X2,
  z: circlePoints.Y,
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

Plotly.newPlot('04-dual-circle-classification', [pointsTrace, surfaceTrace]);


// Define Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 3, activation: 'sigmoid' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });


// Train Model
function updatePlot(plotDivId, traceIndex, plotTitle, N) {
  const loss = model.evaluate(circleTensors.input, circleTensors.output)[0].dataSync();

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
  await model.fit(circleTensors.input, circleTensors.output, {
    epochs: config.epochs,
    batchSize: config.batchSize,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 50 === 0) {
          updatePlot('04-dual-circle-classification', 1, '圆形数据的分类问题', epoch);
        }
      }
    }
  });
})();