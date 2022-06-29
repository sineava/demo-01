import request from '@/utils/request'

/**
 * 行业端-水路运输企业委托船舶管理企业变更备案列表
 * @param {*} params
 */
export function pageHyChangeFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/entrust-change-filing/page-hy-change-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端-水路运输企业委托船舶管理企业变更备案列表
 * @param {*} params
 */
export function pageEnChangeFilingList(params) {
  return request({
    url: `/water-transportation-services/v1/entrust-change-filing/page-en-change-filing-list`,
    method: 'get',
    params
  })
}

/**
 * 水路运输企业委托船舶管理企业变更备案详情通用
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/entrust-change-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 添加委托船舶管理企业变更备案获取变更船舶委托协议信息
 * @param {*} params
 */
export function findByShip(params) {
  return request({
    url: `/water-transportation-services/v1/entrust-change-filing/find-by-ship`,
    method: 'get',
    params
  })
}

/**
 * 添加 水路运输企业委托船舶管理企业变更备案(企业信息需要在通用业务中获取)
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/entrust-change-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 水路运输企业委托船舶管理企业变更备案()
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/entrust-change-filing/update`,
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
    url: `/water-transportation-services/v1/entrust-change-filing/record-review`,
    method: 'PUT',
    data
  })
}
