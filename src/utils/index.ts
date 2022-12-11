export const testFn = () => {
  // 测试环境变量
  console.log('APP_API', APP_API, APP_NAME, APP_VERSION)
}
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
