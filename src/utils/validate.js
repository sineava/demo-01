/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * 15或18位身份证号码
 * @param {*} str 身份证号码字符串
 */
export function identity(rule, value, callback) {
  if (value && !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
    return callback(new Error('请输入有效15或18位身份证号码'))
  }
  return callback()
}
/**
 * 邮政编码6位
 * @param {*} str 邮政编码字符串
 */
export function postal(rule, value, callback) {
  if (value && !/^\d{6}$/.test(value)) {
    return callback(new Error('请输入有效6位邮政编码'))
  }
  return callback()
}
/**
 * 中文
 * @param {*} str 字符串
 */
export function zh(rule, value, callback) {
  if (value && !/^[\u4e00-\u9fa5]+$/.test(value)) {
    return callback(new Error('只能输入中文字符'))
  }
  return callback()
}
/**
 * 英文
 * @param {*} str 字符串与空格
 */
export function en(rule, value, callback) {
  if (value && !/^[a-zA-Z\s]*$/.test(value)) {
    return callback(new Error('只能输入英文字符'))
  }
  return callback()
}
/**
 * 英文、数字
 * @param {*} str 字符串
 */
export function enNum(rule, value, callback) {
  if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
    return callback(new Error('只能英文、数字字符'))
  }
  return callback()
}
/**
 * 手机号码11位
 * @param {*} str 字符串
 */
export function phone(rule, value, callback) {
  if (value && !/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    return callback(new Error('请输入11位手机号码'))
  }
  return callback()
}
/**
 * 固定电话|手机号码：可以“+”开头，除数字外，可含有“-”
 * @param {*} str 字符串
 */
export function telephone(rule, value, callback) {
  if (value && !/^([1]\d{10}|([(]?0[0-9]{2,3}[)]?[-]?)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?)$/.test(value)) {
    return callback(new Error('请输入有效电话号码'))
  }
  return callback()
}
/**
 * 传真号码
 * @param {*} str 字符串
 */
export function fax(rule, value, callback) {
  if (value && !/^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/.test(value)) {
    return callback(new Error('请输入有效传真号码'))
  }
  return callback()
}

/**
 * 只能输入中英文、数字、空格、‘-’
 * @param {*} str 字符串
 */
export function zhEnNumBlankHyphen(rule, value, callback) {
  if (value && !/^[\u4e00-\u9fa5a-zA-Z0-9\s-]+$/.test(value)) {
    return callback(new Error('只能输入中英文、数字、空格、‘-’'))
  }
  return callback()
}
/**
 * 首位不能是空格
 * @param {*} str 字符串
 */
export function firstNotBlank(rule, value, callback) {
  if (value && !/^[^ ]+[\s\S]*/.test(value)) {
    return callback(new Error('首位不能是空格'))
  }
  return callback()
}
/**
 * IP
 * @param {*} str 字符串
 */
export function ip(rule, value, callback) {
  if (value && !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)) {
    return callback(new Error('请输入有效IP'))
  }
  return callback()
}
/**
 * 域名
 * @param {*} str 字符串
 */
export function domain(rule, value, callback) {
  if (value && !/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(value)) {
    return callback(new Error('请输入有效域名'))
  }
  return callback()
}
/**
 * URL 地址
 * @param {*} str 字符串
 */
export function url(rule, value, callback) {
  if (value && !/^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/.test(value)) {
    return callback(new Error('请输入有效URL地址'))
  }
  return callback()
}
/**
 * email 地址
 * @param {*} str 字符串
 */
export function email(rule, value, callback) {
  if (value && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
    return callback(new Error('请输入有效URL地址'))
  }
  return callback()
}

/**
 * 8-20位,大写字母、小写字母、数字、特殊符号至少三项
 * @param {*} str 字符串
 */
export function password(rule, value, callback) {
  if (value && !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,20}$/.test(value)) {
    return callback(new Error('请输入有效登录密码'))
  }
  return callback()
}

/**
 * 字母数字大于6位
 * @param {*} str 字符串
 */
export function account(rule, value, callback) {
  if (value && !/^[0-9a-zA-z_]{6,}$/.test(value)) {
    return callback(new Error('请输入6位用户账号'))
  }
  return callback()
}

/**
 * 非负整数
 * @param {*} str 字符串
 */
export function interger(rule, value, callback) {
  if (value && !/(^[1-9]+\d*$)|(^0$)/.test(value)) {
    return callback(new Error('请输入正整数或0'))
  }
  return callback()
}
