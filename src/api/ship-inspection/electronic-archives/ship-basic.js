import request from '@/utils/request'

/**
 * 船舶基础数据-船舶列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/ship-inspection/v1/ship-basic/ship-list`,
    method: 'get',
    params
  })
}

/**
 * 船舶基础数据-基本信息
 * @param {*} shipInfoId
 */
export function getInfo(shipInfoId) {
  return request({
    url: `/ship-inspection/v1/ship-basic/ship-info/${shipInfoId}`,
    method: 'get'
  })
}

/**
 * 船舶基础数据-国籍证书
 * @param {*} shipInfoId
 */
export function getCertificate(shipInfoId) {
  return request({
    url: `/ship-inspection/v1/ship-basic/certificate-nationality/${shipInfoId}`,
    method: 'get'
  })
}

/**
 * 船舶基础数据-船舶识别号
 * @param {*} shipInfoId
 */
export function getIdentify(shipInfoId) {
  return request({
    url: `/ship-inspection/v1/ship-basic/identify-number/${shipInfoId}`,
    method: 'get'
  })
}

/**
 * 船舶基础信息-所有权信息
 * @param {*} shipInfoId
 */
export function getOwnership(shipInfoId) {
  return request({
    url: `/ship-inspection/v1/ship-basic/ownership-certificate/${shipInfoId}`,
    method: 'get'
  })
}
