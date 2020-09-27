// 是否为 dom 元素
export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

// 是否为函数类型
export const isFunction = func => typeof func === 'function'

// 已定义
export const isDef = value => value !== undefined && value !== null

// 为定义
export const isUnDef = value => value === void 0

// 为对象
export const isObject = value =>
  Object.prototype.toString.call(value) === '[object Object]'

// 为字符串
export const isString = value =>
  Object.prototype.toString.call(value) === '[object String]'
