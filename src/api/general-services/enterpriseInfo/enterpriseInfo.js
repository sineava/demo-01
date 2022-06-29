import request from '@/utils/request'

/**
 * 获取企业基础信息
 * @param {*} params
 */
export function findByBasicInfo(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/findByBasicInfo',
    method: 'get',
    params
  })
}

/**
 * 获取企业基础信息
 * @param {*} params
 */
export function findQyByToBasicInfo(params) {
  return request({
    url: '/general-services/v1/port-enterprise/en-find-info',
    method: 'get',
    params
  })
}
/**
 * 获取行业端企业基础信息
 * @param {*} params
 */
export function findByToBasicInfo(params) {
  return request({
    url: '/general-services/v1/port-enterprise/in-find-info',
    method: 'get',
    params
  })
}
/**
 * 获取投资人信息列表
 * @param {*} params
 */
export function getInvestors(params) {
  return request({
    url: '/general-services/v1/port-investors/find-list',
    method: 'get',
    params
  })
}
/**
 * 新增投资人信息列表
 * @param {*} params
 */
export function addInvestors(data) {
  return request({
    url: '/general-services/v1/port-investors/save-info',
    method: 'post',
    data
  })
}
/**
 * 修改投资人信息列表
 * @param {*} params
 */
export function editInvestors(data) {
  return request({
    url: '/general-services/v1/port-investors/update-info',
    method: 'put',
    data
  })
}
/**
 * 删除投资人信息列表
 * @param {*} id
 */
export function deteleInvestors(id) {
  return request({
    url: `/general-services/v1/port-investors/delete-info/${id}`,
    method: 'delete'
  })
}
/**
 * 行业端 监督检安全查通中心机构查询所有的企业列表
 * @param {*} params
 */
export function getAllEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/allEnList',
    method: 'get',
    params
  })
}

/**
 * 修改企业其他信息
 * @param {*} data
 */
export function updateBasicInfo(data) {
  return request({
    url: '/general-services//v1/enterprise-basic/update-basic-info',
    method: 'put',
    data
  })
}
/**
 * 添加或者修改企业其他信息（添加时ID为null）
 * @param {*} data
 */
export function addOrModifyOtherInfo(data) {
  console.log(data)
  return request({
    url: '/general-services/v1/port-enterprise/update-basic-info',
    method: 'put',
    data
  })
}

/**
 * 通过营业执照号查询执照信息
 * @param {*} data
 */
export function findLicense(params) {
  return request({
    url: '/general-services/v1/enterprise-qualification/get-license-info',
    method: 'get',
    params
  })
}

/**
 * 获取当前用户关联的企业信息
 * @param {*} data
 */
export function findByUserId(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/findByUserId',
    method: 'get',
    params
  })
}

/**
 * 通过企业名称模糊查企业编号
 * @param {*} data
 */
export function selectLikeName(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/selectLikeName',
    method: 'get',
    params
  })
}

/**
 * 行业端 分页查询港口企业
 * @param {*} params
 */
export function pagePortEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/pagePortEnList',
    method: 'get',
    params
  })
}

/**
 * 行业端 通过企业ID 查询企业详细信息
 * @param {*} params
 */
export function findByHyBasicInfo(enterpriseId) {
  return request({
    url: `/general-services/v1/enterprise-basic/findByHyBasicInfo/${enterpriseId}`,
    method: 'get'
  })
}

/**
 * 行业端 分页查询港口服务企业列表
 * @param {*} params
 */
export function pagePortServicesEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/pagePortServicesEnList',
    method: 'get',
    params
  })
}

/**
 * 行业端 港口服务企业详情
 * @param {*} enterpriseId
 */
export function getHyPortServicesInfo(enterpriseId) {
  return request({
    url: `/general-services/v1/enterprise-basic/getHyPortServicesInfo/${enterpriseId}`,
    method: 'get'
  })
}

/**
 * 企业端 港口服务企业基础信息
 * @param {*} params
 */
export function getEnPortServicesInfo() {
  return request({
    url: '/general-services/v1/enterprise-basic/getEnPortServicesInfo',
    method: 'get'
  })
}

/**
 * 行业端 分页查询水路运输企业列表
 * @param {*} params
 */
export function pageWaterTransportEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/pageWaterTransportEnList',
    method: 'get',
    params
  })
}

/**
 * 行业端 水路运输企业详情
 * @param {*} id
 */
export function getHyWaterTransportInfo(id) {
  return request({
    url: `/general-services/v1/enterprise-basic/getHyWaterTransportInfo/${id}`,
    method: 'get'
  })
}

/**
 * 行业端 修改企业信息（需要根据企业类型判断字段）通用
 * @param {*} data
 */
export function updateBasic(data) {
  return request({
    url: `/general-services/v1/enterprise-basic/update`,
    method: 'post',
    data
  })
}

/**
 * 企业端 水路运输企业基础信息
 * @param {*}
 */
export function getEnWaterTransportInfo() {
  return request({
    url: `/general-services/v1/enterprise-basic/getEnWaterTransportInfo`,
    method: 'get'
  })
}

/**
 * 行业端 分页查询船舶管理企业列表
 * @param {*} params
 */
export function pageShipManageEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/pageShipManageEnList',
    method: 'get',
    params
  })
}

/**
 * 行业端 船舶管理企业企业详情
 * @param {*} id
 */
export function getHyShipManageInfo(id) {
  return request({
    url: `/general-services/v1/enterprise-basic/getHyShipManageInfo/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 船舶管理企业基础信息
 * @param {*} params
 */
export function getEnShipManageInfo() {
  return request({
    url: `/general-services/v1/enterprise-basic/getEnShipManageInfo`,
    method: 'get'
  })
}

/**
 * 行业端 分页查询水路运输代理列表
 * @param {*} params
 */
export function pageWaterAgentEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/pageWaterAgentEnList',
    method: 'get',
    params
  })
}

/**
 * 行业端 水路运输代理详情
 * @param {*} id
 */
export function getHyWaterAgentInfo(id) {
  return request({
    url: `/general-services/v1/enterprise-basic/getHyWaterAgentInfo/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 水路运输代理企业基础信息
 * @param {*} params
 */
export function getEnWaterAgentInfo(params) {
  return request({
    url: `/general-services/v1/enterprise-basic/getEnWaterAgentInfo`,
    method: 'get',
    params
  })
}

/**
 * 企业端 查询船舶管理企业列表（水运业务备案）
 * @param {*} params
 */
export function getShipManageEnList(params) {
  return request({
    url: `/general-services/v1/enterprise-basic/getShipManageEnList`,
    method: 'get',
    params
  })
}

/**
 * 查询所有企业列表
 * @param {*} params
 */
export function getEnterpriseByName(params) {
  return request({
    url: `/general-services/v1/enterprise-basic/enterprise-all-list`,
    method: 'get',
    params
  })
}
