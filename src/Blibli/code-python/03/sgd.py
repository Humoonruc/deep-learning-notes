import dataset
import matplotlib.pyplot as plt
import numpy as np

n_dots = 100
xs, ys = dataset.get_dots(n_dots)

plt.title('cost Function', fontsize=12)
plt.xlabel('w')
plt.ylabel('e')

w = 0.1
alpha = 0.1

for m in range(10):
    for i in range(100):
        x = xs[i]
        y = ys[i]
        k = 2 * (x**2) * w + (-2 * x * y)
        w = w - alpha * k
        plt.clf()  # 清空窗口
        plt.scatter(xs, ys)
        y_pre = w * xs
        plt.xlim(0, 1)
        plt.ylim(0, 1.2)
        plt.plot(xs, y_pre)
        plt.pause(0.001)

# plt.scatter(xs, ys)
# y_pre = w * xs
# plt.plot(xs, y_pre)
# plt.show()