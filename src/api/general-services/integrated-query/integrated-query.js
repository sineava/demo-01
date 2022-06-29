import request from '@/utils/request'

/**
 * 综合查询-企业分类
 * @param {*} params
 */
export function getBasicPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-basic-page',
    method: 'get',
    params
  })
}

/**
 * 综合查询-港口危险货物作业
 * @param {*} params
 */
export function getDangerousPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-dangerous-page',
    method: 'get',
    params
  })
}

/**
 * 综合查询-设备设施查询
 * @param {*} params
 */
export function getFacilityPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-facility-page',
    method: 'get',
    params
  })
}

/**
 * 综合查询-企业资质查询(经营许可证)
 * @param {*} params
 */
export function getQualificationPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-qualification-page',
    method: 'get',
    params
  })
}

/**
 * 综合查询-从业人员查询
 * @param {*} params
 */
export function getPersonPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-person-page',
    method: 'get',
    params
  })
}

/**
 * 综合查询-教育培训计划(**后端改成行业端查询也在用**)
 * @param {*} params
 */
export function getTrainingPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-training-page',
    method: 'get',
    params
  })
}

/**
 * 综合查询-教育培训情况(**后端改成行业端查询也在用**)
 * @param {*} params
 */
export function getSituationPageList(params) {
  return request({
    url: '/general-services/v1/integrated-query/integrated-query-situation-page',
    method: 'get',
    params
  })
}
