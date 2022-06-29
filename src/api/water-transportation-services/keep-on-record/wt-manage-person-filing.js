import request from '@/utils/request'

/**
 * 行业端-水路运输企业专职人员变更备案列表
 * @param {*} params
 */
export function pageHyWtmPersonFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/wt-manage-person-filing/page-hy-wtm-person-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-水路运输企业专职人员变更备案列表
 * @param {*} params
 */
export function pageEnWtmPersonFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/wt-manage-person-filing/page-en-wtm-person-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 水路运输企业专职人员变更备案详情（通用）
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/wt-manage-person-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 查询添加人员是否存在 需要判断新增人员和数据库不重复
 * @param {*} params
 */
export function isPersonExist(params) {
  return request({
    url: `/water-transportation-services/v1/wt-manage-person-filing/is-person-exist`,
    method: 'get',
    params
  })
}

/**
 * 新增 水路运输企业专职人员变更备案
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/wt-manage-person-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 水路运输企业专职人员变更备案
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/wt-manage-person-filing/update`,
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
    url: `/water-transportation-services/v1/wt-manage-person-filing/record-review`,
    method: 'PUT',
    data
  })
}
