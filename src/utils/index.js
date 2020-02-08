import AES from 'crypto-js/aes'
import EncUtf8 from 'crypto-js/enc-utf8'
import ModeEcb from 'crypto-js/mode-ecb'
import PadPkcs7 from 'crypto-js/pad-pkcs7'
import marked from 'marked'
import { Local, Session } from '@/utils/storage'
/* eslint-disable camelcase */
function debounceOrThrottle ({
  fn,
  wait = 300,
  immediate = false,
  executeOncePerWait = false
}) {
  if (typeof fn !== 'function') {
    throw new Error('fn is expected to be a function')
  }

  let tId = null
  let context = null
  let args = null
  let lastTriggerTime = null
  let result = null
  let lastExecutedTime = null

  const later = function () {
    const last =
      Date.now() - (executeOncePerWait ? lastExecutedTime : lastTriggerTime)

    if (last < wait && last > 0) {
      setTimeout(later, wait - last)
    } else {
      if (!immediate) {
        executeOncePerWait && (lastExecutedTime = Date.now())
        result = fn.apply(context, args)
        context = args = null
      }

      tId = null
    }
  }

  return function () {
    context = this
    args = arguments
    !executeOncePerWait && (lastTriggerTime = Date.now())
    const callNow = immediate && !tId

    if (!tId) {
      executeOncePerWait && (lastExecutedTime = Date.now())
      tId = setTimeout(later, wait)
    }

    if (callNow) {
      executeOncePerWait && (lastExecutedTime = Date.now())
      result = fn.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 防抖函数
 * @param {*} fn
 * @param {*} wait
 * @param {*} immediate
 */
export const debounce = (fn, wait, immediate) =>
  debounceOrThrottle({
    fn,
    wait,
    immediate
  })

/**
 * 节流函数
 * @param {*} fn
 * @param {*} wait
 * @param {*} immediate
 */
export const throttle = (fn, wait, immediate = true) =>
  debounceOrThrottle({
    fn,
    wait,
    immediate,
    executeOncePerWait: true
  })

/**
 * 解密
 * @param {*} word
 */
export const decrypt = (word) => {
  if (word === null || word === '' || word === 'undefined') {
    return null
  }
  const key = EncUtf8.parse('hyde2019hyde2019')
  const decrypt = AES.decrypt(decodeSafeUrlString(word), key, { mode: ModeEcb, padding: PadPkcs7 })
  return EncUtf8.stringify(decrypt).toString()
}

/**
 * 加密
 * @param {*} word
 */
export const encrypt = (word) => {
  if (word === null || word === '' || word === 'undefined') {
    return null
  }
  const key = EncUtf8.parse('hyde2019hyde2019')
  const encrypted = AES.encrypt(EncUtf8.parse(word), key, { mode: ModeEcb, padding: PadPkcs7 })

  return encodeSafeUrlString(encrypted.toString())
}

export const encodeSafeUrlString = (word) => {
  word = word.replace(/\+/gi, '-')
  word = word.replace(/\//gi, '_')
  return word
}

export const decodeSafeUrlString = (word) => {
  word = word.replace(/-/gi, '+')
  word = word.replace(/_/gi, '/')
  return word
}

/**
 * markdown转html
 * @param {*} md
 */
export const md2html = (md) => {
  return marked(md, {
    'baseUrl': null,
    'breaks': true,
    'gfm': true,
    'headerIds': true,
    'headerPrefix': '',
    'highlight': null,
    'mangle': true,
    'pedantic': false,
    'sanitize': false,
    'sanitizer': null,
    'silent': false,
    'smartLists': true,
    'smartypants': true,
    'xhtml': false
  })
}

/**
 * 判断当前是否在微信环境
 */
export const isWechat = () => {
  const ua = navigator.userAgent.toLowerCase()
  // return ua.match(/MicroMessenger/i) === 'micromessenger' 这块不知道为什么开发者工具不识别
  return ua.indexOf('micromessenger') !== -1
}

/**
 * 对于小于10的数字前面加0
 */

export const doubleNum = n => { // 小于
  return n > '9' ? n : '0' + n
}

/**
 * 存储短信倒计时值
 */
export const saveCode = (time, type, mobileNo) => {
  const codeInfo = Local.get('code') ? Local.get('code') : {}
  codeInfo[type] = {
    timeout: time,
    date: new Date().getTime(),
    phone: mobileNo
  }
  return Local.set('code', codeInfo)
}

/**
 * 拿短信倒计时值
 */
export const calTime = (type) => {
  const codeInfo = Local.get('code')
  const date = new Date().getTime()
  const interval = date - codeInfo[type].date
  let time = codeInfo[type].timeout - Math.floor(interval / 1000)
  time = time < 0 ? 0 : time
  return time
}

// 微信浏览器微信支付
export const weChatBrowserWeChatPay = (res, targetUrl) => {
/**
 * res: 从后端请求来的数据
 * targetUrl:支付成功后跳转的目标页
*/

  const domainUrl = ''
  const wechatUrl = ''
  if (res.data) {
    if (res.data.code === 1) {
      const data = res.data.data
      // 判断是否微信
      const appid = data.appId
      const nonceStr = data.nonceStr
      let prepayId = data.prepay_id
      // 此参数的值中包含‘=’，所以需要encode之后再传
      prepayId = encodeURIComponent(prepayId)
      const sign = data.sign
      const timestamp = data.timeStamp
      const totalFee = data.total_fee
      const redirectUrl = encodeURIComponent(domainUrl + targetUrl)
      const payUrl =
				wechatUrl +
				'pay/wechat/toOnlinePay.htm?appid=' +
				appid +
				'&nonceStr=' +
				nonceStr +
				'&prepay_id=' +
				prepayId +
				'&sign=' +
				sign +
				'&timestamp=' +
				timestamp +
				'&total_fee=' +
				totalFee +
				'&redirectUrl=' +
				redirectUrl
      location.href = payUrl
    } else {
      return false
    }
  } else {
    return false
  }
}
const DEFAULT_LOCATION = { lng: 116.40387397, lat: 39.91488908 }
const BGeolocation = () => {
  return new Promise((resolve) => {
    const geolocation = new window.BMap.Geolocation()
    geolocation.getCurrentPosition(function (result) {
      if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
        console.log(result.point, 45678)
        resolve(result.point)
      } else {
        resolve(DEFAULT_LOCATION)
      }
    })
  })
}

const timerPromise = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DEFAULT_LOCATION)
    }, time)
  })
}

/**
 * 获取当前地理位置
 * 未加载到百度地图时，默认取天安门坐标
 * 500毫秒内未获取到地理位置时，默认取天安门坐标
*/
export const getLocation = () => {
  return new Promise(async (resolve) => {
    const cachedData = Session.get('LOCATION')
    if (cachedData) {
      return resolve(cachedData)
    }
    let result = DEFAULT_LOCATION
    if (window.BMap) {
      result = await Promise.race([BGeolocation(), timerPromise(500)])
    }
    Session.set('LOCATION', result)
    resolve(result)
  })
}
/**
 * 处理iphone上input框获取焦点、软键盘弹起后，再次收回键盘页面位置发生错乱的bug
*/
export const handleIosInput = _ => {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) { // 判断是否是ios端
    let flag = false
    let pageBackNormFunc
    document.body.addEventListener('focusin', () => {
      // 软键盘弹起事件
      flag = true
      pageBackNormFunc && clearTimeout(pageBackNormFunc)
    })
    document.body.addEventListener('focusout', () => {
      // 软键盘关闭事件
      if (flag) {
        pageBackNormFunc = setTimeout(function () { // // 当键盘收起的时候让页面回到原始位置
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }, 200)
      }
      flag = false
    })
  }
}
