import request from '@/utils/request'

/**
 * 周边企业信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/firm-info/list',
    method: 'get',
    params
  })
}
