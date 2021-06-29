library(tidyverse)
library(data.table)
library(keras)
library(plotly)
library(htmlwidgets)


# 配置文件
config <- jsonlite::fromJSON("./07-config.json")
alpha <- config$alpha
scale <- config$scale
m <- config$m


# 引入函数脚本
source("./07-render-data.R")
source("./07-plotly-3d.R")
data1 <- render_data_linear(scale)


# 构建模型
model <- keras_model_sequential()

# 模型结构设定
model %>%
  layer_dense(units = 1, activation = "sigmoid", input_shape = 2)
# 二元输入，列表形式需要被展平为一维向量

# 设置模型
model %>% compile(
  optimizer = optimizer_sgd(lr = alpha), # 优化器
  loss = "mean_squared_error", # 损失函数
  metrics = c("accuracy")
)

# 训练模型
model %>% fit(
  # 此处的输入需要展平为一维向量
  # data1$X, data1$Y,
  epochs = m,
  batch_size = 10,
  verbose = 2 # Console 中显示的细节
)