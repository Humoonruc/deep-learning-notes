# 生成线性分割数据
render_data_linear <- function(scale) {
  X1 <- rnorm(scale)
  X2 <- rnorm(scale)
  Y <- ifelse(X2 - 0.5 * X1 - 0.1 > 0, 1, 0)

  X <- map2(X1, X2, function(a, b) {
    c(a, b)
  })

  data.table(X = X, Y = Y)
}


# 生成圆形分割数据
render_data_circle <- function(scale) {
  X1 <- rnorm(scale)
  X2 <- rnorm(scale)
  Y <- ifelse((X1 - 1)^2 + (X2 - 0.3)^2 < 0.5, 1, 0)

  X <- map2(X1, X2, function(a, b) {
    c(a, b)
  })

  data.table(X = X, Y = Y)
}