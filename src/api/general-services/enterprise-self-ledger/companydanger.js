import request from '@/utils/request'

/**
 * 行业端端 分页查询安全监督检查隐患记录列表
 * @param {*} params
 */
export function getHyList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-account/page-hy-examine-list',
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
    url: '/general-services/v1/hidden-danger-account/page-en-examine-list',
    method: 'get',
    params
  })
}

/**
 * 企业自查隐患台账记录详情（通用）
 * @param {*} id
 */
export function getDetails(id) {
  return request({
    url: `/general-services//v1/hidden-danger-account/examine-details/${id}`,
    method: 'get'
  })
}

/**
 * 数据分析-隐患治理主题数据-隐患类型查询信息
 * @param {*} params
 */
export function dataAnalysisList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-account/data-analysis-list',
    method: 'get',
    params
  })
}
