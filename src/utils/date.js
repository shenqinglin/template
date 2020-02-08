//
export const getYear = date => date.slice(0, 4)
//
export const getMonth = date => date.slice(5, 7)
//
export const getDay = date => date.slice(8, 10)

// 根据年月日获取月日  参数 2019-10-10 => 输出 10月10日
export const getDates = (date) => {
  return parseInt(date.slice(5, 7)) + '月' + date.slice(8, 10) + '日'
}

// 根据号源list 构建日历结构
export const createMonthList = (calendars) => {
  // 获取号源日期 第一天日期
  const firstDay = calendars[0].dutyDate
  // 获取号源日期 最后一天日期
  const lastDay = calendars[calendars.length - 1].dutyDate
  // 计算号源第一天到月初的天数
  const toMonthStart = new Date(firstDay).getDate()
  // 计算月末的日期
  const getMonthEnd = getCurrentMonthLast(lastDay)
  const concatStart = []
  for (let i = 1; i < toMonthStart; i++) {
    const obj = {
      dutyDate: firstDay.slice(0, 7) + '-' + (i < 10 ? '0' + i : i)
    }
    concatStart.push(obj)
  }
  const lastDayStart = new Date(lastDay).getDate()
  const lastDayEnd = new Date(getMonthEnd).getDate()
  const concatEnd = []
  for (let j = lastDayStart + 1; j <= lastDayEnd; j++) {
    const obj = {
      dutyDate: lastDay.slice(0, 7) + '-' + (j < 10 ? '0' + j : j)
    }
    concatEnd.push(obj)
  }
  // 给原始数据标记index
  for (let k = 0; k < calendars.length; k++) {
    calendars[k].index = k
    if (calendars[k].countdown) {
      calendars[k].dutyStatus = 100
    }
  }
  const result = concatStart.concat(calendars).concat(concatEnd)
  const sorted = groupByDate(result, '')
  return sorted
}
export const getCurrentMonthLast = (time) => {
  const date = new Date(time)
  let currentMonth = date.getMonth()
  const nextMonth = ++currentMonth
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  const oneDay = 1000 * 60 * 60 * 24
  const lastTime = new Date(nextMonthFirstDay - oneDay)
  let month = parseInt(lastTime.getMonth() + 1)
  let day = lastTime.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}
export const groupByDate = (arr) => {
  const map = {}
  const dest = []
  for (let i = 0; i < arr.length; i++) {
    const ai = arr[i]
    if (!map[ai.dutyDate.slice(0, 7)]) {
      dest.push({
        month: ai.dutyDate.slice(5, 7),
        dayViews: [ai]
      })
      map[ai.dutyDate.slice(0, 7)] = ai
    } else {
      for (let j = 0; j < dest.length; j++) {
        const dj = dest[j]
        if (dj.month === ai.dutyDate.slice(5, 7)) {
          dj.dayViews.push(ai)
          break
        }
      }
    }
  }
  return dest
}
// 根据日期，计算是周几。例：2019-12-15 ===> 0代表周日
export const computeFirstDay = (day) => {
  let week = ''
  const date = new Date(day)
  week = date.getDay() === 0 ? 7 : date.getDay()
  return week
}

// 根据对象中的某个元素排序
export const sortCompare = (property) => {
  return function (a, b) {
    const value1 = a[property]
    const value2 = b[property]
    return value1 - value2
  }
}
// 数字转中文，100以内
export const numberToCn = (num) => {
  let result = ''
  const CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = '十'
  if (num < 10) {
    result = CN[num]
  } else if (num === 10) {
    result = unit
  } else if (num % 10 === 0) {
    result = CN[parseInt(num.toString().slice(0, 1))] + unit
  } else if (num < 20) {
    result = unit + CN[parseInt(num.toString().slice(1, 2))]
  } else {
    result = CN[parseInt(num.toString().slice(0, 1))] + unit + CN[parseInt(num.toString().slice(1, 2))]
  }
  return result
}
const addZero = (num, len = 2) => (`0${num}`).slice(-len)
export const formatDate = (time) => {
  const date = new Date(time)
  return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
}
export const dateToCN = (date) => {
  return date.slice(0, 4) + '年' + date.slice(5, 7) + '月' + date.slice(8, 10) + '日'
}
// 入参：日期 2019-11-11 输出周几中文
export const dateToDayCN = (date) => {
  return ToDayCN[new Date(date).getDay()]
}
const ToDayCN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
