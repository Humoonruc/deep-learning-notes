/**
 * @file 二元双螺旋数据的分类问题
 */


import * as config from './config.js';
import { renderScale, getWideData } from './calculate.js';
import { positivePoints, negativePoints, SpiralTensors } from './data.js';
const X1Scale = renderScale(positivePoints.X1.concat(negativePoints.X1));
const X2Scale = renderScale(positivePoints.X2.concat(negativePoints.X2));


// Plotting
function getTrace(data, name, color) {
  return {
    name: name,
    type: 'scatter3d',
    mode: 'markers',
    x: data.X1,
    y: data.X2,
    z: data.Y,
    marker: {
      color: color,
      symbol: 'circle',
      size: 3,
      opacity: 0.8
    },
  };
}
const positiveTrace = getTrace(positivePoints, 'positive', 'red');
const negativeTrace = getTrace(negativePoints, 'negative', 'royalblue');

const wideData = getWideData(X1Scale, X2Scale, (x1, x2) => 0.5);
let surfaceTrace = {
  name: 'fitting surface',
  type: 'surface',
  x: wideData.X1,
  y: wideData.X2,
  z: wideData.Y,
  opacity: 0.5,
  showscale: false,
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true } // 等高线
    }
  }
};


const layout = {
  title: 'Double Spiral',
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 50
  }
};

Plotly.newPlot('05-dual-spiral-classification', [positiveTrace, negativeTrace, surfaceTrace], layout);


// Define Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });


// Train Model
function updatePlot(plotDivId, traceIndex, plotTitle, N) {
  const loss = model.evaluate(SpiralTensors.input, SpiralTensors.output)[0].dataSync();

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
  await model.fit(SpiralTensors.input, SpiralTensors.output, {
    epochs: config.epochs,
    batchSize: config.batchSize,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        if ((epoch + 1) % 50 === 0) {
          updatePlot('05-dual-spiral-classification', 2, '双螺旋数据的分类问题', epoch);
        }
      }
    }
  });
})();