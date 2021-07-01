/**
 * @module plotlyStyle
 * @file ggplot2 风格的 plotly图像样式
 */

const layout = {
  title: {
    font: {
      family: 'Times New Roman', 
      size: 18,
    },
    xref: 'paper',
    x: 0,
  },
  margin: {
    t: 50,
  },
  xaxis: {
    zeroline: false,
    ticks: 'outside',
    gridcolor: 'white',
    gridwidth: 1.5,
  },
  yaxis: {
    zeroline: false,
    ticks: 'outside',
    gridcolor: 'white',
    gridwidth: 1.5,
  },
  plot_bgcolor: '#ebebeb',
};

export { layout };