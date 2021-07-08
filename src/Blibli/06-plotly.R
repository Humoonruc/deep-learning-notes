plot_2d <- function(data) {
  plot_ly(
    data = data
  ) %>%
    add_markers(
      x = ~X,
      y = ~Y,
      mode = "markers",
      marker = list(size = 3, color = "blue3"),
      alpha = 0.8
    ) %>%
    add_lines(
      x = ~X,
      y = ~pre,
      mode = "lines",
      line = list(width = 1, color = "red")
    ) %>%
    layout(
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
    )
}
