import request from '@/utils/request'

/**
 * 删除接警登记记录
 * @param {*} params
 */
export function deleteDisposal(params) {
  return request({
    url: `/wyx-emergency-services/v1/disposal-record/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 应急处置管理分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-record/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询接警登记详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-record/query',
    method: 'get',
    params
  })
}

/**
 * 消息发布
 * @param {*} params
 */
export function releaseRecord(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-record/release',
    method: 'put',
    params
  })
}

/**
 * 新增接警登记记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-record/saveEntity',
    method: 'post',
    data
  })
}

/**
 * 终止响应
 * @param {*} data
 */
export function termination(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-record/termination',
    method: 'put',
    data
  })
}

/**
 * 修改接警登记记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-record/updateById',
    method: 'put',
    data
  })
}
