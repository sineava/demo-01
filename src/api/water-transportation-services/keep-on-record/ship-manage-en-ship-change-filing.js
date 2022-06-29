import request from '@/utils/request'

/**
 * 行业端-船舶管理企业船舶备案 分页船舶备案列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-en-ship-change-filing/page-hy-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-船舶管理企业船舶备案 分页船舶备案列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-en-ship-change-filing/page-en-list`,
    method: 'get',
    params
  })
}

/**
 * 船舶管理企业船舶备案 详情通用
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-en-ship-change-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 添加 船舶管理企业船舶变更备案
 * @param {*} params
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-en-ship-change-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 船舶管理企业船舶变更备案
 * @param {*} params
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-en-ship-change-filing/update`,
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
    url: `/water-transportation-services/v1/ship-manage-en-ship-change-filing/record-review`,
    method: 'PUT',
    data
  })
}
