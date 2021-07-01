/**
 * @module sleep
 * @file 自定义睡眠函数
 */

const sleep = async delay => new Promise(resolve => setTimeout(resolve, delay));

export { sleep };



