#########################################
# 08-keras.R
# keras 处理二元二分类问题
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
source("./08-render-data.R")


# linear data =================================================

data_linear <- render_data_linear(scale)
# 由列表化为矩阵，才能使用 keras 的API
input <- data_linear[, .(X1, X2)] %>% as.matrix()
output <- data_linear$Y


# 深度学习
model1 <- keras_model_sequential()
model1 %>%
  layer_dense(units = 1, activation = "sigmoid", input_shape = 2)
model1 %>% compile(
  optimizer = optimizer_adam(lr = alpha),
  loss = "mean_squared_error",
  metrics = c("accuracy")
)
model1 %>% fit(
  input, output,
  epochs = m,
  batch_size = batch_size,
  verbose = 2
)


# 绘制拟合结果
forward_linear <- function(x1, x2) {
  c(x1, x2) %>%
    matrix(ncol = 2) %>%
    predict(model1, .) %>%
    as.vector()
}

mesh_3d(data_linear, forward_linear) %>%
  saveWidget("./figure/keras-linear-mesh.html", FALSE, "lib")

surface_3d(data_linear, forward_linear) %>%
  saveWidget("./figure/keras-linear-surface.html", FALSE, "lib")


# circle data =================================================

data_circle <- render_data_circle(scale)
input <- data_circle[, .(X1, X2)] %>% as.matrix()
output <- data_circle$Y


# 深度学习
model2 <- keras_model_sequential()
model2 %>%
  layer_dense(units = 3, activation = "sigmoid", input_shape = 2) %>%
  layer_dense(units = 1, activation = "sigmoid")
model2 %>% compile(
  optimizer = optimizer_adam(lr = alpha),
  loss = "mean_squared_error",
  metrics = c("accuracy")
)
model2 %>% fit(
  input, output,
  epochs = m,
  batch_size = batch_size,
  verbose = 2
)


# 绘制拟合结果
forward_circle <- function(x1, x2) {
  c(x1, x2) %>%
    matrix(ncol = 2) %>%
    predict(model2, .) %>%
    as.vector()
}

mesh_3d(data_circle, forward_circle) %>%
  saveWidget("./figure/keras-circle-mesh.html", FALSE, "lib")

surface_3d(data_circle, forward_circle) %>%
  saveWidget("./figure/keras-circle-surface.html", FALSE, "lib")