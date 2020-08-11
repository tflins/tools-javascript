// 返回字符串的字节长度
export const byteSize = str => new Blob([str]).size

// 删除字符串中的 HTMl 标签
export const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')

// 截取字符串，末尾加上省略号
export const strEllipsis = (str, len = 100) =>
  str.length >= len ? `${str.slice(0, len)}'......` : str

// 获取 [min, max] 间的随机整数
export const getRandomInt = (min, max) => ~~(Math.random() * (max - min + 1) + min)

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

// 空函数
export const noop = () => {}

// 绑定事件
export const on = (function () {
  if (window && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

// 解绑事件
export const off = (function () {
  if (window && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

// 只触发一次
export const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

// dom 是否有 class
export function hasClass(el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

// 给 dom 添加 class
export function addClass(el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

// dom 删除 class
export function removeClass(el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
