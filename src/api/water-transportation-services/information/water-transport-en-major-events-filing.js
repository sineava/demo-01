import request from '@/utils/request'

/**
 * 行业端-水路运输企业信息管理 分页重大责任事故信息列表
 * @param {*} params
 */
export function pageHyMajorAccidentList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/page-hy-major-accident-list',
    method: 'get',
    params
  })
}

/**
 * 企业端-水路运输企业信息 分页重大责任事故信息列表
 * @param {*} params
 */
export function pageEnMajorAccidentList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/page-en-major-accident-list',
    method: 'get',
    params
  })
}

/**
 * 水路运输企业重大责任事故详情（通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/water-transportation-services/v1/water-transport-en-major-events-filing/find-by-id/${id}`,
    method: 'get'
  })
}

/**
 * 行业端-水路运输企业备案 分页重大责任事故信息列表
 * @param {*} params
 */
export function pageHyMajorAccidentFilingList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/page-hy-major-accident-filing-list',
    method: 'get',
    params
  })
}

/**
 * 企业端-水路运输企业备案 分页重大责任事故信息列表
 * @param {*} params
 */
export function pageEnMajorAccidentFilingList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/page-en-major-accident-filing-list',
    method: 'get',
    params
  })
}

/**
 * 添加 水路运输企业重大事件备案信息
 * @param {*} params
 */
export function addData(data) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 水路运输企业重大事件备案信息
 * @param {*} params
 */
export function updateData(data) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/update',
    method: 'PUT',
    data
  })
}

/**
 * 行业端 - 水路运输企业重大事件备案审核
 * @param {*} params
 */
export function reviewData(data) {
  return request({
    url: '/water-transportation-services/v1/water-transport-en-major-events-filing/record-review',
    method: 'PUT',
    data
  })
}
