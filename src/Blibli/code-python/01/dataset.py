import numpy as np


# 该函数产生一组二维点
# @param {counts} 生成点的数量
def get_dots(counts):
    xs = np.random.rand(counts)
    xs = np.sort(xs)
    ys = [1.2 * x + np.random.rand() / 10 for x in xs]
    return xs, ys  # 返回x序列（已排序）和y序列
