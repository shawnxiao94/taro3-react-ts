import Taro from '@tarojs/taro'
import { objectToString } from './index'

const tools = {
  /**
   * 网络请求
   * @param opts
   * @returns
   */
  request: (opts: {
    url: string
    params?: {} | any
    method?: 'OPTIONS' | 'HEAD' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
    [x: string]: any
  }) => {
    const { url = '', params = {}, method = 'GET', ...rest } = opts
    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data: params,
        method,
        ...rest // 剩余参数
      }).then(res => {
        const { data } = res
        if (data?.result === 0) {
          // 成功
          resolve(data)
        } else {
          // 不是预期的结果
          reject(res)
        }
      })
    })
  },
  /**
   * 页面loading
   * @param param
   * @returns
   */
  showLoading: (param: string | any) => {
    let dptOpts = {
      title: '加载中',
      mask: true // 防止触摸穿透
    }
    if (Object.prototype.toString.call(param) === '[object String]') {
      dptOpts.title = param
    } else if (Object.prototype.toString.call(param) === '[object Object]') {
      dptOpts = {
        ...dptOpts,
        ...param
      }
    }
    return Taro.showLoading(dptOpts)
  },
  /**
   * 页面提示
   * @param param
   */
  showToast: param => {
    let dptOpts: any = {
      title: '温馨提示', // 提示内容
      icon: 'none',
      mask: true,
      duration: 2000 // 提示时间
    }
    if (Object.prototype.toString.call(param) === '[object String]') {
      dptOpts.title = param
    } else if (Object.prototype.toString.call(param) === '[object Object]') {
      dptOpts = {
        ...dptOpts,
        ...param
      }
    } else {
      throw new Error('参数类型有误，应该是字符串或者对象')
    }
    return Taro.showToast(dptOpts)
  },
  /**
   *
   * @param url  跳转地址
   * @param data 携带参数
   * @returns
   */
  navigateTo: ({ url, data }) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      const searchStr = objectToString(data)
      return Taro.navigateTo({
        url: `${url}?${searchStr}`
      })
    }
    // return Taro.navigateTo({
    //   url,
    // });
  },
  /**
   * 设置缓存
   * @param key
   * @param value
   * @param time 缓存有效时间 单位：s
   */
  setStorageSyncWithTime: (key, value, time) => {
    try {
      const curTime = Date.now()
      // 过期时间
      const expiredTime = curTime + time * 1000
      Taro.setStorageSync(key, {
        [key]: value,
        expiredTime
      })
    } catch (err) {
      console.log(err)
    }
  },
  /**
   * 获取缓存
   * @param key
   * @returns
   */
  getStorageSyncWithTime: key => {
    try {
      const result = Taro.getStorageSync(key)
      const { expiredTime } = result
      if (Date.now() > expiredTime) {
        // 已过期
        Taro.removeStorageSync(key)
      } else {
        return result[key]
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default tools
