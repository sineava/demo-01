import request from '@/utils/request'

/**
 * (企业端)分页查询企业制度列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/systemInfo/pageEnList',
    method: 'get',
    params
  })
}

/**
 * (企业端)删除企业制度信息
 * @param {*} params
 */
export function deleteSystem(id) {
  return request({
    url: `/general-services/v1/systemInfo/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 *通过ID查询企业制度详情
 * @param {*} params
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/systemInfo/findById/${id}`,
    method: 'get'
  })
}

/**
 * (企业端)添加企业制度信息
 * @param {*} params
 */
export function addSystemInfo(data) {
  return request({
    url: '/general-services/v1/systemInfo/add',
    method: 'post',
    data
  })
}

/**
 * (企业端)修改企业制度信息
 * @param {*} params
 */
export function editSystemInfo(data) {
  return request({
    url: '/general-services/v1/systemInfo/update',
    method: 'PUT',
    data
  })
}

/**
 * 综合查询-制度信息
 * @param {*} params
 */
 export function integratedQueryPage(params) {
  return request({
    url: '/general-services/v1/systemInfo/integrated-query-page',
    method: 'get',
    params
  })
}