

[TOC]
# 深度学习基本原理

- GitHub: https://github.com/Humoonruc/deep-learning-notes
- Web Pages: https://humoonruc.github.io/deep-learning-notes/

<img src="http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/image-20210607112416754.png" alt="image-20210607112416754" style="zoom:50%;" />



## Introduction

### 学科与概念

![image-20210607122634544](../../../../AppData/Roaming/Typora/typora-user-images/image-20210607122634544.png)

#### 人工智能

在一定程度上，是自动化的另一种说法。

#### 机器学习

- 避免硬编码，从已有的数据中寻找映射的规则（回归分析也是一种机器学习），然后使用这种规则用于推断和预测。
- 当然，模型的类型和基本结构是由人工进行事先约束的，机器学习主要是一个参数优化的过程。
- 在神经网络之外，其他机器学习方法包括逻辑回归(logistic regression)、决策树等。

![image-20210607122908207](http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/image-20210607122908207.png)

#### 神经网络

- 神经元是一个形象的比喻，指由一个或多个参数输入（树突接收的信号 x）产生输出（轴突输出的信号 y）的结构。

<img src="http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/image-20210607175143470.png" alt="image-20210607175143470" style="zoom:50%;" />

- 多个神经元联合工作（多个x 交叉产生多个 y）时，就构成了神经网络。

![image-20210607130331445](http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/image-20210607130331445.png)

- 从张量X到张量Y，转换数据的表示是神经网络的核心问题。

<img src="http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/image-20210607131353623.png" alt="image-20210607131353623" style="zoom: 67%;" />

#### 深度学习

可以构建多层神经网络，通过连续的数学运算层来转换数据的表示。

深度学习指层数很多（前沿模型的层数甚至高达上千层）的神经网络模型。

在深度学习领域，==模型也经常被称为网络==。



### 近十年推动深度学习快速普及的因素

#### 硬件

并行计算的 GPU 集群

#### 大数据

互联网和移动互联网的普及，使拥有标记的数据（{数据:答案}逻辑对）指数级增长。

#### 算法改进

更好的激活函数（如 ReLU，线性整流函数）

更好的权重初始化方案

更好的迭代优化方案

### JavaScript 深度学习的优缺点

#### 优势

- 可以运行在浏览器中，简化部署
- 利用浏览器的 WebGL 接口，调用显卡 GPU 的并行计算功能加速模型训练
- JavaScript 生态中有最强大、最成熟的可视化方案
- V8 引擎的强大性能支持，比 Python 快

#### 缺点

浏览器环境性能有限，复杂任务（如机器翻译）所需的超大规模模型的训练必须使用服务器集群和功能全面的后端语言。

### TensorFlow.js

