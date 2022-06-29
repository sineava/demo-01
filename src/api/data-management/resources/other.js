import request from '@/utils/request'

/**
 * 获取组织机构部门列表
 * @param {*} params
 */
export function getOrgList(params) {
  return request({
    url: `/general-services/v1/external/org-list`,
    method: 'get',
    params
  })
}

/**
 * 机构所属企业名称查询
 * @param {*} params
 */
export function queryEnterprise(params) {
  return request({
    url: `/general-services/v1/external/query-enterprise`,
    method: 'get',
    params
  })
}

/**
 * 查询所有港区列表
 * @param {*} params
 */
export function getPortAreaList(params) {
  return request({
    url: `/port-services/v1/port-area/port-area-list`,
    method: 'get',
    params
  })
}

/**
 * 查询所有码头表
 * @param {*} params
 */
export function getWharfList(params) {
  return request({
    url: `/port-services/v1/port-area/wharf-list`,
    method: 'get',
    params
  })
}
