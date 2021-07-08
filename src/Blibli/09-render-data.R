
getSpiral <- function(scale, theta0, label) {
  r <- 5 * seq_len(scale) / scale + 0.5
  theta <- 2 * pi * 1.75 * seq_len(scale) / scale + theta0

  data.table(
    X1 = r * cos(theta) + runif(scale) / 5 - 0.1,
    X2 = r * sin(theta) + runif(scale) / 5 - 0.1,
    Y = rep(label, scale)
  )
}

getDoubleSpiral <- function(scale) {
  positiveData <- getSpiral(scale / 2, 0, 1)
  negativeData <- getSpiral(scale / 2, pi, 0)
  bind_rows(positiveData, negativeData)
}
