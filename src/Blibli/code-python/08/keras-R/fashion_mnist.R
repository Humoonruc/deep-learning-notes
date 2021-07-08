library(tidyverse)
library(keras)
fashion_mnist <- dataset_fashion_mnist()

# %<-% 将列表各项分别赋值
c(train_images, train_labels) %<-% fashion_mnist$train
c(test_images, test_labels) %<-% fashion_mnist$test

class_names <- c(
  "T-shirt/top",
  "Trouser",
  "Pullover",
  "Dress",
  "Coat",
  "Sandal",
  "Shirt",
  "Sneaker",
  "Bag",
  "Ankle boot"
)


image_1 <- as.data.frame(train_images[1, , ])
colnames(image_1) <- seq_len(ncol(image_1))
image_1$y <- seq_len(nrow(image_1))
image_1 <- gather(image_1, "x", "value", -y)
image_1$x <- as.integer(image_1$x)

ggplot(image_1, aes(x = x, y = y, fill = value)) +
  geom_tile() +
  scale_fill_gradient(low = "white", high = "black", na.value = NA) +
  scale_y_reverse() +
  theme_minimal() +
  theme(panel.grid = element_blank()) +
  theme(aspect.ratio = 1) +
  xlab("") +
  ylab("")


train_images <- train_images / 255
test_images <- test_images / 255


par(mfcol = c(5, 5))
par(mar = c(0, 0, 1.5, 0), xaxs = "i", yaxs = "i")
for (i in 1:25) {
  img <- train_images[i, , ]
  img <- t(apply(img, 2, rev))
  image(1:28, 1:28, img,
    col = gray((0:255) / 255), xaxt = "n", yaxt = "n",
    main = paste(class_names[train_labels[i] + 1])
  )
}




## 构建模型
model <- keras_model_sequential()

## 模型结构设定
model %>%
  # layer_flatten() 将2d矩阵转换为1d向量
  # 这一层没有参数，只是对数据维度进行重组
  layer_flatten(input_shape = c(28, 28)) %>%
  # 第一层神经网络，有128个神经元
  layer_dense(units = 128, activation = "relu") %>%
  # 第二层神经网络，10-node softmax layer
  # 针对10个类别输出10个概率值，相加等于1
  layer_dense(units = 10, activation = "softmax")


## 设置模型
model %>% compile(
  optimizer = "adam", # 优化器
  loss = "sparse_categorical_crossentropy", # 损失函数
  metrics = c("accuracy")
)

## 训练模型
model %>% fit(
  train_images, train_labels,
  epochs = 5, # 训练5轮
  verbose = 2
)

## 评估模型
score <- model %>% evaluate(test_images, test_labels, verbose = 0)
cat("Test loss:", score["loss"], "\n")
cat("Test accuracy:", score["accuracy"], "\n")

## 应用模型来预测
predictions <- model %>% predict(test_images)
predictions[1, ]
which.max(predictions[1, ])

class_pred <- model %>% predict_classes(test_images)
class_pred[1:20]
test_labels[1]



par(mfcol = c(5, 5))
par(mar = c(0, 0, 1.5, 0), xaxs = "i", yaxs = "i")
for (i in 1:25) {
  img <- test_images[i, , ]
  img <- t(apply(img, 2, rev))
  # subtract 1 as labels go from 0 to 9
  predicted_label <- which.max(predictions[i, ]) - 1
  true_label <- test_labels[i]
  if (predicted_label == true_label) {
    color <- "#008800"
  } else {
    color <- "#bb0000"
  }
  image(1:28, 1:28, img,
    col = gray((0:255) / 255), xaxt = "n", yaxt = "n",
    main = paste0(
      class_names[predicted_label + 1], " (",
      class_names[true_label + 1], ")"
    ),
    col.main = color
  )
}
