#########################################
# render-data.R

pacman::p_load(
  tidyverse,
  magrittr
)


# 用 json 储存初始配置，用 jsonlite::fromJSON() 读取
config <- jsonlite::fromJSON("config.json")


# 产生数据的函数
render_points <- function(scale) {
  xs <- 2 * runif(scale) %>% sort()
  ys <- rep(0, scale) # 默认为 0
  condition_vector <- 0.7 * xs - 0.02 * runif(scale) + 0.51
  ys[which(condition_vector > 0.8 & condition_vector < 1.4)] <- 1
  # 注意是 & 而非 &&，&& 对于数组运算另有含义
  return(data.frame(x = xs, y = ys))
}


data <- render_points(config$scale)
