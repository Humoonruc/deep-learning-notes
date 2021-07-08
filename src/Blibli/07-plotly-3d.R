

# 绘制3D散点图
scatter_3d <- function(data) {
  plot_ly(
    data = data,
    type = "scatter3d",
    mode = "markers",
    x = ~X1,
    y = ~X2,
    z = ~Y,
    color = ~ (-Y),
    marker = list(size = 2.5)
  )
}


# 3D 散点图叠加 surface 曲面
surface_3d <- function(data, f) {
  X1 <- data$X1
  X2 <- data$X2

  X1_domain <- seq(min(X1), max(X1), length.out = 100)
  X2_domain <- seq(min(X2), max(X2), length.out = 100)

  z <- diag(100)
  for (i in 1:100) {
    for (j in 1:100) {
      z[i, j] <- c(X1_domain[i], X2_domain[j]) %>% f()
    }
  }

  # 叠加
  scatter_3d(data) %>%
    add_surface(
      x = X1_domain,
      y = X2_domain,
      z = t(z)
    )
}


# 3D 散点图叠加 mesh 曲面
mesh_3d <- function(data, f) {
  X1 <- data$X1
  X2 <- data$X2

  X1_domain <- seq(min(X1), max(X1), length.out = 100)
  X2_domain <- seq(min(X2), max(X2), length.out = 100)

  # 绘制 mesh 曲面需要长数据
  X1_long <- rep(X1_domain, each = 25)
  X2_long <- rep(X2_domain, 25)
  Z_long <- map2(X1_long, X2_long, function(a, b) {
    c(a, b)
  }) %>% map_dbl(f)

  # 叠加
  scatter_3d(data) %>%
    add_mesh(
      x = X1_long,
      y = X2_long,
      z = Z_long,
      color = "red",
      opacity = 0.5
    )
}