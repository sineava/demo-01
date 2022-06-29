import request from '@/utils/request'

/**
 * 行业端 分页查询复查记录列表
 * @param {*} params
 */
export function hyPageList(params) {
  return request({
    url: '/general-services/v1/review-record/hyPageList',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询复查记录列表
 * @param {*} params
 */
export function enPageList(params) {
  return request({
    url: '/general-services/v1/review-record/enPageList',
    method: 'get',
    params
  })
}

/**
 * 查询复查验收记录详情(通用)
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/review-record/findById/${id}`,
    method: 'get'
  })
}

/**
 * 行业端 填写复查记录验收记录
 * @param {*} data
 */
export function updateRecord(data) {
  return request({
    url: `/general-services/v1/review-record/update`,
    method: 'PUT',
    data
  })
}

/**
 * 数据分析展现-安全检查主题数据-复查验收意见查询
 * @param {*} params
 */
export function dataAnalysisList(params) {
  return request({
    url: '/general-services/v1/review-record/data-analysis-list',
    method: 'get',
    params
  })
}
