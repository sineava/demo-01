import request from '@/utils/request'

/**
 * 港口经营许可证信息分页查询
 * @param {*} params
 */
export function getBusinessLicensePageList(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/find-license-histories',
    method: 'get',
    params
  })
}

/**
 * 企业端 查询经营许可证详情
 * @param {*} params
 */
export function getQyLicense(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/en-license-info',
    method: 'get',
    params
  })
}

/**
 * 行业端 查询经营许可证详情
 * @param {*} params
 */
export function getHyLicense(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/in-license-info',
    method: 'get',
    params
  })
}

/**
 * 重置经营许可证信息
 * @param {*} params
 */
export function resetLicense(data) {
  return request({
    url: '/general-services/v1/enterprise-qualification/reset-info',
    method: 'POST',
    data
  })
}

/**
 * 查询经营许可证详情
 * @param {*} params
 */
export function findLicense(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/find-license',
    method: 'get',
    params
  })
}

/**
 * 查询危险货物作业证书详情
 * @param {*} params
 */
export function findGoods(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/find-goods',
    method: 'get',
    params
  })
}
/**
 * 新增-港口危险货物作业附证信息
 * @param {*} params
 */
export function postLicense(data) {
  return request({
    url: '/general-services/v1/enterprise-qualification/insert-dangerous-info',
    method: 'POST',
    data
  })
}

/**
 * 修改-港口危险货物作业附证信息
 * @param {*} params
 */
export function putLicense(data) {
  return request({
    url: '/general-services/v1/enterprise-qualification/update-dangerous-info',
    method: 'POST',
    data
  })
}

/**
 * 港口危险货物作业证书分页查询
 * @param {*} params
 */
export function getGoodsCertificatePageList(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/goods-certificate-pageList',
    method: 'get',
    params
  })
}

/**
 * 查询危险货物作业证书历史资质列表
 * @param {*} params
 */
export function getGoodsHistory(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/find-goods-histories',
    method: 'get',
    params
  })
}

/**
 * 查询经营许可证历史资质列表
 * @param {*} params
 */
export function getLicenseHistory(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/find-license-histories',
    method: 'get',
    params
  })
}
