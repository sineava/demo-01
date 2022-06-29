import request from '@/utils/request'

/**
 * 行业端-水路运输辅助开业备案备案列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/water-transportation-services/v1/wt-auxiliary-opening-filing/page-hy-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-水路运输辅助开业备案备案列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/water-transportation-services/v1/wt-auxiliary-opening-filing/page-en-list`,
    method: 'get',
    params
  })
}

/**
 * 水路运输辅助开业备案备案详情
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/wt-auxiliary-opening-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 添加 水路运输辅助开业备案
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/wt-auxiliary-opening-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 水路运输辅助开业备案
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/wt-auxiliary-opening-filing/update`,
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
    url: `/water-transportation-services/v1/wt-auxiliary-opening-filing/record-review`,
    method: 'PUT',
    data
  })
}
