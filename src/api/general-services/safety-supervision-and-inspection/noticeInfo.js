import request from '@/utils/request'

/**
 * 行业端 分页安全检查通知列表
 * @param {*} params
 */
export function hyPageList(params) {
  return request({
    url: '/general-services/v1/notice-info/hyPageList',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询安全检查通知列表
 * @param {*} params
 */
export function enPageList(params) {
  return request({
    url: '/general-services/v1/notice-info/enPageList',
    method: 'get',
    params
  })
}

/**
 * 现场检查通知详情（通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/notice-info/findById/${id}`,
    method: 'get'
  })
}

/**
 * 确认通知信息
 * @param {*} id
 */
export function noticeConfirm(id) {
  return request({
    url: `/general-services//v1/notice-info/confirm/${id}`,
    method: 'POST'
  })
}

/**
 * 行业端 分页查询整改通知列表
 * @param {*} params
 */
export function hyRectificationNoticePage(params) {
  return request({
    url: '/general-services/v1/notice-info/hyRectificationNoticePage',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询整改通知列表
 * @param {*} params
 */
export function enRectificationNoticePage(params) {
  return request({
    url: '/general-services/v1/notice-info/enRectificationNoticePage',
    method: 'get',
    params
  })
}

/**
 * 整改通知详情（通用）
 * @param {*} id
 */
export function findRectificationNoticeInfo(id) {
  return request({
    url: `/general-services/v1/notice-info/findRectificationNoticeInfo/${id}`,
    method: 'get'
  })
}

/**
 * 数据分析-安全检查主题数据-责令整改通知
 * @param {*} params
 */
export function getNoticeInfo(params) {
  return request({
    url: '/general-services/v1/notice-info/data-analysis-list',
    method: 'get',
    params
  })
}
