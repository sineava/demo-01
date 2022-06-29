import request from '@/utils/request'

/**
 * 行业端-水运业务备案无船承运业务备案列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/water-transportation-services/v1/non-ship-carriage-filing/page-hy-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-水运业务备案无船承运业务备案列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/water-transportation-services/v1/non-ship-carriage-filing/page-en-list`,
    method: 'get',
    params
  })
}

/**
 * 水运业务备案无船承运业务备案详情（通用）
 * @param {*} params
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/non-ship-carriage-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 添加 水运业务备案无船承运业务备案
 * @param {*} params
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/non-ship-carriage-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 水运业务备案无船承运业务备案
 * @param {*} params
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/non-ship-carriage-filing/update`,
    method: 'PUT',
    data
  })
}

/**
 * 行业端 备案审核
 * @param {*} params
 */
export function reviewData(data) {
  return request({
    url: `/water-transportation-services/v1/non-ship-carriage-filing/record-review`,
    method: 'PUT',
    data
  })
}
