############################
## plotly_style.R
############################


# 自定义 plotly 样式
plotly_style <- function(p) {
  p %>%
    layout(
      # 用 html 语法给出 title，如 "<b>双层神经网络</b>",
      legend = list(
        y = 0.5
      ),
      # ggplot2 的背景风格
      plot_bgcolor = "#ebebeb",
      xaxis = list(
        zeroline = FALSE,
        ticks = "outside",
        gridcolor = "white",
        gridwidth = 1.5
      ),
      yaxis = list(
        zeroline = FALSE,
        ticks = "outside",
        gridcolor = "white",
        gridwidth = 1.5
      )
    ) %>%
    animation_opts(
      frame = 500, # 两帧的时间间隔
      transition = 500, # 过渡时间，(frame-transition)为停顿时间
      redraw = FALSE, # 设为 F 可以提高性能
      # 若有其他指令（如演示时用户的交互行为），立即停止播放响应要求
      mode = "immediate"
    ) %>%
    animation_button(
      visible = TRUE,
      # 触发器是下拉菜单式'dropdown'还是按钮式'buttons''
      type = "buttons",
      # 若为下拉菜单式，菜单出现在触发器的哪个方向 up/down/left/right
      ## direction = "up",
      x = 1.05, xanchor = "left",
      y = 0, yanchor = "top",
      label = "Run"
    ) %>%
    animation_slider(
      hide = FALSE, # 是否隐藏动画进度条
      currentvalue = list(
        ## prefix = "YEAR: ",
        font = list(color = "red")
      )
    )
}