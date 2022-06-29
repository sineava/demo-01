import request from '@/utils/request'

/**
 * 行业端分页查询现场检查记录列表
 * @param {*} params
 */
export function hyPageList(params) {
  return request({
    url: '/general-services/v1/safety-inspect-record/hyPageList',
    method: 'get',
    params
  })
}

/**
 * 企业端分页查询现场检查记录列表
 * @param {*} params
 */
export function enPageList(params) {
  return request({
    url: '/general-services/v1/safety-inspect-record/enPageList',
    method: 'get',
    params
  })
}

/**
 * 现场检查记录-world导出数据
 * @param {*} params
 */
export function getWordData(params) {
  return request({
    url: '/general-services/v1/safety-inspect-record/query-info',
    method: 'get',
    params
  })
}

/**
 * 添加安全监督现场检查记录
 * @param {*} data
 */
export function addSceneInspectRecord(data) {
  return request({
    url: '/general-services/v1/safety-inspect-record/addSceneInspectRecord',
    method: 'post',
    data
  })
}

/**
 * 现场检查记录详情
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/safety-inspect-record/findById/${id}`,
    method: 'get'
  })
}

/**
 * 数据分析-安全检查主题数据-现场检查记录
 * @param {*} params
 */
export function dataAnalysisList(params) {
  return request({
    url: '/general-services/v1/safety-inspect-record/data-analysis-list',
    method: 'get',
    params
  })
}
