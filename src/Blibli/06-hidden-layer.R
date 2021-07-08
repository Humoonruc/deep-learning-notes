#########################################
# hidden-layer.R
# 手写隐藏层
#########################################


## 引入库、模块和配置文件=============================================
# 库
library(tidyverse)
library(data.table)
library(magrittr)
library(plotly)
library(htmlwidgets)


# 配置文件
config <- jsonlite::fromJSON("./06-config.json")
alpha <- config$alpha
scale <- config$scale
m <- config$m


# 模块
source("./src/plotly_style.R")
source("./src/calculate.R")
source("./06-render-data.R")
data <- render_data_2(scale)
xs <- data$X
ys <- data$Y


## 模型设定======================================================

# 整个模型的输入只有一个变量 X
# 隐藏层有两个神经元，都接受 X 作为输入
# 输出层隐藏层两个神经元的输入


## 参数初始化====================================================

# 数字的表示规则：
# 1. 第一个数字表示信号来源层的神经元 index
# 2. 第二个数字表示本层神经元的 index
# 3. 下划线后面数字表示层数
# 4. 偏置项个数与本层神经元一致，因此下划线之前只有一个数，即本层神经元的 index


# 从输入层到隐藏层的权重矩阵 W1, dim(W1) = c(2, 1)
# W1 第一行为 w11_1
# W1 第二行为 w12_1
W1 <- runif(2)
# B1 为列向量 b1_1, b2_1
B1 <- runif(2)

# 从隐藏层到输出层的权重矩阵 W2, dim(W2) = c(1, 2)
# W2 第一行为 w11_2, w21_2
W2 <- runif(2) %>% t()
# B2 为标量 b1_2
B2 <- runif(1)


## 前向传播======================================================

forward <- function(x) {
  X <- matrix(x, nrow = 1)
  Z1 <- W1 %*% X + B1
  A1 <- sigmoid(Z1)
  Z2 <- as.vector(W2 %*% A1) + B2
  A2 <- sigmoid(Z2)

  list(
    Z1 = Z1,
    A1 = A1,
    Z2 = Z2,
    A2 = A2
  )
}

get_y_pre <- function(xs) {
  xs %>% map_dbl(~ forward(.)$A2)
}


## 初始状态======================================================
ys_pre <- data.table(x = xs, y = get_y_pre(xs), epoch = 0)


## 反向传播======================================================
count <- 0

for (j in 1:m) {

  # SGD 梯度下降，随机取样
  for (i in sample(scale)) {
    X <- xs[i]
    Y <- ys[i]

    # 用前向传播计算各状态
    status <- forward(X)
    A1 <- status$A1
    A2 <- status$A2

    # 反向传播的损失函数
    E <- (Y - A2)^2

    # 计算梯度
    dEdA2 <- -2 * (Y - A2)
    dA2dZ2 <- A2 * (1 - A2)
    dZ2dW2 <- t(A1)
    dZ2dB2 <- 1

    dEdW2 <- dEdA2 * dA2dZ2 * dZ2dW2
    dEdB2 <- dEdA2 * dA2dZ2 * dZ2dB2


    dZ2dA1 <- t(W2)
    dA1dZ1 <- A1 * (1 - A1)
    dZ1dW1 <- t(X)
    dZ1dB1 <- 1

    dEdW1 <- (dEdA2 * dA2dZ2 * dZ2dA1 * dA1dZ1) %*% dZ1dW1
    dEdB1 <- (dEdA2 * dA2dZ2 * dZ2dA1 * dA1dZ1) %*% dZ1dB1

    # 梯度下降
    W1 <- W1 - alpha * dEdW1
    B1 <- B1 - alpha * dEdB1
    W2 <- W2 - alpha * dEdW2
    B2 <- B2 - alpha * dEdB2


    count <- count + 1
  }

  print(str_glue("m = {j}, count = {count}"))

  # 每迭代10轮，记录一次快照
  if (j %% 10 == 0) {
    ys_pre <- bind_rows(
      ys_pre,
      data.table(x = xs, y = get_y_pre(xs), epoch = j)
    )
  }
}



## 绘制动画========================================================

plot_ly(
  type = "scatter",
  x = xs,
  y = ys,
  name = "train_set",
  mode = "markers",
  marker = list(color = "royalblue", opacity = 0.5, size = 5),
  line = list(width = 0)
) %>%
  add_trace(
    data = ys_pre,
    x = ~x,
    y = ~y,
    frame = ~epoch,
    name = "fitted",
    mode = "lines",
    line = list(color = "red", width = 2),
    marker = list(color = "red", size = 0.1)
  ) %>%
  plotly_style() %>%
  saveWidget("./figure/manual-hidden-layer.html", FALSE, "lib")