[TensorFlow.js | TensorFlow中文官网](https://www.tensorflow.org/js/)

[tensorflow/tfjs-examples: Examples built with TensorFlow.js (github.com)](https://github.com/tensorflow/tfjs-examples)



- tensor，张量
- TensorFLow (Python)，Google 开发的深度学习低阶 API
- Keras (Python)，深度学习高阶API，提供了常用的神经网络层类型
- TensorFlow.js
  - Google 深度学习团队开发
  - 同时具有低阶和高阶 API，且与 TensorFlow 和 Keras 保持一致
  - 支持导入和导出 TensorFlow 和 Keras 的深度学习模型



## 模型推断：forward pass

forward pass: 将x输入模型获得y_pre

### 感知机

- 感知机模拟神经元，将输入的权重(w)和偏置（b）设定为参数。
- 使用感知机可以表示与门和或门等逻辑电路。
- 异或门无法通过单层感知机来表示。使用2层感知机可以表示异或门。
- 单层感知机只能表示线性空间，而多层感知机可以表示非线性空间。加深层级一般可以提升模型的性能。
- 多层感知机（在理论上）可以表示计算机。

### 激活函数 activation function

感知机的输出是一个阶跃函数。激活函数用平滑的 sigmoid 函数或 ReLU 函数对阶跃函数进行改造，然后发给下一个神经元。

为了发挥叠加层的优势，激活函数不能用线性函数。

sigmoid 函数：
$$
h(x)=\frac{1}{1+e^{-x}}
$$

ReLU（Rectified Linear Unit, 线性整流）函数：
$$
h(x) = max(0, x)
$$

### 回归问题

对于回归问题，最后一层输出层的激活函数用恒等函数。

### 分类问题

对于分类问题，最后一层输出层的激活函数 softmax 函数。要分多少类，输出层就设定多少个神经元。

人们日常思考问题，习惯定性分类，而非定量解析，所以要寻找尽可能贴合、而又易于处理的分段函数形式

激活函数将输入信号的总和转换为近似的二值输出（它的形状类似阶跃分段函数，但却是可导的）



## 训练模型：post pass

确定最优参数的过程。

### 损失函数 loss function

loss function: 从预测模型的==参数==到模型的衡量标准==统计量==（比如，均方误差）的映射，表示模型性能的恶劣程度。

损失函数一般为多元函数。如图，为损失平面——损失函数的可视化。

![1238724-20180809214058976-398502983](http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/1238724-20180809214058976-398502983.jpg)

### 梯度下降(gradient descent)算法

寻找最佳参数束（使损失函数最小），不一定要用数学思维硬算解析解。

也可以使用==计算思维==：从初始参数束开始，多次迭代，每次求出损失函数的梯度，然后顺着梯度的方向小幅移动参数束。

这个过程称为“训练”或“学习”。

#### 批量梯度下降（Batch Gradient Descent, BGD）

每次迭代用全部样本数据计算 loss function, 迭代结果必然向全局最优点收敛。

- 优点
  - （1）对所有样本进行计算，利用矩阵进行操作，实现了并行。
  - （2）由全数据集确定的方向能够更好地代表样本总体，从而更准确地朝向极值所在的方向。当目标函数为凸函数时，BGD一定能够得到全局最优。

- 缺点
  - （1）当样本数目很大时，每迭代一步都需要对所有样本计算，训练过程会很慢。

BGD 的迭代收敛曲线示意图可以表示如下：

![img](http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/1238724-20180810105804742-740866130.jpg)

#### 随机梯度下降（Stochastic Gradient Descent, SGD）

用全部样本计算 loss function，计算量太大。可行的计算方法常常只能是：==每次迭代时**随机**选取样本中的一个数据计算 loss function==。则向全局最优点收敛的过程将是一个随机震荡的轨迹。

- 优点
  - 运算速度快

- 缺点
  - （1）准确度下降。由于即使在目标函数为强凸函数的情况下，SGD仍旧无法做到线性收敛。
  - （2）可能会收敛到局部最优。
  - （3）不易于并行实现。

SGD 的迭代收敛曲线示意图可以表示如下：

![img](http://humoon-image-hosting-service.oss-cn-beijing.aliyuncs.com/img/typora/JavaScript/1238724-20180810113116872-1679884285.jpg)

#### 小批量梯度下降（Mini-Batch Gradient Descent, MBGD）

MBGD 是对 BGD 和 SGD 的折中。其思想是：每次迭代使用包含部分数据的小样本（称为mini-batch，小批量）封装为一个张量，来计算 loss function。

批尺寸（batch size）通常设为2的n次幂（16, 32, 64, 128, 256），这样可以发挥GPU的并行计算能力。

#### 学习率

每次迭代移动的幅度是梯度乘以学习率 $\alpha$，这个值可取0.03, 0.1等。

这个参数是人工设定的超参数，往往要根据训练的结果进行调整。

学习率太小，训练太慢；学习率太大，参数会在最优点附近疯狂震荡，甚至发散到无穷大。

### 反向传播（back propagation）算法

计算梯度需要求偏导数。

如果参数数量比较大，求偏导的全局计算是非常复杂的。

可以用复合函数的链式求导法则，只要保存下每一层的值，就可以代入链式法则算出某一点的导数。

误差反向传播算法使梯度下降变得可操作，从理论成为实践。



