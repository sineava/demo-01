import request from '@/utils/request'

/**
 * 水路运输代理经营者-分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/waterway-agent-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 水路运输代理经营者-统计数据
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/general-services/v1/waterway-agent-statistics/data-statistics',
    method: 'get',
    params
  })
}