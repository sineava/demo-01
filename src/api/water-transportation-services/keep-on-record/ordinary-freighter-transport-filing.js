import request from '@/utils/request'

/**
 * 行业端-普通货船运力备案列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: `/water-transportation-services/v1/ordinary-freighter-transport-filing/page-list`,
    method: 'get',
    params
  })
}

/**
 * 普通货船运力备案列表详情
 * @param {*} params
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/ordinary-freighter-transport-filing/get/${id}`,
    method: 'get'
  })
}

/**
 * 添加 普通货船运力备案
 * @param {*} params
 */
export function addData(data) {
  return request({
    url: `/water-transportation-services/v1/ordinary-freighter-transport-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 编辑/重新提交 普通货船运力备案
 * @param {*} params
 */
export function updateData(data) {
  return request({
    url: `/water-transportation-services/v1/ordinary-freighter-transport-filing/update`,
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
    url: `/water-transportation-services/v1/ordinary-freighter-transport-filing/record-review`,
    method: 'PUT',
    data
  })
}

/**
 * 普通货船运力-分页查询 2022-01-04 新增
 * @param {*} params
 */
export function getFilingPageList(params) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/ship-list`,
    method: 'get',
    params
  })
}

/**
 * 普通货船运力-详情查询 2022-01-04 新增
 * @param {*} params
 */
export function getFilingInfo(id) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/info`,
    method: 'get',
    params:{id:id}
  })
}

/**
 * 普通货船运力-申请普通货船运力备案  2022-01-04 新增
 * @param {*} params
 */
export function addFilingData(data) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/save-info`,
    method: 'POST',
    data
  })
}

/**
 * 普通货船运力-修改普通货船运力备案  2022-01-04 新增
 * @param {*} params
 */
export function updateFilingData(data) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/update-info`,
    method: 'PUT',
    data
  })
}

/**
 * 普通货船运力-受理（地方）  2022-01-04 新增
 * @param {*} params
 */
export function acceptFilingData(data) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/accept-place`,
    method: 'PUT',
    data
  })
}

/**
 * 普通货船运力-审核（中心）  2022-01-04 新增
 * @param {*} params
 */
export function auditFilingData(data) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/accept-center`,
    method: 'PUT',
    data
  })
}

/**
 * 普通货船运力-删除普通货船运力备案 2022-01-04 新增
 * @param {*} params
 */
export function delFilingData(id) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/delete-info/${id}`,
    method: 'DELETE'
  })
}

/**
 * 水路运输企业列表查询{type:2} 2022-01-04 新增
 * @param {*} params
 */
export function getEnterpriseList(params) {
  return request({
    url: `/general-services/v1/enterprise-basic/list-type`,
    method: 'get',
    params
  })
}

/**
 * 普通货船运力-流转痕迹 2022-01-04 新增
 * @param {*} params
 */
export function getFilingInfoTrace(params) {
  return request({
    url: `/water-transportation-services/v1/cargo-ship-capacity-filing/circulation-of-trace`,
    method: 'get',
    params
  })
}

