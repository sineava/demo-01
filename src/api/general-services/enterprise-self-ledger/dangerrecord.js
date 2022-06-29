import request from '@/utils/request'

/**
 * 行业端端 分页查询安全监督检查隐患记录列表
 * @param {*} params
 */
export function getHyList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-account/page-hy-inspect-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询安全监督检查隐患记录列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-account/page-en-inspect-list',
    method: 'get',
    params
  })
}

/**
 * 安全监督检查隐患台账记录详情（通用）
 * @param {*} id
 */
export function getDetails(id) {
  return request({
    url: `/general-services//v1/hidden-danger-account/inspect-details/${id}`,
    method: 'get'
  })
}
