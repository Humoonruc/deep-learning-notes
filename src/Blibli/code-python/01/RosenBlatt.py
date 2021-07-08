# Rosen Blatt 感知器模型

import dataset
from matplotlib import pyplot as plt

# render data
n_dots = 100
xs, ys = dataset.get_dots(n_dots)

# render chart
plt.title('Input-Output Function', fontsize=12)
plt.xlabel('Input')
plt.ylabel('Output')
plt.scatter(xs, ys)

# Rosen Blatt Adjust
alpha = 0.05
w = 0.5  # 定义斜率的初始值

for m in range(10):  # 调整10轮，模拟大样本时每次只能计算部分样本数据的情况
    for i in range(n_dots):
        x = xs[i]
        y = ys[i]
        y_pre = w * x
        e = y - y_pre
        w = w + e * x * alpha

y_pre = w * xs
plt.plot(xs, y_pre)

plt.show()