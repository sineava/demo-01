import request from '@/utils/request'

/**
 * 报表填报链接列表
 * @param {*} params
 */
export function getReport(params) {
  return request({
    url: `/v1/viewlet-info/list`,
    method: 'get',
    params
  })
}
