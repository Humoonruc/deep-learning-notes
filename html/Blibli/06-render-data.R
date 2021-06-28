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
