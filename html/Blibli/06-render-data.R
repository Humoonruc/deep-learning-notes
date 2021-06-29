#########################################
# 06-render-data.R
#########################################

# 产生数据的函数
render_points <- function(scale) {
  xs <- 2 * runif(scale) %>% sort()
  condition <- 0.7 * xs - 0.02 * runif(scale) + 0.51
  ys <- ifelse(condition > 0.8 & condition < 1.4, 1, 0) # ifelse()可以向量化操作
  data.table(x = xs, y = ys)
}



render_data_1 <- function(scale) {
  X <- runif(scale) %>% sort()
  condition <- 0.7 * X + 0.51 - runif(scale) / 50
  Y <- ifelse(condition > 0.8, 1, 0)
  data.table(X = X, Y = Y)
}

# 产生数据的函数
render_data_2 <- function(scale) {
  X <- 2 * runif(scale) %>% sort()
  condition <- 0.7 * X - 0.02 * runif(scale) + 0.51
  Y <- ifelse(condition > 0.8 & condition < 1.4, 1, 0)
  data.table(X = X, Y = Y)
}