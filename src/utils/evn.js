
/**
 * 获取登录地址
 */
export const getLoginUrl = () => {
  const location = window.location
  let loginUrl = ''
  let hostname = location.hostname
  switch (hostname){
  case process.env.VUE_APP_TEST_DOMAIN: // 测试环境
    loginUrl = `${location.protocol}//${process.env.VUE_APP_LOGIN_TEST_URL}`
    break
  case process.env.VUE_APP_OUTSID_DOMAIN: // 外网（企业端）环境地址
    loginUrl = `${location.protocol}//${process.env.VUE_APP_OUTSID_DOMAIN}${process.env.VUE_APP_LOGIN_OUTSID_URL}`
    break
  case process.env.VUE_APP_MSA_DOMAIN: // 内网（海事事务中心）环境地址
    loginUrl = `${location.protocol}//${process.env.VUE_APP_MSA_DOMAIN}${process.env.VUE_APP_LOGIN_MSA_URL}`
    break
  case process.env.VUE_APP_MOC_DOMAIN: // 内网（交通部）环境地址
    loginUrl = `${location.protocol}//${process.env.VUE_APP_MOC_DOMAIN}${process.env.VUE_APP_LOGIN_MOC_URL}`
    break
  case process.env.VUE_APP_DOMAIN: // 外网（企业端-域名）环境地址
    loginUrl = `${location.protocol}//${process.env.VUE_APP_DOMAIN}${process.env.VUE_APP_LOGIN_DOMAIN_URL}`
    break
  case process.env.VUE_APP_DOMAIN2: // 外网（企业端-域名2）环境地址
    loginUrl = `${location.protocol}//${process.env.VUE_APP_DOMAIN2}${process.env.VUE_APP_LOGIN_DOMAIN_URL}`
    break
  default: // 开发环境
    loginUrl = `${process.env.VUE_APP_LOGIN_LOCAL_URL}`
    break
  }
  return loginUrl
}

/**
 * 替换外链地址
 * @param {*} url
 */
export const replaceOuterUrl = (url) => {
  const location = window.location
  let outerUrl = ''
  let hostname = location.hostname
  switch (hostname){
  case process.env.VUE_APP_MOC_DOMAIN: // 内网（交通部）环境地址
    // 将“海事事务中心网络”环境替换成“交通部”网络环境
    outerUrl = url.replace(process.env.VUE_APP_MSA_DOMAIN, process.env.VUE_APP_MOC_DOMAIN)
    break
  default: // 开发环境
    outerUrl = url
    break
  }
  return outerUrl
}
/**
 * 替换报表外链地址
 * @param {*} url
 */
export const replaceReportUrl = (url) => {
  const location = window.location
  let outerUrl = ''
  let hostname = location.hostname
  switch (hostname){
  case process.env.VUE_APP_MOC_DOMAIN: // 内网（交通部）环境地址
    // 将“海事事务中心网络”环境替换成“交通部”网络环境
    outerUrl = url.replace(process.env.VUE_APP_REPORT_MSA_URL, process.env.VUE_APP_REPORT_MOC_URL)
    break
  default: // 开发环境
    outerUrl = url
    break
  }
  return outerUrl
}

/**
 * 获取报表地址
 * @param {*} url
 */
export const getReportUrl = () => {
  const location = window.location
  let reportUrl = ''
  let hostname = location.hostname
  switch (hostname){
  case process.env.VUE_APP_MSA_DOMAIN: // 内网（海事事务中心）环境地址
    reportUrl = `${process.env.VUE_APP_REPORT_MSA_URL}`
    break
  case process.env.VUE_APP_MOC_DOMAIN: // 内网（交通部）环境地址
    reportUrl = `${process.env.VUE_APP_REPORT_MOC_URL}`
    break
  default: // 其他环境
    reportUrl = `${process.env.VUE_APP_REPORT_OTHER_URL}`
    break
  }
  return reportUrl
}
