#########################################
# hidden-layer.R
#########################################


# 引入库和模块==================================================

pacman::p_load(
  tidyverse,
  lubridate,
  data.table,
  magrittr,
  plotly,
  htmlwidgets
)

config <- jsonlite::fromJSON("config.json")
alpha <- config$alpha

source("./render-data.R") # 引入 data
xs <- data$x
ys <- data$y


# 模型设定======================================================

# 整个模型的输入只有一个变量 X
# 第一层模型有两个神经元，都接受 X 作为输入
# 第二层模型有一个神经元，接受第一层两个神经元的输入
# 第二层的神经元的输出为模型输出


# 参数初始化====================================================

# 数字的表示规则：
# 1. 第一个数字表示信号来源层的神经元 index
# 2. 第二个数字表示本层神经元的 index
# 3. 下划线后面数字表示层数
# 4. 偏置项个数与本层神经元一致，因此下划线之前只有一个数，即本层神经元的 index

## 第一层
# 第一个神经元
w11_1 <- runif(1)
b1_1 <- runif(1)

# 第二个神经元
w12_1 <- runif(1)
b2_1 <- runif(1)

## 第二层（只有一个神经元）
w11_2 <- runif(1)
w21_2 <- runif(1)
b1_2 <- runif(1)


# 前向传播======================================================

sigmoid <- function(x) 1 / (1 + exp(-x))

forward <- function(xs) {
  z1_1 <- w11_1 * xs + b1_1
  a1_1 <- sigmoid(z1_1)
  z2_1 <- w12_1 * xs + b2_1
  a2_1 <- sigmoid(z2_1)
  z1_2 <- w11_2 * a1_1 + w21_2 * a2_1 + b1_2
  a1_2 <- sigmoid(z1_2)
  list(
    z1_1 = z1_1,
    a1_1 = a1_1,
    z2_1 = z2_1,
    a2_1 = a2_1,
    z1_2 = z1_2,
    a1_2 = a1_2
  ) %>% return()
}



# 初始状态======================================================

status <- forward(xs)
param_learn <- data.table(x = xs, y = status$a1_2, count = rep(0, config$scale))


# 反向传播======================================================
count <- 0

for (j in 1:config$m) {

  # SGD 梯度下降，随机取样
  for (i in sample(config$scale)) {
    count <- count + 1

    x <- xs[i]
    y <- ys[i]

    # 用前向传播计算各状态
    status <- forward(x)

    # 反向传播的损失函数
    e <- (y - status$a1_2)^2

    # 计算梯度
    deda1_2 <- -2 * (y - status$a1_2)

    da1_2dz1_2 <- status$a1_2 * (1 - status$a1_2)

    dz1_2dw11_2 <- status$a1_1
    dz1_2dw21_2 <- status$a2_1
    dz1_2db1_2 <- 1

    dedw11_2 <- deda1_2 * da1_2dz1_2 * dz1_2dw11_2
    dedw21_2 <- deda1_2 * da1_2dz1_2 * dz1_2dw21_2
    dedb1_2 <- deda1_2 * da1_2dz1_2 * dz1_2db1_2

    dz1_2da1_1 <- w11_2
    da1_1dz1_1 <- status$a1_1 * (1 - status$a1_1)
    dz1_1dw11_1 <- x
    dz1_1db1_1 <- 1

    dedw11_1 <- deda1_2 * da1_2dz1_2 * dz1_2da1_1 * da1_1dz1_1 * dz1_1dw11_1
    dedb1_1 <- deda1_2 * da1_2dz1_2 * dz1_2da1_1 * da1_1dz1_1 * dz1_1db1_1

    dz1_2da2_1 <- w21_2
    da2_1dz2_1 <- status$a2_1 * (1 - status$a2_1)
    dz2_1dw12_1 <- x
    dz2_1db2_1 <- 1

    dedw12_1 <- deda1_2 * da1_2dz1_2 * dz1_2da2_1 * da2_1dz2_1 * dz2_1dw12_1
    dedb2_1 <- deda1_2 * da1_2dz1_2 * dz1_2da2_1 * da2_1dz2_1 * dz2_1db2_1

    # 梯度下降
    w11_1 <- w11_1 - alpha * dedw11_1
    b1_1 <- b1_1 - alpha * dedb1_1
    w12_1 <- w12_1 - alpha * dedw12_1
    b2_1 <- b2_1 - alpha * dedb2_1
    w11_2 <- w11_2 - alpha * dedw11_2
    w21_2 <- w21_2 - alpha * dedw21_2
    b1_2 <- b1_2 - alpha * dedb1_2
  }

  # 每10轮运算完成后，更新一次快照
  if (count %% 20000 == 0) {
    status <- forward(xs)
    param_learn <- param_learn %>%
      rbind(data.table(x = xs, y = status$a1_2, count = count))
  }
  print(str_c("Learning... Now count = ", count))
}



# 绘制动画========================================================

plot_ly(
  x = xs,
  y = ys,
  name = "train_set",
  type = "scatter",
  mode = "markers",
  marker = list(color = "royalblue", opacity = 0.5, size = 5),
  line = list(width = 0)
) %>%
  add_trace(
    data = param_learn,
    x = ~x,
    y = ~y,
    frame = ~count,
    name = "fitted",
    type = "scatter",
    mode = "lines",
    line = list(color = "red", width = 2),
    marker = list(color = "red", size = 0.1)
  ) %>%
  layout(legend = list(
    x = 0.5, y = 1.1, bgcolor = "#ebebeb", xanchor = "center"
  )) %>%
  saveWidget("./figure/hidden-layer.html", selfcontained = F, libdir = "lib")