// 返回字符串的字节长度
export const byteSize = str => new Blob([str]).size

// 删除字符串中的 HTMl 标签
export const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')

// 截取字符串，末尾加上省略号
export const strEllipsis = (str, len = 100) =>
  str.length >= len ? `${str.slice(0, len)}'......` : str

// 是否为函数类型
export const isFunction = func => typeof func === 'function'

// 首字母大写
export const capitalizeFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1)

// 对符合'xx/xx.vue'组件格式的组件取组件名
export const validateFileName = str =>
  /^\S+\.vue$/.test(str) &&
  str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))

/**
 * 导入全部模块
 *
 * @param {*} context require.contxt 返回值
 * @param {*} filterFunc 过滤函数
 * @param {*} keyTransformFunc 格式化函数
 */
export const importAll = (
  context,
  { filterFunc, keyTransformFunc, isDefault }
) => {
  let keys = context.keys()
  if (isFunction(filterFunc)) keys = keys.filter(filterFunc)
  return keys.reduce((acc, curr) => {
    const key = isFunction(keyTransformFunc) ? keyTransformFunc(curr) : curr
    acc[key] = isDefault ? context(curr).default : context(curr)
    return acc
  }, {})
}

// 补充位数
export const padStartNum = (str, num = 2, val = 0) =>
  String(str).padStart(num, val)
