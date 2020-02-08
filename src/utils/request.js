/**
 * 使用方法：
 * import Request from '@/utils/request';
 *
 *
 * // promise 写法
 * Request.get(url, options).then(() => {
 *
 * });
 *
 * Request.post(url, options) // 与get类似Request.post(url, options) // 与get类似
 *
 * options: {
 *  data: {}, // 请求参数
 *  onlyOnce: true, // 防止单位时间内多次无效请求  *【非axios自带】
 *  loading: false, // 是否显示统一loading样式 *【非axios自带】
 *  form: true,  // 处理是否以form格式发送 *【非axios自带】
 *  cache: false, // 设置请求缓存时间 *【非axios自带】
 *  customCatch: true, // 是否业务捕获请求异常 *【非axios自带】
 *  timeout: 3000, // 默认为3秒，如果业务特殊需要可调整
 *  headers: {}, // 向header中添加特殊值时使用（通常用不到）
 *  ... // note: 更多options，可以参考axios的config配置，均支持
 * }
 *
 * 取消单一请求：
 * const req = Request.get('/api');
 * Request.cancel(req);
 *
 */
import router from '@/router'
import axios from 'axios'
import store from '@/store'
import { Local } from '@/utils/storage'
import { Toast } from 'vant'
import { stringify } from 'querystring'
import { isWechat } from '@/utils/index'

// default settings
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// axios使用的默认配置
const defaultConfig = {
  withCredentials: true,
  timeout: 10000
}
const instance = axios.create(defaultConfig)

const reqTokenMap = new Map()

// request 拦截
instance.interceptors.request.use(
  config => {
    // 拼接时间戳，防止请求缓存
    config.url = appendUrl(config.url, `_time=${Date.now()}`)
    return config
  },
  error => Promise.reject(error)
)

const defaultOptions = {
  loading: false,
  onlyOnce: true,
  form: false,
  cache: false,
  customCatch: false
}
// 用于存储onlyOnce请求
const uniqueRequestMap = {}
const getUniqueKey = ({ method, url, data }) =>
  `${method}|${url}|${JSON.stringify(data)}`

/**
 * 防止重复请求逻辑
 * @param {*} { onlyOnce, ...config }
 * @returns
 */
const processOnlyOnce = (config, key) => {
  if (uniqueRequestMap[key]) {
    throw new Error(JSON.stringify({
      resCode: 10000,
      msg: '请勿重复请求'
    }))
  }
  uniqueRequestMap[key] = true
}
/**
 * 根据传入对象中的config，将对应key从map中移除
 * @param {*} obj 传入对象需包含config
 */
const removeRequestFromUniqueMap = uniqueKey => {
  delete uniqueRequestMap[uniqueKey]
}

/**
 * 拼接url
 * @param {*} url
 * @param {*} str
 */
const appendUrl = (url, str) =>
  `${url}${url.indexOf('?') > -1 ? '&' : '?'}${str}`

const processForm = (config) => {
  config.headers = config.headers || {}
  config.headers['Content-Type'] =
      'application/x-www-form-urlencoded;charset=UTF-8'
  config.data = stringify(config.data)
}

/**
 * 处理通用loading
 * @param {*} loading options.loading
 */
const processLoading = loading => {
  // loading && store.dispatch('app/showLoading')
  loading && Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
}
// const urlPrefix = /(http|https):\/\/([\w.]+\/?)\S*/
const fetch = options => {
  // 声明取消请求时需使用的source
  const source = axios.CancelToken.source()

  const promise = new Promise((resolve, reject) => {
    const {
      onlyOnce, loading, form, cache, ...resetOptions
    } = options
    // 唯一Key
    const uniqueKey = getUniqueKey(resetOptions)
    // 缓存数据
    const cachedData = cache ? Local.get(uniqueKey) : null
    if (cachedData) {
      resolve(cachedData)
    } else {
      // 处理onlyOnce
      onlyOnce && processOnlyOnce(resetOptions, uniqueKey)
      // 处理form
      form && processForm(resetOptions)
      // 处理公共loading逻辑
      processLoading(loading)
    }
    instance({
      ...resetOptions,
      cancelToken: source.token
    }).then(resp => {
      loading && Toast.clear()
      if (resp.resCode === 102) {
        router.push({
          path: '/login',
          query: { redirect: options.hasToPath || router.currentRoute.fullPath }
        })
      } else if (resp.resCode === 101) {
        // 授权
        if (isWechat() && process.env.CURRENT_ENV !== 'dev') {
          const redirect = window.location.href
          window.location.href = '/wx/accredit/go?url=' + encodeURI(encodeURI(redirect))
        }
      } else if (resp.resCode === 105) {
        router.replace('/attention')
      } else if (resp.resCode === 0) {
        const data = resp.data
        if (cache) {
          // 请求默认缓存1小时
          Local.set(uniqueKey, data, 1 * 60 * 60 * 1000)
        }
        resolve(data)
      } else if (!resp.resCode) {
        resolve(resp)
      } else {
        clearInterval(window.timer)
        if (!options.customCatch) {
          Toast(resp.msg)
        } else {
          reject(resp)
        }
      }
    }).catch(() => {
      // Toast('服务异常，请稍后再试')
    }).finally(() => {
      removeRequestFromUniqueMap(uniqueKey)
      reqTokenMap.delete(promise)
    })
  })

  reqTokenMap.set(promise, source)

  return promise
}

// response 拦截
instance.interceptors.response.use(
  response => {
    // 关闭loading提示
    store.dispatch('app/hideLoading')
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  get (url, options = {}) {
    return fetch({
      ...defaultOptions,
      ...options,
      url,
      method: 'get',
      params: options.data
    })
  },
  post (url, options = {}) {
    return fetch({
      ...defaultOptions,
      ...options,
      url,
      method: 'post'
    })
  },
  upload (url, file, type) {
    const formData = new FormData()
    formData.append('file', file.data.file)
    formData.append('type', file.data.type)
    return fetch({
      ...defaultOptions,
      loading: file.loading,
      headers: {
        'Content-Type': 'multipart/form-data;'
      },
      url,
      data: formData,
      method: 'post'
    })
  },
  cancel (req) {
    // 当传入request时，则取消对应的请求
    if (req) {
      reqTokenMap.get(req).cancel()
      reqTokenMap.delete(req)
      return
    }
    for (const request of reqTokenMap.values()) {
      request.cancel()
    }
    reqTokenMap.clear()
  }
}
