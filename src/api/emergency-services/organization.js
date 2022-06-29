import request from '@/utils/request'

/**
 * 删除应急机构信息
 * @param {*} params
 */
export function deleteOrgan(params) {
  return request({
    url: `/wyx-emergency-services/v1/organization/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询应急机构列表-行业企业端
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/organization/page-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询应急机构列表
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/organization/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 应急机构详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/organization/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增应急机构记录
 * @param {*} data
 */
export function saveOrgan(data) {
  return request({
    url: '/wyx-emergency-services/v1/organization/save-info',
    method: 'post',
    data
  })
}

/**
 * 通过名字模糊查询应急机构
 * @param {*} params
 */
export function selectList(params) {
  return request({
    url: '/wyx-emergency-services/v1/organization/select-list',
    method: 'get',
    params
  })
}

/**
 * 修改应急机构记录
 * @param {*} data
 */
export function updateOrgan(data) {
  return request({
    url: '/wyx-emergency-services/v1/organization/update-info',
    method: 'put',
    data
  })
}

