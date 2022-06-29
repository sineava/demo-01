import request from '@/utils/request'

/**
 * 删除上报部门
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/department/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 查询部门信息
 * @param {*} params
 */
export function getOrgList(params) {
  return request({
    url: '/wyx-channel-services/v1/department/org-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询上报部门
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/department/page-list',
    method: 'get',
    params
  })
}

/**
 * 新增上报部门
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/department/save-info',
    method: 'post',
    data
  })
}
