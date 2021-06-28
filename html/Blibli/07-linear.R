#########################################
# 07-linear.R
# 手写梯度下降算法拟合线性分割数据
#########################################

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
source("./07-plotly-3d.R")
source("./07-render-data.R")
data <- render_data_linear(scale)


# 参数初始化
W <- runif(2) %>% matrix(nrow = 1)
B <- 0.3


## 前向传播 =============================================
forward <- function(X) {
  Z <- W %*% X + B
  A <- sigmoid(Z)
  return(A)
}


# 初始状态绘图
mesh_3d(data, forward) %>%
  saveWidget("./figure/linear-initial.html", FALSE, "lib", title = "initial")

count <- 0

for (j in 1:m) {
  str_glue("m = {j}, ") %>% cat()
  # SGD 梯度下降，随机取样
  for (i in sample(scale)) {

    # 用前向传播计算状态
    X <- data$X[[i]]
    Y <- data$Y[[i]]
    A <- forward(X)
    E <- (Y - A)^2


    # 梯度下降
    dEdA <- -2 * (Y - A)
    dAdZ <- A * (1 - A) # 这里就是两个向量的点乘
    dZdW <- t(X)
    dZdB <- 1

    dEdW <- (dEdA * dAdZ) %*% dZdW
    dEdB <- dEdA * dAdZ * dZdB

    W <- W - alpha * dEdW
    B <- B - alpha * dEdB

    count <- count + 1
  }

  w1 <- round(W[1, 1], 2)
  w2 <- round(W[1, 2], 2)
  str_glue("W = ({w1}, {w2}), B = {round(B, 2)}") %>%
    print()
}


mesh_3d(data, forward) %>%
  saveWidget("./figure/linear-final.html", FALSE, "lib", title = "final")