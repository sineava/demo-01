import request from '@/utils/request'

/**
 * 应急业务 查询所有船舶列表
 * @param {*} params
 */
export function getAllShips(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/all-shi-list`,
    method: 'get',
    params
  })
}

/**
 * 行业端 分页查询水路运输企业船舶列表
 * @param {*} params
 */
export function pageWaterTransportHyShipList(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/page-water-transport-hy-ship-list`,
    method: 'get',
    params
  })
}
/**
 * 船舶解绑
 * @param {*} params
 */
export function unbound(data) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/contact-the-binding`,
    method: 'PUT',
    data
  })
}

/**
 * 修改船舶基础信息-水路运输企业
 * @param {*} params
 */
export function putSWShip(data) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/wt-update-ship-info`,
    method: 'PUT',
    data
  })
}

/**
 * 修改船舶基础信息-水路运输企业
 * @param {*} params
 */
export function putCBShip(data) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/sm-update-ship-info`,
    method: 'PUT',
    data
  })
}

/**
 * 行业端 分页查询水路运输企业船舶列表 - 水路运输船舶管理
 * @param {*} params
 */
export function pageWaterTransportHyShipLists(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/page-water-transport-ship-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询水路运输企业船舶列表
 * @param {*} params
 */
export function pageWaterTransportEnShipList(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/page-water-transport-en-ship-list`,
    method: 'get',
    params
  })
}

/**
 * 行业端 分页查询船舶管理企业船舶列表
 * @param {*} params
 */
export function pageShipHyShipList(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/page-ship-hy-ship-list`,
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询船舶管理企业船舶列表
 * @param {*} params
 */
export function pageShipEnShipList(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/page-ship-en-ship-list`,
    method: 'get',
    params
  })
}

/**
 * 船舶信息详细信息-所有通用
 * @param {*} params
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/get/${id}`,
    method: 'get'
  })
}

/**
 * 获取船舶信息详细信息
 * @param {*} params
 */
export function getShipInfo(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/get-ship-basic-info`,
    method: 'get',
    params,
    isErrMsg:true
  })
}

/**
 * 获取船舶管理企业列表
 * @param {*} params
 */
export function getShipManagementList(params) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-business-license/select-ship-management-certificates`,
    method: 'get',
    params
  })
}

/**
 * 查询船舶企业船舶列表 备案审核用
 * @param {*} params
 */
export function getShipEnShipList(id) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/get-ship-en-ship-list/${id}`,
    method: 'get'
  })
}

/**
 * 查询水路运输企业船舶列表 备案审核用
 * @param {*} id
 */
export function getWtEnShipList(id) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/get-wt-en-ship-list/${id}`,
    method: 'get'
  })
}

/**
 * 船舶管理企业变更备案船舶列表（船舶管理船舶变更备案信息）
 * @param {*} params
 */
export function shipManageShipList(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/ship-manage-ship-list`,
    method: 'get',
    params
  })
}

/**
 * 综合查询-船舶基础信
 * @param {*} params
 */
export function managePersonList(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/manage-person-list`,
    method: 'get',
    params
  })
}


/**
 * 综合查询-船舶专题查询-营运船舶分页查询
 * @param {*} params
 */
 export function integratedQueryPage(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship/integrated-query-page`,
    method: 'get',
    params
  })
}