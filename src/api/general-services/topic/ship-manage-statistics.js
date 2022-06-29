import request from '@/utils/request'

/**
 * 船舶管理经营者-分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/ship-manage-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 船舶管理经营者-统计数据
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/general-services/v1/ship-manage-statistics/data-statistics',
    method: 'get',
    params
  })
}