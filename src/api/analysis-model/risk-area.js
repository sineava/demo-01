import request from '@/utils/request'

/**
 * 添加风险辖区
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: '/analysis-model/v1/risk-area/add',
    method: 'post',
    data
  })
}

/**
 * 修改风险辖区
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/analysis-model/v1/risk-area/alert',
    method: 'put',
    data
  })
}

/**
 * 删除风险辖区
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/analysis-model/v1/risk-area/del/${id}`,
    method: 'delete'
  })
}

/**
 * 风险辖区详情
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/risk-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 风险辖区列表
 * @param {*} type
 */
export function getList(type) {
  return request({
    url: `/analysis-model/v1/risk-area/list/${type}`,
    method: 'get'
  })
}

/**
 * 风险辖区列表(评估页面，分权限)
 * @param {*} type
 */
export function getZoneList(type) {
  return request({
    url: `/analysis-model/v1/risk-area/portion-list/${type}`,
    method: 'get'
  })
}

/**
 * 获取组织机构部门列表
 */
export function getOrgList() {
  return request({
    url: '/analysis-model/v1/risk-area/org-list',
    method: 'get'
  })
}
