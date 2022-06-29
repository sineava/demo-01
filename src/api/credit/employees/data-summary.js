import request from '@/utils/request'

/**
 * 汇总查询
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets/summary',
    method: 'get',
    params
  })
}

/**
 * 上报记录-分页列表
 * @param {*} params
 */
export function getRecordList(params) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets/reported-record',
    method: 'get',
    params
  })
}

/**
 * 上报记录详情
 * @param {*} id
 */
export function getInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/credit-assets/query-info`,
    method: 'get',
    params: params
  })
}
