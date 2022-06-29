import request from '@/utils/request'

/**
 * 删除监管装备信息
 * @param {*} params
 */
export function deleteEquipmentById(params) {
  return request({
    url: `/general-services/v1/equipment/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 删除监管装备维修记录
 * @param {*} params
 */
export function deleteMaintenanceRecord(params) {
  return request({
    url: `/general-services/v1/equipment/deleteMaintenanceRecord/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询监管装备列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/equipment/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询监管装备详情信息
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: '/general-services/v1/equipment/query',
    method: 'get',
    params
  })
}

/**
 * 修改管理装备信息
 * @param {*} data
 */
export function saveEquipment(data) {
  return request({
    url: '/general-services/v1/equipment/save',
    method: 'post',
    data
  })
}

/**
 * 修改管理装备信息
 * @param {*} data
 */
export function updateEquipment(data) {
  return request({
    url: '/general-services/v1/equipment/update',
    method: 'POST',
    data
  })
}

/**
 * 新增监管装备维修记录
 * @param {*} data
 */
export function saveMaintenanceRecord(data) {
  return request({
    url: '/general-services/v1/equipment/saveMaintenanceRecord',
    method: 'post',
    data
  })
}

/**
 * 查询监管装备维修列表
 * @param {*} params
 */
export function selectMaintenanceRecords(params) {
  return request({
    url: '/general-services/v1/equipment/selectMaintenanceRecords',
    method: 'get',
    params
  })
}

/**
 * 查询监管装备-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/equipment/statistical-page',
    method: 'get',
    params
  })
}

/**
 * 监管装备-导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/equipment/export-list',
    method: 'get',
    params
  })
}
