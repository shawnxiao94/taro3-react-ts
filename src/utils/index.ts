/**
 * 将对象解析成url参数
 * @param {*} obj
 * @returns
 */
export const objectToString = (obj: any) => {
  const searchKeys: string[] = []
  if (Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length) {
    for (const key in obj) {
      searchKeys.push(`${key}=${obj[key]}`)
    }
  }
  return searchKeys.join('&')
}
/**
 * 前17位校验系数
 */
const COEFFICIENTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

/**
 * 尾数校验
 */
const CAPTCHA = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

/**
 * 身份证号校验
 * @param idCardNum
 * @return 校验结果
 */
export const validateIdCardNum: (string) => boolean = (idCardNum: string) => {
  if (!idCardNum.match(/^[0-9]{17}([0-9X])$/gi)) {
    return false
  }
  const total = idCardNum
    .substring(0, 17)
    .split('')
    .reduce((preVal, current, index) => {
      return (preVal += +current * COEFFICIENTS[index])
    }, 0)
  const last = idCardNum.toUpperCase().charAt(17)
  return last === CAPTCHA[total % 11]
}
// 转换时间格式
export function formatTimeZh(date, flag) {
  if (!date) {
    return
  }
  date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  // var formatNumber = function(n) {
  //   n = n.toString();
  //   return n[1] ? n : '0' + n;
  // };
  const dateList = [year, month, day].map(formatNumber)
  return (
    dateList[0] +
    (flag || '年') +
    dateList[1] +
    (flag || '月') +
    dateList[2] +
    (flag ? '' : '日') +
    ' ' +
    [hour, minute].map(formatNumber).join(':')
  )
}
// 转化日期格式
export function formatTimeDate(date) {
  if (!date) {
    return
  }
  date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const dateList = [year, month, day].map(formatNumber)
  return dateList[0] + '-' + dateList[1] + '-' + dateList[2]
}
// 转化月份格式
export function formatTimeMoth(date) {
  if (!date) {
    return
  }
  date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const dateList = [year, month, day].map(formatNumber)
  return dateList[0] + '-' + dateList[1]
}
// 转化时间格式
export function formatTimeTime(date) {
  if (!date || date < 0) {
    return
  }
  date = new Date(date)

  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()

  return [hour, minute, seconds].map(formatNumber).join(':')
}
// 转换单位数为双位数：9 -> 09
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const deadlineTime = time => {
  let diff = time - new Date().getTime()
  if (!diff || diff < 0) {
    return '0天0时0分'
  }
  let baseTime = 24 * 60 * 60 * 1000 // 天
  const day = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 24
  const hour = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const minute = Math.floor(diff / baseTime)

  return `${day}天${hour}时${minute}分`
}

// 计算倒计时
export function countdownTime(time, mode) {
  let diff = time - new Date().getTime()
  if (!diff || diff < 0 || (mode === 1 && diff >= 3 * 24 * 60 * 60 * 1000)) {
    return
  }
  let baseTime = 24 * 60 * 60 * 1000 // 天基数
  const day = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 24
  let hour = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const minute = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const seconds = Math.floor(diff / baseTime)

  if (mode == 1) {
    hour += day * 24

    return [hour, minute, seconds].map(formatNumber).join('').split('')
  }
  return `${day}天${hour}时${minute}分`
}

// 已经过去多长时间
export function pastTime(time) {
  return diffTime(new Date().getTime(), time)
}

export function diffTime(startTime = new Date().getTime(), endTime) {
  let diff = startTime - endTime
  // if (!diff || diff < 0 || (mode === 1 && diff >= 3 * 24 * 60 * 60 * 1000)) {
  //   return;
  // }
  let baseTime = 24 * 60 * 60 * 1000 // 天基数
  const day = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 24
  let hour = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const minute = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const seconds = Math.floor(diff / baseTime)

  hour += day * 24
  return [hour, minute, seconds].map(formatNumber).join(':').split('')
  // return `${day}天${hour}时${minute}分`;
}
