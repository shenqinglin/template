export const isTel = /^\d{3,4}-?\d{7,9}$/
export const isMobile = /(^(13|14|15|16|17|18|19)\d{9}$)|(^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$)/
export const isTrueName = /(^[a-zA-Z]{2,50}(\·[a-zA-Z]{1,})*$)|(^[\u2E80-\uFEFF]{1,}(\·[\u2E80-\uFEFF]{1,})*$)/
export const trim = val => {
  return val.replace(/^\s*|(\s*)$/, '')
}

// 去对象里每个值的空格 或者 对string去空格
export const clearBlank = (val) => {
  const reg = /\s+/gi
  const type = Object.prototype.toString.call(val)
  if (type === '[object String]') {
    return val.replace(reg, '')
  } else {
    const obj = {}
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (key !== '__ob__') {
        obj[key] = val[key].replace(reg, '')
      }
    })
    return obj
  }
}
