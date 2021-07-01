const tf = require('@tensorflow/tfjs-node');

// 生成二维张量（矩阵）对象，tf.tensor2d()的第一个参数是矩阵按行展开的数组，第二个参数是张量的size
const k1 = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
k1.print();

// 或直接在参数中用嵌套数组定义矩阵
tf.tensor2d([[1, 2, 3], [4, 5, 6]]).print(); // 注意.print()没有返回值，所以不需要赋值

// size 不同的矩阵
const k2 = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
k2.print();

// 本质为向量的矩阵
const k3 = tf.tensor2d([3, 4, 5], [3, 1]);
k3.print();

// 生成一维张量（向量）对象，tf.tensor1d()的第一个参数是代表向量的数组，对于向量的size不会产生歧义，故不需要其他参数
// TensorFlow 中的向量默认为行向量，而非列向量！
const b = tf.tensor1d([3, 4, 5]);
b.print();

// 零维张量（标量）
const year = tf.scalar(2018);
year.print();

// 矩阵乘法
tf.matMul(k1, k2).print();

// 注意，必须矩阵乘矩阵，即使是向量，也要转变为矩阵形式
// tf.matMul(b, k2) 在数学上没问题，但此处会报错
tf.matMul(k1, k3).print();


// 张量对应元素相乘
// 若两个张量的size不同，size较小的要扩展为size较大的，然后对应项相乘
tf.mul(k1, year).print(); // (2*3)矩阵乘(0)标量，标量扩展为与矩阵具有相同size的矩阵
tf.mul(k1, b).print(); // (2*3)矩阵乘(3)向量，（行）向量扩展为与矩阵具有相同size的矩阵，然后对应项进行算数乘法
tf.mul(k2, k3).print(); // (3*2)矩阵乘(3*1)矩阵，后者扩展为与前者具有相同size的矩阵，然后对应项进行算数乘法



/** 运行结果：
Tensor
    [[1, 2, 3],
     [4, 5, 6]]
Tensor
    [[1, 2, 3],
     [4, 5, 6]]
Tensor
    [[1, 2],
     [3, 4],
     [5, 6]]
Tensor
    [[3],
     [4],
     [5]]
Tensor
    [3, 4, 5]
Tensor
    2018
Tensor
    [[26],
     [62]]
Tensor
    [[22, 28],
     [49, 64]]
Tensor
    [[2018, 4036 , 6054 ],
     [8072, 10090, 12108]]
Tensor
    [[3 , 8 , 15],
     [12, 20, 30]]
Tensor
    [[3 , 6 ],
     [12, 16],
     [25, 30]]
 */