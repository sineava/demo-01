import request from '@/utils/request'

/**
 * 行业端-船舶管理企业专职人员变更备案列表
 * @param {*} params
 */
export function pageHySmPersonFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-person-filing/page-hy-sm-person-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-船舶管理企业专职人员变更备案列表
 * @param {*} params
 */
export function pageEnSmPersonFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-person-filing/page-en-sm-person-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 船舶管理企业专职人员变更备案详情（通用）
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-person-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 查询添加人员是否存在 需要判断新增人员和数据库不重复
 * @param {*} params
 */
export function isPersonExist(params) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-person-filing/is-person-exist`,
    method: 'get',
    params
  })
}

/**
 * 新增 船舶管理企业专职管理人员变更备案
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-person-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 船舶管理企业专职管理人员变更备案
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-person-filing/update`,
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
    url: `/water-transportation-services/v1/ship-manage-person-filing/record-review`,
    method: 'PUT',
    data
  })
}
