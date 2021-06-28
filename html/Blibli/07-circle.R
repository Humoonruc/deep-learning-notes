#########################################
# 07-circle.R
# 手写梯度下降算法拟合圆形分割数据
#########################################


# 引入库
library(tidyverse)
library(data.table)
library(magrittr)
library(plotly)
library(htmlwidgets)


# 引入配置
config <- jsonlite::fromJSON("./07-config.json")
alpha <- config$alpha
m <- config$m
scale <- config$scale


# 引入函数脚本
source("./src/calculate.R")
source("./07-render-data.R")
source("./07-plotly-3d.R")
data <- render_data_circle(scale)


## 模型设定======================================================

# 对于圆形数据，至少要有一个隐藏层，隐藏层至少要有三个神经元，才能取得较好的拟合效果

# 输入为两个变量 X1 和 X2
# 隐藏层有三个神经元，都接受 X1, X2 为输入
# 输出层接受隐藏层三个神经元的输入


## 参数初始化====================================================

# 权重脚标的表示规则：
# 1. 第一个数字表示信号来源层的神经元 index
# 2. 第二个数字表示本层神经元的 index
# 3. 下划线后面数字表示层数
# 4. 偏置项个数与本层神经元一致，因此下划线之前只有一个数，即本层神经元的 index


# 从输入层到隐藏层的权重矩阵 W1, dim(W1) = c(3, 2)
# W1 第一行为 w11_1, w21_1
# W1 第二行为 w12_1, w22_1
# W1 第三行为 w13_1, w23_1
W1 <- runif(6) %>% matrix(nrow = 3)
# B1 为列向量 b1_1, b2_1, b3_1
B1 <- runif(3)

# 从隐藏层到输出层的权重矩阵 W2, dim(W2) = c(1, 3)
# W2 第一行为 w11_2, w21_2, w31_2
W2 <- runif(3) %>% t()
# B2 为标量 b1_2
B2 <- runif(1)


## 前向传播======================================================

forward <- function(X) {
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

get_Y_pre <- function(X) {
  forward(X)$A2
}


# 初始状态绘图
mesh_3d(data, get_Y_pre) %>%
  saveWidget("./figure/circle-initial.html", FALSE, "lib", title = "initial")


## 反向传播======================================================
count <- 0

for (j in 1:m) {
  str_glue("m = {j}, ") %>% cat()

  # SGD 梯度下降，随机取样
  for (i in sample(scale)) {
    X <- data$X[[i]]
    Y <- data$Y[[i]]

    # 用前向传播计算各状态
    status <- forward(X)
    Z1 <- status$Z1
    A1 <- status$A1
    Z2 <- status$Z2
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

  cat(str_c("count = ", count, "\n"))
}



mesh_3d(data, get_Y_pre) %>%
  saveWidget("./figure/circle-final.html", FALSE, "lib", title = "final")