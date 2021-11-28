/**
 * 返回去除字符串首尾指定字符的字符串
 *
 * @param {string} str 原字符串。
 * @param {string} char 要去除的字符。
 * @param {string} type 默认去除首尾，left 去除左侧，right 去除右侧，all 去除所有
 * @return {string} 去除后的字符串
 */
export const trim = (str, char, type = 'about') => {
  const arr = {
    about: new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'),
    left: new RegExp('^\\' + char + '+', 'g'),
    right: new RegExp('\\' + char + '+$', 'g'),
    all: new RegExp('\\' + char, 'g')
  }
  if (arr[type]) {
    return str.replace(arr[type], '')
  }
  return this.replace(/^\s+|\s+$/g, '')
}

/**
 * 返回数组中指定值出现次数
 *
 * @param {array} arr 数组。
 * @param {string} val 值。
 * @return {number} 出现次数
 */
export const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

/**
 * 寻找两个数组中的差异
 *
 * @param {array} a 数组。
 * @param {array} b 数组。
 * @return {array} 返回两个数组中独有的值
 */
export const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}

/**
 * 返回指定范围的随机整数
 *
 * @param {number} min 最大值。
 * @param {number} max 最小值。
 * @return {number} 返回指定范围的随机整数
 */
export const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * 返回值或变量的类型名
 *
 * @param {all} v 值。
 */
export const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()

/**
 * 在指定元素之后插入新元素
 *
 * @param {} el 指定元素。
 * @param {} el 要插入的元素。
 */
export const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString)

/**
 * 在指定元素之前插入新元素
 *
 * @param {} el 指定元素。
 * @param {} el 要插入的元素。
 */
export const insertBefore = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString)
