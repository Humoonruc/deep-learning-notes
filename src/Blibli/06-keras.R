library(tidyverse)
library(data.table)
library(keras)
library(plotly)
library(htmlwidgets)


# 配置文件
config <- jsonlite::fromJSON("./06-config.json")
alpha <- config$alpha
scale <- config$scale
m <- config$m


source("./06-plotly.R")
source("./06-render-data.R")


## 数据一 =================================================

data1 <- render_data_1(scale)

# 构建模型
model <- keras_model_sequential()

# 模型结构设定
model %>%
  # 第一层神经网络
  ## layer_dense(units = 2, activation = "sigmoid") %>%
  # 第二层神经网络
  # 第一层神经网络必须有 input_shape 参数
  layer_dense(units = 1, activation = "sigmoid", input_shape = 1)


# 设置模型
model %>% compile(
  optimizer = optimizer_sgd(lr = alpha), # 优化器
  loss = "mean_squared_error", # 损失函数
  metrics = c("accuracy")
)

# 训练模型
model %>% fit(
  data1$X, data1$Y,
  epochs = m,
  batch_size = 10,
  verbose = 2 # Console 中显示的细节
)

# 应用模型
pre1 <- model %>% predict(data1$X)

data1[, pre := pre1] %>%
  plot_2d() %>%
  saveWidget("./figure/keras-sigmoid.html", FALSE, "lib")


## 数据二 =================================================

data2 <- render_data_2(scale)

# 构建模型
model <- keras_model_sequential()

# 模型结构设定
model %>%
  layer_dense(units = 2, activation = "sigmoid", input_shape = 1) %>%
  layer_dense(units = 1, activation = "sigmoid")


# 设置模型
model %>% compile(
  optimizer = optimizer_sgd(lr = alpha), # 优化器
  loss = "mean_squared_error", # 损失函数
  metrics = c("accuracy")
)

# 训练模型
model %>% fit(
  data2$X, data2$Y,
  epochs = m,
  batch_size = 10,
  verbose = 2 # Console 中显示的细节
)

# 应用模型
pre2 <- model %>% predict(data2$X)

data2[, pre := pre2] %>%
  plot_2d() %>%
  saveWidget("./figure/keras-hidden-layer.html", FALSE, "lib")
