import request from '@/utils/request'

/**
 * 删除应急值守记录
 * @param {*} params
 */
export function deleteWatch(params) {
  return request({
    url: `/wyx-emergency-services/v1/watch/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询应急值守
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/watch/page-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询应急值守-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/watch/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 应急值守详情查询
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/watch/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增应急值守计划
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/watch/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改应急值守计划
 * @param {*} data
 */
export function putEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/watch/reset-info',
    method: 'post',
    data
  })
}

/**
 * 应急值守列表(导出)
 * @param {*} params
 */
export function selectList(params) {
  return request({
    url: '/wyx-emergency-services/v1/watch/select-list',
    method: 'get',
    params
  })
}

/**
 * 填写应急值守情况
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-emergency-services/v1/watch/update-info',
    method: 'put',
    data
  })
}

