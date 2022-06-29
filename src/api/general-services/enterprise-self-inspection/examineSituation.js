import request from '@/utils/request'

/**
 * 行业端 分页查询企业自查项列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: '/general-services/v1/examine-situation/page-hy-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询企业自查项列表
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/examine-situation/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 删除企业自查项情况(通用)
 * @param {*} id
 */
export function deleteSituation(id) {
  return request({
    url: `/general-services/v1/examine-situation/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 企业自查情况详情（通用）
 * @param {*} id
 */
export function getSituation(id) {
  return request({
    url: `/general-services/v1/examine-situation/get/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 修改企业自查情况信息
 * @param {*} data
 */
export function updateExamineSituation(data) {
  return request({
    url: '/general-services/v1/examine-situation/update',
    method: 'PUT',
    data
  })
}

/**
 * 企业端 添加企业自查情况信息
 * @param {*} data
 */
export function addExamineSituation(data) {
  return request({
    url: '/general-services/v1/examine-situation/add',
    method: 'POST',
    data
  })
}

/**
 * 数据分析-隐患治理主题数据-企业自查隐患查询
 * @param {*} params
 */
export function dataAnalysisList(params) {
  return request({
    url: '/general-services/v1/examine-situation/data-analysis-list',
    method: 'get',
    params
  })
}
