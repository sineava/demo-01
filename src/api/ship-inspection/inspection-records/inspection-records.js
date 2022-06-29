import request from '@/utils/request'

/**
 * 综合数据查询-船舶检验信息列表
 * @param {*} params
 */
export function getShipList(params) {
  return request({
    url: `/water-transportation-services/v1/inspection-records/page-list`,
    method: 'get',
    params
  })
}
