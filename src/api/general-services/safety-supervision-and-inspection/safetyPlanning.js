import request from '@/utils/request'

/**
 * 分页查询安全监督检查计划列表
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/safety-planning/pageList',
    method: 'get',
    params
  })
}

/**
 * 删除安全监督检查计划
 * @param {*} id
 */
export function deletePlan(id) {
  return request({
    url: `/general-services/v1/safety-planning/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 添加安全监督检查计划
 * @param {*} data
 */
export function addPlan(data) {
  return request({
    url: '/general-services/v1/safety-planning/add',
    method: 'POST',
    data
  })
}

/**
 * 发布检查计划
 * @param {*} id
 */
export function releasePlan(id) {
  return request({
    url: `/general-services/v1/safety-planning/releasePlan/${id}`,
    method: 'POST'
  })
}

/**
 * 修改安全监督检查计划
 * @param {*} data
 */
export function updatePlan(data) {
  return request({
    url: '/general-services/v1/safety-planning/update',
    method: 'PUT',
    data
  })
}

/**
 * 查询计划检查人员列表
 * @param {*} params
 */
export function inspectorList(params) {
  return request({
    url: '/general-services/v1/safety-inspector/inspectorList',
    method: 'get',
    params
  })
}

/**
 * 行业端 安全监督检查 查询企业列表信息
 * @param {*} params
 */
export function allEnterpriseList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/allEnterpriseList',
    method: 'get',
    params
  })
}

/**
 * 查询专家全部信息
 * @param {*} params
 */
export function expertSelectList(params) {
  return request({
    url: '/general-services/v1/expert/selectList',
    method: 'get',
    params
  })
}

/**
 * 通过计划ID查询安全计划详情
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/safety-planning/findById/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 分页查询安全监督检查计划列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/safety-planning/pageEnList',
    method: 'get',
    params
  })
}

/**
 * 企业端 查询安全监督计划详情
 * @param {*} id
 */
export function findEnById(id) {
  return request({
    url: `/general-services/v1/safety-planning/findEnById/${id}`,
    method: 'get'
  })
}

/**
 * 安全监督检查计划 选择部门信息（只有中心机构才可以选择部门）
 * @param {*} params
 */
export function getOrgList(params) {
  return request({
    url: '/general-services/v1/safety-planning/org-list',
    method: 'get',
    params
  })
}

/**
 * 数据分析-安全检查主题数据-安全检查计划查询
 * @param {*} params
 */
export function dataAnalysisList(params) {
  return request({
    url: '/general-services/v1/safety-planning/data-analysis-list',
    method: 'get',
    params
  })
}
