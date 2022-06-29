import request from '@/utils/request'

/**
 * 新增续保记录信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-fill-record/save-info',
    method: 'post',
    data
  })
}

/**
 * 查询续报记录列表
 * @param {*} params
 */
export function queryInfo(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-fill-record/query-info',
    method: 'get',
    params
  })
}

