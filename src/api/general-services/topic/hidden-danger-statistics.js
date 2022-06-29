import request from '@/utils/request'

/**
 * 隐患类型数据-分页查询-专题统计
 * @param {*} params
 */
export function getHdTopicList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-statistics/page-hd-list',
    method: 'get',
    params
  })
}

/**
 * 隐患类型数据-批量导出-专题统计
 * @param {*} params
 */
export function exportHdTopicList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-statistics/export-hd-list',
    method: 'get',
    params
  })
}

/**
 * 隐患类型数据-统计数据-专题统计
 * @param {*} params
 */
export function getHdTopicStat(params) {
  return request({
    url: '/general-services/v1/hidden-danger-statistics/export-hd-statistical',
    method: 'get',
    params
  })
}

/**
 * 整改类型数据-分页查询-专题统计
 * @param {*} params
 */
export function getReTopicList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-statistics/page-re-list',
    method: 'get',
    params
  })
}

/**
 * 整改类型数据-批量导出-专题统计
 * @param {*} params
 */
export function exportReTopicList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-statistics/export-re-list',
    method: 'get',
    params
  })
}

/**
 * 整改类型数据-统计数据-专题统计
 * @param {*} params
 */
export function getReTopicStat(params) {
  return request({
    url: '/general-services/v1/hidden-danger-statistics/export-re-statistical',
    method: 'get',
    params
  })
}
