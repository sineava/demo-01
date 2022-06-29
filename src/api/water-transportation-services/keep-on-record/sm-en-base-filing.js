import request from '@/utils/request'

/**
 * 行业端-船舶管理企业基础信息备案列表
 * @param {*} params
 */
export function pageHyBaseFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/sm-en-base-filing/page-hy-base-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-船舶管理企业基础信息变更备案列表
 * @param {*} params
 */
export function pageEnBaseFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/sm-en-base-filing/page-en-base-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 船舶管理企业基础信息变更备案详情
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/sm-en-base-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 新增 船舶管理企业基础信息变更备案
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/sm-en-base-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 船舶管理企业基础信息变更备案
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/sm-en-base-filing/update`,
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
    url: `/water-transportation-services/v1/sm-en-base-filing/record-review`,
    method: 'PUT',
    data
  })
}
