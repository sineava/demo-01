import request from '@/utils/request'

/**
 * 行业端-水运业务备案客运班轮停航备案信息列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/page-hy-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-水运业务备案客运班轮停航备案信息列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/page-en-list`,
    method: 'get',
    params
  })
}

/**
 * 水运业务备案客运班轮停航案备案详情（通用）
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 查询水路运输企业船舶列表 备案审核用
 * @param {*} enterpriseId
 */
export function getWtEnShipList(enterpriseId) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/get-wt-en-ship-list/${enterpriseId}`,
    method: 'get'
  })
}

/**
 * 企业端 备案审核（客运班轮停航备案）经营许可证信息列表 备案审核用
 * @param {*} params
 */
export function businessLicenseList(params) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/business-license-list`,
    method: 'get',
    params
  })
}

/**
 * 添加 水运业务备案客运班轮停航备案信息（水路运输企业）
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 水运业务备案客运班轮停航备案信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/update`,
    method: 'PUT',
    data
  })
}

/**
 * 行业端 备案审核
 * @param {*} data
 */
export function reviewData(data) {
  return request({
    url: `/water-transportation-services/v1/cruise-liner-suspend-filing/record-review`,
    method: 'PUT',
    data
  })
}
