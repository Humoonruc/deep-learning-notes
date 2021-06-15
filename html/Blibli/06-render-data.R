#########################################
# render-data.R
#########################################

library(tidyverse)
library(magrittr)

# 用 json 储存初始配置，用 jsonlite::fromJSON() 读取
config <- jsonlite::fromJSON("./06-config.json")


# 产生数据的函数
render_points <- function(scale) {
  xs <- 2 * runif(scale) %>% sort()
  condition <- 0.7 * xs - 0.02 * runif(scale) + 0.51

  # ifelse()可以向量化操作
  ys <- ifelse(condition > 0.8 & condition < 1.4, 1, 0)

  ## 另一种写法：
  # ys <- rep(0, scale) # 默认为 0
  # ys[which(condition > 0.8 & condition < 1.4)] <- 1

  return(data.frame(x = xs, y = ys))
}


data <- render_points(config$scale)