#########################################
# 09-keras.R
# keras 处理蚊香型(double spiral 双螺旋)数据
#########################################


# library
library(tidyverse)
library(magrittr)
library(data.table)
library(keras)
library(plotly)
library(htmlwidgets)


# config
config <- jsonlite::fromJSON("./09-config.json")
alpha <- config$alpha
m <- config$m
scale <- config$scale
batch_size <- config$batch_size


# functions
source("./09-plotly-3d.R")
source("./09-render-data.R")


# data
data_spiral <- getDoubleSpiral(scale)
scatter_3d(data_spiral) %>%
  saveWidget("./figure/keras-spiral-scatter3d.html", FALSE, "lib")

input <- data_spiral[, .(X1, X2)] %>% as.matrix()
output <- data_spiral$Y


# deep learning
model <- keras_model_sequential()

model %>%
  layer_dense(units = 50, activation = "relu", input_shape = 2) %>%
  layer_dense(units = 50, activation = "relu") %>%
  layer_dense(units = 50, activation = "relu") %>%
  layer_dense(units = 50, activation = "relu") %>%
  layer_dense(units = 1, activation = "sigmoid")

model %>% compile(
  optimizer = optimizer_adam(lr = alpha), # 本例中，0.03的学习率会震荡，要更小一些
  loss = "binary_crossentropy",
  metrics = c("accuracy")
)

model %>% fit(
  input, output,
  epochs = m,
  batch_size = batch_size,
  verbose = 2
)


# 绘制拟合结果
forward <- function(x1, x2) {
  c(x1, x2) %>%
    matrix(ncol = 2) %>%
    # 模型的 predict() 只接受矩阵
    predict(model, .) %>%
    # 预测结果是一个矩阵，需要转换为向量
    as.vector()
}

mesh_3d(data_spiral, forward) %>%
  saveWidget("./figure/keras-spiral-mesh.html", FALSE, "lib")

surface_3d(data_spiral, forward) %>%
  saveWidget("./figure/keras-spiral-surface.html", FALSE, "lib")