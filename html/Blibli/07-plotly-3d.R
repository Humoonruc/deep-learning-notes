

# 绘制3D散点图
scatter_3d <- function(data) {
  plot_ly(
    data = data,
    type = "scatter3d",
    mode = "markers",
    x = data$X %>% map_dbl(extract(1)),
    y = data$X %>% map_dbl(extract(2)),
    z = ~Y,
    marker = list(size = 3, color = "blue3"),
    alpha = 0.8
  )
}

# scatter_3d(data)

# 3D 散点图叠加 mesh 曲面
mesh_3d <- function(data, f) {
  X1 <- data$X %>% map_dbl(extract(1))
  X2 <- data$X %>% map_dbl(extract(2))

  X1_domain <- seq(min(X1), max(X1), length.out = 100)
  X2_domain <- seq(min(X2), max(X2), length.out = 100)

  # 绘制 mesh 曲面需要长数据
  X1_long <- rep(X1_domain, each = 100)
  X2_long <- rep(X2_domain, 100)
  Z_long <- map2(X1_long, X2_long, function(a, b) {
    c(a, b)
  }) %>% map_dbl(f)

  # 叠加
  scatter_3d(data) %>%
    add_mesh(
      x = ~X1_long,
      y = ~X2_long,
      z = ~Z_long,
      opacity = 0.5,
      color = "firebrick"
    )
}