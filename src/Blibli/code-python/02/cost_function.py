import dataset
import matplotlib.pyplot as plt
import numpy as np

n_dots = 100
xs, ys = dataset.get_dots(n_dots)

ws = np.arange(0, 3, 0.1)
es = []

for w in ws:
    y_pre = w * xs
    e = np.sum((ys - y_pre)**2) / n_dots  # 数组对应元素相减，生成新数组
    es.append(e)
    # print('w:' + str(w) + ' e:' + str(e))

plt.title('cost Function', fontsize=12)
plt.xlabel('w')
plt.ylabel('e')
plt.plot(ws, es)
plt.show()

w_theoretical = np.sum(xs * ys) / np.sum(xs * xs)
print('e最小时的w为:' + str(w_theoretical))